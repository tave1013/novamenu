import * as React from "react";
import { defaultLocale, isLocale, localeInfo, type Locale } from "./config";
import type { MessageKey } from "./dictionaries/it";
import { en } from "./dictionaries/en";

/*
 * Lingua corrente e traduzione dei testi dell'interfaccia.
 * Lo stesso modulo funziona nelle componenti server, nelle componenti client durante la
 * generazione delle pagine e nel browser:
 * - componenti server: la lingua viene impostata dalla pagina con setLocale();
 * - componenti client in generazione: arriva dal LocaleProvider del layout;
 * - browser: si legge da <html lang>.
 */
type ReactExtras = {
  cache?: <T>(fn: () => T) => () => T;
  createContext?: <T>(value: T) => React.Context<T>;
  use?: <T>(ctx: React.Context<T>) => T;
};
const R = React as unknown as ReactExtras;

export const LocaleContext = typeof R.createContext === "function" ? R.createContext<Locale>(defaultLocale) : null;
const serverStore = !LocaleContext && typeof R.cache === "function" ? R.cache(() => ({ locale: defaultLocale as Locale })) : null;

/** Da chiamare all'inizio di ogni layout e di ogni pagina (solo lato server). */
export function setLocale(locale: Locale) {
  if (serverStore) serverStore().locale = locale;
}

export function getLocale(): Locale {
  if (typeof document !== "undefined") {
    const lang = document.documentElement.lang;
    return isLocale(lang) ? lang : defaultLocale;
  }
  if (LocaleContext && R.use) return R.use(LocaleContext);
  return serverStore ? serverStore().locale : defaultLocale;
}

/** Un dizionario per ogni lingua diversa da quella di partenza. */
const dictionaries: Partial<Record<Locale, Record<MessageKey, string>>> = { en };

const fill = (s: string, params?: Record<string, string | number>) =>
  params ? s.replace(/\{(\w+)\}/g, (m, k) => (k in params ? String(params[k]) : m)) : s;

/** Testo nella lingua indicata. La chiave è il testo italiano, che resta la lingua di partenza. */
export function t(locale: Locale, key: MessageKey, params?: Record<string, string | number>): string {
  const text = locale === defaultLocale ? key : dictionaries[locale]?.[key] ?? key;
  return fill(text, params);
}

/** Testo nella lingua della pagina corrente. */
export function tr(key: MessageKey, params?: Record<string, string | number>): string {
  return t(getLocale(), key, params);
}

/** Importo nella valuta della lingua: 8,50 € in italiano, £8.50 in inglese. */
export function money(value: number, locale: Locale = getLocale(), digits?: number): string {
  const d = digits ?? (Number.isInteger(value) ? 0 : 2);
  return new Intl.NumberFormat(localeInfo[locale].intl, { style: "currency", currency: localeInfo[locale].currency, minimumFractionDigits: d, maximumFractionDigits: d }).format(value).replace(/\u00a0/g, " ");
}

/** Data scritta per esteso nella lingua: 12 ottobre 2026, 12 October 2026. */
export function longDate(iso: string, locale: Locale = getLocale()): string {
  return new Date(iso).toLocaleDateString(localeInfo[locale].intl, { day: "numeric", month: "long", year: "numeric" });
}

/** Giorno scritto per esteso senza anno: lunedì 14 ottobre, Monday 14 October. */
export function weekdayDate(date: Date, locale: Locale = getLocale()): string {
  return date.toLocaleDateString(localeInfo[locale].intl, { weekday: "long", day: "numeric", month: "long" }).replace(",", "");
}

/** Etichetta in testa ai messaggi WhatsApp scritti in una lingua diversa dall'italiano, per esempio "[EN] ". */
export function messageTag(locale: Locale = getLocale()): string {
  return locale === defaultLocale ? "" : `[${locale.toUpperCase()}] `;
}

/** Numero con i decimali scritti come si usa nella lingua: 15,83 in italiano, 15.83 in inglese. */
export function num(value: number, locale: Locale = getLocale()): string {
  const d = Number.isInteger(value) ? 0 : 2;
  return new Intl.NumberFormat(localeInfo[locale].intl, { minimumFractionDigits: d, maximumFractionDigits: d }).format(value);
}

/** true se nella lingua il simbolo della valuta si scrive prima della cifra (inglese), false se dopo (italiano). */
export function symbolFirst(locale: Locale = getLocale()): boolean {
  return money(1, locale).startsWith(localeInfo[locale].symbol);
}

/**
 * Importo già scritto all'italiana ("27,50 €", "€ 7,00", "4.280") reso nella lingua della pagina.
 * In italiano resta com'è; nelle altre lingue passa da Intl con il simbolo della valuta della lingua ("£27.50", "£4,280").
 */
export function price(text: string, locale: Locale = getLocale()): string {
  if (locale === defaultLocale) return text;
  const raw = text.replace(/[€£\s]/g, "");
  const m = raw.match(/^([+-]?)(\d[\d.,]*)$/);
  if (!m) return text;
  let digits = m[2];
  let decimals = 0;
  if (/,\d{1,2}$/.test(digits)) {
    decimals = digits.split(",")[1].length;
    digits = digits.replace(/\./g, "").replace(",", ".");
  } else if (/\.\d{1,2}$/.test(digits)) {
    decimals = digits.split(".")[1].length;
    digits = digits.replace(/,/g, "");
  } else {
    digits = digits.replace(/[.,]/g, "");
  }
  const value = Number(digits);
  if (!Number.isFinite(value)) return text;
  const body = new Intl.NumberFormat(localeInfo[locale].intl, { minimumFractionDigits: decimals, maximumFractionDigits: decimals }).format(value);
  return `${m[1]}${localeInfo[locale].symbol}${body}`;
}

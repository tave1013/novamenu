import type { Locale } from "./config";
import type { Valuta } from "@/config/prezzi";

/**
 * Cookie tecnico delle preferenze, 12 mesi: lingua e valuta scelte dai selettori del sito.
 * Formato: "lingua=it&valuta=gbp". Si scrive solo quando l'utente sceglie.
 */
export const COOKIE_PREFERENZE = "nm_preferenze";
export const DURATA_COOKIE_PREFERENZE = 365 * 24 * 60 * 60;

export type Preferenze = { lingua?: Locale; valuta?: Valuta };

export function leggiPreferenze(valore: string | null | undefined): Preferenze {
  const p = new URLSearchParams(valore ?? "");
  const lingua = p.get("lingua");
  const valuta = p.get("valuta");
  return {
    lingua: lingua === "it" || lingua === "en" ? lingua : undefined,
    valuta: valuta === "eur" || valuta === "gbp" ? valuta : undefined,
  };
}

/** Preferenze salvate nel browser. */
export function preferenzeBrowser(): Preferenze {
  const raw = document.cookie.split("; ").find((c) => c.startsWith(`${COOKIE_PREFERENZE}=`));
  return leggiPreferenze(raw ? decodeURIComponent(raw.slice(COOKIE_PREFERENZE.length + 1)) : null);
}

/** Aggiorna una preferenza tenendo le altre (solo nel browser). */
export function salvaPreferenza(nuova: Preferenze) {
  const p = { ...preferenzeBrowser(), ...nuova };
  const valore = new URLSearchParams(Object.entries(p).filter(([, v]) => v) as [string, string][]).toString();
  const secure = location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${COOKIE_PREFERENZE}=${encodeURIComponent(valore)}; Max-Age=${DURATA_COOKIE_PREFERENZE}; Path=/; SameSite=Lax${secure}`;
}

export const salvaLingua = (lingua: Locale) => salvaPreferenza({ lingua });

/** Paesi in cui la home resta in italiano. */
const PAESI_ITALIANO = new Set(["IT", "SM", "VA"]);

/** Motori di ricerca e anteprime dei link: non vanno mai reindirizzati. */
const BOT = /bot\b|bot\/|crawler|crawl|spider|slurp|bingpreview|mediapartners|adsbot|google-inspectiontool|googleother|lighthouse|facebookexternalhit|embedly|whatsapp|telegrambot|slack|discord|pinterest|duckduck|yandex|baidu|applebot|petalbot|semrush|ahrefs/i;

export function isBot(userAgent: string | null | undefined): boolean {
  return !!userAgent && BOT.test(userAgent);
}

/**
 * Lingua con cui mostrare la home: la scelta salvata vince sempre, poi il paese.
 * Restituisce null quando non si deve spostare nessuno (motori di ricerca).
 */
export function linguaIniziale({ scelta, paese, userAgent }: { scelta?: Locale; paese?: string | null; userAgent?: string | null }): Locale | null {
  if (isBot(userAgent)) return null;
  if (scelta) return scelta;
  if (!paese) return "it";
  return PAESI_ITALIANO.has(paese.toUpperCase()) ? "it" : "en";
}

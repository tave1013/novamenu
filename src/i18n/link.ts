import { getLocale } from "./index";
import { defaultLocale, type Locale } from "./config";
import { href, matchPath, type PageKey } from "./routes";

/** Indirizzo di una pagina nella lingua della pagina corrente. */
export function to(key: PageKey, id?: string): string {
  return href(key, getLocale(), id);
}

/**
 * Traduce un indirizzo interno scritto in italiano nell'indirizzo della lingua corrente.
 * Esempio: lp("/prezzi/") diventa "/en/pricing/" nelle pagine inglesi.
 */
export function lp(path: string, locale: Locale = getLocale()): string {
  if (locale === defaultLocale) return path;
  const [pure, hash = ""] = path.split("#");
  const m = matchPath(pure);
  if (!m || m.locale !== defaultLocale) return path;
  return href(m.key, locale, m.id) + (hash ? `#${hash}` : "");
}

/** Applica lp() a tutti i link interni di un testo HTML (guide e pagine legali). */
export function localizeLinks(html: string, locale: Locale = getLocale()): string {
  return locale === defaultLocale ? html : html.replace(/href="(\/[^"]*)"/g, (_, p: string) => `href="${lp(p, locale)}"`);
}

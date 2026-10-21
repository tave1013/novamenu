import type { Locale } from "./config";

/** Cookie tecnico con la lingua scelta dal selettore: 12 mesi. */
export const COOKIE_LINGUA = "NEXT_LOCALE";
export const DURATA_COOKIE_LINGUA = 365 * 24 * 60 * 60;

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
export function linguaIniziale({ cookie, paese, userAgent }: { cookie?: string | null; paese?: string | null; userAgent?: string | null }): Locale | null {
  if (isBot(userAgent)) return null;
  if (cookie === "it" || cookie === "en") return cookie;
  if (!paese) return "it";
  return PAESI_ITALIANO.has(paese.toUpperCase()) ? "it" : "en";
}

/** Salva la lingua scelta dal selettore (solo nel browser). */
export function salvaLingua(lingua: Locale) {
  const secure = location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${COOKIE_LINGUA}=${lingua}; Max-Age=${DURATA_COOKIE_LINGUA}; Path=/; SameSite=Lax${secure}`;
}

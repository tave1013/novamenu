/**
 * Prezzi dei piani: forma del listino e funzioni per usarlo.
 * Gli importi NON sono scritti qui: arrivano dalla piattaforma (src/lib/prezzi/listino.ts),
 * e tutto il sito li legge da lì (card, tabella, Google, schema.org, llms.txt, guide).
 *
 * I prezzi in sterline sono un listino deciso a parte sulla piattaforma, mai una conversione.
 * Tutti i prezzi sono IVA esclusa.
 */
export type Valuta = "eur" | "gbp";
export type IdPiano = "base" | "pro" | "premium";
export const PIANI: IdPiano[] = ["base", "pro", "premium"];

export type Listino = Record<IdPiano, Record<Valuta, { mensile: number; annuale: number }>>;

export const VALUTE: Record<Valuta, { codice: string; simbolo: string }> = {
  eur: { codice: "EUR", simbolo: "€" },
  gbp: { codice: "GBP", simbolo: "£" },
};

/**
 * Paesi in cui si mostrano gli euro: Unione europea e paesi che usano l'euro.
 * In tutti gli altri (Regno Unito e resto del mondo) si mostrano le sterline.
 */
export const PAESI_EURO = new Set([
  // Unione europea
  "AT", "BE", "BG", "CY", "CZ", "DE", "DK", "EE", "ES", "FI", "FR", "GR", "HR", "HU", "IE", "IT", "LT", "LU", "LV", "MT", "NL", "PL", "PT", "RO", "SE", "SI", "SK",
  // fuori dall'UE ma con l'euro
  "SM", "VA", "MC", "AD", "ME", "XK",
]);

/**
 * Valuta dal paese dell'IP, come fanno i siti con prezzi in più valute: euro nell'UE, sterline altrove.
 * Se il paese non si conosce, decide la lingua della pagina: italiano in euro, inglese in sterline.
 */
export function valutaPerPaese(paese: string | null | undefined, lingua: "it" | "en"): Valuta {
  if (!paese) return lingua === "en" ? "gbp" : "eur";
  return PAESI_EURO.has(paese.toUpperCase()) ? "eur" : "gbp";
}

export const prezzoMensile = (l: Listino, piano: IdPiano, valuta: Valuta) => l[piano][valuta].mensile;
export const prezzoAnnuale = (l: Listino, piano: IdPiano, valuta: Valuta) => l[piano][valuta].annuale;
/** Quanto costa al mese pagando l'annuale, arrotondato all'unità (590 € l'anno: 49 € al mese). */
export const mensileConAnnuale = (l: Listino, piano: IdPiano, valuta: Valuta) => Math.round(prezzoAnnuale(l, piano, valuta) / 12);

/** Importo scritto nella lingua della pagina: "19 €" in italiano, "€19" o "£18" in inglese. */
export function formatoPrezzo(importo: number, valuta: Valuta, intl: string): string {
  const decimali = Number.isInteger(importo) ? 0 : 2;
  return new Intl.NumberFormat(intl, { style: "currency", currency: VALUTE[valuta].codice, minimumFractionDigits: decimali, maximumFractionDigits: decimali })
    .format(importo)
    .replace(/ /g, " ");
}

/**
 * Converte la risposta della piattaforma (rpc public_plans) nel listino del sito.
 * Se manca un piano o un importo, la risposta non è valida: meglio tenere gli ultimi prezzi letti.
 */
export function listinoDaPiattaforma(righe: unknown): Listino {
  if (!Array.isArray(righe)) throw new Error("Risposta dei prezzi non valida");
  const numero = (v: unknown) => {
    const n = typeof v === "string" ? Number(v) : v;
    if (typeof n !== "number" || !Number.isFinite(n) || n <= 0) throw new Error("Importo non valido");
    return n;
  };
  const out = {} as Listino;
  for (const id of PIANI) {
    const r = righe.find((x) => x && typeof x === "object" && (x as { id?: unknown }).id === id) as Record<string, unknown> | undefined;
    if (!r) throw new Error(`Piano ${id} mancante nella risposta dei prezzi`);
    out[id] = {
      eur: { mensile: numero(r.priceMonthly), annuale: numero(r.priceYearly) },
      gbp: { mensile: numero(r.priceMonthlyGbp), annuale: numero(r.priceYearlyGbp) },
    };
  }
  return out;
}

/**
 * Riempie i segnaposto dei prezzi nei testi lunghi (guide): {{prezzo:base:eur}} diventa "19 €".
 * Così anche le guide leggono i prezzi dallo stesso listino.
 */
export function riempiPrezzi(testo: string, l: Listino, intl: string): string {
  return testo.replace(/\{\{prezzo:(base|pro|premium):(eur|gbp)\}\}/g, (_, piano: IdPiano, valuta: Valuta) => formatoPrezzo(prezzoMensile(l, piano, valuta), valuta, intl));
}

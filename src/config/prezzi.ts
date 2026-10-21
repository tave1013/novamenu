/**
 * Prezzi dei piani: unica fonte per tutto il sito (pagina Prezzi, home, confronto,
 * dati strutturati, testi per le AI, guide). Nessun prezzo dei piani va scritto a mano altrove.
 *
 * I prezzi in sterline sono un listino deciso a parte, non una conversione: mai calcolarli dagli euro.
 * Tutti i prezzi sono IVA esclusa. L'annuale vale 10 mesi (2 mesi gratis).
 */
export type Valuta = "eur" | "gbp";
export type IdPiano = "base" | "pro" | "premium";

export const PREZZI_MENSILI: Record<IdPiano, Record<Valuta, number>> = {
  base: { eur: 19, gbp: 18 },
  pro: { eur: 59, gbp: 55 },
  premium: { eur: 89, gbp: 79 },
};

/** Mesi pagati con l'abbonamento annuale. */
export const MESI_PAGATI_ANNUALE = 10;

export const VALUTE: Record<Valuta, { codice: string; simbolo: string }> = {
  eur: { codice: "EUR", simbolo: "€" },
  gbp: { codice: "GBP", simbolo: "£" },
};

/** Paesi in cui si mostrano le sterline (paese dell'IP, come per la lingua). */
export const PAESI_STERLINA = new Set(["GB"]);

export const prezzoMensile = (piano: IdPiano, valuta: Valuta) => PREZZI_MENSILI[piano][valuta];
export const prezzoAnnuale = (piano: IdPiano, valuta: Valuta) => PREZZI_MENSILI[piano][valuta] * MESI_PAGATI_ANNUALE;
/** Quanto costa al mese pagando l'annuale, arrotondato al centesimo. */
export const mensileConAnnuale = (piano: IdPiano, valuta: Valuta) => Math.round((prezzoAnnuale(piano, valuta) / 12) * 100) / 100;

/** Importo scritto nella lingua della pagina: "19 €" in italiano, "€19" o "£18" in inglese. */
export function formatoPrezzo(importo: number, valuta: Valuta, intl: string): string {
  const decimali = Number.isInteger(importo) ? 0 : 2;
  return new Intl.NumberFormat(intl, { style: "currency", currency: VALUTE[valuta].codice, minimumFractionDigits: decimali, maximumFractionDigits: decimali })
    .format(importo)
    .replace(/ /g, " ");
}

/*
 * Fornitori che trattano dati per NovaMenu (sub-responsabili): da qui si generano la pagina
 * /legale/fornitori/ (in inglese /en/legal/suppliers/) e i rimandi negli altri documenti.
 * Si compila con l'elenco della piattaforma (docs/legale/fornitori.md del repository piattaforma-menu).
 * Finché l'elenco è vuoto la pagina non viene pubblicata e i documenti dicono che l'elenco
 * si può chiedere per email. Testi semplici, in italiano e in inglese, senza lineette lunghe.
 */
type Testo = { it: string; en: string };

export type Fornitore = {
  nome: string;
  /** A cosa serve. */
  servizio: Testo;
  /** Quali dati tratta. */
  dati: Testo;
  /** Dove si trovano i dati. */
  paese: Testo;
  /** Garanzia per il trasferimento (adeguatezza, Data Privacy Framework, Clausole contrattuali standard...). */
  garanzia: Testo;
};

export const FORNITORI: Fornitore[] = [];

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export function tabellaFornitoriHtml(lingua: "it" | "en"): string {
  const th = (lingua === "en" ? ["Provider", "What it is for", "Data processed", "Where the data is", "Transfer safeguard"] : ["Fornitore", "A cosa serve", "Dati trattati", "Dove sono i dati", "Garanzia per il trasferimento"])
    .map((h) => `<th scope="col">${h}</th>`)
    .join("");
  const rows = FORNITORI.map((f) => `<tr><td>${esc(f.nome)}</td><td>${esc(f.servizio[lingua])}</td><td>${esc(f.dati[lingua])}</td><td>${esc(f.paese[lingua])}</td><td>${esc(f.garanzia[lingua])}</td></tr>`).join("");
  return `<div class="table-scroll"><table><thead><tr>${th}</tr></thead><tbody>${rows}</tbody></table></div>`;
}

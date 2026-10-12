export type Plan = {
  id: "base" | "pro" | "premium";
  name: string;
  monthly: number;
  desc: string;
  popular?: boolean;
  highlights: string[];
};

export const plans: Plan[] = [
  {
    id: "base",
    name: "Base",
    monthly: 19,
    desc: "Per avere il menu digitale fatto bene.",
    highlights: ["Menu digitale con QR", "Importazione con l'AI", "Orari, ferie e chiusure", "Logo e colori del locale", "Assistenza in italiano"],
  },
  {
    id: "pro",
    name: "Pro",
    monthly: 39,
    desc: "Per chi fa asporto e prende prenotazioni.",
    popular: true,
    highlights: ["Tutto quello che c'è in Base", "Ordini su WhatsApp", "Prenotazioni e sala", "Menu tradotto in 4 lingue", "Assistente vocale su Telegram"],
  },
  {
    id: "premium",
    name: "Premium",
    monthly: 69,
    desc: "Per far tornare i clienti, in automatico.",
    highlights: ["Tutto quello che c'è in Pro", "Schede clienti", "Automazioni WhatsApp", "Messaggi a gruppi di clienti", "Dominio del tuo locale"],
  },
];

/** Prezzo mensile equivalente con pagamento annuale (2 mesi gratis). */
export const annualMonthly = (m: number) => Math.round(((m * 10) / 12) * 100) / 100;
export const fmtEuro = (n: number) =>
  Number.isInteger(n) ? String(n) : n.toFixed(2).replace(".", ",");

type Cell = boolean | string;
export const comparison: { group: string; rows: { label: string; base: Cell; pro: Cell; premium: Cell }[] }[] = [
  {
    group: "Menu",
    rows: [
      { label: "Menu digitale con QR", base: true, pro: true, premium: true },
      { label: "Importazione da foto e PDF con l'AI", base: true, pro: true, premium: true },
      { label: "Allergeni, varianti e aggiunte", base: true, pro: true, premium: true },
      { label: "Piatti esauriti in un tocco", base: true, pro: true, premium: true },
      { label: "Traduzioni in inglese, francese, tedesco e spagnolo", base: false, pro: true, premium: true },
      { label: "Menu a orari", base: false, pro: true, premium: true },
      { label: "Dominio del tuo locale", base: false, pro: false, premium: true },
    ],
  },
  {
    group: "Prenotazioni e sala",
    rows: [
      { label: "Orari, ferie e chiusure", base: true, pro: true, premium: true },
      { label: "Prenotazioni online senza commissioni", base: false, pro: true, premium: true },
      { label: "Piantina della sala e tavoli", base: false, pro: true, premium: true },
      { label: "Seggiolini e lista d'attesa", base: false, pro: true, premium: true },
    ],
  },
  {
    group: "Vendite e clienti",
    rows: [
      { label: "Ordini da asporto su WhatsApp", base: false, pro: true, premium: true },
      { label: "Commissioni sugli ordini", base: "0%", pro: "0%", premium: "0%" },
      { label: "Schede clienti", base: false, pro: false, premium: true },
      { label: "Promemoria, recensioni e auguri su WhatsApp", base: false, pro: false, premium: true },
      { label: "Messaggi a gruppi di clienti", base: false, pro: false, premium: true },
    ],
  },
  {
    group: "Gestione",
    rows: [
      { label: "Statistiche", base: "Base", pro: "Complete", premium: "Complete" },
      { label: "Assistente vocale su Telegram", base: false, pro: true, premium: true },
      { label: "Accessi per lo staff", base: "1", pro: "3", premium: "Illimitati" },
      { label: "Turni del personale", base: false, pro: false, premium: true },
      { label: "Assistenza in italiano", base: "Email", pro: "Email e WhatsApp", premium: "Prioritaria" },
    ],
  },
];

export const generalFaq = [
  { q: "Devo cambiare il numero WhatsApp del locale?", a: "No. Usi il numero che hai già e continui a rispondere dall'app WhatsApp Business sul telefono." },
  { q: "Quanto tempo serve per partire?", a: "Con l'importazione da foto il menu è pronto in pochi minuti. Per logo, colori e orari basta un pomeriggio, e se vuoi lo facciamo insieme durante la demo." },
  { q: "Prendete una percentuale su ordini o prenotazioni?", a: "No. Paghi solo l'abbonamento. Alcuni messaggi WhatsApp hanno un costo stabilito da Meta, di pochi centesimi, che vedi sempre in dashboard." },
  { q: "C'è un vincolo di durata?", a: "No. Con il piano mensile disdici quando vuoi, dalla dashboard. L'abbonamento resta attivo fino alla fine del periodo già pagato." },
  { q: "Come funziona la prova gratuita?", a: "Hai 14 giorni con tutte le funzioni del piano Pro. Non serve la carta di credito per iniziare." },
  { q: "Funziona anche per un pastificio, un bar o una gastronomia?", a: "Sì. Va bene per qualsiasi attività della ristorazione: chi ha tavoli, chi vende da asporto, a peso o su prenotazione." },
  { q: "Dove sono i miei dati?", a: "Su server in Europa. I dati dei tuoi clienti sono tuoi: puoi esportarli quando vuoi." },
];

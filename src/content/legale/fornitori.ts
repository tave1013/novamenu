/*
 * Fornitori che trattano dati per NovaMenu (sub-responsabili): da qui si generano la pagina
 * /legale/fornitori/ (in inglese /en/legal/suppliers/) e i rimandi negli altri documenti.
 * Si compila con l'elenco della piattaforma (docs/legale/fornitori.md del repository piattaforma-menu).
 * Finché l'elenco è vuoto la pagina non viene pubblicata e i documenti dicono che l'elenco
 * si può chiedere per email. Testi semplici, in italiano e in inglese, senza lineette lunghe.
 */
type Testo = { it: string; en: string };

export type Gruppo = "principali" | "locale" | "visitatore";

export type Fornitore = {
  gruppo: Gruppo;
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

/** Elenco della piattaforma del 24 ottobre 2026 (copia in docs/legale/fornitori-piattaforma.md). */
export const FORNITORI: Fornitore[] = [
  {
    gruppo: "principali",
    nome: "Supabase (Supabase Inc.)",
    servizio: { it: "Database, accessi, file e funzioni del server della piattaforma", en: "Database, sign-in, files and server functions of the platform" },
    dati: {
      it: "Tutti i dati del servizio: dati del locale e dei suoi utenti, menu, clienti del locale (nome, telefono, email, allergie solo con consenso, note), prenotazioni, ordini, messaggi dell'assistente",
      en: "All the service data: data of the venue and its users, menus, the venue's customers (name, telephone, email, allergies only with consent, notes), bookings, orders, assistant messages",
    },
    paese: { it: "UE: Francoforte, Germania (dati salvati nell'UE)", en: "EU: Frankfurt, Germany (data stored in the EU)" },
    garanzia: {
      it: "Dati nell'UE. Per l'eventuale accesso dagli USA (assistenza tecnica): Clausole contrattuali standard nel DPA di Supabase",
      en: "Data in the EU. For any access from the USA (technical support): Standard Contractual Clauses in Supabase's DPA",
    },
  },
  {
    gruppo: "principali",
    nome: "Vercel (Vercel Inc.)",
    servizio: { it: "Pubblicazione del sito, della dashboard e dei menu online", en: "Publishing of the website, the dashboard and the online menus" },
    dati: {
      it: "Indirizzo IP, pagine visitate e dati tecnici del browser nei log; statistiche delle visite solo con il consenso",
      en: "IP address, pages visited and technical browser data in the logs; visit statistics only with consent",
    },
    paese: { it: "UE: Francoforte, Germania, per le funzioni del server; rete globale per i file pubblici", en: "EU: Frankfurt, Germany, for server functions; global network for public files" },
    garanzia: { it: "Data Privacy Framework e Clausole contrattuali standard", en: "Data Privacy Framework and Standard Contractual Clauses" },
  },
  {
    gruppo: "principali",
    nome: "Stripe (Stripe Payments Europe Ltd, Irlanda)",
    servizio: { it: "Abbonamenti dei locali, pagamenti e fatture", en: "Venue subscriptions, payments and invoices" },
    dati: {
      it: "Dati di fatturazione del locale (ragione sociale, indirizzo, email, partita IVA); i dati della carta si inseriscono solo sulle pagine di Stripe",
      en: "The venue's billing data (company name, address, email, VAT number); card details are entered only on Stripe's pages",
    },
    paese: { it: "UE e USA", en: "EU and USA" },
    garanzia: { it: "Data Privacy Framework e Clausole contrattuali standard", en: "Data Privacy Framework and Standard Contractual Clauses" },
  },
  {
    gruppo: "principali",
    nome: "Resend (Resend Inc.)",
    servizio: { it: "Invio delle email automatiche del servizio (benvenuto, avvisi, assistenza)", en: "Sending the service's automatic emails (welcome, alerts, support)" },
    dati: { it: "Nome e indirizzo email del destinatario, testo dell'email", en: "Recipient's name and email address, text of the email" },
    paese: { it: "USA (Virginia)", en: "USA (Virginia)" },
    garanzia: { it: "Clausole contrattuali standard nel DPA di Resend", en: "Standard Contractual Clauses in Resend's DPA" },
  },
  {
    gruppo: "principali",
    nome: "Anthropic (Anthropic PBC)",
    servizio: { it: "Assistente del ristoratore; importazione e traduzione del menu", en: "The restaurateur's assistant; menu import and translation" },
    dati: {
      it: "Messaggi scritti o dettati dallo staff all'assistente, con i numeri di telefono nascosti; testi e foto del menu",
      en: "Messages written or dictated by staff to the assistant, with telephone numbers hidden; menu text and photos",
    },
    paese: { it: "USA", en: "USA" },
    garanzia: { it: "Clausole contrattuali standard nel DPA di Anthropic", en: "Standard Contractual Clauses in Anthropic's DPA" },
  },
  {
    gruppo: "principali",
    nome: "OpenAI",
    servizio: { it: "Trascrizione dei messaggi vocali mandati all'assistente", en: "Transcription of voice messages sent to the assistant" },
    dati: {
      it: "Audio del messaggio vocale (non viene salvato da NovaMenu, si tiene solo il testo)",
      en: "Audio of the voice message (NovaMenu does not store it, only the text is kept)",
    },
    paese: { it: "USA", en: "USA" },
    garanzia: { it: "Data Privacy Framework e Clausole contrattuali standard", en: "Data Privacy Framework and Standard Contractual Clauses" },
  },
  {
    gruppo: "principali",
    nome: "Apple (Apple Distribution International Ltd, Irlanda / Apple Inc.)",
    servizio: { it: "Notifiche sull'iPhone e sull'iPad, distribuzione dell'app", en: "Notifications on iPhone and iPad, app distribution" },
    dati: {
      it: "Codice del dispositivo e testo della notifica (per esempio il nome del cliente di un ordine)",
      en: "Device code and notification text (for example the name of the customer who placed an order)",
    },
    paese: { it: "UE e USA", en: "EU and USA" },
    garanzia: { it: "Data Privacy Framework", en: "Data Privacy Framework" },
  },
  {
    gruppo: "principali",
    nome: "Zoho Mail (Zoho Corporation B.V., Paesi Bassi)",
    servizio: { it: "Casella email info@novamenu.eu", en: "The info@novamenu.eu mailbox" },
    dati: { it: "Email ricevute: nome, indirizzo e testo di chi ci scrive", en: "Emails received: name, address and text of the person writing to us" },
    paese: { it: "UE", en: "EU" },
    garanzia: { it: "Dati nell'UE", en: "Data in the EU" },
  },
  {
    gruppo: "principali",
    nome: "Komoot (komoot GmbH, Germania)",
    servizio: {
      it: "Suggerimenti degli indirizzi mentre si scrive (consegna a domicilio, indirizzo del locale)",
      en: "Address suggestions while typing (home delivery, venue address)",
    },
    dati: {
      it: "Solo il testo dell'indirizzo digitato, inviato dal nostro server (non riceve l'IP di chi scrive)",
      en: "Only the text of the address typed, sent by our server (it does not receive the IP address of the person typing)",
    },
    paese: { it: "UE: Germania", en: "EU: Germany" },
    garanzia: { it: "Nessun trasferimento fuori dall'UE", en: "No transfer outside the EU" },
  },
  {
    gruppo: "locale",
    nome: "Telegram (Telegram FZ-LLC, Emirati Arabi Uniti)",
    servizio: { it: "Canale per parlare con l'assistente, se il locale lo collega a Telegram", en: "Channel for talking to the assistant, if the venue connects it to Telegram" },
    dati: {
      it: "Messaggi tra lo staff del locale e l'assistente (possono contenere nomi dei clienti e dati delle prenotazioni; i telefoni sono nascosti)",
      en: "Messages between the venue's staff and the assistant (they may contain customer names and booking details; telephone numbers are hidden)",
    },
    paese: { it: "Più paesi, anche fuori dall'UE e dal Regno Unito", en: "Several countries, including outside the EU and the United Kingdom" },
    garanzia: {
      it: "Telegram non offre un contratto per il trattamento dei dati né garanzie standard per il trasferimento: il locale decide se usarlo",
      en: "Telegram does not offer a data processing agreement or standard transfer safeguards: the venue decides whether to use it",
    },
  },
  {
    gruppo: "visitatore",
    nome: "Google Maps (Google Ireland Ltd / Google LLC)",
    servizio: { it: "Mappa del locale nelle informazioni del menu", en: "Map of the venue in the menu information" },
    dati: {
      it: "Si carica solo se il visitatore tocca «Mostra la mappa»: da quel momento Google riceve IP e dati del browser",
      en: "It loads only if the visitor taps “Show the map”: from that moment Google receives the IP address and browser data",
    },
    paese: { it: "UE e USA", en: "EU and USA" },
    garanzia: { it: "Data Privacy Framework", en: "Data Privacy Framework" },
  },
];

const TITOLI_GRUPPI: Record<Gruppo, Testo> = {
  principali: { it: "Fornitori principali", en: "Main providers" },
  locale: { it: "Servizi che il locale sceglie di usare", en: "Services the venue chooses to use" },
  visitatore: { it: "Servizi che attiva solo il visitatore", en: "Services started only by the visitor" },
};

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export function tabellaFornitoriHtml(lingua: "it" | "en"): string {
  const titoli = lingua === "en" ? ["Provider", "What it is for", "Data processed", "Where the data is", "Transfer safeguard"] : ["Fornitore", "A cosa serve", "Dati trattati", "Dove sono i dati", "Garanzia per il trasferimento"];
  const th = titoli.map((h) => `<th scope="col">${h}</th>`).join("");
  // su telefono ogni riga diventa una scheda: l'etichetta della colonna sta in data-etichetta (vedi globals.css)
  const td = (i: number, v: string) => `<td data-etichetta="${titoli[i]}">${v}</td>`;
  return (Object.keys(TITOLI_GRUPPI) as Gruppo[])
    .map((g) => {
      const voci = FORNITORI.filter((f) => f.gruppo === g);
      if (!voci.length) return "";
      const rows = voci
        .map((f) => `<tr>${td(0, `<strong>${esc(f.nome)}</strong>`)}${td(1, esc(f.servizio[lingua]))}${td(2, esc(f.dati[lingua]))}${td(3, esc(f.paese[lingua]))}${td(4, esc(f.garanzia[lingua]))}</tr>`)
        .join("");
      return `<h3 id="${g}">${esc(TITOLI_GRUPPI[g][lingua])}</h3><div class="table-scroll tabella-schede"><table><thead><tr>${th}</tr></thead><tbody>${rows}</tbody></table></div>`;
    })
    .join("");
}

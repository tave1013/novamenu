/**
 * Elenco dei cookie e degli strumenti simili: unica tabella per la cookie policy
 * (src/content/legale/<lingua>/cookie.md, segnaposto {{tabellaCookie}}) e per il pannello
 * "Personalizza" del banner. Così i due elenchi non possono essere diversi.
 * Nomi e durate vanno tenuti allineati alla scansione reale (scripts/scansione-cookie.mjs).
 */
export type Categoria = "necessari" | "statistiche" | "marketing";
type Testo = { it: string; en: string };

export type VoceCookie = {
  /** Nome tecnico; se contiene una spiegazione, una versione per lingua. */
  nome: string | Testo;
  fornitore: Testo;
  categoria: Categoria;
  scopo: Testo;
  durata: Testo;
};

export const COOKIE: VoceCookie[] = [
  {
    nome: "nm_consenso",
    fornitore: { it: "NovaMenu (prima parte)", en: "NovaMenu (first party)" },
    categoria: "necessari",
    scopo: { it: "Ricorda le tue scelte sui cookie e la versione del consenso", en: "Remembers your cookie choices and the consent version" },
    durata: { it: "6 mesi", en: "6 months" },
  },
  {
    nome: "nm_preferenze",
    fornitore: { it: "NovaMenu (prima parte)", en: "NovaMenu (first party)" },
    categoria: "necessari",
    scopo: { it: "Ricorda la lingua che hai scelto", en: "Remembers the language you chose" },
    durata: { it: "12 mesi", en: "12 months" },
  },
  {
    nome: { it: "sb-pprjwaqzbrtigxfvdkcd-auth-token (memoria locale del browser)", en: "sb-pprjwaqzbrtigxfvdkcd-auth-token (browser local storage)" },
    fornitore: { it: "NovaMenu, tramite Supabase", en: "NovaMenu, via Supabase" },
    categoria: "necessari",
    scopo: { it: "Mantiene l'accesso alla piattaforma", en: "Keeps you signed in to the platform" },
    durata: { it: "Fino all'uscita o alla scadenza della sessione", en: "Until you sign out or the session expires" },
  },
  {
    nome: "nm_accesso",
    fornitore: { it: "NovaMenu (prima parte)", en: "NovaMenu (first party)" },
    categoria: "necessari",
    scopo: {
      it: "Indica al sito che hai già fatto l'accesso alla piattaforma, per mostrarti il link alla dashboard. Non contiene dati personali",
      en: "Tells the website you are already signed in to the platform, so it can show you the link to the dashboard. It contains no personal data",
    },
    durata: { it: "Fino all'uscita dalla piattaforma, al massimo 30 giorni", en: "Until you sign out of the platform, up to 30 days" },
  },
  {
    nome: { it: "attivita-attiva (memoria locale del browser)", en: "attivita-attiva (browser local storage)" },
    fornitore: { it: "NovaMenu (prima parte)", en: "NovaMenu (first party)" },
    categoria: "necessari",
    scopo: { it: "Ricorda quale locale hai selezionato nella piattaforma", en: "Remembers which venue you selected on the platform" },
    durata: { it: "Finché non la cancelli dal browser", en: "Until you clear it in your browser" },
  },
  {
    nome: { it: "assistenza, assistenza-tenant, cliente (memoria di sessione del browser)", en: "assistenza, assistenza-tenant, cliente (browser session storage)" },
    fornitore: { it: "NovaMenu (prima parte)", en: "NovaMenu (first party)" },
    categoria: "necessari",
    scopo: {
      it: "Gestiscono una sessione di assistenza richiesta dal locale e l'anteprima del menu nella piattaforma",
      en: "Handle a support session requested by the venue and the menu preview on the platform",
    },
    durata: { it: "Fino alla chiusura della scheda", en: "Until you close the tab" },
  },
  {
    nome: { it: "Cookie di Stripe (per esempio __stripe_mid, __stripe_sid)", en: "Stripe cookies (for example __stripe_mid, __stripe_sid)" },
    fornitore: { it: "Stripe (terza parte)", en: "Stripe (third party)" },
    categoria: "necessari",
    scopo: {
      it: "Sicurezza dei pagamenti e prevenzione delle frodi, solo nelle pagine di pagamento",
      en: "Payment security and fraud prevention, only on payment pages",
    },
    durata: { it: "__stripe_mid 1 anno, __stripe_sid 30 minuti", en: "__stripe_mid 1 year, __stripe_sid 30 minutes" },
  },
  {
    nome: "_ga",
    fornitore: { it: "Google Ireland Limited (Google Analytics)", en: "Google Ireland Limited (Google Analytics)" },
    categoria: "statistiche",
    scopo: { it: "Distingue i visitatori in forma pseudonima", en: "Distinguishes visitors on a pseudonymous basis" },
    durata: { it: "2 anni", en: "2 years" },
  },
  {
    nome: "_ga_[ID]",
    fornitore: { it: "Google Ireland Limited (Google Analytics)", en: "Google Ireland Limited (Google Analytics)" },
    categoria: "statistiche",
    scopo: { it: "Mantiene lo stato della sessione", en: "Keeps the session state" },
    durata: { it: "2 anni", en: "2 years" },
  },
  {
    nome: "_clck",
    fornitore: { it: "Microsoft (Clarity)", en: "Microsoft (Clarity)" },
    categoria: "statistiche",
    scopo: { it: "Identificativo pseudonimo del visitatore per Clarity", en: "Pseudonymous visitor identifier for Clarity" },
    durata: { it: "1 anno", en: "1 year" },
  },
  {
    nome: "_clsk",
    fornitore: { it: "Microsoft (Clarity)", en: "Microsoft (Clarity)" },
    categoria: "statistiche",
    scopo: { it: "Collega le pagine viste in una stessa sessione", en: "Links the pages viewed in the same session" },
    durata: { it: "1 giorno", en: "1 day" },
  },
  {
    nome: "CLID, MUID",
    fornitore: { it: "Microsoft (Clarity)", en: "Microsoft (Clarity)" },
    categoria: "statistiche",
    scopo: { it: "Identificano il browser tra più siti che usano Clarity", en: "Identify the browser across sites that use Clarity" },
    durata: { it: "1 anno", en: "1 year" },
  },
  {
    nome: "_fbp",
    fornitore: { it: "Meta Platforms Ireland Limited (Meta Pixel)", en: "Meta Platforms Ireland Limited (Meta Pixel)" },
    categoria: "marketing",
    scopo: { it: "Misura le visite e le conversioni delle pubblicità di NovaMenu", en: "Measures visits and conversions from NovaMenu ads" },
    durata: { it: "3 mesi", en: "3 months" },
  },
  {
    nome: "fr",
    fornitore: { it: "Meta Platforms Ireland Limited", en: "Meta Platforms Ireland Limited" },
    categoria: "marketing",
    scopo: { it: "Pubblicità e misurazione su Facebook e Instagram", en: "Advertising and measurement on Facebook and Instagram" },
    durata: { it: "3 mesi", en: "3 months" },
  },
];

const intestazioni = {
  it: ["Nome", "Fornitore", "Categoria", "Scopo", "Durata"],
  en: ["Name", "Provider", "Category", "Purpose", "Duration"],
};

export const nomeCategoria: Record<Categoria, Testo> = {
  necessari: { it: "Necessario", en: "Necessary" },
  statistiche: { it: "Statistiche", en: "Statistics" },
  marketing: { it: "Marketing", en: "Marketing" },
};

/** Nome del cookie nella lingua richiesta. */
export const nomeCookie = (c: VoceCookie, lingua: "it" | "en") => (typeof c.nome === "string" ? c.nome : c.nome[lingua]);

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** Tabella HTML della cookie policy, generata dalla stessa lista del banner. */
export function tabellaCookieHtml(lingua: "it" | "en"): string {
  const th = intestazioni[lingua].map((h) => `<th scope="col">${h}</th>`).join("");
  const rows = COOKIE.map(
    (c) =>
      `<tr><td><code>${esc(nomeCookie(c, lingua))}</code></td><td>${esc(c.fornitore[lingua])}</td><td>${esc(nomeCategoria[c.categoria][lingua])}</td><td>${esc(c.scopo[lingua])}</td><td>${esc(c.durata[lingua])}</td></tr>`,
  ).join("");
  return `<table><thead><tr>${th}</tr></thead><tbody>${rows}</tbody></table>`;
}

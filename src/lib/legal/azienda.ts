/**
 * Dati della società e dei documenti legali: unica fonte per pagine legali, piè di pagina,
 * contatti, PDF, dati per Google e llms.txt. Nessun dato della società va scritto a mano altrove.
 *
 * I dati che mancano restano null. Le pagine e i PDF non mostrano mai un segnaposto:
 * nei documenti le frasi che usano un dato mancante stanno dentro {{#se dato}} ... {{/se}}
 * e spariscono intere finché il dato non c'è (vedi src/lib/legal/documenti.ts).
 * Per mostrarle basta scrivere qui il dato: al build successivo compaiono ovunque.
 *
 * La piattaforma (app.novamenu.eu) legge versioni e date da /legale/versioni.json,
 * così quando il ristoratore accetta i documenti vede le stesse di questo file.
 */
export type Lingua = "it" | "en";

export const AZIENDA = {
  marchio: "NovaMenu",
  /** Nome registrato a Companies House. */
  ragioneSociale: "MA & CO LIMITED",
  tipo: {
    it: "private limited company costituita in Inghilterra e Galles",
    en: "private limited company incorporated in England and Wales",
  },
  numeroSocieta: "09272992",
  sedeLegale: {
    righe: ["C/O Entwistle Chartered Accountants", "Suite 12 Blackburn Business Centre", "Davyfield Road"],
    citta: "Blackburn",
    contea: "Lancashire",
    cap: "BB1 2QY",
    paese: { it: "Regno Unito", en: "United Kingdom" },
  },
  /** Numero di registrazione all'ICO (Information Commissioner's Office). Da fornire. */
  numeroICO: null as string | null,
  /** Partita IVA o VAT number. Da fornire. */
  partitaIva: null as string | null,
  emailContatto: "info@novamenu.eu",
  /**
   * Email dedicata alla privacy. Da fornire. Finché manca, i documenti indicano l'email di contatto
   * e la pagina "Richieste privacy" resta nascosta.
   */
  emailPrivacy: null as string | null,
  /** Rappresentante nell'UE (art. 27 GDPR). Da fornire: la sezione compare quando ci sono nome e indirizzo. */
  rappresentanteUE: {
    nome: null as string | null,
    indirizzo: null as string | null,
    email: null as string | null,
  },
  /** Data di entrata in vigore dei documenti, nel formato AAAA-MM-GG. Da fornire. */
  dataInVigore: null as string | null,
  /** Giorni per annullare l'eliminazione dell'account (piattaforma, migrazione 0036_elimina_account). */
  giorniAnnullaEliminazione: 30,
  sito: "https://novamenu.eu",
  piattaforma: "https://app.novamenu.eu",
};

/**
 * Versione in vigore di ogni documento. Quando un documento cambia:
 * 1. copia il file attuale in src/content/legale/archivio/<lingua>/<documento>-<versione>.md
 *    e scrivi nella sua intestazione "inVigoreDal" e "inVigoreFinoAl";
 * 2. modifica il documento e alza qui la versione, con la nuova data se è diversa da quella comune.
 */
export const VERSIONI = {
  "note-legali": { versione: "1.0", inVigoreDal: null as string | null },
  privacy: { versione: "1.1", inVigoreDal: "2026-10-24" as string | null },
  "privacy-app": { versione: "1.0", inVigoreDal: null as string | null },
  cookie: { versione: "1.0", inVigoreDal: null as string | null },
  termini: { versione: "1.1", inVigoreDal: "2026-10-24" as string | null },
  dpa: { versione: "1.1", inVigoreDal: "2026-10-24" as string | null },
  fornitori: { versione: "1.0", inVigoreDal: null as string | null },
  indice: { versione: "1.0", inVigoreDal: null as string | null },
};
export type DocumentoVersionato = keyof typeof VERSIONI;

/** Data in vigore di un documento (la sua, oppure quella comune), oppure null se non c'è ancora. */
export const inVigoreDal = (doc: DocumentoVersionato) => VERSIONI[doc].inVigoreDal ?? AZIENDA.dataInVigore;

/** "2026-12-01" diventa "1 dicembre 2026" o "1 December 2026". */
export function dataLunga(iso: string, lingua: Lingua): string {
  const [a, m, g] = iso.split("-").map(Number);
  return new Date(Date.UTC(a, m - 1, g)).toLocaleDateString(lingua === "en" ? "en-GB" : "it-IT", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
}

/** Email per la privacy: quella dedicata se c'è, altrimenti l'email di contatto. */
export const emailPrivacy = () => AZIENDA.emailPrivacy ?? AZIENDA.emailContatto;

/** Il rappresentante nell'UE è completo (e si mostra) solo con nome e indirizzo. */
export const haRappresentanteUE = () => !!(AZIENDA.rappresentanteUE.nome && AZIENDA.rappresentanteUE.indirizzo);

/** Sede legale su una riga. */
export function sedeLegale(lingua: Lingua = "it"): string {
  const s = AZIENDA.sedeLegale;
  return [...s.righe, s.citta, s.contea, s.cap, s.paese[lingua]].join(", ");
}

/** Riga del footer: "NovaMenu è un servizio di MA & CO LIMITED, società registrata in Inghilterra e Galles n. 09272992". */
export function rigaSocieta(lingua: Lingua = "it"): string {
  return lingua === "en"
    ? `${AZIENDA.marchio} is a service of ${AZIENDA.ragioneSociale}, a company registered in England and Wales, no. ${AZIENDA.numeroSocieta}`
    : `${AZIENDA.marchio} è un servizio di ${AZIENDA.ragioneSociale}, società registrata in Inghilterra e Galles n. ${AZIENDA.numeroSocieta}`;
}

/**
 * Valori che i documenti in src/content/legale leggono con {{nome}}.
 * null vuol dire "dato mancante": va usato solo dentro {{#se nome}} ... {{/se}},
 * altrimenti il build si ferma (così nessun segnaposto arriva online).
 */
export function segnapostoAzienda(lingua: Lingua): Record<string, string | null> {
  const r = AZIENDA.rappresentanteUE;
  const tipo = AZIENDA.tipo[lingua];
  return {
    marchio: AZIENDA.marchio,
    ragioneSociale: AZIENDA.ragioneSociale,
    tipo,
    Tipo: tipo.replace(/^./, (c) => c.toUpperCase()),
    numeroSocieta: AZIENDA.numeroSocieta,
    sedeLegale: sedeLegale(lingua),
    partitaIva: AZIENDA.partitaIva,
    numeroICO: AZIENDA.numeroICO,
    rappresentanteUE: haRappresentanteUE() ? `${r.nome}, ${r.indirizzo}` : null,
    emailRappresentanteUE: haRappresentanteUE() ? r.email : null,
    emailContatto: AZIENDA.emailContatto,
    emailPrivacy: emailPrivacy(),
    sito: AZIENDA.sito.replace(/^https?:\/\//, ""),
    piattaforma: AZIENDA.piattaforma.replace(/^https?:\/\//, ""),
    giorniAnnullaEliminazione: String(AZIENDA.giorniAnnullaEliminazione),
  };
}

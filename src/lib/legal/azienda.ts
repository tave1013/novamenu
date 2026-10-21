/**
 * Dati della società: unica fonte per pagine legali, footer, contatti ed email.
 * I valori tra parentesi quadre sono ancora da fornire dal titolare: restano visibili così come sono
 * finché non vengono sostituiti qui. Nessun dato della società va scritto a mano altrove.
 *
 * La piattaforma (app.novamenu.eu), l'app e le funzioni Supabase stanno in altri repository:
 * devono leggere gli stessi valori (copiati identici se non possono importare questo file).
 */
export const AZIENDA = {
  marchio: "NovaMenu",
  ragioneSociale: "Ma & Co LTD",
  tipo: "private limited company costituita in Inghilterra e Galles",
  numeroSocieta: "[NUMERO COMPANIES HOUSE]",
  sedeLegale: {
    riga1: "Unit 12, Blackburn Business Centre",
    riga2: "Davy Field Road",
    citta: "Blackburn",
    cap: "BB1 2QY",
    paese: "Regno Unito",
  },
  partitaIva: "[PARTITA IVA / VAT NUMBER, se presente]",
  registrazioneICO: "[NUMERO DI REGISTRAZIONE ICO]",
  rappresentanteUE: "[NOME E INDIRIZZO DEL RAPPRESENTANTE NELL'UE (art. 27 GDPR)]",
  emailContatto: "info@novamenu.eu",
  emailPrivacy: "info@novamenu.eu",
  sito: "https://novamenu.eu",
  piattaforma: "https://app.novamenu.eu",
  versioneDocumenti: "1.0",
  dataInVigore: "[DATA DI PUBBLICAZIONE]",
  /** Data dell'ultimo aggiornamento mostrata in testa alle pagine legali. */
  ultimoAggiornamento: "[DATA]",
} as const;

/** Le poche voci che cambiano nella versione inglese dei documenti. */
export const AZIENDA_EN = {
  tipo: "private limited company incorporated in England and Wales",
  paese: "United Kingdom",
} as const;

type Lingua = "it" | "en";

/** Sede legale su una riga: "Unit 12, Blackburn Business Centre, Davy Field Road, Blackburn BB1 2QY, Regno Unito". */
export function sedeLegale(lingua: Lingua = "it"): string {
  const s = AZIENDA.sedeLegale;
  const paese = lingua === "en" ? AZIENDA_EN.paese : s.paese;
  return `${s.riga1}, ${s.riga2}, ${s.citta} ${s.cap}, ${paese}`;
}

/** Riga del footer: "NovaMenu è un servizio di Ma & Co LTD, società registrata in Inghilterra e Galles n. ...". */
export function rigaSocieta(lingua: Lingua = "it"): string {
  return lingua === "en"
    ? `${AZIENDA.marchio} is a service of ${AZIENDA.ragioneSociale}, a company registered in England and Wales, no. ${AZIENDA.numeroSocieta}`
    : `${AZIENDA.marchio} è un servizio di ${AZIENDA.ragioneSociale}, società registrata in Inghilterra e Galles n. ${AZIENDA.numeroSocieta}`;
}

/**
 * Valori che i documenti in src/content/legale leggono con {{nome}}.
 * Esempio: {{numeroSocieta}} diventa "[NUMERO COMPANIES HOUSE]" finché il numero non c'è.
 */
export function segnapostoAzienda(lingua: Lingua): Record<string, string> {
  return {
    marchio: AZIENDA.marchio,
    ragioneSociale: AZIENDA.ragioneSociale,
    tipo: lingua === "en" ? AZIENDA_EN.tipo : AZIENDA.tipo,
    Tipo: (lingua === "en" ? AZIENDA_EN.tipo : AZIENDA.tipo).replace(/^./, (c) => c.toUpperCase()),
    numeroSocieta: AZIENDA.numeroSocieta,
    sedeLegale: sedeLegale(lingua),
    partitaIva: AZIENDA.partitaIva,
    registrazioneICO: AZIENDA.registrazioneICO,
    rappresentanteUE: AZIENDA.rappresentanteUE,
    emailContatto: AZIENDA.emailContatto,
    emailPrivacy: AZIENDA.emailPrivacy,
    sito: AZIENDA.sito.replace(/^https?:\/\//, ""),
    piattaforma: AZIENDA.piattaforma.replace(/^https?:\/\//, ""),
    versione: AZIENDA.versioneDocumenti,
    dataInVigore: AZIENDA.dataInVigore,
  };
}

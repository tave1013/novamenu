/**
 * Testi del banner dei cookie. L'italiano è quello della sezione 17.B dei documenti legali,
 * l'inglese ne è la traduzione. Non cambiarli senza aggiornare anche la cookie policy.
 */
export type TestiBanner = {
  titolo: string;
  testo: string;
  /** Testo usato quando non è collegato nessuno strumento di statistica o marketing. */
  testoSoloTecnici: string;
  cookiePolicy: string;
  informativaPrivacy: string;
  rifiuta: string;
  personalizza: string;
  accettaTutti: string;
  chiudi: string;
  titoloPannello: string;
  salvaScelte: string;
  mostraDettagli: string;
  nascondiDettagli: string;
  sempreAttivi: string;
  categorie: { necessari: { nome: string; testo: string }; statistiche: { nome: string; testo: string }; marketing: { nome: string; testo: string } };
  colonne: { nome: string; fornitore: string; durata: string };
};

export const TESTI_BANNER: Record<"it" | "en", TestiBanner> = {
  it: {
    titolo: "Usiamo i cookie con il tuo permesso",
    testo:
      "Usiamo cookie tecnici per far funzionare il sito. Con il tuo consenso usiamo anche cookie di statistica, per capire come viene usato il sito, e di marketing, per misurare le nostre pubblicità. Se chiudi con la X, usiamo solo quelli tecnici. Puoi cambiare idea quando vuoi da \"Preferenze cookie\" in fondo alla pagina.",
    testoSoloTecnici:
      "Per ora usiamo solo cookie tecnici, che servono a far funzionare il sito e non richiedono il consenso. Non usiamo cookie di statistica o di marketing: se in futuro li useremo, te lo chiederemo qui prima di attivarli. Puoi rivedere le tue scelte quando vuoi da \"Preferenze cookie\" in fondo alla pagina.",
    cookiePolicy: "Cookie policy",
    informativaPrivacy: "Informativa privacy",
    rifiuta: "Rifiuta",
    personalizza: "Personalizza",
    accettaTutti: "Accetta tutti",
    chiudi: "Chiudi: usa solo i cookie tecnici",
    titoloPannello: "Scegli quali cookie usare",
    salvaScelte: "Salva le scelte",
    mostraDettagli: "Mostra dettagli",
    nascondiDettagli: "Nascondi dettagli",
    sempreAttivi: "sempre attivi",
    categorie: {
      necessari: { nome: "Necessari", testo: "Fanno funzionare il sito, ricordano la lingua e le tue scelte. Senza questi il sito non funziona." },
      statistiche: {
        nome: "Statistiche",
        testo: "Google Analytics e Microsoft Clarity. Ci dicono quante persone visitano il sito e come lo usano, così possiamo migliorarlo. Clarity non registra quello che scrivi.",
      },
      marketing: {
        nome: "Marketing",
        testo: "Meta Pixel. Misura l'efficacia delle nostre pubblicità su Facebook e Instagram e ci permette di mostrarti annunci di NovaMenu.",
      },
    },
    colonne: { nome: "Nome", fornitore: "Fornitore", durata: "Durata" },
  },
  en: {
    titolo: "We use cookies with your permission",
    testo:
      "We use technical cookies to make the site work. With your consent we also use statistics cookies, to understand how the site is used, and marketing cookies, to measure our advertising. If you close with the X, we only use the technical ones. You can change your mind at any time from \"Cookie preferences\" at the bottom of the page.",
    testoSoloTecnici:
      "For now we only use technical cookies, which make the site work and do not require consent. We do not use statistics or marketing cookies: if we use them in the future, we will ask you here before turning them on. You can review your choices at any time from \"Cookie preferences\" at the bottom of the page.",
    cookiePolicy: "Cookie policy",
    informativaPrivacy: "Privacy notice",
    rifiuta: "Reject",
    personalizza: "Customise",
    accettaTutti: "Accept all",
    chiudi: "Close: use technical cookies only",
    titoloPannello: "Choose which cookies to use",
    salvaScelte: "Save my choices",
    mostraDettagli: "Show details",
    nascondiDettagli: "Hide details",
    sempreAttivi: "always active",
    categorie: {
      necessari: { nome: "Necessary", testo: "They make the site work and remember your language and your choices. Without them the site does not work." },
      statistiche: {
        nome: "Statistics",
        testo: "Google Analytics and Microsoft Clarity. They tell us how many people visit the site and how they use it, so we can improve it. Clarity does not record what you type.",
      },
      marketing: {
        nome: "Marketing",
        testo: "Meta Pixel. It measures how well our ads on Facebook and Instagram work and allows us to show you NovaMenu ads.",
      },
    },
    colonne: { nome: "Name", fornitore: "Provider", durata: "Duration" },
  },
};

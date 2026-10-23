import { AZIENDA } from "./azienda";
import { FORNITORI } from "@/content/legale/fornitori";
import { STRUMENTI_SITO } from "@/lib/consenso/consenso";

/*
 * Quali parti dei documenti legali si mostrano: dipende dai dati presenti, mai da una scelta a mano.
 * Si legge durante il build (le variabili d'ambiente sono quelle di Vercel).
 */

/** La pagina Fornitori compare quando c'è l'elenco della piattaforma. */
export const fornitoriPubblicati = () => FORNITORI.length > 0;

/** La pagina Richieste privacy compare quando ci sono l'email privacy e l'indirizzo del server che riceve le richieste. */
export const richiestePrivacyAttive = () => !!AZIENDA.emailPrivacy && !!process.env.RICHIESTE_PRIVACY_URL;

/** Strumenti di statistica e marketing collegati sul sito (con il loro ID). */
export const strumentiAttivi = () => ({
  ga4: !!STRUMENTI_SITO.ga4,
  clarity: !!STRUMENTI_SITO.clarity,
  metaPixel: !!STRUMENTI_SITO.metaPixel,
});

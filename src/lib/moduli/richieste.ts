import { getLocale, tr } from "@/i18n";

/*
 * Lato browser dei moduli demo e contatti: salva la prova di cosa è stato mostrato e accettato
 * (versione dell'informativa, consensi, data e ora li aggiunge il server). Non blocca mai l'invio su WhatsApp.
 */

/** La riga che sostituisce l'accettazione di Termini e Privacy: per chiedere una demo non serve accettare nulla. */
export const rigaRicontatto = () => tr("Inviando la richiesta accetti di essere ricontattato.");

export function registraRichiesta(dati: {
  tipo: "demo" | "contatto";
  nome: string;
  attivita?: string;
  email?: string;
  telefono?: string;
  messaggio?: string;
  consensi: { whatsapp: boolean };
}) {
  const body = JSON.stringify({ ...dati, lingua: getLocale(), testo_mostrato: `${rigaRicontatto()} ${tr("Informativa privacy")}`, sito: "" });
  try {
    fetch("/api/richiesta-demo/", { method: "POST", headers: { "Content-Type": "application/json" }, body, keepalive: true, credentials: "omit" }).catch(() => {});
  } catch {
    /* il salvataggio non deve mai bloccare la richiesta */
  }
}

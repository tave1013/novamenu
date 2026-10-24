import { getLocale, tr } from "@/i18n";

/*
 * Lato browser dei moduli demo e contatti: salva sulla piattaforma la richiesta e la prova di cosa
 * è stato mostrato e accettato (testo mostrato, consensi con data e ora). La versione dell'informativa
 * la aggiunge il server. Non blocca mai l'invio su WhatsApp, che resta come prima.
 */

/** La riga che sostituisce l'accettazione di Termini e Privacy: per chiedere una demo non serve accettare nulla. */
export const rigaRicontatto = () => tr("Inviando la richiesta accetti di essere ricontattato.");

export type ConsensoModulo = { tipo: string; valore: boolean; data?: string; testo?: string };

export function registraRichiesta(dati: {
  nome: string;
  email?: string;
  telefono?: string;
  messaggio?: string;
  /** Quando il modulo è comparso (Date.now()): serve alla piattaforma come protezione anti spam. */
  inizio: number;
  /** Campo trappola nascosto: le persone lo lasciano vuoto. */
  website?: string;
  consensi: ConsensoModulo[];
}) {
  const testoMostrato = `${rigaRicontatto()} ${tr("Informativa privacy")}`;
  const body = JSON.stringify({
    nome: dati.nome,
    email: dati.email || undefined,
    telefono: dati.telefono || undefined,
    messaggio: dati.messaggio || undefined,
    pagina: location.pathname,
    testo_mostrato: testoMostrato,
    consensi: [{ tipo: "ricontatto", valore: true, data: new Date().toISOString(), testo: testoMostrato }, ...dati.consensi],
    lingua: getLocale(),
    t: Date.now() - dati.inizio,
    website: dati.website ?? "",
  });
  try {
    fetch("/api/richiesta-demo/", { method: "POST", headers: { "Content-Type": "application/json" }, body, keepalive: true, credentials: "omit" }).catch(() => {});
  } catch {
    /* il salvataggio non deve mai bloccare la richiesta */
  }
}

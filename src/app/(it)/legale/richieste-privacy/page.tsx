import { notFound } from "next/navigation";
import { setLocale } from "@/i18n";
import { richiestePrivacyAttive } from "@/lib/legal/visibilita";
import { LegalRequestsView, metaRichieste } from "@/views/Legal";

/* Richieste privacy: la pagina esiste solo quando ci sono l'email privacy e l'indirizzo del server (vedi visibilita.ts). */
export const metadata = metaRichieste("it");

export default function Page() {
  if (!richiestePrivacyAttive()) notFound();
  setLocale("it");
  return <LegalRequestsView />;
}

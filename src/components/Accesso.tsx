"use client";

import { useSyncExternalStore } from "react";
import { tr } from "@/i18n";
import { dashboardUrl, loginUrl } from "@/config/site";

/*
 * "Accedi" o "Dashboard", come nelle applicazioni professionali: se hai già fatto l'accesso
 * alla piattaforma e non sei uscito, il sito mostra "Dashboard" e ti porta dritto dentro.
 *
 * Il sito non può leggere la sessione di app.novamenu.eu (sta nella memoria del browser di quel
 * dominio). Per questo la piattaforma scrive un cookie tecnico sul dominio comune:
 *   nm_accesso=<slug del locale>; Domain=.novamenu.eu; Path=/; Secure; SameSite=Lax; Max-Age=2592000
 * quando l'accesso è completo (anche la verifica in due passaggi), lo rinnova a ogni apertura
 * e lo cancella quando esci. Con lo slug il link va direttamente a app.novamenu.eu/<slug>/,
 * senza passare dalla pagina d'ingresso che controlla l'accesso e poi reindirizza.
 * Vale anche nm_accesso=1 (accesso fatto, slug non noto): il link va alla pagina d'ingresso.
 * Finché il cookie non c'è, si vede "Accedi".
 */
export const COOKIE_ACCESSO = "nm_accesso";

function leggiAccesso(): string {
  const riga = document.cookie.split("; ").find((c) => c.startsWith(`${COOKIE_ACCESSO}=`));
  return riga ? decodeURIComponent(riga.slice(COOKIE_ACCESSO.length + 1)) : "";
}

const iscriviti = () => () => {};

/** Indirizzo della dashboard se l'utente ha fatto l'accesso, altrimenti null. */
export function useDashboard(): string | null {
  const valore = useSyncExternalStore(iscriviti, leggiAccesso, () => "");
  if (!valore) return null;
  if (valore === "1") return dashboardUrl;
  return /^[a-z0-9][a-z0-9-]{0,62}$/.test(valore) ? `${dashboardUrl}/${valore}/` : dashboardUrl;
}

export function LinkAccesso({ className }: { className?: string }) {
  const dashboard = useDashboard();
  return (
    <a href={dashboard ?? loginUrl} className={className}>
      {dashboard ? tr("Dashboard") : tr("Accedi")}
    </a>
  );
}

"use client";

import { useSyncExternalStore } from "react";
import { tr } from "@/i18n";
import { dashboardUrl, loginUrl } from "@/config/site";

/*
 * "Accedi" o "Dashboard", come nelle applicazioni professionali: se hai già fatto l'accesso
 * alla piattaforma, il sito ti porta dritto alla dashboard.
 *
 * Il sito non può leggere la sessione di app.novamenu.eu (sta nella memoria del browser di quel
 * dominio). Per questo la piattaforma scrive un cookie tecnico, senza dati personali:
 *   nm_accesso=1; Domain=.novamenu.eu; Path=/; Secure; SameSite=Lax; Max-Age=2592000 (30 giorni)
 * quando fai l'accesso (e lo rinnova a ogni apertura), e lo cancella quando esci.
 * Finché il cookie non c'è, si vede sempre "Accedi".
 */
export const COOKIE_ACCESSO = "nm_accesso";

const haAccesso = () => document.cookie.split("; ").some((c) => c === `${COOKIE_ACCESSO}=1`);
const iscriviti = () => () => {};

export function useAccesso() {
  return useSyncExternalStore(iscriviti, haAccesso, () => false);
}

export function LinkAccesso({ className }: { className?: string }) {
  const accesso = useAccesso();
  return (
    <a href={accesso ? dashboardUrl : loginUrl} className={className}>
      {accesso ? tr("Dashboard") : tr("Accedi")}
    </a>
  );
}

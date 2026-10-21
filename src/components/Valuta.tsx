"use client";

import { useCallback, useSyncExternalStore } from "react";
import { getLocale, tr } from "@/i18n";
import { localeInfo } from "@/i18n/config";
import { formatoPrezzo, valutaPerPaese, type Valuta } from "@/config/prezzi";

/*
 * Valuta dei prezzi, condivisa da tutti i componenti della pagina. Non si sceglie a mano:
 * decide il paese dell'IP (euro nell'Unione europea, sterline nel Regno Unito e nel resto del mondo).
 * Se il paese non arriva, decide la lingua della pagina.
 * Finché il paese non è noto i prezzi restano nascosti, così non si vede il cambio di valuta.
 */
type Stato = { valuta: Valuta; pronta: boolean };
let stato: Stato = { valuta: "eur", pronta: false };
const ascoltatori = new Set<() => void>();
let avviata = false;

function imposta(nuovo: Stato) {
  stato = nuovo;
  ascoltatori.forEach((f) => f());
}

function avvia() {
  if (avviata) return;
  avviata = true;
  const lingua = getLocale() === "en" ? "en" : "it";
  const daLingua = () => imposta({ valuta: valutaPerPaese(null, lingua), pronta: true });
  const riserva = window.setTimeout(daLingua, 1500);
  fetch("/api/paese/", { cache: "no-store" })
    .then((r) => r.json())
    .then((j: { paese?: string | null }) => imposta({ valuta: valutaPerPaese(j.paese, lingua), pronta: true }))
    .catch(daLingua)
    .finally(() => window.clearTimeout(riserva));
}

function iscriviti(f: () => void) {
  ascoltatori.add(f);
  avvia();
  return () => ascoltatori.delete(f);
}

const dalServer: Stato = { valuta: "eur", pronta: false };

export function useValuta() {
  const s = useSyncExternalStore(iscriviti, () => stato, () => dalServer);
  const formato = useCallback((importo: number) => formatoPrezzo(importo, s.valuta, localeInfo[getLocale()].intl), [s.valuta]);
  return { ...s, formato };
}

/** Prezzo mensile di un piano, per la tabella di confronto. */
export function PrezzoMensile({ eur, gbp }: { eur: number; gbp: number }) {
  const { valuta, pronta, formato } = useValuta();
  return (
    <span className={`transition-opacity duration-300 ${pronta ? "opacity-100" : "opacity-0"}`}>
      {formato(valuta === "gbp" ? gbp : eur)} {tr("al mese + IVA")}
    </span>
  );
}

/** Link per iscriversi a un piano: porta al pagamento nella valuta mostrata. */
export function LinkIscrizione({ base, piano, className, children }: { base: string; piano: string; className?: string; children: React.ReactNode }) {
  const { valuta } = useValuta();
  return (
    <a href={`${base}?piano=${piano}&valuta=${valuta}`} className={className}>
      {children}
    </a>
  );
}

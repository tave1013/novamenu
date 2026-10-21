"use client";

import { useCallback, useSyncExternalStore } from "react";
import { getLocale, tr } from "@/i18n";
import { localeInfo } from "@/i18n/config";
import { PAESI_STERLINA, VALUTE, formatoPrezzo, type Valuta } from "@/config/prezzi";
import { preferenzeBrowser, salvaPreferenza } from "@/i18n/lingua-iniziale";

/*
 * Valuta dei prezzi, condivisa da tutti i componenti della pagina.
 * 1. Se l'utente l'ha scelta dal selettore, vale la sua scelta (cookie nm_preferenze).
 * 2. Altrimenti decide il paese: Regno Unito in sterline, tutti gli altri in euro.
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
  const scelta = preferenzeBrowser().valuta;
  if (scelta) return imposta({ valuta: scelta, pronta: true });
  const riserva = window.setTimeout(() => imposta({ valuta: stato.valuta, pronta: true }), 1500);
  fetch("/api/paese/", { cache: "no-store" })
    .then((r) => r.json())
    .then((j: { paese?: string | null }) => {
      if (preferenzeBrowser().valuta) return;
      imposta({ valuta: j.paese && PAESI_STERLINA.has(j.paese.toUpperCase()) ? "gbp" : "eur", pronta: true });
    })
    .catch(() => imposta({ valuta: stato.valuta, pronta: true }))
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
  const scegli = useCallback((v: Valuta) => {
    salvaPreferenza({ valuta: v });
    imposta({ valuta: v, pronta: true });
  }, []);
  const formato = useCallback((importo: number) => formatoPrezzo(importo, s.valuta, localeInfo[getLocale()].intl), [s.valuta]);
  return { ...s, scegli, formato };
}

/** Selettore € / £ accanto ai prezzi. */
export function SelettoreValuta({ className = "" }: { className?: string }) {
  const { valuta, scegli } = useValuta();
  return (
    <div role="radiogroup" aria-label={tr("Valuta dei prezzi")} className={`inline-flex rounded-[12px] border border-line bg-white p-1 ${className}`}>
      {(Object.keys(VALUTE) as Valuta[]).map((v) => (
        <button
          key={v}
          type="button"
          role="radio"
          aria-checked={valuta === v}
          aria-label={v === "eur" ? tr("Euro") : tr("Sterline")}
          onClick={() => scegli(v)}
          className={`flex h-10 min-w-11 items-center justify-center rounded-[9px] px-3 text-[15px] font-medium transition-all duration-300 ${
            valuta === v ? "bg-forest text-white" : "text-muted hover:text-ink"
          }`}
        >
          {VALUTE[v].simbolo}
        </button>
      ))}
    </div>
  );
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

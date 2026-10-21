"use client";

import { useState } from "react";
import { tr } from "@/i18n";
import { Icon } from "../Icon";
import { FoglioTelefono, type FormatoTelefono } from "./ListaOrdiniTelefono";

/*
 * Sezione Stampa su telefono (sotto i 768 px): un foglio alla volta, scelto con tre schede.
 * I tre fogli stanno uno sopra l'altro nella stessa cella, così cambiando scheda l'altezza
 * non salta e il passaggio è solo una dissolvenza leggera.
 */
const FORMATI: FormatoTelefono[] = ["verticale", "orizzontale", "tabella"];

export function StampaTelefono({ formati }: { formati: { name: string; text: string }[] }) {
  const [attivo, setAttivo] = useState(0);
  const schede = [tr("Verticale"), tr("Orizzontale"), tr("Tabella")];
  return (
    <div>
      <div role="tablist" aria-label={tr("Formato del foglio")} className="grid grid-cols-3 gap-1 rounded-full border border-line bg-white p-1">
        {schede.map((s, i) => (
          <button
            key={s}
            type="button"
            role="tab"
            id={`foglio-scheda-${i}`}
            aria-selected={attivo === i}
            aria-controls={`foglio-pannello-${i}`}
            onClick={() => setAttivo(i)}
            className={`flex min-h-11 items-center justify-center rounded-full px-2 text-[14.5px] font-medium transition-colors duration-300 ${
              attivo === i ? "bg-forest text-white" : "text-muted hover:text-ink"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="mt-5 grid grid-cols-[minmax(0,1fr)]">
        {FORMATI.map((f, i) => (
          <div
            key={f}
            id={`foglio-pannello-${i}`}
            role="tabpanel"
            aria-labelledby={`foglio-scheda-${i}`}
            className={`min-w-0 [grid-area:1/1] ${f === "orizzontale" ? "self-center" : "self-start"} transition-[opacity,transform] duration-300 ease-out motion-reduce:transition-none ${
              attivo === i ? "translate-y-0 opacity-100" : "pointer-events-none invisible translate-y-1 opacity-0"
            }`}
          >
            <FoglioTelefono formato={f} />
          </div>
        ))}
      </div>

      <div className="mt-5 grid gap-2.5" aria-hidden>
        <span className="flex h-12 items-center justify-center gap-2 rounded-[14px] bg-ink text-[15px] font-semibold text-white">
          <Icon name="printer" size={17} stroke={2} />
          {tr("Stampa A4")}
        </span>
        <span className="flex h-12 items-center justify-center gap-2 rounded-[14px] border border-line bg-white text-[15px] font-semibold text-ink">
          <Icon name="send" size={17} stroke={2} />
          {tr("PDF al fornitore")}
        </span>
      </div>

      <div className="mt-6" aria-live="polite">
        <h3 className="text-[17px] font-semibold tracking-[-0.015em] text-ink">{formati[attivo]?.name}</h3>
        <p className="mt-1 text-[15px] leading-relaxed text-muted">{formati[attivo]?.text}</p>
      </div>
    </div>
  );
}

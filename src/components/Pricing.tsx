"use client";

import { tr } from "@/i18n";
import { useState } from "react";
import { mensileConAnnuale, prezzoAnnuale, prezzoMensile } from "@/config/prezzi";
import { signupUrl } from "@/config/site";
import { SelettoreValuta, useValuta } from "./Valuta";
import { Check } from "./ui";
import { HandNote } from "./HandNote";
import { getPlans } from "@/content/plansByLocale";

export function Pricing() {
  const [annual, setAnnual] = useState(false);
  const { valuta, pronta, formato } = useValuta();
  return (
    <div>
      <div className="flex flex-wrap items-center justify-center gap-2.5">
        <div role="radiogroup" aria-label={tr("Periodo di fatturazione")} className="inline-flex rounded-[12px] border border-line bg-white p-1">
          {[
            { v: false, l: tr("Mensile") },
            { v: true, l: tr("Annuale") },
          ].map((o) => (
            <button
              key={o.l}
              type="button"
              role="radio"
              aria-checked={annual === o.v}
              onClick={() => setAnnual(o.v)}
              className={`flex h-10 items-center gap-2 rounded-[9px] px-4 text-[14.5px] font-medium transition-all duration-300 ${
                annual === o.v ? "bg-forest text-white" : "text-muted hover:text-ink"
              }`}
            >
              {o.l}
              {o.v && <span className="rounded-full bg-p-green px-2 py-0.5 text-[11.5px] text-p-green-ink">{tr("2 mesi gratis")}</span>}
            </button>
          ))}
        </div>
        <SelettoreValuta />
      </div>

      <div className="relative mt-10 grid gap-4 lg:mt-24 lg:grid-cols-3">
        <HandNote text={tr("Ti consigliamo questo")} className="absolute -top-[52px] left-[calc(33.333%-226px)] hidden lg:flex" />
        {getPlans().map((p) => {
          const price = annual ? mensileConAnnuale(p.id, valuta) : prezzoMensile(p.id, valuta);
          return (
            <div
              key={p.id}
              className={`relative flex flex-col rounded-[20px] border bg-white p-6 md:p-7 ${
                p.popular ? "border-forest shadow-[0_30px_60px_-40px_rgba(0,0,0,.45)]" : "border-line"
              }`}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-[19px] font-semibold tracking-[-0.02em] text-ink">{p.name}</h3>
                {p.popular && <span className="rounded-full bg-lime px-2.5 py-1 text-[12px] font-medium text-forest">{tr("Il più scelto")}</span>}
              </div>
              <p className="mt-1.5 text-[15px] text-muted">{p.desc}</p>
              <div className={`mt-6 flex flex-wrap items-baseline gap-x-1.5 gap-y-1 transition-opacity duration-300 ${pronta ? "opacity-100" : "opacity-0"}`}>
                <span key={`${valuta}-${price}`} className="anim-fade-up text-[46px] font-semibold leading-none tracking-[-0.04em] text-ink tabular-nums">
                  {formato(price)}
                </span>
                <span className="text-[15px] text-muted">{tr("al mese + IVA")}</span>
              </div>
              <p className={`mt-2 text-[13px] text-muted transition-opacity duration-300 ${pronta ? "opacity-100" : "opacity-0"}`}>
                {annual ? tr("{amount} all'anno + IVA, in un solo pagamento", { amount: formato(prezzoAnnuale(p.id, valuta)) }) : tr("Fatturato ogni mese")}
              </p>
              <a href={`${signupUrl}?piano=${p.id}&valuta=${valuta}${annual ? "&periodo=annuale" : ""}`} className={`btn mt-6 w-full ${p.popular ? "btn-dark pulse" : "btn-light"}`}>
                {tr("Prova gratis 14 giorni")}
              </a>
              <ul className="mt-7 flex flex-col gap-3 border-t border-line-soft pt-6 text-[15px] text-text">
                {p.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-3">
                    <Check className="mt-0.5" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
      <p className="mt-6 text-center text-[13.5px] text-muted">
        {tr("Nessuna commissione su ordini e prenotazioni. I messaggi WhatsApp inviati dal locale hanno il costo stabilito da Meta.")}
      </p>
    </div>
  );
}

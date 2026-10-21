"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { COOKIE, nomeCookie, type Categoria } from "@/lib/consenso/cookie";
import {
  EVENTO_PREFERENZE,
  STRUMENTI_SITO,
  applicaConsenso,
  leggiConsenso,
  salvaScelta,
  type Azione,
  type Scelte,
  type Strumenti,
} from "@/lib/consenso/consenso";
import { TESTI_BANNER, type TestiBanner } from "@/lib/consenso/testi";

/*
 * Banner dei cookie, unico per sito, piattaforma e menu pubblici.
 * - Nessuno strumento non tecnico parte prima della scelta.
 * - "Accetta tutti" e "Rifiuta" hanno lo stesso stile; la X equivale a "Rifiuta".
 * - Scorrere o cliccare altrove non vale come consenso.
 * - Il link "Preferenze cookie" (apriPreferenzeCookie) riapre il pannello.
 */
type Props = {
  lingua: "it" | "en";
  cookiePolicyHref: string;
  privacyHref: string;
  strumenti?: Strumenti;
  utenteId?: string | null;
  testi?: TestiBanner;
};

const CATEGORIE: Categoria[] = ["necessari", "statistiche", "marketing"];

export function CookieBanner({ lingua, cookiePolicyHref, privacyHref, strumenti = STRUMENTI_SITO, utenteId = null, testi }: Props) {
  const t = testi ?? TESTI_BANNER[lingua];
  const [aperto, setAperto] = useState(false);
  const [pannello, setPannello] = useState(false);
  const [scelte, setScelte] = useState<Scelte>({ statistiche: false, marketing: false });
  const [dettagli, setDettagli] = useState<Categoria | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const titoloId = useId();
  const testoId = useId();

  useEffect(() => {
    const c = leggiConsenso();
    if (c) {
      applicaConsenso(c, strumenti);
      setScelte({ statistiche: c.statistiche, marketing: c.marketing });
    } else {
      setAperto(true);
    }
    const riapri = () => {
      const attuale = leggiConsenso();
      setScelte({ statistiche: !!attuale?.statistiche, marketing: !!attuale?.marketing });
      setPannello(true);
      setAperto(true);
    };
    window.addEventListener(EVENTO_PREFERENZE, riapri);
    return () => window.removeEventListener(EVENTO_PREFERENZE, riapri);
  }, [strumenti]);

  useEffect(() => {
    if (aperto) dialogRef.current?.focus({ preventScroll: true });
  }, [aperto, pannello]);

  const scegli = useCallback(
    (s: Scelte, azione: Azione) => {
      const ricarica = salvaScelta(s, azione, { lingua, strumenti, utenteId });
      setScelte(s);
      setAperto(false);
      setPannello(false);
      setDettagli(null);
      if (ricarica) location.reload();
    },
    [lingua, strumenti, utenteId],
  );

  const tutti = { statistiche: true, marketing: true };
  const nessuno = { statistiche: false, marketing: false };

  if (!aperto) return null;

  const bottone =
    "inline-flex min-h-12 flex-1 items-center justify-center rounded-xl bg-lime px-5 text-[15px] font-semibold text-forest transition-colors hover:bg-[#8fdc5e] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink";

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="false"
      aria-labelledby={titoloId}
      aria-describedby={pannello ? undefined : testoId}
      tabIndex={-1}
      data-cookie-banner
      onKeyDown={(e) => {
        if (e.key === "Escape") scegli(nessuno, "chiusura_x");
      }}
      className="nm-cookie-banner fixed inset-x-0 bottom-0 z-[90] max-h-[85vh] overflow-y-auto overscroll-contain rounded-t-3xl border border-line bg-card text-text shadow-[0_-12px_40px_-12px_rgba(0,0,0,0.25)] outline-none sm:inset-x-auto sm:bottom-5 sm:left-1/2 sm:w-[min(600px,calc(100vw-40px))] sm:-translate-x-1/2 sm:rounded-3xl"
    >
      <div className="relative p-5 pt-6 sm:p-7">
        <button
          type="button"
          onClick={() => scegli(nessuno, "chiusura_x")}
          aria-label={t.chiudi}
          title={t.chiudi}
          className="absolute right-3 top-3 inline-flex h-11 w-11 items-center justify-center rounded-full text-muted transition-colors hover:bg-mist hover:text-ink"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        {!pannello ? (
          <>
            <h2 id={titoloId} className="pr-12 text-[19px] font-semibold leading-tight tracking-[-0.02em]">
              {t.titolo}
            </h2>
            <p id={testoId} className="mt-3 text-[15px] leading-relaxed text-muted">
              {t.testo}{" "}
              <a href={cookiePolicyHref} className="font-medium text-ink underline underline-offset-2">
                {t.cookiePolicy}
              </a>
            </p>
            <div className="mt-5 flex flex-col gap-2.5 sm:flex-row">
              <button type="button" className={bottone} onClick={() => scegli(nessuno, "rifiuta")}>
                {t.rifiuta}
              </button>
              <button type="button" className={bottone} onClick={() => scegli(tutti, "accetta_tutti")}>
                {t.accettaTutti}
              </button>
            </div>
            <div className="mt-2 flex justify-center">
              <button
                type="button"
                onClick={() => setPannello(true)}
                className="inline-flex min-h-11 items-center px-3 text-[15px] font-medium text-ink underline underline-offset-4"
              >
                {t.personalizza}
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 id={titoloId} className="pr-12 text-[19px] font-semibold leading-tight tracking-[-0.02em]">
              {t.titoloPannello}
            </h2>
            <ul className="mt-4 flex flex-col divide-y divide-line">
              {CATEGORIE.map((cat) => {
                const fissa = cat === "necessari";
                const on = fissa ? true : scelte[cat];
                const info = t.categorie[cat];
                const voci = COOKIE.filter((c) => c.categoria === cat);
                const idDettagli = `nm-cookie-dettagli-${cat}`;
                const idNome = `nm-cookie-nome-${cat}`;
                return (
                  <li key={cat} className="py-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p id={idNome} className="text-[15.5px] font-semibold text-ink">
                          {info.nome}
                          {fissa && <span className="ml-1.5 text-[14px] font-normal text-muted">({t.sempreAttivi})</span>}
                        </p>
                        <p className="mt-1 text-[15px] leading-relaxed text-muted">{info.testo}</p>
                      </div>
                      <button
                        type="button"
                        role="switch"
                        aria-checked={on}
                        aria-labelledby={idNome}
                        disabled={fissa}
                        data-on={on}
                        onClick={() => !fissa && setScelte((s) => ({ ...s, [cat]: !s[cat as "statistiche" | "marketing"] }))}
                        className="toggle mt-0.5 disabled:cursor-not-allowed disabled:opacity-60"
                      />
                    </div>
                    <button
                      type="button"
                      aria-expanded={dettagli === cat}
                      aria-controls={idDettagli}
                      onClick={() => setDettagli((d) => (d === cat ? null : cat))}
                      className="mt-2 inline-flex min-h-11 items-center gap-1.5 text-[15px] font-medium text-ink underline underline-offset-4"
                    >
                      {dettagli === cat ? t.nascondiDettagli : t.mostraDettagli}
                    </button>
                    {dettagli === cat && (
                      <div id={idDettagli} className="mt-2 overflow-x-auto rounded-xl border border-line">
                        <table className="w-full min-w-[420px] text-left text-[14px]">
                          <thead className="bg-mist text-ink">
                            <tr>
                              <th scope="col" className="px-3 py-2 font-semibold">{t.colonne.nome}</th>
                              <th scope="col" className="px-3 py-2 font-semibold">{t.colonne.fornitore}</th>
                              <th scope="col" className="px-3 py-2 font-semibold">{t.colonne.durata}</th>
                            </tr>
                          </thead>
                          <tbody>
                            {voci.map((v) => (
                              <tr key={nomeCookie(v, "it")} className="border-t border-line align-top">
                                <td className="px-3 py-2 font-mono text-[13px]">{nomeCookie(v, lingua)}</td>
                                <td className="px-3 py-2">{v.fornitore[lingua]}</td>
                                <td className="px-3 py-2">{v.durata[lingua]}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
            <div className="mt-4 flex flex-col gap-2.5 sm:flex-row">
              <button type="button" className={bottone} onClick={() => scegli(scelte, "personalizza")}>
                {t.salvaScelte}
              </button>
              <button type="button" className={bottone} onClick={() => scegli(tutti, "accetta_tutti")}>
                {t.accettaTutti}
              </button>
            </div>
            <p className="mt-4 flex flex-wrap justify-center gap-x-5 text-[15px]">
              <a href={cookiePolicyHref} className="inline-flex min-h-11 items-center font-medium text-ink underline underline-offset-4">
                {t.cookiePolicy}
              </a>
              <a href={privacyHref} className="inline-flex min-h-11 items-center font-medium text-ink underline underline-offset-4">
                {t.informativaPrivacy}
              </a>
            </p>
          </>
        )}
      </div>
    </div>
  );
}

/** Link "Preferenze cookie" del footer: riapre il pannello. */
export function PreferenzeCookieLink({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <button type="button" className={className} onClick={() => window.dispatchEvent(new Event(EVENTO_PREFERENZE))}>
      {children}
    </button>
  );
}

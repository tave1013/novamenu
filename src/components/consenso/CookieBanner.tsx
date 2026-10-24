"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { categorieInUso, cookieInUso, nomeCookie, type Categoria } from "@/lib/consenso/cookie";
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

  // Pulsanti tutti uguali, come chiede il Garante: nessuna scelta è più evidente delle altre.
  const bottone =
    "inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-lime px-4 text-[15px] font-semibold text-forest transition-colors hover:bg-[#8fdc5e] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink";
  const soloTecnici = categorieInUso(strumenti).length === 1;

  const chiudiX = (
    <button
      type="button"
      onClick={() => scegli(nessuno, "chiusura_x")}
      aria-label={t.chiudi}
      title={t.chiudi}
      className="inline-flex h-11 w-11 flex-none items-center justify-center rounded-full text-muted transition-colors hover:bg-mist hover:text-ink"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
        <path d="M6 6l12 12M18 6L6 18" />
      </svg>
    </button>
  );

  const comuni = {
    ref: dialogRef,
    role: "dialog" as const,
    "aria-labelledby": titoloId,
    tabIndex: -1,
    "data-cookie-banner": true,
    onKeyDown: (e: React.KeyboardEvent) => {
      if (e.key === "Escape") scegli(nessuno, "chiusura_x");
    },
  };

  /* ---------- barra in basso: testo a sinistra, tre pulsanti uguali a destra ---------- */
  if (!pannello)
    return (
      <div
        {...comuni}
        aria-modal="false"
        aria-describedby={testoId}
        className="nm-cookie-banner fixed inset-x-0 bottom-0 z-[90] max-h-[85dvh] overflow-y-auto overscroll-contain rounded-t-3xl border border-line bg-card text-text shadow-[0_-12px_40px_-12px_rgba(0,0,0,0.25)] outline-none md:inset-x-5 md:bottom-5 md:rounded-2xl"
      >
        <div className="mx-auto flex max-w-[1280px] flex-col gap-4 px-4 pb-[max(16px,env(safe-area-inset-bottom))] pt-4 md:flex-row md:items-center md:gap-8 md:px-6 md:py-5">
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-3">
              <h2 id={titoloId} className="pt-2 text-[17px] font-semibold leading-tight tracking-[-0.02em] md:pt-0">
                {t.titolo}
              </h2>
              <span className="-mr-2 -mt-1 md:hidden">{chiudiX}</span>
            </div>
            <p id={testoId} className="mt-1.5 text-[14.5px] leading-relaxed text-muted">
              {soloTecnici ? t.testoSoloTecnici : t.testo}{" "}
              <a href={cookiePolicyHref} className="font-medium text-ink underline underline-offset-2">
                {t.cookiePolicy}
              </a>
            </p>
          </div>
          <div className="grid flex-none grid-cols-3 gap-2 md:w-[480px]">
            <button type="button" className={bottone} onClick={() => scegli(nessuno, "rifiuta")}>
              {t.rifiuta}
            </button>
            <button type="button" className={bottone} onClick={() => setPannello(true)}>
              {t.personalizza}
            </button>
            <button type="button" className={bottone} onClick={() => scegli(tutti, "accetta_tutti")}>
              {t.accetta}
            </button>
          </div>
          <span className="hidden md:block">{chiudiX}</span>
        </div>
      </div>
    );

  /* ---------- pannello: sempre dentro lo schermo, contenuto che scorre, pulsanti fissi in fondo ---------- */
  return (
    <>
      <div aria-hidden="true" className="fixed inset-0 z-[89] bg-black/30" onClick={() => setPannello(false)} />
      <div
        {...comuni}
        aria-modal="true"
        className="nm-cookie-banner fixed inset-x-0 bottom-0 z-[90] flex max-h-[90dvh] flex-col rounded-t-3xl border border-line bg-card text-text shadow-[0_-12px_40px_-12px_rgba(0,0,0,0.25)] outline-none sm:inset-x-auto sm:bottom-auto sm:left-1/2 sm:top-1/2 sm:max-h-[min(86dvh,760px)] sm:w-[min(640px,calc(100vw-32px))] sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-3xl"
      >
        <div className="flex flex-none items-center justify-between gap-3 border-b border-line px-5 py-3 sm:px-7">
          <h2 id={titoloId} className="text-[18px] font-semibold leading-tight tracking-[-0.02em]">
            {t.titoloPannello}
          </h2>
          <span className="-mr-2">{chiudiX}</span>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 sm:px-7">
          {soloTecnici && <p className="mt-4 rounded-xl bg-mist px-4 py-3 text-[15px] leading-relaxed text-ink">{t.soloTecniciPannello}</p>}
          <ul className="flex flex-col divide-y divide-line">
            {/* solo le categorie con strumenti collegati: non si dichiarano strumenti che non usiamo */}
            {categorieInUso(strumenti).map((cat) => {
              const fissa = cat === "necessari";
              const on = fissa ? true : scelte[cat];
              const info = t.categorie[cat];
              const voci = cookieInUso(strumenti).filter((c) => c.categoria === cat);
              const idDettagli = `nm-cookie-dettagli-${cat}`;
              const idNome = `nm-cookie-nome-${cat}`;
              return (
                <li key={cat} className="py-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
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
                      className="toggle mt-0.5 flex-none disabled:cursor-not-allowed disabled:opacity-60"
                    />
                  </div>
                  <button
                    type="button"
                    aria-expanded={dettagli === cat}
                    aria-controls={idDettagli}
                    onClick={() => setDettagli((d) => (d === cat ? null : cat))}
                    className="mt-1 inline-flex min-h-11 items-center gap-1.5 text-[15px] font-medium text-ink underline underline-offset-4"
                  >
                    {dettagli === cat ? t.nascondiDettagli : t.mostraDettagli}
                  </button>
                  {dettagli === cat && (
                    <div id={idDettagli} className="mt-1">
                      {/* telefono: una scheda per cookie */}
                      <ul className="flex flex-col gap-2 sm:hidden">
                        {voci.map((v) => (
                          <li key={nomeCookie(v, "it")} className="rounded-xl border border-line p-3 text-[14px] leading-snug">
                            <p className="break-words font-mono text-[13px] font-semibold text-ink">{nomeCookie(v, lingua)}</p>
                            <p className="mt-1.5 text-text">{v.scopo[lingua]}</p>
                            <p className="mt-1.5 text-muted">
                              {t.colonne.fornitore}: {v.fornitore[lingua]}
                            </p>
                            <p className="text-muted">
                              {t.colonne.durata}: {v.durata[lingua]}
                            </p>
                          </li>
                        ))}
                      </ul>
                      {/* computer: tabella */}
                      <div className="hidden overflow-x-auto rounded-xl border border-line sm:block">
                        <table className="w-full text-left text-[14px]">
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
                                <td className="break-words px-3 py-2 font-mono text-[13px]">{nomeCookie(v, lingua)}</td>
                                <td className="px-3 py-2">{v.fornitore[lingua]}</td>
                                <td className="px-3 py-2">{v.durata[lingua]}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        <div className="flex-none border-t border-line px-5 pb-[max(12px,env(safe-area-inset-bottom))] pt-3 sm:px-7 sm:pb-4">
          <div className="grid grid-cols-3 gap-2">
            <button type="button" className={bottone} onClick={() => scegli(nessuno, "rifiuta")}>
              {t.rifiuta}
            </button>
            <button type="button" className={bottone} onClick={() => scegli(scelte, "personalizza")}>
              {t.salvaScelte}
            </button>
            <button type="button" className={bottone} onClick={() => scegli(tutti, "accetta_tutti")}>
              {t.accettaTutti}
            </button>
          </div>
          <p className="mt-1 flex flex-wrap justify-center gap-x-5 text-[14.5px]">
            <a href={cookiePolicyHref} className="inline-flex min-h-10 items-center font-medium text-ink underline underline-offset-4">
              {t.cookiePolicy}
            </a>
            <a href={privacyHref} className="inline-flex min-h-10 items-center font-medium text-ink underline underline-offset-4">
              {t.informativaPrivacy}
            </a>
          </p>
        </div>
      </div>
    </>
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

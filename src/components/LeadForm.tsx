"use client";

import { messageTag, tr } from "@/i18n";
import { useState } from "react";
import { site, waLink } from "@/config/site";
import { Icon } from "./Icon";
import { lp } from "@/i18n/link";

const types = () => ([tr("Pizzeria"), tr("Ristorante o trattoria"), tr("Pub o birreria"), tr("Bar o caffetteria"), tr("Gelateria"), tr("Pastificio"), tr("Panetteria o pasticceria"), tr("Gastronomia o rosticceria"), tr("Altro")]);

/**
 * Modulo di contatto senza server: compone un messaggio WhatsApp (o una email) con i dati inseriti.
 * Per raccogliere le richieste in un database basta cambiare la funzione `send`.
 */
export function LeadForm({ kind, compact = false }: { kind: "demo" | "contatto"; compact?: boolean }) {
  const [sent, setSent] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  function send(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("nome") || "").trim();
    const venue = String(fd.get("locale") || "").trim();
    const phone = String(fd.get("telefono") || "").trim();
    if (!name || !phone || (kind === "demo" && !venue)) {
      setErr(tr("Compila nome, nome del locale e telefono per continuare."));
      return;
    }
    if (!fd.get("privacy")) {
      setErr(tr("Per continuare accetta l'informativa privacy."));
      return;
    }
    setErr(null);
    const lines =
      kind === "demo"
        ? [
            messageTag() + tr("Ciao, vorrei prenotare una demo di {brand}.", { brand: site.name }),
            tr("Nome: {value}", { value: name }),
            tr("Locale: {value}", { value: venue }),
            tr("Tipo: {value}", { value: String(fd.get("tipo")) }),
            tr("Telefono: {value}", { value: phone }),
            fd.get("quando") ? tr("Preferenza: {value}", { value: String(fd.get("quando")) }) : "",
          ]
        : [
            messageTag() + tr("Ciao, vi scrivo dal sito di {brand}.", { brand: site.name }),
            tr("Nome: {value}", { value: name }),
            venue ? tr("Attività: {value}", { value: venue }) : "",
            tr("Telefono: {value}", { value: phone }),
            "",
            String(fd.get("messaggio") || ""),
          ];
    window.open(waLink(lines.filter(Boolean).join("\n")), "_blank", "noopener");
    setSent(true);
  }

  if (sent)
    return (
      <div className="flex min-h-[420px] flex-col items-center justify-center rounded-[20px] bg-white p-8 text-center ring-1 ring-line">
        <span className="anim-pop flex h-14 w-14 items-center justify-center rounded-full bg-p-green text-p-green-ink">
          <Icon name="check" size={28} stroke={2.4} />
        </span>
        <p className="mt-5 text-[22px] font-semibold tracking-[-0.02em] text-ink">{tr("Ci siamo quasi")}</p>
        <p className="mt-2 max-w-sm text-[15.5px] leading-relaxed text-muted">
          {tr("Abbiamo aperto WhatsApp con il messaggio già scritto: premi Invia e ti rispondiamo in giornata. Se non si è aperto, scrivici a")}{" "}
          <a className="text-ink underline underline-offset-4" href={`mailto:${site.email}`}>
            {site.email}
          </a>
          .
        </p>
        <button type="button" onClick={() => setSent(false)} className="btn btn-light mt-6">
          {tr("Modifica i dati")}
        </button>
      </div>
    );

  const input =
    "h-12 w-full rounded-[10px] border border-line bg-white px-3.5 text-[16px] text-ink outline-none transition-[border-color,box-shadow] placeholder:text-faint focus:border-black focus:shadow-[0_0_0_3px_rgba(0,0,0,.06)]";
  const label = "mb-1.5 block text-[14px] font-medium text-ink";

  return (
    <form onSubmit={send} noValidate className={`rounded-[20px] bg-white ring-1 ring-line ${compact ? "p-5 md:p-6" : "p-5 md:p-7"}`}>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={`${kind}-nome`} className={label}>
            {tr("Nome e cognome")}
          </label>
          <input id={`${kind}-nome`} name="nome" autoComplete="name" placeholder={tr("Mario Rossi")} className={input} required />
        </div>
        <div>
          <label htmlFor={`${kind}-tel`} className={label}>
            {tr("Telefono")}
          </label>
          <input id={`${kind}-tel`} name="telefono" type="tel" autoComplete="tel" placeholder="333 123 4567" className={input} required />
        </div>
        <div className={kind === "demo" ? "" : "sm:col-span-2"}>
          <label htmlFor={`${kind}-locale`} className={label}>
            {kind === "demo" ? tr("Nome del locale") : tr("Nome dell'attività (facoltativo)")}
          </label>
          <input id={`${kind}-locale`} name="locale" autoComplete="organization" placeholder={tr("Pizzeria da Mario")} className={input} />
        </div>
        {kind === "demo" && (
          <div>
            <label htmlFor="demo-tipo" className={label}>
              {tr("Tipo di attività")}
            </label>
            <div className="relative">
              <select id="demo-tipo" name="tipo" className={`${input} appearance-none pr-10`} defaultValue={tr("Pizzeria")}>
                {types().map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
              <Icon name="chevronDown" size={18} stroke={2} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted" />
            </div>
          </div>
        )}
        {kind === "demo" ? (
          <fieldset className="sm:col-span-2">
            <legend className={label}>{tr("Quando preferisci?")}</legend>
            <div className="grid grid-cols-3 gap-2">
              {[tr("Mattina"), tr("Pomeriggio"), tr("Sera")].map((q, i) => (
                <label key={q} className="relative">
                  <input type="radio" name="quando" value={q} defaultChecked={i === 1} className="peer sr-only" />
                  <span className="flex h-11 cursor-pointer items-center justify-center rounded-[10px] border border-line text-[14.5px] text-text transition-colors peer-checked:border-black peer-checked:bg-black peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-black peer-focus-visible:ring-offset-2">
                    {q}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
        ) : (
          <div className="sm:col-span-2">
            <label htmlFor="contatto-msg" className={label}>
              {tr("Messaggio")}
            </label>
            <textarea
              id="contatto-msg"
              name="messaggio"
              rows={4}
              placeholder={tr("Come possiamo aiutarti?")}
              className={`${input} h-auto resize-none py-3`}
            />
          </div>
        )}
      </div>

      <label className="mt-5 flex cursor-pointer items-start gap-3 text-[13.5px] leading-snug text-muted">
        <input type="checkbox" name="privacy" className="peer sr-only" />
        <span className="mt-px flex h-5 w-5 flex-none items-center justify-center rounded-[5px] border-[1.5px] border-[#c7c7cc] bg-white text-transparent transition-colors peer-checked:border-black peer-checked:bg-black peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-black peer-focus-visible:ring-offset-2">
          <Icon name="check" size={13} stroke={3} />
        </span>
        <span>
          {tr("Ho letto l'")}
          <a href={lp("/legale/privacy/")} className="text-ink underline underline-offset-2">
            {tr("informativa privacy")}
          </a>{" "}
          {tr("e voglio essere ricontattato.")}
        </span>
      </label>

      {err && (
        <p role="alert" className="mt-4 rounded-[12px] bg-p-red px-3.5 py-2.5 text-[14px] text-p-red-ink">
          {err}
        </p>
      )}

      <button type="submit" className="btn btn-dark mt-6 h-[50px] w-full text-[16px]">
        {kind === "demo" ? tr("Prenota la demo") : tr("Invia il messaggio")}
      </button>
      <p className="mt-3 text-center text-[13px] text-muted">{tr("Ti rispondiamo su WhatsApp, di solito in giornata.")}</p>
    </form>
  );
}

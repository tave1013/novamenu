"use client";

import { useRef, useState } from "react";
import { getLocale, tr } from "@/i18n";
import type { TipoRichiesta } from "@/lib/moduli/inoltro";

/*
 * Modulo delle richieste privacy: nome, email, tipo di richiesta, locale coinvolto, messaggio.
 * Anti spam: campo trappola nascosto e tempo minimo di compilazione (controllati anche dal server).
 */
export function ModuloRichiestaPrivacy({ emailPrivacy }: { emailPrivacy: string }) {
  const aperto = useRef(Date.now());
  const [stato, setStato] = useState<"pronto" | "invio" | "inviato" | "errore">("pronto");
  const [errore, setErrore] = useState<string | null>(null);
  const tipi: { v: TipoRichiesta; l: string }[] = [
    { v: "accesso", l: tr("Accesso: voglio sapere quali dati avete su di me e averne una copia") },
    { v: "correzione", l: tr("Correzione: alcuni miei dati sono sbagliati o incompleti") },
    { v: "cancellazione", l: tr("Cancellazione: voglio che cancelliate i miei dati") },
    { v: "opposizione", l: tr("Opposizione: non voglio che usiate i miei dati per un certo scopo") },
    { v: "portabilita", l: tr("Portabilità: voglio i miei dati in un file da portare altrove") },
    { v: "altro", l: tr("Altro") },
  ];

  async function invia(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const nome = String(fd.get("nome") || "").trim();
    const email = String(fd.get("email") || "").trim();
    const messaggio = String(fd.get("messaggio") || "").trim();
    if (!nome || !email || !messaggio) return setErrore(tr("Compila nome, email e messaggio."));
    setErrore(null);
    setStato("invio");
    try {
      const r = await fetch("/api/richiesta-privacy/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome,
          email,
          tipo: fd.get("tipo"),
          locale: fd.get("locale"),
          messaggio,
          sito: fd.get("sito"),
          lingua: getLocale(),
          aperto_da_ms: Date.now() - aperto.current,
        }),
      });
      if (!r.ok) throw new Error();
      setStato("inviato");
    } catch {
      setStato("errore");
    }
  }

  if (stato === "inviato")
    return (
      <p role="status" className="mt-6 rounded-2xl border border-line bg-card px-5 py-4 text-[16px] font-medium text-ink">
        {tr("Abbiamo ricevuto la tua richiesta. Ti rispondiamo entro 30 giorni.")}
      </p>
    );

  const campo = "mt-1.5 block w-full rounded-[12px] border border-line bg-white px-3.5 py-3 text-[16px] text-ink outline-none focus:border-ink";
  return (
    <form onSubmit={invia} noValidate className="mt-6 flex flex-col gap-4 not-prose">
      <label className="text-[15px] font-medium text-ink">
        {tr("Nome e cognome")}
        <input name="nome" autoComplete="name" required className={campo} />
      </label>
      <label className="text-[15px] font-medium text-ink">
        {tr("Email")}
        <input name="email" type="email" autoComplete="email" required className={campo} />
      </label>
      <label className="text-[15px] font-medium text-ink">
        {tr("Cosa vuoi chiedere")}
        <select name="tipo" className={campo} defaultValue="accesso">
          {tipi.map((t) => (
            <option key={t.v} value={t.v}>
              {t.l}
            </option>
          ))}
        </select>
      </label>
      <label className="text-[15px] font-medium text-ink">
        {tr("Locale coinvolto (se la richiesta riguarda un ristorante)")}
        <input name="locale" className={campo} />
      </label>
      <label className="text-[15px] font-medium text-ink">
        {tr("Messaggio")}
        <textarea name="messaggio" rows={5} required className={`${campo} resize-y`} />
      </label>
      {/* campo trappola: le persone non lo vedono, i programmi automatici lo compilano */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Sito web
          <input name="sito" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      {errore && (
        <p role="alert" className="rounded-[10px] bg-p-red px-3.5 py-2.5 text-[14px] text-p-red-ink">
          {errore}
        </p>
      )}
      {stato === "errore" && (
        <p role="alert" className="rounded-[10px] bg-p-red px-3.5 py-2.5 text-[14px] text-p-red-ink">
          {tr("Non siamo riusciti a inviare la richiesta. Riprova tra poco oppure scrivi a {email}.", { email: emailPrivacy })}
        </p>
      )}
      <button type="submit" disabled={stato === "invio"} className="btn btn-dark h-[52px] w-full text-[16px] disabled:opacity-60 sm:w-auto sm:self-start sm:px-8">
        {stato === "invio" ? tr("Invio in corso") : tr("Invia la richiesta")}
      </button>
    </form>
  );
}

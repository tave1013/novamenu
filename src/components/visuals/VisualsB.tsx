"use client";

import { tr } from "@/i18n";
import { Icon } from "../Icon";
import { Cursor, Toast, Toggle, useDemo, type Step } from "./engine";
import { AppWindow, PhoneFrame, Stage } from "./frames";

/* ---------- Sala e tavoli ---------- */

type TableState = "libero" | "prenotato" | "seduto" | "conto";
const tableStyle: Record<TableState, string> = {
  libero: "bg-white text-muted border-line",
  prenotato: "bg-p-pink text-p-pink-ink border-[#f3b8d0]",
  seduto: "bg-p-violet text-p-violet-ink border-[#cfc6fb]",
  conto: "bg-p-amber text-p-amber-ink border-[#f2d9a3]",
};
type SalaS = { picked: boolean; assigned: boolean; t3: TableState; toast: string | null };
const salaInit: SalaS = { picked: false, assigned: false, t3: "seduto", toast: null };
const salaSteps = (): Step<SalaS>[] => ([
  { dur: 1300, target: "res-rossi", patch: { ...salaInit } },
  { dur: 1000, target: "res-rossi", click: true, patch: { picked: true } },
  { dur: 1300, target: "table-7" },
  { dur: 2000, target: "table-7", click: true, patch: { assigned: true, picked: false, toast: tr("Rossi, 4 persone: tavolo 7 alle 20:30") } },
  { dur: 1300, target: "table-3", patch: { toast: null } },
  { dur: 2400, target: "table-3", click: true, patch: { t3: "conto" } },
]);

export function SalaVisual() {
  const d = useDemo(salaSteps(), salaInit, { restIndex: 3 });
  const s = d.state;
  const tables: { id: number; x: number; y: number; w: number; h: number; round?: boolean; st: TableState; label?: string }[] = [
    { id: 1, x: 6, y: 8, w: 15, h: 22, st: "seduto", label: tr("Ferrari") },
    { id: 2, x: 28, y: 8, w: 15, h: 22, st: "libero" },
    { id: 3, x: 50, y: 8, w: 15, h: 22, st: s.t3, label: tr("Bianchi") },
    { id: 4, x: 74, y: 6, w: 18, h: 26, round: true, st: "prenotato", label: "21:00" },
    { id: 5, x: 6, y: 44, w: 26, h: 20, st: "seduto", label: tr("Conti") },
    { id: 6, x: 40, y: 44, w: 15, h: 20, st: "libero" },
    { id: 7, x: 62, y: 44, w: 30, h: 20, st: s.assigned ? "prenotato" : "libero", label: s.assigned ? tr("Rossi") : undefined },
    { id: 8, x: 6, y: 76, w: 15, h: 18, round: true, st: "libero" },
    { id: 9, x: 28, y: 76, w: 15, h: 18, round: true, st: "conto", label: tr("Marino") },
  ];
  return (
    <Stage className="p-4 md:p-6">
      <div ref={d.rootRef} className="relative">
        <AppWindow>
          <div className="relative grid md:grid-cols-[200px_1fr]">
            <aside className="border-b border-line-soft p-3 md:border-b-0 md:border-r">
              <p className="px-1 text-[12px] font-medium text-ink">{tr("Da assegnare")}</p>
              <ul className="mt-2 flex gap-2 md:flex-col">
                {!s.assigned && (
                  <li
                    data-t="res-rossi"
                    className={`flex-1 rounded-[12px] border p-2.5 text-[12px] transition-all duration-300 ${
                      s.picked ? "border-black bg-black text-white shadow-lg" : "border-line-soft bg-white"
                    }`}
                  >
                    <span className="font-medium">{tr("20:30 Rossi")}</span>
                    <span className={`block text-[11px] ${s.picked ? "text-white/70" : "text-muted"}`}>{tr("4 persone")}</span>
                  </li>
                )}
                <li className="flex-1 rounded-[12px] border border-line-soft bg-white p-2.5 text-[12px]">
                  <span className="font-medium text-ink">{tr("21:15 Greco")}</span>
                  <span className="block text-[11px] text-muted">{tr("2 persone")}</span>
                </li>
              </ul>
              <div className="mt-4 hidden flex-col gap-1.5 px-1 text-[11px] text-muted md:flex">
                {(["libero", "prenotato", "seduto", "conto"] as TableState[]).map((k) => (
                  <span key={k} className="flex items-center gap-2 capitalize">
                    <span className={`h-3 w-3 rounded-[4px] border ${tableStyle[k]}`} />
                    {k === "conto" ? tr("Al conto") : k}
                  </span>
                ))}
              </div>
            </aside>
            <div className="relative h-[340px] bg-[radial-gradient(#e5e5ea_1px,transparent_1px)] [background-size:18px_18px] md:h-[400px]">
              <span className="absolute bottom-3 right-3 rounded-full bg-white px-2.5 py-1 text-[11px] text-muted shadow-sm">{tr("Sala interna")}</span>
              {tables.map((t) => (
                <span
                  key={t.id}
                  data-t={`table-${t.id}`}
                  className={`absolute flex flex-col items-center justify-center border text-center text-[11px] transition-colors duration-500 ${tableStyle[t.st]} ${
                    t.round ? "rounded-full" : "rounded-[12px]"
                  } ${s.picked && t.st === "libero" ? tr("ring-2 ring-black/15 ring-offset-2") : ""}`}
                  style={{ left: `${t.x}%`, top: `${t.y}%`, width: `${t.w}%`, height: `${t.h}%` }}
                >
                  <span className="font-semibold">{t.id}</span>
                  {t.label && <span className="max-w-full truncate px-1 text-[10px] opacity-90">{t.label}</span>}
                </span>
              ))}
            </div>
          </div>
          <Toast text={s.toast} stepKey={d.i} />
        </AppWindow>
        <Cursor rootRef={d.rootRef} target={d.step.target} click={d.step.click} stepKey={d.i} hidden={d.reduced} />
      </div>
    </Stage>
  );
}

/* ---------- Ferie e chiusure ---------- */

type ChS = { start: number; end: number; notify: boolean; toast: string | null };
const chInit: ChS = { start: -1, end: -1, notify: false, toast: null };
const chSteps = (): Step<ChS>[] => ([
  { dur: 1300, target: "day-10", patch: { ...chInit } },
  { dur: 900, target: "day-10", click: true, patch: { start: 10 } },
  { dur: 1300, target: "day-16" },
  { dur: 1000, target: "day-16", click: true, patch: { end: 16 } },
  { dur: 1100, target: "notify" },
  { dur: 900, target: "notify", click: true, patch: { notify: true } },
  { dur: 1000, target: "save" },
  { dur: 2800, target: "save", click: true, patch: { toast: tr("Ferie salvate: ordini e prenotazioni in pausa dal 10 al 16") } },
]);

export function ChiusureVisual() {
  const d = useDemo(chSteps(), chInit, { restIndex: 7 });
  const s = d.state;
  const offset = 6; // il mese parte di domenica
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const inRange = (n: number) => s.start > 0 && (s.end > 0 ? n >= s.start && n <= s.end : n === s.start);
  return (
    <Stage className="p-4 md:p-6">
      <div ref={d.rootRef} className="relative mx-auto max-w-[620px]">
        <AppWindow>
          <div className="relative grid gap-5 p-4 md:grid-cols-[1.1fr_0.9fr] md:p-5">
            <div>
              <div className="flex items-center justify-between">
                <p className="text-[14px] font-semibold text-ink">{tr("Agosto")}</p>
                <span className="flex gap-1 text-muted">
                  <Icon name="chevronLeft" size={16} />
                  <Icon name="chevronRight" size={16} />
                </span>
              </div>
              <div className="mt-3 grid grid-cols-7 gap-1 text-center text-[10.5px] text-faint">
                {["L", "M", "M", "G", "V", "S", "D"].map((x, i) => (
                  <span key={i}>{x}</span>
                ))}
              </div>
              <div className="mt-1 grid grid-cols-7 gap-1">
                {Array.from({ length: offset }).map((_, i) => (
                  <span key={`e${i}`} />
                ))}
                {days.map((n) => {
                  const on = inRange(n);
                  const edge = n === s.start || n === s.end;
                  return (
                    <span
                      key={n}
                      data-t={`day-${n}`}
                      className={`flex aspect-square items-center justify-center rounded-[8px] text-[11.5px] tabular-nums transition-colors duration-300 ${
                        edge ? "bg-black font-semibold text-white" : on ? "bg-p-amber text-p-amber-ink" : "text-text"
                      } ${n === 15 && !on ? "text-p-red-ink" : ""}`}
                    >
                      {n}
                    </span>
                  );
                })}
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="rounded-[14px] bg-mist p-3">
                <p className="text-[11.5px] text-muted">{tr("Periodo")}</p>
                <p className="mt-0.5 text-[14px] font-semibold text-ink">
                  {s.start > 0 ? `Dal ${s.start} ${s.end > 0 ? `al ${s.end}` : ""} agosto` : tr("Scegli le date")}
                </p>
              </div>
              <div className="rounded-[14px] bg-mist p-3">
                <p className="text-[11.5px] text-muted">{tr("Messaggio per i clienti")}</p>
                <p className="mt-0.5 text-[12.5px] leading-snug text-ink">{tr("Siamo in ferie, riapriamo martedì 17 agosto. Buona estate!")}</p>
              </div>
              <div className="flex items-center justify-between rounded-[14px] bg-mist p-3">
                <span className="text-[12.5px] font-medium text-ink">{tr("Avvisa chi ha prenotato")}</span>
                <Toggle on={s.notify} small t="notify" />
              </div>
              <span data-t="save" className="flex h-10 items-center justify-center rounded-[11px] bg-black text-[13px] font-medium text-white">
                {tr("Salva le ferie")}
              </span>
            </div>
          </div>
          <Toast text={s.toast} stepKey={d.i} />
        </AppWindow>
        <Cursor rootRef={d.rootRef} target={d.step.target} click={d.step.click} stepKey={d.i} hidden={d.reduced} />
      </div>
    </Stage>
  );
}

/* ---------- Ordini su WhatsApp ---------- */

type OrS = { phase: "slot" | "sending" | "wa"; slot: number };
const orInit: OrS = { phase: "slot", slot: -1 };
const orSteps: Step<OrS>[] = [
  { dur: 1300, target: "slot-1", patch: { ...orInit } },
  { dur: 900, target: "slot-1", click: true, patch: { slot: 1 } },
  { dur: 1100, target: "send" },
  { dur: 700, target: "send", click: true, patch: { phase: "sending" } },
  { dur: 4200, patch: { phase: "wa" } },
];

export function OrdiniVisual() {
  const d = useDemo(orSteps, orInit, { restIndex: 4 });
  const s = d.state;
  return (
    <Stage tone="clear" className="flex items-center justify-center py-6">
      <div ref={d.rootRef} className="relative">
        <PhoneFrame width={300}>
          <div className="relative h-[580px]">
            {s.phase !== "wa" ? (
              <div className="px-4 pt-1">
                <p className="text-[20px] font-semibold tracking-[-0.03em] text-ink">{tr("Il tuo ordine")}</p>
                <ul className="mt-3">
                  {[
                    ["2", tr("Margherita"), "14,00"],
                    ["1", tr("Diavola"), "8,50"],
                    ["1", tr("Fiori di zucca"), "6,50"],
                  ].map((r) => (
                    <li key={r[1]} className="flex items-center gap-3 border-b border-line-soft py-2.5 text-[13px]">
                      <span className="flex h-6 w-6 items-center justify-center rounded-[7px] bg-mist text-[11.5px] font-medium">{r[0]}</span>
                      <span className="flex-1 text-ink">{r[1]}</span>
                      <span className="tabular-nums text-muted">{r[2]} €</span>
                    </li>
                  ))}
                </ul>
                <div className="flex justify-between py-3 text-[14px] font-semibold text-ink">
                  <span>{tr("Totale")}</span>
                  <span className="tabular-nums">29,00 €</span>
                </div>
                <p className="mt-1 text-[12px] font-medium text-ink">{tr("Ritiro oggi alle")}</p>
                <div className="mt-2 grid grid-cols-4 gap-1.5">
                  {["19:30", "19:45", "20:00", "20:15", "20:30", "20:45", "21:00", "21:15"].map((t, i) => (
                    <span
                      key={t}
                      data-t={`slot-${i}`}
                      className={`rounded-[10px] py-2 text-center text-[11.5px] tabular-nums transition-colors duration-300 ${
                        i === 0 || i === 2 ? "bg-mist text-faint line-through" : s.slot === i ? "bg-black text-white" : "bg-mist text-text"
                      }`}
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <p className="mt-2 text-[10.5px] text-faint">{tr("Gli orari barrati sono già pieni")}</p>
                <span
                  data-t="send"
                  className={`absolute inset-x-4 bottom-5 flex h-12 items-center justify-center gap-2 rounded-[14px] text-[13.5px] font-medium text-white transition-colors ${
                    s.slot >= 0 ? "bg-[#25d366]" : "bg-[#25d366]/40"
                  }`}
                >
                  {s.phase === "sending" ? (
                    <span className="flex gap-1">
                      {[0, 1, 2].map((k) => (
                        <span key={k} className="h-1.5 w-1.5 rounded-full bg-white" style={{ animation: `typing 1s ${k * 0.15}s infinite` }} />
                      ))}
                    </span>
                  ) : (
                    <>
                      <Icon name="send" size={15} stroke={2} />{" "}{tr("Invia su WhatsApp")}
                    </>
                  )}
                </span>
              </div>
            ) : (
              <div className="anim-fade flex h-full flex-col bg-[#efeae2]">
                <div className="flex items-center gap-2 bg-[#f6f6f6] px-3 py-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-p-red text-[10px] font-semibold text-p-red-ink">{tr("PF")}</span>
                  <span>
                    <span className="block text-[12.5px] font-semibold text-ink">{tr("Pizzeria Fiore")}</span>
                    <span className="block text-[10px] text-muted">{tr("Account aziendale")}</span>
                  </span>
                </div>
                <div className="flex flex-1 flex-col items-end gap-2 p-3">
                  <div className="anim-pop max-w-[88%] rounded-[12px] rounded-tr-[4px] bg-[#d9fdd3] p-2.5 text-[11.5px] leading-[1.45] text-ink shadow-sm">
                    <b>{tr("Nuovo ordine da asporto")}</b>
                    <br />
                    {tr("Ritiro: oggi alle 19:45")}
                    <br />
                    <br />
                    {tr("2 x Margherita")}
                    <br />
                    {tr("1 x Diavola")}
                    <br />
                    {tr("1 x Fiori di zucca")}
                    <br />
                    <br />
                    <b>{tr("Totale: 29,00 €")}</b>
                    <br />
                    {tr("Nome: Andrea, 333 412 ...")}
                    <span className="mt-1 block text-right text-[9.5px] text-muted">19:02 ✓✓</span>
                  </div>
                  <div
                    className="anim-pop self-start max-w-[80%] rounded-[12px] rounded-tl-[4px] bg-white p-2.5 text-[11.5px] leading-snug text-ink shadow-sm"
                    style={{ animationDelay: "1.4s" }}
                  >
                    {tr("Ricevuto Andrea! Alle 19:45 è pronto.")}
                    <span className="mt-1 block text-right text-[9.5px] text-muted">19:03</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </PhoneFrame>
        <Cursor rootRef={d.rootRef} target={d.step.target} click={d.step.click} stepKey={d.i} hidden={d.reduced || !d.step.target} touch />
      </div>
    </Stage>
  );
}

/* ---------- Clienti ---------- */

export function ClientiVisual() {
  const d = useDemo<{ n: number }>(
    [0, 1, 2, 3, 4].map((n) => ({ dur: n === 4 ? 3600 : 700, patch: { n } })),
    { n: 0 },
    { restIndex: 4 }
  );
  const visits = [
    [tr("12 ott"), tr("Cena, 4 persone"), "128 €"],
    [tr("21 set"), tr("Asporto"), "32 €"],
    [tr("30 ago"), tr("Cena, 2 persone"), "64 €"],
    [tr("2 ago"), tr("Compleanno, 8 persone"), "296 €"],
  ];
  return (
    <Stage className="p-4 md:p-6">
      <div ref={d.rootRef} className="mx-auto grid max-w-[640px] gap-4 md:grid-cols-[1fr_1fr]">
        <div className="rounded-[20px] bg-white p-5 shadow-[0_30px_60px_-40px_rgba(0,0,0,.35)]">
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-p-blue text-[15px] font-semibold text-p-blue-ink">{tr("GR")}</span>
            <span>
              <span className="block text-[16px] font-semibold tracking-[-0.02em] text-ink">{tr("Giulia Rossi")}</span>
              <span className="block text-[12px] text-muted">{tr("Cliente dal 2024")}</span>
            </span>
          </div>
          <div className="mt-3 flex flex-wrap gap-1.5">
            <span className="rounded-full bg-p-violet px-2.5 py-1 text-[11.5px] text-p-violet-ink">{tr("Abituale")}</span>
            <span className="rounded-full bg-p-red px-2.5 py-1 text-[11.5px] text-p-red-ink">{tr("Allergia: frutta a guscio")}</span>
            <span className="rounded-full bg-p-amber px-2.5 py-1 text-[11.5px] text-p-amber-ink">{tr("Compleanno 3 nov")}</span>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2">
            {[
              ["14", "visite"],
              ["38 €", tr("spesa media")],
              ["Tav. 7", "preferito"],
            ].map((k) => (
              <div key={k[1]} className="rounded-[12px] bg-mist p-2.5">
                <p className="text-[16px] font-semibold tracking-[-0.02em] text-ink">{k[0]}</p>
                <p className="text-[10.5px] text-muted">{k[1]}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-[12px] border border-dashed border-line p-3 text-[12px] leading-snug text-muted">
            <span className="font-medium text-ink">{tr("Nota dello staff:")}</span>{" "}{tr("preferisce il tavolo vicino alla finestra, prende sempre il Barbera.")}
          </div>
        </div>
        <div className="rounded-[20px] bg-white p-5 shadow-[0_30px_60px_-40px_rgba(0,0,0,.35)]">
          <p className="text-[13px] font-semibold text-ink">{tr("Storico")}</p>
          <ul className="mt-2">
            {visits.slice(0, d.state.n).map((v, i) => (
              <li key={v[0]} className="anim-fade-up relative flex gap-3 pb-3 pl-5">
                <span className="absolute left-0 top-1.5 h-2.5 w-2.5 rounded-full bg-black" />
                {i < 3 && <span className="absolute bottom-0 left-[4.5px] top-4 w-px bg-line" />}
                <span className="w-12 flex-none text-[11.5px] text-muted">{v[0]}</span>
                <span className="flex-1 text-[12.5px] text-ink">{v[1]}</span>
                <span className="text-[12px] tabular-nums text-muted">{v[2]}</span>
              </li>
            ))}
          </ul>
          <div className="mt-2 flex items-center justify-between rounded-[12px] bg-mist p-3">
            <span className="text-[12px] text-ink">{tr("Consenso ai messaggi")}</span>
            <span className="flex items-center gap-1 text-[11.5px] font-medium text-p-green-ink">
              <Icon name="check" size={13} stroke={2.6} />{" "}{tr("Dato il 2 ago")}
            </span>
          </div>
        </div>
      </div>
    </Stage>
  );
}

/* ---------- Automazioni WhatsApp ---------- */

type AuS = { birthday: boolean; msgs: number };
const auInit: AuS = { birthday: false, msgs: 0 };
const auSteps: Step<AuS>[] = [
  { dur: 1300, target: "auto-bday", patch: { ...auInit } },
  { dur: 1000, target: "auto-bday", click: true, patch: { birthday: true } },
  { dur: 900, patch: { msgs: 1 } },
  { dur: 1300, patch: { msgs: 2 } },
  { dur: 3400, patch: { msgs: 3 } },
];
const autos = () => ([
  { k: "rem", when: tr("Il giorno prima della prenotazione"), then: tr("Promemoria con Confermo e Annulla"), on: true },
  { k: "rev", when: tr("Il giorno dopo la visita"), then: tr("Richiesta di recensione su Google"), on: true },
  { k: "bday", when: tr("Il giorno del compleanno"), then: tr("Auguri con un dolce offerto"), on: false },
  { k: "back", when: tr("Nessuna visita da 60 giorni"), then: tr("Un messaggio: ci manchi"), on: true },
]);

export function AutomazioniVisual() {
  const d = useDemo(auSteps, auInit, { restIndex: 4 });
  const s = d.state;
  return (
    <Stage tone="dark" className="p-4 md:p-6">
      <div ref={d.rootRef} className="relative grid items-center gap-6 md:grid-cols-[1.1fr_0.9fr]">
        <ul className="flex flex-col gap-2">
          {autos().map((a) => {
            const on = a.k === "bday" ? s.birthday : a.on;
            return (
              <li key={a.k} className="flex items-center gap-3 rounded-[16px] bg-white/[0.06] p-3.5 ring-1 ring-white/10">
                <span className="min-w-0 flex-1">
                  <span className="block text-[11.5px] text-[#a1a1a6]">{tr("Quando:")}{" "}{a.when.toLowerCase()}</span>
                  <span className="mt-0.5 block text-[13.5px] font-medium text-white">{a.then}</span>
                </span>
                <Toggle on={on} t={`auto-${a.k}`} small />
              </li>
            );
          })}
        </ul>
        <div className="mx-auto w-full max-w-[290px] overflow-hidden rounded-[22px] bg-[#efeae2]">
          <div className="flex items-center gap-2 bg-[#f6f6f6] px-3 py-2.5">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-p-violet text-[10px] font-semibold text-p-violet-ink">{tr("IG")}</span>
            <span>
              <span className="block text-[12.5px] font-semibold text-ink">{tr("Trattoria Il Glicine")}</span>
              <span className="block text-[10px] text-muted">{tr("Account aziendale")}</span>
            </span>
          </div>
          <div className="flex min-h-[250px] flex-col gap-2 p-3">
            {s.msgs >= 1 && (
              <div className="anim-pop max-w-[90%] rounded-[12px] rounded-tl-[4px] bg-white p-2.5 text-[11.5px] leading-snug text-ink shadow-sm">
                {tr("Buon compleanno Marco! Per festeggiare, il dolce stasera lo offriamo noi. Ti aspettiamo?")}
                <span className="mt-1 block text-right text-[9.5px] text-muted">10:00</span>
              </div>
            )}
            {s.msgs >= 2 && (
              <div className="anim-pop flex gap-1.5">
                <span className="rounded-[10px] bg-white px-2.5 py-1.5 text-[11px] font-medium text-[#0a7cff] shadow-sm">{tr("Prenota un tavolo")}</span>
              </div>
            )}
            {s.msgs >= 3 && (
              <div className="anim-pop max-w-[80%] self-end rounded-[12px] rounded-tr-[4px] bg-[#d9fdd3] p-2.5 text-[11.5px] leading-snug text-ink shadow-sm">
                {tr("Grazie mille! Siamo in 4 alle 20:30")}
                <span className="mt-1 block text-right text-[9.5px] text-muted">10:12 ✓✓</span>
              </div>
            )}
          </div>
        </div>
        <Cursor rootRef={d.rootRef} target={d.step.target} click={d.step.click} stepKey={d.i} hidden={d.reduced || !d.step.target} />
      </div>
    </Stage>
  );
}

/* ---------- Statistiche ---------- */

export function StatisticheVisual() {
  const d = useDemo<{ go: number }>([{ dur: 6000, patch: { go: 1 } }, { dur: 200, patch: { go: 0 } }], { go: 0 }, { restIndex: 0 });
  const bars = [32, 28, 0, 44, 61, 92, 78];
  const daysL = [tr("Lun"), tr("Mar"), tr("Mer"), tr("Gio"), tr("Ven"), tr("Sab"), tr("Dom")];
  const top = [
    [tr("Margherita"), 100],
    [tr("Diavola"), 74],
    [tr("Bufala e crudo"), 58],
    [tr("Fiori di zucca"), 41],
  ] as const;
  return (
    <Stage className="p-4 md:p-6">
      <div ref={d.rootRef} className="mx-auto grid max-w-[680px] gap-4 md:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[20px] bg-white p-5 shadow-[0_30px_60px_-40px_rgba(0,0,0,.35)]">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-[12px] text-muted">{tr("Coperti questa settimana")}</p>
              <p className="text-[30px] font-semibold tracking-[-0.04em] text-ink">335</p>
            </div>
            <span className="rounded-full bg-p-green px-2 py-0.5 text-[11.5px] font-medium text-p-green-ink">{tr("+12% sulla scorsa")}</span>
          </div>
          <div key={d.state.go} className="mt-4 flex h-[150px] items-end gap-2">
            {bars.map((b, i) => (
              <div key={i} className="flex h-full flex-1 flex-col items-center justify-end gap-1.5">
                <span
                  className={`w-full rounded-[6px] ${i === 5 ? "bg-black" : b === 0 ? "bg-line-soft" : "bg-[#d1d1d6]"}`}
                  style={{
                    height: `${Math.max(b, 4)}%`,
                    transformOrigin: "bottom",
                    animation: `grow .9s ${i * 0.07}s var(--ease-out-soft) both`,
                  }}
                />
                <span className="text-[10.5px] text-muted">{daysL[i]}</span>
              </div>
            ))}
          </div>
          <p className="mt-2 text-[11px] text-faint">{tr("Mercoledì chiuso")}</p>
        </div>
        <div className="rounded-[20px] bg-white p-5 shadow-[0_30px_60px_-40px_rgba(0,0,0,.35)]">
          <p className="text-[13px] font-semibold text-ink">{tr("Piatti più ordinati")}</p>
          <ul className="mt-3 flex flex-col gap-3">
            {top.map(([n, v], i) => (
              <li key={n}>
                <div className="flex justify-between text-[12px]">
                  <span className="text-ink">{n}</span>
                  <span className="tabular-nums text-muted">{Math.round(v * 1.32)}</span>
                </div>
                <div className="mt-1 h-1.5 rounded-full bg-mist">
                  <span
                    key={d.state.go}
                    className="block h-full rounded-full bg-p-violet-ink"
                    style={{ width: `${v}%`, transformOrigin: "left", animation: `growX .9s ${0.3 + i * 0.1}s var(--ease-out-soft) both` }}
                  />
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-[12px] text-muted">{tr("Ora di punta")}</p>
          <p className="text-[18px] font-semibold tracking-[-0.02em] text-ink">{tr("Sabato, 20:30")}</p>
        </div>
      </div>
    </Stage>
  );
}

/* ---------- Staff e turni ---------- */

type StS = { added: boolean; toast: string | null };
const stSteps = (): Step<StS>[] => ([
  { dur: 1400, target: "cell-add", patch: { added: false, toast: null } },
  { dur: 2800, target: "cell-add", click: true, patch: { added: true, toast: tr("Turno aggiunto, Sara riceve una notifica") } },
]);

export function StaffVisual() {
  const d = useDemo(stSteps(), { added: false, toast: null }, { restIndex: 1 });
  const people = [
    { n: tr("Marco"), r: tr("Titolare"), c: "bg-mist text-text" },
    { n: tr("Sara"), r: "Sala", c: "bg-p-pink text-p-pink-ink" },
    { n: tr("Luca"), r: tr("Cucina"), c: "bg-p-orange text-p-orange-ink" },
    { n: tr("Anna"), r: "Sala", c: "bg-p-pink text-p-pink-ink" },
  ];
  const grid = [
    [1, 1, 0, 1, 1, 1, 1],
    [0, 1, 0, 1, 1, 1, 0],
    [1, 1, 0, 0, 1, 1, 1],
    [1, 0, 0, 1, 0, 1, 1],
  ];
  return (
    <Stage className="p-4 md:p-6">
      <div ref={d.rootRef} className="relative">
        <AppWindow>
          <div className="relative p-3 sm:p-4">
            <div>
              <div className="grid grid-cols-[32px_repeat(7,1fr)] gap-1 text-center text-[10px] text-muted sm:grid-cols-[120px_repeat(7,1fr)] sm:gap-1.5 sm:text-[11px]">
                <span />
                {[tr("Lun"), tr("Mar"), tr("Mer"), tr("Gio"), tr("Ven"), tr("Sab"), tr("Dom")].map((x) => (
                  <span key={x}>{x}</span>
                ))}
              </div>
              {people.map((p, r) => (
                <div key={p.n} className="mt-1.5 grid grid-cols-[32px_repeat(7,1fr)] items-center gap-1 sm:grid-cols-[120px_repeat(7,1fr)] sm:gap-1.5">
                  <span className="flex items-center gap-2">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-mist text-[10.5px] font-semibold text-ink">{p.n[0]}</span>
                    <span className="hidden leading-tight sm:block">
                      <span className="block text-[12px] font-medium text-ink">{p.n}</span>
                      <span className="block text-[10.5px] text-muted">{p.r}</span>
                    </span>
                  </span>
                  {grid[r].map((v, c) => {
                    const isAdd = r === 1 && c === 6;
                    const on = v || (isAdd && d.state.added);
                    if (c === 2)
                      return (
                        <span key={c} className="flex h-9 items-center justify-center rounded-[8px] bg-[repeating-linear-gradient(135deg,#f5f5f7,#f5f5f7_5px,#fff_5px,#fff_10px)] text-[10px] text-faint">
                          {r === 0 ? tr("Chiuso") : ""}
                        </span>
                      );
                    return (
                      <span
                        key={c}
                        data-t={isAdd ? "cell-add" : undefined}
                        className={`flex h-9 items-center justify-center rounded-[8px] text-[9px] font-medium sm:text-[10.5px] ${
                          on ? `${p.c} ${isAdd ? "anim-pop" : ""}` : "border border-dashed border-line text-faint"
                        }`}
                      >
                        {on ? (c >= 4 ? "18-24" : "18-23") : isAdd ? "+" : ""}
                      </span>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
          <Toast text={d.state.toast} stepKey={d.i} />
        </AppWindow>
        <Cursor rootRef={d.rootRef} target={d.step.target} click={d.step.click} stepKey={d.i} hidden={d.reduced} />
      </div>
    </Stage>
  );
}

/* ---------- Assistente su Telegram ---------- */

type AsS = { n: number };
const asSteps: Step<AsS>[] = [
  { dur: 900, patch: { n: 0 } },
  { dur: 1900, patch: { n: 1 } },
  { dur: 1400, patch: { n: 2 } },
  { dur: 1000, target: "yes", patch: { n: 3 } },
  { dur: 1500, target: "yes", click: true, patch: { n: 4 } },
  { dur: 1500, patch: { n: 5 } },
  { dur: 3600, patch: { n: 6 } },
];

export function AssistenteVisual() {
  const d = useDemo(asSteps, { n: 0 }, { restIndex: 6 });
  const n = d.state.n;
  return (
    <Stage tone="clear" className="flex items-center justify-center py-6">
      <div ref={d.rootRef} className="relative">
        <PhoneFrame width={304}>
          <div className="flex h-[600px] flex-col bg-[#d5e3ee]">
            <div className="flex items-center gap-2.5 bg-white/90 px-3 py-2 backdrop-blur">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-white">
                <Icon name="sparkle" size={16} />
              </span>
              <span>
                <span className="block text-[13px] font-semibold text-ink">{tr("Assistente del locale")}</span>
                <span className="block text-[10.5px] text-[#3a8ee6]">{n === 1 || n === 5 ? tr("sta scrivendo...") : "bot"}</span>
              </span>
            </div>
            <div className="flex flex-1 flex-col justify-end gap-2 p-3">
              {n >= 1 && (
                <div className="anim-pop flex items-center gap-2 self-end rounded-[16px] rounded-br-[4px] bg-[#e1fec6] px-3 py-2 shadow-sm">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#4fae4e] text-white">
                    <Icon name="play" size={13} stroke={0} className="fill-white" />
                  </span>
                  <span className="flex h-6 items-center gap-[2px]">
                    {Array.from({ length: 22 }).map((_, k) => (
                      <span
                        key={k}
                        className="w-[2.5px] rounded-full bg-[#4fae4e]"
                        style={{
                          height: `${30 + ((k * 37) % 70)}%`,
                          animation: n === 1 ? `wave .9s ${k * 0.05}s ease-in-out infinite` : undefined,
                          opacity: 0.85,
                        }}
                      />
                    ))}
                  </span>
                  <span className="text-[10px] text-[#4fae4e]">0:04</span>
                </div>
              )}
              {n >= 2 && (
                <p className="anim-fade self-end pr-1 text-[10.5px] italic text-[#56708a]">{tr("“Segna esauriti i tonnarelli e stasera chiudiamo alle 22”")}</p>
              )}
              {n >= 3 && (
                <div className="anim-pop max-w-[88%] rounded-[16px] rounded-bl-[4px] bg-white p-3 text-[12px] leading-snug text-ink shadow-sm">
                  {tr("Ho capito, faccio due cose:")}
                  <ul className="mt-1.5 space-y-1">
                    <li className="flex gap-1.5">
                      <span className="mt-1.5 h-1 w-1 flex-none rounded-full bg-ink" />
                      {tr("Tonnarelli cacio e pepe: esauriti fino a domani")}
                    </li>
                    <li className="flex gap-1.5">
                      <span className="mt-1.5 h-1 w-1 flex-none rounded-full bg-ink" />
                      {tr("Stasera chiusura alle 22:00, ultime prenotazioni alle 21:00")}
                    </li>
                  </ul>
                  <span className="mt-2 block text-muted">{tr("Confermi?")}</span>
                </div>
              )}
              {n >= 3 && n < 4 && (
                <div className="anim-fade grid grid-cols-2 gap-1.5">
                  <span data-t="yes" className="flex h-9 items-center justify-center rounded-[10px] bg-white/70 text-[12.5px] font-medium text-[#3a8ee6]">
                    {tr("Sì, conferma")}
                  </span>
                  <span className="flex h-9 items-center justify-center rounded-[10px] bg-white/70 text-[12.5px] font-medium text-[#3a8ee6]">{tr("Annulla")}</span>
                </div>
              )}
              {n >= 4 && (
                <div className="anim-pop self-end rounded-[16px] rounded-br-[4px] bg-[#e1fec6] px-3 py-2 text-[12px] text-ink shadow-sm">{tr("Sì, conferma")}</div>
              )}
              {n >= 6 && (
                <div className="anim-pop max-w-[88%] rounded-[16px] rounded-bl-[4px] bg-white p-3 text-[12px] leading-snug text-ink shadow-sm">
                  {tr("Fatto. Menu e orari sono aggiornati, anche sul QR dei tavoli. Stasera hai 38 coperti prenotati, tutti prima delle 21.")}
                </div>
              )}
            </div>
            <div className="flex items-center gap-2 bg-white px-3 pb-6 pt-2">
              <span className="flex h-9 flex-1 items-center rounded-full bg-mist px-3 text-[12px] text-faint">{tr("Messaggio")}</span>
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#3a8ee6] text-white">
                <Icon name="mic" size={17} />
              </span>
            </div>
          </div>
        </PhoneFrame>
        <Cursor rootRef={d.rootRef} target={d.step.target} click={d.step.click} stepKey={d.i} hidden={d.reduced || !d.step.target} touch />
      </div>
    </Stage>
  );
}

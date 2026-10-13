"use client";

import { price, tr } from "@/i18n";
import { useEffect, useState } from "react";
import { Icon } from "../Icon";
import { Cursor, Toast, Toggle, useDemo, type Step } from "./engine";
import { AppWindow, PhoneFrame, Stage } from "./frames";

/* ---------- Menu digitale: il cliente sfoglia e aggiunge al carrello ---------- */

type MenuS = { cat: number; cart: number; total: number; open: boolean };
const menuInit: MenuS = { cat: 0, cart: 0, total: 0, open: false };
const menuSteps: Step<MenuS>[] = [
  { dur: 1400, target: "add-0", patch: { ...menuInit } },
  { dur: 1100, target: "add-0", click: true, patch: { cart: 1, total: 7 } },
  { dur: 1100, target: "add-1" },
  { dur: 1200, target: "add-1", click: true, patch: { cart: 2, total: 15.5 } },
  { dur: 1100, target: "cat-1" },
  { dur: 1200, target: "cat-1", click: true, patch: { cat: 1 } },
  { dur: 1000, target: "add-0" },
  { dur: 1300, target: "add-0", click: true, patch: { cart: 3, total: 22 } },
  { dur: 1000, target: "cart" },
  { dur: 2600, target: "cart", click: true, patch: { open: true } },
];
const cats = () => ([
  {
    name: tr("Pizze"),
    items: [
      { n: tr("Margherita"), d: tr("Pomodoro, fiordilatte, basilico"), p: "7,00", c: "#fde68a", a: tr("Glutine, latte") },
      { n: tr("Diavola"), d: tr("Salame piccante, fiordilatte"), p: "8,50", c: "#fecaca", a: tr("Glutine, latte") },
      { n: tr("Bufala e crudo"), d: tr("Bufala campana, crudo 18 mesi"), p: "11,00", c: "#e9d5ff", a: tr("Glutine, latte") },
    ],
  },
  {
    name: tr("Fritti"),
    items: [
      { n: tr("Fiori di zucca"), d: tr("Mozzarella e alici in pastella"), p: "6,50", c: "#fed7aa", a: tr("Glutine, latte, pesce") },
      { n: tr("Supplì"), d: tr("Riso, ragù e mozzarella"), p: "2,50", c: "#fde68a", a: tr("Glutine, latte, sedano") },
      { n: tr("Olive ascolane"), d: tr("Ripiene di carne, 6 pezzi"), p: "5,00", c: "#d9f99d", a: tr("Glutine, uova") },
    ],
  },
]);

export function MenuVisual({ bare = false }: { bare?: boolean }) {
  const d = useDemo(menuSteps, menuInit, { restIndex: 7 });
  const s = d.state;
  const cat = cats()[s.cat];
  const content = (
      <div ref={d.rootRef} className="relative">
        <PhoneFrame width={300}>
          <div className="relative flex h-[560px] flex-col">
            <div className="h-24 bg-[#f6e7d8] px-4 pt-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-white text-[12px] font-semibold text-ink">{tr("PF")}</span>
            </div>
            <div className="px-4 pt-3">
              <p className="text-[18px] font-semibold tracking-[-0.03em] text-ink">{tr("Pizzeria Fiore")}</p>
              <p className="flex items-center gap-1.5 text-[11px] text-muted">
                <span className="h-1.5 w-1.5 rounded-full bg-ios" />{" "}{tr("Aperto, cucina fino alle 23:00")}
              </p>
              <div className="mt-3 flex gap-1.5">
                {[...cats().map((c) => c.name), tr("Dolci"), tr("Bibite")].map((c, i) => (
                  <span
                    key={c}
                    data-t={`cat-${i}`}
                    className={`rounded-full px-3 py-1.5 text-[11.5px] transition-colors duration-300 ${
                      i === s.cat ? "bg-black text-white" : "bg-mist text-muted"
                    }`}
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
            <ul key={s.cat} className="anim-fade-up mt-2 flex-1 px-4">
              {cat.items.map((it, i) => (
                <li key={it.n} className="flex gap-3 border-b border-line-soft py-3">
                  <span className="min-w-0 flex-1">
                    <span className="block text-[13px] font-medium text-ink">{it.n}</span>
                    <span className="block text-[11px] leading-snug text-muted">{it.d}</span>
                    <span className="mt-1 block text-[10.5px] text-faint">{it.a}</span>
                    <span className="mt-1 block text-[12.5px] font-medium tabular-nums text-ink">{price(`${it.p} €`)}</span>
                  </span>
                  <span className="relative h-[68px] w-[68px] flex-none rounded-[12px]" style={{ background: it.c }}>
                    <span
                      data-t={`add-${i}`}
                      className="absolute -bottom-1.5 -right-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-black text-white shadow-md"
                    >
                      <Icon name="plus" size={14} stroke={2.6} />
                    </span>
                  </span>
                </li>
              ))}
            </ul>
            {s.cart > 0 && (
              <div
                data-t="cart"
                className="anim-fade-up m-3 flex h-12 items-center justify-between rounded-[14px] bg-black px-4 text-[13px] font-medium text-white"
              >
                <span className="flex items-center gap-2">
                  <span key={s.cart} className="anim-pop flex h-6 min-w-6 items-center justify-center rounded-full bg-white/20 px-1 text-[11px]">
                    {s.cart}
                  </span>
                  {tr("Vedi carrello")}
                </span>
                <span className="tabular-nums">{price(`${s.total.toFixed(2).replace(".", ",")} €`)}</span>
              </div>
            )}
            {s.open && (
              <div className="absolute inset-x-0 bottom-0 z-10 rounded-t-[22px] bg-white p-4 shadow-[0_-20px_40px_-20px_rgba(0,0,0,.3)] [animation:fadeUp_.4s_var(--ease-out-soft)_both]">
                <span className="mx-auto mb-3 block h-1 w-9 rounded-full bg-line" />
                <p className="text-[15px] font-semibold text-ink">{tr("Il tuo ordine")}</p>
                <p className="mt-2 text-[12px] text-muted">{tr("Scegli l'orario di ritiro")}</p>
                <div className="mt-2 grid grid-cols-4 gap-1.5">
                  {["19:30", "19:45", "20:00", "20:15"].map((t, i) => (
                    <span key={t} className={`rounded-[10px] py-2 text-center text-[11.5px] ${i === 1 ? "bg-black text-white" : "bg-mist text-text"}`}>
                      {t}
                    </span>
                  ))}
                </div>
                <span className="mt-4 flex h-11 items-center justify-center gap-2 rounded-[12px] bg-[#25d366] text-[13px] font-medium text-white">
                  <Icon name="send" size={15} stroke={2} />{" "}{tr("Invia l'ordine su WhatsApp")}
                </span>
              </div>
            )}
          </div>
        </PhoneFrame>
        <Cursor rootRef={d.rootRef} target={d.step.target} click={d.step.click} stepKey={d.i} hidden={d.reduced} touch />
        {!bare && (
          <>
            <FloatCard className="-left-36 top-24 hidden xl:flex" icon="qr" title={tr("QR sul tavolo")} text={tr("Si apre senza app")} />
            <FloatCard className="-right-36 bottom-32 hidden xl:flex" icon="bolt" title={tr("Aggiornato al volo")} text={tr("Prezzi ed esauriti in tempo reale")} />
          </>
        )}
      </div>
  );
  return bare ? content : <Stage tone="clear" className="flex items-center justify-center py-6">{content}</Stage>;
}

export function FloatCard({ className = "", icon, title, text }: { className?: string; icon: Parameters<typeof Icon>[0]["name"]; title: string; text: string }) {
  return (
    <div className={`absolute z-20 w-[188px] items-center gap-3 rounded-[14px] border border-line bg-white p-3 shadow-[0_18px_40px_-24px_rgba(0,0,0,.3)] ${className}`}>
      <span className="flex h-9 w-9 flex-none items-center justify-center rounded-[10px] bg-mist text-ink">
        <Icon name={icon} size={18} />
      </span>
      <span className="min-w-0">
        <span className="block text-[12.5px] font-medium text-ink">{title}</span>
        <span className="block text-[11px] leading-snug text-muted">{text}</span>
      </span>
    </div>
  );
}

/* ---------- Importazione con l'AI ---------- */

type AiS = { rows: number; scanning: boolean; published: boolean; toast: string | null };
const aiInit: AiS = { rows: 0, scanning: true, published: false, toast: null };
const aiSteps = (): Step<AiS>[] => ([
  { dur: 1600, patch: { ...aiInit } },
  { dur: 650, patch: { rows: 1 } },
  { dur: 650, patch: { rows: 2 } },
  { dur: 650, patch: { rows: 3 } },
  { dur: 650, patch: { rows: 4 } },
  { dur: 900, patch: { rows: 5, scanning: false }, target: "publish" },
  { dur: 900, target: "publish" },
  { dur: 2800, target: "publish", click: true, patch: { published: true, toast: tr("Menu pubblicato: 5 piatti, 3 categorie") } },
]);
const aiRows = () => ([
  { n: tr("Margherita"), c: tr("Pizze"), a: tr("Glutine, latte"), p: price("7,00 €") },
  { n: tr("Diavola"), c: tr("Pizze"), a: tr("Glutine, latte"), p: price("8,50 €") },
  { n: tr("Fiori di zucca"), c: tr("Fritti"), a: tr("Glutine, latte, pesce"), p: price("6,50 €"), check: true },
  { n: tr("Tiramisù"), c: tr("Dolci"), a: tr("Uova, latte"), p: price("5,00 €") },
  { n: tr("Birra artigianale"), c: tr("Bibite"), a: tr("Glutine"), p: price("5,50 €") },
]);

export function AiVisual() {
  const d = useDemo(aiSteps(), aiInit, { restIndex: 6 });
  const s = d.state;
  return (
    <Stage className="p-4 md:p-6">
      <div ref={d.rootRef} className="relative grid items-center gap-5 md:grid-cols-[0.75fr_1.25fr]">
        <div className="relative mx-auto w-[220px] rotate-[-3deg] rounded-[6px] bg-[#fffdf7] p-5 shadow-[0_30px_60px_-30px_rgba(0,0,0,.4)] md:w-full md:max-w-[260px]">
          <p className="text-center font-serif text-[17px] italic text-[#3b2f2f]">{tr("Pizzeria Fiore")}</p>
          {[tr("Pizze"), tr("Fritti"), tr("Dolci")].map((c, k) => (
            <div key={c} className="mt-3">
              <p className="font-serif text-[12px] font-semibold uppercase tracking-[0.12em] text-[#6b4f3a]">{c}</p>
              {[0, 1].map((j) => (
                <div key={j} className="mt-1.5 flex items-center gap-2">
                  <span className="h-[5px] rounded-full bg-[#cbbba6]" style={{ width: `${48 + ((k + j) % 3) * 14}%` }} />
                  <span className="ml-auto h-[5px] w-6 rounded-full bg-[#cbbba6]" />
                </div>
              ))}
            </div>
          ))}
          {s.scanning && (
            <span
              className="absolute inset-x-0 h-10 bg-[linear-gradient(180deg,transparent,rgba(52,199,89,.35),transparent)]"
              style={{ animation: "scanY 1.8s ease-in-out infinite" }}
            />
          )}
          <span className="absolute -right-2 -top-2 rounded-full bg-black px-2 py-0.5 text-[10.5px] font-medium text-white">{tr("foto_menu.jpg")}</span>
        </div>

        <AppWindow className="min-w-0">
          <div className="relative p-4">
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="text-[14px] font-semibold leading-snug text-ink">{tr("Controlla il menu importato")}</p>
                <p className="flex items-center gap-1.5 text-[11.5px] text-muted">
                  {s.scanning ? (
                    <>
                      <Icon name="sparkle" size={13} className="text-p-green-ink" />{" "}{tr("Lettura in corso")}
                    </>
                  ) : (
                    <>
                      <Icon name="check" size={13} className="text-p-green-ink" />{" "}{tr("5 piatti trovati, 1 da controllare")}
                    </>
                  )}
                </p>
              </div>
              <span
                data-t="publish"
                className={`flex h-8 flex-none items-center rounded-[9px] px-3 text-[12px] font-medium transition-colors ${
                  s.published ? "bg-p-green text-p-green-ink" : s.scanning ? "bg-mist text-faint" : "bg-black text-white"
                }`}
              >
                {s.published ? tr("Pubblicato") : tr("Pubblica")}
              </span>
            </div>
            <div className="mt-3 overflow-hidden rounded-[12px] border border-line-soft">
              <div className="grid grid-cols-[1.3fr_0.8fr_1.3fr_0.7fr] gap-2 bg-mist px-3 py-2 text-[11px] text-muted max-sm:grid-cols-[1.4fr_1fr_0.8fr]">
                <span>{tr("Piatto")}</span>
                <span>{tr("Categoria")}</span>
                <span className="max-sm:hidden">{tr("Allergeni")}</span>
                <span className="text-right">{tr("Prezzo")}</span>
              </div>
              <ul className="min-h-[205px]">
                {aiRows().slice(0, s.rows).map((r) => (
                  <li
                    key={r.n}
                    className={`anim-fade-up grid grid-cols-[1.3fr_0.8fr_1.3fr_0.7fr] items-center gap-2 border-t border-line-soft px-3 py-2.5 text-[12px] max-sm:grid-cols-[1.4fr_1fr_0.8fr] ${
                      r.check ? "bg-p-amber/60" : ""
                    }`}
                  >
                    <span className="truncate font-medium text-ink">{r.n}</span>
                    <span className="truncate text-muted">{r.c}</span>
                    <span className="truncate text-muted max-sm:hidden">{r.a}</span>
                    <span className="text-right tabular-nums text-ink">{r.p}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <Toast text={s.toast} stepKey={d.i} tone="dark" />
        </AppWindow>
        <Cursor rootRef={d.rootRef} target={d.step.target} click={d.step.click} stepKey={d.i} hidden={d.reduced || !d.step.target} />
      </div>
    </Stage>
  );
}

/* ---------- Traduzioni ---------- */

const flags: Record<string, string> = {
  it: "linear-gradient(90deg,#009246 33.3%,#fff 33.3% 66.6%,#ce2b37 66.6%)",
  en: "linear-gradient(#c8102e,#c8102e) center/100% 20% no-repeat,linear-gradient(#c8102e,#c8102e) center/16% 100% no-repeat,linear-gradient(#fff,#fff) center/100% 40% no-repeat,linear-gradient(#fff,#fff) center/32% 100% no-repeat,#012169",
  fr: "linear-gradient(90deg,#0055a4 33.3%,#fff 33.3% 66.6%,#ef4135 66.6%)",
  de: "linear-gradient(180deg,#000 33.3%,#dd0000 33.3% 66.6%,#ffce00 66.6%)",
  es: "linear-gradient(180deg,#aa151b 25%,#f1bf00 25% 75%,#aa151b 75%)",
};
const T = (): Record<string, { cat: string; name: string; desc: string; allergens: string; cta: string; lang: string }> => ({
  it: { lang: tr("Italiano"), cat: tr("Fritti"), name: tr("Fiori di zucca fritti"), desc: tr("Ripieni di mozzarella e alici, in pastella leggera."), allergens: tr("Glutine, latte, pesce"), cta: tr("Aggiungi") },
  en: { lang: tr("English"), cat: tr("Fried"), name: tr("Fried courgette flowers"), desc: tr("Stuffed with mozzarella and anchovies, in a light batter."), allergens: tr("Gluten, milk, fish"), cta: tr("Add") },
  fr: { lang: tr("Français"), cat: tr("Fritures"), name: tr("Fleurs de courgette frites"), desc: tr("Farcies de mozzarella et d'anchois, en pâte légère."), allergens: tr("Gluten, lait, poisson"), cta: tr("Ajouter") },
  de: { lang: tr("Deutsch"), cat: tr("Frittiertes"), name: tr("Frittierte Zucchiniblüten"), desc: tr("Gefüllt mit Mozzarella und Sardellen, in leichtem Teig."), allergens: tr("Gluten, Milch, Fisch"), cta: tr("Hinzufügen") },
  es: { lang: tr("Español"), cat: tr("Fritos"), name: tr("Flores de calabacín fritas"), desc: tr("Rellenas de mozzarella y anchoas, en rebozado ligero."), allergens: tr("Gluten, leche, pescado"), cta: tr("Añadir") },
});
const order = ["it", "en", "fr", "de", "es"];

export function LingueVisual() {
  const d = useDemo<{ k: number }>(
    order.map((_, k) => ({ dur: 2400, patch: { k } })),
    { k: 0 },
    { restIndex: 1 }
  );
  const lang = order[d.state.k];
  const t = T()[lang];
  return (
    <Stage className="flex min-h-[500px] items-center justify-center p-6">
      <div ref={d.rootRef} className="w-full max-w-[340px]">
        <div className="flex justify-center gap-2">
          {order.map((l) => (
            <span
              key={l}
              className={`flex h-10 items-center gap-2 rounded-full px-3 text-[12.5px] transition-all duration-300 ${
                l === lang ? "bg-white font-medium text-ink shadow-[0_8px_20px_-10px_rgba(0,0,0,.3)]" : "text-muted"
              }`}
            >
              <span className="h-3.5 w-5 rounded-[3px] shadow-[0_0_0_1px_rgba(0,0,0,.08)]" style={{ background: flags[l] }} />
              <span className="max-sm:hidden">{l.toUpperCase() === "IT" ? "IT" : l.toUpperCase()}</span>
            </span>
          ))}
        </div>
        <div className="mt-6 overflow-hidden rounded-[24px] bg-white shadow-[0_40px_80px_-40px_rgba(0,0,0,.35)]">
          <div className="h-28 bg-[radial-gradient(circle_at_30%_40%,#fed7aa,#fdba74_45%,#f97316)]" />
          <div key={lang} className="anim-fade-up p-5">
            <p className="text-[12px] text-muted">{t.cat}</p>
            <p className="mt-1 text-[22px] font-semibold leading-tight tracking-[-0.03em] text-ink">{t.name}</p>
            <p className="mt-2 text-[14px] leading-relaxed text-muted">{t.desc}</p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {t.allergens.split(", ").map((a) => (
                <span key={a} className="rounded-full bg-p-amber px-2.5 py-1 text-[11.5px] text-p-amber-ink">
                  {a}
                </span>
              ))}
            </div>
            <div className="mt-5 flex items-center justify-between">
              <span className="text-[17px] font-semibold tabular-nums text-ink">{price("6,50 €")}</span>
              <span className="flex h-10 items-center rounded-full bg-black px-5 text-[13px] font-medium text-white">{t.cta}</span>
            </div>
          </div>
        </div>
        <p className="mt-4 text-center text-[13px] text-muted">
          {tr("Lingua del telefono:")}{" "}<span className="font-medium text-ink">{t.lang}</span>
        </p>
      </div>
    </Stage>
  );
}

/* ---------- Menu a orari ---------- */

const bands = () => ([
  { from: 7, to: 11, name: tr("Colazione"), c: "bg-p-amber", ink: "text-p-amber-ink" },
  { from: 12, to: 15, name: tr("Pranzo"), c: "bg-p-green", ink: "text-p-green-ink" },
  { from: 18, to: 20.5, name: tr("Aperitivo"), c: "bg-p-orange", ink: "text-p-orange-ink" },
  { from: 19.5, to: 23.5, name: tr("Cena"), c: "bg-p-violet", ink: "text-p-violet-ink" },
]);
const preview = (): Record<string, string[]> => ({
  [tr("Colazione")]: [tr("Cornetto alla crema"), tr("Cappuccino"), tr("Spremuta d'arancia")],
  [tr("Pranzo")]: [tr("Piatto del giorno"), tr("Insalata di farro"), tr("Tagliata con rucola")],
  [tr("Aperitivo")]: [tr("Spritz"), tr("Tagliere di salumi"), tr("Negroni sbagliato")],
  [tr("Cena")]: [tr("Tonnarelli cacio e pepe"), tr("Filetto al pepe verde"), tr("Tiramisù")],
  [tr("Chiuso")]: [tr("Riapriamo alle 7:00")],
});

export function OrariVisual() {
  const [h, setH] = useState(7.5);
  const d = useDemo<{ x: number }>([{ dur: 100000 }], { x: 0 });
  useEffect(() => {
    if (!d.running) return;
    const id = window.setInterval(() => setH((v) => (v >= 23.4 ? 7 : v + 0.11)), 60);
    return () => window.clearInterval(id);
  }, [d.running]);
  const active = [...bands()].reverse().find((b) => h >= b.from && h < b.to)?.name ?? tr("Chiuso");
  const pct = ((h - 6) / 18) * 100;
  const hh = Math.floor(h);
  const mm = Math.floor((h - hh) * 60 / 15) * 15;
  return (
    <Stage className="p-4 md:p-6">
      <div ref={d.rootRef} className="mx-auto max-w-[560px]">
        <div className="rounded-[20px] bg-white p-5 shadow-[0_30px_60px_-40px_rgba(0,0,0,.35)]">
          <div className="flex items-center justify-between">
            <p className="text-[14px] font-semibold text-ink">{tr("Oggi, venerdì")}</p>
            <span className="rounded-full bg-black px-2.5 py-1 text-[12px] font-medium tabular-nums text-white">
              {String(hh).padStart(2, "0")}:{String(mm).padStart(2, "0")}
            </span>
          </div>
          <div className="relative mt-5">
            <div className="relative h-[124px]">
              {bands().map((b, i) => (
                <div
                  key={b.name}
                  className={`absolute flex h-9 items-center rounded-[10px] px-2.5 text-[12px] font-medium ${b.c} ${b.ink} transition-opacity duration-300 ${
                    active === b.name ? "opacity-100 ring-2 ring-black/80" : "opacity-70"
                  }`}
                  style={{ left: `${((b.from - 6) / 18) * 100}%`, width: `${((b.to - b.from) / 18) * 100}%`, top: i === 3 ? 84 : i === 2 ? 42 : 0 }}
                >
                  <span className="truncate">{b.name}</span>
                </div>
              ))}
              <div className="absolute bottom-0 top-[-8px] w-[2px] rounded-full bg-black" style={{ left: `${pct}%` }}>
                <span className="absolute -top-1 left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-black" />
              </div>
            </div>
            <div className="mt-2 flex justify-between text-[11px] tabular-nums text-faint">
              {[6, 9, 12, 15, 18, 21, 24].map((x) => (
                <span key={x}>{x}:00</span>
              ))}
            </div>
          </div>
        </div>

        <div className="mx-auto mt-5 max-w-[300px] rounded-[22px] bg-white p-4 shadow-[0_30px_60px_-40px_rgba(0,0,0,.35)]">
          <p className="text-[11.5px] text-muted">{tr("Menu mostrato ora dal QR")}</p>
          <p key={active} className="anim-fade-up mt-0.5 text-[20px] font-semibold tracking-[-0.03em] text-ink">
            {active}
          </p>
          <ul key={active + "l"} className="mt-2">
            {preview()[active].map((p, i) => (
              <li key={p} className="anim-fade-up border-t border-line-soft py-2 text-[13px] text-text" style={{ animationDelay: `${i * 70}ms` }}>
                {p}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Stage>
  );
}

/* ---------- Prenotazioni: il cliente prenota dal telefono ---------- */

type PrS = { day: number; slot: number; people: number; seat: boolean; done: boolean };
const prInit: PrS = { day: 0, slot: -1, people: 2, seat: false, done: false };
const prSteps: Step<PrS>[] = [
  { dur: 1300, target: "day-2", patch: { ...prInit } },
  { dur: 900, target: "day-2", click: true, patch: { day: 2 } },
  { dur: 1000, target: "people-plus" },
  { dur: 600, target: "people-plus", click: true, patch: { people: 3 } },
  { dur: 900, target: "people-plus", click: true, patch: { people: 4 } },
  { dur: 1000, target: "seat" },
  { dur: 900, target: "seat", click: true, patch: { seat: true } },
  { dur: 1000, target: "slot-2" },
  { dur: 900, target: "slot-2", click: true, patch: { slot: 2 } },
  { dur: 1000, target: "book" },
  { dur: 3200, target: "book", click: true, patch: { done: true } },
];

export function PrenotazioniVisual() {
  const d = useDemo(prSteps, prInit, { restIndex: 8 });
  const s = d.state;
  const days = [
    [tr("Oggi"), "15"],
    [tr("Ven"), "16"],
    [tr("Sab"), "17"],
    [tr("Dom"), "18"],
    [tr("Lun"), "19"],
  ];
  const slots = ["19:30", "20:00", "20:30", "21:00", "21:30", "22:00"];
  return (
    <Stage tone="clear" className="flex items-center justify-center py-6">
      <div ref={d.rootRef} className="relative">
        <PhoneFrame width={300}>
          <div className="relative h-[580px] px-4">
            {!s.done ? (
              <div className="pt-1">
                <p className="text-[11.5px] text-muted">{tr("Trattoria Il Glicine")}</p>
                <p className="text-[20px] font-semibold tracking-[-0.03em] text-ink">{tr("Prenota un tavolo")}</p>
                <p className="mt-4 text-[12px] font-medium text-ink">{tr("Giorno")}</p>
                <div className="mt-2 flex gap-1.5">
                  {days.map((x, i) => (
                    <span
                      key={x[1]}
                      data-t={`day-${i}`}
                      className={`flex h-[52px] w-[48px] flex-col items-center justify-center rounded-[12px] text-[10.5px] transition-colors duration-300 ${
                        s.day === i ? "bg-black text-white" : "bg-mist text-muted"
                      }`}
                    >
                      {x[0]}
                      <span className={`text-[15px] font-semibold ${s.day === i ? "text-white" : "text-ink"}`}>{x[1]}</span>
                    </span>
                  ))}
                </div>
                <div className="mt-4 flex items-center justify-between rounded-[14px] bg-mist px-3 py-2.5">
                  <span className="text-[12.5px] font-medium text-ink">{tr("Persone")}</span>
                  <span className="flex items-center gap-3">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-ink shadow-sm">
                      <Icon name="minus" size={13} stroke={2.4} />
                    </span>
                    <span key={s.people} className="anim-pop w-4 text-center text-[15px] font-semibold tabular-nums text-ink">
                      {s.people}
                    </span>
                    <span data-t="people-plus" className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-ink shadow-sm">
                      <Icon name="plus" size={13} stroke={2.4} />
                    </span>
                  </span>
                </div>
                <div className="mt-2 flex items-center justify-between rounded-[14px] bg-mist px-3 py-2.5">
                  <span className="text-[12.5px] font-medium text-ink">{tr("Serve un seggiolino")}</span>
                  <Toggle on={s.seat} small t="seat" />
                </div>
                <p className="mt-4 text-[12px] font-medium text-ink">{tr("Orario")}</p>
                <div className="mt-2 grid grid-cols-3 gap-1.5">
                  {slots.map((t, i) => (
                    <span
                      key={t}
                      data-t={`slot-${i}`}
                      className={`rounded-[10px] py-2 text-center text-[12px] tabular-nums transition-colors duration-300 ${
                        i === 4 ? "bg-mist text-faint line-through" : s.slot === i ? "bg-black text-white" : "bg-mist text-text"
                      }`}
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <span
                  data-t="book"
                  className={`absolute inset-x-4 bottom-5 flex h-12 items-center justify-center rounded-[14px] text-[13.5px] font-medium transition-colors ${
                    s.slot >= 0 ? "bg-black text-white" : "bg-mist text-faint"
                  }`}
                >
                  {tr("Prenota per")}{" "}{s.people}{" "}{tr("persone")}
                </span>
              </div>
            ) : (
              <div className="anim-fade flex h-full flex-col items-center justify-center text-center">
                <span className="anim-pop flex h-16 w-16 items-center justify-center rounded-full bg-p-green text-p-green-ink">
                  <Icon name="check" size={32} stroke={2.4} />
                </span>
                <p className="mt-4 text-[18px] font-semibold tracking-[-0.02em] text-ink">{tr("Richiesta inviata")}</p>
                <p className="mt-1.5 max-w-[220px] text-[12.5px] leading-snug text-muted">
                  {tr("Sabato 17 alle 20:30, 4 persone e un seggiolino. Ti confermiamo su WhatsApp.")}
                </p>
              </div>
            )}
          </div>
        </PhoneFrame>
        <Cursor rootRef={d.rootRef} target={d.step.target} click={d.step.click} stepKey={d.i} hidden={d.reduced} touch />
      </div>
    </Stage>
  );
}

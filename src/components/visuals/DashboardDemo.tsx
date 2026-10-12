"use client";

import { Icon, type IconName } from "../Icon";
import { Cursor, Toast, Toggle, useDemo, type Step } from "./engine";
import { AppWindow, PhoneFrame } from "./frames";

type Section = "oggi" | "prenotazioni" | "menu" | "ordini";
type S = { section: Section; accepted: boolean; soldOut: boolean; newOrder: boolean; toast: string | null };

const initial: S = { section: "oggi", accepted: false, soldOut: false, newOrder: false, toast: null };

const steps: Step<S>[] = [
  { dur: 1700, target: "nav-prenotazioni", patch: { ...initial } },
  { dur: 900, target: "nav-prenotazioni", click: true, patch: { section: "prenotazioni" } },
  { dur: 1200, target: "accept" },
  { dur: 2300, target: "accept", click: true, patch: { accepted: true, toast: "Conferma inviata su WhatsApp a Giulia" } },
  { dur: 1200, target: "nav-menu", patch: { toast: null } },
  { dur: 900, target: "nav-menu", click: true, patch: { section: "menu" } },
  { dur: 1200, target: "toggle-bufala" },
  { dur: 2400, target: "toggle-bufala", click: true, patch: { soldOut: true, toast: "Menu aggiornato su tutti i tavoli" } },
  { dur: 1200, target: "nav-ordini", patch: { toast: null } },
  { dur: 800, target: "nav-ordini", click: true, patch: { section: "ordini" } },
  { dur: 3200, target: "order-new", patch: { newOrder: true, toast: "Nuovo ordine: ritiro alle 19:45" } },
];

const nav: { id: Section; label: string; icon: IconName; badge?: string }[] = [
  { id: "oggi", label: "Oggi", icon: "home" },
  { id: "prenotazioni", label: "Prenotazioni", icon: "calendarCheck", badge: "1" },
  { id: "ordini", label: "Ordini", icon: "bag" },
  { id: "menu", label: "Menu", icon: "qr" },
];

export function DashboardDemo() {
  const wide = useDemo(steps, initial, { restIndex: 7 });
  const compact = useDemo(steps, initial, { restIndex: 7 });

  return (
    <div className="relative">
      {/* Computer e tablet */}
      <div ref={wide.rootRef} className="relative hidden md:block">
        <AppWindow title="gestione.pizzeriafiore.it" className="lg:mr-[150px]">
          <div className="grid h-[500px] grid-cols-[200px_1fr]">
            <Sidebar state={wide.state} />
            <div className="relative overflow-hidden bg-[#fbfbfc]">
              <Scene state={wide.state} />
              <Toast text={wide.state.toast} stepKey={wide.i} />
            </div>
          </div>
        </AppWindow>
        <div className="absolute -bottom-10 right-0 hidden lg:block">
          <PhoneFrame width={262} zoom={0.86}>
            <div className="h-[500px]">
              <CustomerView state={wide.state} />
            </div>
          </PhoneFrame>
          <p className="mt-3 text-center text-[12.5px] text-muted">Quello che vede il cliente</p>
        </div>
        <Cursor rootRef={wide.rootRef} target={wide.step.target} click={wide.step.click} stepKey={wide.i} hidden={wide.reduced} />
      </div>

      {/* Telefono */}
      <div ref={compact.rootRef} className="relative mx-auto w-fit md:hidden">
        <PhoneFrame width={318}>
          <div className="relative flex h-[600px] flex-col">
            <div className="flex items-center justify-between border-b border-line-soft px-4 pb-3 pt-1">
              <div>
                <p className="text-[11px] text-muted">Pizzeria Fiore</p>
                <p className="text-[17px] font-semibold tracking-[-0.02em] text-ink">{nav.find((n) => n.id === compact.state.section)?.label}</p>
              </div>
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-mist text-[11px] font-semibold">MF</span>
            </div>
            <div className="relative flex-1 overflow-hidden bg-[#fbfbfc]">
              <Scene state={compact.state} compact />
              <Toast text={compact.state.toast} stepKey={compact.i} />
            </div>
            <nav className="grid grid-cols-4 border-t border-line-soft bg-white px-2 pb-5 pt-1.5">
              {nav.map((n) => (
                <span
                  key={n.id}
                  data-t={`nav-${n.id}`}
                  className={`relative flex flex-col items-center gap-0.5 py-1 text-[10px] ${compact.state.section === n.id ? "text-ink" : "text-faint"}`}
                >
                  <Icon name={n.icon} size={20} stroke={compact.state.section === n.id ? 2.1 : 1.8} />
                  {n.label}
                  {n.badge && !compact.state.accepted && (
                    <span className="absolute right-[14px] top-0 h-2 w-2 rounded-full bg-[#ff3b30]" />
                  )}
                </span>
              ))}
            </nav>
          </div>
        </PhoneFrame>
        <Cursor rootRef={compact.rootRef} target={compact.step.target} click={compact.step.click} stepKey={compact.i} hidden={compact.reduced} touch />
      </div>
    </div>
  );
}

function Sidebar({ state }: { state: S }) {
  return (
    <aside className="flex flex-col border-r border-line-soft bg-white p-3">
      <div className="flex items-center gap-2.5 px-2 pb-4 pt-1">
        <span className="flex h-8 w-8 items-center justify-center rounded-[9px] bg-p-red text-[12px] font-semibold text-p-red-ink">PF</span>
        <span className="min-w-0">
          <span className="block truncate text-[13px] font-semibold text-ink">Pizzeria Fiore</span>
          <span className="block text-[11px] text-muted">Aperto ora</span>
        </span>
      </div>
      <ul className="flex flex-col gap-0.5">
        {nav.map((n) => {
          const active = state.section === n.id;
          return (
            <li key={n.id}>
              <span
                data-t={`nav-${n.id}`}
                className={`flex h-9 items-center gap-2.5 rounded-[9px] px-2.5 text-[13px] transition-colors duration-300 ${
                  active ? "bg-mist font-medium text-ink" : "text-[#48484a]"
                }`}
              >
                <Icon name={n.icon} size={16} />
                {n.label}
                {n.badge && !state.accepted && (
                  <span className="ml-auto flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[#ff3b30] px-1 text-[10.5px] font-semibold text-white">
                    {n.badge}
                  </span>
                )}
              </span>
            </li>
          );
        })}
        {(["Clienti", "Statistiche", "Assistente"] as const).map((l, k) => (
          <li key={l}>
            <span className="flex h-9 items-center gap-2.5 rounded-[9px] px-2.5 text-[13px] text-[#48484a]">
              <Icon name={(["users", "chart", "mic"] as const)[k]} size={16} />
              {l}
            </span>
          </li>
        ))}
      </ul>
      <div className="mt-auto rounded-xl bg-mist p-3">
        <p className="text-[11.5px] font-medium text-ink">Ordini da asporto</p>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-[11.5px] text-muted">Accetta ordini</span>
          <Toggle on small />
        </div>
      </div>
    </aside>
  );
}

function Scene({ state, compact = false }: { state: S; compact?: boolean }) {
  const pad = compact ? "p-3" : "p-6 lg:pr-[132px]";
  return (
    <div key={state.section} className={`h-full ${pad} anim-fade-up`}>
      {state.section === "oggi" && <Oggi compact={compact} />}
      {state.section === "prenotazioni" && <Prenotazioni state={state} compact={compact} />}
      {state.section === "menu" && <MenuList state={state} compact={compact} />}
      {state.section === "ordini" && <Ordini state={state} compact={compact} />}
    </div>
  );
}

function Oggi({ compact }: { compact: boolean }) {
  const kpi = [
    { l: "Coperti stasera", v: "48", s: "su 60" },
    { l: "Ordini asporto", v: "12", s: "+3 su sabato scorso" },
    { l: "Da confermare", v: "1", s: "prenotazione", tone: "pink" },
  ];
  return (
    <div>
      {!compact && (
        <>
          <p className="text-[12.5px] text-muted">Sabato 17 ottobre</p>
          <p className="mt-0.5 text-[22px] font-semibold tracking-[-0.03em] text-ink">Buonasera, Marco</p>
        </>
      )}
      <div className={`grid gap-2.5 ${compact ? "grid-cols-2" : "mt-5 grid-cols-3"}`}>
        {kpi.map((k, i) => (
          <div
            key={k.l}
            className={`rounded-[14px] border border-line-soft p-3 ${k.tone === "pink" ? "bg-p-pink" : "bg-white"} ${compact && i === 2 ? "col-span-2" : ""}`}
          >
            <p className={`text-[11.5px] ${k.tone === "pink" ? "text-p-pink-ink" : "text-muted"}`}>{k.l}</p>
            <p className="mt-1 text-[26px] font-semibold leading-none tracking-[-0.04em] text-ink">{k.v}</p>
            <p className="mt-1 text-[11px] leading-snug text-muted">{k.s}</p>
          </div>
        ))}
      </div>
      <p className="mt-5 text-[12.5px] font-medium text-ink">Prossimi arrivi</p>
      <ul className="mt-2 overflow-hidden rounded-[14px] border border-line-soft bg-white">
        {[
          ["19:30", "Ferrari", "2 persone", "Tavolo 4"],
          ["20:00", "Bianchi", "5 persone", "Tavolo 9"],
          ["20:30", "Giulia Rossi", "4 persone", "Da confermare"],
          ["21:00", "Conti", "6 persone", "Tavolo 12"],
        ].map((r) => (
          <li key={r[0]} className="flex items-center gap-3 border-b border-line-soft px-3 py-2.5 text-[12.5px] last:border-0">
            <span className="w-10 font-medium tabular-nums text-ink">{r[0]}</span>
            <span className="flex-1 truncate text-ink">{r[1]}</span>
            {!compact && <span className="text-muted">{r[2]}</span>}
            <span className={`rounded-full px-2 py-0.5 text-[11px] ${r[3] === "Da confermare" ? "bg-p-pink text-p-pink-ink" : "bg-mist text-muted"}`}>
              {r[3]}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Prenotazioni({ state, compact }: { state: S; compact: boolean }) {
  const days = ["Ven 16", "Sab 17", "Dom 18", "Lun 19", "Mar 20", "Mer 21"];
  return (
    <div>
      <div className="no-scrollbar flex gap-1.5 overflow-hidden">
        {days.slice(0, compact ? 4 : 6).map((d) => (
          <span
            key={d}
            className={`flex h-12 min-w-[56px] flex-col items-center justify-center rounded-[12px] text-[11px] ${
              d === "Sab 17" ? "bg-black text-white" : "border border-line-soft bg-white text-muted"
            }`}
          >
            <span>{d.split(" ")[0]}</span>
            <span className={`text-[15px] font-semibold ${d === "Sab 17" ? "text-white" : "text-ink"}`}>{d.split(" ")[1]}</span>
          </span>
        ))}
      </div>
      <ul className="mt-4 flex flex-col gap-2">
        <ResRow time="19:30" name="Ferrari" people="2 persone" status="Confermata" compact={compact} />
        <li className={`rounded-[14px] border bg-white p-3 transition-colors duration-500 ${state.accepted ? "border-line-soft" : "border-[#f3b8d0]"}`}>
          <div className="flex items-center gap-3 text-[12.5px]">
            <span className="w-10 font-medium tabular-nums text-ink">20:30</span>
            <span className="min-w-0 flex-1">
              <span className="block truncate font-medium text-ink">Giulia Rossi</span>
              <span className="block text-[11.5px] text-muted">4 persone, 1 seggiolino</span>
            </span>
            <span
              className={`rounded-full px-2 py-0.5 text-[11px] transition-colors duration-500 ${
                state.accepted ? "bg-p-green text-p-green-ink" : "bg-p-pink text-p-pink-ink"
              }`}
            >
              {state.accepted ? "Confermata" : "Nuova"}
            </span>
          </div>
          {!state.accepted && (
            <div className="mt-3 grid grid-cols-2 gap-2">
              <span className="flex h-8 items-center justify-center rounded-[9px] border border-line text-[12px] font-medium text-ink">Rifiuta</span>
              <span data-t="accept" className="flex h-8 items-center justify-center rounded-[9px] bg-black text-[12px] font-medium text-white">
                Accetta
              </span>
            </div>
          )}
        </li>
        <ResRow time="21:00" name="Conti" people="6 persone" status="Confermata" compact={compact} />
        {!compact && <ResRow time="21:15" name="Marino" people="2 persone" status="Confermata" compact={compact} />}
      </ul>
    </div>
  );
}

function ResRow({ time, name, people, status, compact }: { time: string; name: string; people: string; status: string; compact: boolean }) {
  return (
    <li className="flex items-center gap-3 rounded-[14px] border border-line-soft bg-white p-3 text-[12.5px]">
      <span className="w-10 font-medium tabular-nums text-ink">{time}</span>
      <span className="min-w-0 flex-1">
        <span className="block truncate font-medium text-ink">{name}</span>
        {compact && <span className="block text-[11.5px] text-muted">{people}</span>}
      </span>
      {!compact && <span className="text-muted">{people}</span>}
      <span className="rounded-full bg-p-green px-2 py-0.5 text-[11px] text-p-green-ink">{status}</span>
    </li>
  );
}

const dishes = [
  { n: "Margherita", d: "Pomodoro, fiordilatte, basilico", p: "7,00 €", t: "#fde68a" },
  { n: "Diavola", d: "Salame piccante, fiordilatte", p: "8,50 €", t: "#fecaca" },
  { n: "Bufala e crudo", d: "Bufala campana, crudo 18 mesi", p: "11,00 €", t: "#e9d5ff", key: true },
  { n: "Ortolana", d: "Verdure grigliate di stagione", p: "9,00 €", t: "#bbf7d0" },
  { n: "Capricciosa", d: "Prosciutto, funghi, carciofi, olive", p: "9,50 €", t: "#fed7aa" },
];

function MenuList({ state, compact }: { state: S; compact: boolean }) {
  return (
    <div>
      <div className="flex gap-1.5">
        {["Pizze classiche", "Speciali", "Fritti"].slice(0, compact ? 2 : 3).map((c, i) => (
          <span key={c} className={`rounded-full px-3 py-1.5 text-[12px] ${i === 0 ? "bg-black text-white" : "border border-line-soft bg-white text-muted"}`}>
            {c}
          </span>
        ))}
      </div>
      <ul className="mt-4 overflow-hidden rounded-[14px] border border-line-soft bg-white">
        {dishes.slice(0, compact ? 4 : 5).map((d) => {
          const off = d.key && state.soldOut;
          return (
            <li key={d.n} className="flex items-center gap-3 border-b border-line-soft px-3 py-2.5 last:border-0">
              <span className="h-9 w-9 flex-none rounded-[9px]" style={{ background: d.t, opacity: off ? 0.4 : 1 }} />
              <span className="min-w-0 flex-1">
                <span className={`flex items-center gap-2 text-[12.5px] font-medium ${off ? "text-muted" : "text-ink"}`}>
                  <span className="truncate">{d.n}</span>
                  {off && <span className="anim-pop rounded-full bg-p-red px-1.5 py-px text-[10.5px] font-medium text-p-red-ink">Esaurito</span>}
                </span>
                {!compact && <span className="block text-[11.5px] text-muted">{d.d}</span>}
              </span>
              <span className="text-[12.5px] tabular-nums text-muted">{d.p}</span>
              <Toggle on={!off} small t={d.key ? "toggle-bufala" : undefined} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function Ordini({ state, compact }: { state: S; compact: boolean }) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-[12.5px] font-medium text-ink">Da preparare</p>
        <span className="flex items-center gap-1.5 text-[11.5px] text-muted">
          <span className="h-2 w-2 rounded-full bg-ios [animation:pulseDot_2s_ease-in-out_infinite]" />
          Ordini aperti fino alle 22:30
        </span>
      </div>
      <ul className="mt-3 flex flex-col gap-2">
        {state.newOrder && (
          <OrderRow
            t="order-new"
            time="19:45"
            name="Andrea M."
            items="2 Margherita, 1 Diavola, 1 fiori di zucca"
            total="27,50 €"
            fresh
            compact={compact}
          />
        )}
        <OrderRow time="19:30" name="Lucia B." items="1 Capricciosa, 1 Ortolana" total="18,50 €" compact={compact} />
        <OrderRow time="20:00" name="Famiglia Greco" items="4 Margherita, 2 birre" total="39,00 €" compact={compact} />
        {!compact && <OrderRow time="20:15" name="Paolo R." items="1 Diavola" total="8,50 €" compact={compact} />}
      </ul>
    </div>
  );
}

function OrderRow({
  time,
  name,
  items,
  total,
  fresh,
  t,
  compact,
}: {
  time: string;
  name: string;
  items: string;
  total: string;
  fresh?: boolean;
  t?: string;
  compact: boolean;
}) {
  return (
    <li
      data-t={t}
      className="flex items-center gap-3 rounded-[14px] border border-line-soft bg-white p-3 text-[12.5px]"
      style={fresh ? { animation: "rowIn .9s var(--ease-out-soft) both" } : undefined}
    >
      <span className="flex h-10 w-12 flex-none flex-col items-center justify-center rounded-[10px] bg-mist">
        <span className="text-[10px] text-muted">Ritiro</span>
        <span className="font-semibold tabular-nums text-ink">{time}</span>
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-2 font-medium text-ink">
          {name}
          {fresh && <span className="rounded-full bg-p-green px-1.5 py-px text-[10.5px] text-p-green-ink">Nuovo</span>}
        </span>
        <span className="block text-[11.5px] leading-snug text-muted">{items}</span>
      </span>
      {!compact && <span className="font-medium tabular-nums text-ink">{total}</span>}
    </li>
  );
}

/** Telefono del cliente: cambia in base a cosa succede nella dashboard. */
function CustomerView({ state }: { state: S }) {
  if (state.section === "prenotazioni" && state.accepted) {
    return (
      <div key="wa" className="flex h-full flex-col bg-[#efeae2] anim-fade">
        <div className="flex items-center gap-2 bg-[#f6f6f6] px-3 py-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-p-red text-[10px] font-semibold text-p-red-ink">PF</span>
          <span className="text-[12.5px] font-semibold text-ink">Pizzeria Fiore</span>
        </div>
        <div className="flex flex-1 flex-col gap-2 p-3">
          <div className="anim-pop max-w-[86%] rounded-[12px] rounded-tl-[4px] bg-white p-2.5 text-[11.5px] leading-snug text-ink shadow-sm">
            Ciao Giulia, la tua prenotazione è confermata: sabato 17 alle 20:30, 4 persone e un seggiolino. A presto!
            <span className="mt-1 block text-right text-[9.5px] text-muted">20:14</span>
          </div>
          <div className="anim-pop flex gap-1.5" style={{ animationDelay: ".3s" }}>
            <span className="rounded-[10px] bg-white px-2.5 py-1.5 text-[11px] font-medium text-[#0a7cff] shadow-sm">Vedi il menu</span>
            <span className="rounded-[10px] bg-white px-2.5 py-1.5 text-[11px] font-medium text-[#0a7cff] shadow-sm">Annulla</span>
          </div>
        </div>
      </div>
    );
  }
  if (state.section === "ordini" && state.newOrder) {
    return (
      <div key="ord" className="flex h-full flex-col items-center justify-center bg-white px-5 text-center anim-fade">
        <span className="anim-pop flex h-14 w-14 items-center justify-center rounded-full bg-p-green text-p-green-ink">
          <Icon name="check" size={28} stroke={2.4} />
        </span>
        <p className="mt-4 text-[16px] font-semibold tracking-[-0.02em] text-ink">Ordine inviato</p>
        <p className="mt-1 text-[12px] leading-snug text-muted">Ritiro alle 19:45 da Pizzeria Fiore. Totale 27,50 €</p>
        <span className="mt-5 rounded-full bg-mist px-3 py-1.5 text-[11.5px] text-muted">Pagamento al ritiro</span>
      </div>
    );
  }
  return (
    <div key="menu" className="flex h-full flex-col">
      <div className="px-4 pb-3 pt-1">
        <p className="text-[17px] font-semibold tracking-[-0.03em] text-ink">Pizzeria Fiore</p>
        <p className="flex items-center gap-1.5 text-[11px] text-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-ios" /> Aperto fino alle 23:30
        </p>
        <div className="mt-3 flex gap-1.5">
          {["Pizze", "Fritti", "Dolci", "Bibite"].map((c, i) => (
            <span key={c} className={`rounded-full px-2.5 py-1 text-[11px] ${i === 0 ? "bg-black text-white" : "bg-mist text-muted"}`}>
              {c}
            </span>
          ))}
        </div>
      </div>
      <ul className="flex-1 px-4">
        {dishes.slice(0, 4).map((d) => {
          const off = d.key && state.soldOut;
          return (
            <li key={d.n} className="flex items-center gap-3 border-t border-line-soft py-2.5">
              <span className="min-w-0 flex-1">
                <span className={`flex items-center gap-1.5 text-[12.5px] font-medium ${off ? "text-faint line-through" : "text-ink"}`}>{d.n}</span>
                <span className="block text-[10.5px] leading-snug text-muted">{off ? "Esaurito per stasera" : d.d}</span>
              </span>
              <span className="relative h-12 w-12 flex-none rounded-[10px]" style={{ background: d.t, opacity: off ? 0.35 : 1 }}>
                {!off && (
                  <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-black text-white">
                    <Icon name="plus" size={12} stroke={2.6} />
                  </span>
                )}
              </span>
            </li>
          );
        })}
      </ul>
      <div className="m-3 flex h-11 items-center justify-between rounded-[12px] bg-black px-3.5 text-[12px] font-medium text-white">
        <span className="flex items-center gap-2">
          <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-white/20 px-1 text-[10.5px]">2</span>
          Vedi carrello
        </span>
        <span className="tabular-nums">15,50 €</span>
      </div>
    </div>
  );
}

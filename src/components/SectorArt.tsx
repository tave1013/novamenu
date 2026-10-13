import { tr, price as eurText } from "@/i18n";
import type { BookingArt, CalcArt, KpisArt, CatalogArt, DaypartsArt, LangsArt, OrderArt, Sector, SectorArt as Art, SlotsArt } from "@/content/sectors";
import { Icon } from "./Icon";
import { toneGlow } from "./StaticArt";

const card = "rounded-[18px] border border-line bg-white shadow-[0_30px_60px_-38px_rgba(0,0,0,.4)]";

function Price({ price, unit }: { price: string; unit?: string }) {
  if (!price) return null;
  return (
    <span className="whitespace-nowrap text-[13px] font-semibold tabular-nums text-ink">
      {eurText(`€ ${price}`)}
      {unit && <span className="font-normal text-muted"> / {unit}</span>}
    </span>
  );
}

export function Catalog({ a, className = "" }: { a: CatalogArt; className?: string }) {
  return (
    <div className={`${card} w-full max-w-[400px] overflow-hidden ${className}`}>
      <div className="border-b border-line-soft px-4 pb-3 pt-4">
        <p className="text-[16px] font-semibold tracking-[-0.02em] text-ink">{a.shop}</p>
        <p className="mt-0.5 flex items-center gap-1.5 text-[12px] text-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-[#16a34a]" />
          {a.status}
        </p>
        <div className="mt-3 flex gap-1.5 overflow-hidden">
          {a.tabs.map((t, i) => (
            <span key={t} className={`whitespace-nowrap rounded-full px-2.5 py-1 text-[11.5px] font-medium ${i === 0 ? "bg-forest text-white" : "bg-mist text-text"}`}>
              {t}
            </span>
          ))}
        </div>
      </div>
      <ul className="px-4 py-1">
        {a.items.map((it) => (
          <li key={it.name} className={`flex items-center gap-3 border-b border-line-soft py-2.5 last:border-0 ${it.out ? "opacity-55" : ""}`}>
            <span className="h-11 w-11 flex-none rounded-[10px]" style={{ background: it.c ?? "#f4f4f1" }} />
            <span className="min-w-0 flex-1">
              <span className="flex flex-wrap items-center gap-1.5 text-[13.5px] font-medium leading-tight text-ink">
                {it.name}
                {it.tag && <span className="rounded-full bg-lime-soft px-1.5 py-px text-[10.5px] font-medium text-forest">{it.tag}</span>}
                {it.out && <span className="rounded-full bg-mist px-1.5 py-px text-[10.5px] font-medium text-muted">{tr("Esaurito")}</span>}
              </span>
              {it.desc && <span className="mt-0.5 block text-[11.5px] leading-snug text-muted">{it.desc}</span>}
            </span>
            <Price price={it.price} unit={it.unit} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function Slots({ a }: { a: SlotsArt }) {
  const st: Record<string, string> = {
    free: "border border-line bg-white text-ink",
    few: "border border-[#fcd34d] bg-p-amber text-p-amber-ink",
    full: "border border-line-soft bg-mist text-faint line-through",
    sel: "border border-forest bg-forest text-white",
  };
  return (
    <div className={`${card} w-full max-w-[400px] p-5`}>
      <p className="text-[15px] font-semibold tracking-[-0.02em] text-ink">{a.title}</p>
      <div className="mt-3 flex gap-2">
        {a.days.map((d, i) => (
          <span
            key={d.n}
            className={`flex h-14 flex-1 flex-col items-center justify-center rounded-[12px] text-[11px] ${
              d.full ? "bg-mist text-faint" : i === (a.days.length > 3 ? 2 : 1) ? "bg-lime text-forest" : "border border-line text-muted"
            }`}
          >
            {d.d}
            <span className="text-[16px] font-semibold tabular-nums">{d.n}</span>
            {d.full && <span className="text-[9.5px]">{tr("pieno")}</span>}
          </span>
        ))}
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2">
        {a.slots.map((s) => (
          <span key={s.t} className={`relative flex h-10 items-center justify-center rounded-[10px] text-[13px] font-medium tabular-nums ${st[s.s]}`}>
            {s.t}
            {s.s === "few" && <span className="absolute -top-2 right-1 rounded-full bg-white px-1.5 text-[9.5px] font-medium text-p-amber-ink shadow-sm">{tr("ultimi")}</span>}
          </span>
        ))}
      </div>
      <div className="mt-4 flex items-center gap-2 rounded-[12px] bg-lime-soft px-3 py-2.5 text-[12.5px] font-medium text-forest">
        <Icon name="check" size={14} stroke={2.4} />
        {a.note}
      </div>
    </div>
  );
}

function Order({ a }: { a: OrderArt }) {
  return (
    <div className="w-full max-w-[380px] overflow-hidden rounded-[22px] border border-line bg-[#efeae2] shadow-[0_30px_60px_-38px_rgba(0,0,0,.4)]">
      <div className="flex items-center gap-2.5 bg-[#075e54] px-4 py-3 text-white">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
          <Icon name="bag" size={15} stroke={2} />
        </span>
        <span className="text-[13px] leading-tight">
          <span className="block font-semibold">{tr("Nuovo ordine")}</span>
          <span className="text-white/75">{tr("da")}{" "}{a.who}</span>
        </span>
      </div>
      <div className="p-4">
        <div className="ml-auto max-w-[92%] rounded-[12px] rounded-tr-[4px] bg-[#d9fdd3] px-3.5 py-3 text-[13px] leading-[1.5] text-[#111b21] shadow-[0_2px_4px_rgba(0,0,0,.06)]">
          <p className="font-semibold">{tr("🛍️ Ordine da asporto")}</p>
          <ul className="mt-1">
            {a.lines.map((l) => (
              <li key={l}>{l}</li>
            ))}
          </ul>
          {a.extra && <p className="mt-1.5 italic text-[#3b4a54]">{a.extra}</p>}
          <p className="mt-1.5">
            <span className="font-semibold">{tr("Totale")}{" "}{a.total}</span>
          </p>
          <p className="font-semibold">🕒 {a.when}</p>
          <p className="mt-1 text-right text-[10px] text-[#667781]">18:42 ✓✓</p>
        </div>
        <div className="mt-3 flex gap-2">
          <span className="flex h-9 flex-1 items-center justify-center rounded-[10px] bg-forest text-[12.5px] font-medium text-white">{tr("Conferma")}</span>
          <span className="flex h-9 flex-1 items-center justify-center rounded-[10px] bg-white text-[12.5px] font-medium text-ink">{tr("Scrivi al cliente")}</span>
        </div>
      </div>
    </div>
  );
}

function Dayparts({ a }: { a: DaypartsArt }) {
  return (
    <div className={`${card} w-full max-w-[400px] p-2`}>
      {a.rows.map((r) => (
        <div key={r.t} className="flex items-center gap-3 rounded-[12px] px-3 py-3 [&:not(:last-child)]:border-b [&:not(:last-child)]:border-line-soft">
          <span className={`flex h-10 w-10 flex-none items-center justify-center rounded-[11px] ${r.on ? "bg-lime text-forest" : "bg-mist text-faint"}`}>
            <Icon name="clock" size={17} stroke={2} />
          </span>
          <span className="min-w-0 flex-1">
            <span className="flex flex-wrap items-baseline gap-x-2 text-[14px] font-semibold text-ink">
              {r.t}
              <span className="text-[12px] font-normal tabular-nums text-muted">{r.time}</span>
            </span>
            <span className="block text-[12px] leading-snug text-muted">{r.items}</span>
          </span>
          <span data-on={r.on ? "true" : "false"} className="toggle toggle-sm" />
        </div>
      ))}
    </div>
  );
}

function Booking({ a }: { a: BookingArt }) {
  const pct = Math.round((a.used / a.total) * 100);
  return (
    <div className={`${card} w-full max-w-[400px] p-5`}>
      <div className="flex items-start justify-between gap-3">
        <span>
          <span className="block text-[15px] font-semibold tracking-[-0.02em] text-ink">{a.title}</span>
          <span className="text-[12px] text-muted">{a.sub}</span>
        </span>
        <span className="rounded-full bg-lime-soft px-2.5 py-1 text-[12px] font-semibold tabular-nums text-forest">
          {a.used} / {a.total}{" "}{tr("posti")}
        </span>
      </div>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-mist">
        <div className="h-full rounded-full bg-forest" style={{ width: `${pct}%` }} />
      </div>
      <ul className="mt-4">
        {a.list.map((p) => (
          <li key={p.name} className="flex items-center gap-3 border-b border-line-soft py-2.5 last:border-0">
            <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-mist text-[12px] font-semibold text-ink">{p.n}</span>
            <span className="min-w-0 flex-1 text-[13px] leading-tight">
              <span className="block font-medium text-ink">{p.name}</span>
              {p.note && <span className="text-[11.5px] text-muted">{p.note}</span>}
            </span>
            <span className="text-[12.5px] tabular-nums text-muted">{p.time}</span>
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-lime text-forest">
              <Icon name="check" size={12} stroke={2.6} />
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Langs({ a }: { a: LangsArt }) {
  return (
    <div className={`${card} w-full max-w-[400px] p-5`}>
      <p className="text-[11px] font-medium uppercase tracking-wide text-faint">{tr("Il nome resta in italiano")}</p>
      <p className="mt-1 text-[18px] font-semibold tracking-[-0.02em] text-ink">{a.dish}</p>
      <ul className="mt-3 flex flex-col gap-2">
        {a.lines.map((l) => (
          <li key={l.flag} className="flex items-center gap-3 rounded-[12px] bg-mist px-3 py-2.5 text-[13px] text-text">
            <span className="text-[18px] leading-none">{l.flag}</span>
            {l.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Calc({ a }: { a: CalcArt }) {
  return (
    <div className={`${card} w-full max-w-[420px] p-5`}>
      <p className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-wide text-faint">
        <Icon name="chart" size={13} stroke={2} />
        {tr("Fai i conti")}
      </p>
      <p className="mt-1 text-[16px] font-semibold tracking-[-0.02em] text-ink">{a.title}</p>
      <ul className="mt-3">
        {a.rows.map((r) => (
          <li key={r.label} className="flex items-baseline justify-between gap-4 border-b border-dashed border-line py-2.5 text-[13.5px]">
            <span className="text-muted">{r.label}</span>
            <span className="whitespace-nowrap font-medium tabular-nums text-ink">{r.value}</span>
          </li>
        ))}
      </ul>
      <div className="mt-4 flex items-center justify-between gap-4 rounded-[14px] bg-forest px-4 py-3.5 text-white">
        <span className="text-[13px] text-[#cfdcc4]">{a.result.label}</span>
        <span className="whitespace-nowrap text-[22px] font-semibold tracking-[-0.03em] tabular-nums text-lime">{a.result.value}</span>
      </div>
      {a.note && <p className="mt-3 text-[11.5px] leading-snug text-muted">{a.note}</p>}
    </div>
  );
}

function Kpis({ a }: { a: KpisArt }) {
  return (
    <div className={`${card} w-full max-w-[460px] p-5`}>
      <p className="text-[16px] font-semibold tracking-[-0.02em] text-ink">{a.title}</p>
      <div className="mt-4 grid grid-cols-3 gap-2">
        {a.items.map((k, i) => (
          <div key={k.label} className={`rounded-[14px] p-3 ${i === 0 ? "bg-lime text-forest" : "bg-mist text-ink"}`}>
            <p className="text-[22px] font-semibold tracking-[-0.03em] tabular-nums">{k.value}</p>
            <p className={`mt-1 text-[11.5px] leading-snug ${i === 0 ? "text-forest/80" : "text-muted"}`}>{k.label}</p>
          </div>
        ))}
      </div>
      {a.note && <p className="mt-3 text-[11.5px] leading-snug text-muted">{a.note}</p>}
    </div>
  );
}

export function SectorArtView({ art }: { art: Art }) {
  switch (art.kind) {
    case "catalog":
      return <Catalog a={art} />;
    case "slots":
      return <Slots a={art} />;
    case "order":
      return <Order a={art} />;
    case "dayparts":
      return <Dayparts a={art} />;
    case "booking":
      return <Booking a={art} />;
    case "langs":
      return <Langs a={art} />;
    case "calc":
      return <Calc a={art} />;
    case "kpis":
      return <Kpis a={art} />;
  }
}

/** Riquadro con la sfumatura del settore e la grafica al centro. */
export function ArtStage({ tone, children }: { tone: string; children: React.ReactNode }) {
  return (
    <div className="relative flex justify-center overflow-hidden rounded-[24px] border border-line bg-white px-5 py-10 md:px-10 md:py-14" style={{ backgroundImage: toneGlow[tone] }}>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          backgroundImage: "radial-gradient(rgba(11,11,12,.07) 1px, transparent 1px)",
          backgroundSize: "18px 18px",
          maskImage: "linear-gradient(180deg,#000,transparent 85%)",
          WebkitMaskImage: "linear-gradient(180deg,#000,transparent 85%)",
        }}
      />
      <div className="relative flex w-full justify-center">{children}</div>
    </div>
  );
}

/** Grafica statica dell'apertura: il catalogo del locale e due notifiche che galleggiano attorno. */
export function SectorHeroArt({ sector }: { sector: Sector }) {
  const [f1, f2] = sector.heroArt.floats;
  const Float = ({ f, className }: { f: { icon: Parameters<typeof Icon>[0]["name"]; t: string; d: string }; className: string }) => (
    <div className={`absolute z-10 hidden sm:block ${className}`}>
      <div className="flex w-[240px] items-center gap-2.5 rounded-[14px] border border-line bg-white px-3 py-2.5 shadow-[0_18px_40px_-24px_rgba(0,0,0,.3)]">
        <span className="flex h-8 w-8 flex-none items-center justify-center rounded-[9px] bg-lime text-forest">
          <Icon name={f.icon} size={15} stroke={2} />
        </span>
        <span className="min-w-0 text-[12px] leading-[1.35]">
          <span className="block font-semibold text-ink">{f.t}</span>
          <span className="block text-[#71717a]">{f.d}</span>
        </span>
      </div>
    </div>
  );
  return (
    <div className="relative overflow-visible rounded-[28px] border border-line bg-white px-5 py-10 sm:px-12 sm:py-16" style={{ backgroundImage: toneGlow[sector.tone] }}>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[28px] opacity-50"
        style={{
          backgroundImage: "radial-gradient(rgba(11,11,12,.07) 1px, transparent 1px)",
          backgroundSize: "18px 18px",
          maskImage: "linear-gradient(180deg,#000,transparent 85%)",
          WebkitMaskImage: "linear-gradient(180deg,#000,transparent 85%)",
        }}
      />
      <div className="relative flex justify-center">
        <Catalog a={sector.heroArt.main} />
      </div>
      {f1 && <Float f={f1} className="-left-6 top-6 float1" />}
      {f2 && <Float f={f2} className="-right-6 bottom-8 float2" />}
    </div>
  );
}

import Link from "next/link";
import { Icon, type IconName } from "./Icon";
import { Qr } from "./HeroArt";
import { WaLoop } from "./WaLoop";
import { Reveal } from "./Reveal";

type Theme = "forest" | "lime" | "soft" | "white";

const themes: Record<Theme, { box: string; title: string; text: string; link: string }> = {
  forest: { box: "bg-forest text-white", title: "text-white", text: "text-[#b9cfa8]", link: "text-lime" },
  lime: { box: "bg-lime", title: "text-forest", text: "text-forest/75", link: "text-forest" },
  soft: { box: "bg-lime-soft", title: "text-forest", text: "text-[#4b5a40]", link: "text-forest" },
  white: { box: "bg-white border border-line", title: "text-ink", text: "text-muted", link: "text-ink" },
};

function Tile({
  theme,
  title,
  text,
  href,
  className = "",
  children,
  artFirst = false,
  row = false,
  delay = 0,
}: {
  theme: Theme;
  title: string;
  text: string;
  href?: string;
  className?: string;
  children: React.ReactNode;
  artFirst?: boolean;
  row?: boolean;
  delay?: number;
}) {
  const t = themes[theme];
  const body = (
    <div>
      <h3 className={`text-[20px] font-semibold leading-tight tracking-[-0.025em] ${t.title}`}>{title}</h3>
      <p className={`mt-1.5 text-[14.5px] leading-snug ${t.text}`}>{text}</p>
    </div>
  );
  const more = href && (
    <span className={`mt-4 inline-flex items-center gap-1.5 text-[14px] font-medium ${t.link}`}>
      Scopri di più
      <Icon name="arrowRight" size={14} stroke={2} className="transition-transform group-hover:translate-x-0.5" />
    </span>
  );
  const inner = row ? (
    <div className="grid h-full items-center gap-6 md:grid-cols-[0.8fr_1.2fr]">
      <div className="flex flex-col">
        {body}
        {more}
      </div>
      <div className="relative flex justify-center md:justify-end">{children}</div>
    </div>
  ) : (
    <>
      {!artFirst && body}
      <div className={`relative flex flex-1 items-end ${artFirst ? "mb-5" : "mt-5"}`}>{children}</div>
      {artFirst && body}
      {more}
    </>
  );
  const cls = `group relative flex h-full flex-col overflow-hidden rounded-[22px] p-5 sm:p-6 ${t.box}`;
  return (
    <Reveal delay={delay} className={className}>
      {href ? (
        <Link href={href} className={`${cls} lift`}>
          {inner}
        </Link>
      ) : (
        <div className={cls}>{inner}</div>
      )}
    </Reveal>
  );
}

const card = "rounded-[14px] border border-line bg-white shadow-[0_18px_36px_-24px_rgba(0,0,0,.35)]";

/* Automazioni: la riga del flusso e i messaggi che partono da soli. */
function FlowLine() {
  const steps: { icon: IconName; t: string; d: string }[] = [
    { icon: "bag", t: "Ordine ritirato", d: "Giulia, 3 pizze" },
    { icon: "clock", t: "Dopo 2 giorni", d: "alle 19:40" },
    { icon: "chat", t: "Messaggio WhatsApp", d: "Grazie + sconto" },
  ];
  return (
    <ol className="relative flex flex-col gap-3">
      <svg aria-hidden className="absolute left-[17px] top-4 h-[calc(100%-32px)] w-[2px]" preserveAspectRatio="none" viewBox="0 0 2 100">
        <line x1="1" y1="0" x2="1" y2="100" stroke="#9fe870" strokeWidth="2" strokeDasharray="4 4" style={{ animation: "dash 1s linear infinite" }} vectorEffect="non-scaling-stroke" />
      </svg>
      {steps.map((s) => (
        <li key={s.t} className="relative flex items-center gap-3">
          <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-lime text-forest">
            <Icon name={s.icon} size={16} stroke={2} />
          </span>
          <span className="text-[13px] leading-tight">
            <span className="block font-semibold text-white">{s.t}</span>
            <span className="text-[#b9cfa8]">{s.d}</span>
          </span>
        </li>
      ))}
    </ol>
  );
}

function MenuQrArt() {
  return (
    <div className="flex w-full items-center justify-center gap-3 md:justify-end">
      <div className={`${card} flex-none -rotate-3 p-2.5 sm:p-3`}>
        <Qr size={92} />
        <p className="mt-2 text-center text-[11.5px] font-semibold text-ink">Tavolo 4</p>
      </div>
      <div className={`${card} min-w-0 max-w-[210px] flex-1 p-3`}>
        <p className="text-[11px] font-medium uppercase tracking-wide text-faint">Pizze rosse</p>
        {[
          ["Margherita", "7,00"],
          ["Diavola", "8,50"],
          ["Capricciosa", "9,50"],
        ].map(([n, p], i) => (
          <div key={n} className="flex items-center justify-between border-b border-line-soft py-1.5 text-[12.5px] last:border-0">
            <span className="text-ink">
              {n}
              {i === 1 && <span className="ml-1.5 rounded-full bg-p-red px-1.5 py-px text-[10px] font-medium text-p-red-ink">piccante</span>}
            </span>
            <span className="tabular-nums text-muted">€ {p}</span>
          </div>
        ))}
        <div className="mt-2 flex items-center gap-1.5 rounded-[8px] bg-lime-soft px-2 py-1 text-[11px] font-medium text-forest">
          <Icon name="chart" size={12} stroke={2} />
          128 scansioni oggi
        </div>
      </div>
    </div>
  );
}

function StatsArt() {
  const r = 34;
  const c = 2 * Math.PI * r;
  const parts = [
    { v: 0.52, col: "#163300" },
    { v: 0.3, col: "#9fe870" },
    { v: 0.18, col: "#d4d4d8" },
  ];
  let off = 0;
  return (
    <div className={`${card} flex w-full items-center gap-4 p-4`}>
      <svg width="92" height="92" viewBox="0 0 92 92" aria-hidden className="flex-none -rotate-90">
        {parts.map((p) => {
          const el = <circle key={p.col} cx="46" cy="46" r={r} fill="none" stroke={p.col} strokeWidth="12" strokeDasharray={`${p.v * c - 2} ${c}`} strokeDashoffset={-off * c} />;
          off += p.v;
          return el;
        })}
      </svg>
      <div className="min-w-0 text-[12px]">
        <p className="text-muted">Incasso settimana</p>
        <p className="text-[22px] font-semibold tracking-[-0.03em] text-ink">€ 4.280</p>
        <p className="font-medium text-[#16a34a]">+12% sulla scorsa</p>
      </div>
    </div>
  );
}

function CustomersArt() {
  const av = [
    ["GR", "#fce7f3", "#9d174d"],
    ["MB", "#dbeafe", "#1e40af"],
    ["LC", "#fef3c7", "#92400e"],
    ["AP", "#e0e7ff", "#3730a3"],
  ];
  return (
    <div className="w-full">
      <div className="flex items-center">
        {av.map(([i, bg, fg], k) => (
          <span key={i} className="-ml-2 flex h-11 w-11 items-center justify-center rounded-full border-[3px] border-forest text-[13px] font-semibold first:ml-0" style={{ background: bg, color: fg, zIndex: 10 - k }}>
            {i}
          </span>
        ))}
        <span className="-ml-2 flex h-11 items-center rounded-full border-[3px] border-forest bg-lime px-3 text-[13px] font-semibold text-forest">+1.2k</span>
      </div>
      <div className="mt-3 flex flex-wrap gap-1.5 text-[12px]">
        {["Cliente abituale", "Compleanno a giugno", "Celiaco"].map((x) => (
          <span key={x} className="rounded-full bg-white/10 px-2.5 py-1 text-[#d9e8cc]">
            {x}
          </span>
        ))}
      </div>
    </div>
  );
}

function FloorArt() {
  const t = [
    { n: 1, s: "busy" },
    { n: 2, s: "free" },
    { n: 3, s: "free", round: true },
    { n: 4, s: "res" },
    { n: 5, s: "busy", round: true },
    { n: 6, s: "free" },
  ];
  const col: Record<string, string> = { busy: "bg-forest text-lime", free: "bg-white text-forest border border-[#cfe5bd]", res: "bg-lime text-forest" };
  return (
    <div className="w-full">
      <div className="grid grid-cols-3 gap-2.5">
        {t.map((x) => (
          <span key={x.n} className={`flex h-12 items-center justify-center text-[13px] font-semibold ${col[x.s]} ${x.round ? "mx-auto w-12 rounded-full" : "rounded-[10px]"}`}>
            {x.n}
          </span>
        ))}
      </div>
      <div className="mt-3 flex gap-3 text-[11.5px] text-[#4b5a40]">
        <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-forest" />Occupato</span>
        <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-lime" />Prenotato</span>
        <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full border border-[#cfe5bd] bg-white" />Libero</span>
      </div>
    </div>
  );
}

function StaffArt() {
  const people = [
    { n: "Marco", r: "Pizzaiolo", from: 40, w: 55 },
    { n: "Sara", r: "Sala", from: 50, w: 45 },
    { n: "Luca", r: "Consegne", from: 62, w: 30 },
  ];
  return (
    <div className="w-full space-y-2">
      {people.map((p) => (
        <div key={p.n} className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-white text-[11.5px] font-semibold text-forest">{p.n.slice(0, 2)}</span>
          <span className="relative h-8 flex-1 rounded-[9px] bg-white/45">
            <span className="absolute inset-y-1 flex items-center rounded-[7px] bg-forest px-2 text-[10.5px] font-medium text-lime" style={{ left: `${p.from}%`, width: `${p.w}%` }}>
              {p.r}
            </span>
          </span>
        </div>
      ))}
    </div>
  );
}

function ClosuresArt() {
  const closed = [7, 14, 21, 28];
  const holiday = [16, 17, 18, 19, 20];
  return (
    <div className={`${card} w-full p-3.5`}>
      <div className="mb-2 flex items-center justify-between text-[12px]">
        <span className="font-semibold text-ink">Agosto</span>
        <span className="rounded-full bg-p-amber px-2 py-0.5 text-[10.5px] font-medium text-p-amber-ink">Ferie 16 a 20</span>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-[10.5px] tabular-nums">
        {Array.from({ length: 28 }, (_, i) => i + 1).map((d) => (
          <span
            key={d}
            className={`rounded-[5px] py-1 ${
              holiday.includes(d) ? "bg-forest text-lime" : closed.includes(d) ? "bg-mist text-faint line-through" : "text-text"
            }`}
          >
            {d}
          </span>
        ))}
      </div>
    </div>
  );
}

export function Bento() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      <Tile delay={0}
        theme="forest"
        title="Messaggi che partono da soli"
        text="Ringraziamenti, promemoria e auguri di compleanno, dal tuo numero WhatsApp."
        href="/funzionalita/automazioni-whatsapp/"
        className="sm:col-span-2 lg:col-span-1 lg:row-span-2"
      >
        <div className="grid w-full gap-5 sm:grid-cols-2 lg:grid-cols-1">
          <FlowLine />
          <div className="rounded-[16px] bg-[#0f2400] p-3 [background-image:radial-gradient(rgba(159,232,112,.08)_1px,transparent_1px)] [background-size:14px_14px]">
            <WaLoop />
          </div>
        </div>
      </Tile>

      <Tile delay={90}
        theme="soft"
        title="Menu digitale e QR"
        text="Un QR per ogni tavolo. Cambi un prezzo e si aggiorna subito, senza ristampare."
        href="/funzionalita/menu-digitale/"
        className="sm:col-span-2"
        row
      >
        <MenuQrArt />
      </Tile>

      <Tile delay={90} theme="white" title="Statistiche" text="Cosa vendi di più, quando e a chi." href="/funzionalita/statistiche/" artFirst>
        <StatsArt />
      </Tile>

      <Tile delay={180} theme="forest" title="Clienti" text="Una rubrica che si riempie da sola, con gusti e allergie." href="/funzionalita/clienti/">
        <CustomersArt />
      </Tile>

      <Tile delay={0} theme="soft" title="Sala e tavoli" text="La pianta del locale con i tavoli liberi e occupati." href="/funzionalita/sala-e-tavoli/" artFirst>
        <FloorArt />
      </Tile>

      <Tile delay={90} theme="lime" title="Staff e turni" text="Chi lavora, quando e in che ruolo." href="/funzionalita/staff-e-turni/" artFirst>
        <StaffArt />
      </Tile>

      <Tile delay={180} theme="white" title="Ferie e chiusure" text="Programmi i giorni chiusi e il sito lo dice da solo." href="/funzionalita/ferie-e-chiusure/" artFirst className="sm:col-span-2 lg:col-span-1">
        <ClosuresArt />
      </Tile>
    </div>
  );
}

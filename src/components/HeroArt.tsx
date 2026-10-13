import { price, tr } from "@/i18n";
import type { Feature } from "@/content/features";
import { Icon, type IconName } from "./Icon";
import { toneGlow } from "./StaticArt";
import { AppWindow, PhoneFrame } from "./visuals/frames";

/* ---------- Pezzi comuni ---------- */

function Scene({ feature, children }: { feature: Feature; children: React.ReactNode }) {
  return (
    <div
      className="relative overflow-hidden rounded-[24px] border border-line px-4 py-8 sm:px-8 sm:py-16"
      style={{ backgroundImage: toneGlow[feature.tone], backgroundColor: "#fbfbf9" }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage: "radial-gradient(rgba(11,11,12,.07) 1px, transparent 1px)",
          backgroundSize: "18px 18px",
          maskImage: "linear-gradient(180deg,#000,transparent 80%)",
          WebkitMaskImage: "linear-gradient(180deg,#000,transparent 80%)",
        }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}

function Float({ className = "", icon, tone = "dark", title, text }: { className?: string; icon: IconName; tone?: "dark" | "green" | "blue" | "pink" | "amber"; title: string; text?: string }) {
  const tones = {
    dark: "bg-ink text-white",
    green: "bg-p-green text-p-green-ink",
    blue: "bg-p-blue text-p-blue-ink",
    pink: "bg-p-pink text-p-pink-ink",
    amber: "bg-p-amber text-p-amber-ink",
  };
  return (
    <div className={`z-20 flex max-w-[240px] items-center gap-2.5 rounded-[14px] border border-line bg-white px-3 py-2.5 shadow-[0_18px_40px_-22px_rgba(0,0,0,.35)] ${className}`}>
      <span className={`flex h-8 w-8 flex-none items-center justify-center rounded-[9px] ${tones[tone]}`}>
        <Icon name={icon} size={15} stroke={2} />
      </span>
      <span className="min-w-0 text-[12px] leading-[1.35]">
        <span className="block font-semibold text-ink">{title}</span>
        {text && <span className="block text-[#71717a]">{text}</span>}
      </span>
    </div>
  );
}

function Pill({ children, on = false }: { children: React.ReactNode; on?: boolean }) {
  return <span className={`rounded-full px-2.5 py-1 text-[11.5px] font-medium ${on ? "bg-ink text-white" : "border border-line bg-white text-muted"}`}>{children}</span>;
}

function Sw({ on = true }: { on?: boolean }) {
  return <span data-on={on} className="toggle toggle-sm flex-none" />;
}

/** Codice QR disegnato: sempre uguale, solo decorativo. */
export function Qr({ size = 120 }: { size?: number }) {
  const n = 25;
  const cells: [number, number][] = [];
  let seed = 7;
  const rnd = () => ((seed = (seed * 9301 + 49297) % 233280) / 233280);
  const finder = (x: number, y: number) =>
    (x < 7 && y < 7) || (x >= n - 7 && y < 7) || (x < 7 && y >= n - 7);
  for (let y = 0; y < n; y++)
    for (let x = 0; x < n; x++) {
      if (finder(x, y)) continue;
      if (rnd() > 0.52) cells.push([x, y]);
    }
  const eye = (x: number, y: number) => (
    <g key={`${x}-${y}`}>
      <rect x={x} y={y} width="7" height="7" rx="1.6" fill="#0b0b0c" />
      <rect x={x + 1} y={y + 1} width="5" height="5" rx="1.1" fill="#fff" />
      <rect x={x + 2} y={y + 2} width="3" height="3" rx=".8" fill="#0b0b0c" />
    </g>
  );
  return (
    <svg width={size} height={size} viewBox={`0 0 ${n} ${n}`} aria-hidden shapeRendering="crispEdges">
      <rect width={n} height={n} fill="#fff" />
      {cells.map(([x, y]) => (
        <rect key={`${x}.${y}`} x={x} y={y} width="1" height="1" fill="#0b0b0c" />
      ))}
      {eye(0, 0)}
      {eye(n - 7, 0)}
      {eye(0, n - 7)}
    </svg>
  );
}

const flag: Record<string, string> = {
  it: "linear-gradient(90deg,#009246 33.3%,#fff 33.3% 66.6%,#ce2b37 66.6%)",
  en: "linear-gradient(#c8102e,#c8102e) center/100% 20% no-repeat,linear-gradient(#c8102e,#c8102e) center/16% 100% no-repeat,linear-gradient(#fff,#fff) center/100% 40% no-repeat,linear-gradient(#fff,#fff) center/32% 100% no-repeat,#012169",
  fr: "linear-gradient(90deg,#0055a4 33.3%,#fff 33.3% 66.6%,#ef4135 66.6%)",
  de: "linear-gradient(180deg,#000 33.3%,#dd0000 33.3% 66.6%,#ffce00 66.6%)",
  es: "linear-gradient(180deg,#aa151b 25%,#f1bf00 25% 75%,#aa151b 75%)",
};
const Flag = ({ c }: { c: string }) => <span className="h-3.5 w-5 flex-none rounded-[3px] shadow-[0_0_0_1px_rgba(0,0,0,.08)]" style={{ background: flag[c] }} />;

/* ---------- Le scene, una per funzionalità ---------- */

function MenuDigitale({ f }: { f: Feature }) {
  return (
    <Scene feature={f}>
      <AppWindow title={tr("Codice QR")}>
        <div className="grid gap-4 p-4 sm:grid-cols-[1fr_auto] sm:p-5">
          <div className="min-w-0">
            <p className="text-[14px] font-semibold text-ink">{tr("Stampa il QR del menu")}</p>
            <p className="mt-0.5 text-[12px] text-muted">{tr("Il codice non cambia mai, anche se cambi i piatti.")}</p>
            <p className="mb-1.5 mt-4 text-[11.5px] font-medium text-ink">{tr("Formato")}</p>
            <div className="flex flex-wrap gap-1.5">
              <Pill on>{tr("Segnatavolo")}</Pill>
              <Pill>{tr("Vetrina A4")}</Pill>
              <Pill>{tr("Adesivo")}</Pill>
            </div>
            <div className="mt-4 space-y-2.5 text-[12.5px] text-text">
              <div className="flex items-center justify-between">
                {tr("Logo del locale al centro")}{" "}<Sw />
              </div>
              <div className="flex items-center justify-between">
                {tr("Numero del tavolo")}{" "}<Sw />
              </div>
              <div className="flex items-center justify-between">
                {tr("Testo \"Inquadra per il menu\"")}{" "}<Sw />
              </div>
            </div>
            <span className="mt-4 flex h-9 w-full items-center justify-center gap-2 rounded-[10px] bg-ink text-[12.5px] font-medium text-white">
              <Icon name="arrowRight" size={13} stroke={2} className="rotate-90" />
              {tr("Scarica PDF per la stampa")}
            </span>
          </div>
          <div className="mx-auto w-[170px] rounded-[14px] border border-line bg-[#fbfbf9] p-3 text-center shadow-[0_20px_40px_-28px_rgba(0,0,0,.4)]">
            <p className="text-[13px] font-semibold text-ink">{tr("Pizzeria Fiore")}</p>
            <p className="text-[10.5px] text-muted">{tr("Tavolo 7")}</p>
            <div className="mx-auto mt-2 w-fit rounded-[8px] bg-white p-1.5 shadow-[0_0_0_1px_#e7e7e4]">
              <Qr size={118} />
            </div>
            <p className="mt-2 text-[11px] font-medium text-ink">{tr("Inquadra per il menu")}</p>
            <p className="text-[9.5px] text-muted">{tr("Menu in 5 lingue")}</p>
          </div>
        </div>
      </AppWindow>
      <Float className="mt-3 sm:absolute sm:-bottom-11 sm:-left-2 sm:mt-0" icon="check" tone="green" title={tr("Aggiornato su tutti i tavoli")} text={tr("Diavola: nuovo prezzo 9,00 €")} />
    </Scene>
  );
}

function ImportaAi({ f }: { f: Feature }) {
  const cats = [
    [tr("Antipasti"), 8],
    [tr("Pizze classiche"), 16],
    [tr("Pizze speciali"), 11],
    [tr("Fritti"), 6],
    [tr("Dolci"), 5],
    [tr("Bevande"), 12],
  ] as const;
  return (
    <Scene feature={f}>
      <AppWindow title={tr("Importa menu")}>
        <div className="grid gap-4 p-4 sm:grid-cols-[150px_1fr] sm:p-5">
          <div>
            <div className="relative rotate-[-2deg] rounded-[8px] bg-[#fffdf7] p-3 shadow-[0_14px_30px_-18px_rgba(0,0,0,.45)]">
              <p className="text-center font-serif text-[12px] italic text-[#3b2f2f]">{tr("Pizzeria Fiore")}</p>
              {[70, 55, 80, 60, 75, 50, 65].map((w, i) => (
                <span key={i} className="mt-1.5 flex items-center gap-1.5">
                  <span className="h-[4px] rounded-full bg-[#cbbba6]" style={{ width: `${w}%` }} />
                  <span className="ml-auto h-[4px] w-4 rounded-full bg-[#cbbba6]" />
                </span>
              ))}
            </div>
            <p className="mt-3 flex items-center gap-1.5 text-[11.5px] text-muted">
              <Icon name="check" size={12} stroke={2.6} className="text-[#16a34a]" />
              {tr("menu_pizzeria.jpg, 2 pagine")}
            </p>
          </div>
          <div className="min-w-0">
            <div className="flex items-center justify-between">
              <p className="text-[14px] font-semibold text-ink">{tr("Lettura completata")}</p>
              <span className="rounded-full bg-p-green px-2 py-0.5 text-[11px] font-medium text-p-green-ink">{tr("58 piatti")}</span>
            </div>
            <div className="mt-2 h-1.5 rounded-full bg-mist">
              <span className="block h-full w-full rounded-full bg-[#16a34a]" />
            </div>
            <ul className="mt-3 grid grid-cols-2 gap-1.5">
              {cats.map(([c, n]) => (
                <li key={c} className="flex items-center justify-between rounded-[9px] border border-line-soft bg-[#fbfbf9] px-2.5 py-2 text-[12px]">
                  <span className="truncate text-ink">{c}</span>
                  <span className="tabular-nums text-muted">{n}</span>
                </li>
              ))}
            </ul>
            <div className="mt-3 flex items-center gap-2 rounded-[10px] bg-p-amber px-3 py-2 text-[12px] text-p-amber-ink">
              <Icon name="sparkle" size={13} />{tr("2 prezzi da controllare")}
            </div>
          </div>
        </div>
      </AppWindow>
      <Float className="mt-3 sm:absolute sm:-right-2 sm:-top-11 sm:mt-0" icon="sparkle" tone="green" title={tr("Allergeni proposti")} text={tr("Dagli ingredienti, da confermare")} />
    </Scene>
  );
}

function Traduzioni({ f }: { f: Feature }) {
  const rows = [
    ["en", tr("Inglese"), true, "58/58"],
    ["fr", tr("Francese"), true, "58/58"],
    ["de", tr("Tedesco"), true, "58/58"],
    ["es", tr("Spagnolo"), false, tr("Non attiva")],
  ] as const;
  return (
    <Scene feature={f}>
      <AppWindow title={tr("Lingue del menu")}>
        <div className="p-4 sm:p-5">
          <div className="flex items-center gap-2.5 rounded-[12px] bg-mist px-3 py-2.5">
            <Flag c="it" />
            <span className="flex-1 text-[13px] font-medium text-ink">{tr("Italiano")}</span>
            <span className="text-[11.5px] text-muted">{tr("Lingua principale")}</span>
          </div>
          <ul className="mt-2">
            {rows.map(([c, n, on, s]) => (
              <li key={c} className="flex items-center gap-2.5 border-b border-line-soft px-3 py-3 last:border-0">
                <Flag c={c} />
                <span className="flex-1 text-[13px] text-ink">{n}</span>
                <span className={`text-[11.5px] tabular-nums ${on ? "text-p-green-ink" : "text-faint"}`}>{s}</span>
                <Sw on={on} />
              </li>
            ))}
          </ul>
          <div className="mt-3 rounded-[12px] border border-line p-3">
            <p className="text-[11px] text-muted">{tr("Anteprima, inglese")}</p>
            <p className="mt-0.5 text-[13.5px] font-semibold text-ink">{tr("Tonnarelli cacio e pepe")}</p>
            <p className="text-[12px] leading-snug text-muted">{tr("Fresh square spaghetti with Pecorino Romano and black pepper.")}</p>
          </div>
        </div>
      </AppWindow>
      <Float className="mt-3 sm:absolute sm:-bottom-11 sm:-right-2 sm:mt-0" icon="globe" tone="blue" title={tr("Si apre nella lingua del telefono")} text={tr("Il turista non deve fare nulla")} />
    </Scene>
  );
}

function MenuOrari({ f }: { f: Feature }) {
  const rows = [
    [tr("Colazione"), "7:00 - 11:00", tr("Lun - Sab"), "bg-p-amber text-p-amber-ink"],
    [tr("Pranzo"), "12:00 - 15:00", tr("Tutti i giorni"), "bg-p-green text-p-green-ink"],
    [tr("Aperitivo"), "18:00 - 20:30", tr("Gio - Dom"), "bg-p-orange text-p-orange-ink"],
    [tr("Cena"), "19:30 - 23:30", tr("Tutti i giorni"), "bg-p-violet text-p-violet-ink"],
  ];
  return (
    <Scene feature={f}>
      <AppWindow title={tr("Menu a orari")}>
        <div className="p-4 sm:p-5">
          <div className="flex items-center justify-between">
            <p className="text-[14px] font-semibold text-ink">{tr("I tuoi menu")}</p>
            <span className="flex items-center gap-1.5 text-[11.5px] text-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-ios" />
              {tr("Ora attivo: Aperitivo")}
            </span>
          </div>
          <ul className="mt-3 flex flex-col gap-2">
            {rows.map(([n, t, d, c], i) => (
              <li key={n} className={`flex items-center gap-3 rounded-[12px] border px-3 py-2.5 ${i === 2 ? "border-ink bg-white" : "border-line-soft bg-[#fbfbf9]"}`}>
                <span className={`rounded-[8px] px-2 py-1 text-[11.5px] font-medium ${c}`}>{n}</span>
                <span className="flex-1 text-[12.5px] tabular-nums text-ink">{t}</span>
                <span className="hidden text-[11.5px] text-muted sm:block">{d}</span>
                <Sw />
              </li>
            ))}
          </ul>
          <div className="mt-3 flex items-center gap-2 rounded-[10px] border border-dashed border-line px-3 py-2.5 text-[12px] text-muted">
            <Icon name="plus" size={13} stroke={2.2} />
            {tr("Menu speciale per una data: Capodanno, 31 dicembre")}
          </div>
        </div>
      </AppWindow>
      <Float className="mt-3 sm:absolute sm:-right-2 sm:-top-11 sm:mt-0" icon="clock" tone="amber" title={tr("Cambia da solo")} text={tr("Alle 18:00 parte l'aperitivo")} />
    </Scene>
  );
}

function Prenotazioni({ f }: { f: Feature }) {
  const rows = [
    ["19:30", tr("Ferrari"), "2", tr("Confermata"), "g"],
    ["20:00", tr("Bianchi"), "5", tr("Confermata"), "g"],
    ["20:30", tr("Giulia Rossi"), tr("4 + seggiolino"), tr("Nuova"), "p"],
    ["21:00", tr("Conti"), "6", tr("Confermata"), "g"],
    ["21:30", tr("Marino"), "2", tr("In attesa"), "a"],
  ];
  const tag = { g: "bg-p-green text-p-green-ink", p: "bg-p-pink text-p-pink-ink", a: "bg-p-amber text-p-amber-ink" } as Record<string, string>;
  return (
    <Scene feature={f}>
      <AppWindow title={tr("Prenotazioni")}>
        <div className="p-4 sm:p-5">
          <div className="flex gap-1.5">
            {[tr("Ven 16"), tr("Sab 17"), tr("Dom 18"), tr("Lun 19")].map((d, i) => (
              <span key={d} className={`flex h-11 flex-1 flex-col items-center justify-center rounded-[10px] text-[10.5px] ${i === 1 ? "bg-ink text-white" : "border border-line-soft bg-white text-muted"}`}>
                {d.split(" ")[0]}
                <span className={`text-[14px] font-semibold ${i === 1 ? "text-white" : "text-ink"}`}>{d.split(" ")[1]}</span>
              </span>
            ))}
          </div>
          <div className="mt-3 flex items-center justify-between text-[11.5px] text-muted">
            <span>{tr("Sabato, cena")}</span>
            <span className="tabular-nums">{tr("48 coperti su 60")}</span>
          </div>
          <ul className="mt-2 overflow-hidden rounded-[12px] border border-line-soft bg-white">
            {rows.map(([t, n, p, s, k]) => (
              <li key={t} className="flex items-center gap-3 border-b border-line-soft px-3 py-2.5 text-[12.5px] last:border-0">
                <span className="w-10 font-medium tabular-nums text-ink">{t}</span>
                <span className="min-w-0 flex-1 truncate text-ink">{n}</span>
                <span className="hidden text-muted sm:block">{p}</span>
                <span className={`rounded-full px-2 py-0.5 text-[11px] ${tag[k]}`}>{s}</span>
              </li>
            ))}
          </ul>
        </div>
      </AppWindow>
      <Float className="mt-3 sm:absolute sm:-bottom-11 sm:-left-2 sm:mt-0" icon="chat" tone="green" title={tr("Conferma inviata su WhatsApp")} text={tr("Giulia Rossi, sabato alle 20:30")} />
    </Scene>
  );
}

function Sala({ f }: { f: Feature }) {
  const t = [
    [6, 8, 18, 24, tr("Ferrari"), "v"],
    [30, 8, 18, 24, "", "f"],
    [54, 8, 18, 24, tr("Bianchi"), "v"],
    [78, 6, 16, 28, "21:00", "p", true],
    [6, 46, 30, 22, tr("Conti"), "v"],
    [42, 46, 16, 22, "", "f"],
    [64, 46, 30, 22, tr("Rossi 20:30"), "p"],
    [6, 78, 16, 18, "", "f", true],
    [28, 78, 16, 18, tr("Conto"), "a", true],
  ] as const;
  const st: Record<string, string> = {
    v: "bg-p-violet text-p-violet-ink border-[#c7d2fe]",
    f: "bg-white text-muted border-line",
    p: "bg-p-pink text-p-pink-ink border-[#fbcfe8]",
    a: "bg-p-amber text-p-amber-ink border-[#fde68a]",
  };
  return (
    <Scene feature={f}>
      <AppWindow title={tr("Sala interna")}>
        <div className="relative h-[300px] bg-[radial-gradient(#e5e5e2_1px,transparent_1px)] [background-size:16px_16px] sm:h-[340px]">
          {t.map(([x, y, w, h, l, s, r], i) => (
            <span
              key={i}
              className={`absolute flex flex-col items-center justify-center border text-center text-[10.5px] ${st[s]} ${r ? "rounded-full" : "rounded-[10px]"}`}
              style={{ left: `${x}%`, top: `${y}%`, width: `${w}%`, height: `${h}%` }}
            >
              <span className="font-semibold">{i + 1}</span>
              {l && <span className="max-w-full truncate px-1 text-[9.5px]">{l}</span>}
            </span>
          ))}
          <div className="absolute bottom-3 right-3 flex flex-wrap gap-2 rounded-[10px] bg-white/90 px-2.5 py-1.5 text-[10.5px] text-muted shadow-sm">
            <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-[3px] bg-p-violet" />{tr("Seduti")}</span>
            <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-[3px] bg-p-pink" />{tr("Prenotati")}</span>
            <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-[3px] bg-p-amber" />{tr("Al conto")}</span>
          </div>
        </div>
      </AppWindow>
      <Float className="mt-3 sm:absolute sm:-right-2 sm:-top-11 sm:mt-0" icon="tables" tone="blue" title={tr("3 tavoli liberi ora")} text={tr("Il 2, il 6 e l'8")} />
    </Scene>
  );
}

function Chiusure({ f }: { f: Feature }) {
  const days = Array.from({ length: 30 }, (_, i) => i + 1);
  return (
    <Scene feature={f}>
      <AppWindow title={tr("Orari e chiusure")}>
        <div className="grid gap-4 p-4 sm:grid-cols-[1fr_1fr] sm:p-5">
          <div>
            <p className="text-[13px] font-semibold text-ink">{tr("Novembre")}</p>
            <div className="mt-2 grid grid-cols-7 gap-1 text-center text-[10px] text-faint">
              {["L", "M", "M", "G", "V", "S", "D"].map((d, i) => (
                <span key={i}>{d}</span>
              ))}
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={`e${i}`} />
              ))}
              {days.map((d) => (
                <span
                  key={d}
                  className={`flex aspect-square items-center justify-center rounded-[6px] text-[10.5px] tabular-nums ${
                    d >= 3 && d <= 9 ? "bg-p-amber font-medium text-p-amber-ink" : d === 23 ? "bg-ink text-white" : "text-text"
                  }`}
                >
                  {d}
                </span>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            {[
              [tr("Ferie"), tr("Dal 3 al 9 novembre"), "bg-p-amber text-p-amber-ink"],
              [tr("Chiusura straordinaria"), tr("Domenica 23, solo cena"), "bg-ink text-white"],
              [tr("Riposo settimanale"), tr("Ogni lunedì"), "bg-mist text-text"],
            ].map(([t, d, c]) => (
              <div key={t} className="rounded-[12px] border border-line-soft bg-white p-2.5">
                <span className={`rounded-[6px] px-1.5 py-0.5 text-[10.5px] font-medium ${c}`}>{t}</span>
                <p className="mt-1.5 text-[12.5px] text-ink">{d}</p>
              </div>
            ))}
            <div className="flex items-center justify-between rounded-[12px] bg-mist px-3 py-2.5 text-[12px] text-ink">
              {tr("Avvisa i clienti")}{" "}<Sw />
            </div>
          </div>
        </div>
      </AppWindow>
      <Float className="mt-3 sm:absolute sm:-bottom-11 sm:-left-2 sm:mt-0" icon="calendarX" tone="amber" title={tr("Prenotazioni e ordini in pausa")} text={tr("Ripartono da soli il 10 novembre")} />
    </Scene>
  );
}

function Ordini({ f }: { f: Feature }) {
  const cols = [
    [tr("Nuovi"), [["19:45", tr("Andrea M."), tr("3 pizze, 1 fritto"), price("27,50 €")]], "bg-p-green text-p-green-ink"],
    [tr("In preparazione"), [["19:30", tr("Lucia B."), tr("2 pizze"), price("18,50 €")], ["19:30", tr("Greco"), tr("4 pizze, 2 birre"), price("39,00 €")]], "bg-p-amber text-p-amber-ink"],
    [tr("Pronti"), [["19:15", tr("Paolo R."), tr("1 Diavola"), price("8,50 €")]], "bg-mist text-text"],
  ] as const;
  return (
    <Scene feature={f}>
      <AppWindow title={tr("Ordini da asporto")}>
        <div className="p-4 sm:p-5">
          <div className="flex items-center justify-between">
            <p className="text-[14px] font-semibold text-ink">{tr("Stasera")}</p>
            <span className="flex items-center gap-2 text-[11.5px] text-muted">
              {tr("Accetta ordini")}{" "}<Sw />
            </span>
          </div>
          <div className="mt-3 grid gap-2 sm:grid-cols-3">
            {cols.map(([t, list, c]) => (
              <div key={t} className="rounded-[12px] bg-[#f6f6f3] p-2">
                <span className={`rounded-[6px] px-1.5 py-0.5 text-[10.5px] font-medium ${c}`}>
                  {t} {list.length}
                </span>
                <div className="mt-2 flex flex-col gap-1.5">
                  {list.map(([h, n, i, p]) => (
                    <div key={n} className="rounded-[10px] border border-line-soft bg-white p-2 text-[11.5px]">
                      <div className="flex justify-between font-medium text-ink">
                        <span>{n}</span>
                        <span className="tabular-nums">{h}</span>
                      </div>
                      <p className="mt-0.5 text-muted">{i}</p>
                      <p className="mt-1 font-medium tabular-nums text-ink">{p}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </AppWindow>
      <Float className="mt-3 sm:absolute sm:-right-2 sm:-top-11 sm:mt-0" icon="chat" tone="green" title={tr("Nuovo ordine su WhatsApp")} text={tr("Ritiro alle 19:45, 27,50 €")} />
    </Scene>
  );
}

function Clienti({ f }: { f: Feature }) {
  const rows = [
    ["GR", tr("Giulia Rossi"), "14", tr("12 ott"), tr("Abituale"), "bg-p-violet text-p-violet-ink"],
    ["MF", tr("Marco Ferri"), "9", tr("8 ott"), tr("Compleanno"), "bg-p-amber text-p-amber-ink"],
    ["LB", tr("Lucia Bianchi"), "6", tr("2 ott"), tr("Asporto"), "bg-p-green text-p-green-ink"],
    ["AC", tr("Andrea Conti"), "3", tr("21 ago"), tr("Da richiamare"), "bg-p-pink text-p-pink-ink"],
  ];
  return (
    <Scene feature={f}>
      <AppWindow title={tr("Clienti")}>
        <div className="p-4 sm:p-5">
          <div className="flex items-center gap-2 rounded-[10px] border border-line bg-white px-3 py-2 text-[12px] text-faint">
            <Icon name="search" size={13} />
            {tr("Cerca per nome o telefono")}
          </div>
          <div className="mt-3 grid grid-cols-[1.6fr_0.6fr_0.8fr_1fr] gap-2 px-2 text-[10.5px] text-muted max-sm:grid-cols-[1.6fr_0.6fr_1fr]">
            <span>{tr("Cliente")}</span>
            <span>{tr("Visite")}</span>
            <span className="max-sm:hidden">{tr("Ultima")}</span>
            <span>{tr("Etichetta")}</span>
          </div>
          <ul className="mt-1">
            {rows.map(([a, n, v, u, t, c]) => (
              <li key={n} className="grid grid-cols-[1.6fr_0.6fr_0.8fr_1fr] items-center gap-2 border-b border-line-soft px-2 py-2.5 text-[12px] last:border-0 max-sm:grid-cols-[1.6fr_0.6fr_1fr]">
                <span className="flex min-w-0 items-center gap-2">
                  <span className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-mist text-[9.5px] font-semibold text-ink">{a}</span>
                  <span className="truncate text-ink">{n}</span>
                </span>
                <span className="tabular-nums text-ink">{v}</span>
                <span className="text-muted max-sm:hidden">{u}</span>
                <span className={`w-fit rounded-full px-2 py-0.5 text-[10.5px] ${c}`}>{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </AppWindow>
      <Float className="mt-3 sm:absolute sm:-bottom-11 sm:-right-2 sm:mt-0" icon="star" tone="amber" title={tr("Giulia torna sabato")} text={tr("Tavolo 7, niente frutta a guscio")} />
    </Scene>
  );
}

function Automazioni({ f }: { f: Feature }) {
  return (
    <Scene feature={f}>
      <div className="mx-auto flex max-w-[420px] flex-col items-stretch">
        <div className="rounded-[14px] border border-line bg-white p-3.5 shadow-[0_14px_30px_-22px_rgba(0,0,0,.35)]">
          <span className="rounded-[6px] bg-p-blue px-1.5 py-0.5 text-[10.5px] font-medium text-p-blue-ink">{tr("Quando")}</span>
          <p className="mt-1.5 text-[13px] font-medium text-ink">{tr("Il giorno prima della prenotazione, alle 11:00")}</p>
        </div>
        <span className="mx-auto h-6 w-px bg-line" />
        <div className="rounded-[14px] border border-line bg-white p-3.5 shadow-[0_14px_30px_-22px_rgba(0,0,0,.35)]">
          <span className="rounded-[6px] bg-p-green px-1.5 py-0.5 text-[10.5px] font-medium text-p-green-ink">{tr("Invia su WhatsApp")}</span>
          <div className="mt-2 rounded-[10px] bg-[#efeae2] p-2.5">
            <p className="rounded-[10px] rounded-tl-[3px] bg-white p-2 text-[12px] leading-snug text-ink shadow-sm">
              {tr("Ciao")}{" "}{"{nome}"}{tr(", ti ricordiamo il tavolo di domani alle")}{" "}{"{ora}"}{" "}{tr("per")}{" "}{"{persone}"}{tr(". Confermi?")}
            </p>
            <div className="mt-1.5 flex gap-1.5">
              <span className="rounded-[8px] bg-white px-2 py-1 text-[11px] font-medium text-[#0a7cff] shadow-sm">{tr("Confermo")}</span>
              <span className="rounded-[8px] bg-white px-2 py-1 text-[11px] font-medium text-[#0a7cff] shadow-sm">{tr("Annulla")}</span>
            </div>
          </div>
        </div>
        <span className="mx-auto h-6 w-px bg-line" />
        <div className="grid grid-cols-3 gap-2">
          {[
            ["128", tr("Inviati")],
            ["96", tr("Confermati")],
            ["11", tr("Annullati")],
          ].map(([v, l]) => (
            <div key={l} className="rounded-[12px] border border-line bg-white px-3 py-2.5 text-center">
              <p className="text-[18px] font-semibold tabular-nums tracking-[-0.02em] text-ink">{v}</p>
              <p className="text-[11px] text-muted">{l}</p>
            </div>
          ))}
        </div>
      </div>
      <Float className="mt-3 sm:absolute sm:-right-2 sm:-top-11 sm:mt-0" icon="chat" tone="pink" title={tr("Dal numero del tuo locale")} text={tr("I clienti vedono il tuo nome")} />
    </Scene>
  );
}

function Statistiche({ f }: { f: Feature }) {
  const pts = [22, 30, 26, 38, 34, 52, 47, 60, 55, 72, 68, 84];
  const max = 90;
  const w = 300;
  const h = 110;
  const path = pts.map((p, i) => `${i === 0 ? "M" : "L"}${(i / (pts.length - 1)) * w},${h - (p / max) * h}`).join(" ");
  return (
    <Scene feature={f}>
      <AppWindow title={tr("Statistiche")}>
        <div className="p-4 sm:p-5">
          <div className="grid grid-cols-3 gap-2">
            {[
              [tr("Visite al menu"), "2.418", "+18%"],
              [tr("Ordini"), "312", "+9%"],
              [tr("Coperti"), "1.240", "+12%"],
            ].map(([l, v, d]) => (
              <div key={l} className="rounded-[12px] border border-line-soft bg-[#fbfbf9] p-2.5">
                <p className="truncate text-[10.5px] text-muted">{l}</p>
                <p className="mt-0.5 text-[17px] font-semibold tabular-nums tracking-[-0.02em] text-ink">{v}</p>
                <p className="text-[10.5px] font-medium text-p-green-ink">{d}</p>
              </div>
            ))}
          </div>
          <div className="mt-3 rounded-[12px] border border-line-soft bg-white p-3">
            <p className="text-[11.5px] text-muted">{tr("Ordini, ultime 12 settimane")}</p>
            <svg viewBox={`0 0 ${w} ${h + 6}`} className="mt-2 h-auto w-full" aria-hidden>
              {[0.25, 0.5, 0.75].map((g) => (
                <line key={g} x1="0" x2={w} y1={h * g} y2={h * g} stroke="#efefec" />
              ))}
              <path d={`${path} L${w},${h} L0,${h} Z`} fill="rgba(55,48,163,.08)" />
              <path d={path} fill="none" stroke="#3730a3" strokeWidth="2.2" strokeLinejoin="round" />
              <circle cx={w} cy={h - (pts[pts.length - 1] / max) * h} r="4" fill="#3730a3" />
            </svg>
          </div>
        </div>
      </AppWindow>
      <Float className="mt-3 sm:absolute sm:-bottom-11 sm:-left-2 sm:mt-0" icon="chart" tone="blue" title={tr("Piatto più ordinato")} text={tr("Margherita, 132 volte questo mese")} />
    </Scene>
  );
}

function Staff({ f }: { f: Feature }) {
  const ppl = [
    ["MF", tr("Marco"), tr("Titolare"), tr("Tutto")],
    ["SR", tr("Sara"), "Sala", tr("Prenotazioni, sala")],
    ["LC", tr("Luca"), tr("Cucina"), tr("Menu ed esauriti")],
    ["AB", tr("Anna"), "Sala", tr("Prenotazioni")],
  ];
  return (
    <Scene feature={f}>
      <AppWindow title={tr("Staff")}>
        <div className="p-4 sm:p-5">
          <div className="flex items-center justify-between">
            <p className="text-[14px] font-semibold text-ink">{tr("Il tuo team")}</p>
            <span className="flex h-8 items-center gap-1.5 rounded-[9px] bg-ink px-2.5 text-[11.5px] font-medium text-white">
              <Icon name="plus" size={12} stroke={2.4} />
              {tr("Invita")}
            </span>
          </div>
          <ul className="mt-3">
            {ppl.map(([a, n, r, p]) => (
              <li key={n} className="flex items-center gap-3 border-b border-line-soft py-2.5 last:border-0">
                <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-mist text-[11px] font-semibold text-ink">{a}</span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[12.5px] font-medium text-ink">{n}</span>
                  <span className="block truncate text-[11px] text-muted">{tr("Può gestire:")}{" "}{p}</span>
                </span>
                <span className="rounded-full border border-line px-2 py-0.5 text-[10.5px] text-muted">{r}</span>
              </li>
            ))}
          </ul>
        </div>
      </AppWindow>
      <Float className="mt-3 sm:absolute sm:-right-2 sm:-top-11 sm:mt-0" icon="clock" tone="pink" title={tr("Turno di Sara")} text={tr("Sabato 18:00 - 24:00, sala")} />
    </Scene>
  );
}

function Assistente({ f }: { f: Feature }) {
  return (
    <Scene feature={f}>
      <div className="flex justify-center">
        <PhoneFrame width={290} zoom={0.86}>
          <div className="flex h-[520px] flex-col bg-[#d5e3ee]">
            <div className="flex items-center gap-2.5 bg-white/90 px-3 py-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink text-white">
                <Icon name="sparkle" size={16} />
              </span>
              <span>
                <span className="block text-[13px] font-semibold text-ink">{tr("Assistente del locale")}</span>
                <span className="block text-[10.5px] text-[#3a8ee6]">{tr("bot")}</span>
              </span>
            </div>
            <div className="flex flex-1 flex-col justify-end gap-2 p-3">
              <div className="flex items-center gap-2 self-end rounded-[16px] rounded-br-[4px] bg-[#e1fec6] px-3 py-2 shadow-sm">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#4fae4e] text-white">
                  <Icon name="play" size={12} stroke={0} className="fill-white" />
                </span>
                <span className="flex h-5 items-center gap-[2px]">
                  {Array.from({ length: 20 }).map((_, k) => (
                    <span key={k} className="w-[2.5px] rounded-full bg-[#4fae4e]" style={{ height: `${30 + ((k * 37) % 70)}%` }} />
                  ))}
                </span>
                <span className="text-[10px] text-[#4fae4e]">0:04</span>
              </div>
              <p className="self-end pr-1 text-[10.5px] italic text-[#56708a]">{tr("“Tavolo per 4 domani alle 20, Rossi”")}</p>
              <div className="max-w-[88%] rounded-[16px] rounded-bl-[4px] bg-white p-3 text-[12px] leading-snug text-ink shadow-sm">
                {tr("Prenotazione per")}{" "}<b>{tr("Rossi")}</b>{tr(", domani alle")}{" "}<b>20:00</b>{tr(", 4 persone. Confermi?")}
              </div>
              <div className="self-end rounded-[16px] rounded-br-[4px] bg-[#e1fec6] px-3 py-2 text-[12px] text-ink shadow-sm">{tr("Sì")}</div>
              <div className="max-w-[88%] rounded-[16px] rounded-bl-[4px] bg-white p-3 text-[12px] leading-snug text-ink shadow-sm">
                {tr("Fatto, tavolo 7 assegnato. Domani avete 42 coperti.")}
              </div>
            </div>
            <div className="flex items-center gap-2 bg-white px-3 pb-6 pt-2">
              <span className="flex h-9 flex-1 items-center rounded-full bg-mist px-3 text-[12px] text-faint">{tr("Messaggio")}</span>
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#3a8ee6] text-white">
                <Icon name="mic" size={17} />
              </span>
            </div>
          </div>
        </PhoneFrame>
      </div>
      <Float className="mx-auto mt-3 sm:absolute sm:-left-2 sm:bottom-10 sm:mt-0" icon="calendarCheck" tone="green" title={tr("Aggiunta in dashboard")} text={tr("Rossi, 4 persone, tavolo 7")} />
      <Float className="mx-auto mt-2 sm:absolute sm:-right-2 sm:top-10 sm:mt-0" icon="shield" tone="dark" title={tr("Chiede sempre conferma")} text={tr("Prima di ogni modifica")} />
    </Scene>
  );
}

const map: Record<string, (p: { f: Feature }) => React.JSX.Element> = {
  "menu-digitale": MenuDigitale,
  "importa-menu-ai": ImportaAi,
  traduzioni: Traduzioni,
  "menu-a-orari": MenuOrari,
  prenotazioni: Prenotazioni,
  "sala-e-tavoli": Sala,
  "ferie-e-chiusure": Chiusure,
  "ordini-whatsapp": Ordini,
  clienti: Clienti,
  "automazioni-whatsapp": Automazioni,
  statistiche: Statistiche,
  "staff-e-turni": Staff,
  assistente: Assistente,
};

/** Grafica statica accanto al titolo di ogni pagina funzionalità. */
export function HeroArt({ feature }: { feature: Feature }) {
  const C = map[feature.slug];
  return C ? <C f={feature} /> : null;
}


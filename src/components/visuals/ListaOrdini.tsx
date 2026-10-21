import { getLocale, tr } from "@/i18n";
import { Icon, type IconName } from "../Icon";
import { AppWindow, PhoneFrame } from "./frames";

/*
 * Illustrazioni della pagina Lista ordini, disegnate in HTML e CSS.
 * Ogni componente è autonomo: per usare gli screenshot veri dell'app basta sostituirlo
 * con un'immagine, senza toccare la pagina (src/views/ListaOrdini.tsx).
 * Dati di esempio di una pizzeria, nessun dato reale.
 */

/* ---------- dati di esempio ---------- */

type Voce = { n: string; q: string; u: string; f?: string; scorta?: boolean };
type Categoria = { c: string; voci: Voce[] };
type Reparto = { r: string; cat: Categoria[] };

const dati = (): Reparto[] => [
  {
    r: tr("Pizzeria"),
    cat: [
      {
        c: tr("Alimentari"),
        voci: [
          { n: tr("Farina tipo 00"), q: "3", u: tr("sacchi"), f: tr("Molino") },
          { n: tr("Farina integrale"), q: "1", u: tr("sacco"), f: tr("Molino") },
          { n: tr("Pomodoro pelato"), q: "2", u: tr("cartoni"), f: tr("Ingrosso") },
          { n: tr("Lievito di birra"), q: "4", u: tr("pezzi"), f: tr("Ingrosso"), scorta: true },
          { n: tr("Sale grosso"), q: "1", u: tr("sacco"), f: tr("Ingrosso") },
          { n: tr("Origano"), q: "2", u: tr("pezzi"), f: tr("Ingrosso") },
        ],
      },
      {
        c: tr("Freschi"),
        voci: [
          { n: tr("Mozzarella fior di latte"), q: "12", u: "kg", f: tr("Caseificio") },
          { n: tr("Mozzarella di bufala"), q: "4", u: "kg", f: tr("Caseificio") },
          { n: tr("Basilico"), q: "3", u: tr("mazzi"), f: tr("Ortofrutta") },
          { n: tr("Salame piccante"), q: "2", u: "kg", f: tr("Salumificio") },
        ],
      },
      {
        c: tr("Surgelati"),
        voci: [
          { n: tr("Patatine"), q: "3", u: tr("cartoni"), f: tr("Ingrosso") },
          { n: tr("Crocchette"), q: "2", u: tr("cartoni"), f: tr("Ingrosso") },
        ],
      },
    ],
  },
  {
    r: tr("Cucina"),
    cat: [
      {
        c: tr("Alimentari"),
        voci: [
          { n: tr("Olio extravergine"), q: "6", u: tr("litri"), f: tr("Frantoio") },
          { n: tr("Pasta di semola"), q: "5", u: "kg", f: tr("Ingrosso") },
          { n: tr("Riso carnaroli"), q: "2", u: "kg", f: tr("Ingrosso") },
          { n: tr("Parmigiano"), q: "2", u: "kg", f: tr("Caseificio") },
        ],
      },
      {
        c: tr("Freschi"),
        voci: [
          { n: tr("Uova"), q: "60", u: tr("pezzi"), f: tr("Ortofrutta") },
          { n: tr("Panna da cucina"), q: "4", u: tr("litri"), f: tr("Caseificio") },
          { n: tr("Verdure di stagione"), q: "5", u: "kg", f: tr("Ortofrutta") },
        ],
      },
    ],
  },
  {
    r: tr("Bar"),
    cat: [
      {
        c: tr("Bevande"),
        voci: [
          { n: tr("Acqua naturale"), q: "4", u: tr("casse"), f: tr("Ingrosso bevande") },
          { n: tr("Acqua frizzante"), q: "3", u: tr("casse"), f: tr("Ingrosso bevande") },
          { n: tr("Birra in bottiglia"), q: "3", u: tr("casse"), f: tr("Ingrosso bevande") },
          { n: tr("Caffè in grani"), q: "4", u: "kg", f: tr("Torrefazione") },
          { n: tr("Limoni"), q: "2", u: "kg", f: tr("Ortofrutta") },
        ],
      },
    ],
  },
  {
    r: tr("Pulizie"),
    cat: [
      {
        c: tr("Detersivi"),
        voci: [
          { n: tr("Detersivo piatti"), q: "2", u: tr("taniche"), f: tr("Ingrosso") },
          { n: tr("Sgrassatore"), q: "3", u: tr("bottiglie"), f: tr("Ingrosso") },
          { n: tr("Rotoli di carta"), q: "2", u: tr("cartoni"), f: tr("Ingrosso") },
          { n: tr("Sacchi per rifiuti"), q: "1", u: tr("cartone"), f: tr("Ingrosso") },
        ],
      },
    ],
  },
];

/** Colore del brand della pizzeria di esempio, usato sul foglio stampato. */
const BRAND = "#b4532a";

/* ---------- pezzi comuni ---------- */

function Stepper({ q, u, piccolo = false }: { q: string; u: string; piccolo?: boolean }) {
  const b = piccolo ? "h-6 w-6" : "h-7 w-7";
  return (
    <span className="flex flex-none items-center gap-1.5">
      <span className={`flex ${b} items-center justify-center rounded-full border border-line text-muted`}>
        <Icon name="minus" size={12} stroke={2.2} />
      </span>
      <span className="min-w-[46px] text-center leading-tight">
        <span className="block text-[13px] font-semibold tabular-nums text-ink">{q}</span>
        <span className="block text-[9.5px] text-muted">{u}</span>
      </span>
      <span className={`flex ${b} items-center justify-center rounded-full bg-ink text-white`}>
        <Icon name="plus" size={12} stroke={2.2} />
      </span>
    </span>
  );
}

function Riga({ v, ultima = false }: { v: Voce; ultima?: boolean }) {
  return (
    <div className={`flex items-center gap-2 py-2 ${ultima ? "" : "border-b border-line-soft"}`}>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[12.5px] font-medium text-ink">{v.n}</span>
        {v.scorta && <span className="mt-0.5 inline-block rounded-full bg-p-amber px-1.5 py-px text-[9.5px] font-medium text-p-amber-ink">{tr("Sotto scorta")}</span>}
      </span>
      <Stepper q={v.q} u={v.u} />
    </div>
  );
}

function Schede({ attiva = 0 }: { attiva?: number }) {
  return (
    <div className="no-scrollbar flex gap-1.5 overflow-hidden">
      {dati().map((r, i) => (
        <span key={r.r} className={`flex-none rounded-full px-2.5 py-1 text-[11px] font-medium ${i === attiva ? "bg-ink text-white" : "bg-mist text-muted"}`}>
          {r.r}
        </span>
      ))}
    </div>
  );
}

/** Notifica come sulla schermata di blocco. */
export function NotificaLista({ titolo, testo, className = "" }: { titolo?: string; testo?: string; className?: string }) {
  return (
    <div className={`flex w-[250px] items-start gap-2.5 rounded-[18px] border border-white/60 bg-white/90 p-3 shadow-[0_24px_50px_-24px_rgba(0,0,0,.45)] backdrop-blur ${className}`}>
      <span className="flex h-8 w-8 flex-none items-center justify-center rounded-[9px] bg-ink text-white">
        <Icon name="clipboard" size={16} stroke={1.9} />
      </span>
      <span className="min-w-0 flex-1 text-[11.5px] leading-snug">
        <span className="flex items-center justify-between text-[10px] uppercase tracking-wide text-faint">
          NovaMenu <span className="normal-case tracking-normal">{tr("ora")}</span>
        </span>
        <span className="mt-0.5 block font-semibold text-ink">{titolo ?? tr("Marco ha compilato la lista")}</span>
        <span className="block text-muted">{testo ?? tr("Pizzeria: 12 prodotti da ordinare")}</span>
      </span>
    </div>
  );
}

/** Sfondo delle scene, come le altre pagine delle funzionalità. */
function Scena({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`relative overflow-hidden rounded-[24px] border border-line px-4 py-8 sm:px-8 sm:py-12 ${className}`}
      style={{ backgroundImage: "radial-gradient(60% 60% at 80% 10%, rgba(254,243,199,.9), transparent 70%)", backgroundColor: "#fbfbf9" }}
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

/* ---------- telefono con la lista ---------- */

export function TelefonoLista({ zoom = 0.82 }: { zoom?: number }) {
  const pizzeria = dati()[0];
  return (
    <PhoneFrame width={280} zoom={zoom}>
      <div className="px-4 pb-4">
        <div className="flex items-center justify-between pt-1">
          <span>
            <span className="block text-[17px] font-semibold tracking-[-0.02em] text-ink">{tr("Lista ordini")}</span>
            <span className="block text-[11px] text-muted">{tr("Martedì, da inviare entro le 12")}</span>
          </span>
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-mist text-ink">
            <Icon name="search" size={15} stroke={2} />
          </span>
        </div>
        <div className="mt-3">
          <Schede />
        </div>
        {pizzeria.cat.slice(0, 2).map((c) => (
          <div key={c.c} className="mt-3">
            <p className="text-[10.5px] font-semibold uppercase tracking-[0.06em] text-faint">{c.c}</p>
            {c.voci.slice(0, c.c === pizzeria.cat[0].c ? 4 : 2).map((v, i, arr) => (
              <Riga key={v.n} v={v} ultima={i === arr.length - 1} />
            ))}
          </div>
        ))}
        <span className="mt-3 flex h-10 items-center justify-center gap-2 rounded-[12px] bg-lime text-[13px] font-semibold text-forest">
          <Icon name="send" size={14} stroke={2} />
          {tr("Invia al titolare")}
        </span>
      </div>
    </PhoneFrame>
  );
}

/* ---------- foglio A4 stampato ---------- */

export type Formato = "verticale" | "orizzontale" | "tabella";

function Testata({ formato }: { formato: Formato }) {
  return (
    <div className="flex items-end justify-between gap-[2cqw] border-b-[0.35cqw] pb-[1.6cqw]" style={{ borderColor: BRAND }}>
      <span>
        <span className="block text-[3.6cqw] font-semibold leading-none tracking-[-0.02em] text-ink" style={formato === "orizzontale" ? { fontSize: "2.6cqw" } : undefined}>
          Pizzeria Fiore
        </span>
        <span className="mt-[0.8cqw] block text-[1.9cqw] text-muted" style={formato === "orizzontale" ? { fontSize: "1.4cqw" } : undefined}>
          {tr("Ordine fornitori, martedì 14 ottobre")}
        </span>
      </span>
      <span className="rounded-[0.8cqw] px-[1.4cqw] py-[0.6cqw] text-[1.7cqw] font-semibold text-white" style={{ background: BRAND, ...(formato === "orizzontale" ? { fontSize: "1.2cqw" } : {}) }}>
        {tr("{n} prodotti", { n: dati().reduce((t, r) => t + r.cat.reduce((n, c) => n + c.voci.length, 0), 0) })}
      </span>
    </div>
  );
}

function Firma({ formato }: { formato: Formato }) {
  return (
    <p className="mt-auto flex items-center gap-[0.8cqw] border-t border-line pt-[1.2cqw] text-[1.6cqw] text-muted" style={formato === "orizzontale" ? { fontSize: "1.15cqw" } : undefined}>
      <span className="inline-flex h-[2.2cqw] w-[2.2cqw] flex-none items-center justify-center rounded-full text-white" style={{ background: BRAND, ...(formato === "orizzontale" ? { height: "1.6cqw", width: "1.6cqw" } : {}) }}>
        <Icon name="check" size={8} stroke={3} />
      </span>
      {tr("Revisionato e confermato da Giulia il 14/10 alle 18:30")}
    </p>
  );
}

/** Il foglio A4: si adatta a qualsiasi larghezza (misure in percentuale del foglio). */
export function FoglioA4({ formato = "verticale", vuoto = false, className = "" }: { formato?: Formato; vuoto?: boolean; className?: string }) {
  const reparti = dati();
  const orizz = formato === "orizzontale";
  const colonne = orizz ? 3 : 2;
  const fs = orizz ? 1.25 : 1.75;
  return (
    <div className={`@container ${className}`}>
      <div
        className="flex flex-col rounded-[0.6cqw] bg-white p-[4cqw] shadow-[0_30px_60px_-30px_rgba(0,0,0,.35),0_0_0_1px_rgba(0,0,0,.06)]"
        style={{ aspectRatio: orizz ? "297 / 210" : "210 / 297", padding: orizz ? "3cqw" : undefined }}
        role="img"
        aria-label={tr("Esempio di ordine fornitori stampato su un foglio A4")}
      >
        <Testata formato={formato} />
        {formato === "tabella" ? (
          <table className="mt-[2cqw] w-full border-collapse" style={{ fontSize: `${fs}cqw` }}>
            <thead>
              <tr className="text-left text-white" style={{ background: BRAND }}>
                <th className="px-[1cqw] py-[0.6cqw] font-semibold">{tr("Prodotto")}</th>
                <th className="px-[1cqw] py-[0.6cqw] font-semibold">{tr("Reparto")}</th>
                <th className="px-[1cqw] py-[0.6cqw] font-semibold">{tr("Fornitore")}</th>
                <th className="px-[1cqw] py-[0.6cqw] text-right font-semibold">{tr("Quantità")}</th>
              </tr>
            </thead>
            <tbody>
              {reparti.flatMap((r) => r.cat.flatMap((c) => c.voci.map((v) => ({ ...v, r: r.r })))).slice(0, 26).map((v, i) => (
                <tr key={v.n + i} className={i % 2 ? "bg-[#faf6f3]" : ""}>
                  <td className="border-b border-line-soft px-[1cqw] py-[0.45cqw] text-ink">{v.n}</td>
                  <td className="border-b border-line-soft px-[1cqw] py-[0.45cqw] text-muted">{v.r}</td>
                  <td className="border-b border-line-soft px-[1cqw] py-[0.45cqw] text-muted">{v.f}</td>
                  <td className="border-b border-line-soft px-[1cqw] py-[0.45cqw] text-right font-semibold tabular-nums text-ink">
                    {vuoto ? "" : `${v.q} ${v.u}`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="mt-[2cqw] gap-[3cqw]" style={{ columnCount: colonne, columnGap: orizz ? "2.4cqw" : "3.4cqw", columnFill: "auto", flex: "1 1 auto", height: 0, overflow: "hidden", fontSize: `${fs}cqw` }}>
            {reparti.map((r) => (
              <div key={r.r} className="mb-[1.6cqw]">
                <p className="break-after-avoid rounded-[0.4cqw] px-[0.9cqw] py-[0.35cqw] font-semibold uppercase tracking-[0.06em] text-white" style={{ background: BRAND, fontSize: `${fs * 0.92}cqw` }}>
                  {r.r}
                </p>
                {r.cat.map((c) => (
                  <div key={c.c} className="mt-[0.9cqw]">
                    <p className="break-after-avoid font-semibold text-ink" style={{ color: BRAND }}>
                      {c.c}
                    </p>
                    {c.voci.map((v) => (
                      <p key={v.n} className="flex break-inside-avoid items-baseline gap-[0.8cqw] border-b border-dotted border-[#d6d3d1] py-[0.35cqw]">
                        <span className="inline-block h-[1.2em] w-[1.2em] flex-none translate-y-[0.15em] rounded-[0.15em] border border-[#a8a29e]" />
                        <span className="min-w-0 flex-1 truncate text-ink">{v.n}</span>
                        <span className="flex-none font-semibold tabular-nums text-ink">{vuoto ? "______" : `${v.q} ${v.u}`}</span>
                      </p>
                    ))}
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
        <Firma formato={formato} />
      </div>
    </div>
  );
}

/* ---------- apertura della pagina ---------- */

export function ListaOrdiniHero() {
  return (
    <Scena>
      <div className="relative mx-auto flex max-w-[560px] items-end justify-center gap-0 pt-16 sm:justify-between sm:pt-0">
        <FoglioA4 className="absolute right-0 top-4 hidden w-[58%] rotate-[3deg] sm:block" />
        <div className="relative z-10 sm:ml-2">
          <TelefonoLista />
        </div>
        <NotificaLista className="absolute -top-2 left-1/2 z-20 -translate-x-1/2 sm:left-auto sm:right-2 sm:top-auto sm:bottom-6 sm:translate-x-0" />
      </div>
    </Scena>
  );
}

/* ---------- come funziona: tre piccole illustrazioni ---------- */

function Mini({ children }: { children: React.ReactNode }) {
  return <div className="flex h-[118px] items-center justify-center rounded-[16px] border border-line bg-[#fbfbf9] px-4">{children}</div>;
}

export function PassoSegna() {
  return (
    <Mini>
      <div className="w-full max-w-[230px] rounded-[12px] border border-line bg-white px-3 shadow-[0_12px_30px_-20px_rgba(0,0,0,.35)]">
        <Riga v={{ n: tr("Farina tipo 00"), q: "3", u: tr("sacchi") }} />
        <Riga v={{ n: tr("Pomodoro pelato"), q: "2", u: tr("cartoni") }} ultima />
      </div>
    </Mini>
  );
}

export function PassoControlla() {
  return (
    <Mini>
      <div className="flex w-full max-w-[240px] flex-col items-center gap-2">
        <NotificaLista className="!w-full" />
        <span className="inline-flex h-8 items-center gap-1.5 rounded-[10px] bg-ink px-3 text-[12px] font-semibold text-white">
          <Icon name="check" size={13} stroke={2.4} />
          {tr("Conferma l'ordine")}
        </span>
      </div>
    </Mini>
  );
}

export function PassoStampa() {
  return (
    <Mini>
      <div className="flex items-center gap-4">
        <FoglioA4 className="w-[64px]" />
        <span className="flex flex-col gap-1.5">
          <Chip icon="printer" testo={tr("Stampa A4")} />
          <Chip icon="send" testo={tr("PDF al fornitore")} />
        </span>
      </div>
    </Mini>
  );
}

function Chip({ icon, testo, scuro = false }: { icon: IconName; testo: string; scuro?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11.5px] font-medium ${scuro ? "bg-ink text-white" : "border border-line bg-white text-ink"}`}>
      <Icon name={icon} size={12} stroke={2} />
      {testo}
    </span>
  );
}

/* ---------- blocco 1: organizza ---------- */

export function VisOrganizza() {
  const r = dati()[0];
  return (
    <Scena>
      <AppWindow title="app.novamenu.eu" className="mx-auto max-w-[560px]">
        <div className="p-4 sm:p-5">
          <div className="flex flex-wrap items-center gap-1.5 text-[11.5px]">
            <span className="mr-1 text-muted">{tr("Parti da:")}</span>
            <Chip icon="pizza" testo={tr("Modello pizzeria")} scuro />
            <Chip icon="plus" testo={tr("Da zero")} />
            <Chip icon="clipboard" testo={tr("Incolla un elenco")} />
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-[0.8fr_1.2fr]">
            <div className="rounded-[12px] border border-line p-2">
              <p className="px-1.5 pb-1 text-[10.5px] font-semibold uppercase tracking-[0.06em] text-faint">{tr("Reparti")}</p>
              {dati().map((x, i) => (
                <div key={x.r} className={`flex items-center gap-2 rounded-[8px] px-1.5 py-1.5 text-[12.5px] ${i === 0 ? "bg-mist font-semibold text-ink" : "text-text"}`}>
                  <Icon name="menu" size={12} stroke={2} className="text-faint" />
                  <span className="flex-1">{x.r}</span>
                  <span className="text-[11px] text-faint tabular-nums">{x.cat.reduce((n, c) => n + c.voci.length, 0)}</span>
                </div>
              ))}
              <div className="flex items-center gap-2 px-1.5 py-1.5 text-[12px] text-muted">
                <Icon name="plus" size={12} stroke={2} />
                {tr("Nuovo reparto")}
              </div>
            </div>
            <div className="rounded-[12px] border border-line p-3">
              <p className="text-[10.5px] font-semibold uppercase tracking-[0.06em] text-faint">{tr("Nuovo prodotto")}</p>
              <div className="mt-2 grid gap-2 text-[12px]">
                <Campo label={tr("Nome")} valore={tr("Farina tipo 00")} />
                <div>
                  <span className="text-[10.5px] text-muted">{tr("Unità di misura")}</span>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {["kg", tr("litri"), tr("pezzi"), tr("cartoni"), tr("sacchi"), tr("latte"), tr("casse")].map((u, i) => (
                      <span key={u} className={`rounded-full px-2 py-0.5 text-[11px] ${i === 4 ? "bg-ink text-white" : "border border-line text-muted"}`}>
                        {u}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Campo label={tr("Reparto")} valore={r.r} />
                  <Campo label={tr("Categoria")} valore={r.cat[0].c} />
                  <Campo label={tr("Scorta minima")} valore={`2 ${tr("sacchi")}`} />
                  <Campo label={tr("Fornitore")} valore={tr("Molino")} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </AppWindow>
    </Scena>
  );
}

function Campo({ label, valore }: { label: string; valore: string }) {
  return (
    <label className="block">
      <span className="text-[10.5px] text-muted">{label}</span>
      <span className="mt-0.5 block truncate rounded-[8px] border border-line bg-white px-2 py-1.5 text-[12px] text-ink">{valore}</span>
    </label>
  );
}

/* ---------- blocco 2: magazzino, anche senza rete ---------- */

export function VisMagazzino() {
  const tasti = ["1", "2", "3", "4", "5", "6", "7", "8", "9", ",", "0", "⌫"];
  return (
    <Scena>
      <div className="flex justify-center">
        <PhoneFrame width={280}>
          <div className="px-4 pb-4">
            <div className="flex items-center gap-2 rounded-[10px] bg-p-amber px-2.5 py-2 text-[11px] font-medium text-p-amber-ink">
              <Icon name="wifiOff" size={14} stroke={2} />
              {tr("Sei offline. La lista si invia quando torna la rete.")}
            </div>
            <div className="mt-3 flex gap-1.5">
              <span className="rounded-full bg-ink px-2.5 py-1 text-[11px] font-medium text-white">{tr("Solo sotto scorta")}</span>
              <span className="rounded-full bg-mist px-2.5 py-1 text-[11px] font-medium text-muted">{tr("Solo con quantità")}</span>
            </div>
            <div className="mt-2">
              <Riga v={{ n: tr("Lievito di birra"), q: "4", u: tr("pezzi"), scorta: true }} />
              <div className="relative -mx-4 overflow-hidden border-b border-line-soft">
                <div className="flex items-center gap-2 bg-white px-4 py-2.5">
                  <Icon name="arrowLeft" size={12} stroke={2} className="text-faint" />
                  <span className="min-w-0 flex-1 truncate text-[12.5px] font-medium text-ink">{tr("Origano")}</span>
                </div>
                <div className="absolute inset-y-0 right-0 flex w-[120px]">
                  <span className="flex flex-1 items-center justify-center bg-[#e4e4e7] text-[11px] font-medium text-ink">{tr("Azzera")}</span>
                  <span className="flex flex-1 items-center justify-center bg-[#dc2626] text-[11px] font-medium text-white">{tr("Elimina")}</span>
                </div>
              </div>
            </div>
            <div className="mt-3 rounded-[16px] border border-line bg-[#fbfbf9] p-3 shadow-[0_-10px_30px_-20px_rgba(0,0,0,.3)]">
              <p className="text-[11px] text-muted">{tr("Mozzarella fior di latte")}</p>
              <p className="mt-0.5 text-[24px] font-semibold tabular-nums tracking-[-0.03em] text-ink">
                12,5 <span className="text-[14px] font-medium text-muted">kg</span>
              </p>
              <div className="mt-2 grid grid-cols-3 gap-1.5">
                {tasti.map((k) => (
                  <span key={k} className="flex h-8 items-center justify-center rounded-[9px] bg-white text-[14px] font-medium text-ink shadow-[0_1px_0_rgba(0,0,0,.08)]">
                    {k}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </PhoneFrame>
      </div>
    </Scena>
  );
}

/* ---------- blocco 3: il team segna, tu decidi ---------- */

export function VisTeam() {
  return (
    <Scena>
      <div className="mx-auto flex max-w-[460px] flex-col gap-3">
        <NotificaLista titolo={tr("Marco ha modificato la lista")} testo={tr("Pizzeria: 2 quantità cambiate, 1 prodotto nuovo")} className="!w-full max-w-[320px] self-end" />
        <div className="rounded-[18px] border border-line bg-white p-4 shadow-[0_24px_50px_-30px_rgba(0,0,0,.35)]">
          <div className="flex items-center justify-between gap-3">
            <span>
              <span className="block text-[14px] font-semibold text-ink">{tr("Lista di martedì")}</span>
              <span className="block text-[11.5px] text-muted">{tr("Inviata da Marco alle 10:42, modificata alle 11:05")}</span>
            </span>
            <span className="rounded-full bg-p-amber px-2 py-0.5 text-[11px] font-medium text-p-amber-ink">{tr("Da confermare")}</span>
          </div>
          <div className="mt-3 text-[12.5px]">
            {[
              { n: tr("Mozzarella fior di latte"), prima: "10 kg", dopo: "12 kg" },
              { n: tr("Pomodoro pelato"), prima: `1 ${tr("cartone")}`, dopo: `2 ${tr("cartoni")}` },
            ].map((x) => (
              <div key={x.n} className="flex items-center gap-2 border-b border-line-soft py-2">
                <span className="min-w-0 flex-1 truncate font-medium text-ink">{x.n}</span>
                <span className="text-muted line-through">{x.prima}</span>
                <span className="font-semibold text-[#dc2626]">{x.dopo}</span>
              </div>
            ))}
            <div className="flex items-center gap-2 py-2">
              <span className="min-w-0 flex-1 truncate font-medium text-ink">{tr("Basilico")}</span>
              <span className="rounded-full bg-[#fee2e2] px-1.5 py-px text-[10px] font-semibold text-[#b91c1c]">{tr("Nuovo")}</span>
              <span className="font-semibold text-[#dc2626]">3 {tr("mazzi")}</span>
            </div>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            <span className="inline-flex h-9 items-center gap-1.5 rounded-[10px] bg-lime px-3 text-[12.5px] font-semibold text-forest">
              <Icon name="check" size={14} stroke={2.4} />
              {tr("Conferma e stampa")}
            </span>
            <span className="inline-flex h-9 items-center rounded-[10px] border border-line px-3 text-[12.5px] font-medium text-ink">{tr("Riapri")}</span>
          </div>
        </div>
        <div className="rounded-[18px] border border-line bg-white p-4">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-p-blue text-[12px] font-semibold text-p-blue-ink">M</span>
            <span className="flex-1">
              <span className="block text-[13px] font-semibold text-ink">Marco</span>
              <span className="block text-[11.5px] text-muted">{tr("Vede solo: Pizzeria")}</span>
            </span>
          </div>
          <div className="mt-3 grid gap-2 text-[12.5px]">
            {[
              [tr("Segna le quantità"), true],
              [tr("Aggiunge e toglie prodotti"), false],
              [tr("Crea categorie"), false],
            ].map(([l, on]) => (
              <div key={String(l)} className="flex items-center justify-between">
                <span className="text-text">{l}</span>
                <span data-on={on} className="toggle toggle-sm" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Scena>
  );
}

/* ---------- blocco 4: il foglio ---------- */

export function VisStampa() {
  return (
    <Scena>
      <div className="mx-auto max-w-[380px]">
        <FoglioA4 />
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          <Chip icon="printer" testo={tr("Stampa con AirPrint")} scuro />
          <Chip icon="send" testo={tr("Invia il PDF")} />
        </div>
      </div>
    </Scena>
  );
}

/* ---------- blocco 5: avvisi e storico ---------- */

export function VisAvvisi() {
  const giorni = getLocale() === "en" ? ["M", "T", "W", "T", "F", "S", "S"] : ["L", "M", "M", "G", "V", "S", "D"];
  return (
    <Scena>
      <div className="mx-auto grid max-w-[480px] gap-3">
        <div className="rounded-[18px] border border-line bg-white p-4">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-[9px] bg-p-amber text-p-amber-ink">
              <Icon name="bell" size={16} stroke={2} />
            </span>
            <span className="flex-1">
              <span className="block text-[13.5px] font-semibold text-ink">{tr("È ora di fare l'ordine")}</span>
              <span className="block text-[11.5px] text-muted">{tr("Ogni martedì e venerdì alle 10:00")}</span>
            </span>
            <span data-on="true" className="toggle toggle-sm" />
          </div>
          <div className="mt-3 flex gap-1.5">
            {giorni.map((g, i) => (
              <span key={i} className={`flex h-7 w-7 items-center justify-center rounded-full text-[11.5px] font-medium ${i === 1 || i === 4 ? "bg-ink text-white" : "bg-mist text-muted"}`}>
                {g}
              </span>
            ))}
          </div>
          <div className="mt-3 flex items-center justify-between border-t border-line-soft pt-3 text-[12.5px]">
            <span className="text-text">{tr("Promemoria se la lista non arriva")}</span>
            <span data-on="true" className="toggle toggle-sm" />
          </div>
        </div>
        <div className="rounded-[18px] border border-line bg-white p-4">
          <div className="flex items-center gap-2 rounded-[10px] bg-mist px-2.5 py-2 text-[12px] text-muted">
            <Icon name="search" size={13} stroke={2} />
            {tr("Farina tipo 00")}
          </div>
          <p className="mt-2 text-[12px] text-text">
            <span className="font-semibold text-ink">{tr("Ultimo ordine: venerdì 10 ottobre")}</span>, 3 {tr("sacchi")}
          </p>
          <div className="mt-3 text-[12px]">
            {[
              [tr("Venerdì 10 ottobre"), tr("Marco e Sara, confermata da Giulia"), "31"],
              [tr("Martedì 7 ottobre"), tr("Marco, confermata da Giulia"), "28"],
            ].map(([d, chi, n]) => (
              <div key={d} className="flex items-center gap-2 border-t border-line-soft py-2">
                <span className="min-w-0 flex-1">
                  <span className="block font-medium text-ink">{d}</span>
                  <span className="block truncate text-muted">{chi}</span>
                </span>
                <span className="text-muted tabular-nums">{tr("{n} prodotti", { n })}</span>
                <span className="inline-flex items-center gap-1 rounded-full border border-line px-2 py-0.5 text-[11px] font-medium text-ink">
                  <Icon name="repeat" size={11} stroke={2} />
                  {tr("Rifai uguale")}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Scena>
  );
}

/* ---------- piccola anteprima per la griglia della home ---------- */

export function ListaOrdiniMini() {
  return (
    <div className="flex items-end gap-3">
      <FoglioA4 className="w-[120px] -rotate-2" />
      <NotificaLista className="!w-[250px]" />
    </div>
  );
}

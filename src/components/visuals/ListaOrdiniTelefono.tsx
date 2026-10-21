import { tr } from "@/i18n";
import { Icon, type IconName } from "../Icon";
import { PhoneFrame } from "./frames";
import { BRAND, dati, type Voce } from "./lista-ordini-dati";

/*
 * Illustrazioni della Lista ordini pensate per il telefono (sotto i 768 px).
 * Non sono le grafiche del computer rimpicciolite: un solo elemento principale per volta,
 * centrato e grande, senza pezzi sovrapposti, e nessun testo sotto gli 11 px reali.
 * Da tablet in su la pagina usa ancora quelle di ListaOrdini.tsx.
 */

/** Sfondo delle scene, uguale a quello delle grafiche del computer. */
export function ScenaTelefono({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`relative overflow-hidden rounded-[24px] border border-line px-4 py-6 ${className}`}
      style={{ backgroundImage: "radial-gradient(60% 60% at 80% 10%, rgba(254,243,199,.9), transparent 70%)", backgroundColor: "#fbfbf9" }}
    >
      <div className="relative flex justify-center">{children}</div>
    </div>
  );
}

/* ---------- pezzi comuni ---------- */

function Stepper({ q, u }: { q: string; u: string }) {
  return (
    <span className="flex flex-none items-center gap-1">
      <span className="flex h-7 w-7 items-center justify-center rounded-full border border-line text-muted">
        <Icon name="minus" size={13} stroke={2.2} />
      </span>
      <span className="min-w-[48px] text-center leading-tight">
        <span className="block text-[15px] font-semibold tabular-nums text-ink">{q}</span>
        <span className="block text-[11px] text-muted">{u}</span>
      </span>
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-ink text-white">
        <Icon name="plus" size={13} stroke={2.2} />
      </span>
    </span>
  );
}

function Riga({ v, ultima = false }: { v: Voce; ultima?: boolean }) {
  return (
    <div className={`flex items-center gap-2 py-2.5 ${ultima ? "" : "border-b border-line-soft"}`}>
      <span className="min-w-0 flex-1">
        <span className="block text-[14px] font-medium leading-snug text-ink">{v.n}</span>
        {v.scorta && <span className="mt-1 inline-block rounded-full bg-p-amber px-2 py-0.5 text-[11px] font-medium text-p-amber-ink">{tr("Sotto scorta")}</span>}
      </span>
      <Stepper q={v.q} u={v.u} />
    </div>
  );
}

function Carta({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`w-full max-w-[320px] rounded-[18px] border border-line bg-white p-4 shadow-[0_24px_50px_-30px_rgba(0,0,0,.35)] ${className}`}>{children}</div>;
}

function Pillola({ icon, testo, scuro = false }: { icon: IconName; testo: string; scuro?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[13px] font-medium ${scuro ? "bg-ink text-white" : "border border-line bg-white text-ink"}`}>
      <Icon name={icon} size={14} stroke={2} />
      {testo}
    </span>
  );
}

/* ---------- il telefono con la lista (apertura e sezione in home) ---------- */

export function TelefonoListaTelefono() {
  const pizzeria = dati()[0];
  return (
    <PhoneFrame width={280} zoom={1}>
      <div className="px-3 pb-4">
        <div className="flex items-center justify-between pt-1">
          <span>
            <span className="block text-[18px] font-semibold tracking-[-0.02em] text-ink">{tr("Lista ordini")}</span>
            <span className="block text-[12px] text-muted">{tr("Martedì, da inviare entro le 12")}</span>
          </span>
          <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-mist text-ink">
            <Icon name="search" size={16} stroke={2} />
          </span>
        </div>
        <div className="mt-3 flex gap-1.5">
          {dati()
            .slice(0, 3)
            .map((r, i) => (
              <span key={r.r} className={`flex-none rounded-full px-3 py-1 text-[12px] font-medium ${i === 0 ? "bg-ink text-white" : "bg-mist text-muted"}`}>
                {r.r}
              </span>
            ))}
        </div>
        <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.06em] text-faint">{pizzeria.cat[0].c}</p>
        {pizzeria.cat[0].voci.slice(0, 4).map((v, i, a) => (
          <Riga key={v.n} v={v} ultima={i === a.length - 1} />
        ))}
        <span className="mt-3 flex h-11 items-center justify-center gap-2 rounded-[12px] bg-lime text-[14px] font-semibold text-forest">
          <Icon name="send" size={15} stroke={2} />
          {tr("Invia al titolare")}
        </span>
      </div>
    </PhoneFrame>
  );
}

export function ListaOrdiniHeroTelefono() {
  return (
    <ScenaTelefono>
      <TelefonoListaTelefono />
    </ScenaTelefono>
  );
}

/* ---------- la notifica ---------- */

function Notifica({ titolo, testo }: { titolo: string; testo: string }) {
  return (
    <div className="flex w-full max-w-[320px] items-start gap-3 rounded-[18px] border border-line bg-white p-3.5 shadow-[0_24px_50px_-24px_rgba(0,0,0,.4)]">
      <span className="flex h-9 w-9 flex-none items-center justify-center rounded-[10px] bg-ink text-white">
        <Icon name="clipboard" size={17} stroke={1.9} />
      </span>
      <span className="min-w-0 flex-1 leading-snug">
        <span className="flex items-center justify-between text-[11px] uppercase tracking-wide text-faint">
          NovaMenu <span className="normal-case tracking-normal">{tr("ora")}</span>
        </span>
        <span className="mt-0.5 block text-[14px] font-semibold text-ink">{titolo}</span>
        <span className="block text-[13px] text-muted">{testo}</span>
      </span>
    </div>
  );
}

/* ---------- il foglio A4, semplificato per lo schermo stretto ---------- */

export type FormatoTelefono = "verticale" | "orizzontale" | "tabella";

function Testata() {
  const totale = dati().reduce((t, r) => t + r.cat.reduce((n, c) => n + c.voci.length, 0), 0);
  return (
    <div className="flex items-end justify-between gap-3 border-b-2 pb-2" style={{ borderColor: BRAND }}>
      <span className="min-w-0">
        <span className="block text-[17px] font-semibold leading-tight tracking-[-0.02em] text-ink">Pizzeria Fiore</span>
        <span className="mt-0.5 block text-[11.5px] leading-snug text-muted">{tr("Ordine fornitori, martedì 14 ottobre")}</span>
      </span>
      <span className="flex-none rounded-[6px] px-2 py-0.5 text-[11px] font-semibold text-white" style={{ background: BRAND }}>
        {tr("{n} prodotti", { n: totale })}
      </span>
    </div>
  );
}

function RepartoFoglio({ reparto, categorie = 1, voci = 5 }: { reparto: ReturnType<typeof dati>[number]; categorie?: number; voci?: number }) {
  return (
    <div className="mt-3">
      <p className="rounded-[4px] px-2 py-0.5 text-[11.5px] font-semibold uppercase tracking-[0.06em] text-white" style={{ background: BRAND }}>
        {reparto.r}
      </p>
      {reparto.cat.slice(0, categorie).map((c) => (
        <div key={c.c} className="mt-1.5">
          <p className="text-[12.5px] font-semibold" style={{ color: BRAND }}>
            {c.c}
          </p>
          {c.voci.slice(0, voci).map((v) => (
            <p key={v.n} className="flex items-baseline gap-2 border-b border-dotted border-[#d6d3d1] py-1 text-[13px]">
              <span className="inline-block h-3 w-3 flex-none translate-y-[1px] rounded-[2px] border border-[#a8a29e]" />
              <span className="min-w-0 flex-1 leading-snug text-ink">{v.n}</span>
              <span className="flex-none font-semibold tabular-nums text-ink">
                {v.q} {v.u}
              </span>
            </p>
          ))}
        </div>
      ))}
    </div>
  );
}

/** Sfumatura che fa capire che il foglio continua (in basso o, per l'orizzontale, a destra). */
function Sfumatura({ lato = "basso" }: { lato?: "basso" | "destra" }) {
  return lato === "basso" ? (
    <span aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-b from-white/0 to-white" />
  ) : (
    <span aria-hidden className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-r from-white/0 to-white" />
  );
}

const ombraFoglio = "shadow-[0_30px_60px_-30px_rgba(0,0,0,.35),0_0_0_1px_rgba(0,0,0,.06)]";

/**
 * Il foglio per telefono: solo la parte alta, con meno righe e testo più grande.
 * L'orizzontale resta più largo dello schermo e si vede ritagliato a destra, così si capisce
 * che è in orizzontale ma i prodotti si leggono.
 */
export function FoglioTelefono({ formato = "verticale", corto = false }: { formato?: FormatoTelefono; corto?: boolean }) {
  const reparti = dati();
  const etichetta = tr("Esempio di ordine fornitori stampato su un foglio A4");
  if (formato === "orizzontale") {
    return (
      <div className="relative w-full overflow-hidden rounded-[4px]" role="img" aria-label={etichetta}>
        <div className={`relative w-[165%] rounded-[4px] bg-white p-4 ${ombraFoglio}`} style={{ aspectRatio: "297 / 210" }}>
          <Testata />
          <div className="grid grid-cols-3 gap-4">
            {reparti.slice(0, 3).map((r) => (
              <RepartoFoglio key={r.r} reparto={r} voci={4} />
            ))}
          </div>
          <Sfumatura />
        </div>
        <Sfumatura lato="destra" />
      </div>
    );
  }
  return (
    <div className={`relative w-full overflow-hidden rounded-[4px] bg-white p-4 ${ombraFoglio}`} style={{ aspectRatio: corto ? "210 / 150" : "210 / 270" }} role="img" aria-label={etichetta}>
      <Testata />
      {formato === "tabella" ? (
        <table className="mt-3 w-full border-collapse text-[12.5px]">
          <thead>
            <tr className="text-left text-white" style={{ background: BRAND }}>
              <th className="px-2 py-1 font-semibold">{tr("Prodotto")}</th>
              <th className="px-2 py-1 font-semibold">{tr("Fornitore")}</th>
              <th className="px-2 py-1 text-right font-semibold">{tr("Quantità")}</th>
            </tr>
          </thead>
          <tbody>
            {reparti
              .flatMap((r) => r.cat.flatMap((c) => c.voci))
              .slice(0, 10)
              .map((v, i) => (
                <tr key={v.n + i} className={i % 2 ? "bg-[#faf6f3]" : ""}>
                  <td className="border-b border-line-soft px-2 py-1 leading-snug text-ink">{v.n}</td>
                  <td className="border-b border-line-soft px-2 py-1 leading-snug text-muted">{v.f}</td>
                  <td className="whitespace-nowrap border-b border-line-soft px-2 py-1 text-right font-semibold tabular-nums text-ink">
                    {v.q} {v.u}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      ) : (
        <>
          <RepartoFoglio reparto={reparti[0]} voci={corto ? 3 : 5} />
          {!corto && <RepartoFoglio reparto={reparti[1]} voci={4} />}
        </>
      )}
      <Sfumatura />
    </div>
  );
}

/* ---------- come funziona: tre piccole illustrazioni ---------- */

function Mini({ children }: { children: React.ReactNode }) {
  return <div className="flex items-center justify-center rounded-[16px] border border-line bg-[#fbfbf9] px-4 py-5">{children}</div>;
}

export function PassoSegnaTelefono() {
  return (
    <Mini>
      <div className="w-full max-w-[320px] rounded-[14px] border border-line bg-white px-3.5 shadow-[0_12px_30px_-20px_rgba(0,0,0,.35)]">
        <Riga v={{ n: tr("Farina tipo 00"), q: "3", u: tr("sacchi") }} />
        <Riga v={{ n: tr("Pomodoro pelato"), q: "2", u: tr("cartoni") }} ultima />
      </div>
    </Mini>
  );
}

export function PassoControllaTelefono() {
  return (
    <Mini>
      <Notifica titolo={tr("Marco ha compilato la lista")} testo={tr("Pizzeria: 12 prodotti da ordinare")} />
    </Mini>
  );
}

export function PassoStampaTelefono() {
  return (
    <Mini>
      <div className="w-full max-w-[320px]">
        <FoglioTelefono corto />
      </div>
    </Mini>
  );
}

/* ---------- blocco 1: organizza ---------- */

function Campo({ label, valore }: { label: string; valore: string }) {
  return (
    <span className="block min-w-0">
      <span className="text-[11.5px] text-muted">{label}</span>
      <span className="mt-0.5 block rounded-[9px] border border-line bg-white px-2.5 py-2 text-[14px] leading-snug text-ink">{valore}</span>
    </span>
  );
}

export function VisOrganizzaTelefono() {
  const r = dati()[0];
  return (
    <ScenaTelefono>
      <Carta>
        <p className="text-[11.5px] font-semibold uppercase tracking-[0.06em] text-faint">{tr("Nuovo prodotto")}</p>
        <div className="mt-3 grid gap-3">
          <Campo label={tr("Nome")} valore={tr("Farina tipo 00")} />
          <div>
            <span className="text-[11.5px] text-muted">{tr("Unità di misura")}</span>
            <div className="mt-1 flex flex-wrap gap-1.5">
              {["kg", tr("litri"), tr("pezzi"), tr("cartoni"), tr("sacchi"), tr("casse")].map((u, i) => (
                <span key={u} className={`rounded-full px-2.5 py-1 text-[13px] ${i === 4 ? "bg-ink text-white" : "border border-line text-muted"}`}>
                  {u}
                </span>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Campo label={tr("Reparto")} valore={r.r} />
            <Campo label={tr("Categoria")} valore={r.cat[0].c} />
            <Campo label={tr("Scorta minima")} valore={`2 ${tr("sacchi")}`} />
            <Campo label={tr("Fornitore")} valore={tr("Molino")} />
          </div>
        </div>
      </Carta>
    </ScenaTelefono>
  );
}

/* ---------- blocco 2: magazzino, anche senza rete ---------- */

export function VisMagazzinoTelefono() {
  const tasti = ["1", "2", "3", "4", "5", "6", "7", "8", "9", ",", "0", "⌫"];
  return (
    <ScenaTelefono>
      <PhoneFrame width={280} zoom={1}>
        <div className="px-3 pb-4">
          <div className="flex items-start gap-2 rounded-[10px] bg-p-amber px-3 py-2 text-[12px] font-medium leading-snug text-p-amber-ink">
            <Icon name="wifiOff" size={15} stroke={2} className="mt-px flex-none" />
            {tr("Sei offline. La lista si invia quando torna la rete.")}
          </div>
          <Riga v={{ n: tr("Lievito di birra"), q: "4", u: tr("pezzi"), scorta: true }} />
          <div className="relative -mx-3 overflow-hidden border-b border-line-soft">
            <div className="flex items-center gap-2 bg-white px-3 py-3">
              <Icon name="arrowLeft" size={13} stroke={2} className="text-faint" />
              <span className="min-w-0 flex-1 text-[14px] font-medium text-ink">{tr("Origano")}</span>
            </div>
            <div className="absolute inset-y-0 right-0 flex w-[136px]">
              <span className="flex flex-1 items-center justify-center bg-[#e4e4e7] text-[12px] font-medium text-ink">{tr("Azzera")}</span>
              <span className="flex flex-1 items-center justify-center bg-[#dc2626] text-[12px] font-medium text-white">{tr("Elimina")}</span>
            </div>
          </div>
          <div className="mt-3 rounded-[16px] border border-line bg-[#fbfbf9] p-3">
            <p className="text-[12px] text-muted">{tr("Mozzarella fior di latte")}</p>
            <p className="mt-0.5 text-[26px] font-semibold tabular-nums tracking-[-0.03em] text-ink">
              12,5 <span className="text-[15px] font-medium text-muted">kg</span>
            </p>
            <div className="mt-2 grid grid-cols-3 gap-1.5">
              {tasti.map((k) => (
                <span key={k} className="flex h-9 items-center justify-center rounded-[9px] bg-white text-[15px] font-medium text-ink shadow-[0_1px_0_rgba(0,0,0,.08)]">
                  {k}
                </span>
              ))}
            </div>
          </div>
        </div>
      </PhoneFrame>
    </ScenaTelefono>
  );
}

/* ---------- blocco 3: il team segna, tu decidi ---------- */

export function VisTeamTelefono() {
  return (
    <ScenaTelefono>
      <Carta>
        <div className="flex items-start justify-between gap-3">
          <span className="min-w-0">
            <span className="block text-[16px] font-semibold text-ink">{tr("Lista di martedì")}</span>
            <span className="mt-0.5 block text-[12px] leading-snug text-muted">{tr("Inviata da Marco alle 10:42, modificata alle 11:05")}</span>
          </span>
          <span className="flex-none rounded-full bg-p-amber px-2 py-0.5 text-[11.5px] font-medium text-p-amber-ink">{tr("Da confermare")}</span>
        </div>
        <div className="mt-3 text-[14px]">
          {[
            { n: tr("Mozzarella fior di latte"), prima: "10 kg", dopo: "12 kg" },
            { n: tr("Pomodoro pelato"), prima: `1 ${tr("cartone")}`, dopo: `2 ${tr("cartoni")}` },
          ].map((x) => (
            <div key={x.n} className="flex items-center gap-3 border-b border-line-soft py-2.5">
              <span className="min-w-0 flex-1 font-medium leading-snug text-ink">{x.n}</span>
              <span className="flex-none text-right leading-snug">
                <span className="block text-[12.5px] text-muted line-through">{x.prima}</span>
                <span className="block font-semibold text-[#dc2626]">{x.dopo}</span>
              </span>
            </div>
          ))}
          <div className="flex items-center gap-3 py-2.5">
            <span className="min-w-0 flex-1 font-medium leading-snug text-ink">
              {tr("Basilico")}{" "}
              <span className="ml-1 inline-block rounded-full bg-[#fee2e2] px-2 py-px text-[11px] font-semibold text-[#b91c1c]">{tr("Nuovo")}</span>
            </span>
            <span className="flex-none font-semibold text-[#dc2626]">3 {tr("mazzi")}</span>
          </div>
        </div>
        <div className="mt-2 grid gap-2">
          <span className="inline-flex h-11 items-center justify-center gap-1.5 rounded-[12px] bg-lime text-[14px] font-semibold text-forest">
            <Icon name="check" size={15} stroke={2.4} />
            {tr("Conferma e stampa")}
          </span>
          <span className="inline-flex h-11 items-center justify-center rounded-[12px] border border-line text-[14px] font-medium text-ink">{tr("Riapri")}</span>
        </div>
      </Carta>
    </ScenaTelefono>
  );
}

/* ---------- blocco 4: il foglio ---------- */

export function VisStampaTelefono() {
  return (
    <ScenaTelefono>
      <div className="w-full max-w-[340px]">
        <FoglioTelefono />
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          <Pillola icon="printer" testo={tr("Stampa con AirPrint")} scuro />
          <Pillola icon="send" testo={tr("Invia il PDF")} />
        </div>
      </div>
    </ScenaTelefono>
  );
}

/* ---------- blocco 5: avvisi e storico ---------- */

export function VisAvvisiTelefono({ giorni }: { giorni: string[] }) {
  return (
    <ScenaTelefono>
      <Carta>
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 flex-none items-center justify-center rounded-[10px] bg-p-amber text-p-amber-ink">
            <Icon name="bell" size={18} stroke={2} />
          </span>
          <span className="min-w-0 flex-1 leading-snug">
            <span className="block text-[15px] font-semibold text-ink">{tr("È ora di fare l'ordine")}</span>
            <span className="block text-[12.5px] text-muted">{tr("Ogni martedì e venerdì alle 10:00")}</span>
          </span>
          <span data-on="true" className="toggle toggle-sm flex-none" />
        </div>
        <div className="mt-4 flex justify-between">
          {giorni.map((g, i) => (
            <span key={i} className={`flex h-9 w-9 items-center justify-center rounded-full text-[13px] font-medium ${i === 1 || i === 4 ? "bg-ink text-white" : "bg-mist text-muted"}`}>
              {g}
            </span>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-between gap-3 border-t border-line-soft pt-3.5 text-[14px]">
          <span className="leading-snug text-text">{tr("Promemoria se la lista non arriva")}</span>
          <span data-on="true" className="toggle toggle-sm flex-none" />
        </div>
      </Carta>
    </ScenaTelefono>
  );
}

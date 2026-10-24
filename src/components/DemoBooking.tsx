"use client";

import { messageTag, tr, weekdayDate } from "@/i18n";
import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { signupUrl, site, waLink } from "@/config/site";
import { Icon } from "./Icon";
import { HandNote } from "./HandNote";
import { lp } from "@/i18n/link";
import { registraRichiesta, rigaRicontatto } from "@/lib/moduli/richieste";

/** Al posto della casella "accetto": per chiedere una demo non si accettano Termini e Privacy. */
export function RigaPrivacy({ className = "" }: { className?: string }) {
  return (
    <p className={`text-[14px] leading-normal text-[#3f3f46] ${className}`}>
      {rigaRicontatto()}{" "}
      <Link href={lp("/legale/privacy/")} className="font-medium text-ink underline underline-offset-2">
        {tr("Informativa privacy")}
      </Link>
    </p>
  );
}

const types = () => ([tr("Pizzeria"), tr("Ristorante o trattoria"), tr("Pub o birreria"), tr("Bar o caffetteria"), tr("Gelateria"), tr("Pastificio"), tr("Panetteria o pasticceria"), tr("Gastronomia o rosticceria"), tr("Altro")]);
const goals = () => ([tr("Menu digitale e QR"), tr("Più prenotazioni"), tr("Ordini da asporto"), tr("Far tornare i clienti"), tr("Un po' di tutto")]);
const times = ["10:00", "10:30", "11:00", "11:30", "15:00", "15:30", "16:00", "17:30"];
const dayShort = () => ([tr("Dom"), tr("Lun"), tr("Mar"), tr("Mer"), tr("Gio"), tr("Ven"), tr("Sab")]);

type Data = { nome: string; attivita: string; email: string; tel: string; tipo: string; obiettivo: string; modo: "video" | "tel"; wa: boolean };
// La casella WhatsApp parte sempre vuota: il consenso lo dà solo chi la spunta.
const empty: Data = { nome: "", attivita: "", email: "", tel: "", tipo: "", obiettivo: "", modo: "video", wa: false };

/** Prossimi 5 giorni lavorativi a partire da domani. */
function nextWorkdays() {
  const out: Date[] = [];
  const d = new Date();
  d.setHours(12, 0, 0, 0);
  while (out.length < 5) {
    d.setDate(d.getDate() + 1);
    if (d.getDay() !== 0 && d.getDay() !== 6) out.push(new Date(d));
  }
  return out;
}

const inp =
  "h-12 w-full min-w-0 rounded-[10px] border border-line bg-white px-3.5 text-[16px] text-ink outline-none transition-[border-color,box-shadow] placeholder:text-faint focus:border-ink focus:shadow-[0_0_0_3px_rgba(11,11,12,.07)]";
const lab = "mb-1.5 block text-[14px] font-medium text-ink";

/** Modulo in tre passaggi per prenotare la demo: dati, giorno e ora, fatto. */
export function DemoBooking({ compact = false }: { compact?: boolean }) {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<Data>(empty);
  const [err, setErr] = useState<string | null>(null);
  const [days, setDays] = useState<Date[]>([]);
  const [day, setDay] = useState(0);
  const [time, setTime] = useState<string | null>(null);
  // quando è comparso il modulo e quando è stata spuntata la casella WhatsApp: si salvano con la richiesta
  const inizio = useRef(Date.now());
  const [waIl, setWaIl] = useState<string | null>(null);
  const [trappola, setTrappola] = useState("");

  useEffect(() => setDays(nextWorkdays()), []);
  const set = <K extends keyof Data>(k: K, v: Data[K]) => setData((d) => ({ ...d, [k]: v }));

  const when = useMemo(() => {
    const d = days[day];
    if (!d) return "";
    return weekdayDate(d);
  }, [days, day]);

  function toStep2() {
    if (!data.nome.trim() || !data.attivita.trim() || !data.tel.trim()) return setErr(tr("Compila nome, attività e telefono per continuare."));
    setErr(null);
    setStep(2);
  }

  function confirm() {
    if (!time) return;
    const msg = [
      messageTag() + tr("Ciao, vorrei prenotare la demo di {brand}.", { brand: site.name }),
      tr("{when} alle {time}, {mode}.", { when: when.charAt(0).toUpperCase() + when.slice(1), time, mode: data.modo === "video" ? tr("in videochiamata") : tr("al telefono") }),
      "",
      tr("Nome: {value}", { value: data.nome }),
      tr("Attività: {value}", { value: `${data.attivita}${data.tipo ? ` (${data.tipo})` : ""}` }),
      data.email ? tr("Email: {value}", { value: data.email }) : "",
      tr("Telefono: {value}", { value: data.tel }),
      data.obiettivo ? tr("Mi serve soprattutto: {value}", { value: data.obiettivo }) : "",
    ]
      .filter((x) => x !== "")
      .join("\n");
    registraRichiesta({
      nome: data.nome,
      email: data.email,
      telefono: data.tel,
      messaggio: [
        `Demo: ${when} ${time}, ${data.modo === "video" ? "videochiamata" : "telefono"}`,
        `Attività: ${data.attivita}${data.tipo ? ` (${data.tipo})` : ""}`,
        data.obiettivo ? `Obiettivo: ${data.obiettivo}` : "",
      ]
        .filter(Boolean)
        .join("\n"),
      inizio: inizio.current,
      website: trappola,
      consensi: [{ tipo: "whatsapp", valore: data.wa, data: waIl ?? undefined, testo: tr("Sì, scrivetemi su WhatsApp per organizzare la demo. Posso smettere quando voglio.") }],
    });
    window.open(waLink(msg), "_blank", "noopener");
    setStep(3);
  }

  const stepNames = [tr("I tuoi dati"), tr("Giorno e ora"), tr("Fatto")];

  return (
    <div className="w-full">
      <ol aria-label={tr("Passaggi")} className="grid grid-cols-3 gap-2">
        {stepNames.map((t, i) => (
          <li key={t} className="flex flex-col gap-2">
            <span className={`block h-1 rounded-full transition-colors duration-300 ${i + 1 <= step ? "bg-ink" : "bg-[#e4e4e7]"}`} />
            <span className={`text-[13px] font-medium ${i + 1 === step ? "text-ink" : "text-[#71717a]"}`}>{t}</span>
          </li>
        ))}
      </ol>

      {step === 1 && (
        <div key="s1" className="anim-fade-up mt-7">
          {!compact && (
            <>
              <h1 className="text-[clamp(2rem,1.5rem+2vw,2.75rem)] font-semibold leading-[1.14] md:leading-[1.06] tracking-[-0.035em] text-ink">{tr("Prenota la tua demo")}{" "}<span className="hl">{tr("gratuita")}</span></h1>
              <p className="mt-3 text-[17px] leading-relaxed text-muted">{tr("20 minuti con noi, sul tuo menu vero. Alla fine ti lasciamo tutto già pronto.")}</p>
              <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-[14px] text-[#3f3f46]">
                {[tr("Senza impegno"), tr("Gratis"), tr("Menu pronto alla fine")].map((x) => (
                  <li key={x} className="flex items-center gap-1.5">
                    <Icon name="check" size={15} stroke={2.4} className="text-[#16a34a]" />
                    {x}
                  </li>
                ))}
              </ul>
              <HandNote text={tr("Compila qui: 30 secondi")} variant="right-down" className="mt-5 pl-1" />
            </>
          )}
          <form
            className={`flex flex-col gap-4 ${compact ? "" : "mt-1"}`}
            onSubmit={(e) => {
              e.preventDefault();
              toStep2();
            }}
            noValidate
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="min-w-0">
                <label htmlFor="d-nome" className={lab}>
                  {tr("Nome e cognome")}
                </label>
                <input id="d-nome" className={inp} placeholder={tr("Mario Rossi")} autoComplete="name" value={data.nome} onChange={(e) => set("nome", e.target.value)} />
              </div>
              <div className="min-w-0">
                <label htmlFor="d-attivita" className={lab}>
                  {tr("Nome dell'attività")}
                </label>
                <input id="d-attivita" className={inp} placeholder={tr("Pizzeria da Mario")} autoComplete="organization" value={data.attivita} onChange={(e) => set("attivita", e.target.value)} />
              </div>
            </div>
            {!compact && (
              <div>
                <label htmlFor="d-email" className={lab}>
                  {tr("Email")}
                </label>
                <input id="d-email" type="email" className={inp} placeholder={tr("mario@pizzeriadamario.it")} autoComplete="email" value={data.email} onChange={(e) => set("email", e.target.value)} />
              </div>
            )}
            <div>
              <label htmlFor="d-tel" className={lab}>
                {tr("Telefono (ti scriviamo su WhatsApp)")}
              </label>
              <input id="d-tel" type="tel" className={inp} placeholder="333 123 4567" autoComplete="tel" value={data.tel} onChange={(e) => set("tel", e.target.value)} />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="min-w-0">
                <label htmlFor="d-tipo" className={lab}>
                  {tr("Tipo di attività")}
                </label>
                <div className="relative">
                  <select id="d-tipo" className={`${inp} appearance-none pr-10`} value={data.tipo} onChange={(e) => set("tipo", e.target.value)}>
                    <option value="">{tr("Seleziona")}</option>
                    {types().map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                  <Icon name="chevronDown" size={18} stroke={2} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted" />
                </div>
              </div>
              <div className="min-w-0">
                <label htmlFor="d-obiettivo" className={lab}>
                  {tr("Cosa ti serve di più?")}
                </label>
                <div className="relative">
                  <select id="d-obiettivo" className={`${inp} appearance-none pr-10`} value={data.obiettivo} onChange={(e) => set("obiettivo", e.target.value)}>
                    <option value="">{tr("Seleziona")}</option>
                    {goals().map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                  <Icon name="chevronDown" size={18} stroke={2} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted" />
                </div>
              </div>
            </div>
            <fieldset>
              <legend className={lab}>{tr("Come preferisci fare la demo?")}</legend>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {(
                  [
                    { id: "video", label: tr("Videochiamata"), icon: "play" },
                    { id: "tel", label: tr("Al telefono"), icon: "phone" },
                  ] as const
                ).map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    aria-pressed={data.modo === m.id}
                    onClick={() => set("modo", m.id)}
                    className={`inline-flex h-12 items-center justify-center gap-2 rounded-[10px] border text-[15px] font-medium transition-colors ${
                      data.modo === m.id ? "border-forest bg-forest text-white" : "border-line bg-white text-ink hover:border-[#d4d4d8]"
                    }`}
                  >
                    <Icon name={m.icon} size={15} stroke={1.9} />
                    {m.label}
                  </button>
                ))}
              </div>
            </fieldset>
            <div className="flex flex-col gap-3 pt-1">
              <label className="flex cursor-pointer items-start gap-2.5 text-[14px] leading-normal text-[#3f3f46]">
                <input type="checkbox" checked={data.wa} onChange={(e) => { set("wa", e.target.checked); setWaIl(e.target.checked ? new Date().toISOString() : null); }} className="mt-0.5 h-[18px] w-[18px] flex-none accent-[#0b0b0c]" />
                {tr("Sì, scrivetemi su WhatsApp per organizzare la demo. Posso smettere quando voglio.")}
              </label>
              <RigaPrivacy />
              {/* campo trappola: le persone non lo vedono, i programmi automatici lo compilano */}
              <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" value={trappola} onChange={(e) => setTrappola(e.target.value)} className="absolute -left-[9999px] h-px w-px opacity-0" />
            </div>
            {err && (
              <p role="alert" className="rounded-[10px] bg-p-red px-3.5 py-2.5 text-[14px] text-p-red-ink">
                {err}
              </p>
            )}
            <button type="submit" className={`btn btn-dark mt-1 h-[52px] w-full text-[16px] ${compact ? "" : "pulse"}`}>
              {tr("Continua: scegli giorno e ora")}
              <Icon name="arrowRight" size={16} stroke={2} />
            </button>
            <p className="text-center text-[14px] text-muted">
              {tr("Preferisci provare da solo?")}{" "}
              <a href={signupUrl} className="font-medium text-ink underline underline-offset-2">
                {tr("Inizia la prova gratuita")}
              </a>
            </p>
          </form>
        </div>
      )}

      {step === 2 && (
        <div key="s2" className="anim-fade-up mt-7">
          <h2 className="text-[clamp(1.75rem,1.4rem+1.4vw,2.4rem)] font-semibold leading-[1.15] md:leading-[1.08] tracking-[-0.03em] text-ink">{tr("Scegli giorno e ora")}</h2>
          <p className="mt-2 text-[16px] text-muted">{tr("La demo dura 20 minuti. Orari in ora italiana.")}</p>
          <p className="mb-2.5 mt-6 text-[14px] font-medium text-ink">{tr("Giorno")}</p>
          <div role="group" aria-label={tr("Giorno")} className="grid grid-cols-5 gap-2">
            {days.map((d, i) => (
              <button
                key={d.toISOString()}
                type="button"
                aria-pressed={day === i}
                onClick={() => {
                  setDay(i);
                  setTime(null);
                }}
                className={`h-[68px] rounded-[12px] border text-center transition-colors ${
                  day === i ? "border-forest bg-forest text-white" : "border-line bg-white text-ink hover:border-[#d4d4d8]"
                }`}
              >
                <span className="block text-[12px] opacity-75">{dayShort()[d.getDay()]}</span>
                <span className="mt-0.5 block text-[20px] font-semibold tabular-nums">{d.getDate()}</span>
              </button>
            ))}
          </div>
          <p className="mb-2.5 mt-6 text-[14px] font-medium text-ink">{tr("Ora")}</p>
          <div role="group" aria-label={tr("Ora")} className="grid grid-cols-4 gap-2">
            {times.map((t, j) => {
              const off = (j + day) % 4 === 1;
              const on = time === t;
              return (
                <button
                  key={t}
                  type="button"
                  disabled={off}
                  aria-pressed={on}
                  onClick={() => setTime(t)}
                  className={`h-[46px] rounded-[10px] border text-[15px] font-medium tabular-nums transition-colors ${
                    off
                      ? "cursor-not-allowed border-[#f4f4f5] bg-[#f4f4f5] text-faint line-through"
                      : on
                        ? "border-forest bg-forest text-white"
                        : "border-line bg-white text-ink hover:border-[#d4d4d8]"
                  }`}
                >
                  {t}
                </button>
              );
            })}
          </div>
          <div className="mt-6 flex items-center gap-3 rounded-[14px] border border-line bg-white px-4 py-3.5">
            <span className="flex h-10 w-10 flex-none items-center justify-center rounded-[11px] bg-p-green text-p-green-ink">
              <Icon name="calendarCheck" size={18} />
            </span>
            <span className="text-[14px] leading-snug">
              <span className="block font-semibold text-ink">{time ? tr("{when} alle {time}", { when: when.charAt(0).toUpperCase() + when.slice(1), time }) : tr("Scegli un orario")}</span>
              <span className="block text-[#71717a]">{data.modo === "video" ? tr("Videochiamata") : tr("Telefonata")}{tr(", 20 minuti")}</span>
            </span>
          </div>
          <div className="mt-5 grid grid-cols-[1fr_2fr] gap-2.5">
            <button type="button" onClick={() => setStep(1)} className="btn btn-light h-[52px]">
              {tr("Indietro")}
            </button>
            <button type="button" onClick={confirm} disabled={!time} className="btn btn-dark h-[52px] disabled:cursor-not-allowed disabled:opacity-40">
              {tr("Conferma la demo")}
            </button>
          </div>
          <RigaPrivacy className="mt-3 text-center !text-[13.5px] !text-muted" />
        </div>
      )}

      {step === 3 && (
        <div key="s3" className="anim-fade-up mt-10 text-center">
          <span className="anim-pop inline-flex h-[72px] w-[72px] items-center justify-center rounded-full bg-p-green text-p-green-ink">
            <Icon name="check" size={32} stroke={2.4} />
          </span>
          <h2 className="mt-5 text-[clamp(1.75rem,1.4rem+1.4vw,2.4rem)] font-semibold leading-[1.15] md:leading-[1.08] tracking-[-0.03em] text-ink">{tr("Ci vediamo {when} alle {time}", { when, time: time ?? "" })}</h2>
          <p className="mx-auto mt-3 max-w-[420px] text-[16px] leading-relaxed text-muted">
            {tr("Si è aperto WhatsApp con la richiesta già scritta: premi Invia e ti confermiamo l'appuntamento. Se hai il menu in PDF o in foto, mandacelo lì.")}
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-2.5">
            <Link href={lp("/")} className="btn btn-light">
              {tr("Torna al sito")}
            </Link>
          </div>
          <button type="button" onClick={() => setStep(2)} className="mt-3 min-h-11 text-[13px] text-muted underline underline-offset-2">
            {tr("Cambia giorno o ora")}
          </button>
        </div>
      )}
    </div>
  );
}

const scenarios = () => ([
  {
    label: tr("Prenota mentre cucini"),
    who: tr("Giulia Ferri"),
    time: "18:42",
    stat: tr("+18 tavoli"),
    msgs: [
      ["l", tr("Ciao Giulia, la tua prenotazione per sabato alle 20:30, 4 persone, è confermata.")],
      ["l", tr("Promemoria: ti aspettiamo domani alle 20:30. Confermi?")],
      ["c", tr("Confermo, grazie!")],
    ],
  },
  {
    label: tr("Ordina a negozio chiuso"),
    who: tr("Marco Rossi"),
    time: "22:15",
    stat: tr("+9 ordini"),
    msgs: [
      ["c", tr("Nuovo ordine da asporto\nRitiro: domani alle 12:00\n2 kg tortellini\n1 kg ravioli di zucca\nNome: Marco R.")],
      ["l", tr("Ricevuto Marco, domani alle 12 è tutto pronto.")],
    ],
  },
  {
    label: tr("Parla ai turisti"),
    who: tr("Emma Clarke"),
    time: "19:05",
    stat: tr("4 lingue"),
    msgs: [
      ["c", tr("Nuovo ordine da asporto\nLingua del cliente: inglese\n2 × Margherita\n1 × Fiori di zucca fritti\nRitiro: 19:45")],
      ["l", tr("Thank you Emma! Your order will be ready at 7:45 pm.")],
    ],
  },
]);

/** Colonna scura con i messaggi WhatsApp che si alternano. */
export function DemoAside() {
  const [tab, setTab] = useState(0);
  const [shown, setShown] = useState(0);
  const sc = scenarios()[tab];

  useEffect(() => {
    setShown(0);
    const ids: number[] = [];
    sc.msgs.forEach((_, i) => ids.push(window.setTimeout(() => setShown(i + 1), 450 + i * 900)));
    ids.push(window.setTimeout(() => setTab((t) => (t + 1) % scenarios().length), 450 + sc.msgs.length * 900 + 2600));
    return () => ids.forEach((x) => window.clearTimeout(x));
  }, [tab, sc.msgs]);

  return (
    <aside aria-label={tr("Come funziona")} className="flex h-full flex-col justify-between gap-6 rounded-[24px] bg-ink p-5 text-[#fafaf8] md:gap-10 md:p-10">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <span className="h-2 w-2 rounded-full bg-[#86efac] [animation:pulseDot_2s_ease-in-out_infinite]" />
          <span className="text-[14px] text-[#d4d4d8]">{tr("Messaggi WhatsApp automatici")}</span>
        </div>
        <div className="text-right">
          <p className="text-[12px] text-[#a1a1aa]">{tr("Esempio di una sera")}</p>
          <p key={sc.stat} className="anim-fade-up text-[28px] font-semibold tracking-[-0.02em]">
            {sc.stat}
          </p>
        </div>
      </div>

      <div className="w-full max-w-[460px] self-center">
        <div className="flex min-h-[250px] flex-col gap-2.5 md:min-h-[330px] rounded-[22px] border border-[#27272a] bg-[#18181b] p-4">
          <div className="flex items-center justify-between gap-2.5 border-b border-[#27272a] pb-3">
            <div className="flex items-center gap-2.5">
              <span className="flex h-[38px] w-[38px] items-center justify-center rounded-full bg-[#16a34a]">
                <Icon name="chat" size={18} stroke={2} />
              </span>
              <span>
                <span className="block text-[15px] font-semibold">{sc.who}</span>
                <span className="block text-[12px] text-[#a1a1aa]">{tr("WhatsApp,")}{" "}{sc.time}</span>
              </span>
            </div>
            <span className="rounded-full border border-[#166534] px-2.5 py-1 text-[12px] text-[#86efac]">{tr("Automatico")}</span>
          </div>
          <div className="flex flex-col gap-2.5 pt-1">
            {sc.msgs.slice(0, shown).map(([who, text], i) => (
              <div
                key={`${tab}-${i}`}
                className={`anim-pop max-w-[86%] whitespace-pre-line px-3 py-2.5 text-[14px] leading-[1.45] ${
                  who === "c" ? "self-start rounded-[4px_14px_14px_14px] bg-[#27272a]" : "self-end rounded-[14px_4px_14px_14px] bg-[#15803d] text-white"
                }`}
              >
                {text}
              </div>
            ))}
            {shown < sc.msgs.length && (
              <span className="flex gap-1 self-start rounded-[14px] bg-[#27272a] px-3 py-3">
                {[0, 1, 2].map((k) => (
                  <span key={k} className="h-1.5 w-1.5 rounded-full bg-[#a1a1aa]" style={{ animation: `typing 1s ${k * 0.15}s infinite` }} />
                ))}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2" role="tablist" aria-label={tr("Esempi")}>
        {scenarios().map((s, i) => (
          <button
            key={s.label}
            type="button"
            role="tab"
            aria-selected={tab === i}
            onClick={() => setTab(i)}
            className={`rounded-[12px] border px-3 py-3 text-left text-[13px] font-medium leading-snug transition-colors ${
              tab === i ? "border-[#3f3f46] bg-[#27272a] text-white" : "border-[#27272a] text-[#a1a1aa] hover:text-white"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>
    </aside>
  );
}

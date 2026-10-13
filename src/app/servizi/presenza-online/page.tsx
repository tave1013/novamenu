import { tr } from "@/i18n";
import type { Metadata } from "next";
import Link from "next/link";
import { Icon, type IconName } from "@/components/Icon";
import { Breadcrumbs, Faq, Hl, JsonLd } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { ArtSplit, Packages, SectionHead, Steps } from "@/components/Servizi";
import { site } from "@/config/site";
import { pageMeta } from "@/config/seo";

const title = "Gestione scheda Google e TripAdvisor per locali";
const description =
  "Ci occupiamo della scheda Google, di TripAdvisor e dei tuoi canali online: orari giusti, foto curate, risposte alle recensioni. Più visibilità per il locale.";

export const metadata: Metadata = pageMeta({ title, description, path: "/servizi/presenza-online/" });

const faq = () => ([
  { q: tr("Devo darvi le mie password?"), a: tr("No. Su Google ci aggiungi come gestori della tua scheda, e lo stesso facciamo sulle altre piattaforme quando lo permettono. Puoi toglierci l'accesso quando vuoi.") },
  { q: tr("Rispondete voi alle recensioni?"), a: tr("Sì, con il tono del tuo locale. Per le recensioni più delicate ti mandiamo prima la risposta da approvare.") },
  { q: tr("Quali canali seguite?"), a: tr("Scheda Google, TripAdvisor, Instagram, Facebook e le schede sulle app di consegna. Decidiamo insieme da quali partire.") },
  { q: tr("Quando si vedono i risultati?"), a: tr("Una scheda completa e ordinata si nota da subito. Per salire nelle ricerche serve costanza: per questo lavoriamo ogni mese, non una volta sola.") },
  { q: tr("Serve usare NovaMenu?"), a: tr("No, il servizio è disponibile anche da solo. Se usi NovaMenu, colleghiamo menu, ordini e prenotazioni direttamente alla tua scheda Google.") },
]);

const channels = (): { icon: IconName; t: string; d: string }[] => ([
  { icon: "pin", t: tr("Scheda Google"), d: tr("Categoria, orari, foto, menu e post sempre aggiornati.") },
  { icon: "star", t: "TripAdvisor", d: tr("Profilo completo e una risposta per ogni recensione.") },
  { icon: "chat", t: tr("Instagram e Facebook"), d: tr("Bio, link e storie in evidenza coerenti con il locale.") },
  { icon: "bag", t: tr("App di consegna"), d: tr("Schede ordinate, con foto e descrizioni che invogliano.") },
  { icon: "qr", t: tr("Menu digitale"), d: tr("Lo stesso menu, con gli stessi prezzi, ovunque.") },
  { icon: "search", t: tr("Ricerche locali"), d: tr("Le parole giuste per farti trovare da chi è vicino.") },
]);

const artBox = "relative rounded-[28px] bg-mist p-6 md:p-10";

function CoerenzaArt() {
  const ch: { icon: IconName; n: string }[] = [
    { icon: "pin", n: tr("Google") },
    { icon: "star", n: "TripAdvisor" },
    { icon: "chat", n: tr("Instagram") },
  ];
  return (
    <div className={artBox}>
      <div className="flex flex-col gap-3">
        {ch.map((c, i) => (
          <div key={c.n} className="flex items-center gap-4 rounded-[18px] border border-line bg-white p-4" style={{ marginLeft: `${i * 18}px`, marginRight: `${(2 - i) * 18}px` }}>
            <span className="flex h-10 w-10 flex-none items-center justify-center rounded-[12px] bg-lime-soft text-forest">
              <Icon name={c.icon} size={18} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[14.5px] font-medium text-ink">{c.n}</p>
              <p className="text-[13px] text-muted">{tr("Aperto oggi dalle 12:00 alle 23:00")}</p>
            </div>
            <span className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-[#dcfce7] text-[#166534]">
              <Icon name="check" size={14} stroke={2.6} />
            </span>
          </div>
        ))}
      </div>
      <p className="mt-5 text-center text-[13px] font-medium text-forest">{tr("Stessi orari su ogni canale")}</p>
    </div>
  );
}

function RecensioniArt() {
  return (
    <div className={artBox}>
      <div className="rounded-[18px] border border-line bg-white p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#dbeafe] text-[13px] font-semibold text-[#1e40af]">G</span>
            <div>
              <p className="text-[14px] font-medium text-ink">{tr("Giulia")}</p>
              <p className="text-[12px] text-muted">{tr("2 giorni fa")}</p>
            </div>
          </div>
          <span className="text-[15px] tracking-[2px] text-[#e8a400]">★★★☆☆</span>
        </div>
        <p className="mt-3 text-[14px] leading-relaxed text-text">{tr("Pizza buona ma abbiamo aspettato 40 minuti il sabato sera.")}</p>
      </div>
      <div className="ml-8 mt-3 rounded-[18px] bg-forest p-5 text-[#fafaf8]">
        <p className="text-[12px] font-medium uppercase tracking-[0.08em] text-lime">{tr("Risposta del titolare")}</p>
        <p className="mt-2 text-[14px] leading-relaxed text-[#e3eed8]">{tr("Ciao Giulia, grazie per averlo scritto. Il sabato è la sera più piena: da questa settimana puoi prenotare l'orario di ritiro online e saltare l'attesa.")}</p>
      </div>
      <div className="mt-4 flex justify-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-[12.5px] font-medium text-muted shadow-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-lime" />
          {tr("Bozza pronta, da approvare")}
        </span>
      </div>
    </div>
  );
}

function MappaArt() {
  const pins = [
    { x: 22, y: 30, me: false },
    { x: 70, y: 22, me: false },
    { x: 48, y: 52, me: true },
    { x: 80, y: 66, me: false },
    { x: 18, y: 72, me: false },
  ];
  return (
    <div className={artBox}>
      <div className="flex items-center gap-3 rounded-full border border-line bg-white px-4 py-2.5 text-[14px] text-muted">
        <Icon name="search" size={16} />
        {tr("pizzeria vicino a me")}
      </div>
      <div className="relative mt-4 aspect-[4/3] overflow-hidden rounded-[20px] bg-[#eef1e8]">
        <svg viewBox="0 0 400 300" className="absolute inset-0 h-full w-full" aria-hidden>
          <path d="M-10 90 C 80 70, 160 120, 260 95 S 380 60, 420 80" stroke="#fff" strokeWidth="16" fill="none" />
          <path d="M120 -10 C 140 80, 110 180, 150 310" stroke="#fff" strokeWidth="12" fill="none" />
          <path d="M-10 220 C 120 200, 250 250, 420 210" stroke="#fff" strokeWidth="12" fill="none" />
          <path d="M300 -10 C 290 100, 330 200, 300 310" stroke="#fff" strokeWidth="9" fill="none" />
          <rect x="190" y="150" width="70" height="44" rx="10" fill="#dfe7d2" />
          <rect x="30" y="120" width="60" height="50" rx="10" fill="#dfe7d2" />
        </svg>
        {pins.map((p, i) => (
          <span key={i} className="absolute -translate-x-1/2 -translate-y-full" style={{ left: `${p.x}%`, top: `${p.y}%` }}>
            {p.me ? (
              <span className="flex flex-col items-center">
                <span className="mb-1 whitespace-nowrap rounded-full bg-ink px-2.5 py-1 text-[12px] font-medium text-white">{tr("Il tuo locale")}</span>
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-lime text-forest shadow-[0_0_0_8px_rgba(159,232,112,.3)]">
                  <Icon name="pizza" size={16} />
                </span>
              </span>
            ) : (
              <span className="block h-4 w-4 rounded-full border-2 border-white bg-[#a1a1aa]" />
            )}
          </span>
        ))}
      </div>
    </div>
  );
}

function GoogleCard() {
  return (
    <div className="mx-auto w-full max-w-[420px] rounded-[26px] border border-line bg-white p-5 shadow-[0_30px_70px_-40px_rgba(0,0,0,.45)]">
      <div className="flex items-center gap-3 rounded-full bg-mist px-4 py-2.5 text-[14px] text-muted">
        <Icon name="search" size={16} />
        {tr("pizzeria vicino a me")}
      </div>
      <div className="mt-4 grid grid-cols-3 gap-1.5 overflow-hidden rounded-[16px]">
        {["/images/settori/ristorante-sm.webp", "/images/settori/pasticceria-sm.webp", "/images/settori/panetteria-sm.webp"].map((s) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={s} src={s} alt="" className="aspect-square h-full w-full object-cover" />
        ))}
      </div>
      <p className="mt-4 text-[20px] font-semibold tracking-[-0.02em] text-ink">{tr("Il tuo locale")}</p>
      <p className="mt-0.5 text-[14px] text-muted">{tr("Pizzeria · Centro storico")}</p>
      <p className="mt-2 text-[14px]">
        <span className="font-medium text-[#16a34a]">{tr("Aperto")}</span>
        <span className="text-muted">{" "}{tr("· chiude alle 23:00")}</span>
      </p>
      <div className="mt-4 grid grid-cols-3 gap-2">
        {[
          { i: "book" as IconName, t: tr("Menu") },
          { i: "calendarCheck" as IconName, t: tr("Prenota") },
          { i: "pin" as IconName, t: tr("Indicazioni") },
        ].map((b) => (
          <span key={b.t} className="flex flex-col items-center gap-1.5 rounded-[14px] bg-lime-soft py-3 text-[12.5px] font-medium text-forest">
            <Icon name={b.i} size={18} />
            {b.t}
          </span>
        ))}
      </div>
      <div className="mt-4 rounded-[14px] border border-line-soft bg-paper p-3.5 text-[13.5px]">
        <p className="text-muted">{tr("“Pizza ottima e personale gentile.”")}</p>
        <p className="mt-2 rounded-[10px] bg-white p-2.5 text-text">
          <span className="font-medium text-ink">{tr("Risposta del titolare")}</span>
          <br />
          {tr("Grazie mille, ti aspettiamo per la prossima!")}
        </p>
      </div>
      <p className="mt-3 text-center text-[11.5px] text-faint">{tr("Esempio illustrativo")}</p>
    </div>
  );
}

export default function PresenzaOnlinePage() {
  return (
    <>
      {/* Apertura */}
      <section className="overflow-x-clip pb-14 pt-6 md:pb-20 md:pt-8">
        <div className="wrap">
          <Breadcrumbs items={[{ name: tr("Servizi"), href: "/servizi/" }, { name: tr("Presenza online"), href: "/servizi/presenza-online/" }]} />
          <div className="mt-8 grid items-center gap-12 lg:mt-10 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
            <div>
              <span className="anim-fade-up inline-flex items-center gap-2 rounded-full bg-lime-soft px-3 py-1.5 text-[13.5px] font-medium text-forest">
                <Icon name="globe" size={16} />
                {tr("Servizio presenza online")}
              </span>
              <h1 className="display anim-fade-up mt-6" style={{ animationDelay: "80ms" }}>
                <Hl text={tr("Quando ti cercano online, trovano il locale che sei davvero.")} word="davvero" />
              </h1>
              <p className="lead anim-fade-up mt-6 max-w-[560px]" style={{ animationDelay: "160ms" }}>
                {tr("Ci occupiamo della tua scheda Google, di TripAdvisor e dei canali dove i clienti ti scelgono: orari giusti, foto curate e una risposta a ogni recensione.")}
              </p>
              <div className="anim-fade-up mt-8 flex flex-col gap-3 sm:flex-row" style={{ animationDelay: "240ms" }}>
                <Link href="/contatti/" className="btn btn-dark">
                  {tr("Chiedi un preventivo")}
                  <Icon name="arrowRight" size={16} stroke={2} />
                </Link>
                <a href="#pacchetti" className="btn btn-light">
                  {tr("Guarda i pacchetti")}
                </a>
              </div>
            </div>
            <div className="anim-fade-up" style={{ animationDelay: "200ms" }}>
              <GoogleCard />
            </div>
          </div>
        </div>
      </section>

      {/* Canali */}
      <section className="py-14 md:py-20">
        <div className="wrap">
          <SectionHead eyebrow={tr("Di cosa ci occupiamo")} title={<Hl text={tr("Tutti i posti dove ti cercano, in ordine e coerenti.")} word="coerenti" />} text={tr("Ogni canale con gli stessi orari, le stesse foto e lo stesso tono. Chi ti trova si fida di più, e sceglie te.")} />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {channels().map((c, i) => (
              <Reveal key={c.t} delay={i * 60}>
                <div className="h-full rounded-[22px] border border-line bg-white p-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-[12px] bg-lime-soft text-forest">
                    <Icon name={c.icon} size={20} />
                  </span>
                  <h3 className="mt-5 text-[17px] font-semibold tracking-[-0.015em] text-ink">{c.t}</h3>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-muted">{c.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Righe alternate */}
      <section className="flex flex-col gap-20 py-10 md:gap-28 md:py-16">
        <ArtSplit
          side="left"
          visual={<CoerenzaArt />}
          eyebrow={tr("Coerenza")}
          title={tr("Stessi orari, stesse foto, stesso locale ovunque.")}
          text={tr("Un orario sbagliato su Google o una foto vecchia su TripAdvisor bastano per far scegliere un altro locale. Teniamo tutto allineato, anche quando cambi qualcosa.")}
          points={[tr("Orari festivi e ferie aggiornati in tempo"), tr("Le stesse foto belle su tutti i canali"), tr("Un solo menu, gli stessi prezzi ovunque")]}
        />
        <ArtSplit
          side="right"
          visual={<RecensioniArt />}
          eyebrow={tr("Recensioni")}
          title={tr("Ogni recensione riceve una risposta, anche quelle difficili.")}
          text={tr("Chi sceglie dove mangiare legge le recensioni, ma soprattutto legge come rispondi. Rispondiamo con il tono del tuo locale, e ti aiutiamo a riceverne di nuove nel modo giusto.")}
          points={[tr("Risposte curate, con il tuo tono"), tr("Le più delicate te le facciamo approvare"), tr("Un QR per chiedere recensioni ai clienti contenti")]}
        />
        <ArtSplit
          side="left"
          visual={<MappaArt />}
          eyebrow={tr("Visibilità locale")}
          title={tr("Farti trovare da chi è vicino e ha fame, adesso.")}
          text={tr("Lavoriamo sulla scheda Google perché esca quando qualcuno cerca un locale come il tuo in zona: categoria giusta, descrizione con le parole che usano i clienti, foto e post aggiornati.")}
          points={[tr("Categoria e descrizione ottimizzate"), tr("Post e foto nuove ogni mese"), tr("Link diretti a menu, ordini e prenotazioni")]}
        />
      </section>

      {/* Pacchetti */}
      <section id="pacchetti" className="scroll-mt-24 py-14 md:py-20">
        <div className="wrap">
          <SectionHead center eyebrow={tr("Pacchetti")} title={tr("Si parte sistemando tutto, poi lo teniamo in ordine.")} text={tr("Puoi fare solo l'avvio, oppure lasciarci la gestione ogni mese.")} />
          <div className="mt-12">
            <Packages
              note={tr("Il prezzo dipende dai canali da seguire: ti mandiamo un preventivo chiaro, senza vincoli lunghi.")}
              items={[
                { name: tr("Avvio"), for: tr("Tutto sistemato, una volta"), price: tr("Su preventivo"), points: [tr("Scheda Google completa e ottimizzata"), tr("Profilo TripAdvisor in ordine"), tr("Orari, foto e menu allineati"), tr("Bio e link dei social sistemati")] },
                { name: tr("Gestione"), for: tr("Tutto in ordine, ogni mese"), price: tr("Su preventivo"), popular: true, points: [tr("Tutto quello dell'Avvio"), tr("Risposte alle recensioni"), tr("Post e foto nuove su Google"), tr("Un riepilogo mensile semplice")] },
                { name: tr("Completo"), for: tr("Presenza online con foto e video"), price: tr("Su preventivo"), points: [tr("Tutto quello della Gestione"), tr("Shooting foto e video incluso"), tr("Contenuti per Instagram e Facebook"), tr("Un unico referente per tutto")] },
              ]}
            />
          </div>
        </div>
      </section>

      {/* Come lavoriamo */}
      <section className="py-14 md:py-20">
        <div className="wrap">
          <SectionHead eyebrow={tr("Come lavoriamo")} title={tr("Prima mettiamo in ordine, poi teniamo tutto aggiornato.")} />
          <div className="mt-10">
            <Steps
              items={[
                { icon: "search", t: tr("Analisi"), d: tr("Guardiamo come appari oggi su Google, TripAdvisor e social, e cosa manca.") },
                { icon: "settings", t: tr("Sistemazione"), d: tr("Completiamo le schede, allineiamo orari, foto, menu e descrizioni.") },
                { icon: "chat", t: tr("Gestione"), d: tr("Ogni mese rispondiamo alle recensioni e pubblichiamo novità e foto.") },
                { icon: "chart", t: tr("Riepilogo"), d: tr("Ti mandiamo un resoconto semplice: cosa abbiamo fatto e cosa è cambiato.") },
              ]}
            />
          </div>
        </div>
      </section>

      {/* Collegamento all'altro servizio */}
      <section className="py-10 md:py-14">
        <div className="wrap">
          <Reveal>
            <Link href="/servizi/foto-e-video/" className="group flex flex-col gap-6 rounded-[28px] border border-line bg-white p-6 transition-colors hover:border-[#d4d4cf] md:flex-row md:items-center md:justify-between md:p-10">
              <div className="max-w-[640px]">
                <p className="eyebrow">{tr("Va insieme a")}</p>
                <h2 className="mt-3 text-[26px] font-semibold leading-tight tracking-[-0.025em] text-ink md:text-[32px]">{tr("Una scheda perfetta ha bisogno di foto all'altezza.")}</h2>
                <p className="mt-3 text-[16px] text-muted">{tr("Con il servizio foto e video fotografiamo piatti e locale, pronti per Google, TripAdvisor e social.")}</p>
              </div>
              <span className="btn btn-light flex-none">
                {tr("Scopri foto e video")}
                <Icon name="arrowRight" size={16} stroke={2} className="transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          </Reveal>
        </div>
      </section>

      <Faq items={faq()} />

      {/* Chiusura */}
      <section className="pb-20 md:pb-24">
        <div className="wrap">
          <div className="flex flex-col items-start gap-6 rounded-[28px] bg-ink p-8 md:flex-row md:items-center md:justify-between md:p-12">
            <div>
              <h2 className="h-section text-[#fafaf8]">{tr("Vuoi sapere come appari oggi online?")}</h2>
              <p className="mt-3 text-[17px] text-[#a1a1aa]">{tr("Ti mandiamo una prima analisi della tua scheda Google, senza impegno.")}</p>
            </div>
            <Link href="/contatti/" className="btn btn-dark flex-none">
              {tr("Chiedi l'analisi")}
              <Icon name="arrowRight" size={16} stroke={2} />
            </Link>
          </div>
        </div>
      </section>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: tr("Gestione della presenza online per ristoranti"),
          serviceType: tr("Gestione Google Business Profile, TripAdvisor e canali social"),
          provider: { "@type": "Organization", name: "NovaMenu", url: site.url },
          areaServed: "IT",
          description,
        }}
      />
    </>
  );
}

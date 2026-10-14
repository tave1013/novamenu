import { getLocale, t, tr } from "@/i18n";
import type { Metadata } from "next";
import Link from "next/link";
import { Icon, type IconName } from "@/components/Icon";
import { Breadcrumbs, Faq, Hl, JsonLd } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { ArtSplit, Packages, PhotoSlot, SectionHead, Steps } from "@/components/Servizi";
import { site } from "@/config/site";
import { pageMeta } from "@/config/seo";
import { lp } from "@/i18n/link";
import type { Locale } from "@/i18n/config";

const description = (locale: Locale) =>
  t(locale, "Piano editoriale, post, reel e storie per Instagram e Facebook, pubblicati con costanza e con il tono del tuo locale. Tu approvi, noi pensiamo al resto.");

export const meta = (locale: Locale): Metadata =>
  pageMeta({ locale, page: "service", id: "gestione-social", title: t(locale, "Gestione social per ristoranti e pizzerie"), description: description(locale) });

const faq = () => ([
  { q: tr("Devo darvi le password dei miei profili?"), a: tr("No. Ci aggiungi come collaboratori dalla tua pagina Meta, così pubblichiamo per conto tuo senza conoscere le tue password. Puoi toglierci l'accesso quando vuoi.") },
  { q: tr("Posso vedere i post prima che escano?"), a: tr("Sì. A inizio mese ti mandiamo il piano con i contenuti già pronti: approvi, chiedi modifiche o aggiungi idee, e solo dopo li programmiamo.") },
  { q: tr("Le foto da dove arrivano?"), a: tr("Possiamo usare le tue, oppure organizzare uno shooting nel locale con il nostro servizio foto e video. Nel pacchetto Completo lo shooting è già incluso.") },
  { q: tr("Rispondete anche a commenti e messaggi?"), a: tr("Sì, nei pacchetti che lo prevedono rispondiamo ai commenti e ai messaggi più semplici con il tono del tuo locale. Per prenotazioni e richieste particolari ti giriamo il messaggio.") },
  { q: tr("Fate anche le sponsorizzate?"), a: tr("Sì, possiamo gestire campagne a pagamento su Instagram e Facebook per un evento, un nuovo menu o la tua zona. Il budget delle campagne lo decidi tu ed è a parte.") },
  { q: tr("C'è un vincolo lungo?"), a: tr("No. Per vedere risultati serve costanza, per questo consigliamo almeno tre mesi, ma puoi fermarti quando vuoi con un mese di preavviso.") },
]);

const included = (): { icon: IconName; t: string; d: string }[] => ([
  { icon: "calendarCheck", t: tr("Piano editoriale"), d: tr("Ogni mese decidiamo insieme cosa pubblicare e quando, in base a menu, stagioni ed eventi.") },
  { icon: "grid", t: tr("Post e caroselli"), d: tr("Grafiche curate con i colori del tuo locale, testi scritti per far fermare chi scorre.") },
  { icon: "play", t: tr("Reel e storie"), d: tr("Video brevi e storie per far vedere cosa succede in cucina e in sala.") },
  { icon: "send", t: tr("Pubblicazione"), d: tr("Programmiamo tutto negli orari giusti, così il profilo resta vivo anche quando sei di corsa.") },
  { icon: "chat", t: tr("Commenti e messaggi"), d: tr("Rispondiamo alle domande più semplici e ti giriamo quello che conta.") },
  { icon: "star", t: tr("Profilo in ordine"), d: tr("Bio, link al menu e alle prenotazioni, storie in evidenza sempre aggiornate.") },
  { icon: "bolt", t: tr("Sponsorizzate"), d: tr("Campagne mirate nella tua zona per un evento o un nuovo menu, se vuoi crescere più in fretta.") },
  { icon: "chart", t: tr("Riepilogo mensile"), d: tr("Un resoconto semplice: cosa abbiamo pubblicato, cosa è piaciuto e cosa fare il mese dopo.") },
]);

const formats = () => ([
  { t: tr("Post"), d: tr("Il piatto, la novità, il momento") },
  { t: tr("Caroselli"), d: tr("Consigli e storie in più slide") },
  { t: tr("Reel"), d: tr("Video brevi in verticale") },
  { t: tr("Storie"), d: tr("Il giorno per giorno del locale") },
  { t: tr("In evidenza"), d: tr("Menu, orari, prenota, dove siamo") },
]);

const artBox = "relative rounded-[28px] bg-mist p-6 md:p-10";

/** Il piano della settimana con i contenuti programmati. */
function CalendarArt() {
  const rows = [
    { d: tr("Mar"), h: "12:30", t: tr("Reel"), n: tr("L'impasto del giorno"), c: "bg-lime text-forest" },
    { d: tr("Gio"), h: "18:00", t: tr("Carosello"), n: tr("Tre pizze d'autunno"), c: "bg-forest text-[#e9f8dd]" },
    { d: tr("Ven"), h: "19:30", t: tr("Storia"), n: tr("Stasera musica dal vivo"), c: "bg-white text-ink ring-1 ring-line" },
    { d: tr("Sab"), h: "11:00", t: tr("Post"), n: tr("La novità in menu"), c: "bg-lime-soft text-forest" },
  ];
  return (
    <div className={artBox}>
      <div className="rounded-[20px] border border-line bg-white p-4 md:p-5">
        <div className="flex items-center justify-between gap-3">
          <p className="text-[15px] font-semibold tracking-[-0.015em] text-ink">{tr("Piano della settimana")}</p>
          <span className="rounded-full bg-[#dcfce7] px-2.5 py-1 text-[12px] font-medium text-[#166534]">{tr("Approvato")}</span>
        </div>
        <ul className="mt-4 flex flex-col gap-2">
          {rows.map((r) => (
            <li key={r.h} className="flex items-center gap-3 rounded-[14px] bg-mist p-2.5">
              <span className="flex w-12 flex-none flex-col items-center rounded-[10px] bg-white py-1.5">
                <span className="text-[12px] font-semibold text-ink">{r.d}</span>
                <span className="font-mono text-[10.5px] text-faint">{r.h}</span>
              </span>
              <span className="min-w-0 flex-1 truncate text-[14px] text-ink">{r.n}</span>
              <span className={`flex-none rounded-full px-2.5 py-1 text-[11.5px] font-medium ${r.c}`}>{r.t}</span>
            </li>
          ))}
        </ul>
      </div>
      <p className="mt-5 text-center text-[13px] font-medium text-forest">{tr("Tu approvi, noi programmiamo")}</p>
    </div>
  );
}

/** Commento con la risposta del locale. */
function CommunityArt() {
  return (
    <div className={artBox}>
      <div className="rounded-[18px] border border-line bg-white p-5">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#fde68a] text-[13px] font-semibold text-[#92400e]">M</span>
          <p className="text-[14px] text-text">
            <span className="font-medium text-ink">marta.r</span> {tr("Che buona! È disponibile anche senza lattosio?")}
          </p>
        </div>
        <div className="mt-4 flex items-start gap-3 rounded-[14px] bg-mist p-3.5">
          <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-ink text-white">
            <Icon name="pizza" size={14} />
          </span>
          <p className="text-[13.5px] leading-relaxed text-text">
            <span className="font-medium text-ink">{tr("iltuolocale")}</span> {tr("Ciao Marta! Sì, la facciamo con mozzarella senza lattosio, basta chiederlo quando ordini 😊")}
          </p>
        </div>
      </div>
      <div className="ml-8 mt-3 flex items-center gap-3 rounded-[18px] bg-forest p-4 text-[#fafaf8]">
        <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-lime text-forest">
          <Icon name="chat" size={16} />
        </span>
        <p className="text-[13.5px] leading-snug text-[#e3eed8]">{tr("Richiesta di prenotazione per 6 persone, girata al locale su WhatsApp")}</p>
      </div>
      <p className="mt-4 text-center text-[11.5px] text-faint">{tr("Esempio illustrativo")}</p>
    </div>
  );
}

export default function GestioneSocialPage() {
  return (
    <>
      {/* Apertura: testo al centro e immagine grande sotto */}
      <section className="overflow-x-clip pb-10 pt-6 md:pb-16 md:pt-8">
        <div className="wrap">
          <Breadcrumbs items={[{ name: tr("Servizi"), href: lp("/servizi/") }, { name: tr("Gestione social"), href: lp("/servizi/gestione-social/") }]} />
          <div className="mx-auto mt-10 max-w-[860px] text-center md:mt-12">
            <span className="anim-fade-up inline-flex items-center gap-2 rounded-full bg-lime-soft px-3 py-1.5 text-[13.5px] font-medium text-forest">
              <Icon name="heart" size={16} />
              {tr("Servizio gestione social")}
            </span>
            <h1 className="display anim-fade-up mt-6" style={{ animationDelay: "80ms" }}>
              <Hl text={tr("Tu pensi al locale, ai tuoi social pensiamo noi.")} word={tr("pensiamo noi")} />
            </h1>
            <p className="lead anim-fade-up mx-auto mt-6 max-w-[620px]" style={{ animationDelay: "160ms" }}>
              {tr("Piano editoriale, post, reel e storie pubblicati con costanza su Instagram e Facebook, con il tono del tuo locale. Tu approvi, noi facciamo il resto.")}
            </p>
            <div className="anim-fade-up mt-8 flex flex-col justify-center gap-3 sm:flex-row" style={{ animationDelay: "240ms" }}>
              <Link href={lp("/contatti/")} className="btn btn-dark">
                {tr("Chiedi un preventivo")}
                <Icon name="arrowRight" size={16} stroke={2} />
              </Link>
              <a href="#compreso" className="btn btn-light">
                {tr("Cosa è compreso")}
              </a>
            </div>
          </div>

          <div className="anim-fade-up relative mx-auto mt-12 max-w-[1080px] md:mt-16" style={{ animationDelay: "300ms" }}>
            <PhotoSlot
              src="/images/servizi/social-01-hero.webp"
              alt={tr("Titolare di una pizzeria che guarda sul telefono il profilo Instagram del suo locale, al bancone")}
              label={tr("Foto social 1 · Il titolare con il profilo del locale sul telefono (16:9)")}
              className="aspect-[4/3] rounded-[28px] md:aspect-[16/9]"
            />
            <div className="absolute -left-3 top-8 hidden rounded-[18px] border border-line bg-white px-4 py-3 shadow-[0_18px_40px_-24px_rgba(0,0,0,.35)] md:block lg:-left-8">
              <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-faint">{tr("Programmato")}</p>
              <p className="mt-1 text-[14.5px] font-medium text-ink">{tr("Venerdì 19:00 · Reel della serata")}</p>
            </div>
            <div className="absolute -right-3 bottom-10 hidden items-center gap-3 rounded-[18px] border border-line bg-white px-4 py-3 shadow-[0_18px_40px_-24px_rgba(0,0,0,.35)] md:flex lg:-right-8">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-lime-soft text-forest">
                <Icon name="check" size={16} stroke={2.4} />
              </span>
              <div>
                <p className="text-[14.5px] font-medium text-ink">{tr("Piano del mese approvato")}</p>
                <p className="text-[12.5px] text-muted">{tr("12 contenuti pronti")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cosa è compreso */}
      <section id="compreso" className="scroll-mt-24 py-14 md:py-20">
        <div className="wrap">
          <SectionHead eyebrow={tr("Cosa è compreso")} title={<Hl text={tr("Tutto quello che serve a un profilo vivo, ogni mese.")} word={tr("vivo")} />} text={tr("Dall'idea alla pubblicazione, fino alle risposte ai clienti. Scegli il pacchetto e decidi tu quanto spazio darci.")} />
          <div className="mt-10 grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4">
            {included().map((c, i) => (
              <Reveal key={c.t} delay={(i % 4) * 60}>
                <div className="h-full rounded-[20px] border border-line bg-white p-4 md:rounded-[22px] md:p-6">
                  <span className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-lime-soft text-forest md:h-11 md:w-11">
                    <Icon name={c.icon} size={19} />
                  </span>
                  <h3 className="mt-4 text-[15.5px] font-semibold tracking-[-0.015em] text-ink md:mt-5 md:text-[17px]">{c.t}</h3>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-muted md:mt-2 md:text-[14.5px]">{c.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Formati: fascia scura */}
      <section className="py-10 md:py-14">
        <div className="wrap">
          <div className="overflow-hidden rounded-[28px] bg-forest p-6 md:p-12">
            <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center">
              <div>
                <p className="eyebrow" style={{ color: "#9fe870" }}>{tr("I formati")}</p>
                <h2 className="h-section mt-3 text-[#fafaf8]">{tr("Ogni contenuto nel formato giusto, per farsi vedere davvero.")}</h2>
                <p className="mt-4 text-[17px] leading-relaxed text-[#b9cfa8]">
                  {tr("Alterniamo post, caroselli, reel e storie, così il tuo profilo non è mai ripetitivo e raggiunge anche chi ancora non ti segue.")}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {formats().map((f, i) => (
                  <div key={f.t} className={`rounded-[18px] p-4 ${i === 2 ? "bg-lime text-forest" : "bg-white/[.06]"}`}>
                    <p className={`text-[16px] font-semibold tracking-[-0.015em] ${i === 2 ? "text-forest" : "text-white"}`}>{f.t}</p>
                    <p className={`mt-1 text-[13.5px] ${i === 2 ? "text-forest/80" : "text-[#b9cfa8]"}`}>{f.d}</p>
                  </div>
                ))}
                <div className="flex items-center justify-center rounded-[18px] border border-dashed border-white/20 p-4 text-center text-[13.5px] text-[#b9cfa8]">
                  {tr("Più le campagne sponsorizzate, se servono")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Righe alternate */}
      <section className="flex flex-col gap-20 py-14 md:gap-28 md:py-20">
        <ArtSplit
          side="left"
          visual={<CalendarArt />}
          eyebrow={tr("Costanza")}
          title={tr("Un profilo che pubblica sempre, anche nelle settimane più piene.")}
          text={tr("Il problema dei social nei locali non sono le idee, è il tempo. Prepariamo il piano a inizio mese, tu lo approvi in cinque minuti e da lì pubblichiamo noi, negli orari in cui i tuoi clienti guardano il telefono.")}
          points={[tr("Piano mensile da approvare in pochi minuti"), tr("Contenuti legati a menu, stagioni ed eventi"), tr("Pubblicazione negli orari migliori")]}
        />
        <ArtSplit
          side="right"
          visual={<PhotoSlot src="/images/servizi/social-02-contenuti.webp" alt={tr("Primo piano di una pizza con salame piccante, pomodorini, basilico e origano")} label={tr("Foto social 2 · Contenuti girati nel locale (4:5)")} className="mx-auto aspect-[4/5] w-full max-w-[320px] rounded-[24px] lg:h-[calc(100%-42px)] lg:w-auto lg:max-w-none" />}
          visualClassName="lg:flex lg:flex-col lg:justify-end lg:self-stretch"
          eyebrow={tr("Contenuti")}
          title={tr("Il tuo locale merita foto vere, non immagini fatte con l'AI.")}
          text={tr("Pubblicare foto generate con l'intelligenza artificiale per promuovere il tuo locale non funziona: i clienti se ne accorgono e si fidano di meno. Hai un buon prodotto e ci dedichi ore ogni giorno, almeno valorizzalo come si deve. Raccontiamo i tuoi piatti, il tuo forno e le persone che ci lavorano, con un tono riconoscibile che fa venire voglia di passare.")}
          points={[tr("Solo foto e video veri del tuo locale"), tr("Grafiche coerenti con i colori del locale"), tr("Testi scritti per far fermare chi scorre")]}
        />
        <ArtSplit
          side="left"
          visual={<CommunityArt />}
          eyebrow={tr("Clienti")}
          title={tr("Ogni commento riceve una risposta, ogni richiesta arriva a te.")}
          text={tr("Un messaggio senza risposta è un cliente che va altrove. Rispondiamo alle domande più comuni con il tono del tuo locale e ti giriamo subito prenotazioni e richieste importanti.")}
          points={[tr("Risposte rapide a commenti e messaggi"), tr("Prenotazioni girate subito al locale"), tr("Le situazioni delicate le decidi tu")]}
        />
      </section>

      {/* Pacchetti */}
      <section id="pacchetti" className="scroll-mt-24 py-14 md:py-20">
        <div className="wrap">
          <SectionHead center eyebrow={tr("Pacchetti")} title={tr("Scegli quanto spazio darci, al resto pensiamo noi.")} text={tr("Puoi partire con il pacchetto base e crescere quando vedi i risultati.")} />
          <div className="mt-12">
            <Packages
              note={tr("Il prezzo dipende dal numero di contenuti e dai canali: ti mandiamo un preventivo chiaro, senza vincoli lunghi.")}
              items={[
                { name: tr("Base"), for: tr("Un profilo sempre attivo"), price: tr("Su preventivo"), points: [tr("Piano editoriale mensile"), tr("8 contenuti tra post e caroselli"), tr("Storie nei giorni importanti"), tr("Bio e storie in evidenza in ordine")] },
                { name: tr("Crescita"), for: tr("Più contenuti e più clienti"), price: tr("Su preventivo"), popular: true, points: [tr("Tutto quello del Base"), tr("12 contenuti con reel inclusi"), tr("Risposte a commenti e messaggi"), tr("Riepilogo mensile semplice")] },
                { name: tr("Completo"), for: tr("Social e shooting insieme"), price: tr("Su preventivo"), points: [tr("Tutto quello del Crescita"), tr("Shooting foto e video incluso"), tr("Gestione delle sponsorizzate"), tr("Un unico referente per tutto")] },
              ]}
            />
          </div>
        </div>
      </section>

      {/* Come lavoriamo */}
      <section className="py-14 md:py-20">
        <div className="wrap">
          <SectionHead eyebrow={tr("Come lavoriamo")} title={tr("Una chiamata per partire, poi il profilo va avanti da solo.")} />
          <div className="mt-10">
            <Steps
              items={[
                { icon: "phone", t: tr("Ci conosciamo"), d: tr("Parliamo del locale, dei clienti che vuoi raggiungere e del tono giusto.") },
                { icon: "calendarCheck", t: tr("Piano del mese"), d: tr("Ti mandiamo i contenuti pronti: approvi o chiedi modifiche.") },
                { icon: "send", t: tr("Pubblichiamo"), d: tr("Programmiamo tutto e rispondiamo a commenti e messaggi.") },
                { icon: "chart", t: tr("Riepilogo"), d: tr("A fine mese vedi cosa ha funzionato e cosa fare dopo.") },
              ]}
            />
          </div>
        </div>
      </section>

      {/* Collegamento al servizio foto */}
      <section className="py-10 md:py-14">
        <div className="wrap">
          <Reveal>
            <Link href={lp("/servizi/foto-e-video/")} className="group flex flex-col gap-6 rounded-[28px] border border-line bg-white p-6 transition-colors hover:border-[#d4d4cf] md:flex-row md:items-center md:justify-between md:p-10">
              <div className="max-w-[640px]">
                <p className="eyebrow">{tr("Va insieme a")}</p>
                <h2 className="mt-3 text-[26px] font-semibold leading-tight tracking-[-0.025em] text-ink md:text-[32px]">{tr("Ti mancano le foto per partire? Le facciamo noi, nel tuo locale.")}</h2>
                <p className="mt-3 text-[16px] text-muted">{tr("Con il servizio foto e video prepariamo una scorta di scatti e video da usare sui social per settimane.")}</p>
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
              <h2 className="h-section text-[#fafaf8]">{tr("Vuoi un parere sui tuoi profili social?")}</h2>
              <p className="mt-3 text-[17px] text-[#a1a1aa]">{tr("Ti diciamo cosa funziona e cosa migliorare, senza impegno.")}</p>
            </div>
            <Link href={lp("/contatti/")} className="btn btn-dark flex-none">
              {tr("Chiedi un parere")}
              <Icon name="arrowRight" size={16} stroke={2} />
            </Link>
          </div>
        </div>
      </section>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: tr("Gestione social per ristoranti"),
          serviceType: tr("Social media management per Instagram e Facebook"),
          provider: { "@type": "Organization", name: "NovaMenu", url: site.url },
          areaServed: "IT",
          description: description(getLocale()),
        }}
      />
    </>
  );
}

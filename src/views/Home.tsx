import { getLocale, t, tr } from "@/i18n";
import Link from "next/link";
import { signupUrl, site } from "@/config/site";
import { pageMeta, siteDescription, softwareApplicationLd } from "@/config/seo";
import { getListino } from "@/lib/prezzi/listino";
import type { Metadata } from "next";
import type { Locale } from "@/i18n/config";
import { Icon, IconTile, toneClass } from "@/components/Icon";
import { Check, CtaBand, Faq, JsonLd } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { DashboardDemo } from "@/components/visuals/DashboardDemo";
import { FeatureVisual } from "@/components/visuals/FeatureVisual";
import { MenuVisual } from "@/components/visuals/VisualsA";
import { Bento } from "@/components/Bento";
import { Pricing } from "@/components/Pricing";
import { Reviews } from "@/components/Reviews";
import { FeatureComposite } from "@/components/StaticArt";
import { PhotoSplit } from "@/components/PhotoReveal";
import { ArtSplit, PhotoSlot } from "@/components/Servizi";
import { featureById, getGeneralFaq, getSectors } from "@/content";
import { to, lp } from "@/i18n/link";

export const meta = (locale: Locale): Metadata =>
  pageMeta({
    locale,
    page: "home",
    title: `${t(locale, "Menu digitale, ordini e prenotazioni per locali")} | ${site.name}`,
    description: siteDescription(locale),
    absolute: true,
  });

/** Le funzionalità raccontate in grande, con animazione e testo alternati. */
const spotlight = () => ([
  {
    slug: "importa-menu-ai",
    tag: tr("Carica il menu"),
    title: tr("Una foto del menu di carta. L'AI fa il resto."),
    text: tr("Carichi una foto o un PDF: piatti, prezzi, ingredienti e allergeni vengono letti e messi in ordine nelle categorie. Tu controlli e pubblichi."),
    points: [tr("Foto, PDF o più pagine insieme"), tr("Allergeni proposti dagli ingredienti"), tr("Niente va online finché non lo decidi tu")],
  },
  {
    slug: "ordini-whatsapp",
    still: true,
    tag: tr("Ordini da asporto"),
    title: tr("Il cliente ordina. Tu ricevi tutto scritto su WhatsApp."),
    text: tr("Il cliente sceglie dal menu e l'ordine arriva sul WhatsApp del locale con piatti, orario di ritiro e totale. Senza commissioni e senza telefonate nel pieno del servizio."),
    points: [tr("Fasce di ritiro con limite di ordini"), tr("Pausa ordini con un tocco"), tr("0% di commissioni, l'incasso è tutto tuo")],
  },
  {
    slug: "prenotazioni",
    tag: tr("Prenotazioni"),
    title: tr("Le prenotazioni arrivano anche di notte. Tu confermi con un tocco."),
    text: tr("Il cliente sceglie giorno, orario e persone tra i posti davvero liberi. Tu accetti e lui riceve la conferma su WhatsApp."),
    points: [tr("Solo gli orari disponibili"), tr("Seggiolini e note per allergie"), tr("Promemoria che riduce i tavoli vuoti")],
  },
  {
    slug: "assistente",
    still: true,
    tag: tr("Assistente vocale"),
    title: tr("Hai le mani in pasta? Mandagli un vocale."),
    text: tr("\"Tonnarelli finiti, stasera chiudiamo alle 22.\" L'assistente su Telegram capisce, ti chiede conferma e aggiorna menu, orari e prenotazioni."),
    points: [tr("Vocale o messaggio scritto"), tr("Conferma prima di ogni modifica"), tr("Lo usa solo chi autorizzi tu")],
  },
  {
    slug: "traduzioni",
    tag: tr("Menu tradotto"),
    title: tr("Il turista legge il menu nella sua lingua."),
    text: tr("Il menu si apre da solo nella lingua del telefono: inglese, francese, tedesco o spagnolo. Il cameriere non traduce più ogni piatto e i nomi tipici restano in italiano, con la spiegazione."),
    points: [tr("Traduzione di tutto il menu in un tocco"), tr("Allergeni tradotti correttamente"), tr("Ogni frase si può ritoccare a mano")],
  },
] as { slug: string; still?: boolean; tag: string; title: string; text: string; points: string[] }[]);

const heroCards = () => ([
  { icon: "chat" as const, tone: "green", t: tr("Nuovo ordine da asporto"), d: tr("Ritiro alle 19:45, 3 pizze"), pos: "left-0 top-20", f: "float2", delay: "400ms" },
  { icon: "calendarCheck" as const, tone: "blue", t: tr("Prenotazione accettata"), d: tr("Sabato 20:30, 4 persone"), pos: "right-0 top-64", f: "float3", delay: "1000ms" },
  { icon: "globe" as const, tone: "amber", t: tr("Menu tradotto in 4 lingue"), d: tr("Inglese, francese, tedesco, spagnolo"), pos: "left-2 bottom-16", f: "float1", delay: "1600ms" },
]);

export default async function Home() {
  const listino = await getListino();
  return (
    <>
      <JsonLd data={softwareApplicationLd(getLocale(), listino)} />

      {/* Apertura */}
      <section className="overflow-hidden pb-14 pt-10 md:pb-20 md:pt-16">
        <div className="wrap grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <div className="anim-fade-up inline-flex flex-wrap items-center gap-2 rounded-full border border-line bg-white py-1.5 pl-1.5 pr-3 text-[13px]">
              <span className="rounded-full bg-lime px-2 py-0.5 font-medium text-forest">{tr("Per la ristorazione")}</span>
              <span className="hidden text-muted sm:inline">{tr("Ristoranti, pizzerie, bar, pub e botteghe del cibo")}</span>
            </div>
            <h1 className="display anim-fade-up mt-5" style={{ animationDelay: "60ms" }}>
              {tr("Tutto il tuo locale, gestito dal")}{" "}<span className="hl">{tr("telefono")}</span>.
            </h1>
            <p className="anim-fade-up mt-5 max-w-[560px] text-[19px] leading-[1.55] text-muted" style={{ animationDelay: "120ms" }}>
              {tr("Gli ordini da asporto arrivano scritti su WhatsApp, i tavoli si prenotano online e il menu lo aggiorni dal telefono, partendo da una foto. Senza commissioni sugli ordini.")}
            </p>
            <div className="anim-fade-up mt-7 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap" style={{ animationDelay: "180ms" }}>
              <a href={signupUrl} className="btn btn-dark">
                {tr("Prova gratis 14 giorni")}
                <Icon name="arrowRight" size={16} stroke={2} />
              </a>
              <Link href={lp("/demo/")} className="btn btn-light">
                <Icon name="calendarCheck" size={16} stroke={2} />
                {tr("Prenota una demo")}
              </Link>
            </div>
            <ul className="anim-fade-up mt-6 flex flex-wrap gap-x-5 gap-y-2 text-[13.5px] text-muted" style={{ animationDelay: "220ms" }}>
              {[tr("Nessuna carta richiesta"), tr("Zero commissioni sugli ordini"), tr("Assistenza in italiano")].map((x) => (
                <li key={x} className="flex items-center gap-1.5">
                  <Check />
                  {x}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative flex min-h-[540px] justify-center">
            <div aria-hidden className="pointer-events-none absolute -inset-x-10 -bottom-10 -top-6 [background:radial-gradient(48%_48%_at_50%_45%,rgba(159,232,112,.42),transparent_70%),radial-gradient(35%_35%_at_82%_78%,rgba(159,232,112,.25),transparent_70%)]" />
            <div className="relative pt-4">
              <MenuVisual bare />
            </div>
            {heroCards().map((c) => (
              <div
                key={c.t}
                className={`absolute z-30 hidden sm:block ${c.pos}`}
                style={{ animation: `pop .7s cubic-bezier(.2,.8,.2,1) ${c.delay} both` }}
              >
                <div className={`${c.f} flex w-[250px] items-center gap-2.5 rounded-[14px] border border-line bg-white px-3 py-2.5 shadow-[0_18px_40px_-24px_rgba(0,0,0,.3)]`}>
                  <span className={`flex h-8 w-8 flex-none items-center justify-center rounded-[9px] ${toneClass[c.tone].bg} ${toneClass[c.tone].ink}`}>
                    <Icon name={c.icon} size={16} stroke={2} />
                  </span>
                  <span className="min-w-0 text-[12px] leading-[1.35]">
                    <span className="block font-semibold text-ink">{c.t}</span>
                    <span className="block text-[#71717a]">{c.d}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tipi di attività */}
      <section aria-label={tr("Per chi è")} className="border-y border-line bg-white py-5">
        <div className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)]">
          <ul className="flex w-max items-center gap-12 [animation:marquee_40s_linear_infinite] hover:[animation-play-state:paused]">
            {[...getSectors(), ...getSectors()].map((s, i) => (
              <li key={i} aria-hidden={i >= getSectors().length} className="flex items-center gap-12">
                <Link
                  href={to("sector", s.id)}
                  tabIndex={i >= getSectors().length ? -1 : 0}
                  className="flex items-center gap-2.5 whitespace-nowrap text-[22px] font-medium tracking-[-0.02em] text-[#3f3f46] transition-colors hover:text-ink"
                >
                  <Icon name={s.icon} size={22} stroke={1.8} className="flex-none" />
                  {s.name}
                </Link>
                <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-[#d4d4d8]" />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* La dashboard */}
      <section className="pt-20 md:pt-26">
        <div className="wrap">
          <Reveal className="mx-auto max-w-[760px] text-center">
            <p className="eyebrow">{tr("La dashboard")}</p>
            <h2 className="h-section mt-3">{tr("Tutto quello che succede nel locale, in una schermata.")}</h2>
            <p className="lead mx-auto mt-4 max-w-[600px]">
              {tr("Prenotazioni da confermare, piatti esauriti, ordini in arrivo. Dal computer alla cassa o dal telefono in sala.")}
            </p>
          </Reveal>
          <Reveal delay={120} className="mt-12">
            <DashboardDemo />
          </Reveal>
        </div>
      </section>

      {/* Funzionalità in evidenza */}
      <section id="funzionalita" className="pt-24 md:pt-32">
        <div className="wrap max-md:text-center">
          <p className="eyebrow">{tr("Cosa puoi fare")}</p>
          <h2 className="h-section mt-3 max-w-[820px]">{tr("Le cose che oggi fai a mano. Da domani le fai in un tocco.")}</h2>
        </div>
        <div className="mt-4" />
        {spotlight().map((s, i) => {
          const f = featureById(s.slug)!;
          const t = toneClass[f.tone];
          const textFirst = i % 2 === 1;
          return (
            <section key={s.slug} id={`f-${s.slug}`} className={`py-12 md:py-16 ${i > 0 ? "border-t border-line-soft" : ""}`}>
              <div className="wrap grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
                <Reveal className={`min-w-0 ${textFirst ? "lg:order-1" : "lg:order-2"}`}>
                  <span className={`inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-[13px] font-medium ${t.bg} ${t.ink}`}>
                    <Icon name={f.icon} size={14} stroke={2} />
                    {s.tag}
                  </span>
                  <h3 className="h-block mt-4">{s.title}</h3>
                  <p className="mt-3.5 text-[17px] leading-relaxed text-muted">{s.text}</p>
                  <ul className="mt-5 flex flex-col gap-2.5 text-[15px] text-text">
                    {s.points.map((p) => (
                      <li key={p} className="flex gap-2.5">
                        <Check className="mt-0.5" />
                        {p}
                      </li>
                    ))}
                  </ul>
                  <Link href={to("feature", f.id)} className="link-arrow mt-5 min-h-11 text-[15px]">
                    {tr("Scopri di più")}
                    <Icon name="arrowRight" size={15} stroke={2} />
                  </Link>
                </Reveal>
                <Reveal delay={150} className={`min-w-0 ${textFirst ? "lg:order-2" : "lg:order-1"}`}>
                  {s.still ? (
                    <FeatureComposite feature={f} title={s.tag} points={f.sections[0].points} note={{ title: f.benefits[0].title, text: f.benefits[0].text }} />
                  ) : (
                    <FeatureVisual k={f.visual} />
                  )}
                </Reveal>
              </div>
            </section>
          );
        })}
      </section>

      {/* E non è finita qui */}
      <section id="tutto" className="relative overflow-hidden border-t border-line-soft py-20 md:py-24">
        <div aria-hidden className="pointer-events-none absolute inset-0 [background:radial-gradient(45%_40%_at_0%_0%,rgba(159,232,112,.28),transparent_70%),radial-gradient(40%_40%_at_100%_100%,rgba(159,232,112,.2),transparent_70%)]" />
        <div className="wrap relative">
          <Reveal className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="eyebrow">{tr("E poi")}</p>
              <h2 className="h-section mt-3 max-w-[640px]">
                {tr("E non è")}{" "}<span className="hl">{tr("finita")}</span>{" "}{tr("qui.")}
              </h2>
              <p className="lead mt-3 max-w-[560px]">{tr("Le altre cose che fanno girare il locale, già incluse.")}</p>
            </div>
            <Link href={lp("/funzionalita/")} className="btn btn-light flex-none">
              {tr("Tutte le funzionalità")}
            </Link>
          </Reveal>
          <div className="mt-10">
            <Bento />
          </div>
        </div>
      </section>

      {/* Servizio extra: foto e video */}
      <section aria-label={tr("Foto e video per il tuo locale")} className="border-t border-line-soft py-20 md:py-26">
        <ArtSplit
          side="right"
          visual={<PhotoSlot src="/images/servizi/home-shooting.webp" alt={tr("Pizza bianca con friarielli e salsiccia vista dall'alto, su un tavolo di legno accanto al menu del locale")} label={tr("Foto home · Shooting nel locale")} className="aspect-[4/3] rounded-[24px]" />}
          eyebrow={tr("Servizio extra")}
          title={<>{tr("Ti servono foto e video")}{" "}<span className="hl">{tr("professionali")}</span>{" "}{tr("per il tuo locale?")}</>}
          text={tr("Organizziamo shooting su misura: il nostro team viene direttamente nel tuo locale e realizza le foto dei piatti per il menu, video brevi per i social e contenuti pronti da pubblicare. È un servizio a parte, lo aggiungi solo se ti serve.")}
          points={[tr("Pacchetti foto per i piatti del tuo menu"), tr("Video brevi per Instagram e TikTok"), tr("Contenuti pronti da pubblicare sui social")]}
        >
          <Link href={lp("/servizi/foto-e-video/")} className="link-arrow mt-6 min-h-11 text-[15px]">
            {tr("Guarda i pacchetti o chiedi un preventivo")}
            <Icon name="arrowRight" size={15} stroke={2} />
          </Link>
        </ArtSplit>
      </section>

      {/* Al fianco delle piccole e medie imprese */}
      <section aria-label={tr("Al fianco delle piccole e medie imprese")} className="border-t border-line-soft pb-10 pt-16 md:py-26">
        <PhotoSplit
          src="/images/settori/pasticceria.webp"
          alt={tr("Pasticcera sorridente nel suo laboratorio, con un dolce alla frutta in mano accanto alla vetrina")}
          pos="50% 30%"
          side="left"
          eyebrow={tr("Il nostro obiettivo")}
          title={<>{tr("Al fianco delle")}{" "}<span className="hl">{tr("piccole e medie")}</span>{" "}{tr("imprese.")}</>}
          text={tr("Una nova è una stella che esiste già e diventa più luminosa. È quello che vogliamo per la tua pizzeria, il tuo bar, la tua bottega: farti trovare online, lavorare con meno telefonate e far tornare i clienti.")}
          points={[tr("Pensato per chi ha poco tempo e nessun tecnico"), tr("Più visibilità su Google, Instagram e WhatsApp"), tr("Nessuna commissione: ogni euro resta nel locale")]}
        >
          <Link href={lp("/settori/")} className="link-arrow mt-6 min-h-11 text-[15px]">
            {tr("Scopri per chi lavoriamo")}
            <Icon name="arrowRight" size={15} stroke={2} />
          </Link>
        </PhotoSplit>
      </section>

      {/* Settori */}
      <section className="pb-16 pt-4 md:py-26">
        <div className="wrap">
          <Reveal>
            <p className="eyebrow">{tr("Per chi")}</p>
            <h2 className="h-section mt-3">{tr("Pensato per il tuo tipo di attività.")}</h2>
          </Reveal>
          <ul className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {getSectors().map((s) => (
              <li key={s.slug}>
                <Link
                  href={to("sector", s.id)}
                  className="lift group flex items-center gap-3.5 rounded-[14px] border border-line bg-white p-4 hover:border-[#d4d4d8]"
                >
                  <IconTile name={s.icon} tone={s.tone} size={38} radius={10} />
                  <span className="min-w-0 flex-1">
                    <span className="block text-[15.5px] font-semibold text-ink">{s.name}</span>
                    <span className="block text-[13.5px] text-muted">{s.short}</span>
                  </span>
                  <Icon name="chevronRight" size={16} stroke={2} className="text-faint transition-transform group-hover:translate-x-0.5" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Recensioni: subito prima dei prezzi, quando il visitatore decide */}
      <Reviews />

      {/* Prezzi */}
      <section id="prezzi" className="border-y border-line bg-white py-20 md:py-26">
        <div className="wrap">
          <Reveal className="text-center">
            <p className="eyebrow">{tr("Prezzi")}</p>
            <h2 className="h-section mt-3">{tr("Prezzi")}{" "}<span className="hl">{tr("chiari")}</span>{tr(". Disdici quando vuoi.")}</h2>
          </Reveal>
          <div className="mt-8">
            <Pricing listino={listino} />
          </div>
          <p className="mt-6 text-center">
            <Link href={lp("/prezzi/")} className="link-arrow min-h-11 text-[15px]">
              {tr("Confronta i piani nel dettaglio")}
              <Icon name="arrowRight" size={15} stroke={2} />
            </Link>
          </p>
        </div>
      </section>

      <Faq items={getGeneralFaq()} />
      <CtaBand />
    </>
  );
}

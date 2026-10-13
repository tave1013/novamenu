import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { Breadcrumbs, Faq, Hl, JsonLd } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { ArtSplit, Mosaic4, Packages, PhotoSlot, Portfolio, SectionHead, Steps } from "@/components/Servizi";
import { site } from "@/config/site";

const title = "Foto e video per ristoranti e pizzerie | NovaMenu";
const description =
  "Foto professionali dei tuoi piatti e video per i social, scattati nel tuo locale. Pronti per menu digitale, app di consegna, Google e Instagram.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/servizi/foto-e-video/" },
  openGraph: { title, description, url: "/servizi/foto-e-video/" },
};

const faq = [
  { q: "Devo chiudere il locale per lo shooting?", a: "No. Di solito lavoriamo nelle ore di chiusura o a metà pomeriggio, quando la cucina è più tranquilla, e portiamo noi luci e sfondi." },
  { q: "Cosa devo preparare?", a: "Solo i piatti, come li servi ai tuoi clienti. Al set, alle luci e agli accessori pensiamo noi." },
  { q: "Posso usare le foto dove voglio?", a: "Sì: menu digitale, Instagram, Facebook, Google, TripAdvisor, app di consegna e materiale stampato." },
  { q: "Fate anche video?", a: "Sì, video brevi in verticale per Instagram e TikTok, girati mentre lavori: l'impasto, il forno, il piatto che arriva in sala." },
  { q: "Il servizio è solo per chi usa NovaMenu?", a: "No, puoi richiederlo anche se non usi la piattaforma. Se la usi, carichiamo noi le foto direttamente nel tuo menu." },
];

function AppCard() {
  return (
    <div className="relative rounded-[28px] bg-mist p-6 md:p-10">
      <div className="mx-auto max-w-[360px] overflow-hidden rounded-[22px] border border-line bg-white shadow-[0_30px_60px_-36px_rgba(0,0,0,.4)]">
        <PhotoSlot src="/images/servizi/foto-05-asporto.webp" alt="Una pizza con pomodoro, stracciatella di burrata e basilico fotografata dall'alto su un tavolo di legno" label="Foto 5 · Piatto da asporto" className="aspect-[4/3]" />
        <div className="p-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[16px] font-semibold tracking-[-0.015em] text-ink">Pizza Margherita</p>
              <p className="mt-0.5 text-[13px] text-muted">Pomodoro, stracciatella di burrata, olio extravergine, basilico</p>
            </div>
            <span className="flex-none whitespace-nowrap text-[15px] font-semibold text-ink">8,00 €</span>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <span className="rounded-full bg-lime-soft px-2.5 py-1 text-[12px] font-medium text-forest">Consegna 25 min</span>
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ink text-white">
              <Icon name="plus" size={16} stroke={2.2} />
            </span>
          </div>
        </div>
      </div>
      <p className="mt-4 text-center text-[12px] text-faint">Esempio di scheda su un&apos;app di consegna</p>
    </div>
  );
}

function PhoneVideo() {
  return (
    <div className="relative rounded-[28px] bg-forest p-6 md:p-10">
      <div className="mx-auto w-[230px] rounded-[36px] bg-ink p-2.5 shadow-[0_40px_70px_-30px_rgba(0,0,0,.6)]">
        <div className="relative overflow-hidden rounded-[28px]">
          <PhotoSlot src="/images/servizi/foto-06-video.webp" alt="Un pizzaiolo che stende l'impasto, inquadratura verticale" label="Foto 6 · Fotogramma video verticale" className="aspect-[9/16]" />
          <div className="absolute inset-x-3 top-3 flex items-center gap-2">
            <span className="h-7 w-7 rounded-full bg-white/90" />
            <span className="text-[12px] font-medium text-white drop-shadow">iltuolocale</span>
          </div>
          <div className="absolute right-3 top-1/2 flex flex-col gap-3 text-white">
            {(["star", "chat", "send"] as const).map((i) => (
              <span key={i} className="flex h-8 w-8 items-center justify-center rounded-full bg-black/30 backdrop-blur">
                <Icon name={i} size={15} />
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FotoVideoPage() {
  return (
    <>
      {/* Apertura */}
      <section className="overflow-x-clip pb-14 pt-6 md:pb-20 md:pt-8">
        <div className="wrap">
          <Breadcrumbs items={[{ name: "Servizi", href: "/servizi/" }, { name: "Foto e video", href: "/servizi/foto-e-video/" }]} />
          <div className="mt-8 grid items-center gap-12 lg:mt-10 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
            <div>
              <span className="anim-fade-up inline-flex items-center gap-2 rounded-full bg-lime-soft px-3 py-1.5 text-[13.5px] font-medium text-forest">
                <Icon name="camera" size={16} />
                Servizio foto e video
              </span>
              <h1 className="display anim-fade-up mt-6" style={{ animationDelay: "80ms" }}>
                <Hl text="Foto che fanno venire fame, prima ancora del prezzo." word="fame" />
              </h1>
              <p className="lead anim-fade-up mt-6 max-w-[560px]" style={{ animationDelay: "160ms" }}>
                Fotografiamo i tuoi piatti nel tuo locale, con luci e set professionali, e ti consegniamo foto e video pronti per il menu, i social e le app di consegna.
              </p>
              <div className="anim-fade-up mt-8 flex flex-col gap-3 sm:flex-row" style={{ animationDelay: "240ms" }}>
                <Link href="/contatti/" className="btn btn-dark">
                  Chiedi un preventivo
                  <Icon name="arrowRight" size={16} stroke={2} />
                </Link>
                <a href="#pacchetti" className="btn btn-light">
                  Guarda i pacchetti
                </a>
              </div>
            </div>
            <div className="anim-fade-up relative" style={{ animationDelay: "200ms" }}>
              <PhotoSlot src="/images/servizi/foto-01-set.webp" alt="Set fotografico allestito nel locale: luci, sfondo e piatto pronto per lo scatto" label="Foto 1 · Il set fotografico nel locale" className="aspect-[4/5] rounded-[28px]" />
              <div className="absolute -left-4 top-10 hidden rounded-[18px] border border-line bg-white px-4 py-3 shadow-[0_18px_40px_-24px_rgba(0,0,0,.35)] md:block">
                <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-faint">Nel tuo locale</p>
                <p className="mt-1 text-[14.5px] font-medium text-ink">Luci, sfondi e set li portiamo noi</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quattro usi, una foto */}
      <section className="py-14 md:py-20">
        <div className="wrap">
          <SectionHead eyebrow="Un servizio, quattro usi" title={<Hl text="Le stesse foto lavorano per te ovunque." word="ovunque" />} text="Uno shooting fatto bene diventa il menu, la vetrina sulle app di consegna, i post della settimana e la scheda Google." />
          <div className="mt-10">
            <Mosaic4 src="/images/servizi/foto-02-tavola.webp" placeholder="Foto 2 · Una tavola vista dall'alto, formato panoramico 3:1" alt="Una tavola con quattro piatti vista dall'alto, divisa in quattro schede" labels={["Menu digitale", "App di consegna", "Instagram e Facebook", "Google e TripAdvisor"]} />
          </div>
        </div>
      </section>

      {/* Righe alternate */}
      <section className="flex flex-col gap-20 py-10 md:gap-28 md:py-16">
        <ArtSplit
          side="right"
          visual={<PhotoSlot src="/images/servizi/foto-03-piatto.webp" alt="Un piatto fotografato su sfondo neutro con luce morbida" label="Foto 3 · Un piatto su sfondo neutro" className="aspect-[4/3] rounded-[24px]" />}
          eyebrow="Piatti del menu"
          title="Il menu si sceglie con gli occhi, ogni piatto merita la sua foto."
          text="Fotografiamo ogni piatto con la stessa luce e lo stesso stile, così il tuo menu appare per quello che è: curato, coerente, invitante."
          points={["Sfondo neutro per il menu, scatti ambientati per i social", "Colori veri, niente cibo finto o ritoccato troppo", "Formati pronti per menu, stampa e schermo"]}
        />
        <ArtSplit
          side="left"
          visual={<PhotoSlot src="/images/servizi/foto-04-stagione.webp" alt="Un nuovo piatto di stagione impiattato su un tavolo di legno" label="Foto 4 · Un piatto di stagione" className="aspect-[4/3] rounded-[24px]" />}
          eyebrow="Menu di stagione"
          title="Nuovo piatto in carta? Lo fotografiamo prima che arrivi in sala."
          text="Ogni volta che cambi menu, in primavera, in estate o per le feste, torniamo a fotografare solo le novità. Il tuo menu resta sempre aggiornato, anche nelle immagini."
          points={["Sessioni brevi, solo per i piatti nuovi", "Stesso stile delle foto precedenti", "Pronte per il lancio sui social"]}
        />
        <ArtSplit
          side="right"
          visual={<AppCard />}
          eyebrow="App di consegna"
          title="Sulle app di consegna la foto è la prima cosa che si guarda."
          text="Su Glovo, Deliveroo e Just Eat il cliente scorre veloce e sceglie con gli occhi. Una foto chiara e invitante fa fermare il dito sul tuo piatto."
          points={["Inquadrature studiate per le schede delle app", "Una foto per ogni piatto, tutte uguali per stile", "Pronte da caricare, nelle misure giuste"]}
        />
        <ArtSplit
          side="left"
          visual={<PhoneVideo />}
          eyebrow="Video per i social"
          title="Video brevi per i social, girati mentre lavori."
          text="L'impasto che si allarga, il forno acceso, il piatto che arriva al tavolo. Sono i momenti che fanno venire voglia di entrare, e li riprendiamo senza fermare il servizio."
          points={["Video verticali per Reel e TikTok", "Montati, con testi e musica a scelta", "Una scorta di contenuti per settimane"]}
        />
      </section>

      <Portfolio
        eyebrow="Alcuni dei nostri lavori"
        title={<Hl text="Piatti, drink e locali, raccontati con la luce giusta." word="luce giusta" />}
        text="Pizze, birre, dolci, sale e persone al lavoro: ogni scatto pensato per far venire voglia di entrare."
      />

      {/* Eventi */}
      <section className="py-16 md:py-24">
        <div className="wrap">
          <div className="grid items-center gap-10 overflow-hidden rounded-[28px] bg-forest p-6 md:p-12 lg:grid-cols-[1fr_1fr]">
            <div>
              <p className="eyebrow" style={{ color: "#9fe870" }}>Per i momenti che contano</p>
              <h2 className="h-section mt-3 text-[#fafaf8]">Un evento speciale si racconta una volta sola, va fatto bene.</h2>
              <p className="mt-4 text-[17px] leading-relaxed text-[#b9cfa8]">
                Ci siamo anche nei giorni importanti del tuo locale, per lasciarti foto e video da usare per mesi.
              </p>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {[
                  { t: "Inaugurazione", d: "Il locale, lo staff e i primi clienti" },
                  { t: "Nuovo menu di stagione", d: "I piatti nuovi, pronti per il lancio" },
                  { t: "Catering ed eventi", d: "Buffet, cerimonie, feste private" },
                  { t: "Menu delle feste", d: "Natale, Pasqua, San Valentino" },
                ].map((e) => (
                  <div key={e.t} className="rounded-[18px] bg-white/[.06] p-4">
                    <p className="text-[15.5px] font-medium text-white">{e.t}</p>
                    <p className="mt-1 text-[13.5px] text-[#b9cfa8]">{e.d}</p>
                  </div>
                ))}
              </div>
            </div>
            <PhotoSlot src="/images/servizi/foto-07-evento.webp" alt="Lunga tavolata apparecchiata per un evento all'aperto, con candele, fiori e sedie dorate" label="Foto 7 · Un evento nel locale" className="aspect-[4/3] rounded-[22px]" />
          </div>
        </div>
      </section>

      {/* Pacchetti */}
      <section id="pacchetti" className="scroll-mt-24 py-14 md:py-20">
        <div className="wrap">
          <SectionHead center eyebrow="Pacchetti" title="Scegli quello che ti serve adesso." text="Puoi partire dal menu e aggiungere stagioni ed eventi quando servono." />
          <div className="mt-12">
            <Packages
              note="Il prezzo dipende dal numero di piatti e dalla città: ti mandiamo un preventivo chiaro, senza sorprese."
              items={[
                { name: "Menu", for: "Tutto il menu fotografato", price: "Su preventivo", points: ["Shooting nel tuo locale", "Fino a 15 piatti", "Sfondo neutro e scatti ambientati", "Foto ritoccate in alta risoluzione"] },
                { name: "Stagione", for: "Piatti nuovi e contenuti social", price: "Su preventivo", popular: true, points: ["Fino a 8 piatti nuovi", "3 video brevi verticali", "Foto del locale e dello staff", "Caricate nel tuo menu NovaMenu"] },
                { name: "Evento", for: "Inaugurazioni e serate speciali", price: "Su preventivo", points: ["Presenza durante l'evento", "Foto e video dell'atmosfera", "Selezione pronta per i social", "Foto per Google e TripAdvisor"] },
              ]}
            />
          </div>
        </div>
      </section>

      {/* Come lavoriamo */}
      <section className="py-14 md:py-20">
        <div className="wrap">
          <SectionHead eyebrow="Come lavoriamo" title="Dalla prima chiamata alle foto online, ci pensiamo noi." />
          <div className="mt-10">
            <Steps
              items={[
                { icon: "phone", t: "Ci sentiamo", d: "Scegliamo insieme i piatti, lo stile e dove userai le foto." },
                { icon: "calendarCheck", t: "Prepariamo il set", d: "Arriviamo con luci e sfondi, nel giorno e nell'ora che preferisci." },
                { icon: "camera", t: "Scattiamo e giriamo", d: "Foto dei piatti, del locale e video brevi, senza fermare il lavoro." },
                { icon: "image", t: "Consegniamo", d: "Foto ritoccate e video montati, pronti per menu, social e app." },
              ]}
            />
          </div>
        </div>
      </section>

      {/* Collegamento all'altro servizio */}
      <section className="py-10 md:py-14">
        <div className="wrap">
          <Reveal>
            <Link href="/servizi/presenza-online/" className="group flex flex-col gap-6 rounded-[28px] border border-line bg-white p-6 transition-colors hover:border-[#d4d4cf] md:flex-row md:items-center md:justify-between md:p-10">
              <div className="max-w-[640px]">
                <p className="eyebrow">Il passo dopo</p>
                <h2 className="mt-3 text-[26px] font-semibold leading-tight tracking-[-0.025em] text-ink md:text-[32px]">Le foto sono pronte, ora mettiamole dove i clienti ti cercano.</h2>
                <p className="mt-3 text-[16px] text-muted">Con il servizio di presenza online le portiamo su Google, TripAdvisor e sui tuoi canali, tutto coerente.</p>
              </div>
              <span className="btn btn-light flex-none">
                Scopri la presenza online
                <Icon name="arrowRight" size={16} stroke={2} className="transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          </Reveal>
        </div>
      </section>

      <Faq items={faq} />

      {/* Chiusura */}
      <section className="pb-20 md:pb-24">
        <div className="wrap">
          <div className="flex flex-col items-start gap-6 rounded-[28px] bg-ink p-8 md:flex-row md:items-center md:justify-between md:p-12">
            <div>
              <h2 className="h-section text-[#fafaf8]">Raccontaci il tuo locale, ti diciamo come fotografarlo.</h2>
              <p className="mt-3 text-[17px] text-[#a1a1aa]">Ti rispondiamo con un preventivo chiaro, senza impegno.</p>
            </div>
            <Link href="/contatti/" className="btn btn-dark flex-none">
              Chiedi un preventivo
              <Icon name="arrowRight" size={16} stroke={2} />
            </Link>
          </div>
        </div>
      </section>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Servizio foto e video per ristoranti",
          serviceType: "Fotografia gastronomica e video per social",
          provider: { "@type": "Organization", name: "NovaMenu", url: site.url },
          areaServed: "IT",
          description,
        }}
      />
    </>
  );
}

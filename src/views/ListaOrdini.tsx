import { tr } from "@/i18n";
import Link from "next/link";
import { signupUrl } from "@/config/site";
import { Icon, IconTile } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";
import { toneGlow } from "@/components/StaticArt";
import { Breadcrumbs, Check, Faq, Hl, PlanTag } from "@/components/ui";
import type { Feature } from "@/content/features";
import { lp, to } from "@/i18n/link";
import {
  FoglioA4,
  ListaOrdiniHero,
  PassoControlla,
  PassoSegna,
  PassoStampa,
  VisAvvisi,
  VisMagazzino,
  VisOrganizza,
  VisStampa,
  VisTeam,
  type Formato,
} from "@/components/visuals/ListaOrdini";

/*
 * Pagina della funzione Lista ordini. Ha più sezioni delle altre pagine delle funzionalità
 * (cinque blocchi con immagine e i tre formati del foglio), ma usa gli stessi componenti e lo stesso stile.
 * I testi stanno in src/content/features.ts e src/content/en/features.ts; le immagini in
 * src/components/visuals/ListaOrdini.tsx, una per componente, da sostituire con gli screenshot veri.
 */
const passi = [PassoSegna, PassoControlla, PassoStampa];
const blocchi = [VisOrganizza, VisMagazzino, VisTeam, VisStampa, VisAvvisi];
const formati: Formato[] = ["verticale", "orizzontale", "tabella"];

export function ListaOrdiniView({ f }: { f: Feature }) {
  return (
    <>
      {/* Apertura */}
      <section className="relative pb-12 pt-6 md:pb-16 md:pt-8">
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[520px] opacity-70 [mask-image:linear-gradient(180deg,#000,transparent)]" style={{ backgroundImage: toneGlow[f.tone] }} />
        <div className="wrap relative">
          <Breadcrumbs items={[{ name: tr("Funzionalità"), href: lp("/funzionalita/") }, { name: f.name, href: to("feature", f.id) }]} />
          <div className="mt-8 grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
            <div>
              <div className="anim-fade-up flex flex-wrap items-center gap-2.5">
                <IconTile name={f.icon} tone={f.tone} size={36} radius={10} />
                <span className="text-[15px] font-medium text-ink">{f.name}</span>
                <PlanTag plan={f.plan} />
              </div>
              <h1 className="anim-fade-up mt-5 text-[clamp(2.1rem,1.5rem+2.2vw,3.25rem)] font-semibold leading-[1.12] tracking-[-0.035em] md:leading-[1.05]" style={{ animationDelay: "60ms" }}>
                <Hl text={f.hero.title} word={tr("sempre in ordine")} />
              </h1>
              <p className="anim-fade-up mt-4 text-[17px] leading-relaxed text-muted" style={{ animationDelay: "120ms" }}>
                {f.hero.lead}
              </p>
              <div className="anim-fade-up mt-6 flex flex-col gap-2.5 sm:flex-row" style={{ animationDelay: "160ms" }}>
                <a href={signupUrl} className="btn btn-dark">
                  {tr("Prova gratis 14 giorni")}
                  <Icon name="arrowRight" size={16} stroke={2} />
                </a>
                <Link href={lp("/demo/")} className="btn btn-light">
                  <Icon name="calendarCheck" size={16} stroke={2} />
                  {tr("Prenota una demo")}
                </Link>
              </div>
              <p className="anim-fade-up mt-4 flex flex-wrap gap-x-4 gap-y-1 text-[13.5px] text-muted" style={{ animationDelay: "200ms" }}>
                {[tr("iPhone e iPad"), tr("Computer"), tr("Dati in tempo reale")].map((x) => (
                  <span key={x} className="inline-flex items-center gap-1.5">
                    <Icon name="check" size={14} stroke={2.4} className="text-[#16a34a]" />
                    {x}
                  </span>
                ))}
              </p>
            </div>
            <div className="anim-fade-up min-w-0" style={{ animationDelay: "200ms" }}>
              <ListaOrdiniHero />
            </div>
          </div>
        </div>
      </section>

      {/* Come funziona: tre passi con la loro illustrazione */}
      <section className="border-y border-line bg-white py-12 md:py-16">
        <div className="wrap">
          <h2 className="eyebrow">{tr("Come funziona")}</h2>
          <ol className="mt-6 grid gap-6 md:grid-cols-3 md:gap-6">
            {f.steps.map((s, i) => {
              const Illustrazione = passi[i];
              return (
                <Reveal as="li" key={s.title} delay={i * 90}>
                  {Illustrazione && <Illustrazione />}
                  <div className="mt-4 flex gap-3.5">
                    <span className="inline-flex h-8 w-8 flex-none items-center justify-center rounded-full bg-ink text-[13px] font-semibold tabular-nums text-[#fafaf8]">{i + 1}</span>
                    <span>
                      <span className="block text-[17px] font-semibold tracking-[-0.015em] text-ink">{s.title}</span>
                      <span className="mt-1 block text-[15px] leading-relaxed text-muted">{s.text}</span>
                    </span>
                  </div>
                </Reveal>
              );
            })}
          </ol>
        </div>
      </section>

      {/* Le funzioni, in cinque blocchi alternati */}
      <section className="py-6 md:py-10">
        {f.sections.map((s, i) => {
          const Visual = blocchi[i];
          const testoPrima = i % 2 === 0;
          return (
            <div key={s.title} className={`py-12 md:py-16 ${i > 0 ? "border-t border-line-soft" : ""}`}>
              <div className="wrap grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
                <Reveal className={`min-w-0 ${testoPrima ? "lg:order-1" : "lg:order-2"}`}>
                  <p className="eyebrow">{tr("{n} di {tot}", { n: i + 1, tot: f.sections.length })}</p>
                  <h2 className="h-block mt-3">{s.title}</h2>
                  <p className="mt-3 text-[17px] leading-relaxed text-muted">{s.text}</p>
                  <ul className="mt-5 flex flex-col gap-2.5 text-[15px] text-text">
                    {s.points.map((p) => (
                      <li key={p} className="flex gap-2.5">
                        <Check className="mt-0.5" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </Reveal>
                <Reveal delay={150} className={`min-w-0 ${testoPrima ? "lg:order-2" : "lg:order-1"}`}>
                  {Visual && <Visual />}
                </Reveal>
              </div>
            </div>
          );
        })}
      </section>

      {/* Il foglio stampato, nei tre formati */}
      {f.fogli && (
        <section className="py-16 md:py-24" style={{ backgroundImage: toneGlow[f.tone], backgroundColor: "#f6f6f3" }}>
          <div className="wrap">
            <Reveal className="mx-auto max-w-[720px] text-center">
              <p className="eyebrow">{tr("Stampa")}</p>
              <h2 className="h-section mt-3">{f.fogli.title}</h2>
              <p className="lead mx-auto mt-4 max-w-[600px]">{f.fogli.text}</p>
            </Reveal>
            <div className="mt-12 grid items-end gap-8 md:grid-cols-[1fr_1.4fr_1fr] md:gap-6">
              {f.fogli.formati.map((x, i) => (
                <Reveal key={x.name} delay={i * 90} className="min-w-0">
                  <FoglioA4 formato={formati[i]} />
                  <h3 className="mt-5 text-[17px] font-semibold tracking-[-0.015em] text-ink">{x.name}</h3>
                  <p className="mt-1 text-[15px] leading-relaxed text-muted">{x.text}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <div>
        <Faq items={f.faq} />
      </div>

      {/* Chiusura */}
      <section className="pb-20 pt-4 md:pb-28">
        <div className="wrap">
          <Reveal className="rounded-[28px] bg-forest px-6 py-12 text-center text-[#fafaf8] md:px-12 md:py-16">
            <h2 className="h-section mx-auto max-w-[680px] text-[#fafaf8]">{tr("Prova la Lista ordini nel tuo locale.")}</h2>
            <p className="mx-auto mt-4 max-w-[560px] text-[17px] leading-relaxed text-[#b9cfa8]">
              {tr("Gratis per 14 giorni, senza carta. Se hai domande, ti risponde una persona.")}
            </p>
            <div className="mt-8 flex flex-col justify-center gap-2.5 sm:flex-row">
              <a href={signupUrl} className="btn btn-dark">
                {tr("Prova gratis 14 giorni")}
                <Icon name="arrowRight" size={16} stroke={2} />
              </a>
              <Link href={lp("/contatti/")} className="btn btn-ghost-dark">
                <Icon name="chat" size={16} stroke={2} />
                {tr("Contattaci")}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

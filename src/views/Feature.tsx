import { tr } from "@/i18n";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { signupUrl } from "@/config/site";
import { pageMeta } from "@/config/seo";
import { Icon, IconTile, toneClass } from "@/components/Icon";
import { benefitIcons, toneGlow } from "@/components/StaticArt";
import { HeroArt } from "@/components/HeroArt";
import { Breadcrumbs, Check, CtaBand, Faq, Hl, PlanTag } from "@/components/ui";

/** La parola evidenziata nel titolo di ogni funzionalità. */
const heroHl = (): Record<string, string> => ({
  "menu-digitale": tr("sempre giusto"),
  "importa-menu-ai": tr("foto"),
  traduzioni: tr("sua lingua"),
  "menu-a-orari": tr("aperitivo"),
  prenotazioni: tr("un tocco"),
  "sala-e-tavoli": tr("colpo d'occhio"),
  "ferie-e-chiusure": tr("lo sa già"),
  "ordini-whatsapp": tr("Zero commissioni"),
  clienti: tr("ogni cliente"),
  "automazioni-whatsapp": tr("da soli"),
  statistiche: tr("decidere meglio"),
  "staff-e-turni": tr("chi lavora"),
  assistente: tr("a voce"),
});
import { FeatureVisual } from "@/components/visuals/FeatureVisual";
import { ListaOrdiniView } from "./ListaOrdini";
import { featureById, featureBySlug, getFeatures, getSectors } from "@/content";
import { to, lp } from "@/i18n/link";
import type { Locale } from "@/i18n/config";

export const staticParams = (locale: Locale) => getFeatures(locale).map((f) => ({ slug: f.slug }));

export function meta(locale: Locale, slug: string): Metadata {
  const f = featureBySlug(slug, locale);
  if (!f) return {};
  const image = f.id === "lista-ordini" ? { url: `/og/lista-ordini-${locale}.png`, alt: f.hero.title } : undefined;
  return pageMeta({ locale, page: "feature", id: f.id, title: f.seo.title, description: f.seo.description, image });
}

export default function FeaturePage({ slug }: { slug: string }) {
  const f = featureBySlug(slug);
  if (!f) notFound();
  if (f.id === "lista-ordini") return <ListaOrdiniView f={f} />;
  const related = f.related.map((s) => featureById(s)!).filter(Boolean);
  const idx = getFeatures().findIndex((x) => x.slug === f.slug);
  const next = getFeatures()[(idx + 1) % getFeatures().length];
  // I settori che usano di più questa funzionalità; se nessuno la cita, i primi tre.
  const usedBy = getSectors().filter((s) => s.uses.some((u) => u.feature === f.id));
  const forSectors = (usedBy.length ? usedBy : getSectors()).slice(0, 4);

  return (
    <>
      {/* Apertura: testo a sinistra, animazione a destra */}
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
              <h1 className="anim-fade-up mt-5 text-[clamp(2.1rem,1.5rem+2.2vw,3.25rem)] font-semibold leading-[1.12] md:leading-[1.05] tracking-[-0.035em]" style={{ animationDelay: "60ms" }}>
                <Hl text={f.hero.title} word={heroHl()[f.id]} />
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
            </div>
            <div className="anim-fade-up min-w-0" style={{ animationDelay: "200ms" }}>
              <HeroArt feature={f} />
            </div>
          </div>
        </div>
      </section>

      {/* Come funziona: tre passaggi in una riga */}
      <section className="border-y border-line bg-white py-10 md:py-12">
        <div className="wrap">
          <h2 className="eyebrow">{tr("Come funziona")}</h2>
          <ol className="mt-5 grid gap-6 md:grid-cols-3 md:gap-8">
            {f.steps.map((s, i) => (
              <li key={s.title} className="grid grid-cols-[32px_1fr] items-start gap-x-3">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-ink text-[13px] font-semibold tabular-nums text-[#fafaf8]">
                  {i + 1}
                </span>
                <span className="pt-0.5 text-[19px] font-semibold leading-snug tracking-[-0.015em] text-ink">{s.title}</span>
                <span className="col-start-2 mt-1 text-[15px] leading-relaxed text-muted">{s.text}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Dettagli: testo e grafica statica affiancati */}
      <section className="py-14 md:py-20">
        <div className="wrap">
          <div className="grid items-center gap-7 md:gap-10 lg:grid-cols-2 lg:gap-14">
            <div>
              <p className="eyebrow">{tr("Nel dettaglio")}</p>
              <h2 className="h-block mt-3 max-md:text-[1.75rem] max-md:leading-[1.15]">{f.sections[0].title}</h2>
              <p className="mt-3 text-[16px] leading-relaxed text-muted md:text-[17px]">{f.sections[0].text}</p>
              <ul className="mt-5 flex flex-col gap-2.5 text-[15px] text-text">
                {f.sections[0].points.map((p) => (
                  <li key={p} className="flex gap-2.5">
                    <Check className="mt-0.5" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            <div className="min-w-0">
              <FeatureVisual k={f.visual} />
            </div>
          </div>

          {f.sections.length > 1 && (
            <div className={`mt-12 grid gap-4 ${f.sections.length > 2 ? "md:grid-cols-2" : ""}`}>
              {f.sections.slice(1).map((s) => (
                <article
                  key={s.title}
                  className={`rounded-[16px] border border-line bg-white p-5 md:p-6 ${f.sections.length === 2 ? "grid gap-x-10 md:grid-cols-2" : "flex flex-col"}`}
                >
                  <div>
                    <h3 className="text-[18px] font-semibold leading-snug tracking-[-0.015em] text-ink">{s.title}</h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-muted">{s.text}</p>
                  </div>
                  <ul
                    className={`mt-4 flex flex-col gap-2 text-[14.5px] text-text ${
                      f.sections.length === 2 ? "border-t border-line-soft pt-4 md:mt-0 md:border-l md:border-t-0 md:pl-8 md:pt-0" : "border-t border-line-soft pt-4"
                    }`}
                  >
                    {s.points.map((p) => (
                      <li key={p} className="flex gap-2.5">
                        <Check className="mt-0.5" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Vantaggi: box con icone */}
      <section className="py-14 md:py-20" style={{ backgroundImage: toneGlow[f.tone], backgroundColor: "#f6f6f3" }}>
        <div className="wrap">
          <h2 className="h-block text-center max-md:text-[1.75rem] max-md:leading-[1.15]">{tr("Cosa cambia per il tuo locale")}</h2>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {f.benefits.map((b, i) => (
              <div key={b.title} className="rounded-[16px] border border-line bg-white p-5 text-center shadow-[0_16px_36px_-28px_rgba(0,0,0,.35)]">
                <span className={`mx-auto flex h-11 w-11 items-center justify-center rounded-[12px] ${toneClass[f.tone].bg} ${toneClass[f.tone].ink}`}>
                  <Icon name={benefitIcons[i % benefitIcons.length]} size={20} stroke={1.9} />
                </span>
                <h3 className="mt-4 text-[16px] font-semibold tracking-[-0.01em] text-ink">{b.title}</h3>
                <p className="mt-1.5 text-[14.5px] leading-snug text-muted">{b.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div>
        <Faq items={f.faq} />
      </div>

      {/* Funzionalità collegate */}
      <section className="pb-14 md:pb-16">
        <div className="wrap">
          <div className="flex items-end justify-between gap-6">
            <h2 className="h-block">{tr("Funziona ancora meglio con")}</h2>
            <Link href={to("feature", next.id)} className="link-arrow hidden text-[15px] md:inline-flex">
              {tr("Prossima:")}{" "}{next.name}
              <Icon name="arrowRight" size={15} stroke={2} />
            </Link>
          </div>
          <div className="mt-6 grid gap-3 md:grid-cols-3">
            {related.map((r) => (
              <Link
                key={r.slug}
                href={to("feature", r.id)}
                className="group flex items-start gap-4 rounded-[16px] border border-line bg-white p-5 transition-colors hover:border-[#d4d4d8]"
              >
                <IconTile name={r.icon} tone={r.tone} size={40} radius={10} />
                <span className="min-w-0 flex-1">
                  <span className="block text-[16px] font-semibold tracking-[-0.01em] text-ink">{r.name}</span>
                  <span className="mt-0.5 block text-[14px] text-muted">{r.short}</span>
                </span>
                <Icon name="arrowRight" size={16} stroke={2} className="mt-1 text-faint transition-transform group-hover:translate-x-0.5 group-hover:text-ink" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Settori che la usano di più */}
      <section className="pb-20 md:pb-24">
        <div className="wrap">
          <h2 className="h-block">{tr("Chi la usa di più")}</h2>
          <div className="mt-6 flex flex-wrap gap-2">
            {forSectors.map((s) => (
              <Link key={s.slug} href={to("sector", s.id)} className="btn btn-light gap-2.5">
                <Icon name={s.icon} size={17} />
                {s.name}
              </Link>
            ))}
            <Link href={lp("/settori/")} className="btn btn-light">
              {tr("Tutti i settori")}
            </Link>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}

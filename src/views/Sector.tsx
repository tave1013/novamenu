import { tr } from "@/i18n";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { signupUrl } from "@/config/site";
import { pageMeta } from "@/config/seo";
import { Icon, IconTile } from "@/components/Icon";
import { Breadcrumbs, Check, CtaBand, Faq, Hl } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { ArtStage, SectorArtView, SectorHeroArt } from "@/components/SectorArt";
import { PhotoReveal, PhotoSplit } from "@/components/PhotoReveal";
import { featureById, getSectors, sectorBySlug } from "@/content";
import { to, lp } from "@/i18n/link";
import type { Locale } from "@/i18n/config";

export const staticParams = (locale: Locale) => getSectors(locale).map((s) => ({ slug: s.slug }));

export function meta(locale: Locale, slug: string): Metadata {
  const s = sectorBySlug(slug, locale);
  if (!s) return {};
  return pageMeta({ locale, page: "sector", id: s.id, title: s.seo.title, description: s.seo.description });
}

export default function SectorPage({ slug }: { slug: string }) {
  const s = sectorBySlug(slug);
  if (!s) notFound();
  const others = getSectors().filter((x) => x.slug !== s.slug).slice(0, 5);

  return (
    <>
      {/* Apertura */}
      <section className="overflow-x-clip pb-12 pt-6 md:pb-16 md:pt-8">
        <div className="wrap">
          <Breadcrumbs items={[{ name: tr("Per chi"), href: lp("/settori/") }, { name: s.name, href: to("sector", s.id) }]} />
          <div className="mt-8 grid items-center gap-12 lg:mt-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
            <div>
              <div className="anim-fade-up flex items-center gap-3">
                <IconTile name={s.icon} tone={s.tone} size={40} radius={12} />
                <span className="text-[15px] font-medium text-ink">{s.name}</span>
              </div>
              <h1 className="display anim-fade-up mt-6" style={{ animationDelay: "80ms" }}>
                <Hl text={s.hero.title} word={s.hero.hl} />
              </h1>
              <p className="lead anim-fade-up mt-6 max-w-[560px]" style={{ animationDelay: "160ms" }}>
                {s.hero.lead}
              </p>
              <div className="anim-fade-up mt-8 flex flex-col gap-3 sm:flex-row" style={{ animationDelay: "240ms" }}>
                <a href={signupUrl} className="btn btn-dark">
                  {tr("Prova gratis 14 giorni")}
                  <Icon name="arrowRight" size={16} stroke={2} />
                </a>
                <Link href={lp("/demo/")} className="btn btn-light">
                  {tr("Prenota una demo")}
                </Link>
              </div>
            </div>
            <div className="anim-fade-up min-w-0 lg:px-6" style={{ animationDelay: "200ms" }}>
              <SectorHeroArt sector={s} />
            </div>
          </div>
        </div>
      </section>

      {/* La foto che si apre scorrendo */}
      {s.photo && (
        <section aria-label={s.name} className={s.photo.layout === "center" || !s.photo.layout ? "pb-6 pt-2 md:pb-10" : "border-t border-line-soft py-16 md:py-24"}>
          {s.photo.layout === "left" || s.photo.layout === "right" ? (
            <PhotoSplit
              src={s.photo.src}
              alt={s.photo.alt}
              pos={s.photo.pos}
              side={s.photo.layout}
              eyebrow={s.name}
              title={s.photo.caption}
              text={s.photo.text ?? ""}
              points={s.photo.points}
            />
          ) : (
            <PhotoReveal src={s.photo.src} alt={s.photo.alt} caption={s.photo.caption} eyebrow={s.name} pos={s.photo.pos} />
          )}
        </section>
      )}

      {/* Su misura per il settore */}
      <section className="border-t border-line-soft">
        {s.showcase.map((b, i) => {
          const textFirst = i % 2 === 0;
          return (
            <div key={b.title} className={`py-14 md:py-20 ${i > 0 ? "border-t border-line-soft" : ""}`}>
              <div className="wrap grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                <Reveal className={`min-w-0 ${textFirst ? "lg:order-1" : "lg:order-2"}`}>
                  <span className="inline-flex items-center rounded-full bg-lime-soft px-2.5 py-1 text-[13px] font-medium text-forest">{b.tag}</span>
                  <h2 className="h-block mt-4">{b.title}</h2>
                  <p className="mt-3.5 text-[17px] leading-relaxed text-muted">{b.text}</p>
                  <ul className="mt-5 flex flex-col gap-2.5 text-[15px] text-text">
                    {b.points.map((p) => (
                      <li key={p} className="flex gap-2.5">
                        <Check className="mt-0.5" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </Reveal>
                <Reveal delay={120} className={`min-w-0 ${textFirst ? "lg:order-2" : "lg:order-1"}`}>
                  <ArtStage tone={s.tone}>
                    <SectorArtView art={b.art} />
                  </ArtStage>
                </Reveal>
              </div>
            </div>
          );
        })}
      </section>

      {/* Una giornata tipo */}
      <section className="bg-forest py-20 text-white md:py-24">
        <div className="wrap">
          <Reveal className="max-w-2xl">
            <p className="eyebrow !text-lime">{s.name}</p>
            <h2 className="h-section mt-3 text-white">{tr("Com'è una giornata tipo.")}</h2>
          </Reveal>
          <ol className="mt-12 grid gap-px overflow-hidden rounded-[24px] bg-white/10 sm:grid-cols-2 md:grid-cols-4">
            {s.day.map((d, i) => (
              <Reveal as="li" key={d.time} delay={i * 110} className="bg-forest p-6 md:p-7">
                <span className="text-[26px] font-semibold tracking-[-0.03em] tabular-nums text-lime">{d.time}</span>
                <p className="mt-3 text-[15.5px] leading-relaxed text-[#cfdcc4]">{d.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Funzionalità usate */}
      <section className="py-16 md:py-20">
        <div className="wrap">
          <Reveal className="max-w-2xl">
            <h2 className="h-section">{tr("Gli strumenti che userai di più")}</h2>
          </Reveal>
          <ul className="mt-10 grid gap-3 md:grid-cols-2">
            {s.uses.map((u, i) => {
              const f = featureById(u.feature)!;
              return (
                <Reveal as="li" key={u.feature} delay={i * 90}>
                  <Link href={to("feature", f.id)} className="lift group flex h-full gap-5 rounded-[16px] border border-line bg-white p-6">
                    <IconTile name={f.icon} tone={f.tone} size={46} radius={13} />
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center gap-2 text-[18px] font-semibold tracking-[-0.02em] text-ink">
                        {f.name}
                        <Icon name="arrowRight" size={16} stroke={2} className="text-faint transition-transform duration-500 group-hover:translate-x-1 group-hover:text-ink" />
                      </span>
                      <span className="mt-1.5 block text-[15.5px] leading-relaxed text-muted">{u.text}</span>
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </section>

      <div className="border-t border-line-soft">
        <Faq items={s.faq} />
      </div>

      <section className="pb-20 md:pb-24">
        <div className="wrap">
          <h2 className="h-block">{tr("Anche per")}</h2>
          <div className="mt-6 flex flex-wrap gap-2">
            {others.map((o) => (
              <Link key={o.slug} href={to("sector", o.id)} className="btn btn-light gap-2.5">
                <Icon name={o.icon} size={17} />
                {o.name}
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

import { riempiPrezzi } from "@/config/prezzi";
import { getListino } from "@/lib/prezzi/listino";
import { getLocale, longDate, tr } from "@/i18n";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { site } from "@/config/site";
import { ogImage, pageMeta } from "@/config/seo";
import { Icon, IconTile } from "@/components/Icon";
import { Breadcrumbs, CtaBand, JsonLd } from "@/components/ui";
import { ArtStage, SectorArtView } from "@/components/SectorArt";
import { featureById, getGuides, guideBySlug, sectorById } from "@/content";
import { localizeLinks, lp, to } from "@/i18n/link";
import { localeInfo, type Locale } from "@/i18n/config";

export const staticParams = (locale: Locale) => getGuides(locale).map((g) => ({ slug: g.slug }));

export function meta(locale: Locale, slug: string): Metadata {
  const g = guideBySlug(slug, locale);
  if (!g) return {};
  return pageMeta({
    locale,
    page: "guide",
    id: g.id,
    title: g.seo?.title ?? g.title,
    description: g.seo?.description ?? g.description,
    article: { publishedTime: g.date },
  });
}

const fmt = (d: string) => longDate(d);

export default async function GuideArticle({ slug }: { slug: string }) {
  const g = guideBySlug(slug);
  if (!g) notFound();
  const related = g.related.map((r) => featureById(r)!).filter(Boolean);
  const more = getGuides().filter((x) => x.slug !== g.slug).slice(0, 3);
  const locale = getLocale();
  const url = `${site.url}${to("guide", g.id)}`;
  const html = localizeLinks(riempiPrezzi(g.html.replaceAll("{{brand}}", site.name), await getListino(), localeInfo[locale].intl));
  const sector = g.sector ? sectorById(g.sector) : undefined;
  // Il testo viene diviso nei punti {{art:nome}}, dove compare una grafica.
  const parts = html.split(/\{\{art:([a-z0-9-]+)\}\}/);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: g.title,
          description: g.description,
          datePublished: g.date,
          dateModified: g.date,
          inLanguage: localeInfo[locale].intl,
          url,
          image: `${site.url}${ogImage(locale).url}`,
          author: { "@type": "Organization", name: site.name },
          publisher: { "@type": "Organization", name: site.name, logo: { "@type": "ImageObject", url: `${site.url}/apple-icon.png` } },
          mainEntityOfPage: url,
        }}
      />
      <article className="pb-20 pt-8 md:pb-28 md:pt-12">
        <div className="wrap">
          <Breadcrumbs items={[{ name: tr("Guide"), href: lp("/guide/") }, { name: g.title, href: to("guide", g.id) }]} />
          <header className="mx-auto mt-10 max-w-[1080px]"><div className="max-w-[760px]">
            <p className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[14px] text-muted">
              {sector && (
                <Link href={to("sector", sector.id)} className="inline-flex items-center gap-1.5 rounded-full bg-lime-soft px-2.5 py-1 text-[13px] font-medium text-forest">
                  <Icon name={sector.icon} size={14} stroke={2} />
                  {sector.name}
                </Link>
              )}
              {fmt(g.date)}, {g.readMinutes}{" "}{tr("minuti di lettura")}
            </p>
            <h1 className="mt-4 text-[clamp(2.1rem,1.4rem+2.8vw,3.5rem)] font-semibold leading-[1.12] md:leading-[1.04] tracking-[-0.04em]">{g.title}</h1>
            <p className="lead mt-5">{g.description}</p>
          </div></header>
          <div className="mx-auto mt-10 grid max-w-[1080px] gap-12 lg:grid-cols-[minmax(0,720px)_1fr] lg:gap-16">
            <div className="min-w-0 border-t border-line pt-4">
              {parts.map((part, i) =>
                i % 2 === 0 ? (
                  <div key={i} className="prose-guide" dangerouslySetInnerHTML={{ __html: part }} />
                ) : g.arts?.[part] ? (
                  <figure key={i} className="my-8">
                    <ArtStage tone={sector?.tone ?? "green"}>
                      <SectorArtView art={g.arts[part]} />
                    </ArtStage>
                  </figure>
                ) : null
              )}
            </div>
            <aside className="lg:pt-6">
              <div className="sticky top-24 rounded-[22px] bg-mist p-5">
                <p className="text-[14px] font-medium text-ink">{tr("Strumenti citati")}</p>
                <ul className="mt-3 flex flex-col gap-1">
                  {related.map((f) => (
                    <li key={f.slug}>
                      <Link href={to("feature", f.id)} className="-mx-2 flex items-center gap-3 rounded-[12px] px-2 py-2 transition-colors hover:bg-white">
                        <IconTile name={f.icon} tone={f.tone} size={34} radius={10} />
                        <span className="text-[14.5px] font-medium text-ink">{f.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
                {sector && (
                  <Link href={to("sector", sector.id)} className="mt-3 flex items-center gap-3 rounded-[12px] bg-white px-3 py-2.5 text-[13.5px] font-medium text-ink">
                    <IconTile name={sector.icon} tone={sector.tone} size={30} radius={8} />
                    <span className="min-w-0 flex-1">{site.name}{" "}{tr("per")}{" "}{sector.name.toLowerCase()}</span>
                    <Icon name="arrowRight" size={14} stroke={2} />
                  </Link>
                )}
                <Link href={lp("/demo/")} className="btn btn-dark btn-sm mt-4 w-full">
                  {tr("Prenota una demo")}
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </article>

      <section className="border-t border-line-soft py-16 md:py-20">
        <div className="wrap">
          <h2 className="h-block">{tr("Altre guide")}</h2>
          <ul className="mt-8 grid gap-4 md:grid-cols-3">
            {more.map((m) => (
              <li key={m.slug}>
                <Link href={to("guide", m.id)} className="lift group flex h-full flex-col rounded-[16px] border border-line bg-white p-6">
                  <span className="text-[19px] font-semibold leading-snug tracking-[-0.02em] text-ink">{m.title}</span>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-[14.5px] font-medium text-ink">
                    {tr("Leggi")}
                    <Icon name="arrowRight" size={15} stroke={2} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <CtaBand />
    </>
  );
}

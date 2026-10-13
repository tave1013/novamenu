import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { guideBySlug, guides } from "@/content/guides";
import { featureBySlug } from "@/content/features";
import { site } from "@/config/site";
import { ogImage, pageMeta } from "@/config/seo";
import { Icon, IconTile } from "@/components/Icon";
import { Breadcrumbs, CtaBand, JsonLd } from "@/components/ui";
import { sectorBySlug } from "@/content/sectors";
import { ArtStage, SectorArtView } from "@/components/SectorArt";

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const g = guideBySlug(slug);
  if (!g) return {};
  return pageMeta({
    title: g.seo?.title ?? g.title,
    description: g.seo?.description ?? g.description,
    path: `/guide/${g.slug}/`,
    article: { publishedTime: g.date },
  });
}

const fmt = (d: string) => new Date(d).toLocaleDateString("it-IT", { day: "numeric", month: "long", year: "numeric" });

export default async function GuideArticle({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const g = guideBySlug(slug);
  if (!g) notFound();
  const related = g.related.map((r) => featureBySlug(r)!).filter(Boolean);
  const more = guides.filter((x) => x.slug !== g.slug).slice(0, 3);
  const html = g.html.replaceAll("{{brand}}", site.name);
  const sector = g.sector ? sectorBySlug(g.sector) : undefined;
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
          inLanguage: "it-IT",
          url: `${site.url}/guide/${g.slug}/`,
          image: `${site.url}${ogImage.url}`,
          author: { "@type": "Organization", name: site.name },
          publisher: { "@type": "Organization", name: site.name, logo: { "@type": "ImageObject", url: `${site.url}/apple-icon.png` } },
          mainEntityOfPage: `${site.url}/guide/${g.slug}/`,
        }}
      />
      <article className="pb-20 pt-8 md:pb-28 md:pt-12">
        <div className="wrap">
          <Breadcrumbs items={[{ name: "Guide", href: "/guide/" }, { name: g.title, href: `/guide/${g.slug}/` }]} />
          <header className="mx-auto mt-10 max-w-[1080px]"><div className="max-w-[760px]">
            <p className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[14px] text-muted">
              {sector && (
                <Link href={`/settori/${sector.slug}/`} className="inline-flex items-center gap-1.5 rounded-full bg-lime-soft px-2.5 py-1 text-[13px] font-medium text-forest">
                  <Icon name={sector.icon} size={14} stroke={2} />
                  {sector.name}
                </Link>
              )}
              {fmt(g.date)}, {g.readMinutes} minuti di lettura
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
                <p className="text-[14px] font-medium text-ink">Strumenti citati</p>
                <ul className="mt-3 flex flex-col gap-1">
                  {related.map((f) => (
                    <li key={f.slug}>
                      <Link href={`/funzionalita/${f.slug}/`} className="-mx-2 flex items-center gap-3 rounded-[12px] px-2 py-2 transition-colors hover:bg-white">
                        <IconTile name={f.icon} tone={f.tone} size={34} radius={10} />
                        <span className="text-[14.5px] font-medium text-ink">{f.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
                {sector && (
                  <Link href={`/settori/${sector.slug}/`} className="mt-3 flex items-center gap-3 rounded-[12px] bg-white px-3 py-2.5 text-[13.5px] font-medium text-ink">
                    <IconTile name={sector.icon} tone={sector.tone} size={30} radius={8} />
                    <span className="min-w-0 flex-1">{site.name} per {sector.name.toLowerCase()}</span>
                    <Icon name="arrowRight" size={14} stroke={2} />
                  </Link>
                )}
                <Link href="/demo/" className="btn btn-dark btn-sm mt-4 w-full">
                  Prenota una demo
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </article>

      <section className="border-t border-line-soft py-16 md:py-20">
        <div className="wrap">
          <h2 className="h-block">Altre guide</h2>
          <ul className="mt-8 grid gap-4 md:grid-cols-3">
            {more.map((m) => (
              <li key={m.slug}>
                <Link href={`/guide/${m.slug}/`} className="lift group flex h-full flex-col rounded-[16px] border border-line bg-white p-6">
                  <span className="text-[19px] font-semibold leading-snug tracking-[-0.02em] text-ink">{m.title}</span>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-[14.5px] font-medium text-ink">
                    Leggi
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

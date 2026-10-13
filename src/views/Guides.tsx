import { longDate, t, tr } from "@/i18n";
import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { Breadcrumbs, CtaBand } from "@/components/ui";
import { SectorArtView } from "@/components/SectorArt";
import { pageMeta } from "@/config/seo";
import { getGuides, sectorById } from "@/content";
import { to, lp } from "@/i18n/link";
import type { Locale } from "@/i18n/config";

export const meta = (locale: Locale): Metadata =>
  pageMeta({
    locale,
    page: "guides",
    title: t(locale, "Guide pratiche per ristoranti, pizzerie e locali"),
    description: t(locale, "Guide pratiche per chi gestisce un locale: menu digitale, allergeni, ordini da asporto senza commissioni e prenotazioni. Consigli concreti, senza fronzoli."),
  });

const fmt = (d: string) => longDate(d);

export default function GuidePage() {
  const [first, ...rest] = getGuides();
  const firstArt = first.arts ? Object.values(first.arts)[0] : undefined;
  return (
    <>
      <section className="pb-20 pt-8 md:pb-28 md:pt-12">
        <div className="wrap">
          <Breadcrumbs items={[{ name: tr("Guide"), href: lp("/guide/") }]} />
          <h1 className="display anim-fade-up mt-10 max-w-[820px]">{tr("Guide per chi gestisce un")}{" "}<span className="hl">{tr("locale")}</span>.</h1>
          <p className="lead anim-fade-up mt-6 max-w-[600px]" style={{ animationDelay: "80ms" }}>
            {tr("Consigli pratici, senza giri di parole, su menu, ordini, prenotazioni e clienti.")}
          </p>

          <Link
            href={to("guide", first.id)}
            className="group anim-fade-up mt-14 grid overflow-hidden rounded-[28px] bg-forest text-white md:grid-cols-[1.1fr_0.9fr]"
            style={{ animationDelay: "140ms" }}
          >
            <div className="flex flex-col p-7 md:p-10">
              <span className="text-[13.5px] text-[#cfdcc4]">
                {fmt(first.date)}, {first.readMinutes}{" "}{tr("minuti di lettura")}
              </span>
              <h2 className="mt-4 text-[clamp(1.6rem,1.2rem+1.6vw,2.5rem)] font-semibold leading-[1.15] md:leading-[1.08] tracking-[-0.035em] text-white">{first.title}</h2>
              <p className="mt-4 text-[16px] leading-relaxed text-[#cfdcc4]">{first.description}</p>
              <span className="mt-8 inline-flex items-center gap-2 text-[15px] font-medium text-lime">
                {tr("Leggi la guida")}
                <Icon name="arrowRight" size={16} stroke={2} className="transition-transform group-hover:translate-x-1" />
              </span>
            </div>
            <div aria-hidden className="relative hidden min-h-[300px] items-center justify-center p-8 md:flex">
              <div className="absolute inset-0 bg-[radial-gradient(rgba(159,232,112,.22)_1px,transparent_1px)] [background-size:20px_20px]" />
              {firstArt && (
                <div className="relative w-full max-w-[380px] text-ink transition-transform duration-700 [transition-timing-function:var(--ease-posh)] group-hover:-translate-y-1">
                  <SectorArtView art={firstArt} />
                </div>
              )}
            </div>
          </Link>

          <ul className="mt-4 grid gap-4 md:grid-cols-3">
            {rest.map((g) => (
              <li key={g.slug}>
                <Link href={to("guide", g.id)} className="lift group flex h-full flex-col rounded-[16px] border border-line bg-white p-6 md:p-7">
                  <span className="flex flex-wrap items-center gap-2 text-[13px] text-muted">
                    {g.sector && (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-lime-soft px-2 py-0.5 text-[12px] font-medium text-forest">
                        <Icon name={sectorById(g.sector)!.icon} size={12} stroke={2} />
                        {sectorById(g.sector)!.name}
                      </span>
                    )}
                    {fmt(g.date)}, {g.readMinutes}{" "}{tr("minuti")}
                  </span>
                  <h2 className="mt-3 text-[20px] font-semibold leading-snug tracking-[-0.02em] text-ink">{g.title}</h2>
                  <p className="mt-3 flex-1 text-[15px] leading-relaxed text-muted">{g.description}</p>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-[14.5px] font-medium text-ink">
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

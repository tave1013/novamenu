import type { Metadata } from "next";
import Link from "next/link";
import { guides } from "@/content/guides";
import { Icon } from "@/components/Icon";
import { Breadcrumbs, CtaBand } from "@/components/ui";
import { sectorBySlug } from "@/content/sectors";
import { SectorArtView } from "@/components/SectorArt";

export const metadata: Metadata = {
  title: "Guide pratiche per ristoranti, pizzerie e locali",
  description:
    "Guide pratiche su menu digitale, allergeni, ordini da asporto senza commissioni e prenotazioni. Consigli concreti per chi gestisce un locale.",
  alternates: { canonical: "/guide/" },
};

const fmt = (d: string) => new Date(d).toLocaleDateString("it-IT", { day: "numeric", month: "long", year: "numeric" });

export default function GuidePage() {
  const [first, ...rest] = guides;
  const firstArt = first.arts ? Object.values(first.arts)[0] : undefined;
  return (
    <>
      <section className="pb-20 pt-8 md:pb-28 md:pt-12">
        <div className="wrap">
          <Breadcrumbs items={[{ name: "Guide", href: "/guide/" }]} />
          <h1 className="display anim-fade-up mt-10 max-w-[820px]">Guide per chi gestisce un <span className="hl">locale</span>.</h1>
          <p className="lead anim-fade-up mt-6 max-w-[600px]" style={{ animationDelay: "80ms" }}>
            Consigli pratici, senza giri di parole, su menu, ordini, prenotazioni e clienti.
          </p>

          <Link
            href={`/guide/${first.slug}/`}
            className="group anim-fade-up mt-14 grid overflow-hidden rounded-[28px] bg-forest text-white md:grid-cols-[1.1fr_0.9fr]"
            style={{ animationDelay: "140ms" }}
          >
            <div className="flex flex-col p-7 md:p-10">
              <span className="text-[13.5px] text-[#cfdcc4]">
                {fmt(first.date)}, {first.readMinutes} minuti di lettura
              </span>
              <h2 className="mt-4 text-[clamp(1.6rem,1.2rem+1.6vw,2.5rem)] font-semibold leading-[1.15] md:leading-[1.08] tracking-[-0.035em] text-white">{first.title}</h2>
              <p className="mt-4 text-[16px] leading-relaxed text-[#cfdcc4]">{first.description}</p>
              <span className="mt-8 inline-flex items-center gap-2 text-[15px] font-medium text-lime">
                Leggi la guida
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
                <Link href={`/guide/${g.slug}/`} className="lift group flex h-full flex-col rounded-[16px] border border-line bg-white p-6 md:p-7">
                  <span className="flex flex-wrap items-center gap-2 text-[13px] text-muted">
                    {g.sector && (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-lime-soft px-2 py-0.5 text-[12px] font-medium text-forest">
                        <Icon name={sectorBySlug(g.sector)!.icon} size={12} stroke={2} />
                        {sectorBySlug(g.sector)!.name}
                      </span>
                    )}
                    {fmt(g.date)}, {g.readMinutes} minuti
                  </span>
                  <h2 className="mt-3 text-[20px] font-semibold leading-snug tracking-[-0.02em] text-ink">{g.title}</h2>
                  <p className="mt-3 flex-1 text-[15px] leading-relaxed text-muted">{g.description}</p>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-[14.5px] font-medium text-ink">
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

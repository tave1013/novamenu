import { tr } from "@/i18n";
import type { Metadata } from "next";
import Link from "next/link";
import { sectors } from "@/content/sectors";
import { Icon, IconTile } from "@/components/Icon";
import { Breadcrumbs, CtaBand } from "@/components/ui";
import { pageMeta } from "@/config/seo";

export const metadata: Metadata = pageMeta({
  title: "Software per pizzerie, ristoranti, bar e botteghe",
  description:
    "Software per pizzerie, ristoranti, pub, bar, gelaterie, pastifici, panetterie e gastronomie: menu digitale, ordini e prenotazioni. Prova gratis 14 giorni.",
  path: "/settori/",
});

export default function SettoriPage() {
  return (
    <>
      <section className="pb-20 pt-8 md:pb-28 md:pt-12">
        <div className="wrap">
          <Breadcrumbs items={[{ name: tr("Per chi"), href: "/settori/" }]} />
          <h1 className="display anim-fade-up mt-10 max-w-[860px]">{tr("Pensato per chi fa")}{" "}<span className="hl">{tr("ristorazione")}</span>.</h1>
          <p className="lead anim-fade-up mt-6 max-w-[620px]" style={{ animationDelay: "80ms" }}>
            {tr("Nato in una pizzeria, oggi lavora per ristoranti, bar, pub e per le botteghe del cibo che vendono a peso, su prenotazione o da asporto.")}
          </p>
          <ul className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-[24px] bg-line ring-1 ring-line sm:grid-cols-2 lg:grid-cols-3">
            {sectors.map((s) => (
              <li key={s.slug} className="bg-white">
                <Link href={`/settori/${s.slug}/`} className="group flex h-full flex-col p-6 transition-colors hover:bg-mist md:p-7">
                  <IconTile name={s.icon} tone={s.tone} size={46} radius={13} />
                  <span className="mt-8 text-[19px] font-semibold tracking-[-0.02em] text-ink">{s.name}</span>
                  <span className="mt-1 text-[15px] text-muted">{s.short}</span>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-[14.5px] font-medium text-ink">
                    {tr("Scopri di più")}
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

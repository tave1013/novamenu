import { t, tr } from "@/i18n";
import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { Breadcrumbs } from "@/components/ui";
import { pageMeta } from "@/config/seo";
import { getServices } from "@/content";
import { to, lp } from "@/i18n/link";
import type { Locale } from "@/i18n/config";

export const meta = (locale: Locale): Metadata =>
  pageMeta({
    locale,
    page: "services",
    title: t(locale, "Servizi per ristoranti: foto e presenza online"),
    description: t(locale, "Foto e video professionali per il tuo locale e gestione della presenza online su Google, TripAdvisor e social. Servizi pensati per la ristorazione."),
  });

export default function ServiziPage() {
  return (
    <section className="pb-20 pt-6 md:pb-24 md:pt-8">
      <div className="wrap">
        <Breadcrumbs items={[{ name: tr("Servizi"), href: lp("/servizi/") }]} />
        <h1 className="display mt-8 max-w-[760px]">{tr("Oltre alla piattaforma, ti aiutiamo a farti scegliere.")}</h1>
        <p className="lead mt-5 max-w-[620px]">{tr("Foto, video e presenza online fatti da persone che conoscono la ristorazione, per un locale curato ovunque ti cerchino.")}</p>
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {getServices().map((s) => (
            <Link key={s.slug} href={to("service", s.id)} className="group rounded-[24px] border border-line bg-white p-7 transition-colors hover:border-[#d4d4cf]">
              <span className="flex h-12 w-12 items-center justify-center rounded-[14px] bg-lime-soft text-forest">
                <Icon name={s.icon} size={22} />
              </span>
              <h2 className="mt-6 text-[24px] font-semibold tracking-[-0.025em] text-ink">{s.name}</h2>
              <p className="mt-2 text-[16px] text-muted">{s.desc}</p>
              <span className="mt-6 inline-flex items-center gap-1.5 text-[15px] font-medium text-ink">
                {tr("Scopri il servizio")}
                <Icon name="arrowRight" size={15} stroke={2} className="transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

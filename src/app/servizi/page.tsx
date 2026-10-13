import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { Breadcrumbs } from "@/components/ui";
import { services } from "@/content/services";
import { pageMeta } from "@/config/seo";

const title = "Servizi per ristoranti: foto e presenza online";
const description = "Foto e video professionali per il tuo locale e gestione della presenza online su Google, TripAdvisor e social. Servizi pensati per la ristorazione.";

export const metadata: Metadata = pageMeta({ title, description, path: "/servizi/" });

export default function ServiziPage() {
  return (
    <section className="pb-20 pt-6 md:pb-24 md:pt-8">
      <div className="wrap">
        <Breadcrumbs items={[{ name: "Servizi", href: "/servizi/" }]} />
        <h1 className="display mt-8 max-w-[760px]">Oltre alla piattaforma, ti aiutiamo a farti scegliere.</h1>
        <p className="lead mt-5 max-w-[620px]">Foto, video e presenza online fatti da persone che conoscono la ristorazione, per un locale curato ovunque ti cerchino.</p>
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {services.map((s) => (
            <Link key={s.slug} href={`/servizi/${s.slug}/`} className="group rounded-[24px] border border-line bg-white p-7 transition-colors hover:border-[#d4d4cf]">
              <span className="flex h-12 w-12 items-center justify-center rounded-[14px] bg-lime-soft text-forest">
                <Icon name={s.icon} size={22} />
              </span>
              <h2 className="mt-6 text-[24px] font-semibold tracking-[-0.025em] text-ink">{s.name}</h2>
              <p className="mt-2 text-[16px] text-muted">{s.desc}</p>
              <span className="mt-6 inline-flex items-center gap-1.5 text-[15px] font-medium text-ink">
                Scopri il servizio
                <Icon name="arrowRight" size={15} stroke={2} className="transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

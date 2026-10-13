import { getLocale, t, tr } from "@/i18n";
import type { Metadata } from "next";
import Link from "next/link";
import { featureGroups } from "@/content/features";
import { Icon, IconTile } from "@/components/Icon";
import { Breadcrumbs, CtaBand } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { pageMeta } from "@/config/seo";
import { getFeatures } from "@/content";
import { to, lp } from "@/i18n/link";
import type { Locale } from "@/i18n/config";
import { featureGroupName } from "@/views/RootShell";

export const meta = (locale: Locale): Metadata =>
  pageMeta({
    locale,
    page: "features",
    title: t(locale, "Funzioni del gestionale per ristoranti e locali"),
    description: t(locale, "Le funzioni del gestionale per ristoranti NovaMenu: menu digitale con QR, ordini su WhatsApp, prenotazioni, sala, clienti e assistente vocale. Prova gratis."),
  });

const groupText = (): Record<string, string> => ({
  Menu: tr("Il menu che i clienti vedono dal QR, sempre aggiornato e nella loro lingua."),
  "Prenotazioni e sala": tr("Tavoli prenotati, confermati e assegnati, senza telefonate."),
  "Vendite e clienti": tr("Ordini senza commissioni e clienti che tornano."),
  Gestione: tr("Numeri chiari, staff organizzato e un assistente che ti ascolta."),
});

export default function FunzionalitaPage() {
  const groupName = (g: (typeof featureGroups)[number]) => featureGroupName(g, getLocale());
  return (
    <>
      <section className="pb-12 pt-8 md:pb-16 md:pt-12">
        <div className="wrap">
          <Breadcrumbs items={[{ name: tr("Funzionalità"), href: lp("/funzionalita/") }]} />
          <h1 className="display anim-fade-up mt-10 max-w-[900px]">{tr("Tutto il tuo locale, in")}{" "}<span className="hl">{tr("una sola")}</span>{" "}{tr("piattaforma.")}</h1>
          <p className="lead anim-fade-up mt-6 max-w-[640px]" style={{ animationDelay: "80ms" }}>
            {tr("Tredici strumenti che lavorano insieme. Una prenotazione crea la scheda del cliente, un ordine aggiorna le statistiche, una chiusura ferma tutto da sola.")}
          </p>
          <nav aria-label={tr("Gruppi")} className="anim-fade-up no-scrollbar mt-10 flex gap-2 overflow-x-auto" style={{ animationDelay: "140ms" }}>
            {featureGroups.map((g) => (
              <a key={g} href={`#${groupName(g).toLowerCase().replace(/\s+/g, "-")}`} className="btn btn-sm btn-light flex-none">
                {groupName(g)}
              </a>
            ))}
          </nav>
        </div>
      </section>

      {featureGroups.map((g, gi) => (
        <section
          key={g}
          id={groupName(g).toLowerCase().replace(/\s+/g, "-")}
          className={`py-16 md:py-24 ${gi % 2 === 0 ? "bg-mist" : ""}`}
        >
          <div className="wrap grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
            <Reveal>
              <h2 className="h-section">{groupName(g)}</h2>
              <p className="lead mt-4 max-w-sm">{groupText()[g]}</p>
            </Reveal>
            <ul className="grid gap-3 sm:grid-cols-2">
              {getFeatures()
                .filter((f) => f.group === g)
                .map((f, i) => (
                  <Reveal as="li" key={f.slug} delay={i * 70}>
                    <Link
                      href={to("feature", f.id)}
                      className={`group flex h-full flex-col rounded-[22px] p-6 transition-shadow ${
                        gi % 2 === 0 ? "bg-white" : "bg-mist"
                      } hover:shadow-[0_20px_40px_-24px_rgba(0,0,0,.3)]`}
                    >
                      <div className="flex items-center justify-between">
                        <IconTile name={f.icon} tone={f.tone} size={44} radius={12} />
                        <span className="text-[12.5px] text-muted">{tr("Dal piano")}{" "}{f.plan}</span>
                      </div>
                      <h3 className="mt-8 text-[20px] font-semibold tracking-[-0.02em]">{f.name}</h3>
                      <p className="mt-1.5 flex-1 text-[15px] leading-relaxed text-muted">{f.seo.description.split(". ")[0]}.</p>
                      <span className="mt-5 inline-flex items-center gap-1.5 text-[14.5px] font-medium text-ink">
                        {tr("Scopri di più")}
                        <Icon name="arrowRight" size={15} stroke={2} className="transition-transform group-hover:translate-x-1" />
                      </span>
                    </Link>
                  </Reveal>
                ))}
            </ul>
          </div>
        </section>
      ))}

      <div className="pt-4">
        <CtaBand />
      </div>
    </>
  );
}

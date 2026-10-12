import type { Metadata } from "next";
import Link from "next/link";
import { features, featureGroups } from "@/content/features";
import { Icon, IconTile } from "@/components/Icon";
import { Breadcrumbs, CtaBand } from "@/components/ui";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Funzionalità: menu digitale, ordini, prenotazioni e clienti",
  description:
    "Tutte le funzionalità per il tuo locale: menu digitale con QR, importazione con l'AI, traduzioni, prenotazioni, sala, ordini su WhatsApp, clienti, automazioni, statistiche e assistente vocale.",
  alternates: { canonical: "/funzionalita/" },
};

const groupText: Record<string, string> = {
  Menu: "Il menu che i clienti vedono dal QR, sempre aggiornato e nella loro lingua.",
  "Prenotazioni e sala": "Tavoli prenotati, confermati e assegnati, senza telefonate.",
  "Vendite e clienti": "Ordini senza commissioni e clienti che tornano.",
  Gestione: "Numeri chiari, staff organizzato e un assistente che ti ascolta.",
};

export default function FunzionalitaPage() {
  return (
    <>
      <section className="pb-12 pt-8 md:pb-16 md:pt-12">
        <div className="wrap">
          <Breadcrumbs items={[{ name: "Funzionalità", href: "/funzionalita/" }]} />
          <h1 className="display anim-fade-up mt-10 max-w-[900px]">Tutto il tuo locale, in <span className="hl">una sola</span> piattaforma.</h1>
          <p className="lead anim-fade-up mt-6 max-w-[640px]" style={{ animationDelay: "80ms" }}>
            Tredici strumenti che lavorano insieme. Una prenotazione crea la scheda del cliente, un ordine aggiorna le statistiche, una chiusura ferma tutto da sola.
          </p>
          <nav aria-label="Gruppi" className="anim-fade-up no-scrollbar mt-10 flex gap-2 overflow-x-auto" style={{ animationDelay: "140ms" }}>
            {featureGroups.map((g) => (
              <a key={g} href={`#${g.toLowerCase().replace(/\s+/g, "-")}`} className="btn btn-sm btn-light flex-none">
                {g}
              </a>
            ))}
          </nav>
        </div>
      </section>

      {featureGroups.map((g, gi) => (
        <section
          key={g}
          id={g.toLowerCase().replace(/\s+/g, "-")}
          className={`py-16 md:py-24 ${gi % 2 === 0 ? "bg-mist" : ""}`}
        >
          <div className="wrap grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
            <Reveal>
              <h2 className="h-section">{g}</h2>
              <p className="lead mt-4 max-w-sm">{groupText[g]}</p>
            </Reveal>
            <ul className="grid gap-3 sm:grid-cols-2">
              {features
                .filter((f) => f.group === g)
                .map((f, i) => (
                  <Reveal as="li" key={f.slug} delay={i * 70}>
                    <Link
                      href={`/funzionalita/${f.slug}/`}
                      className={`group flex h-full flex-col rounded-[22px] p-6 transition-shadow ${
                        gi % 2 === 0 ? "bg-white" : "bg-mist"
                      } hover:shadow-[0_20px_40px_-24px_rgba(0,0,0,.3)]`}
                    >
                      <div className="flex items-center justify-between">
                        <IconTile name={f.icon} tone={f.tone} size={44} radius={12} />
                        <span className="text-[12.5px] text-muted">Dal piano {f.plan}</span>
                      </div>
                      <h3 className="mt-8 text-[20px] font-semibold tracking-[-0.02em]">{f.name}</h3>
                      <p className="mt-1.5 flex-1 text-[15px] leading-relaxed text-muted">{f.seo.description.split(". ")[0]}.</p>
                      <span className="mt-5 inline-flex items-center gap-1.5 text-[14.5px] font-medium text-ink">
                        Scopri di più
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

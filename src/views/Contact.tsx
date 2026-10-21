import { AZIENDA, sedeLegale } from "@/lib/legal/azienda";
import { getLocale, t, tr } from "@/i18n";
import type { Metadata } from "next";
import Link from "next/link";
import { site, waLink } from "@/config/site";
import { Breadcrumbs } from "@/components/ui";
import { LeadForm } from "@/components/LeadForm";
import { Icon } from "@/components/Icon";
import { pageMeta } from "@/config/seo";
import { lp } from "@/i18n/link";
import type { Locale } from "@/i18n/config";

export const meta = (locale: Locale): Metadata =>
  pageMeta({
    locale,
    page: "contact",
    title: t(locale, "Contatti: scrivici su WhatsApp o per email"),
    description: t(locale, "Contatta il team di {brand} su WhatsApp o per email: ti risponde una persona, in italiano, di solito in giornata. Oppure prenota una demo di 20 minuti.", { brand: site.name }),
  });

export default function ContattiPage() {
  const ways = [
    { icon: "chat" as const, t: "WhatsApp", d: tr("Il modo più veloce. Rispondiamo in giornata."), href: waLink(tr("Ciao, ho una domanda su ") + site.name), cta: tr("Scrivici su WhatsApp"), ext: true },
    { icon: "mail" as const, t: tr("Email"), d: site.email, href: `mailto:${site.email}`, cta: tr("Mandaci una email"), ext: true },
    { icon: "calendarCheck" as const, t: tr("Demo"), d: tr("20 minuti in videochiamata, sul tuo menu."), href: lp("/demo/"), cta: tr("Prenota una demo"), ext: false },
  ];
  return (
    <section className="pb-20 pt-8 md:pb-28 md:pt-12">
      <div className="wrap">
        <Breadcrumbs items={[{ name: tr("Contatti"), href: lp("/contatti/") }]} />
        <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 [&>*]:min-w-0">
          <div>
            <h1 className="display anim-fade-up"><span className="hl">{tr("Parliamone")}</span>.</h1>
            <p className="lead anim-fade-up mt-6 max-w-[480px]" style={{ animationDelay: "80ms" }}>
              {tr("Domande su prezzi, funzioni o su come partire. Ti risponde una persona, in italiano.")}
            </p>
            <ul className="mt-10 flex flex-col gap-3">
              {ways.map((w, i) => {
                const inner = (
                  <>
                    <span className="flex h-11 w-11 flex-none items-center justify-center rounded-[12px] bg-white text-ink ring-1 ring-line-soft">
                      <Icon name={w.icon} size={20} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[16.5px] font-semibold tracking-[-0.01em] text-ink">{w.t}</span>
                      <span className="block truncate text-[14.5px] text-muted">{w.d}</span>
                    </span>
                    <Icon name="arrowRight" size={17} stroke={2} className="text-faint transition-transform group-hover:translate-x-1 group-hover:text-ink" />
                  </>
                );
                const cls = "group flex items-center gap-4 rounded-[16px] border border-line bg-white p-4 transition-colors hover:border-[#d4d4d8]";
                return (
                  <li key={w.t} className="anim-fade-up" style={{ animationDelay: `${140 + i * 70}ms` }}>
                    {w.ext ? (
                      <a href={w.href} className={cls} target={w.href.startsWith("http") ? "_blank" : undefined} rel="noopener" aria-label={w.cta}>
                        {inner}
                      </a>
                    ) : (
                      <Link href={w.href} className={cls} aria-label={w.cta}>
                        {inner}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
            <div className="mt-10 border-t border-line pt-6 text-[14.5px] leading-relaxed text-muted">
              <p className="font-medium text-ink">{AZIENDA.ragioneSociale}</p>
              <p>{sedeLegale(getLocale())}</p>
              <p>{tr("Società registrata in Inghilterra e Galles n. {n}", { n: AZIENDA.numeroSocieta })}</p>
            </div>
          </div>
          <div className="anim-fade-up" style={{ animationDelay: "160ms" }}>
            <LeadForm kind="contatto" />
          </div>
        </div>
      </div>
    </section>
  );
}

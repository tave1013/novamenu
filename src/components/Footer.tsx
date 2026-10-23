import { getLocale, tr } from "@/i18n";
import { AZIENDA, rigaSocieta } from "@/lib/legal/azienda";
import { PreferenzeCookieLink } from "./consenso/CookieBanner";
import Link from "next/link";
import { site } from "@/config/site";
import { LinkAccesso } from "./Accesso";
import { FORNITORI } from "@/content/legale/fornitori";
import { LogoMark } from "./Logo";
import { getFeatures, getSectors } from "@/content";
import { to, lp } from "@/i18n/link";

export function Footer() {
  const year = 2026;
  return (
    <footer className="bg-ink text-[#a1a1aa]">
      <div className="wrap pb-10 pt-16 md:pt-20">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4 lg:grid-cols-[1.4fr_1fr_1fr_0.8fr_0.8fr]">
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <Link href={lp("/")} className="inline-flex items-center gap-2.5">
              <LogoMark invert />
              <span className="text-[17px] font-semibold tracking-[-0.03em] text-white">{site.name}</span>
            </Link>
            <p className="mt-4 max-w-[300px] text-[14.5px] leading-relaxed">
              {tr("Menu digitale, ordini, prenotazioni e clienti per la ristorazione. Senza commissioni, in italiano.")}
            </p>
          </div>

          <FooterCol title={tr("Funzionalità")}>
            {getFeatures().map((f) => (
              <FooterLink key={f.slug} href={to("feature", f.id)}>
                {f.name}
              </FooterLink>
            ))}
          </FooterCol>

          <FooterCol title={tr("Settori")}>
            {getSectors().map((s) => (
              <FooterLink key={s.slug} href={to("sector", s.id)}>
                {s.name}
              </FooterLink>
            ))}
          </FooterCol>

          <FooterCol title={tr("Azienda")}>
            <FooterLink href={lp("/prezzi/")}>{tr("Prezzi")}</FooterLink>
            <FooterLink href={lp("/servizi/foto-e-video/")}>{tr("Foto e video")}</FooterLink>
            <FooterLink href={lp("/servizi/gestione-social/")}>{tr("Gestione social")}</FooterLink>
            <FooterLink href={lp("/servizi/presenza-online/")}>{tr("Presenza online")}</FooterLink>
            <FooterLink href={lp("/demo/")}>{tr("Prenota una demo")}</FooterLink>
            <FooterLink href={lp("/contatti/")}>{tr("Contatti")}</FooterLink>
            <FooterLink href={lp("/guide/")}>{tr("Guide")}</FooterLink>
            <li>
              <LinkAccesso className="inline-flex min-h-8 items-center text-[14px] transition-colors hover:text-white" />
            </li>
          </FooterCol>

          <FooterCol title={tr("Legale")}>
            <FooterLink href={to("legalDoc", "note-legali")}>{tr("Note legali")}</FooterLink>
            <FooterLink href={to("legalDoc", "privacy")}>{tr("Privacy")}</FooterLink>
            <FooterLink href={to("legalDoc", "cookie")}>{tr("Cookie")}</FooterLink>
            {/* compare quando c'è l'elenco dei fornitori della piattaforma */}
            {FORNITORI.length > 0 && <FooterLink href={to("legalDoc", "fornitori")}>{tr("Fornitori")}</FooterLink>}
            <FooterLink href={to("legalDoc", "termini")}>{tr("Termini")}</FooterLink>
            <li>
              <PreferenzeCookieLink className="inline-flex min-h-8 items-center text-left text-[14px] transition-colors hover:text-white">
                {tr("Preferenze cookie")}
              </PreferenzeCookieLink>
            </li>
          </FooterCol>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-6 text-[13px] md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {AZIENDA.ragioneSociale}. {rigaSocieta(getLocale())}.
          </p>
          <p>{tr("Fatto in Italia, per la ristorazione.")}</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-3 text-[14px] font-medium text-white">{title}</p>
      <ul className="flex flex-col">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="inline-flex min-h-8 items-center text-[14px] transition-colors hover:text-white">
        {children}
      </Link>
    </li>
  );
}

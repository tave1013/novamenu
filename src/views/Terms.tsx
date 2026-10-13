import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { site } from "@/config/site";
import { pageMeta } from "@/config/seo";
import { getLegal } from "@/content";
import type { Locale } from "@/i18n/config";
import { t, tr } from "@/i18n";

export const meta = (locale: Locale): Metadata =>
  pageMeta({
    locale,
    page: "terms",
    title: t(locale, "Termini del servizio: prova e abbonamento"),
    description: t(locale, "Termini del servizio di {brand}: prova gratuita, abbonamento, prezzi e pagamenti, obblighi del cliente, dati dei clienti del locale e disponibilità.", { brand: site.name }),
  });

export default function TerminiPage() {
  return <LegalPage title={tr("Termini del servizio")} page="terms" updated="2026-10-11" html={getLegal().terms} />;
}

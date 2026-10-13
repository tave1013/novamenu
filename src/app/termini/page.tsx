import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { termsHtml } from "@/content/legal";
import { site } from "@/config/site";
import { pageMeta } from "@/config/seo";

export const metadata: Metadata = pageMeta({
  title: "Termini del servizio: prova e abbonamento",
  description: `Termini del servizio di ${site.name}: prova gratuita, abbonamento, prezzi e pagamenti, obblighi del cliente, dati dei clienti del locale e disponibilità.`,
  path: "/termini/",
});

export default function TerminiPage() {
  return <LegalPage title="Termini del servizio" slug="termini" updated="11 ottobre 2026" html={termsHtml} />;
}

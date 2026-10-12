import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { termsHtml } from "@/content/legal";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Termini del servizio",
  description: `Termini del servizio del sito e della piattaforma ${site.name}.`,
  alternates: { canonical: "/termini/" },
};

export default function TerminiPage() {
  return <LegalPage title="Termini del servizio" slug="termini" updated="11 ottobre 2026" html={termsHtml} />;
}

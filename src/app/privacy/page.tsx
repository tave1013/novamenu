import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { privacyHtml } from "@/content/legal";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Informativa privacy",
  description: `Informativa privacy del sito e della piattaforma ${site.name}.`,
  alternates: { canonical: "/privacy/" },
};

export default function PrivacyPage() {
  return <LegalPage title="Informativa privacy" slug="privacy" updated="11 ottobre 2026" html={privacyHtml} />;
}

import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { privacyHtml } from "@/content/legal";
import { site } from "@/config/site";
import { pageMeta } from "@/config/seo";

export const metadata: Metadata = pageMeta({
  title: "Informativa privacy del sito e della piattaforma",
  description: `Informativa privacy di ${site.name}: quali dati trattiamo sul sito e nella piattaforma, perché, per quanto tempo, chi può vederli e come esercitare i diritti.`,
  path: "/privacy/",
});

export default function PrivacyPage() {
  return <LegalPage title="Informativa privacy" slug="privacy" updated="11 ottobre 2026" html={privacyHtml} />;
}

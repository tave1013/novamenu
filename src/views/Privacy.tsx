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
    page: "privacy",
    title: t(locale, "Informativa privacy del sito e della piattaforma"),
    description: t(locale, "Informativa privacy di {brand}: quali dati trattiamo sul sito e nella piattaforma, perché, per quanto tempo, chi può vederli e come esercitare i diritti.", { brand: site.name }),
  });

export default function PrivacyPage() {
  return <LegalPage title={tr("Informativa privacy")} page="privacy" updated="2026-10-11" html={getLegal().privacy} />;
}

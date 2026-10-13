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
    page: "cookies",
    title: t(locale, "Cookie policy del sito: quali cookie usiamo"),
    description: t(locale, "Cookie policy di {brand}: quali cookie usa il sito, a cosa servono, quali servizi di terze parti sono coinvolti e come gestirli dal tuo browser.", { brand: site.name }),
  });

export default function CookiePage() {
  return <LegalPage title={tr("Cookie policy")} page="cookies" updated="2026-10-11" html={getLegal().cookies} />;
}

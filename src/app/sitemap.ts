import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { getFeatures, getGuides, getSectors, getServices } from "@/content";
import { DOCUMENTI } from "@/lib/legal/documenti";
import { defaultLocale, localeInfo, locales } from "@/i18n/config";
import { href, type PageKey } from "@/i18n/routes";

export const dynamic = "force-static";

/** Tutte le pagine pubbliche in tutte le lingue, ognuna con le sue alternative hreflang. */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date("2026-10-13");
  type Freq = "weekly" | "monthly" | "yearly";
  const entry = (key: PageKey, priority: number, changeFrequency: Freq = "monthly", id?: string, lastModified: Date = now) => {
    const languages: Record<string, string> = {};
    for (const l of locales) languages[localeInfo[l].hreflang] = `${site.url}${href(key, l, id)}`;
    languages["x-default"] = `${site.url}${href(key, defaultLocale, id)}`;
    return locales.map((l) => ({
      url: `${site.url}${href(key, l, id)}`,
      lastModified,
      changeFrequency,
      priority,
      alternates: { languages },
    }));
  };
  const it = defaultLocale;
  return [
    entry("home", 1, "weekly"),
    entry("features", 0.9),
    ...getFeatures(it).map((f) => entry("feature", 0.8, "monthly", f.id)),
    entry("pricing", 0.9),
    entry("sectors", 0.7),
    ...getSectors(it).map((s) => entry("sector", 0.7, "monthly", s.id)),
    entry("guides", 0.6, "weekly"),
    ...getGuides(it).map((g) => entry("guide", 0.6, "monthly", g.id, new Date(g.date))),
    entry("services", 0.6),
    ...getServices(it).map((s) => entry("service", 0.7, "monthly", s.id)),
    entry("demo", 0.7),
    entry("contact", 0.5),
    entry("legal", 0.3, "yearly"),
    ...DOCUMENTI.map((d) => entry("legalDoc", 0.2, "yearly", d)),
    entry("legalArchive", 0.1, "yearly"),
  ].flat();
}

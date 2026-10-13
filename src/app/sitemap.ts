import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { features } from "@/content/features";
import { sectors } from "@/content/sectors";
import { guides } from "@/content/guides";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date("2026-10-13");
  const u = (path: string, priority: number, changeFrequency: "weekly" | "monthly" | "yearly" = "monthly") => ({
    url: `${site.url}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  });
  return [
    u("/", 1, "weekly"),
    u("/funzionalita/", 0.9),
    ...features.map((f) => u(`/funzionalita/${f.slug}/`, 0.8)),
    u("/prezzi/", 0.9),
    u("/settori/", 0.7),
    ...sectors.map((s) => u(`/settori/${s.slug}/`, 0.7)),
    u("/guide/", 0.6, "weekly"),
    ...guides.map((g) => ({ ...u(`/guide/${g.slug}/`, 0.6), lastModified: new Date(g.date) })),
    u("/servizi/", 0.6),
    u("/servizi/foto-e-video/", 0.7),
    u("/servizi/presenza-online/", 0.7),
    u("/demo/", 0.7),
    u("/contatti/", 0.5),
    u("/privacy/", 0.2, "yearly"),
    u("/cookie/", 0.2, "yearly"),
    u("/termini/", 0.2, "yearly"),
  ];
}

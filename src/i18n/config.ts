/**
 * Lingue del sito. Per aggiungerne una: una riga qui sotto, un dizionario in
 * src/i18n/dictionaries/, i contenuti in src/content/<lingua>/ e le rotte in routes.ts.
 */
export const locales = ["it", "en"] as const;
export type Locale = (typeof locales)[number];

/** Lingua principale: sta alla radice del dominio, senza prefisso. */
export const defaultLocale: Locale = "it";

export const localeInfo: Record<Locale, { name: string; hreflang: string; ogLocale: string; intl: string; prefix: string }> = {
  it: { name: "Italiano", hreflang: "it", ogLocale: "it_IT", intl: "it-IT", prefix: "" },
  en: { name: "English", hreflang: "en", ogLocale: "en_GB", intl: "en-GB", prefix: "/en" },
};

export const isLocale = (x: string): x is Locale => (locales as readonly string[]).includes(x);

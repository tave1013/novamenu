import { getLocale } from "@/i18n";
import { defaultLocale, type Locale } from "@/i18n/config";
import { slugOf } from "@/i18n/routes";
import { features as featuresIt, type Feature } from "./features";
import { features as featuresEn } from "./en/features";
import { sectors as sectorsEn } from "./en/sectors";
import { guides as guidesEn } from "./en/guides";
import { services as servicesEn } from "./en/services";
import { reviews as reviewsEn } from "./en/reviews";
import { sectors as sectorsIt, type Sector } from "./sectors";
import { guides as guidesIt, type Guide } from "./guides";
import { services as servicesIt, type Service } from "./services";
import { reviews as reviewsIt } from "./reviews";

/*
 * Contenuti del sito nella lingua richiesta. Ogni lingua ha gli stessi dati con la stessa forma:
 * l'italiano in src/content/, le altre in src/content/<lingua>/.
 * Per aggiungere una lingua basta registrare qui i suoi file.
 */
type Collection = "feature" | "sector" | "service" | "guide";
type Localized<T> = Omit<T, "slug">;

/** Assegna a ogni voce lo slug della lingua, preso dalla mappa delle rotte. */
const withSlug = <T extends { id: string; slug: string }>(collection: Collection, locale: Locale, items: Localized<T>[]): T[] =>
  items.map((x) => ({ ...x, slug: slugOf(collection, x.id, locale) }) as T);

const content: Record<Locale, {
  features: Feature[];
  sectors: Sector[];
  guides: Guide[];
  services: Service[];
  reviews: typeof reviewsIt;
}> = {
  it: {
    features: featuresIt,
    sectors: sectorsIt,
    guides: guidesIt,
    services: servicesIt,
    reviews: reviewsIt,
  },
  en: {
    features: withSlug("feature", "en", featuresEn),
    sectors: withSlug("sector", "en", sectorsEn),
    guides: withSlug("guide", "en", guidesEn),
    services: withSlug("service", "en", servicesEn),
    reviews: reviewsEn,
  },
};

const pick = (locale?: Locale) => content[locale ?? getLocale()] ?? content[defaultLocale];

export const getFeatures = (locale?: Locale) => pick(locale).features;
export const getSectors = (locale?: Locale) => pick(locale).sectors;
export const getGuides = (locale?: Locale) => pick(locale).guides;
export const getServices = (locale?: Locale) => pick(locale).services;
export { getComparison, getGeneralFaq, getPlans } from "./plansByLocale";
export const getReviews = (locale?: Locale) => pick(locale).reviews;

export const featureById = (id: string, locale?: Locale) => getFeatures(locale).find((x) => x.id === id);
export const featureBySlug = (slug: string, locale?: Locale) => getFeatures(locale).find((x) => x.slug === slug);
export const sectorById = (id: string, locale?: Locale) => getSectors(locale).find((x) => x.id === id);
export const sectorBySlug = (slug: string, locale?: Locale) => getSectors(locale).find((x) => x.slug === slug);
export const guideBySlug = (slug: string, locale?: Locale) => getGuides(locale).find((x) => x.slug === slug);

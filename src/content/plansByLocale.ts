import { getLocale } from "@/i18n";
import { defaultLocale, type Locale } from "@/i18n/config";
import { comparison as comparisonIt, generalFaq as generalFaqIt, plans as plansIt } from "./plans";

/*
 * Piani, tabella di confronto e domande frequenti nella lingua richiesta.
 * Stanno in un file a parte perché servono anche a componenti del browser,
 * che così non si portano dietro tutti gli altri contenuti.
 */
type PlansContent = { plans: typeof plansIt; comparison: typeof comparisonIt; generalFaq: typeof generalFaqIt };

const byLocale: Record<Locale, PlansContent> = {
  it: { plans: plansIt, comparison: comparisonIt, generalFaq: generalFaqIt },
  // PROVVISORIO: in attesa dei testi inglesi.
  en: { plans: plansIt, comparison: comparisonIt, generalFaq: generalFaqIt },
};

const pick = (locale?: Locale) => byLocale[locale ?? getLocale()] ?? byLocale[defaultLocale];

export const getPlans = (locale?: Locale) => pick(locale).plans;
export const getComparison = (locale?: Locale) => pick(locale).comparison;
export const getGeneralFaq = (locale?: Locale) => pick(locale).generalFaq;

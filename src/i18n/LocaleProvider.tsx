"use client";

import { LocaleContext } from "./index";
import type { Locale } from "./config";

/** Rende disponibile la lingua della pagina alle componenti client. */
export function LocaleProvider({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  if (!LocaleContext) return <>{children}</>;
  return <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>;
}

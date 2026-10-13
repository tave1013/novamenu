import type { Metadata } from "next";
import { DemoAside, DemoBooking } from "@/components/DemoBooking";
import { pageMeta } from "@/config/seo";
import type { Locale } from "@/i18n/config";
import { t } from "@/i18n";

export const meta = (locale: Locale): Metadata =>
  pageMeta({
    locale,
    page: "demo",
    title: t(locale, "Demo gratuita del menu digitale, in 20 minuti"),
    description: t(locale, "Demo gratuita di 20 minuti: carichiamo il menu vero del tuo locale e ti mostriamo come arriverebbero ordini e prenotazioni. Senza impegno, il menu resta a te."),
  });

export default function DemoPage() {
  return (
    <section className="pb-8 pt-6 md:pb-20 md:pt-10">
      <div className="wrap grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-14">
        <div className="mx-auto w-full max-w-[540px] lg:mx-0 lg:py-4">
          <DemoBooking />
        </div>
        <div className="lg:sticky lg:top-24 lg:h-[calc(100vh-128px)] lg:min-h-[620px]">
          <DemoAside />
        </div>
      </div>
    </section>
  );
}

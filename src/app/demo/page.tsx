import type { Metadata } from "next";
import { DemoAside, DemoBooking } from "@/components/DemoBooking";

export const metadata: Metadata = {
  title: "Prenota una demo gratuita di 20 minuti",
  description:
    "Una videochiamata di 20 minuti: carichiamo il menu vero del tuo locale e ti mostriamo come lavorerebbero ordini e prenotazioni. Senza impegno, il menu resta a te.",
  alternates: { canonical: "/demo/" },
};

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

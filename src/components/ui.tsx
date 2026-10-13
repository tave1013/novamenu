import Link from "next/link";
import { signupUrl, site } from "@/config/site";
import { Icon } from "./Icon";
import { DemoBooking } from "./DemoBooking";
import { FaqList } from "./FaqList";

export function JsonLd({ data }: { data: unknown }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export function Breadcrumbs({ items }: { items: { name: string; href: string }[] }) {
  const all = [{ name: "Home", href: "/" }, ...items];
  return (
    <>
      <nav aria-label="Percorso" className="text-[13.5px] text-muted">
        <ol className="flex flex-wrap items-center gap-1.5">
          {all.map((it, i) => (
            <li key={it.href} className="flex items-center gap-1.5">
              {i > 0 && <Icon name="chevronRight" size={13} stroke={2} className="text-faint" />}
              {i < all.length - 1 ? (
                <Link href={it.href} className="transition-colors hover:text-ink">
                  {it.name}
                </Link>
              ) : (
                <span aria-current="page" className="text-text">
                  {it.name}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: all.map((it, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: it.name,
            item: `${site.url}${it.href}`,
          })),
        }}
      />
    </>
  );
}

export function Faq({ items, title = "Domande frequenti", schema = true }: { items: { q: string; a: string }[]; title?: string; schema?: boolean }) {
  return (
    <section aria-labelledby="faq-title" className="py-14 md:py-18">
      <div className="wrap max-w-[880px]">
        <h2 id="faq-title" className="h-section text-center">
          {title}
        </h2>
        <FaqList items={items} />
        <p className="mt-8 text-center text-[15px] text-muted">
          Non trovi la risposta?{" "}
          <Link href="/contatti/" className="font-medium text-ink underline decoration-line underline-offset-4 hover:decoration-ink">
            Scrivici
          </Link>
          , rispondiamo in giornata.
        </p>
      </div>
      {schema && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
          }}
        />
      )}
    </section>
  );
}

export function CtaBand({
  title = "Vediamolo insieme sul tuo menu.",
  text = "Una videochiamata di 20 minuti: carichiamo il tuo menu vero e ti mostriamo come lavorerebbe il tuo locale. Oppure prova da solo, gratis per 14 giorni.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section id="demo" className="md:pb-24">
      <div className="wrap max-md:px-0">
        <div className="relative grid items-center gap-9 overflow-hidden bg-forest px-3 py-12 text-[#fafaf8] md:gap-10 md:rounded-[28px] md:p-12 lg:grid-cols-2">
          <div className="relative max-md:px-2">
            <h2 className="h-section text-[#fafaf8]">{title}</h2>
            <p className="mt-4 text-[17px] leading-relaxed text-[#b9cfa8]">{text}</p>
            <ul className="mt-6 flex flex-col gap-2.5 text-[15px] text-[#e3eed8]">
              {["Senza impegno", "Ti lasciamo il menu già pronto", "Scegli tu giorno e ora"].map((x) => (
                <li key={x} className="flex items-center gap-2.5">
                  <Icon name="check" size={16} stroke={2.4} className="text-lime" />
                  {x}
                </li>
              ))}
            </ul>
            <a href={signupUrl} className="mt-8 inline-flex items-center gap-2 text-[15px] font-medium text-[#fafaf8] underline decoration-white/30 underline-offset-4 hover:decoration-white">
              Preferisci provare da solo? Inizia gratis
              <Icon name="arrowRight" size={15} stroke={2} />
            </a>
          </div>
          <div className="relative min-w-0 rounded-[20px] bg-[#fafaf8] px-4 py-6 text-ink md:p-7">
            <DemoBooking compact />
          </div>
        </div>
      </div>
    </section>
  );
}

export function PlanTag({ plan }: { plan: string }) {
  return (
    <span className="inline-flex h-7 items-center gap-1.5 rounded-full bg-mist px-3 text-[13px] font-medium text-text">
      <span className="h-1.5 w-1.5 rounded-full bg-ios" />
      Dal piano {plan}
    </span>
  );
}

export function Check({ className = "" }: { className?: string }) {
  return <Icon name="check" size={16} stroke={2.4} className={`flex-none text-[#16a34a] ${className}`} />;
}

/** Evidenzia una parola (o due) dentro un titolo. */
export function Hl({ text, word }: { text: string; word?: string }) {
  if (!word) return <>{text}</>;
  const i = text.indexOf(word);
  if (i < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, i)}
      <span className="hl">{word}</span>
      {text.slice(i + word.length)}
    </>
  );
}

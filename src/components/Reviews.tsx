import { tr } from "@/i18n";
import { reviewsArePlaceholder, type Review } from "@/content/reviews";
import { Reveal } from "./Reveal";
import { getReviews } from "@/content";

function Stars({ n }: { n: number }) {
  return (
    <span className="flex gap-0.5 text-forest" aria-label={`${n} stelle su 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="15" height="15" viewBox="0 0 20 20" fill={i < n ? "currentColor" : "#e4e4e7"} aria-hidden>
          <path d="M10 1.8l2.47 5.01 5.53.8-4 3.9.94 5.5L10 14.42 5.06 17l.94-5.5-4-3.9 5.53-.8z" />
        </svg>
      ))}
    </span>
  );
}

function Card({ r }: { r: Review }) {
  const initials = r.place
    .split(/[ ,]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");
  return (
    <figure className="flex w-[280px] flex-none flex-col rounded-[18px] border border-line bg-white p-5 shadow-[0_18px_36px_-30px_rgba(0,0,0,.35)] sm:w-[340px]">
      <Stars n={r.stars} />
      <blockquote className="mt-3 flex-1 text-[15px] leading-[1.55] text-text">{r.text}</blockquote>
      <figcaption className="mt-4 flex items-center gap-2.5">
        <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-lime-soft text-[11.5px] font-semibold text-forest">{initials}</span>
        <span className="min-w-0 text-[13px] leading-tight">
          <span className="block font-semibold text-ink">{r.name}</span>
          <span className="block truncate text-muted">{r.place}</span>
        </span>
      </figcaption>
    </figure>
  );
}

function Row({ items, reverse }: { items: Review[]; reverse?: boolean }) {
  const loop = [...items, ...items];
  return (
    <div className="group flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
      <div
        className={`flex w-max gap-3 pr-3 ${reverse ? "[animation:marquee_70s_linear_infinite_reverse]" : "[animation:marquee_70s_linear_infinite]"}`}
      >
        {loop.map((r, i) => (
          <div key={i} aria-hidden={i >= items.length} className="flex">
            <Card r={r} />
          </div>
        ))}
      </div>
    </div>
  );
}

/** Recensioni su due file che scorrono in direzioni opposte. */
export function Reviews() {
  const half = Math.ceil(getReviews().length / 2);
  const top = getReviews().slice(0, half);
  const bottom = getReviews().slice(half);
  return (
    <section aria-labelledby="recensioni" className="relative overflow-hidden py-20 md:py-24">
      <div aria-hidden className="pointer-events-none absolute inset-0 [background:radial-gradient(40%_50%_at_50%_0%,rgba(159,232,112,.22),transparent_70%)]" />
      <div className="wrap relative">
        <Reveal className="mx-auto max-w-[680px] text-center">
          <p className="eyebrow">{tr("Recensioni")}</p>
          <h2 id="recensioni" className="h-section mt-3">
            {tr("Lo dicono i")}{" "}<span className="hl">{tr("locali")}</span>{" "}{tr("che lo usano.")}
          </h2>
          <p className="lead mx-auto mt-4 max-w-[520px]">{tr("Pizzerie, ristoranti e botteghe che hanno lasciato il telefono e il quaderno degli ordini.")}</p>
          {reviewsArePlaceholder && (
            <p className="mx-auto mt-5 inline-flex rounded-full border border-dashed border-[#d4d4d8] bg-white px-3 py-1 text-[12.5px] text-muted">
              {tr("Esempi: da sostituire con recensioni vere dei clienti")}
            </p>
          )}
        </Reveal>
      </div>
      <div className="relative mt-10 flex flex-col gap-3">
        <Row items={top} reverse />
        <Row items={bottom} />
      </div>
    </section>
  );
}

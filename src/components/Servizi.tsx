import { tr } from "@/i18n";
import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import { Icon, type IconName } from "./Icon";
import { Reveal } from "./Reveal";
import { lp } from "@/i18n/link";

const exists = (src?: string) => !!src && fs.existsSync(path.join(process.cwd(), "public", src));

/** Foto se il file esiste in public, altrimenti un segnaposto con il numero e la descrizione della foto da inserire. */
export function PhotoSlot({ src, alt, label, pos = "50% 50%", className = "" }: { src?: string; alt: string; label?: string; pos?: string; className?: string }) {
  if (exists(src)) {
    // Se c'è la versione leggera (nome-sm.webp) i telefoni scaricano quella.
    const small = src!.replace(/\.webp$/, "-sm.webp");
    const set = exists(small) ? { srcSet: `${small} 800w, ${src} 1800w`, sizes: "(min-width: 1024px) 560px, 92vw" } : {};
    return (
      <div className={`relative overflow-hidden bg-mist ${className}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} {...set} alt={alt} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" style={{ objectPosition: pos }} />
      </div>
    );
  }
  return (
    <div
      role="img"
      aria-label={alt}
      className={`relative overflow-hidden ${className}`}
      style={{ background: "radial-gradient(120% 90% at 30% 20%, #f3efe6 0%, #e9e2d4 45%, #d9cfbd 100%)" }}
    >
      <div className="absolute inset-0 grid place-items-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/70 text-forest">
          <Icon name="image" size={24} />
        </span>
      </div>
      <div className="absolute inset-x-4 bottom-4 rounded-[14px] bg-white/90 px-3.5 py-2.5 text-[12.5px] leading-snug text-muted backdrop-blur">
        <span className="font-medium text-ink">{label ?? tr("Foto da inserire")}</span>
        {src && <span className="mt-0.5 block font-mono text-[11px] text-faint">{src}</span>}
      </div>
    </div>
  );
}

/** Riga con un elemento visivo (foto o grafica) da un lato e il testo dall'altro. */
export function ArtSplit({ visual, side = "left", eyebrow, title, text, points }: { visual: React.ReactNode; side?: "left" | "right"; eyebrow?: string; title: React.ReactNode; text: string; points?: string[] }) {
  return (
    <div className="wrap grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
      <Reveal className={`order-2 min-w-0 ${side === "left" ? "lg:order-1" : "lg:order-2"}`}>{visual}</Reveal>
      <Reveal delay={80} className={`order-1 min-w-0 ${side === "left" ? "lg:order-2" : "lg:order-1"}`}>
        {eyebrow && <span className="inline-flex items-center rounded-full bg-lime-soft px-2.5 py-1 text-[13px] font-medium text-forest">{eyebrow}</span>}
        <h2 className="h-section mt-4">{title}</h2>
        <p className="lead mt-4 max-w-[540px]">{text}</p>
        {points && (
          <ul className="mt-6 flex flex-col gap-2.5 text-[15.5px] text-text">
            {points.map((p) => (
              <li key={p} className="flex items-start gap-2.5">
                <Icon name="check" size={18} stroke={2.4} className="mt-0.5 flex-none text-[#16a34a]" />
                {p}
              </li>
            ))}
          </ul>
        )}
      </Reveal>
    </div>
  );
}

/** Una sola foto divisa in quattro schede. */
export function Mosaic4({ src, alt, labels, placeholder }: { src: string; alt: string; labels: string[]; placeholder?: string }) {
  if (!exists(src)) {
    return (
      <div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {labels.map((l) => (
            <div key={l} className="relative aspect-[3/4] overflow-hidden rounded-[22px]" style={{ background: "radial-gradient(120% 90% at 30% 20%, #f3efe6 0%, #e9e2d4 45%, #d9cfbd 100%)" }}>
              <span className="absolute bottom-4 left-4 right-4 text-[15px] font-medium text-ink">{l}</span>
            </div>
          ))}
        </div>
        <p className="mt-3 text-[12.5px] text-muted">
          <span className="font-medium text-ink">{placeholder}</span> <span className="font-mono text-[11px] text-faint">{src}</span>
        </p>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4" role="img" aria-label={alt}>
      {labels.map((l, i) => (
        <Reveal key={l} delay={i * 80}>
          <div className="group relative aspect-[3/4] overflow-hidden rounded-[22px] bg-mist">
            <div
              className="absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.03]"
              style={{
                backgroundImage: `url(${src})`,
                backgroundSize: "400% 100%",
                backgroundPosition: `${(i / 3) * 100}% 50%`,
              }}
            />
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/55 to-transparent" />
            <span className="absolute bottom-4 left-4 right-4 text-[15px] font-medium text-white">{l}</span>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

export type Pack = { name: string; for: string; price: string; points: string[]; popular?: boolean };

export function Packages({ items, note }: { items: Pack[]; note?: string }) {
  return (
    <div>
      <div className="grid gap-4 md:grid-cols-3">
        {items.map((p, i) => (
          <Reveal key={p.name} delay={i * 80}>
            <div
              className={`relative flex h-full flex-col rounded-[24px] p-7 ${
                p.popular ? "bg-forest text-[#fafaf8]" : "border border-line bg-white"
              }`}
            >
              {p.popular && (
                <span className="absolute right-6 top-6 rounded-full bg-lime px-2.5 py-1 text-[12px] font-medium text-forest">{tr("Il più scelto")}</span>
              )}
              <h3 className={`text-[22px] font-semibold tracking-[-0.02em] ${p.popular ? "text-white" : "text-ink"}`}>{p.name}</h3>
              <p className={`mt-1.5 text-[14.5px] ${p.popular ? "text-[#b9cfa8]" : "text-muted"}`}>{p.for}</p>
              <p className={`mt-6 text-[30px] font-semibold tracking-[-0.03em] ${p.popular ? "text-white" : "text-ink"}`}>{p.price}</p>
              <ul className="mt-6 flex flex-col gap-2.5 text-[15px]">
                {p.points.map((x) => (
                  <li key={x} className="flex items-start gap-2.5">
                    <Icon name="check" size={16} stroke={2.4} className={`mt-1 flex-none ${p.popular ? "text-lime" : "text-[#16a34a]"}`} />
                    <span className={p.popular ? "text-[#e3eed8]" : "text-text"}>{x}</span>
                  </li>
                ))}
              </ul>
              <Link href={lp("/contatti/")} className={`btn mt-8 w-full ${p.popular ? "btn-dark" : "btn-light"}`}>
                {tr("Chiedi un preventivo")}
              </Link>
            </div>
          </Reveal>
        ))}
      </div>
      {note && <p className="mt-5 text-center text-[13.5px] text-muted">{note}</p>}
    </div>
  );
}

export function Steps({ items }: { items: { t: string; d: string; icon: IconName }[] }) {
  return (
    <ol className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {items.map((s, i) => (
        <Reveal as="li" key={s.t} delay={i * 80} className="relative h-full rounded-[22px] border border-line bg-white p-6">
            <div className="flex items-center justify-between">
              <span className="flex h-11 w-11 items-center justify-center rounded-[12px] bg-lime-soft text-forest">
                <Icon name={s.icon} size={20} />
              </span>
              <span className="font-mono text-[12px] tracking-[0.08em] text-faint">0{i + 1}</span>
            </div>
            <h3 className="mt-5 text-[17px] font-semibold tracking-[-0.015em] text-ink">{s.t}</h3>
            <p className="mt-2 text-[14.5px] leading-relaxed text-muted">{s.d}</p>
        </Reveal>
      ))}
    </ol>
  );
}

export function SectionHead({ eyebrow, title, text, center = false }: { eyebrow?: string; title: React.ReactNode; text?: string; center?: boolean }) {
  return (
    <div className={center ? "mx-auto max-w-[720px] text-center" : "max-w-[720px]"}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className="h-section mt-3">{title}</h2>
      {text && <p className={`lead mt-4 ${center ? "mx-auto" : ""} max-w-[620px]`}>{text}</p>}
    </div>
  );
}

const tones = ["#efe7da", "#e6dccb", "#ece3d3", "#e2d7c4", "#f1eadf", "#e8dfcf"];

function WorkCard({ src, n }: { src: string; n: number }) {
  const size = tr("w-[220px] sm:w-[280px] aspect-[4/5]");
  if (exists(src)) {
    return (
      <div className={`relative flex-none overflow-hidden rounded-[22px] bg-mist ${size}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt="" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
      </div>
    );
  }
  return (
    <div className={`relative flex-none overflow-hidden rounded-[22px] ${size}`} style={{ background: tones[n % tones.length] }}>
      <span className="absolute left-4 top-4 rounded-full bg-white/80 px-2.5 py-1 font-mono text-[11px] text-muted">{tr("lavoro-")}{String(n).padStart(2, "0")}</span>
    </div>
  );
}

function WorkRow({ items, reverse }: { items: number[]; reverse?: boolean }) {
  const loop = [...items, ...items];
  return (
    <div className="flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)]">
      <div className={`flex w-max items-center gap-4 pr-4 ${reverse ? "[animation:marquee_60s_linear_infinite_reverse]" : "[animation:marquee_60s_linear_infinite]"}`}>
        {loop.map((n, i) => (
          <div key={i} aria-hidden={i >= items.length} className="flex">
            <WorkCard n={n} src={`/images/servizi/lavori/lavoro-${String(n).padStart(2, "0")}.webp`} />
          </div>
        ))}
      </div>
    </div>
  );
}

/** Galleria dei lavori: solo foto, su due file che scorrono in direzioni opposte. */
export function Portfolio({ eyebrow, title, text }: { eyebrow: string; title: React.ReactNode; text: string }) {
  return (
    <section aria-label={tr("Alcuni dei nostri lavori")} className="overflow-hidden py-16 md:py-24">
      <div className="wrap">
        <Reveal className="mx-auto max-w-[680px] text-center">
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="h-section mt-3">{title}</h2>
          <p className="lead mx-auto mt-4 max-w-[540px]">{text}</p>
        </Reveal>
      </div>
      <div className="mt-12 flex flex-col gap-4">
        {/* L'ordine alterna le pizze agli altri soggetti, così foto simili non finiscono vicine. */}
        <WorkRow items={[1, 2, 12, 3, 13, 5, 7]} />
        <WorkRow items={[8, 11, 4, 9, 6, 10]} reverse />
      </div>
    </section>
  );
}

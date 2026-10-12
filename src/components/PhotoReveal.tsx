"use client";

import { useEffect, useRef } from "react";

/**
 * Collega lo scorrimento della pagina a un riquadro con foto: il riquadro parte un po' più stretto
 * e si apre mentre entra nello schermo, la foto dentro si avvicina appena (zoom leggero, per non perdere qualità).
 */
function useOpenOnScroll(opts: { side: number; sideSmall: number; top: number; radiusFrom: number; radiusTo: number; zoom: number }) {
  const wrap = useRef<HTMLDivElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const img = useRef<HTMLImageElement>(null);
  const text = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrap.current;
    if (!el || !frame.current || !img.current) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const small = window.innerWidth < 768;
      const p = reduce ? 1 : Math.min(1, Math.max(0, (vh - r.top) / (vh * 0.8)));
      const e = 1 - Math.pow(1 - p, 3);
      const side = (1 - e) * (small ? opts.sideSmall : opts.side);
      const top = (1 - e) * opts.top;
      const radius = opts.radiusFrom - e * (opts.radiusFrom - opts.radiusTo);
      frame.current!.style.clipPath = `inset(${top}% ${side}% ${top}% ${side}% round ${radius}px)`;
      img.current!.style.transform = `scale(${1 + opts.zoom * (1 - e)})`;
      if (text.current) {
        const t = Math.min(1, Math.max(0, (e - 0.55) / 0.35));
        text.current.style.opacity = String(t);
        text.current.style.transform = `translateY(${(1 - t) * 16}px)`;
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [opts.side, opts.sideSmall, opts.top, opts.radiusFrom, opts.radiusTo, opts.zoom]);

  return { wrap, frame, img, text };
}

/** Foto larga al centro, con la scritta in basso. */
export function PhotoReveal({ src, alt, caption, eyebrow, pos = "50% 50%" }: { src: string; alt: string; caption?: string; eyebrow?: string; pos?: string }) {
  const { wrap, frame, img, text } = useOpenOnScroll({ side: 10, sideSmall: 4, top: 6, radiusFrom: 36, radiusTo: 24, zoom: 0.05 });
  return (
    <div ref={wrap} className="wrap">
      <div
        ref={frame}
        className="relative mx-auto aspect-[4/3] max-h-[78vh] w-full overflow-hidden rounded-[24px] bg-mist md:aspect-[16/10]"
        style={{ clipPath: "inset(6% 10% 6% 10% round 36px)", willChange: "clip-path" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={img}
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: pos, transform: "scale(1.05)", willChange: "transform" }}
        />
        {caption && (
          <>
            <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-[50%] bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            <div ref={text} className="absolute inset-x-0 bottom-0 p-6 opacity-0 md:p-12">
              {eyebrow && <span className="inline-flex items-center rounded-full bg-lime px-2.5 py-1 text-[12.5px] font-medium text-forest">{eyebrow}</span>}
              <p className="mt-3 max-w-[720px] text-[clamp(1.5rem,1.1rem+2vw,2.75rem)] font-semibold leading-[1.06] tracking-[-0.035em] text-white">{caption}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/** Foto da un lato, titolo e testo dall'altro. La foto si vede intera (formato 4:3). */
export function PhotoSplit({
  src,
  alt,
  pos = "50% 50%",
  side = "left",
  eyebrow,
  title,
  text: body,
  points,
  children,
}: {
  src: string;
  alt: string;
  pos?: string;
  side?: "left" | "right";
  eyebrow?: string;
  title: React.ReactNode;
  text: string;
  points?: string[];
  children?: React.ReactNode;
}) {
  const { wrap, frame, img, text } = useOpenOnScroll({ side: 6, sideSmall: 4, top: 6, radiusFrom: 32, radiusTo: 24, zoom: 0.04 });
  return (
    <div ref={wrap} className="wrap grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
      <div className={`min-w-0 ${side === "left" ? "lg:order-1" : "lg:order-2"}`}>
        <div
          ref={frame}
          className="relative aspect-[4/3] overflow-hidden rounded-[24px] bg-mist"
          style={{ clipPath: "inset(6% 6% 6% 6% round 32px)", willChange: "clip-path" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            ref={img}
            src={src}
            alt={alt}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
            style={{ objectPosition: pos, transform: "scale(1.04)", willChange: "transform" }}
          />
        </div>
      </div>
      <div ref={text} className={`min-w-0 opacity-0 ${side === "left" ? "lg:order-2" : "lg:order-1"}`}>
        {eyebrow && <span className="inline-flex items-center rounded-full bg-lime-soft px-2.5 py-1 text-[13px] font-medium text-forest">{eyebrow}</span>}
        <h2 className="h-section mt-4">{title}</h2>
        <p className="lead mt-4 max-w-[540px]">{body}</p>
        {points && (
          <ul className="mt-6 flex flex-col gap-2.5 text-[15.5px] text-text">
            {points.map((p) => (
              <li key={p} className="flex items-start gap-2.5">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="mt-0.5 flex-none text-[#16a34a]" aria-hidden>
                  <path d="M5 12.5l4.5 4.5L19 7.5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {p}
              </li>
            ))}
          </ul>
        )}
        {children}
      </div>
    </div>
  );
}

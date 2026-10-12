"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Una nota scritta a mano con una freccia curva che si disegna quando entra nello schermo.
 * `variant` sceglie la forma della freccia: "down-right" scende verso destra, "right-down" va a destra e poi giù.
 */
export function HandNote({ text, variant = "down-right", className = "" }: { text: string; variant?: "down-right" | "right-down"; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((e) => {
      if (e[0].isIntersecting) {
        setOn(true);
        io.disconnect();
      }
    }, { threshold: 0.6 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const arrow =
    variant === "down-right" ? (
      <svg width="78" height="52" viewBox="0 0 78 52" fill="none" aria-hidden className="flex-none">
        <path className="hand-path" d="M4 8 C 30 2, 58 8, 66 38" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
        <path className="hand-head" d="M57 31 L 67 41 L 73 28" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ) : (
      <svg width="64" height="44" viewBox="0 0 64 44" fill="none" aria-hidden className="flex-none">
        <path className="hand-path" d="M4 12 C 26 4, 48 8, 54 32" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
        <path className="hand-head" d="M45 26 L 55 35 L 60 23" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );

  return (
    <div ref={ref} className={`flex items-start gap-1 text-forest ${on ? "is-drawn" : ""} ${className}`}>
      <span className="hand hand-text min-w-0 pt-0.5 text-[24px] sm:whitespace-nowrap sm:text-[26px]">{text}</span>
      {arrow}
    </div>
  );
}

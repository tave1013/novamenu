"use client";

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";

/** Velocità generale delle demo: valori più bassi = più veloci. */
const SPEED = 0.7;

export type Step<S> = {
  /** Durata del passo in millisecondi. */
  dur: number;
  /** Elemento verso cui va il cursore: valore dell'attributo data-t. */
  target?: string;
  /** Il cursore clicca all'inizio del passo. */
  click?: boolean;
  /** Modifiche allo stato della scena applicate all'inizio del passo. */
  patch?: Partial<S>;
};

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(m.matches);
    const on = () => setReduced(m.matches);
    m.addEventListener("change", on);
    return () => m.removeEventListener("change", on);
  }, []);
  return reduced;
}

/**
 * Regia di una piccola demo animata: avanza i passi in loop solo quando è visibile.
 * Lo stato è ricalcolato dall'inizio a ogni passo, così il loop riparte sempre pulito.
 */
export function useDemo<S extends object>(steps: Step<S>[], initial: S, opts: { restIndex?: number } = {}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const reduced = usePrefersReducedMotion();
  const [i, setI] = useState(0);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver((e) => setVisible(e.some((x) => x.isIntersecting)), { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const running = visible && !reduced;
  const index = reduced ? opts.restIndex ?? steps.length - 1 : i;

  useEffect(() => {
    if (!running) return;
    const t = window.setTimeout(() => setI((v) => (v + 1) % steps.length), steps[i].dur * SPEED);
    return () => window.clearTimeout(t);
  }, [running, i, steps]);

  const state = useMemo(() => {
    let s = { ...initial };
    for (let k = 0; k <= index; k++) if (steps[k].patch) s = { ...s, ...steps[k].patch };
    return s;
  }, [index, steps, initial]);

  return { rootRef, i: index, step: steps[index], state, running, reduced };
}

let legacyZoom: boolean | null = null;
/**
 * Le grafiche dei telefoni usano la proprietà CSS zoom. I browser recenti restituiscono le misure
 * di un elemento già ingrandite o ridotte; i Safari meno recenti (anche su iPad e iPhone) le restituiscono
 * divise per lo zoom. Qui si scopre una volta sola come si comporta il browser.
 */
function legacyZoomRects(): boolean {
  if (legacyZoom !== null) return legacyZoom;
  const outer = document.createElement("div");
  outer.style.cssText = "position:absolute;left:-9999px;top:0;visibility:hidden;zoom:2";
  const inner = document.createElement("div");
  inner.style.cssText = "width:100px;height:10px";
  outer.appendChild(inner);
  document.body.appendChild(outer);
  legacyZoom = inner.getBoundingClientRect().width < 150;
  outer.remove();
  return legacyZoom;
}

/** Zoom complessivo applicato a un elemento, il suo e quello di tutti gli elementi che lo contengono. */
function totalZoom(el: Element | null): number {
  let z = 1;
  for (let n = el; n; n = n.parentElement) {
    const raw = getComputedStyle(n).getPropertyValue("zoom");
    const v = parseFloat(raw) / (raw.trim().endsWith("%") ? 100 : 1);
    if (v > 0) z *= v;
  }
  return z;
}

/** Cursore che si sposta sull'elemento con data-t uguale a target e simula il clic. */
export function Cursor({
  rootRef,
  target,
  click,
  stepKey,
  hidden,
  touch = false,
}: {
  rootRef: React.RefObject<HTMLDivElement | null>;
  target?: string;
  click?: boolean;
  stepKey: number;
  hidden?: boolean;
  touch?: boolean;
}) {
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);

  const measure = useCallback(() => {
    const root = rootRef.current;
    if (!root || !target) return;
    const el = root.querySelector<HTMLElement>(`[data-t="${target}"]`);
    if (!el) return;
    const r = root.getBoundingClientRect();
    const b = el.getBoundingClientRect();
    if (legacyZoomRects()) {
      // Safari meno recenti: le misure prese dentro un elemento con zoom non sono in pixel dello schermo
      // e cambiano con lo scorrimento della pagina. Si misura quindi rispetto a un punto di riferimento
      // messo nell'angolo della scena con lo stesso zoom dell'elemento: la differenza tra i due è affidabile.
      const zr = totalZoom(root);
      const zb = totalZoom(el);
      const probe = document.createElement("span");
      probe.style.cssText = `position:absolute;left:0;top:0;width:1px;height:1px;visibility:hidden;pointer-events:none;zoom:${zb / zr}`;
      root.appendChild(probe);
      const p = probe.getBoundingClientRect();
      probe.remove();
      const k = zb / zr;
      setPos({ x: (b.left + b.width * 0.55 - p.left) * k, y: (b.top + b.height * 0.6 - p.top) * k });
      return;
    }
    const sx = root.offsetWidth ? r.width / root.offsetWidth : 1;
    const sy = root.offsetHeight ? r.height / root.offsetHeight : 1;
    setPos({ x: (b.left - r.left + b.width * 0.55) / sx, y: (b.top - r.top + b.height * 0.6) / sy });
  }, [rootRef, target]);

  useLayoutEffect(() => {
    measure();
  }, [measure, stepKey]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const ro = new ResizeObserver(() => measure());
    ro.observe(root);
    return () => ro.disconnect();
  }, [measure, rootRef]);

  if (!pos || hidden) return null;
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute left-0 top-0 z-30"
      style={{
        transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
        transition: "transform 0.62s cubic-bezier(0.45, 0.05, 0.25, 1)",
      }}
    >
      {click && (
        <span
          key={stepKey}
          className="absolute left-0 top-0 h-10 w-10 rounded-full bg-black/25"
          style={{ animation: "ripple .6s ease-out both" }}
        />
      )}
      {touch ? (
        <span
          key={`t${stepKey}`}
          className="absolute -left-[14px] -top-[14px] block h-7 w-7 rounded-full border-2 border-white bg-black/35 shadow-[0_4px_14px_rgba(0,0,0,.25)]"
          style={click ? { animation: "pop .35s ease both" } : undefined}
        />
      ) : (
        <svg
          key={`c${stepKey}`}
          width="22"
          height="22"
          viewBox="0 0 24 24"
          className="-translate-x-[3px] -translate-y-[2px] drop-shadow-[0_3px_6px_rgba(0,0,0,.28)]"
          style={click ? { animation: "cursorPress .32s ease both" } : undefined}
        >
          <path d="M4 2.5l15.5 9.2-6.9 1.4 3.9 7.3-3 1.6-3.9-7.3L4.6 19z" fill="#000" stroke="#fff" strokeWidth="1.4" strokeLinejoin="round" />
        </svg>
      )}
    </div>
  );
}

/** Notifica che compare in basso nella scena. */
export function Toast({ text, tone = "dark", stepKey }: { text: string | null; tone?: "dark" | "green"; stepKey: number }) {
  if (!text) return null;
  return (
    <div
      key={stepKey}
      role="status"
      className={`pointer-events-none absolute bottom-4 left-1/2 z-20 flex w-max max-w-[88%] items-center gap-2 rounded-[14px] px-3.5 py-2.5 text-[13px] font-medium leading-snug shadow-[0_12px_30px_-10px_rgba(0,0,0,.45)] ${
        tone === "green" ? "bg-[#0f5132] text-white" : "bg-black text-white"
      }`}
      style={{ animation: "toastIn .45s var(--ease-out-soft) both" }}
    >
      <span className="inline-flex h-4 w-4 flex-none items-center justify-center rounded-full bg-ios">
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12.5l4.5 4.5L19 7.5" />
        </svg>
      </span>
      <span className="min-w-0">{text}</span>
    </div>
  );
}

/** Interruttore iOS non interattivo, per le scene. */
export function Toggle({ on, small, t }: { on: boolean; small?: boolean; t?: string }) {
  return <span data-t={t} data-on={on} className={`toggle ${small ? "toggle-sm" : ""}`} />;
}

"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

/** Scorrimento morbido della pagina. Ogni cambio di pagina riparte dall'inizio. */
export function SmoothScroll() {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    if (!location.hash) window.scrollTo(0, 0);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ lerp: 0.14, wheelMultiplier: 1, anchors: { offset: -80 } });
    lenisRef.current = lenis;
    let id = 0;
    const raf = (t: number) => {
      lenis.raf(t);
      id = requestAnimationFrame(raf);
    };
    id = requestAnimationFrame(raf);
    // Con il trackpad, mentre si scorre in verticale le dita si spostano sempre un po' di lato.
    // Quei piccoli movimenti laterali non devono arrivare al browser, che li prenderebbe per il gesto
    // "torna indietro". Se invece il gesto parte in orizzontale non si tocca niente, così tornare
    // indietro con due dita continua a funzionare.
    let lastWheel = 0;
    let vertical = false;
    const onWheel = (e: WheelEvent) => {
      if (e.timeStamp - lastWheel > 180) vertical = Math.abs(e.deltaY) >= Math.abs(e.deltaX);
      lastWheel = e.timeStamp;
      if (vertical && e.deltaY === 0 && e.deltaX !== 0 && !e.ctrlKey) e.preventDefault();
    };
    window.addEventListener("wheel", onWheel, { passive: false, capture: true });
    // Quando il menu mobile blocca lo scorrimento, ferma anche Lenis.
    const mo = new MutationObserver(() => {
      if (document.documentElement.style.overflow === "hidden") lenis.stop();
      else lenis.start();
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["style"] });
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("wheel", onWheel, { capture: true });
      mo.disconnect();
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Nuova pagina: torna in cima subito, senza animazione.
  useEffect(() => {
    if (location.hash) return;
    lenisRef.current?.scrollTo(0, { immediate: true, force: true });
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

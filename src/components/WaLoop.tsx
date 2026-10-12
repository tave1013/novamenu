"use client";

import { useEffect, useRef, useState } from "react";

const msgs = [
  { me: true, t: "Ciao Giulia! Grazie per la cena di sabato 🍕 Com'è andata?" },
  { me: false, t: "Benissimo, la diavola era top!" },
  { me: true, t: "Che bello! Ti lasciamo un 10% sul prossimo asporto: codice GIULIA10" },
  { me: false, t: "Grazie mille, ordino venerdì 😍" },
];

/** Messaggi WhatsApp che compaiono uno alla volta, poi ricominciano. Si muove solo quando è visibile. */
export function WaLoop() {
  const ref = useRef<HTMLDivElement>(null);
  const [n, setN] = useState(msgs.length);
  const [run, setRun] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver((e) => setRun(e[0].isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!run) return;
    setN(0);
    let i = 0;
    const id = window.setInterval(() => {
      i = i >= msgs.length + 2 ? 0 : i + 1;
      setN(Math.min(i, msgs.length));
    }, 1300);
    return () => window.clearInterval(id);
  }, [run]);

  return (
    <div ref={ref} className="flex min-h-[214px] flex-col justify-end gap-1.5" aria-label="Esempio di messaggi automatici su WhatsApp">
      {msgs.slice(0, n).map((m, i) => (
        <div
          key={i}
          className={`max-w-[84%] rounded-[12px] px-3 py-2 text-[12.5px] leading-snug shadow-[0_6px_16px_-10px_rgba(0,0,0,.5)] [animation:waIn_.35s_var(--ease-out-soft)_both] ${
            m.me ? "self-end rounded-br-[4px] bg-[#d9fdd3] text-[#111b21]" : "self-start rounded-bl-[4px] bg-white text-[#111b21]"
          }`}
        >
          {m.t}
          <span className="ml-2 inline-block text-[10px] text-[#667781]">{m.me ? "19:4" + (i + 1) + " ✓✓" : "19:4" + (i + 1)}</span>
        </div>
      ))}
      {run && n < msgs.length && (
        <div className={`flex gap-1 rounded-[12px] px-3 py-2.5 ${msgs[n].me ? "self-end bg-[#d9fdd3]" : "self-start bg-white"}`}>
          {[0, 1, 2].map((d) => (
            <span key={d} className="h-1.5 w-1.5 rounded-full bg-[#8696a0]" style={{ animation: `typing 1s ${d * 0.15}s infinite` }} />
          ))}
        </div>
      )}
    </div>
  );
}

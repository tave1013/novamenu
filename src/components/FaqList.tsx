"use client";

import { useState } from "react";
import { Icon } from "./Icon";

/** Elenco di domande: una sola aperta alla volta, con apertura e chiusura morbide. */
export function FaqList({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="mt-10 border-t border-line">
      {items.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={i} className="border-b border-line">
            <h3>
              <button
                type="button"
                id={`faq-q-${i}`}
                aria-expanded={isOpen}
                aria-controls={`faq-a-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex min-h-[64px] w-full cursor-pointer items-center justify-between gap-6 py-4 text-left text-[17px] font-medium tracking-[-0.01em] text-ink"
              >
                {f.q}
                <span
                  className={`inline-flex h-7 w-7 flex-none items-center justify-center rounded-[8px] border border-line bg-white transition-transform duration-[380ms] [transition-timing-function:cubic-bezier(.4,0,.2,1)] ${isOpen ? "rotate-45" : ""}`}
                >
                  <Icon name="plus" size={15} stroke={2} />
                </span>
              </button>
            </h3>
            <div
              id={`faq-a-${i}`}
              role="region"
              aria-labelledby={`faq-q-${i}`}
              aria-hidden={!isOpen}
              className={`grid transition-[grid-template-rows,opacity] duration-[380ms] [transition-timing-function:cubic-bezier(.4,0,.2,1)] motion-reduce:transition-none ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p className="-mt-1 max-w-[680px] pb-5 pr-10 text-[16px] leading-relaxed text-muted">{f.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

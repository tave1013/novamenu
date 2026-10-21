"use client";

/** Apre la stampa del browser: da lì si stampa o si salva in PDF (foglio di stile di stampa in globals.css). */
export function StampaButton({ label }: { label: string }) {
  return (
    <button type="button" onClick={() => window.print()} className="btn btn-light btn-sm gap-2" data-no-print>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M6 9V3h12v6M6 18H4a1 1 0 0 1-1-1v-6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6a1 1 0 0 1-1 1h-2" />
        <path d="M6 14h12v7H6z" />
      </svg>
      {label}
    </button>
  );
}

"use client";

import { useEffect } from "react";

/**
 * Pagine legali pubbliche: Ctrl+P e Cmd+P non aprono la stampa.
 * Se la stampa parte dal menu del browser, il foglio di stile di stampa (globals.css)
 * mostra solo il messaggio .stampa-non-disponibile.
 * Le copie dei Termini e del DPA accettati arrivano al cliente in PDF dalla piattaforma.
 */
export function BloccoStampa() {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && !e.altKey && e.key.toLowerCase() === "p") {
        e.preventDefault();
        e.stopPropagation();
      }
    };
    window.addEventListener("keydown", onKey, { capture: true });
    return () => window.removeEventListener("keydown", onKey, { capture: true });
  }, []);
  return null;
}

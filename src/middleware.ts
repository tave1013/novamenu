import { NextResponse, type NextRequest } from "next/server";
import { COOKIE_LINGUA, linguaIniziale } from "@/i18n/lingua-iniziale";

/*
 * Lingua alla prima visita della home.
 * - Se l'utente ha scelto una lingua dal selettore (cookie NEXT_LOCALE), vale sempre la sua scelta.
 * - Altrimenti decide il paese dell'IP (header di Vercel x-vercel-ip-country):
 *   Italia, San Marino e Città del Vaticano restano in italiano, gli altri paesi vanno all'inglese.
 *   Senza paese si resta in italiano.
 * - I motori di ricerca non vengono mai spostati: leggono entrambe le versioni tramite hreflang.
 * Gli indirizzi con la lingua esplicita (/en/..., /prezzi/, /legale/...) non passano da qui.
 */
export function middleware(req: NextRequest) {
  const lingua = linguaIniziale({
    cookie: req.cookies.get(COOKIE_LINGUA)?.value,
    paese: req.headers.get("x-vercel-ip-country"),
    userAgent: req.headers.get("user-agent"),
  });
  if (lingua !== "en") return NextResponse.next();
  const url = req.nextUrl.clone();
  url.pathname = "/en/";
  const res = NextResponse.redirect(url, 307);
  res.headers.set("Cache-Control", "private, no-store");
  return res;
}

export const config = { matcher: ["/"] };

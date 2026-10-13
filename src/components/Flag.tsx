import type { Locale } from "@/i18n/config";

/*
 * Bandiere disegnate in SVG, così si vedono uguali su ogni sistema (le emoji bandiera su Windows non compaiono).
 * Sono decorative: il nome della lingua sta sempre nel testo o nell'aria-label accanto.
 */
const flags: Record<Locale, React.ReactNode> = {
  it: (
    <>
      <rect width="1" height="2" fill="#009246" />
      <rect x="1" width="1" height="2" fill="#fff" />
      <rect x="2" width="1" height="2" fill="#ce2b37" />
    </>
  ),
  en: (
    <>
      <rect width="60" height="30" fill="#012169" />
      <path d="M0 0l60 30M60 0L0 30" stroke="#fff" strokeWidth="6" />
      <path d="M0 0l60 30M60 0L0 30" stroke="#c8102e" strokeWidth="4" clipPath="url(#flag-en-clip)" />
      <path d="M30 0v30M0 15h60" stroke="#fff" strokeWidth="10" />
      <path d="M30 0v30M0 15h60" stroke="#c8102e" strokeWidth="6" />
    </>
  ),
};

const viewBox: Record<Locale, string> = { it: "0 0 3 2", en: "0 0 60 30" };

export function Flag({ code, width = 20, height = 14, className = "" }: { code: Locale; width?: number; height?: number; className?: string }) {
  return (
    <svg
      aria-hidden
      width={width}
      height={height}
      viewBox={viewBox[code]}
      preserveAspectRatio="xMidYMid slice"
      className={`flex-none rounded-[3px] shadow-[0_0_0_1px_rgba(0,0,0,.08)] ${className}`}
    >
      {code === "en" && (
        <defs>
          {/* Le croci rosse diagonali del Regno Unito sono sfalsate: si vedono solo su metà di ogni braccio. */}
          <clipPath id="flag-en-clip">
            <path d="M30 15h30v15zv15H0zH0V0zV0h30z" />
          </clipPath>
        </defs>
      )}
      {flags[code]}
    </svg>
  );
}

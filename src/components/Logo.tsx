import Link from "next/link";
import { site } from "@/config/site";
import { lp } from "@/i18n/link";

export function LogoMark({ size = 28, invert = false }: { size?: number; invert?: boolean }) {
  return (
    <span
      aria-hidden
      className="inline-flex flex-none items-center justify-center"
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.3,
        background: invert ? "#fff" : "#000",
      }}
    >
      <svg width={size * 0.56} height={size * 0.56} viewBox="0 0 24 24" fill="none">
        <rect x="3" y="4" width="18" height="3.2" rx="1.6" fill={invert ? "#000" : "#fff"} />
        <rect x="3" y="10.4" width="11" height="3.2" rx="1.6" fill={invert ? "#000" : "#fff"} />
        <rect x="3" y="16.8" width="14.5" height="3.2" rx="1.6" fill={invert ? "#000" : "#fff"} />
        <circle cx="19.2" cy="12" r="1.9" fill="#9FE870" />
      </svg>
    </span>
  );
}

export function Logo({ invert = false }: { invert?: boolean }) {
  return (
    <Link href={lp("/")} className="inline-flex items-center gap-2.5" aria-label={`${site.name}, torna alla home`}>
      <LogoMark invert={invert} />
      <span className={`text-[17px] font-semibold tracking-[-0.03em] ${invert ? "text-white" : "text-ink"}`}>{site.name}</span>
    </Link>
  );
}

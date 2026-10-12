/** Cornici riutilizzabili: telefono e finestra dell'app. */

export function PhoneFrame({
  children,
  className = "",
  width = 280,
  dark = false,
  zoom = 0.82,
}: {
  children: React.ReactNode;
  className?: string;
  width?: number;
  dark?: boolean;
  /** Riduce tutto il telefono mantenendo le proporzioni. */
  zoom?: number;
}) {
  return (
    <div
      className={`relative flex-none rounded-[46px] bg-[#0b0b0c] p-[9px] shadow-[0_50px_100px_-40px_rgba(0,0,0,.55),0_0_0_1px_rgba(0,0,0,.08)] ${className}`}
      style={{ width, zoom }}
    >
      <div className={`relative h-full overflow-hidden rounded-[37px] ${dark ? "bg-black" : "bg-white"}`}>
        <div className="absolute left-1/2 top-[9px] z-40 h-[24px] w-[82px] -translate-x-1/2 rounded-full bg-black" />
        <div className={`flex h-[44px] items-end justify-between px-6 pb-1 text-[12px] font-semibold ${dark ? "text-white" : "text-ink"}`}>
          <span>20:14</span>
          <span className="flex items-center gap-1">
            <svg width="16" height="10" viewBox="0 0 16 10" fill="currentColor">
              <rect x="0" y="6" width="3" height="4" rx="1" />
              <rect x="4.3" y="4" width="3" height="6" rx="1" />
              <rect x="8.6" y="2" width="3" height="8" rx="1" />
              <rect x="12.9" y="0" width="3" height="10" rx="1" />
            </svg>
            <svg width="22" height="11" viewBox="0 0 22 11" fill="none">
              <rect x=".5" y=".5" width="19" height="10" rx="3" stroke="currentColor" opacity=".4" />
              <rect x="2" y="2" width="14" height="7" rx="1.8" fill="currentColor" />
              <rect x="20.2" y="3.5" width="1.3" height="4" rx=".6" fill="currentColor" opacity=".4" />
            </svg>
          </span>
        </div>
        {children}
      </div>
    </div>
  );
}

export function AppWindow({ children, className = "", title }: { children: React.ReactNode; className?: string; title?: string }) {
  return (
    <div
      className={`relative overflow-hidden rounded-[18px] border border-black/[0.08] bg-white shadow-[0_60px_120px_-50px_rgba(0,0,0,.45),0_0_0_1px_rgba(0,0,0,.02)] ${className}`}
    >
      <div className="flex h-10 items-center gap-2 border-b border-line-soft bg-[#fbfbfc] px-4">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        {title && (
          <span className="mx-auto flex h-6 min-w-0 max-w-[60%] items-center gap-1.5 truncate rounded-md bg-mist px-3 text-[11.5px] text-muted">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
              <path d="M5 11h14v10H5zM8 11V7a4 4 0 0 1 8 0v4" />
            </svg>
            {title}
          </span>
        )}
        {title && <span className="w-[52px]" />}
      </div>
      {children}
    </div>
  );
}

/** Contenitore grigio chiaro su cui appoggiare le scene delle pagine. */
export function Stage({ children, className = "", tone = "mist" }: { children: React.ReactNode; className?: string; tone?: "mist" | "dark" | "clear" }) {
  return (
    <div
      className={`relative rounded-[24px] ${tone === "clear" ? "" : "overflow-hidden"} ${tone === "dark" ? "bg-[#18181b]" : tone === "mist" ? "bg-mist" : ""} ${className}`}
    >
      {children}
    </div>
  );
}

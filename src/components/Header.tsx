"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { features, featureGroups } from "@/content/features";
import { sectors } from "@/content/sectors";
import { loginUrl, signupUrl } from "@/config/site";
import { Icon } from "./Icon";
import { Logo } from "./Logo";

const links = [
  { href: "/prezzi/", label: "Prezzi" },
  { href: "/guide/", label: "Guide" },
  { href: "/contatti/", label: "Contatti" },
];

type Drop = "funz" | "sett" | null;

const sectorGroups = [
  { name: "Locali", slugs: ["pizzerie", "ristoranti", "pub", "bar"] },
  { name: "Botteghe del cibo", slugs: ["gelaterie", "pastifici", "panetterie", "gastronomie"] },
];
type Panel = "root" | "funz" | "sett";

function DropButton({ id, label, open, active, onToggle }: { id: string; label: string; open: boolean; active: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      aria-expanded={open}
      aria-controls={id}
      onClick={onToggle}
      className={`inline-flex h-9 items-center gap-1 rounded-[9px] px-3 text-[15px] tracking-[-0.01em] transition-colors duration-300 hover:bg-black/[0.04] ${
        active || open ? "text-ink" : "text-text"
      } ${open ? "bg-black/[0.05]" : ""}`}
    >
      {label}
      <Icon name="chevronDown" size={15} stroke={2} className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
    </button>
  );
}

const dropBox =
  "absolute top-[calc(100%+12px)] origin-top rounded-[16px] border border-line bg-white p-3.5 shadow-[0_24px_48px_-20px_rgba(0,0,0,.22)] [animation:menuIn_.18s_var(--ease-out-soft)_both]";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState<Drop>(null);
  const [mobile, setMobile] = useState(false);
  const [panel, setPanel] = useState<Panel>("root");
  const closeTimer = useRef<number | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(null);
    setMobile(false);
    setPanel("root");
  }, [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(null);
        setMobile(false);
      }
    };
    const onDown = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(null);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("mousedown", onDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mousedown", onDown);
    };
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = mobile ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [mobile]);

  const enter = (d: Drop) => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setOpen(d);
  };
  const leave = () => {
    closeTimer.current = window.setTimeout(() => setOpen(null), 160);
  };

  const isActive = (href: string) => pathname?.startsWith(href.replace(/\/$/, ""));
  
  return (
    <>
      <header
        className={`sticky top-0 z-50 border-b backdrop-blur-xl backdrop-saturate-150 transition-colors duration-500 ${
          mobile ? "border-line bg-[#fafaf8]" : scrolled || open ? "border-line bg-[#fafaf8]/90" : "border-transparent bg-[#fafaf8]"
        }`}
      >
        <div ref={wrapRef} className="wrap flex h-16 items-center justify-between gap-6">
          <Logo />

          <nav aria-label="Principale" className="hidden items-center gap-1 lg:flex">
            {/* Funzionalità */}
            <div onMouseEnter={() => enter("funz")} onMouseLeave={leave} className="relative">
              <DropButton
                id="menu-funzionalita"
                label="Funzionalità"
                open={open === "funz"}
                active={!!pathname?.startsWith("/funzionalita")}
                onToggle={() => setOpen((v) => (v === "funz" ? null : "funz"))}
              />
              {open === "funz" && (
                <div id="menu-funzionalita" className={`${dropBox} left-[-8px] w-[560px]`}>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                    {featureGroups.map((g) => (
                      <div key={g}>
                        <p className="eyebrow mb-1 px-2.5 !text-[11px]">{g}</p>
                        <ul>
                          {features
                            .filter((f) => f.group === g)
                            .map((f) => (
                              <li key={f.slug}>
                                <Link
                                  href={`/funzionalita/${f.slug}/`}
                                  className="flex h-9 items-center gap-2.5 rounded-[8px] px-2.5 text-[14.5px] text-text transition-colors duration-300 hover:bg-mist hover:text-ink"
                                >
                                  <span className="text-muted">
                                    <Icon name={f.icon} size={16} />
                                  </span>
                                  {f.name}
                                </Link>
                              </li>
                            ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 flex items-center justify-between gap-3 border-t border-line-soft px-2.5 pt-3">
                    <Link href="/funzionalita/" className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-ink">
                      Tutte le funzionalità
                      <Icon name="arrowRight" size={14} stroke={2} />
                    </Link>
                    <Link href="/demo/" className="text-[13px] text-muted hover:text-ink">
                      Prenota una demo
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Settori */}
            <div onMouseEnter={() => enter("sett")} onMouseLeave={leave} className="relative">
              <DropButton
                id="menu-settori"
                label="Settori"
                open={open === "sett"}
                active={!!pathname?.startsWith("/settori")}
                onToggle={() => setOpen((v) => (v === "sett" ? null : "sett"))}
              />
              {open === "sett" && (
                <div id="menu-settori" className={`${dropBox} left-[-8px] w-[520px]`}>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                    {sectorGroups.map((g) => (
                      <div key={g.name}>
                        <p className="eyebrow mb-1 px-2.5 !text-[11px]">{g.name}</p>
                        <ul>
                          {sectors
                            .filter((s) => g.slugs.includes(s.slug))
                            .map((s) => (
                              <li key={s.slug}>
                                <Link
                                  href={`/settori/${s.slug}/`}
                                  className="flex h-9 items-center gap-2.5 rounded-[8px] px-2.5 text-[14.5px] text-text transition-colors hover:bg-mist hover:text-ink"
                                >
                                  <span className="text-muted">
                                    <Icon name={s.icon} size={16} />
                                  </span>
                                  {s.name}
                                </Link>
                              </li>
                            ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 flex items-center justify-between gap-3 border-t border-line-soft px-2.5 pt-3">
                    <Link href="/settori/" className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-ink">
                      Tutti i settori
                      <Icon name="arrowRight" size={14} stroke={2} />
                    </Link>
                    <Link href="/demo/" className="text-[13px] text-muted hover:text-ink">
                      Prenota una demo
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`inline-flex h-9 items-center rounded-[9px] px-3 text-[15px] tracking-[-0.01em] transition-colors duration-300 hover:bg-black/[0.04] ${
                  isActive(l.href) ? "text-ink" : "text-text"
                }`}
                aria-current={isActive(l.href) ? "page" : undefined}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <a href={loginUrl} className="btn btn-sm text-text hover:bg-black/[0.04]">
              Accedi
            </a>
            <Link href="/demo/" className="btn btn-sm btn-dark pulse">
              Prenota una demo
            </Link>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <a href={signupUrl} className="btn btn-sm btn-dark h-9 px-3 text-[13.5px] sm:h-10 sm:px-4">
              Prova gratis
            </a>
            <button
              type="button"
              onClick={() => {
                setMobile((v) => !v);
                setPanel("root");
              }}
              aria-expanded={mobile}
              aria-controls="menu-mobile"
              aria-label={mobile ? "Chiudi il menu" : "Apri il menu"}
              className="-mr-2 inline-flex h-11 w-11 items-center justify-center rounded-[10px] text-ink hover:bg-black/[0.04]"
            >
              <Icon name={mobile ? "x" : "menu"} size={22} stroke={1.9} />
            </button>
          </div>
        </div>
      </header>

      {mobile && (
        <div
          id="menu-mobile"
          className="fixed inset-x-0 bottom-0 top-16 z-[60] flex flex-col overflow-hidden bg-[#fafaf8] lg:hidden [animation:fadeIn_.2s_ease_both]"
        >
          <div className="relative min-h-0 flex-1 overflow-hidden">
          <div
            className="absolute inset-0 flex w-[300%] transition-transform duration-300 [transition-timing-function:var(--ease-out-soft)]"
            style={{ transform: `translateX(-${((panel === "root" ? 0 : panel === "funz" ? 1 : 2) * 100) / 3}%)` }}
          >
            {/* Principale */}
            <nav aria-label="Menu" className="h-full w-1/3 overflow-y-auto px-5 pb-6 pt-2" aria-hidden={panel !== "root"}>
              <ul className="divide-y divide-line-soft">
                <li>
                  <Link href="/" tabIndex={panel === "root" ? 0 : -1} className="flex items-center justify-between py-4 text-[22px] font-semibold tracking-[-0.03em] text-ink">
                    Home
                  </Link>
                </li>
                {(
                  [
                    ["funz", "Funzionalità"],
                    ["sett", "Settori"],
                  ] as const
                ).map(([p, label]) => (
                  <li key={p}>
                    <button
                      type="button"
                      onClick={() => setPanel(p)}
                      tabIndex={panel === "root" ? 0 : -1}
                      className="flex w-full items-center justify-between py-4 text-left text-[22px] font-semibold tracking-[-0.03em] text-ink"
                    >
                      {label}
                      <Icon name="chevronRight" size={22} stroke={2} className="text-faint" />
                    </button>
                  </li>
                ))}
                {[
                  { href: "/prezzi/", label: "Prezzi" },
                  { href: "/guide/", label: "Guide" },
                  { href: "/demo/", label: "Prenota una demo" },
                ].map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} tabIndex={panel === "root" ? 0 : -1} className="flex items-center justify-between py-4 text-[22px] font-semibold tracking-[-0.03em] text-ink">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Funzionalità */}
            <nav aria-label="Funzionalità" className="h-full w-1/3 overflow-y-auto px-5 pb-6 pt-2" aria-hidden={panel !== "funz"}>
              <BackButton onClick={() => setPanel("root")} focusable={panel === "funz"} />
              <p className="mt-1 text-[22px] font-semibold tracking-[-0.03em] text-ink">Funzionalità</p>
              {featureGroups.map((g) => (
                <div key={g} className="mt-5">
                  <p className="eyebrow pb-1 !text-[11px]">{g}</p>
                  <ul>
                    {features
                      .filter((f) => f.group === g)
                      .map((f) => (
                        <li key={f.slug}>
                          <MobileRow href={`/funzionalita/${f.slug}/`} focusable={panel === "funz"} icon={<Icon name={f.icon} size={19} />} title={f.name} />
                        </li>
                      ))}
                  </ul>
                </div>
              ))}
              <AllLink href="/funzionalita/" label="Vedi tutte le funzionalità" focusable={panel === "funz"} />
            </nav>

            {/* Settori */}
            <nav aria-label="Settori" className="h-full w-1/3 overflow-y-auto px-5 pb-6 pt-2" aria-hidden={panel !== "sett"}>
              <BackButton onClick={() => setPanel("root")} focusable={panel === "sett"} />
              <p className="mt-1 text-[22px] font-semibold tracking-[-0.03em] text-ink">Settori</p>
              {sectorGroups.map((g) => (
                <div key={g.name} className="mt-5">
                  <p className="eyebrow pb-1 !text-[11px]">{g.name}</p>
                  <ul>
                    {sectors
                      .filter((s) => g.slugs.includes(s.slug))
                      .map((s) => (
                        <li key={s.slug}>
                          <MobileRow href={`/settori/${s.slug}/`} focusable={panel === "sett"} icon={<Icon name={s.icon} size={19} />} title={s.name} />
                        </li>
                      ))}
                  </ul>
                </div>
              ))}
              <AllLink href="/settori/" label="Vedi tutti i settori" focusable={panel === "sett"} />
            </nav>
          </div>
          </div>
          <MobileCta />
        </div>
      )}
    </>
  );
}

function BackButton({ onClick, focusable }: { onClick: () => void; focusable: boolean }) {
  return (
    <button type="button" onClick={onClick} tabIndex={focusable ? 0 : -1} className="-ml-1 flex h-11 items-center gap-1 text-[15px] font-medium text-muted">
      <Icon name="chevronLeft" size={20} stroke={2} />
      Indietro
    </button>
  );
}

function MobileRow({ href, focusable, icon, title }: { href: string; focusable: boolean; icon: React.ReactNode; title: string; sub?: string }) {
  return (
    <Link href={href} tabIndex={focusable ? 0 : -1} className="-mx-2 flex h-12 items-center gap-3 rounded-[10px] px-2 text-[17px] text-text active:bg-mist">
      <span className="text-muted">{icon}</span>
      {title}
    </Link>
  );
}

function AllLink({ href, label, focusable }: { href: string; label: string; focusable: boolean }) {
  return (
    <Link href={href} tabIndex={focusable ? 0 : -1} className="mt-6 flex items-center justify-between rounded-2xl bg-mist px-4 py-3.5 text-[15px] font-medium text-ink">
      {label}
      <Icon name="arrowRight" size={16} stroke={2} />
    </Link>
  );
}

/** Accedi e prova gratuita, fissi in fondo al menu. */
function MobileCta() {
  return (
    <div className="flex flex-col gap-2 border-t border-line bg-[#fafaf8] p-4 pb-[max(16px,env(safe-area-inset-bottom))]">
      <a href={loginUrl} className="btn h-[50px] w-full border border-ink bg-white text-[16px] text-ink hover:bg-mist">
        Accedi
      </a>
      <a href={signupUrl} className="btn btn-dark pulse h-[50px] w-full text-[16px]">
        Prova gratis 14 giorni
        <Icon name="arrowRight" size={16} stroke={2} />
      </a>
      <p className="text-center text-[12.5px] text-muted">Senza carta di credito. Disdici quando vuoi.</p>
    </div>
  );
}

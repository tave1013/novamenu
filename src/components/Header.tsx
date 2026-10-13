"use client";

import { getLocale, tr } from "@/i18n";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { loginUrl, signupUrl } from "@/config/site";
import { localeInfo, locales, type Locale } from "@/i18n/config";
import { matchPath, switchLocale, type PageKey } from "@/i18n/routes";
import { Flag } from "./Flag";
import { Icon, type IconName } from "./Icon";
import { Logo } from "./Logo";
import { lp } from "@/i18n/link";

type NavItem = { id: string; name: string; icon: IconName; href: string };
/** Voci dei menu, preparate dal layout nella lingua della pagina. */
export type HeaderNav = {
  featureGroups: { name: string; items: NavItem[] }[];
  sectorGroups: { name: string; items: NavItem[] }[];
  services: (NavItem & { desc: string })[];
};

const links = () => ([
  { href: lp("/prezzi/"), label: tr("Prezzi") },
  { href: lp("/guide/"), label: tr("Guide") },
  { href: lp("/contatti/"), label: tr("Contatti") },
]);

type Drop = "funz" | "sett" | "serv" | "lang" | null;
type Panel = "root" | "funz" | "sett" | "serv";

/** Etichetta "Novità" nel colore del marchio, accanto alla voce Servizi. */
function NewBadge({ size = "sm" }: { size?: "sm" | "lg" }) {
  return (
    <span
      aria-hidden
      className={`pointer-events-none inline-flex select-none items-center whitespace-nowrap rounded-full bg-lime font-semibold tracking-[-0.005em] text-forest ${
        size === "lg" ? "h-[22px] px-2 text-[12px]" : "h-[18px] px-1.5 text-[10.5px]"
      }`}
    >
      {tr("Novità")}
    </span>
  );
}

function DropButton({ id, label, open, active, onToggle, badge }: { id: string; label: string; open: boolean; active: boolean; onToggle: () => void; badge?: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-expanded={open}
      aria-controls={id}
      onClick={onToggle}
      className={`inline-flex h-9 items-center gap-1 rounded-[9px] px-2 text-[15px] xl:px-3 tracking-[-0.01em] transition-colors duration-300 hover:bg-black/[0.04] ${
        active || open ? "text-ink" : "text-text"
      } ${open ? "bg-black/[0.05]" : ""}`}
    >
      {label}
      {badge && <span className="ml-1 inline-flex">{badge}</span>}
      <Icon name="chevronDown" size={15} stroke={2} className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
    </button>
  );
}

const dropBox =
  "absolute top-[calc(100%+12px)] origin-top rounded-[16px] border border-line bg-white p-3.5 shadow-[0_24px_48px_-20px_rgba(0,0,0,.22)] [animation:menuIn_.18s_var(--ease-out-soft)_both]";

export function Header({ nav }: { nav: HeaderNav }) {
  const pathname = usePathname();
  const locale = getLocale();
  const page = matchPath(pathname ?? "")?.key;
  const inSection = (...keys: PageKey[]) => !!page && keys.includes(page);
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
        <div ref={wrapRef} className="wrap flex h-16 items-center justify-between gap-3 xl:gap-6">
          <Logo />

          <nav aria-label={tr("Principale")} className="hidden items-center gap-0 lg:flex xl:gap-1">
            {/* Funzionalità */}
            <div onMouseEnter={() => enter("funz")} onMouseLeave={leave} className="relative">
              <DropButton
                id="menu-funzionalita"
                label={tr("Funzionalità")}
                open={open === "funz"}
                active={inSection("features", "feature")}
                onToggle={() => setOpen((v) => (v === "funz" ? null : "funz"))}
              />
              {open === "funz" && (
                <div id="menu-funzionalita" className={`${dropBox} left-[-8px] w-[560px]`}>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                    {nav.featureGroups.map((g) => (
                      <div key={g.name}>
                        <p className="eyebrow mb-1 px-2.5 !text-[11px]">{g.name}</p>
                        <ul>
                          {g.items
                            .map((f) => (
                              <li key={f.id}>
                                <Link
                                  href={f.href}
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
                    <Link href={lp("/funzionalita/")} className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-ink">
                      {tr("Tutte le funzionalità")}
                      <Icon name="arrowRight" size={14} stroke={2} />
                    </Link>
                    <Link href={lp("/demo/")} className="text-[13px] text-muted hover:text-ink">
                      {tr("Prenota una demo")}
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Settori */}
            <div onMouseEnter={() => enter("sett")} onMouseLeave={leave} className="relative">
              <DropButton
                id="menu-settori"
                label={tr("Settori")}
                open={open === "sett"}
                active={inSection("sectors", "sector")}
                onToggle={() => setOpen((v) => (v === "sett" ? null : "sett"))}
              />
              {open === "sett" && (
                <div id="menu-settori" className={`${dropBox} left-[-8px] w-[520px]`}>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                    {nav.sectorGroups.map((g) => (
                      <div key={g.name}>
                        <p className="eyebrow mb-1 px-2.5 !text-[11px]">{g.name}</p>
                        <ul>
                          {g.items
                            .map((s) => (
                              <li key={s.id}>
                                <Link
                                  href={s.href}
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
                    <Link href={lp("/settori/")} className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-ink">
                      {tr("Tutti i settori")}
                      <Icon name="arrowRight" size={14} stroke={2} />
                    </Link>
                    <Link href={lp("/demo/")} className="text-[13px] text-muted hover:text-ink">
                      {tr("Prenota una demo")}
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Servizi */}
            <div onMouseEnter={() => enter("serv")} onMouseLeave={leave} className="relative">
              <DropButton
                id="menu-servizi"
                label={tr("Servizi")}
                open={open === "serv"}
                active={inSection("services", "service")}
                onToggle={() => setOpen((v) => (v === "serv" ? null : "serv"))}
                badge={<NewBadge />}
              />
              {open === "serv" && (
                <div id="menu-servizi" className={`${dropBox} left-[-8px] w-[620px]`}>
                  <div className="grid grid-cols-[230px_1fr] gap-3">
                    <div className="flex flex-col rounded-[12px] bg-mist p-4">
                      <p className="eyebrow !text-[11px]">{tr("Servizi extra")}</p>
                      <p className="mt-2 text-[17px] font-semibold leading-snug tracking-[-0.02em] text-ink">{tr("Oltre la piattaforma, ci pensiamo noi.")}</p>
                      <p className="mt-2 text-[13.5px] leading-relaxed text-muted">
                        {tr("Foto e video per i social, scatti dei tuoi piatti o la gestione della tua presenza online. Li scegli a parte, solo se ti servono.")}
                      </p>
                      <Link href={lp("/servizi/")} className="mt-auto inline-flex items-center gap-1.5 pt-4 text-[14px] font-semibold text-ink">
                        {tr("Tutti i servizi")}
                        <Icon name="arrowRight" size={14} stroke={2} />
                      </Link>
                    </div>
                    <div className="flex flex-col">
                      <ul>
                        {nav.services.map((s) => (
                          <li key={s.id}>
                            <Link href={s.href} className="group flex items-center gap-3 rounded-[10px] p-2 transition-colors hover:bg-mist">
                              <span className="flex h-10 w-10 flex-none items-center justify-center rounded-[10px] bg-lime-soft text-forest">
                                <Icon name={s.icon} size={18} />
                              </span>
                              <span className="flex min-w-0 flex-1 flex-col">
                                <span className="text-[14.5px] font-medium text-ink">{s.name}</span>
                                <span className="text-[12.5px] text-muted">{s.desc}</span>
                              </span>
                              <Icon name="arrowRight" size={14} stroke={2} className="flex-none text-faint transition-[color,transform] duration-200 group-hover:translate-x-0.5 group-hover:text-ink" />
                            </Link>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-auto flex items-center justify-between gap-3 border-t border-line-soft px-2 pt-3">
                        <span className="text-[12.5px] text-muted">{tr("Su misura, senza impegno")}</span>
                        <Link href={lp("/contatti/")} className="inline-flex items-center gap-1.5 whitespace-nowrap text-[13.5px] font-semibold text-ink">
                          {tr("Chiedi un preventivo")}
                          <Icon name="arrowRight" size={13} stroke={2} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {links().map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`inline-flex h-9 items-center rounded-[9px] px-2 text-[15px] xl:px-3 tracking-[-0.01em] transition-colors duration-300 hover:bg-black/[0.04] ${
                  isActive(l.href) ? "text-ink" : "text-text"
                }`}
                aria-current={isActive(l.href) ? "page" : undefined}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <LangMenu locale={locale} pathname={pathname ?? "/"} open={open === "lang"} onToggle={() => {
                if (closeTimer.current) window.clearTimeout(closeTimer.current);
                setOpen((v) => (v === "lang" ? null : "lang"));
              }}
              onClose={() => setOpen(null)} />
            <a href={loginUrl} className="btn btn-sm text-text hover:bg-black/[0.04]">
              {tr("Accedi")}
            </a>
            <Link href={lp("/demo/")} className="btn btn-sm btn-dark pulse">
              {tr("Prenota una demo")}
            </Link>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <a href={signupUrl} className="btn btn-sm btn-dark h-9 px-3 text-[13.5px] sm:h-10 sm:px-4">
              {tr("Prova gratis")}
            </a>
            <button
              type="button"
              onClick={() => {
                setMobile((v) => !v);
                setPanel("root");
              }}
              aria-expanded={mobile}
              aria-controls="menu-mobile"
              aria-label={mobile ? tr("Chiudi il menu") : tr("Apri il menu")}
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
            className="absolute inset-0 flex w-[400%] transition-transform duration-300 [transition-timing-function:var(--ease-out-soft)]"
            style={{ transform: `translateX(-${(["root", "funz", "sett", "serv"].indexOf(panel) * 100) / 4}%)` }}
          >
            {/* Principale */}
            <nav aria-label={tr("Menu")} className="h-full w-1/4 overflow-y-auto px-5 pb-6 pt-2" aria-hidden={panel !== "root"}>
              <ul className="divide-y divide-line-soft">
                <li>
                  <Link href={lp("/")} tabIndex={panel === "root" ? 0 : -1} className="flex items-center justify-between py-4 text-[22px] font-semibold tracking-[-0.03em] text-ink">
                    {tr("Home")}
                  </Link>
                </li>
                {(
                  [
                    ["funz", tr("Funzionalità")],
                    ["sett", tr("Settori")],
                    ["serv", tr("Servizi")],
                  ] as const
                ).map(([p, label]) => (
                  <li key={p}>
                    <button
                      type="button"
                      onClick={() => setPanel(p)}
                      tabIndex={panel === "root" ? 0 : -1}
                      className="flex w-full items-center justify-between py-4 text-left text-[22px] font-semibold tracking-[-0.03em] text-ink"
                    >
                      {p === "serv" ? (
                        <span className="flex items-center gap-2.5">
                          {label}
                          <NewBadge size="lg" />
                          <span className="sr-only"> {tr("(novità)")}</span>
                        </span>
                      ) : (
                        label
                      )}
                      <Icon name="chevronRight" size={22} stroke={2} className="text-faint" />
                    </button>
                  </li>
                ))}
                {[
                  { href: lp("/prezzi/"), label: tr("Prezzi") },
                  { href: lp("/guide/"), label: tr("Guide") },
                ].map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} tabIndex={panel === "root" ? 0 : -1} className="flex items-center justify-between py-4 text-[22px] font-semibold tracking-[-0.03em] text-ink">
                      {l.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <MobileLang locale={locale} pathname={pathname ?? "/"} focusable={panel === "root"} onPick={() => setMobile(false)} />
                </li>
              </ul>
            </nav>

            {/* Funzionalità */}
            <nav aria-label={tr("Funzionalità")} className="h-full w-1/4 overflow-y-auto px-5 pb-6 pt-2" aria-hidden={panel !== "funz"}>
              <BackButton onClick={() => setPanel("root")} focusable={panel === "funz"} />
              <p className="mt-1 text-[22px] font-semibold tracking-[-0.03em] text-ink">{tr("Funzionalità")}</p>
              {nav.featureGroups.map((g) => (
                <div key={g.name} className="mt-5">
                  <p className="eyebrow pb-1 !text-[11px]">{g.name}</p>
                  <ul>
                    {g.items
                      .map((f) => (
                        <li key={f.id}>
                          <MobileRow href={f.href} focusable={panel === "funz"} icon={<Icon name={f.icon} size={19} />} title={f.name} />
                        </li>
                      ))}
                  </ul>
                </div>
              ))}
              <AllLink href={lp("/funzionalita/")} label={tr("Vedi tutte le funzionalità")} focusable={panel === "funz"} />
            </nav>

            {/* Settori */}
            <nav aria-label={tr("Settori")} className="h-full w-1/4 overflow-y-auto px-5 pb-6 pt-2" aria-hidden={panel !== "sett"}>
              <BackButton onClick={() => setPanel("root")} focusable={panel === "sett"} />
              <p className="mt-1 text-[22px] font-semibold tracking-[-0.03em] text-ink">{tr("Settori")}</p>
              {nav.sectorGroups.map((g) => (
                <div key={g.name} className="mt-5">
                  <p className="eyebrow pb-1 !text-[11px]">{g.name}</p>
                  <ul>
                    {g.items
                      .map((s) => (
                        <li key={s.id}>
                          <MobileRow href={s.href} focusable={panel === "sett"} icon={<Icon name={s.icon} size={19} />} title={s.name} />
                        </li>
                      ))}
                  </ul>
                </div>
              ))}
              <AllLink href={lp("/settori/")} label={tr("Vedi tutti i settori")} focusable={panel === "sett"} />
            </nav>

            {/* Servizi */}
            <nav aria-label={tr("Servizi")} className="h-full w-1/4 overflow-y-auto px-5 pb-6 pt-2" aria-hidden={panel !== "serv"}>
              <BackButton onClick={() => setPanel("root")} focusable={panel === "serv"} />
              <p className="mt-1 text-[22px] font-semibold tracking-[-0.03em] text-ink">{tr("Servizi")}</p>
              <div className="mt-4 rounded-[14px] bg-mist p-4">
                <p className="eyebrow !text-[11px]">{tr("Servizi extra")}</p>
                <p className="mt-2 text-[14.5px] leading-relaxed text-muted">
                  {tr("Foto e video per i social, scatti dei tuoi piatti o la gestione della tua presenza online. Li scegli a parte, solo se ti servono.")}
                </p>
              </div>
              <div className="mt-4">
                <ul>
                  {nav.services.map((s) => (
                    <li key={s.id}>
                      <MobileRow href={s.href} focusable={panel === "serv"} icon={<Icon name={s.icon} size={19} />} title={s.name} />
                    </li>
                  ))}
                </ul>
              </div>
              <AllLink href={lp("/servizi/")} label={tr("Vedi tutti i servizi")} focusable={panel === "serv"} />
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
      {tr("Indietro")}
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
        {tr("Accedi")}
      </a>
      <a href={signupUrl} className="btn btn-dark pulse h-[50px] w-full text-[16px]">
        {tr("Prova gratis 14 giorni")}
        <Icon name="arrowRight" size={16} stroke={2} />
      </a>
      <p className="text-center text-[12.5px] text-muted">{tr("Senza carta di credito. Disdici quando vuoi.")}</p>
    </div>
  );
}

/** Voce del selettore: un vero link alla stessa pagina nell'altra lingua. */
function langHref(pathname: string, target: Locale) {
  return switchLocale(pathname, target);
}

/** Selettore della lingua su desktop: bandiera e freccia, si apre al clic. */
function LangMenu({ locale, pathname, open, onToggle, onClose }: { locale: Locale; pathname: string; open: boolean; onToggle: () => void; onClose: () => void }) {
  const listRef = useRef<HTMLUListElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // All'apertura il fuoco va sulla lingua attiva, così le frecce funzionano subito.
  useEffect(() => {
    if (open) listRef.current?.querySelector<HTMLAnchorElement>('a[aria-current="true"]')?.focus();
  }, [open]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    const items = Array.from(listRef.current?.querySelectorAll<HTMLAnchorElement>("a") ?? []);
    const i = items.indexOf(document.activeElement as HTMLAnchorElement);
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      const next = e.key === "ArrowDown" ? (i + 1) % items.length : (i - 1 + items.length) % items.length;
      items[next]?.focus();
    } else if (e.key === "Home" || e.key === "End") {
      e.preventDefault();
      items[e.key === "Home" ? 0 : items.length - 1]?.focus();
    } else if (e.key === "Escape") {
      e.stopPropagation();
      onClose();
      buttonRef.current?.focus();
    }
  };

  return (
    <div className="relative" onKeyDown={open ? onKeyDown : undefined}>
      <button
        ref={buttonRef}
        type="button"
        aria-label={tr("Lingua: {name}", { name: localeInfo[locale].name })}
        aria-expanded={open}
        aria-controls="menu-lingua"
        onClick={onToggle}
        className={`inline-flex h-9 items-center gap-1.5 rounded-[9px] px-2.5 text-text transition-colors duration-300 hover:bg-black/[0.04] ${open ? "bg-black/[0.05] text-ink" : ""}`}
      >
        <Flag code={locale} />
        <Icon name="chevronDown" size={15} stroke={2} className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div id="menu-lingua" className={`${dropBox} right-0 w-[200px] !p-1.5`}>
          <ul ref={listRef}>
            {locales.map((l) => (
              <li key={l}>
                <a
                  href={langHref(pathname, l)}
                  hrefLang={localeInfo[l].hreflang}
                  lang={localeInfo[l].hreflang}
                  aria-current={l === locale ? "true" : undefined}
                  onClick={onClose}
                  className={`flex h-10 items-center gap-2.5 rounded-[10px] px-2.5 text-[14.5px] transition-colors hover:bg-mist hover:text-ink ${l === locale ? "bg-mist text-ink" : "text-text"}`}
                >
                  <Flag code={l} />
                  <span className="flex-1">{localeInfo[l].name}</span>
                  {l === locale && <Icon name="check" size={16} stroke={2.4} className="text-[#16a34a]" />}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

/** Selettore della lingua nel menu mobile: una riga che apre l'elenco sotto di sé. */
function MobileLang({ locale, pathname, focusable, onPick }: { locale: Locale; pathname: string; focusable: boolean; onPick: () => void }) {
  const [open, setOpen] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  // Aperto, l'elenco delle lingue deve restare tutto visibile anche sugli schermi bassi.
  useEffect(() => {
    if (!open) return;
    const id = window.setTimeout(() => box.current?.scrollIntoView({ block: "nearest", behavior: "smooth" }), 210);
    return () => window.clearTimeout(id);
  }, [open]);
  return (
    <div ref={box}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls="menu-lingua-mobile"
        aria-label={tr("Lingua: {name}", { name: localeInfo[locale].name })}
        onClick={() => setOpen((v) => !v)}
        tabIndex={focusable ? 0 : -1}
        className="flex w-full items-center justify-between py-4 text-left text-[22px] font-semibold tracking-[-0.03em] text-ink"
      >
        <span className="flex items-center gap-3">
          <Flag code={locale} width={22} height={15} />
          {localeInfo[locale].name}
        </span>
        <Icon name="chevronDown" size={22} stroke={2} className={`text-faint transition-transform duration-200 [transition-timing-function:var(--ease-out-soft)] ${open ? "rotate-180" : ""}`} />
      </button>
      <div
        id="menu-lingua-mobile"
        aria-hidden={!open}
        className={`grid transition-[grid-template-rows,opacity] duration-200 [transition-timing-function:var(--ease-out-soft)] motion-reduce:transition-none ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
      >
        <ul className="overflow-hidden">
          {locales.map((l) => (
            <li key={l}>
              <a
                href={langHref(pathname, l)}
                hrefLang={localeInfo[l].hreflang}
                lang={localeInfo[l].hreflang}
                aria-current={l === locale ? "true" : undefined}
                onClick={onPick}
                tabIndex={focusable && open ? 0 : -1}
                className={`-mx-2 mb-1 flex min-h-11 items-center gap-3 rounded-[10px] px-2 text-[17px] active:bg-mist ${l === locale ? "bg-mist text-ink" : "text-text"}`}
              >
                <Flag code={l} width={22} height={15} />
                <span className="flex-1">{localeInfo[l].name}</span>
                {l === locale && <Icon name="check" size={18} stroke={2.4} className="text-[#16a34a]" />}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

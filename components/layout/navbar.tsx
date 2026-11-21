"use client";

import { AnimatePresence, m } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CimoLogo } from "@/components/ui/brand";
import { EASE } from "@/components/ui/primitives";
import { links, nav } from "@/lib/content";
import { cn } from "@/lib/utils";

function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    let raf = 0;
    const measure = () => {
      raf = 0;
      const line = window.innerHeight * 0.45;
      let current: string | null = null;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      // Ao passar da última seção navegável (ex.: contato), nenhum item fica ativo.
      const contact = document.getElementById("comecar");
      if (contact && contact.getBoundingClientRect().top <= line) current = null;
      setActive(current);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [ids]);
  return active;
}

const NAV_IDS = nav.map((n) => n.id);

export function Navbar() {
  const active = useActiveSection(NAV_IDS);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const indicator = hovered ?? active;

  return (
    <>
      <m.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
        className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-5 md:pt-4"
      >
        <nav
          aria-label="Principal"
          className={cn(
            "mx-auto flex h-14 max-w-6xl items-center justify-between rounded-2xl border pl-4 pr-2 transition-all duration-500",
            scrolled || open
              ? "border-line bg-bg/70 shadow-[0_10px_40px_-20px_rgb(0_0_0/0.8)] backdrop-blur-xl"
              : "border-transparent bg-transparent",
          )}
        >
          <Link href="#inicio" aria-label="CIMO — início" onClick={() => setOpen(false)}>
            <CimoLogo className="h-6 text-fg md:h-7" />
          </Link>

          <ul className="hidden items-center gap-1 lg:flex" onMouseLeave={() => setHovered(null)}>
            {nav.map((item) => (
              <li key={item.id}>
                <Link
                  href={`#${item.id}`}
                  onMouseEnter={() => setHovered(item.id)}
                  className={cn(
                    "relative block rounded-full px-3.5 py-1.5 text-[14.5px] font-medium transition-colors duration-300",
                    indicator === item.id ? "text-fg" : "text-muted hover:text-fg",
                  )}
                >
                  {indicator === item.id && (
                    <m.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full border border-line-strong bg-white/[0.06]"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <Link
              href={links.login}
              className="hidden rounded-xl px-3.5 py-2 text-sm font-semibold text-fg transition-colors hover:text-accent md:block"
            >
              Entrar
            </Link>
            <Link
              href={links.createAccount}
              className="group inline-flex h-10 items-center gap-1.5 rounded-xl bg-accent px-4 text-sm font-semibold text-navy shadow-[0_8px_24px_-12px_var(--cimo-accent)] transition hover:brightness-105"
            >
              Criar conta
              <ArrowUpRight className="hidden size-4 transition-transform group-hover:-translate-y-px group-hover:translate-x-px xs:block" />
            </Link>
            <button
              type="button"
              aria-label={open ? "Fechar menu" : "Abrir menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
              className="relative flex size-10 items-center justify-center rounded-xl border border-line bg-white/[0.03] lg:hidden"
            >
              <span className="sr-only">Menu</span>
              <span
                className={cn(
                  "absolute h-px w-4 bg-fg transition-transform duration-300",
                  open ? "rotate-45" : "-translate-y-[3px]",
                )}
              />
              <span
                className={cn(
                  "absolute h-px w-4 bg-fg transition-transform duration-300",
                  open ? "-rotate-45" : "translate-y-[3px]",
                )}
              />
            </button>
          </div>
        </nav>
      </m.header>

      <AnimatePresence>
        {open && (
          <m.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-bg/95 backdrop-blur-2xl lg:hidden"
          >
            <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(60%_100%_at_50%_0%,color-mix(in_oklab,var(--cimo-accent)_16%,transparent),transparent)]" />
            <div className="relative flex h-full flex-col justify-between px-6 pb-10 pt-28">
              <ul className="flex flex-col">
                {nav.map((item, i) => (
                  <m.li
                    key={item.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.5, ease: EASE, delay: 0.05 + i * 0.05 }}
                    className="border-b border-line"
                  >
                    <Link
                      href={`#${item.id}`}
                      onClick={() => setOpen(false)}
                      className="flex items-baseline justify-between py-4"
                    >
                      <span className={cn("text-3xl font-medium tracking-tight", active === item.id ? "text-fg" : "text-muted")}>
                        {item.label}
                      </span>
                      <span className="font-mono text-xs text-subtle">0{i + 1}</span>
                    </Link>
                  </m.li>
                ))}
              </ul>
              <m.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: EASE, delay: 0.35 }}
                className="flex flex-col gap-3"
              >
                <Link
                  href={links.createAccount}
                  onClick={() => setOpen(false)}
                  className="flex h-12 items-center justify-center gap-2 rounded-xl bg-accent text-[15px] font-semibold text-navy"
                >
                  Criar conta <ArrowUpRight className="size-4" />
                </Link>
                <Link
                  href={links.login}
                  onClick={() => setOpen(false)}
                  className="flex h-12 items-center justify-center rounded-xl border border-line-strong text-[15px] font-semibold text-fg"
                >
                  Entrar
                </Link>
              </m.div>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}

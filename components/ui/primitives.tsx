"use client";

import { m, type HTMLMotionProps } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export const EASE = [0.16, 1, 0.3, 1] as const;

/* -------------------------------------------------------------------------- */
/* Reveal — entrada suave ao entrar na viewport                                */
/* -------------------------------------------------------------------------- */
export function Reveal({
  children,
  delay = 0,
  y = 18,
  className,
  ...rest
}: { children: ReactNode; delay?: number; y?: number; className?: string } & HTMLMotionProps<"div">) {
  return (
    <m.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay, ease: EASE }}
      className={className}
      {...rest}
    >
      {children}
    </m.div>
  );
}

/**
 * Título de seção centralizado, no estilo da referência: uma etiqueta pequena,
 * duas linhas (a segunda em âmbar) e uma linha de apoio curta.
 */
export function SectionTitle({
  tag,
  title,
  accent,
  lead,
  light,
  align = "center",
  className,
}: {
  tag?: string;
  title: string;
  accent?: string;
  lead?: string;
  light?: boolean;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-5", align === "center" ? "items-center text-center" : "items-start", className)}>
      {tag && (
        <Reveal>
          <span
            className={cn(
              "inline-flex items-center gap-2 text-[13px] font-semibold",
              light ? "text-accent-strong" : "text-accent",
            )}
          >
            <span className={cn("size-1.5 rounded-[2px]", light ? "bg-accent-strong" : "bg-accent")} />
            {tag}
          </span>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <h2
          className={cn(
            "max-w-3xl text-[2.25rem] font-semibold leading-[1.04] tracking-[-0.04em] sm:text-5xl md:text-[3.4rem]",
            light ? "text-navy" : "text-fg",
          )}
        >
          {title}
          {accent && (
            <>
              <br />
              <span className={light ? "text-accent-strong" : "text-accent"}>{accent}</span>
            </>
          )}
        </h2>
      </Reveal>
      {lead && (
        <Reveal delay={0.1}>
          <p className={cn("max-w-lg text-pretty text-base leading-relaxed md:text-[17px]", light ? "text-navy/75" : "text-muted")}>{lead}</p>
        </Reveal>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Buttons                                                                     */
/* -------------------------------------------------------------------------- */
export function ButtonLink({
  href,
  children,
  variant = "primary",
  className,
  icon = true,
  onClick,
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost" | "dark" | "ghost-dark";
  className?: string;
  icon?: boolean;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "group relative inline-flex h-12 items-center justify-center gap-2 overflow-hidden rounded-xl px-6 text-[15px] font-semibold transition-all duration-300",
        variant === "primary" &&
          "bg-accent text-navy shadow-[0_10px_30px_-12px_var(--cimo-accent)] hover:shadow-[0_14px_40px_-12px_var(--cimo-accent)] hover:brightness-105",
        variant === "ghost" && "border border-line-strong bg-white/[0.03] text-fg hover:border-cream/40 hover:bg-white/[0.06]",
        variant === "dark" && "bg-navy text-cream hover:bg-[#16293f]",
        variant === "ghost-dark" && "border border-navy/25 text-navy hover:border-navy/50 hover:bg-navy/[0.04]",
        className,
      )}
    >
      {variant === "primary" && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full"
        />
      )}
      <span className="relative">{children}</span>
      {icon && (
        <ArrowUpRight className="relative size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      )}
    </Link>
  );
}

"use client";

import { m, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import Image from "next/image";
import { useRef, type ReactNode } from "react";
import { EASE } from "@/components/ui/primitives";
import { useLiveLoop } from "@/lib/use-perf";
import { cn } from "@/lib/utils";

/**
 * Cena em camadas para animação:
 * 1. foto de fundo gerada/montada no Paper (public/app/cenas) — zoom lento + parallax
 * 2. linhas de órbita âmbar desenhadas no código — traçado + ponto correndo
 * 3. conteúdo (telas do app e chips) — entra por cima, com movimentos próprios
 */
export function Scene({
  src,
  alt,
  orbits,
  className,
  children,
  priority,
  focus = "center",
  sizes = "(max-width: 768px) 100vw, 1200px",
}: {
  sizes?: string;
  /** object-position da foto (ex.: "20% center" para manter o caminhão à vista no celular) */
  focus?: string;
  src: string;
  alt: string;
  /** Caminhos SVG em viewBox 0 0 1200 800 */
  orbits: string[];
  className?: string;
  children?: (progress: MotionValue<number>) => ReactNode;
  priority?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-4%", "4%"]);

  return (
    <div ref={ref} className={cn("group/scene relative isolate overflow-hidden bg-bg", className)}>
      <m.div
        className="absolute inset-[-6%_0]"
        style={{ y: bgY }}
        initial={{ scale: reduce ? 1 : 1.12 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 2.2, ease: EASE }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          style={{ objectPosition: focus }}
          className="object-cover transition-transform duration-[2000ms] ease-[var(--ease-out-expo)] group-hover/scene:scale-[1.03]"
        />
      </m.div>
      <Orbits paths={orbits} />
      <div className="absolute inset-0">{children?.(scrollYProgress)}</div>
    </div>
  );
}

function Orbits({ paths }: { paths: string[] }) {
  const reduce = useReducedMotion();
  const ref = useRef<SVGSVGElement>(null);
  const live = useLiveLoop(ref);
  return (
    <svg ref={ref} viewBox="0 0 1200 800" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 h-full w-full" fill="none" aria-hidden>
      {paths.map((d, i) => (
        <g key={i}>
          <m.path
            d={d}
            stroke="var(--cimo-accent)"
            strokeOpacity={i === 0 ? 0.6 : 0.25}
            strokeWidth={i === 0 ? 2 : 1.4}
            vectorEffect="non-scaling-stroke"
            initial={{ pathLength: reduce ? 1 : 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2.4, delay: 0.3 + i * 0.3, ease: EASE }}
          />
          {i === 0 && live && (
            <g>
              {/* brilho feito com um círculo translúcido (mais leve que filtro drop-shadow) */}
              <circle r="11" fill="var(--cimo-accent)" fillOpacity="0.22">
                <animateMotion dur="7s" repeatCount="indefinite" path={d} />
              </circle>
              <circle r="5" fill="var(--cimo-accent)">
                <animateMotion dur="7s" repeatCount="indefinite" path={d} />
              </circle>
            </g>
          )}
        </g>
      ))}
    </svg>
  );
}

/** Chip de vidro flutuante, no estilo das referências. */
export function SceneChip({
  icon: Icon,
  label,
  value,
  className,
  delay = 0.8,
  tone = "accent",
  tilt = 0,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  className?: string;
  delay?: number;
  tone?: "accent" | "signal";
  tilt?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const live = useLiveLoop(ref);
  return (
    <m.div
      ref={ref}
      className={cn("absolute z-20", className)}
      style={{ rotate: tilt }}
      initial={{ opacity: 0, scale: 0.8, y: 16 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ type: "spring", stiffness: 220, damping: 18, delay }}
    >
      <m.div
        animate={live ? { y: [0, -8, 0] } : { y: 0 }}
        transition={live ? { duration: 5, repeat: Infinity, ease: "easeInOut", delay: delay + 1 } : { duration: 0.4 }}
        className="flex items-center gap-3 rounded-2xl border border-cream/15 bg-[#13263d]/80 px-3.5 py-3 shadow-[0_24px_50px_-20px_rgb(0_0_0/0.9)] backdrop-blur-md md:gap-3.5 md:px-4 md:py-3.5"
      >
        <span
          className={cn(
            "grid size-9 shrink-0 place-items-center rounded-xl md:size-10",
            tone === "signal" ? "bg-signal/15 text-signal" : "bg-accent/15 text-accent",
          )}
        >
          <Icon className="size-[18px] md:size-5" strokeWidth={2.2} />
        </span>
        <span className="flex flex-col">
          <span className="whitespace-nowrap text-[11px] font-medium text-muted md:text-xs">{label}</span>
          <span className="whitespace-nowrap text-base font-bold tracking-[-0.02em] md:text-xl">{value}</span>
        </span>
      </m.div>
    </m.div>
  );
}

/** Recorte de tela do app, como um card que entra em perspectiva. */
export function SceneCard({
  src,
  alt,
  w,
  h,
  className,
  delay = 0.3,
  from = "left",
}: {
  src: string;
  alt: string;
  w: number;
  h: number;
  className?: string;
  delay?: number;
  from?: "left" | "bottom";
}) {
  const reduce = useReducedMotion();
  return (
    <div className={cn("absolute z-10", className)} style={{ perspective: 1200 }}>
      <m.div
        initial={reduce ? { opacity: 0 } : { opacity: 0, x: from === "left" ? -60 : 0, y: from === "bottom" ? 80 : 0, rotateY: 14 }}
        whileInView={{ opacity: 1, x: 0, y: 0, rotateY: 7 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 1.2, ease: EASE, delay }}
        className="overflow-hidden rounded-2xl border border-cream/15 shadow-[0_40px_80px_-30px_rgb(0_0_0/0.9)] md:rounded-3xl"
        style={{ transformOrigin: "left center" }}
      >
        <Image src={src} alt={alt} width={w} height={h} sizes="(max-width: 768px) 55vw, 380px" className="h-auto w-full" />
      </m.div>
    </div>
  );
}

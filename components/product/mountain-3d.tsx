"use client";

import { m, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { useId, useRef } from "react";
import { useLiveLoop } from "@/lib/use-perf";
import { cn } from "@/lib/utils";

/**
 * Símbolo oficial da CIMO em 3D: o "M" de montanhas com o sol âmbar.
 * Profundidade feita com camadas de extrusão; animações de flutuação,
 * giro sutil, reflexo de luz no traço, sol pulsando e inclinação pelo cursor.
 */
const M = "M178 575 L299 358 L380 489 L499 307 L622 575";
const DEPTH = 9; // camadas de extrusão

export function Mountain3D({ className }: { className?: string }) {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const id = (n: string) => `${n}-${uid}`;
  const reduce = useReducedMotion();
  const root = useRef<HTMLDivElement>(null);
  // Loops só rodam com o símbolo na tela — o visual é o mesmo, sem trabalho escondido.
  const live = useLiveLoop(root);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), { stiffness: 80, damping: 18 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-14, 14]), { stiffness: 80, damping: 18 });

  return (
    <div
      ref={root}
      className={cn("relative aspect-square w-full select-none", className)}
      style={{ perspective: 1400 }}
      onMouseMove={(e) => {
        if (reduce) return;
        const r = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width - 0.5);
        my.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onMouseLeave={() => {
        mx.set(0);
        my.set(0);
      }}
      aria-hidden
    >
      {/* Brilho do sol ao fundo */}
      <div className="absolute left-[46%] top-[14%] size-[46%] rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--cimo-accent)_30%,transparent),transparent)] blur-2xl" />

      {/* Base */}
      <svg viewBox="0 0 800 800" className="absolute inset-0 h-full w-full overflow-visible" fill="none">
        <defs>
          <radialGradient id={id("base")} cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="var(--cimo-accent)" stopOpacity="0.22" />
            <stop offset="1" stopColor="var(--cimo-accent)" stopOpacity="0" />
          </radialGradient>
        </defs>
        <ellipse cx="400" cy="660" rx="330" ry="80" fill={`url(#${id("base")})`} />
        {live &&
          [0, 1].map((i) => (
            <m.ellipse
              key={i}
              cx="400"
              cy="655"
              rx="240"
              ry="44"
              stroke="var(--cimo-accent)"
              style={{ transformOrigin: "400px 655px" }}
              initial={{ scale: 1, opacity: 0 }}
              animate={{ scale: [1, 1.4], opacity: [0.45, 0] }}
              transition={{ duration: 4, repeat: Infinity, delay: i * 2, ease: "easeOut" }}
            />
          ))}
        <ellipse cx="400" cy="664" rx="240" ry="44" fill="#0a1522" stroke="var(--cimo-line-strong)" />
        <ellipse cx="400" cy="655" rx="240" ry="44" fill="var(--cimo-surface)" stroke="rgb(244 241 234 / 0.22)" />
        <ellipse cx="400" cy="655" rx="160" ry="26" fill="var(--cimo-accent)" fillOpacity="0.1" />
      </svg>

      {/* Símbolo flutuante */}
      <m.div className="absolute inset-0" style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}>
        <m.div
          className="absolute inset-0 will-change-transform"
          animate={live ? { y: [0, -16, 0], rotateY: [-7, 7, -7] } : { y: 0, rotateY: 0 }}
          transition={live ? { duration: 8, repeat: Infinity, ease: "easeInOut" } : { duration: 0.6 }}
        >
          <svg viewBox="0 0 800 800" className="h-full w-full overflow-visible" fill="none">
            <defs>
              <linearGradient id={id("front")} x1="178" y1="307" x2="622" y2="575" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="#FFFDF8" />
                <stop offset="1" stopColor="#DCD5C6" />
              </linearGradient>
              <linearGradient id={id("sweep")} x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#FFFFFF" stopOpacity="0" />
                <stop offset="0.5" stopColor="#FFFFFF" stopOpacity="0.9" />
                <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
              </linearGradient>
              <mask id={id("mask")}>
                <path d={M} stroke="white" strokeWidth="58" strokeLinecap="round" strokeLinejoin="round" transform="translate(0 -40)" />
              </mask>
              <radialGradient id={id("shadow")} cx="0.5" cy="0.5" r="0.5">
                <stop offset="0" stopColor="#000" stopOpacity="0.45" />
                <stop offset="1" stopColor="#000" stopOpacity="0" />
              </radialGradient>
              <radialGradient id={id("sun")} cx="0.35" cy="0.35" r="0.7">
                <stop offset="0" stopColor="#FFD28A" />
                <stop offset="1" stopColor="var(--cimo-accent-strong)" />
              </radialGradient>
            </defs>

            {/* Sombra na base */}
            <ellipse cx="405" cy="640" rx="215" ry="22" fill={`url(#${id("shadow")})`} />

            {/* Extrusão */}
            {Array.from({ length: DEPTH }, (_, i) => {
              const k = DEPTH - i;
              return (
                <path
                  key={k}
                  d={M}
                  stroke={`color-mix(in oklab, #8E8A80 ${30 + (i / DEPTH) * 40}%, #0D1B2A)`}
                  strokeWidth="58"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  transform={`translate(${k * 2.2} ${k * 1.6 - 40})`}
                />
              );
            })}

            {/* Face frontal */}
            <path d={M} stroke={`url(#${id("front")})`} strokeWidth="58" strokeLinecap="round" strokeLinejoin="round" transform="translate(0 -40)" />

            {/* Reflexo de luz passando pelo traço */}
            <g mask={`url(#${id("mask")})`}>
              <m.rect
                y="200"
                width="110"
                height="460"
                fill={`url(#${id("sweep")})`}
                style={{ rotate: 20 }}
                initial={{ x: -200 }}
                animate={live ? { x: [-200, 820] } : { x: -200 }}
                transition={live ? { duration: 3, repeat: Infinity, repeatDelay: 4, ease: [0.45, 0, 0.2, 1] } : { duration: 0 }}
              />
            </g>

            {/* Sol */}
            <m.circle
              cx="500.5"
              cy="176.5"
              r="44"
              stroke="var(--cimo-accent)"
              strokeWidth="2"
              style={{ transformOrigin: "500.5px 176.5px" }}
              initial={{ opacity: 0 }}
              animate={live ? { scale: [1, 1.7], opacity: [0.6, 0] } : { scale: 1, opacity: 0 }}
              transition={live ? { duration: 2.8, repeat: Infinity, ease: "easeOut" } : { duration: 0 }}
            />
            <circle cx="503" cy="180" r="27" fill="#7a4a12" />
            <circle cx="500.5" cy="176.5" r="27" fill={`url(#${id("sun")})`} />
          </svg>
        </m.div>
      </m.div>
    </div>
  );
}

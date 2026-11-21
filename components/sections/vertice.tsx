"use client";

import { m } from "framer-motion";
import { useRef } from "react";
import { useLiveLoop } from "@/lib/use-perf";
import { CimoSymbol } from "@/components/ui/brand";
import { Reveal, SectionTitle } from "@/components/ui/primitives";
import { vertice } from "@/lib/content";

export function Vertice() {
  return (
    <section id="vertice" className="relative border-t border-line bg-bg-2/60 py-24 md:py-36">
      <div className="container-x">
        <SectionTitle tag={vertice.eyebrow} title={vertice.title} accent={vertice.titleAccent} />

        <div className="mt-14 grid gap-10 md:mt-20 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <Reveal>
                <ConvergenceDiagram />
              </Reveal>
            </div>
          </div>

          <dl className="flex flex-col lg:col-span-7">
            {vertice.blocks.map((b, i) => (
              <Reveal key={b.q} delay={i * 0.05}>
                <div className="grid gap-2 border-t border-line py-7 sm:grid-cols-[190px_1fr] sm:gap-8 md:py-9">
                  <dt className="text-sm font-semibold text-accent">{b.q}</dt>
                  <dd className="text-lg leading-snug tracking-[-0.01em] text-fg md:text-[1.35rem]">{b.a}</dd>
                </div>
              </Reveal>
            ))}
            <div className="border-t border-line" />
          </dl>
        </div>
      </div>
    </section>
  );
}

/** Diagrama: o que você registra entra, converge no Vértice e sai como resposta. */
function ConvergenceDiagram() {
  const box = useRef<HTMLDivElement>(null);
  const live = useLiveLoop(box);
  const ins = vertice.inputs.map((label, i) => ({ label, y: 50 + i * 75 }));
  const outs = vertice.outputs.map((label, i) => ({ label, y: 125 + i * 75 }));
  const apex = { x: 280, y: 200 };

  return (
    <div ref={box} className="relative overflow-hidden rounded-3xl border border-line bg-surface p-5 md:p-6">
      <div className="mb-3 flex items-center justify-between text-xs font-semibold uppercase tracking-[0.14em] text-subtle">
        <span>Você registra</span>
        <span className="text-accent">Vértice</span>
        <span>Você descobre</span>
      </div>
      <svg viewBox="0 0 560 400" className="w-full" role="img" aria-label="Corridas, combustível, manutenção, contas e km entram no Vértice e saem como sobrou hoje, meta do dia e custo por km">
        <defs>
          <radialGradient id="apex-glow">
            <stop offset="0" stopColor="var(--cimo-accent)" stopOpacity="0.4" />
            <stop offset="1" stopColor="var(--cimo-accent)" stopOpacity="0" />
          </radialGradient>
        </defs>
        {ins.map(({ label, y }, i) => {
          const d = `M 128 ${y} C 205 ${y}, 210 ${apex.y}, ${apex.x} ${apex.y}`;
          return (
            <g key={label}>
              <path d={d} stroke="var(--cimo-line-strong)" fill="none" />
              <m.path
                d={d}
                stroke="var(--cimo-cream)"
                strokeWidth="1.6"
                fill="none"
                strokeLinecap="round"
                initial={{ pathLength: 0.14, pathOffset: 0, opacity: 0 }}
                animate={live ? { pathOffset: [0, 0.86], opacity: [0, 1, 0] } : { opacity: 0 }}
                transition={live ? { duration: 2.4, repeat: Infinity, delay: i * 0.45, ease: "easeInOut" } : { duration: 0.2 }}
              />
              <text x="120" y={y + 6} textAnchor="end" fill="var(--cimo-muted)" fontSize="18" fontWeight="500">
                {label}
              </text>
            </g>
          );
        })}
        {outs.map(({ label, y }, i) => {
          const d = `M ${apex.x} ${apex.y} C 350 ${apex.y}, 360 ${y}, 420 ${y}`;
          return (
            <g key={label}>
              <path d={d} stroke="var(--cimo-line-strong)" fill="none" />
              <m.path
                d={d}
                stroke="var(--cimo-accent)"
                strokeWidth="1.8"
                fill="none"
                strokeLinecap="round"
                initial={{ pathLength: 0.2, pathOffset: 0, opacity: 0 }}
                animate={live ? { pathOffset: [0, 0.8], opacity: [0, 1, 0] } : { opacity: 0 }}
                transition={live ? { duration: 1.8, repeat: Infinity, delay: 1.2 + i * 0.35, ease: "easeInOut" } : { duration: 0.2 }}
              />
              <circle cx="428" cy={y} r="4" fill="var(--cimo-accent)" />
              <text x="438" y={y + 6} fill="var(--cimo-fg)" fontSize="18" fontWeight="600">
                {label}
              </text>
            </g>
          );
        })}
        <circle cx={apex.x} cy={apex.y} r="70" fill="url(#apex-glow)" />
        <m.circle
          cx={apex.x}
          cy={apex.y}
          r="30"
          fill="var(--cimo-surface)"
          stroke="var(--cimo-accent)"
          strokeWidth="1.5"
          style={{ transformOrigin: `${apex.x}px ${apex.y}px` }}
          animate={live ? { scale: [1, 1.08, 1] } : { scale: 1 }}
          transition={live ? { duration: 3, repeat: Infinity, ease: "easeInOut" } : { duration: 0.3 }}
        />
        <foreignObject x={apex.x - 17} y={apex.y - 16} width="34" height="32">
          <CimoSymbol className="size-[34px] text-fg" />
        </foreignObject>
      </svg>
    </div>
  );
}

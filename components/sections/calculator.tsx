"use client";

import { animate, m, useMotionValue, useReducedMotion } from "framer-motion";
import { RotateCcw } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { ButtonLink, EASE, SectionTitle } from "@/components/ui/primitives";
import { calculator, links } from "@/lib/content";
import { brl, calcDay, DAY_FIELDS, DEFAULT_DAY, type DayInput } from "@/lib/day-calc";
import { cn } from "@/lib/utils";

export function Calculator() {
  const [input, setInput] = useState<DayInput>(DEFAULT_DAY);
  const r = useMemo(() => calcDay(input), [input]);

  return (
    <section id="calculadora" className="relative overflow-hidden border-y border-line bg-bg-2/60 py-24 md:py-36">
      <div className="container-x relative">
        <SectionTitle tag={calculator.eyebrow} title={calculator.title} accent={calculator.titleAccent} lead={calculator.lead} />

        <m.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease: EASE }}
          className="mt-14 overflow-hidden rounded-3xl border border-line bg-surface md:mt-16"
        >
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-5 py-3.5 md:px-7">
            <span className="text-xs font-medium text-subtle">{calculator.disclaimer}</span>
            <button
              type="button"
              onClick={() => setInput(DEFAULT_DAY)}
              className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-sm text-muted transition hover:bg-white/5 hover:text-fg"
            >
              <RotateCcw className="size-3.5" /> Restaurar
            </button>
          </div>

          <div className="grid lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)]">
            {/* Entradas */}
            <div className="flex flex-col gap-7 border-b border-line p-6 md:p-8 lg:border-b-0 lg:border-r">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">Seu dia</p>
              {DAY_FIELDS.map((f) => (
                <Slider
                  key={f.key}
                  label={f.label}
                  min={f.min}
                  max={f.max}
                  step={f.step}
                  value={input[f.key]}
                  display={f.kind === "money" ? brl(input[f.key]) : f.kind === "km" ? `${input[f.key]} km` : `${String(input[f.key]).replace(".", ",")} h`}
                  onChange={(v) => setInput((p) => ({ ...p, [f.key]: v }))}
                />
              ))}
            </div>

            {/* Resultado — no estilo do app */}
            <div className="flex min-w-0 flex-col gap-5 p-6 md:p-8">
              <div className="grid items-center gap-6 rounded-2xl border border-line bg-bg/50 p-5 sm:grid-cols-[220px_1fr] md:p-6">
                <Gauge percent={r.percentMeta} value={input.ganhos} />
                <div>
                  <p className="text-base text-muted">
                    {r.faltaMeta > 0 ? (
                      <>
                        Faltam <strong className="text-fg">{brl(r.faltaMeta)}</strong> para a meta de {brl(input.meta)}.
                      </>
                    ) : (
                      <strong className="text-signal">Meta do dia batida!</strong>
                    )}
                  </p>
                  <p className="mt-5 text-sm font-medium text-muted">Sobrou hoje</p>
                  <p className={cn("text-4xl font-bold tracking-[-0.03em] tabular-nums md:text-5xl", r.sobrou < 0 && "text-[#ff8f7a]")}>
                    <Counter value={r.sobrou} />
                  </p>
                  <p className="mt-1 text-sm text-subtle">ganhos menos gastos do dia</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                <Stat label="Lucro por km" value={brl(r.lucroPorKm)} hint="ganhos menos gastos, dividido pelos km" highlight />
                <Stat label="Lucro por hora" value={brl(r.lucroPorHora)} hint="o que sobra por hora no volante" highlight />
                <Stat label="Custo por km" value={brl(r.custoPorKm)} hint="gastos ÷ km rodados" />
                <Stat label="Ganho por km" value={brl(r.ganhoPorKm)} />
                <Stat label="Ganho por hora" value={brl(r.ganhoPorHora)} />
                <Stat label="Rodou" value={`${input.km} km`} />
              </div>

              <div className="flex flex-col items-start justify-between gap-4 rounded-2xl border border-accent/30 bg-accent/[0.07] p-5 sm:flex-row sm:items-center">
                <p className="text-[15px] text-fg">No app, essas contas são feitas sozinhas, todo dia, com os seus registros.</p>
                <ButtonLink href={links.createAccount} className="shrink-0">
                  Criar conta
                </ButtonLink>
              </div>
            </div>
          </div>
        </m.div>
      </div>
    </section>
  );
}

function Stat({ label, value, hint, highlight }: { label: string; value: string; hint?: string; highlight?: boolean }) {
  return (
    <div className={cn("min-w-0 rounded-2xl border p-4", highlight ? "border-accent/60 bg-accent/[0.06]" : "border-line bg-bg/40")}>
      <p className="text-sm leading-tight text-muted">{label}</p>
      <p className="mt-1 truncate text-xl font-bold tabular-nums tracking-[-0.02em] md:text-2xl">{value}</p>
      {hint && <p className="mt-1 text-xs leading-snug text-subtle">{hint}</p>}
    </div>
  );
}

/** Medidor em arco, como o "Ganhos de hoje" do app. */
function Gauge({ percent, value }: { percent: number; value: number }) {
  const R = 80;
  const start = 135;
  const sweep = 270;
  const pt = (deg: number) => {
    const a = (deg * Math.PI) / 180;
    return [100 + R * Math.cos(a), 100 + R * Math.sin(a)];
  };
  const [sx, sy] = pt(start);
  const [ex, ey] = pt(start + sweep);
  const arc = `M ${sx} ${sy} A ${R} ${R} 0 1 1 ${ex} ${ey}`;

  return (
    <div className="relative mx-auto w-full max-w-[220px]">
      <svg viewBox="0 0 200 180" className="w-full" aria-hidden>
        <path d={arc} fill="none" stroke="var(--cimo-surface-2)" strokeWidth="14" strokeLinecap="round" />
        <m.path
          d={arc}
          fill="none"
          stroke="var(--cimo-accent)"
          strokeWidth="14"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: Math.max(0.001, percent / 100) }}
          transition={{ duration: 0.8, ease: EASE }}
                  />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center pt-3 text-center">
        <span className="text-xs font-medium text-muted">Ganhos de hoje</span>
        <span className="text-2xl font-bold tabular-nums tracking-[-0.03em]">
          <Counter value={value} />
        </span>
        <span className="text-xs font-semibold text-muted">{Math.round(percent)}% da meta</span>
      </div>
    </div>
  );
}

/** Valor em reais com transição numérica suave. */
function Counter({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const mv = useMotionValue(value);
  const reduce = useReducedMotion();
  useEffect(() => {
    if (reduce) {
      if (ref.current) ref.current.textContent = brl(value);
      return;
    }
    const c = animate(mv, value, {
      duration: 0.5,
      ease: EASE,
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = brl(v);
      },
    });
    return () => c.stop();
  }, [value, mv, reduce]);
  return <span ref={ref}>{brl(value)}</span>;
}

function Slider({
  label,
  min,
  max,
  step,
  value,
  display,
  onChange,
}: {
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
  display: string;
  onChange: (v: number) => void;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <label className="block">
      <span className="mb-3 flex items-baseline justify-between gap-3">
        <span className="text-[15px] font-medium text-fg">{label}</span>
        <span className="text-[15px] font-bold tabular-nums text-accent">{display}</span>
      </span>
      <span className="group/slider relative block h-6">
        <span className="absolute inset-x-0 top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-white/[0.09]" />
        <span className="absolute left-0 top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-accent" style={{ width: `${pct}%` }} />
        <span
          className="pointer-events-none absolute top-1/2 size-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-accent bg-cream shadow-[0_0_0_5px_color-mix(in_oklab,var(--cimo-accent)_22%,transparent)] group-has-[input:focus-visible]/slider:outline-2 group-has-[input:focus-visible]/slider:outline-offset-4 group-has-[input:focus-visible]/slider:outline-accent"
          style={{ left: `${pct}%` }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          aria-valuetext={display}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
        />
      </span>
    </label>
  );
}

"use client";

import { m, useInView, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Check } from "lucide-react";
import { useRef, useState } from "react";
import { PhoneFrame } from "@/components/product/frames";
import { ButtonLink, EASE, Reveal } from "@/components/ui/primitives";
import { links, profiles, type ProfileId } from "@/lib/content";
import { cn } from "@/lib/utils";

/**
 * Dois perfis. Os dois painéis (texto, tela e notificações) ficam sempre
 * montados, empilhados no mesmo espaço; a troca só muda a visibilidade.
 * Assim a altura da seção nunca muda e a página não "pula" ao trocar de aba.
 */
export function Profiles() {
  const [active, setActive] = useState<ProfileId>("motorista");
  const stage = useRef<HTMLDivElement>(null);
  const inView = useInView(stage, { once: true, margin: "-120px" });
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: stage, offset: ["start end", "center center"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [160, 0]);
  const rotate = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [8, 0]);

  return (
    <section id="perfis" className="relative overflow-hidden py-24 md:py-32">
      <div className="container-x grid items-center gap-14 lg:grid-cols-2 lg:gap-10">
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2 text-[13px] font-semibold text-accent">
              <span className="size-1.5 rounded-[2px] bg-accent" />
              Dois perfis
            </span>
          </Reveal>

          <Reveal delay={0.05}>
            <div role="tablist" aria-label="Perfis" className="mt-6 inline-flex rounded-xl border border-line-strong p-1">
              {profiles.map((p) => (
                <button
                  key={p.id}
                  id={`tab-${p.id}`}
                  role="tab"
                  type="button"
                  aria-selected={active === p.id}
                  aria-controls={`painel-${p.id}`}
                  onClick={() => setActive(p.id)}
                  className={cn(
                    "relative rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors sm:px-5",
                    active === p.id ? "text-navy" : "text-muted hover:text-fg",
                  )}
                >
                  {active === p.id && (
                    <m.span layoutId="profile-pill" className="absolute inset-0 rounded-lg bg-cream" transition={{ type: "spring", stiffness: 420, damping: 34 }} />
                  )}
                  <span className="relative">{p.label}</span>
                </button>
              ))}
            </div>
          </Reveal>

          {/* Painéis empilhados: a área fica do tamanho do maior */}
          <div className="mt-8 grid">
            {profiles.map((p) => {
              const on = active === p.id;
              return (
                <div
                  key={p.id}
                  id={`painel-${p.id}`}
                  role="tabpanel"
                  aria-labelledby={`tab-${p.id}`}
                  aria-hidden={!on}
                  inert={!on}
                  className={cn(
                    "col-start-1 row-start-1 transition-[opacity,transform] duration-500 ease-[var(--ease-out-expo)]",
                    on ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0",
                  )}
                >
                  <h2 className="text-[2.5rem] font-semibold leading-[1.02] tracking-[-0.045em] sm:text-6xl">
                    {p.title}
                    <br />
                    <span className="text-accent">{p.titleAccent}</span>
                  </h2>
                  <p className="mt-5 max-w-md text-[17px] leading-relaxed text-muted">{p.text}</p>
                  <ul className="mt-7 grid max-w-md gap-3 sm:grid-cols-2">
                    {p.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2.5 text-[15px] text-fg">
                        <Check className="mt-0.5 size-4 shrink-0 text-accent" strokeWidth={2.5} />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          <ButtonLink href={links.createAccount} className="mt-9">
            Criar conta
          </ButtonLink>
        </div>

        {/* Palco do celular */}
        <div ref={stage} className="relative mx-auto flex w-full max-w-md justify-center py-6">
          <div aria-hidden className="absolute left-1/2 top-1/2 -z-10 size-[26rem] max-w-[100vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--cimo-accent)_18%,transparent),transparent)]" />
          <m.div style={{ y, rotate }} className="relative w-[210px] sm:w-[240px]">
            {/* Telas empilhadas com troca suave */}
            <div className="grid">
              {profiles.map((p) => (
                <div
                  key={p.id}
                  aria-hidden={active !== p.id}
                  className={cn(
                    "col-start-1 row-start-1 transition-opacity duration-500",
                    active === p.id ? "opacity-100" : "opacity-0",
                  )}
                >
                  <PhoneFrame src={p.screen.src} alt={p.screen.alt} />
                </div>
              ))}
            </div>

            {/* Notificações de cada perfil */}
            {profiles.map((p) =>
              p.chips.map((c, i) => {
                const show = inView && active === p.id;
                return (
                  <m.div
                    key={`${p.id}-${c.label}`}
                    aria-hidden={active !== p.id}
                    initial={false}
                    animate={show ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.8, y: 10 }}
                    transition={show ? { type: "spring", stiffness: 260, damping: 20, delay: 0.15 + i * 0.18 } : { duration: 0.2 }}
                    className={cn(
                      "pointer-events-none absolute z-10 whitespace-nowrap rounded-2xl border border-line-strong bg-surface-2/95 px-3 py-2 shadow-[0_20px_40px_-18px_rgb(0_0_0/0.9)] backdrop-blur sm:px-3.5 sm:py-2.5",
                      i === 0 && "-left-6 top-[16%] sm:-left-28",
                      i === 1 && "-right-6 top-[46%] sm:-right-24",
                      i === 2 && "-left-4 bottom-[12%] sm:-left-20",
                    )}
                  >
                    <p className="text-[11px] font-medium text-muted sm:text-xs">{c.label}</p>
                    <p
                      className={cn(
                        "text-sm font-bold tabular-nums tracking-[-0.02em] sm:text-base",
                        c.tone === "accent" && "text-accent",
                        c.tone === "signal" && "text-signal",
                      )}
                    >
                      {c.value}
                    </p>
                  </m.div>
                );
              }),
            )}
          </m.div>
        </div>
      </div>
    </section>
  );
}

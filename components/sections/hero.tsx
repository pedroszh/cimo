"use client";

import { m } from "framer-motion";
import { Mountain3D } from "@/components/product/mountain-3d";
import { ButtonLink, EASE } from "@/components/ui/primitives";
import { hero, links, site } from "@/lib/content";

/** Primeira dobra: Vértice + símbolo oficial em 3D. */
export function Hero() {
  return (
    <section id="inicio" className="relative isolate overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute right-[-10%] top-[-10%] -z-10 h-[46rem] w-[46rem] rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--cimo-accent)_16%,transparent),transparent)]" />

      <div className="container-x grid items-center gap-6 pb-10 pt-28 lg:min-h-[calc(100svh-7rem)] lg:grid-cols-12 lg:pb-8 lg:pt-24">
        <div className="flex flex-col items-start lg:col-span-6">
          <m.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
            className="inline-flex items-center gap-2 rounded-full border border-line-strong px-3.5 py-1.5 text-[13px] font-medium text-muted"
          >
            <span className="size-1.5 rounded-full bg-accent" />
            {hero.badge}
          </m.span>

          <m.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.25 }}
            className="mt-7 text-[5rem] font-bold leading-[0.85] tracking-[-0.065em] sm:text-[7.5rem] lg:text-[9rem]"
          >
            {site.product}
          </m.p>

          <m.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.4 }}
            className="mt-7 max-w-xl text-[1.9rem] font-semibold leading-[1.08] tracking-[-0.035em] sm:text-[2.6rem]"
          >
            {hero.title} <span className="text-accent">{hero.titleAccent}</span>
          </m.h1>

          <m.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.55 }}
            className="mt-6 max-w-lg text-pretty text-[17px] leading-relaxed text-muted"
          >
            {hero.lead}
          </m.p>

          <m.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.7 }}
            className="mt-9 flex w-full flex-col gap-3 xs:w-auto xs:flex-row"
          >
            <ButtonLink href={links.createAccount}>Criar conta</ButtonLink>
            <ButtonLink href={links.login} variant="ghost" icon={false}>
              Entrar
            </ButtonLink>
          </m.div>
        </div>

        <m.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease: EASE, delay: 0.3 }}
          className="mx-auto w-full max-w-[26rem] lg:col-span-6 lg:max-w-[38rem]"
        >
          <Mountain3D />
        </m.div>
      </div>

      {/* Faixa de respostas — como a faixa de números da referência */}
      <div className="container-x pb-6">
        <ul className="grid grid-cols-2 border-y border-line md:grid-cols-4">
          {hero.pillars.map((p, i) => (
            <m.li
              key={p.k}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.9 + i * 0.08 }}
              className="flex flex-col gap-1 px-1 py-5 md:px-6 md:[&:not(:first-child)]:border-l md:[&:not(:first-child)]:border-line"
            >
              <span className="text-lg font-semibold tracking-tight md:text-xl">{p.k}</span>
              <span className="text-sm text-muted">{p.v}</span>
            </m.li>
          ))}
        </ul>
      </div>
    </section>
  );
}

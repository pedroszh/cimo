"use client";

import { m } from "framer-motion";
import { EASE, Reveal, SectionTitle } from "@/components/ui/primitives";
import { howItWorks } from "@/lib/content";

/** Seção clara (creme) — três passos para começar. */
export function HowItWorks() {
  return (
    <section id="como-funciona" className="surface-cream relative overflow-hidden py-24 md:py-32">
      <div className="container-x">
        <SectionTitle light tag={howItWorks.eyebrow} title={howItWorks.title} accent={howItWorks.titleAccent} />

        <ol className="relative mt-14 grid gap-5 md:mt-16 md:grid-cols-3">
          <m.span
            aria-hidden
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.6, ease: EASE }}
            className="absolute left-[16%] right-[16%] top-[2.1rem] hidden h-[2px] origin-left rounded-full bg-accent-strong/60 md:block"
          />
          {howItWorks.steps.map((s, i) => (
            <Reveal key={s.n} delay={0.1 + i * 0.12}>
              <li className="relative flex h-full flex-col gap-5 rounded-3xl border border-navy/10 bg-white p-6 md:p-7">
                <span className="relative z-10 grid size-11 place-items-center rounded-full bg-navy text-sm font-bold text-cream">
                  {s.n}
                </span>
                <div>
                  <p className="text-xl font-semibold tracking-[-0.02em] text-navy">{s.title}</p>
                  <p className="mt-2 text-[15px] leading-relaxed text-navy/75">{s.text}</p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

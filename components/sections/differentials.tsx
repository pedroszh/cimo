"use client";

import { m } from "framer-motion";
import { EASE, SectionTitle } from "@/components/ui/primitives";
import { differentials } from "@/lib/content";

export function Differentials() {
  return (
    <section id="diferenciais" className="relative py-24 md:py-36">
      <div className="container-x grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <SectionTitle align="left" tag={differentials.eyebrow} title={differentials.title} accent={differentials.titleAccent} />
          </div>
        </div>

        <ol className="lg:col-span-8">
          {differentials.items.map((d, i) => (
            <m.li
              key={d.n}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, ease: EASE, delay: i * 0.06 }}
              className="group relative grid grid-cols-[3rem_1fr] gap-x-4 border-t border-line py-9 last:border-b md:grid-cols-[5rem_1fr_1fr] md:gap-x-8 md:py-12"
            >
              <span
                aria-hidden
                className="absolute -top-px left-0 h-px w-full origin-left scale-x-0 bg-gradient-to-r from-accent via-accent-soft to-transparent transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-x-100"
              />
              <span className="text-sm font-semibold text-subtle transition-colors duration-500 group-hover:text-accent">{d.n}</span>
              <h3 className="text-2xl font-semibold leading-tight tracking-[-0.025em] transition-transform duration-500 group-hover:translate-x-1 md:text-[2rem]">
                {d.title}
              </h3>
              <div className="col-start-2 mt-3 flex flex-col items-start gap-3 md:col-start-3 md:mt-1">
                <p className="text-pretty text-base leading-relaxed text-muted">{d.text}</p>
              </div>
            </m.li>
          ))}
        </ol>
      </div>
    </section>
  );
}

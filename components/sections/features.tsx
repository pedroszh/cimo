"use client";

import { BarChart3, Check, Fuel, PiggyBank, Target, type LucideIcon } from "lucide-react";
import { Scene, SceneCard, SceneChip } from "@/components/product/scene";
import { Reveal, SectionTitle } from "@/components/ui/primitives";
import { features } from "@/lib/content";
import { cn } from "@/lib/utils";

const ICONS: Record<(typeof features.items)[number]["chip"]["icon"], LucideIcon> = {
  target: Target,
  chart: BarChart3,
  fuel: Fuel,
  save: PiggyBank,
};

/**
 * Bloco de recurso: cena em camadas (foto do Paper + recorte real do app + chip)
 * de um lado e texto do outro. Os quatro blocos ficam espalhados pela página.
 */
export function FeatureStory({
  index,
  flip,
  id,
  intro,
  className,
}: {
  index: number;
  flip?: boolean;
  id?: string;
  /** Mostra o título geral da seção de recursos acima do bloco. */
  intro?: boolean;
  className?: string;
}) {
  const item = features.items[index];
  const Icon = ICONS[item.chip.icon];

  return (
    <section id={id} className={cn("relative py-20 md:py-28", className)}>
      <div className="container-x">
        {intro && <SectionTitle tag="Recursos" title={features.title} accent={features.titleAccent} className="mb-16 md:mb-24" />}

        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
          <Reveal className={cn("lg:col-span-7", flip && "lg:order-2")}>
            <Scene
              src={item.scene}
              alt={item.sceneAlt}
              orbits={item.orbits}
              sizes="(max-width: 1024px) 100vw, 760px"
              className="aspect-[4/3] rounded-[1.75rem] border border-line md:rounded-[2rem]"
            >
              {() => (
                <>
                  <SceneCard
                    src={item.crop.src}
                    alt={item.crop.alt}
                    w={item.crop.w}
                    h={item.crop.h}
                    className="left-[6%] top-[8%] w-[50%]"
                  />
                  <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-1/5 bg-gradient-to-t from-bg/90 to-transparent" />
                  <SceneChip
                    icon={Icon}
                    label={item.chip.label}
                    value={item.chip.value}
                    className="right-[4%] top-[62%] md:right-[5%] md:top-[14%]"
                    delay={0.9}
                    tilt={flip ? -3 : 3}
                    tone={item.chip.icon === "save" ? "signal" : "accent"}
                  />
                </>
              )}
            </Scene>
          </Reveal>

          <div className={cn("lg:col-span-5", flip && "lg:order-1")}>
            <Reveal>
              <span className="inline-flex items-center gap-2 text-[13px] font-semibold text-accent">
                <span className="size-1.5 rounded-[2px] bg-accent" />
                {String(index + 1).padStart(2, "0")} · {item.title}
              </span>
            </Reveal>
            <Reveal delay={0.06}>
              <h3 className="mt-5 text-[2.2rem] font-semibold leading-[1.04] tracking-[-0.045em] sm:text-5xl">
                {item.headline[0]}
                <br />
                <span className="text-accent">{item.headline[1]}</span>
              </h3>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-5 max-w-md text-[17px] leading-relaxed text-muted">{item.text}</p>
            </Reveal>
            <Reveal delay={0.18}>
              <ul className="mt-7 flex flex-col gap-3">
                {item.bullets.map((b) => (
                  <li key={b} className="flex items-center gap-3 text-[15px] text-fg">
                    <span className="grid size-6 shrink-0 place-items-center rounded-md bg-accent/15 text-accent">
                      <Check className="size-3.5" strokeWidth={3} />
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

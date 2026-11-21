"use client";

import { m, useReducedMotion } from "framer-motion";
import { Clock, MapPin } from "lucide-react";
import { BrowserFrame, PhoneFrame } from "@/components/product/frames";
import { Scene, SceneChip } from "@/components/product/scene";
import { EASE, Reveal } from "@/components/ui/primitives";
import { productShot } from "@/lib/content";

/**
 * Cena da cidade em movimento (Paper) ocupando a largura inteira da página e a altura da tela,
 * com a frase da marca por cima e o app no computador e no celular.
 */
export function ProductShot() {
  const reduce = useReducedMotion();

  return (
    <section aria-label={`${productShot.title} ${productShot.titleAccent}`} className="relative">
      <Scene
        src="/app/cenas/cidade.webp"
        alt="Avenida da cidade à noite com rastros de luz dos faróis"
        focus="28% center"
        sizes="100vw"
        orbits={["M-40 600 C 220 300, 720 220, 1240 150", "M-40 760 C 380 560, 900 520, 1240 600"]}
        className="h-[100svh] min-h-[640px] w-full md:min-h-[720px]"
      >
        {() => (
          <>
            {/* Fusão com o fundo da página em cima e embaixo */}
            <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 z-[5] h-40 bg-gradient-to-b from-bg to-transparent" />
            <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-48 bg-gradient-to-t from-bg to-transparent" />

            {/* Frase da marca */}
            <div className="container-x relative z-30 pt-24 text-center md:pt-28">
              <Reveal>
                <h2 className="text-[2.4rem] font-semibold leading-[1.02] tracking-[-0.045em] sm:text-5xl md:text-[4rem]">
                  {productShot.title}
                  <br />
                  <span className="text-accent">{productShot.titleAccent}</span>
                </h2>
              </Reveal>
              <Reveal delay={0.08}>
                <p className="mx-auto mt-4 max-w-md text-base text-muted md:text-[17px]">{productShot.lead}</p>
              </Reveal>
            </div>

            {/* Computador (tablet/desktop) */}
            <div className="absolute bottom-[6%] right-[5%] z-10 hidden w-[64%] max-w-[820px] md:block lg:right-[7%] lg:w-[46%]" style={{ perspective: 1600 }}>
              <m.div
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 90, rotateY: -22, rotateX: 8 }}
                whileInView={{ opacity: 1, y: 0, rotateY: -11, rotateX: 3 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 1.4, ease: EASE, delay: 0.25 }}
                style={{ transformOrigin: "right center" }}
              >
                <BrowserFrame src="/app/desktop/meta-do-dia.png" alt="Vértice no computador: visão geral do dia" sizes="(max-width: 1024px) 64vw, 46vw" />
              </m.div>
            </div>

            {/* Celular */}
            <div
              className="absolute bottom-[-4%] right-[10%] z-20 w-[52%] max-w-[250px] sm:w-[32%] md:bottom-[-2%] md:right-[3%] md:w-[24%] lg:w-[16%]"
              style={{ perspective: 1400 }}
            >
              <m.div
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 140, rotateY: -18 }}
                whileInView={{ opacity: 1, y: 0, rotateY: -9 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 1.3, ease: EASE, delay: 0.55 }}
              >
                <PhoneFrame src="/app/mobile/veiculo.png" alt="Vértice no celular: indicadores do veículo" />
              </m.div>
            </div>

            <SceneChip
              icon={MapPin}
              label="Distância percorrida"
              value="182 km"
              className="bottom-[34%] left-[6%] md:bottom-[30%] md:left-[5%]"
              delay={1}
              tilt={-3}
            />
            <SceneChip
              icon={Clock}
              label="Tempo trabalhado"
              value="9h"
              className="hidden md:block md:bottom-[58%] md:right-[4%]"
              delay={1.25}
              tilt={3}
            />
          </>
        )}
      </Scene>
    </section>
  );
}

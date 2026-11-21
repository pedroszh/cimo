"use client";

import { LazyMotion, MotionConfig } from "framer-motion";

/**
 * - LazyMotion + componentes `m`: o núcleo de animação fica num pacote à parte.
 *   O download começa assim que este arquivo carrega (em paralelo com o resto
 *   da página), então a entrada da hero não espera e o pacote inicial fica menor.
 * - MotionConfig: respeita "reduzir movimento" do sistema em todas as animações.
 */
const featuresPromise =
  typeof window !== "undefined" ? import("./motion-features").then((mod) => mod.default) : null;

const loadFeatures = () => featuresPromise ?? import("./motion-features").then((mod) => mod.default);

export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={loadFeatures} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}

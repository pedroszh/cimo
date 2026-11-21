"use client";

import { useInView, useReducedMotion } from "framer-motion";
import type { RefObject } from "react";

/**
 * true enquanto o elemento está na tela (com folga) e o sistema não pediu
 * menos movimento. Use para ligar/desligar animações em loop: o visual é o
 * mesmo, mas o navegador para de trabalhar no que não está aparecendo.
 */
export function useLiveLoop(ref: RefObject<Element | null>, margin = "150px"): boolean {
  const reduce = useReducedMotion();
  const visible = useInView(ref, { margin: margin as `${number}px` });
  return visible && !reduce;
}

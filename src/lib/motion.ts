/**
 * Vocabulario de movimiento compartido (el mismo que PumpWatch). Dos librerias, cada una a lo suyo:
 * - motion ("motion/react"): UI que depende del estado de React — entradas/salidas, layout, hover.
 * - anime.js: lineas de tiempo imperativas sobre SVG y numeros — trazos, contadores, texto partido.
 */
import type { Transition } from "motion/react";

export const SPRING: Transition = { type: "spring", stiffness: 520, damping: 42, mass: 0.9 };
export const SHEET_SPRING: Transition = { type: "spring", stiffness: 380, damping: 38 };
export const EASE_CRISP = [0.22, 1, 0.36, 1] as const;

export function prefersReducedMotion(): boolean {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

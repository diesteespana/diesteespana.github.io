import type { ReactNode } from "react";
import * as m from "motion/react-m";
import { EASE_CRISP } from "@/lib/motion";

/** Sube y aparece al entrar en pantalla, como las filas de la landing de PumpWatch. */
export function Reveal({ children, delay = 0, className, y = 32 }: { children: ReactNode; delay?: number; className?: string; y?: number }) {
  return (
    <m.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: EASE_CRISP, delay }}
    >
      {children}
    </m.div>
  );
}

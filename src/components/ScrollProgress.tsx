import * as m from "motion/react-m";
import { useScroll, useSpring } from "motion/react";

/** Hilo azul arriba que se llena con el scroll (transform, no width). */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 260, damping: 40, mass: 0.4 });
  return <m.div aria-hidden className="fixed inset-x-0 top-0 z-50 h-[3px] origin-left bg-gradient-to-r from-brand to-spark" style={{ scaleX }} />;
}

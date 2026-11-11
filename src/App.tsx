import { useEffect } from "react";
import Lenis from "lenis";
import { LazyMotion, MotionConfig, domMax } from "motion/react";
import { LangProvider } from "@/lib/i18n";
import { prefersReducedMotion } from "@/lib/motion";
import { Header } from "@/components/Header";
import { ScrollProgress } from "@/components/ScrollProgress";
import { Hero } from "@/sections/Hero";
import { Stats } from "@/sections/Stats";
import { AboutTerminal } from "@/sections/AboutTerminal";
import { Now } from "@/sections/Now";
import { Journey } from "@/sections/Journey";
import { Projects } from "@/sections/Projects";
import { Skills } from "@/sections/Skills";
import { Contact } from "@/sections/Contact";

export default function App() {
  // Lenis (darkroomengineering/lenis): scroll con inercia suave. Con movimiento reducido, scroll nativo.
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const lenis = new Lenis({ lerp: 0.11, anchors: { offset: -64 } });
    let id = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      id = requestAnimationFrame(raf);
    };
    id = requestAnimationFrame(raf);
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
    return () => {
      cancelAnimationFrame(id);
      lenis.destroy();
    };
  }, []);

  return (
    <LangProvider>
      <LazyMotion features={domMax} strict>
        <MotionConfig reducedMotion="user">
          <Header />
          <ScrollProgress />
          <main className="overflow-x-clip pb-10">
            <Hero />
            <Stats />
            <AboutTerminal />
            <Now />
            <Journey />
            <Projects />
            <Skills />
            <Contact />
          </main>
        </MotionConfig>
      </LazyMotion>
    </LangProvider>
  );
}

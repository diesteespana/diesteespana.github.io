import { useEffect, useRef } from "react";
import { animate } from "animejs";
import { useLang } from "@/lib/i18n";
import { prefersReducedMotion } from "@/lib/motion";

/** Numero que cuenta hasta su valor (anime.js) la primera vez que entra en pantalla. */
export function CountUp({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const { lang } = useLang();
  // useGrouping "always": en espanol 1195 tambien lleva punto (1.195), como en el resto de la web.
  const nf = new Intl.NumberFormat(lang === "es" ? "es-ES" : "en-GB", { useGrouping: "always" } as unknown as Intl.NumberFormatOptions);
  const fmt = (n: number) => nf.format(Math.round(n)) + suffix;
  const done = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (done.current || prefersReducedMotion()) {
      el.textContent = fmt(value);
      return;
    }
    el.textContent = fmt(0);
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        done.current = true;
        const o = { n: 0 };
        animate(o, { n: value, duration: 1800, ease: "outExpo", onUpdate: () => (el.textContent = fmt(o.n)) });
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, lang]);

  return <span ref={ref} className="tabular-nums" />;
}

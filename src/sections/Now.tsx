import { useEffect, useRef, useState } from "react";
import * as m from "motion/react-m";
import { AnimatePresence } from "motion/react";
import { animate, stagger, svg, utils } from "animejs";
import { BarChart3, Database, Layers, Server } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { SectionHead } from "@/components/SectionHead";
import { PIPELINE, PM_STEPS } from "@/lib/content";
import { useLang } from "@/lib/i18n";
import { EASE_CRISP, prefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";

const ICONS = { src: Server, dbt: Layers, bq: Database, pbi: BarChart3 } as const;

/**
 * Lo que hago ahora en Alcampo, de dos maneras: el recorrido del dato como un diagrama que se
 * puede tocar (paquetes de datos viajan de una caja a otra con anime.js) y la parte de gestion de
 * proyectos como una lista que se va marcando sola al entrar en pantalla.
 */
export function Now() {
  const { t, lang } = useLang();
  const [active, setActive] = useState(0);
  const [touched, setTouched] = useState(false);
  const track = useRef<HTMLDivElement>(null);
  const checks = useRef<HTMLUListElement>(null);

  // Mientras nadie toque, el diagrama se recorre solo.
  useEffect(() => {
    if (touched) return;
    const id = window.setInterval(() => setActive((a) => (a + 1) % PIPELINE.length), 3800);
    return () => window.clearInterval(id);
  }, [touched]);

  // Paquetes de datos que cruzan el pipeline en bucle.
  useEffect(() => {
    const el = track.current;
    if (!el || prefersReducedMotion()) return;
    const anim = animate(el.querySelectorAll("[data-packet]"), {
      left: ["0%", "100%"],
      opacity: [{ to: 1, duration: 300 }, { to: 1, duration: 2000 }, { to: 0, duration: 300 }],
      duration: 2600,
      ease: "inOutSine",
      loop: true,
      delay: stagger(650),
    });
    return () => {
      anim.revert();
    };
  }, []);

  // Las marcas de la lista se dibujan una tras otra la primera vez que se ven.
  useEffect(() => {
    const el = checks.current;
    if (!el) return;
    const paths = el.querySelectorAll<SVGPathElement>("[data-check]");
    if (prefersReducedMotion()) return;
    const drawables = svg.createDrawable(paths);
    utils.set(drawables, { draw: "0 0" });
    utils.set(el.querySelectorAll("[data-row]"), { opacity: 0.35 });
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        animate(drawables, { draw: ["0 0", "0 1"], duration: 500, ease: "outQuad", delay: stagger(260, { start: 200 }) });
        animate(el.querySelectorAll("[data-row]"), { opacity: [0.35, 1], x: [-6, 0], duration: 500, ease: "outQuad", delay: stagger(260, { start: 200 }) });
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const node = PIPELINE[active];

  return (
    <section id="ahora" className="scroll-mt-20 px-4 py-24 md:px-8 md:py-32" aria-labelledby="now-title">
      <div className="mx-auto max-w-6xl">
        <SectionHead
          n="02"
          label={lang === "es" ? "Ahora mismo · Alcampo" : "Right now · Alcampo"}
          id="now-title"
          intro={
            lang === "es"
              ? "Desde noviembre de 2026 soy becario en la Dirección de Data de Alcampo. Participo en la creación de un Data Warehouse en Google Cloud y aprendo a gestionar proyectos. Toca cada paso del recorrido:"
              : "Since November 2026 I've been an intern in Alcampo's Data department. I help build a data warehouse on Google Cloud and I'm learning to manage projects. Tap each step of the flow:"
          }
        >
          {lang === "es" ? (
            <>
              Del dato en bruto a la <span className="mark">decisión</span>.
            </>
          ) : (
            <>
              From raw data to <span className="mark">decisions</span>.
            </>
          )}
        </SectionHead>

        <Reveal delay={0.1} className="card corners mt-12 p-5 md:p-10">
          <div className="relative">
            <div ref={track} aria-hidden className="pointer-events-none absolute left-[12.5%] right-[12.5%] top-[38px] hidden h-0.5 bg-surface-strong md:block">
              {[0, 1, 2, 3].map((k) => (
                <span key={k} data-packet className="absolute -top-[4px] h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-spark opacity-0 shadow-[0_0_12px_rgb(var(--spark))]" />
              ))}
            </div>
            <ol className="relative grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-6">
              {PIPELINE.map((p, k) => {
                const Icon = ICONS[p.id as keyof typeof ICONS];
                const on = k === active;
                return (
                  <li key={p.id} className="flex flex-col items-center text-center">
                    <m.button
                      type="button"
                      onClick={() => {
                        setTouched(true);
                        setActive(k);
                      }}
                      aria-pressed={on}
                      whileHover={{ y: -3 }}
                      whileTap={{ scale: 0.94 }}
                      className={cn(
                        "relative grid h-[76px] w-[76px] place-items-center rounded-lg border transition-colors duration-300",
                        on ? "border-brand bg-brand text-surface-panel shadow-[3px_3px_0_rgb(var(--spark)/0.35)]" : "border-surface-strong bg-surface-panel text-brand hover:border-brand",
                      )}
                    >
                      <Icon className="h-7 w-7" aria-hidden />
                      <span className="absolute -right-2 -top-2 grid h-6 w-6 place-items-center rounded border border-surface-border bg-surface-raised font-mono text-[10px] text-ink-2">{k + 1}</span>
                    </m.button>
                    <p className="mt-3 font-display text-base font-semibold text-ink">{p.name}</p>
                    <p className="text-[12px] text-ink-3">{t(p.caption)}</p>
                  </li>
                );
              })}
            </ol>
          </div>

          <div className="relative mt-8 min-h-[120px]">
            <AnimatePresence mode="wait" initial={false}>
              <m.div
                key={node.id + lang}
                className="well rounded-lg p-5 md:p-6"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22, ease: EASE_CRISP }}
              >
                <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-brand">
                  <span className="h-1.5 w-1.5 rounded-full bg-spark" />
                  {lang === "es" ? `Paso ${active + 1} de 4` : `Step ${active + 1} of 4`} · {node.name}
                </p>
                <p className="mt-2 text-[15px] leading-7 text-ink">{t(node.detail)}</p>
              </m.div>
            </AnimatePresence>
            {!touched && (
              <div className="mt-3 h-0.5 overflow-hidden rounded-full bg-surface-border" aria-hidden>
                <m.div key={active} className="h-full origin-left bg-brand/50" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 3.8, ease: "linear" }} />
              </div>
            )}
          </div>
        </Reveal>

        <div className="mt-10 grid gap-6 md:grid-cols-[1fr_1.3fr]">
          <Reveal>
            <h3 className="flex items-center gap-3 font-display text-2xl font-semibold tracking-tight text-ink md:text-3xl">
                            {lang === "es" ? "Gestión de proyectos" : "Project management"}
            </h3>
            <p className="mt-2 text-sm font-medium text-brand">{lang === "es" ? "Waterfall, Agile y criterio" : "Waterfall, Agile and judgement"}</p>
            <p className="mt-4 max-w-md text-[15px] leading-7 text-ink-2">
              {lang === "es"
                ? "La otra mitad de las prácticas: aprender cómo se decide qué se hace primero, cómo se planifica y qué hacer cuando algo se tuerce, acompañando proyectos reales."
                : "The other half of the internship: learning how to decide what comes first, how to plan, and what to do when something goes wrong, by following real projects."}
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <ul ref={checks} className="card flex flex-col divide-y divide-dashed divide-surface-border px-5">
              {PM_STEPS.map((s) => (
                <li key={s.es} data-row className="flex items-start gap-3 py-3.5 text-[14px] leading-6 text-ink">
                  <svg viewBox="0 0 24 24" className="mt-0.5 h-5 w-5 shrink-0" aria-hidden>
                    <circle cx="12" cy="12" r="10" fill="rgb(var(--brand-soft))" />
                    <path data-check d="M7 12.5l3.2 3.2L17 9" fill="none" stroke="rgb(var(--brand))" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {t(s)}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

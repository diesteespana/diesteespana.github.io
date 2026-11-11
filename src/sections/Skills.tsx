import { useEffect, useRef, useState } from "react";
import * as m from "motion/react-m";
import { createDraggable, type Draggable } from "animejs";
import { Hand, RotateCcw } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { SectionHead } from "@/components/SectionHead";
import { LANGUAGES, LANGUAGES_EXTRA, SKILL_GROUPS } from "@/lib/content";
import { useLang } from "@/lib/i18n";
import { EASE_CRISP } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Habilidades de dos maneras: una mesa donde las fichas se arrastran y se lanzan (createDraggable de
 * anime.js, con rebote contra los bordes) y la lista ordenada por grupos para quien solo quiere leer.
 */
export function Skills() {
  const { t, lang } = useLang();
  const [group, setGroup] = useState<number | null>(null);

  return (
    <section id="habilidades" className="scroll-mt-20 px-4 py-24 md:px-8 md:py-32" aria-labelledby="skills-title">
      <div className="mx-auto max-w-6xl">
        <SectionHead n="05" label={lang === "es" ? "Habilidades" : "Skills"} id="skills-title">
          {lang === "es" ? (
            <>
              Mi caja de <span className="mark">herramientas</span>.
            </>
          ) : (
            <>
              My <span className="mark">toolbox</span>.
            </>
          )}
        </SectionHead>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <Reveal>
            <Playground group={group} />
          </Reveal>

          <Reveal delay={0.1} className="flex flex-col gap-6">
            <div className="card p-6">
              <p className="mb-4 text-[13px] font-medium text-ink-2">{lang === "es" ? "Resalta un grupo en la mesa:" : "Highlight a group on the table:"}</p>
              <ul className="flex flex-col gap-1">
                {SKILL_GROUPS.map((g, k) => (
                  <li key={g.name.es}>
                    <button
                      type="button"
                      onClick={() => setGroup(group === k ? null : k)}
                      aria-pressed={group === k}
                      className={cn(
                        "relative w-full rounded-md px-3 py-2.5 text-left transition-colors duration-200",
                        group === k ? "text-surface-panel" : "hover:bg-surface-sunken",
                      )}
                    >
                      {group === k && <m.span layoutId="group-pill" className="absolute inset-0 rounded-md bg-brand" transition={{ type: "spring", stiffness: 420, damping: 34 }} aria-hidden />}
                      <span className="relative flex items-baseline justify-between gap-3">
                        <span className="font-display text-[15px] font-semibold">{t(g.name)}</span>
                        <span className={cn("font-mono text-[11px]", group === k ? "text-sky" : "text-ink-3")}>{g.items.length}</span>
                      </span>
                      <span className={cn("relative mt-0.5 block text-[12px] leading-5", group === k ? "text-brand-soft" : "text-ink-3")}>{g.items.join(" · ")}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="card p-6">
              <p className="mb-4 font-display text-lg font-semibold text-ink">{lang === "es" ? "Idiomas" : "Languages"}</p>
              <ul className="flex flex-col gap-3">
                {LANGUAGES.map((l, k) => (
                  <li key={l.name.es} className="grid grid-cols-[90px_1fr_auto] items-center gap-3 text-[14px]">
                    <span className="text-ink">{t(l.name)}</span>
                    <span className="flex gap-1" aria-hidden>
                      {[1, 2, 3, 4, 5].map((n) => (
                        <m.span
                          key={n}
                          className={cn("h-2 flex-1 rounded-[2px]", n <= l.level ? "bg-brand" : "bg-surface-sunken")}
                          initial={{ scaleX: 0 }}
                          whileInView={{ scaleX: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, ease: EASE_CRISP, delay: k * 0.08 + n * 0.05 }}
                          style={{ originX: 0 }}
                        />
                      ))}
                    </span>
                    <span className="text-[12px] text-ink-3">{t(l.label)}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 flex flex-wrap gap-x-4 gap-y-1 border-t border-dashed border-surface-border pt-3 text-[13px] text-ink-3">
                {LANGUAGES_EXTRA.map((x) => (
                  <span key={x.name.es}>
                    <span className="text-ink-2">"{t(x.name)}"</span> {t(x.label)}
                  </span>
                ))}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Playground({ group }: { group: number | null }) {
  const { lang } = useLang();
  const box = useRef<HTMLDivElement>(null);
  const drags = useRef<Draggable[]>([]);
  const [moved, setMoved] = useState(false);
  const all = SKILL_GROUPS.flatMap((g, gi) => g.items.map((s) => ({ s, gi })));

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    drags.current = [...el.querySelectorAll<HTMLElement>("[data-chip]")].map((chip) =>
      createDraggable(chip, {
        container: el,
        containerFriction: 0.3,
        releaseStiffness: 120,
        releaseDamping: 14,
        onGrab: () => setMoved(true),
      }),
    );
    return () => {
      drags.current.forEach((d) => d.revert());
      drags.current = [];
    };
  }, []);

  const reset = () => {
    drags.current.forEach((d) => d.reset());
    setMoved(false);
  };

  return (
    <div className="card corners relative p-5 md:p-6">
      <div className="mb-4 flex items-center justify-between gap-3">
        <p className="flex items-center gap-2 text-[13px] font-medium text-ink-2">
          <Hand className="h-4 w-4 text-brand" aria-hidden />
          {lang === "es" ? "Arrastra y lanza las fichas" : "Drag and throw the chips"}
        </p>
        {moved && (
          <button type="button" onClick={reset} className="inline-flex items-center gap-1 rounded-md border border-surface-border bg-surface-panel px-2.5 py-1 font-mono text-[11px] font-medium text-brand hover:bg-brand-soft">
            <RotateCcw className="h-3 w-3" aria-hidden /> {lang === "es" ? "Ordenar" : "Tidy up"}
          </button>
        )}
      </div>
      <div ref={box} className="relative flex min-h-[380px] flex-wrap content-start gap-2.5 rounded-md border border-dashed border-surface-strong bg-surface-sunken/50 p-4">
        {all.map(({ s, gi }) => {
          const dim = group !== null && group !== gi;
          const on = group === gi;
          return (
            <span
              key={s}
              data-chip
              className={cn(
                "cursor-grab touch-none select-none rounded-md border px-3 py-2 font-mono text-[13px] shadow-[2px_2px_0_rgb(var(--line-strong))] transition-[opacity,background-color,color,border-color] duration-300 active:cursor-grabbing",
                on ? "border-brand bg-brand text-surface-panel" : "border-surface-border bg-surface-panel text-ink",
                dim && "opacity-30",
              )}
            >
              {s}
            </span>
          );
        })}
      </div>
    </div>
  );
}

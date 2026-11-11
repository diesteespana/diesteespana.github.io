import { useMemo, useRef, useState } from "react";
import * as m from "motion/react-m";
import { AnimatePresence, useScroll, useSpring } from "motion/react";
import { GitBranch, Lightbulb, Sparkles, Tags } from "lucide-react";
import { SmoothTabs } from "@/components/kokonutui/smooth-tab";
import { Reveal } from "@/components/Reveal";
import { SectionHead } from "@/components/SectionHead";
import { ENTRIES, KIND_LABEL, SKILL_EN, type Entry, type Kind } from "@/lib/content";
import { useLang } from "@/lib/i18n";
import { SPRING } from "@/lib/motion";
import { cn } from "@/lib/utils";

type View = "timeline" | "skills" | "learned";

/**
 * La trayectoria contada de tres maneras, con las pestanas de Kokonut UI (SmoothTabs):
 * una linea de tiempo filtrable, un mapa "elige una habilidad y te digo donde la use" y tarjetas
 * que se dan la vuelta con lo que aprendi en cada sitio.
 */
export function Journey() {
  const { lang } = useLang();
  const [view, setView] = useState<View>("timeline");
  const items = [
    { id: "timeline" as const, label: lang === "es" ? "Cronología" : "Timeline", icon: GitBranch },
    { id: "skills" as const, label: lang === "es" ? "Por habilidad" : "By skill", icon: Tags },
    { id: "learned" as const, label: lang === "es" ? "Lo que aprendí" : "What I learned", icon: Lightbulb },
  ];

  return (
    <section id="experiencia" className="scroll-mt-20 px-4 py-24 md:px-8 md:py-32" aria-labelledby="journey-title">
      <div className="mx-auto max-w-6xl">
        <SectionHead n="03" label={lang === "es" ? "Trayectoria" : "Journey"} id="journey-title">
          {lang === "es" ? (
            <>
              Una historia, <span className="mark">tres</span> maneras de leerla.
            </>
          ) : (
            <>
              One story, <span className="mark">three</span> ways to read it.
            </>
          )}
        </SectionHead>
        <Reveal delay={0.1} className="mt-10">
          <SmoothTabs items={items} value={view} onChange={setView} label={lang === "es" ? "Formas de ver mi trayectoria" : "Ways to view my journey"} className="max-w-full">
            {view === "timeline" && <Timeline />}
            {view === "skills" && <BySkill />}
            {view === "learned" && <Learned />}
          </SmoothTabs>
        </Reveal>
      </div>
    </section>
  );
}

function KindTag({ kind }: { kind: Kind }) {
  const { t } = useLang();
  const tone = { work: "bg-brand text-surface-panel", study: "bg-sky text-brand", project: "border border-surface-strong bg-surface-panel text-ink-2" }[kind];
  return <span className={cn("rounded px-1.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider", tone)}>{t(KIND_LABEL[kind])}</span>;
}

function skillName(s: string, lang: string) {
  return lang === "en" ? SKILL_EN[s] ?? s : s;
}

/* ---------- 1. Linea de tiempo filtrable ---------- */

function Timeline() {
  const { t, lang } = useLang();
  const [filter, setFilter] = useState<Kind | "all">("all");
  const list = ENTRIES.filter((e) => filter === "all" || e.kind === filter);
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 200, damping: 40 });
  const filters: (Kind | "all")[] = ["all", "work", "study", "project"];

  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            aria-pressed={filter === f}
            className={cn(
              "rounded-md border px-3 py-1.5 font-mono text-[12px] transition-colors duration-200",
              filter === f ? "border-brand bg-brand-soft text-brand" : "border-surface-strong text-ink-2 hover:border-brand hover:text-brand",
            )}
          >
            {f === "all" ? (lang === "es" ? "Todo" : "All") : t(KIND_LABEL[f])}
          </button>
        ))}
      </div>
      <ol ref={ref} className="relative ml-3 border-l-2 border-surface-border pl-8 md:ml-4">
        <m.span aria-hidden style={{ scaleY }} className="absolute -left-[2px] top-0 h-full w-[2px] origin-top bg-gradient-to-b from-brand to-spark" />
        <AnimatePresence initial={false} mode="popLayout">
          {list.map((e) => (
            <m.li
              key={e.id}
              layout
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 16 }}
              transition={SPRING}
              className="relative pb-8 last:pb-0"
            >
              <span
                className={cn(
                  "absolute -left-[43px] top-1 grid h-5 w-5 rotate-45 place-items-center rounded-[3px] border-2 bg-surface-panel",
                  e.current ? "border-brand" : "border-surface-strong",
                )}
                aria-hidden
              >
                {e.current && <span className="h-2 w-2 animate-pulse-dot rounded-[1px] bg-brand" />}
              </span>
              <div className="card card-hover p-5 md:p-6">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-[12px] text-ink-3">{t(e.when)}</span>
                  <KindTag kind={e.kind} />
                  {e.current && (
                    <span className="inline-flex items-center gap-1 rounded bg-success/10 px-1.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-success">
                      <Sparkles className="h-3 w-3" aria-hidden />
                      {lang === "es" ? "Actual" : "Current"}
                    </span>
                  )}
                </div>
                <h3 className="mt-2 font-display text-xl font-semibold tracking-tight text-ink">{t(e.title)}</h3>
                <p className="text-[13px] italic text-brand">{t(e.where)}</p>
                <p className="mt-2 max-w-2xl text-[14px] leading-6 text-ink-2">{t(e.summary)}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {e.skills.map((s) => (
                    <span key={s} className="chip">
                      {skillName(s, lang)}
                    </span>
                  ))}
                </div>
              </div>
            </m.li>
          ))}
        </AnimatePresence>
      </ol>
    </div>
  );
}

/* ---------- 2. Elige una habilidad ---------- */

function BySkill() {
  const { t, lang } = useLang();
  const skills = useMemo(() => {
    const count = new Map<string, number>();
    ENTRIES.forEach((e) => e.skills.forEach((s) => count.set(s, (count.get(s) ?? 0) + 1)));
    return [...count.entries()].sort((a, b) => b[1] - a[1]).map(([s]) => s);
  }, []);
  const [skill, setSkill] = useState(skills[0]);
  const hits = ENTRIES.filter((e) => e.skills.includes(skill));

  return (
    <div className="grid gap-8 md:grid-cols-[1fr_1.4fr]">
      <div>
        <p className="mb-4 text-[14px] leading-6 text-ink-2">
          {lang === "es" ? "Elige una habilidad y te enseño dónde la he usado." : "Pick a skill and I'll show you where I've used it."}
        </p>
        <div className="flex flex-wrap gap-2">
          {skills.map((s) => {
            const on = s === skill;
            return (
              <button
                key={s}
                type="button"
                onClick={() => setSkill(s)}
                aria-pressed={on}
                className={cn(
                  "relative rounded-md border px-3 py-1.5 text-[13px] font-medium transition-colors duration-200",
                  on ? "border-brand text-surface-panel" : "border-surface-strong bg-surface-panel text-ink-2 hover:border-brand hover:text-brand",
                )}
              >
                {on && <m.span layoutId="skill-pill" className="absolute inset-0 rounded-md bg-brand" transition={{ type: "spring", stiffness: 420, damping: 34 }} aria-hidden />}
                <span className="relative">{skillName(s, lang)}</span>
              </button>
            );
          })}
        </div>
      </div>
      <div>
        <p className="mb-3 font-mono text-[12px] uppercase tracking-wider text-ink-3">
          {skillName(skill, lang)} · {hits.length} {lang === "es" ? (hits.length === 1 ? "sitio" : "sitios") : hits.length === 1 ? "place" : "places"}
        </p>
        <ul className="flex flex-col gap-3">
          <AnimatePresence initial={false} mode="popLayout">
            {hits.map((e, k) => (
              <m.li
                key={e.id}
                layout
                initial={{ opacity: 0, scale: 0.96, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0, transition: { ...SPRING, delay: k * 0.04 } }}
                exit={{ opacity: 0, scale: 0.96 }}
                className="card flex items-start gap-4 p-4"
              >
                <span className="mt-1.5 h-2 w-2 shrink-0 rotate-45 bg-spark" aria-hidden />
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-display text-[17px] font-semibold text-ink">{t(e.title)}</p>
                    <KindTag kind={e.kind} />
                  </div>
                  <p className="text-[12px] text-ink-3">
                    {t(e.where)} · {t(e.when)}
                  </p>
                  <p className="mt-1.5 text-[14px] leading-6 text-ink-2">{t(e.summary)}</p>
                </div>
              </m.li>
            ))}
          </AnimatePresence>
        </ul>
      </div>
    </div>
  );
}

/* ---------- 3. Tarjetas que se dan la vuelta ---------- */

function Learned() {
  const { lang } = useLang();
  return (
    <div>
      <p className="mb-5 text-[14px] text-ink-2">{lang === "es" ? "Toca una tarjeta para darle la vuelta." : "Tap a card to flip it."}</p>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {ENTRIES.map((e) => (
          <FlipCard key={e.id} e={e} />
        ))}
      </ul>
    </div>
  );
}

function FlipCard({ e }: { e: Entry }) {
  const { t, lang } = useLang();
  const [flipped, setFlipped] = useState(false);
  return (
    <li className="h-56 [perspective:1000px]">
      <m.button
        type="button"
        onClick={() => setFlipped((f) => !f)}
        aria-pressed={flipped}
        aria-label={`${t(e.title)}: ${flipped ? t(e.learned) : lang === "es" ? "ver lo que aprendí" : "see what I learned"}`}
        className="relative h-full w-full text-left [transform-style:preserve-3d]"
        animate={{ rotateY: flipped ? 180 : 0 }}
        whileHover={{ y: -4 }}
        transition={{ type: "spring", stiffness: 260, damping: 26 }}
      >
        <span className="card absolute inset-0 flex flex-col p-5 [backface-visibility:hidden]">
          <span className="flex items-center justify-between">
            <KindTag kind={e.kind} />
            <span className="font-mono text-[11px] text-ink-3">{t(e.when)}</span>
          </span>
          <span className="mt-auto font-display text-xl font-semibold leading-tight tracking-tight text-ink">{t(e.title)}</span>
          <span className="mt-1 text-[13px] italic text-brand">{t(e.where)}</span>
          <span className="mt-4 inline-flex items-center gap-1.5 text-[12px] font-medium text-ink-3">
            <Lightbulb className="h-3.5 w-3.5" aria-hidden />
            {lang === "es" ? "Lo que aprendí" : "What I learned"}
          </span>
        </span>
        <span className="absolute inset-0 flex flex-col justify-between rounded-[10px] bg-brand p-5 text-surface-panel [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <span className="font-mono text-[11px] uppercase tracking-wider text-sky">{lang === "es" ? "// lo que aprendí" : "// what I learned"}</span>
          <span className="font-display text-[17px] font-medium leading-snug">{t(e.learned)}</span>
          <span className="font-mono text-[11px] text-sky">{t(e.title)}</span>
        </span>
      </m.button>
    </li>
  );
}

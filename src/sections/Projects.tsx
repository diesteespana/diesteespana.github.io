import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import * as m from "motion/react-m";
import { animate, createDraggable, stagger, utils, type Draggable } from "animejs";
import { ArrowUpRight, Camera, RotateCcw } from "lucide-react";
import { SectionHead } from "@/components/SectionHead";
import { PROJECTS, SKILL_EN } from "@/lib/content";
import { useLang } from "@/lib/i18n";
import { EASE_CRISP, prefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";

const VISUALS: Record<string, () => JSX.Element> = {
  pumpwatch: PumpVisual,
  vtt: FogVisual,
  anomaly: AnomalyVisual,
  robot: MarkerTable,
};

/** Proyectos en una cuadricula de tarjetas: el dibujo interactivo arriba y el texto debajo. */
export function Projects() {
  const { t, lang } = useLang();
  return (
    <section id="proyectos" className="scroll-mt-20 px-4 py-24 md:px-8 md:py-32" aria-labelledby="projects-title">
      <div className="mx-auto max-w-6xl">
        <SectionHead n="04" label={lang === "es" ? "Proyectos" : "Projects"} id="projects-title">
          {lang === "es" ? (
            <>
              Cosas que he <span className="mark">construido</span>, de principio a fin.
            </>
          ) : (
            <>
              Things I've <span className="mark">built</span>, end to end.
            </>
          )}
        </SectionHead>
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {PROJECTS.map((p, k) => {
            const Visual = VISUALS[p.id];
            return (
              <m.article
                key={p.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, ease: EASE_CRISP, delay: (k % 2) * 0.08 }}
                className="card flex flex-col overflow-hidden"
              >
                <div className="flex min-h-[280px] items-center justify-center border-b border-surface-border bg-surface-sunken/60 p-5 md:p-7">
                  <Visual />
                </div>
                <div className="flex flex-1 flex-col p-6 md:p-7">
                  <p className="font-mono text-[11px] text-spark">P-0{k + 1}</p>
                  <h3 className="mt-1 font-display text-2xl font-semibold tracking-tight text-ink">{t(p.title)}</h3>
                  <p className="mt-1 text-[13px] font-medium text-brand">{t(p.kicker)}</p>
                  <p className="mt-4 text-[14px] leading-6 text-ink-2">{t(p.text)}</p>
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {p.stack.map((s) => (
                      <span key={s} className="chip">
                        {lang === "en" ? SKILL_EN[s] ?? s : s}
                      </span>
                    ))}
                  </div>
                  {p.link && (
                    <a href={p.link} target="_blank" rel="noreferrer" className="group mt-auto inline-flex w-max items-center gap-1 pt-5 text-sm font-semibold text-brand hover:text-brand-hover">
                      {lang === "es" ? "Ver en GitHub" : "View on GitHub"}
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                    </a>
                  )}
                </div>
              </m.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function VisualCard({ title, children, action, wide }: { title: string; children: ReactNode; action?: ReactNode; wide?: boolean }) {
  const { lang } = useLang();
  return (
    <div className={cn("card w-full p-4", wide ? "max-w-md" : "max-w-sm")}>
      <div className="mb-3 flex items-center justify-between gap-2">
        <p className="font-mono text-[11px] font-semibold uppercase tracking-wide text-ink">{title}</p>
        {action ?? <span className="rounded border border-surface-border px-1.5 py-0.5 font-mono text-[10px] text-ink-3">{lang === "es" ? "ilustración" : "illustration"}</span>}
      </div>
      {children}
    </div>
  );
}

function SmallButton({ onClick, children, label }: { onClick: () => void; children: ReactNode; label?: string }) {
  return (
    <button type="button" onClick={onClick} aria-label={label} className="inline-flex items-center gap-1 rounded border border-surface-border bg-surface-panel px-1.5 py-0.5 font-mono text-[10px] font-medium text-brand hover:bg-brand-soft">
      {children}
    </button>
  );
}

/* PumpWatch: precio con avisos; la linea se dibuja y los puntos se pueden senalar. */
const PRICE = [40, 44, 42, 47, 52, 50, 55, 53, 41, 38, 43, 49, 54, 58, 56, 61];
function PumpVisual() {
  const { lang } = useLang();
  const [hover, setHover] = useState<number | null>(null);
  const w = 300;
  const h = 120;
  const px = (i: number) => (i * w) / (PRICE.length - 1);
  const py = (v: number) => h - ((v - 30) / 36) * h;
  const d = PRICE.map((v, i) => `${i ? "L" : "M"}${px(i)},${py(v)}`).join(" ");
  const pins = [4, 8, 13];
  const news: Record<number, { es: string; en: string }> = {
    4: { es: "Aviso por Telegram: subida del 8 %", en: "Telegram alert: up 8%" },
    8: { es: "Caída brusca marcada con su noticia", en: "Sharp drop flagged with its news" },
    13: { es: "Nuevo máximo: aviso por Discord", en: "New high: Discord alert" },
  };
  const shown = hover ?? 13;
  return (
    <VisualCard title={lang === "es" ? "Precio con avisos" : "Price with alerts"}>
      <svg viewBox={`-8 -8 ${w + 16} ${h + 16}`} className="h-auto w-full overflow-visible" onPointerLeave={() => setHover(null)}>
        {[0, 1, 2, 3].map((k) => (
          <line key={k} x1="0" x2={w} y1={(k * h) / 3} y2={(k * h) / 3} stroke="rgb(var(--line))" strokeDasharray="3 4" />
        ))}
        <m.path
          d={d}
          fill="none"
          stroke="rgb(var(--brand))"
          strokeWidth="2.2"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: EASE_CRISP, delay: 0.2 }}
        />
        {pins.map((i) => (
          <g key={i} onPointerEnter={() => setHover(i)} onClick={() => setHover(i)} className="cursor-pointer">
            <circle cx={px(i)} cy={py(PRICE[i])} r="14" fill="transparent" />
            <rect
              x={px(i) - (shown === i ? 6 : 4.5)}
              y={py(PRICE[i]) - (shown === i ? 6 : 4.5)}
              width={shown === i ? 12 : 9}
              height={shown === i ? 12 : 9}
              transform={`rotate(45 ${px(i)} ${py(PRICE[i])})`}
              fill="rgb(var(--panel))"
              stroke={i === 8 ? "rgb(var(--ink-3))" : "rgb(var(--spark))"}
              strokeWidth="2.2"
            />
          </g>
        ))}
      </svg>
      <p className="mt-2 rounded border border-surface-border bg-surface-sunken px-2.5 py-1.5 font-mono text-[11px] text-ink-2">→ {news[shown][lang]}</p>
    </VisualCard>
  );
}

/* OpenTable VTT: niebla de guerra. Solo ves lo que alumbra tu cursor, como el servidor solo manda lo visible. */
function FogVisual() {
  const { lang } = useLang();
  const ref = useRef<HTMLDivElement>(null);
  const tokens = [
    [1, 1, "brand"],
    [4, 2, "spark"],
    [6, 5, "ink-3"],
    [2, 5, "spark"],
    [7, 1, "brand"],
  ] as const;
  return (
    <VisualCard
      title={lang === "es" ? "Niebla de guerra" : "Fog of war"}
      action={<span className="rounded bg-brand px-1.5 py-0.5 font-mono text-[10px] text-surface-panel">{lang === "es" ? "mueve el cursor" : "move cursor"}</span>}
    >
      <div
        ref={ref}
        className="relative aspect-[8/6] touch-none overflow-hidden rounded-md bg-surface-sunken [--fx:50%] [--fy:50%]"
        onPointerMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          ref.current?.style.setProperty("--fx", `${e.clientX - r.left}px`);
          ref.current?.style.setProperty("--fy", `${e.clientY - r.top}px`);
        }}
      >
        <div className="absolute inset-0 grid grid-cols-8 grid-rows-6">
          {Array.from({ length: 48 }, (_, k) => (
            <span key={k} className="border-[0.5px] border-surface-strong/60" />
          ))}
        </div>
        {tokens.map(([x, y, c], k) => (
          <span key={k} className="absolute h-[12%] w-[9%] rounded-full border-2 border-surface-panel shadow" style={{ left: `${x * 12.5 + 1.75}%`, top: `${y * 16.66 + 2}%`, background: `rgb(var(--${c}))` }} />
        ))}
        <div
          className="pointer-events-none absolute inset-0 bg-[#0f1a2a]/90"
          style={{
            WebkitMaskImage: "radial-gradient(circle 70px at var(--fx) var(--fy), transparent 0 60%, #000 100%)",
            maskImage: "radial-gradient(circle 70px at var(--fx) var(--fy), transparent 0 60%, #000 100%)",
          }}
        />
      </div>
      <p className="mt-2 text-[11px] leading-4 text-ink-3">
        {lang === "es" ? "El servidor decide qué ve cada jugador: lo oculto ni siquiera llega al navegador." : "The server decides what each player sees: hidden things never reach the browser."}
      </p>
    </VisualCard>
  );
}

/* Deteccion de anomalias: error de reconstruccion por pieza; la defectuosa se dispara. */
const ERRORS = [0.18, 0.22, 0.15, 0.2, 0.25, 0.17, 0.92, 0.21, 0.19, 0.16, 0.24, 0.2];
function AnomalyVisual() {
  const { lang } = useLang();
  const ref = useRef<HTMLDivElement>(null);
  const [run, setRun] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const bars = el.querySelectorAll<HTMLElement>("[data-bar]");
    if (prefersReducedMotion()) {
      utils.set(bars, { scaleY: 1 });
      return;
    }
    utils.set(bars, { scaleY: 0 });
    let anim: ReturnType<typeof animate> | undefined;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        anim = animate(bars, { scaleY: [0, 1], duration: 900, ease: "outElastic(1, .6)", delay: stagger(70) });
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      anim?.pause();
    };
  }, [run]);
  return (
    <VisualCard
      title={lang === "es" ? "Error de reconstrucción" : "Reconstruction error"}
      action={
        <SmallButton onClick={() => setRun((r) => r + 1)}>
          <RotateCcw className="h-3 w-3" aria-hidden /> {lang === "es" ? "repetir" : "replay"}
        </SmallButton>
      }
    >
      <div ref={ref} className="relative flex h-32 items-end gap-1.5 border-b border-surface-strong pb-px">
        <span className="absolute inset-x-0 border-t border-dashed border-ink-3/60" style={{ bottom: "45%" }} />
        <span className="absolute right-0 -translate-y-full font-mono text-[9px] text-ink-3" style={{ bottom: "45%" }}>
          {lang === "es" ? "umbral" : "threshold"}
        </span>
        {ERRORS.map((v, k) => (
          <span key={k} data-bar className={cn("flex-1 origin-bottom rounded-t-[2px]", v > 0.45 ? "bg-spark" : "bg-brand/35")} style={{ height: `${v * 100}%` }} />
        ))}
      </div>
      <div className="mt-2 flex justify-between font-mono text-[11px] text-ink-2">
        <span>{lang === "es" ? "12 piezas" : "12 parts"}</span>
        <span className="font-semibold text-spark">{lang === "es" ? "1 defecto" : "1 defect"}</span>
      </div>
    </VisualCard>
  );
}

/* ---------- Aparcamiento con vision: la mesa, la cinta y los marcadores ---------- */

type MarkerKind = "car" | "ped" | "obs";

// Marcadores ArUco: 4x4 bits dentro de un borde negro, como los que se usaron en el proyecto.
const PATTERNS: Record<MarkerKind, number[]> = {
  car: [1, 0, 1, 1, 0, 1, 0, 0, 1, 1, 0, 1, 0, 0, 1, 0],
  ped: [0, 1, 1, 0, 1, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 1],
  obs: [1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 1, 0, 1],
};
const KIND_TEXT: Record<MarkerKind, { es: string; en: string }> = {
  car: { es: "coche", en: "car" },
  ped: { es: "peatón", en: "pedestrian" },
  obs: { es: "obstáculo", en: "obstacle" },
};
const MARKERS: { id: string; kind: MarkerKind; x: number; y: number }[] = [
  { id: "m1", kind: "car", x: 43, y: 5 },
  { id: "m2", kind: "ped", x: 66, y: 40 },
  { id: "m3", kind: "obs", x: 14, y: 73 },
];
// Franjas separadas con cinta: 0 = plazas (arriba, 3 plazas), 1 = calzada, 2 = acera.
const STRIPS = [
  { es: "Plazas", en: "Spots", top: 0, h: 34 },
  { es: "Calzada", en: "Road", top: 34, h: 36 },
  { es: "Acera", en: "Pavement", top: 70, h: 30 },
];

function ArucoMarker({ kind }: { kind: MarkerKind }) {
  const bits = PATTERNS[kind];
  return (
    <svg viewBox="0 0 6 6" className="h-full w-full" shapeRendering="crispEdges" aria-hidden>
      <rect width="6" height="6" fill="#000" />
      {bits.map((b, i) => (b ? <rect key={i} x={1 + (i % 4)} y={1 + Math.floor(i / 4)} width="1" height="1" fill="#fff" /> : null))}
    </svg>
  );
}

function MarkerTable() {
  const { lang } = useLang();
  const table = useRef<HTMLDivElement>(null);
  const scan = useRef<HTMLDivElement>(null);
  const drags = useRef<Draggable[]>([]);
  const [where, setWhere] = useState<Record<string, { strip: number; spot: number }>>({});

  // Donde cae cada marcador: franja por la altura de su centro y, en la de plazas, que plaza.
  const measure = useCallback(() => {
    const el = table.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const next: Record<string, { strip: number; spot: number }> = {};
    el.querySelectorAll<HTMLElement>("[data-marker]").forEach((mk) => {
      const b = mk.getBoundingClientRect();
      const cy = ((b.top + b.height / 2 - r.top) / r.height) * 100;
      const cx = ((b.left + b.width / 2 - r.left) / r.width) * 100;
      const strip = cy < 34 ? 0 : cy < 70 ? 1 : 2;
      next[mk.dataset.marker!] = { strip, spot: Math.min(2, Math.floor(cx / 33.34)) };
    });
    setWhere(next);
  }, []);

  useEffect(() => {
    const el = table.current;
    if (!el) return;
    drags.current = [...el.querySelectorAll<HTMLElement>("[data-marker]")].map((mk) =>
      createDraggable(mk, { container: el, releaseStiffness: 200, releaseDamping: 20, onDrag: measure, onSettle: measure, onRelease: measure }),
    );
    measure();
    window.addEventListener("resize", measure);
    let sweep: ReturnType<typeof animate> | undefined;
    if (scan.current && !prefersReducedMotion()) {
      sweep = animate(scan.current, { top: ["0%", "100%"], duration: 2600, ease: "inOutSine", loop: true, alternate: true });
    }
    return () => {
      drags.current.forEach((d) => d.revert());
      drags.current = [];
      sweep?.revert();
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  const reset = () => {
    drags.current.forEach((d) => d.reset());
    window.setTimeout(measure, 50);
  };

  // Lo que "ve" la Raspberry Pi a partir de las posiciones.
  const es = lang === "es";
  const list = MARKERS.map((mk) => ({ ...mk, at: where[mk.id] }));
  const spotsTaken = [0, 1, 2].map((s) => list.some((mk) => mk.at?.strip === 0 && mk.at.spot === s));
  const onRoad = list.filter((mk) => mk.at?.strip === 1);
  const report: { text: string; tone: "ok" | "warn" | "info" }[] = [
    {
      text: spotsTaken.map((tk, s) => `${es ? "P" : "S"}${s + 1}: ${tk ? (es ? "ocupada" : "taken") : es ? "libre" : "free"}`).join("  ·  "),
      tone: "info",
    },
  ];
  if (onRoad.some((mk) => mk.kind === "ped")) report.push({ text: es ? "Peatón en la calzada → el robot espera" : "Pedestrian on the road → robot waits", tone: "warn" });
  if (onRoad.some((mk) => mk.kind === "obs")) report.push({ text: es ? "Obstáculo en medio del camino → hay que rodearlo" : "Obstacle in the way → go around it", tone: "warn" });
  if (onRoad.some((mk) => mk.kind === "car")) report.push({ text: es ? "Coche en la calzada → circulando" : "Car on the road → driving", tone: "info" });
  if (!onRoad.length) report.push({ text: es ? "Calzada despejada → vía libre" : "Road clear → go ahead", tone: "ok" });
  const free = spotsTaken.findIndex((tk) => !tk);
  if (free >= 0 && !onRoad.some((mk) => mk.kind !== "car")) report.push({ text: es ? `Hueco en la plaza ${free + 1} → a aparcar` : `Gap at spot ${free + 1} → park`, tone: "ok" });

  return (
    <VisualCard
      wide
      title={es ? "La mesa vista por la cámara" : "The table, seen by the camera"}
      action={
        <SmallButton onClick={reset}>
          <RotateCcw className="h-3 w-3" aria-hidden /> {es ? "colocar" : "reset"}
        </SmallButton>
      }
    >
      <div ref={table} className="relative aspect-[4/3] touch-none overflow-hidden rounded-md bg-[#e9e3d6]">
        {/* franjas y cinta americana negra */}
        {STRIPS.map((s, k) => (
          <div key={s.es} className="absolute inset-x-0" style={{ top: `${s.top}%`, height: `${s.h}%` }}>
            <span className="absolute left-1.5 top-1 font-mono text-[9px] font-semibold uppercase tracking-wider text-[#7a705e]">{es ? s.es : s.en}</span>
            {k > 0 && <span className="absolute inset-x-0 top-0 h-[5px] -translate-y-1/2 bg-[#161616] shadow-[0_1px_0_rgb(255_255_255/0.25)_inset]" aria-hidden />}
          </div>
        ))}
        {/* separadores de plazas (cinta vertical en la franja de arriba) */}
        {[33.34, 66.67].map((x) => (
          <span key={x} className="absolute top-0 h-[34%] w-[4px] -translate-x-1/2 bg-[#161616]" style={{ left: `${x}%` }} aria-hidden />
        ))}
        {/* barrido de la camara */}
        <div ref={scan} className="pointer-events-none absolute inset-x-0 top-0 h-6 -translate-y-1/2 bg-gradient-to-b from-transparent via-spark/25 to-transparent" aria-hidden>
          <span className="absolute inset-x-0 top-1/2 h-px bg-spark/70" />
        </div>
        {MARKERS.map((mk) => {
          const at = where[mk.id];
          const alert = at?.strip === 1 && mk.kind !== "car";
          return (
            <div
              key={mk.id}
              data-marker={mk.id}
              className="absolute w-[14%] cursor-grab active:cursor-grabbing"
              style={{ left: `${mk.x}%`, top: `${mk.y}%` }}
              aria-label={`${es ? "Marcador" : "Marker"}: ${KIND_TEXT[mk.kind][lang]}`}
            >
              <div className={cn("aspect-square bg-white p-[8%] shadow-[2px_2px_0_rgb(0_0_0/0.25)] outline outline-2 outline-offset-2 transition-[outline-color]", alert ? "outline-warn" : "outline-spark/70")}>
                <ArucoMarker kind={mk.kind} />
              </div>
              <span className={cn("mt-1.5 block text-center font-mono text-[9px] font-semibold uppercase", alert ? "text-warn" : "text-[#4a4336]")}>{KIND_TEXT[mk.kind][lang]}</span>
            </div>
          );
        })}
        <span className="absolute bottom-1.5 right-1.5 inline-flex items-center gap-1 rounded bg-black/70 px-1.5 py-0.5 font-mono text-[9px] text-white">
          <Camera className="h-3 w-3" aria-hidden /> Raspberry Pi
        </span>
      </div>
      <ul className="mt-3 flex flex-col gap-1 rounded-md bg-[#0f1a2a] p-3 font-mono text-[11px] leading-5" aria-live="polite">
        {report.map((r) => (
          <li key={r.text} className={r.tone === "warn" ? "text-[#f0a35e]" : r.tone === "ok" ? "text-[#5fd39a]" : "text-[#b9c8dc]"}>
            <span className="text-[#5b7090]">&gt; </span>
            {r.text}
          </li>
        ))}
      </ul>
      <p className="mt-2 text-[11px] leading-4 text-ink-3">{es ? "Arrastra los marcadores: la lectura cambia según la franja en la que caen." : "Drag the markers: the reading changes with the lane they land in."}</p>
    </VisualCard>
  );
}

import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import * as m from "motion/react-m";
import { animate } from "animejs";
import { CornerDownLeft, TerminalSquare } from "lucide-react";
import { SectionHead } from "@/components/SectionHead";
import { Reveal } from "@/components/Reveal";
import { COMMANDS } from "@/lib/content";
import { useLang } from "@/lib/i18n";
import { EASE_CRISP, prefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface Line {
  id: number;
  cmd: string;
}

const PROMPT = "nicolas@cv:~$";

/**
 * "Sobre mi" como una terminal: a la izquierda los comandos que existen (se pueden pulsar) y a la
 * derecha la terminal, donde tambien se pueden escribir, con Tab para autocompletar y flechas para
 * el historial. Cada respuesta se escribe letra a letra con anime.js.
 */
export function AboutTerminal() {
  const { t, lang } = useLang();
  const [lines, setLines] = useState<Line[]>([]);
  const [input, setInput] = useState("");
  const [past, setPast] = useState<string[]>([]);
  const [cursor, setCursor] = useState(-1);
  const nextId = useRef(0);
  const box = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const started = useRef(false);

  // La salida se calcula al pintar, asi que cambiar de idioma traduce tambien el historial.
  const outFor = (cmd: string): { out: string; error?: boolean } => {
    if (cmd === "help" || cmd === "ls") {
      return {
        out: [...COMMANDS.map((c) => `${c.cmd.padEnd(10)} ${t(c.hint)}`), `${"clear".padEnd(10)} ${lang === "es" ? "limpiar" : "clear screen"}`].join("\n"),
      };
    }
    const found = COMMANDS.find((c) => c.cmd === cmd);
    if (found) return { out: t(found.out) };
    return {
      out: lang === "es" ? `${cmd}: comando no encontrado. Escribe "help" para ver la lista.` : `${cmd}: command not found. Type "help" to see the list.`,
      error: true,
    };
  };

  const run = (raw: string) => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;
    setPast((p) => [cmd, ...p].slice(0, 20));
    setCursor(-1);
    if (cmd === "clear") {
      setLines([]);
      return;
    }
    setLines((ls) => [...ls, { id: nextId.current++, cmd }]);
  };

  // La primera vez que la terminal entra en pantalla, se presenta sola.
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting || started.current) return;
        started.current = true;
        run("whoami");
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const el = box.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    run(input);
    setInput("");
  };

  const onKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Tab") {
      const hit = [...COMMANDS.map((c) => c.cmd), "help", "clear"].find((c) => input && c.startsWith(input.toLowerCase()));
      if (hit) {
        e.preventDefault();
        setInput(hit);
      }
    } else if (e.key === "ArrowUp" && past.length) {
      e.preventDefault();
      const n = Math.min(past.length - 1, cursor + 1);
      setCursor(n);
      setInput(past[n]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const n = cursor - 1;
      setCursor(n);
      setInput(n >= 0 ? past[n] : "");
    }
  };

  return (
    <section id="sobre-mi" className="scroll-mt-20 px-4 py-24 md:px-8 md:py-32" aria-labelledby="about-title">
      <div className="mx-auto max-w-6xl">
        <SectionHead
          n="01"
          label={lang === "es" ? "Sobre mí" : "About me"}
          id="about-title"
          intro={lang === "es" ? "En vez de un párrafo, una terminal. Pulsa un comando o escríbelo tú (Tab autocompleta)." : "Instead of a paragraph, a terminal. Tap a command or type it yourself (Tab autocompletes)."}
        >
          {lang === "es" ? (
            <>
              Conóceme a base de <span className="mark">comandos</span>.
            </>
          ) : (
            <>
              Get to know me, <span className="mark">one command</span> at a time.
            </>
          )}
        </SectionHead>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_1.25fr]">
          <Reveal>
            <ul className="grid grid-cols-2 content-start gap-2">
              {COMMANDS.map((c, k) => (
                <li key={c.cmd}>
                  <m.button
                    type="button"
                    onClick={() => run(c.cmd)}
                    whileTap={{ scale: 0.97 }}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, ease: EASE_CRISP, delay: k * 0.05 }}
                    className="card card-hover group flex w-full items-center justify-between gap-3 px-3.5 py-2.5 text-left"
                  >
                    <span className="min-w-0">
                      <span className="block font-mono text-[13px] font-semibold text-brand">
                        <span className="text-ink-3">$ </span>
                        {c.cmd}
                      </span>
                      <span className="block truncate text-[12px] text-ink-3">{t(c.hint)}</span>
                    </span>
                    <CornerDownLeft className="h-4 w-4 shrink-0 text-ink-3 opacity-0 transition-opacity group-hover:opacity-100" aria-hidden />
                  </m.button>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="overflow-hidden rounded-[10px] border border-[#24364f] bg-[#0f1a2a] shadow-[6px_6px_0_rgb(var(--brand)/0.18)]" onClick={() => inputRef.current?.focus({ preventScroll: true })}>
              <div className="flex items-center gap-2 border-b border-[#24364f] bg-[#13213a] px-4 py-2.5">
                <TerminalSquare className="h-4 w-4 text-[#7fb2f0]" aria-hidden />
                <span className="font-mono text-[11px] text-[#8aa0bd]">nicolas — zsh — 80×24</span>
              </div>
              <div ref={box} data-lenis-prevent className="h-[420px] overflow-y-auto px-4 py-4 font-mono text-[13px] leading-6 [scrollbar-color:#2c4466_transparent]" aria-live="polite">
                <p className="text-[#6f86a6]">{lang === "es" ? "Bienvenido. Escribe \"help\" para ver los comandos." : "Welcome. Type \"help\" to see the commands."}</p>
                {lines.map((l) => {
                  const r = outFor(l.cmd);
                  return (
                  <div key={l.id} className="mt-3">
                    <p>
                      <span className="text-[#5fd39a]">{PROMPT}</span> <span className="text-[#e6edf7]">{l.cmd}</span>
                    </p>
                    <Typed text={r.out} className={cn("whitespace-pre-wrap", r.error ? "text-[#f0a35e]" : "text-[#b9c8dc]")} />
                  </div>
                  );
                })}
                <form onSubmit={onSubmit} className="mt-3 flex items-center gap-2">
                  <label htmlFor="term-input" className="shrink-0 text-[#5fd39a]">
                    {PROMPT}
                  </label>
                  <input
                    id="term-input"
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={onKey}
                    autoComplete="off"
                    autoCapitalize="off"
                    spellCheck={false}
                    placeholder={lang === "es" ? "escribe un comando…" : "type a command…"}
                    className="min-w-0 flex-1 bg-transparent text-[#e6edf7] caret-[#7fb2f0] outline-none placeholder:text-[#3d5574]"
                  />
                </form>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/** Texto que se escribe solo (anime.js anima cuantas letras se ven). */
function Typed({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      el.textContent = text;
      return;
    }
    const o = { n: 0 };
    const anim = animate(o, {
      n: text.length,
      duration: Math.min(1400, 12 * text.length),
      ease: "linear",
      onUpdate: () => {
        el.textContent = text.slice(0, Math.round(o.n));
        const box = el.closest("[data-lenis-prevent]");
        if (box) box.scrollTop = box.scrollHeight;
      },
    });
    return () => {
      anim.pause();
      el.textContent = text;
    };
  }, [text]);
  return <p ref={ref} className={className} />;
}

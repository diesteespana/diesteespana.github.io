import { useEffect, useRef, useState } from "react";
import * as m from "motion/react-m";
import { animate, splitText, stagger, utils } from "animejs";
import { ArrowRight, Mail, MapPin } from "lucide-react";
import ShimmerText from "@/components/kokonutui/shimmer-text";
import { HERO, PROFILE, PROFILE_KEYS_EN } from "@/lib/content";
import { useLang } from "@/lib/i18n";
import { EASE_CRISP, SPRING, prefersReducedMotion } from "@/lib/motion";
import { scrollToId } from "@/lib/scroll";

export function Hero() {
  const { t, lang } = useLang();
  const words = lang === "es" ? HERO.words : HERO.wordsEn;
  const [i, setI] = useState(0);
  const name = useRef<HTMLHeadingElement>(null);
  const card = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const id = window.setInterval(() => setI((n) => (n + 1) % words.length), 2400);
    return () => window.clearInterval(id);
  }, [words.length]);

  // anime.js: el nombre entra palabra a palabra con un barrido de opacidad y desenfoque.
  useEffect(() => {
    const el = name.current;
    if (!el || prefersReducedMotion()) return;
    const split = splitText(el, { words: true });
    const anim = animate(split.words, {
      opacity: [0, 1],
      filter: ["blur(10px)", "blur(0px)"],
      translateY: [18, 0],
      duration: 900,
      ease: "outQuart",
      delay: stagger(110, { start: 150 }),
    });
    return () => {
      anim.revert();
      split.revert();
    };
  }, []);

  // Las lineas de la ficha se "escriben" una tras otra, como un archivo que se carga.
  useEffect(() => {
    const el = card.current;
    if (!el || prefersReducedMotion()) return;
    const rows = el.querySelectorAll("[data-row]");
    utils.set(rows, { opacity: 0 });
    const anim = animate(rows, { opacity: [0, 1], translateX: [-8, 0], duration: 420, ease: "outQuad", delay: stagger(120, { start: 700 }) });
    return () => {
      anim.revert();
    };
  }, [lang]);

  return (
    <section id="inicio" className="relative flex min-h-dvh items-center px-4 pb-16 pt-32 md:px-8 md:pt-24">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1.35fr_1fr]">
        <div>
          <m.p
            className="mb-6 inline-flex items-center gap-2 rounded-md border border-surface-border bg-surface-panel px-2.5 py-1.5"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE_CRISP }}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
            </span>
            <ShimmerText text={t(HERO.now)} className="text-[12px] text-ink-2" />
          </m.p>

          <p className="label mb-3">{t(HERO.hello)}</p>
          <h1 ref={name} className="font-display text-[clamp(2.8rem,8vw,5.6rem)] font-bold leading-[0.98] tracking-[-0.04em] text-ink">
            Nicolás Dieste España
          </h1>

          <p className="mt-6 max-w-xl font-display text-[1.45rem] font-medium leading-snug tracking-tight text-ink-2 md:text-[1.75rem]">
            {t(HERO.lead)}{" "}
            {/* Todas las palabras apiladas en la misma celda: el hueco mide lo que la mas larga,
                asi la frase no cambia de linea (ni de altura) cada vez que rota la palabra. */}
            <span className="relative inline-grid h-[1.3em] overflow-hidden align-bottom">
              {words.map((wd, k) => {
                const on = k === i;
                const prev = k === (i - 1 + words.length) % words.length;
                return (
                  <m.span
                    key={wd}
                    aria-hidden={!on}
                    className="mark inline-block justify-self-start whitespace-nowrap font-semibold [grid-area:1/1]"
                    initial={false}
                    animate={{ y: on ? "0%" : prev ? "-100%" : "100%", opacity: on ? 1 : 0 }}
                    transition={on || prev ? SPRING : { duration: 0 }}
                  >
                    {wd}
                  </m.span>
                );
              })}
            </span>
          </p>

          <m.p className="mt-6 max-w-xl text-[15px] leading-7 text-ink-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.6 }}>
            {t(HERO.sub)}
          </m.p>

          <m.div className="mt-9 flex flex-wrap gap-3" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EASE_CRISP, delay: 0.75 }}>
            <m.button
              type="button"
              onClick={() => scrollToId("experiencia")}
              whileTap={{ scale: 0.97 }}
              className="group inline-flex items-center gap-2 rounded-md bg-brand px-5 py-3 text-sm font-semibold text-surface-panel shadow-[3px_3px_0_rgb(var(--spark)/0.35)] transition-[transform,box-shadow,background-color] hover:-translate-x-px hover:-translate-y-px hover:bg-brand-hover hover:shadow-[5px_5px_0_rgb(var(--spark)/0.35)]"
            >
              {t(HERO.ctaPrimary)}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </m.button>
            <m.button
              type="button"
              onClick={() => scrollToId("contacto")}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 rounded-md border border-surface-strong bg-surface-panel px-5 py-3 text-sm font-semibold text-ink transition-colors hover:border-brand hover:text-brand"
            >
              <Mail className="h-4 w-4" aria-hidden />
              {t(HERO.ctaSecondary)}
            </m.button>
          </m.div>
        </div>

        <m.div
          ref={card}
          className="card corners mx-auto w-full max-w-[400px] overflow-hidden"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE_CRISP, delay: 0.3 }}
        >
          <div className="flex items-center gap-1.5 border-b border-surface-border bg-surface-sunken/60 px-4 py-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-surface-strong" />
            <span className="h-2.5 w-2.5 rounded-full bg-surface-strong" />
            <span className="h-2.5 w-2.5 rounded-full bg-surface-strong" />
            <span className="ml-2 font-mono text-[11px] text-ink-3">{lang === "es" ? "perfil.yaml" : "profile.yaml"}</span>
          </div>
          <div className="flex items-center gap-4 px-5 pt-5">
            <img src="./foto.jpg" alt="Nicolás Dieste España" width={72} height={72} className="h-[72px] w-[72px] rounded-full object-cover object-top ring-2 ring-surface-panel outline outline-1 outline-surface-strong" />
            <div>
              <p className="font-display text-[17px] font-semibold leading-tight text-ink">Nicolás Dieste España</p>
              <p className="mt-1 flex items-center gap-1 text-[12px] text-ink-3">
                <MapPin className="h-3.5 w-3.5" aria-hidden /> Madrid
              </p>
            </div>
          </div>
          <dl className="px-5 pb-5 pt-4 font-mono text-[12.5px] leading-7">
            {PROFILE.map((r) => (
              <div key={r.k} data-row className="flex gap-2">
                <dt className="shrink-0 text-spark">{lang === "es" ? r.k : PROFILE_KEYS_EN[r.k]}:</dt>
                <dd className="truncate text-ink">{t(r.v)}</dd>
              </div>
            ))}
            <div data-row className="mt-1 flex items-center gap-2 text-ink-3">
              <span>#</span>
              <span>{lang === "es" ? "disponible para hablar" : "open to a chat"}</span>
              <span className="inline-block h-4 w-[7px] animate-pulse-dot bg-brand" aria-hidden />
            </div>
          </dl>
        </m.div>
      </div>
    </section>
  );
}

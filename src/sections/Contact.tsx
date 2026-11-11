import { useState } from "react";
import * as m from "motion/react-m";
import { AnimatePresence } from "motion/react";
import { ArrowUpRight, Check, Copy, Github, Linkedin } from "lucide-react";
import { HoldButton } from "@/components/kokonutui/hold-button";
import { Reveal } from "@/components/Reveal";
import { LINKS } from "@/lib/content";
import { useLang } from "@/lib/i18n";
import { SPRING } from "@/lib/motion";

/** Cierre: un titular grande, el email que se copia manteniendo pulsado (HoldButton de Kokonut) y los enlaces. */
export function Contact() {
  const { lang } = useLang();
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(LINKS.email);
    } catch {
      window.location.href = `mailto:${LINKS.email}`;
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2600);
  };

  return (
    <section id="contacto" className="scroll-mt-20 px-4 py-24 md:px-8 md:py-32" aria-labelledby="contact-title">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-xl bg-brand px-6 py-16 text-center text-surface-panel md:px-16 md:py-24">
        <m.div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-spark/40 blur-3xl"
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <Reveal className="relative">
          <p className="mb-5 inline-flex items-center gap-3 font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-sky">
            <span className="font-semibold text-[#8cc0ff]">06</span>
            <span className="h-px w-8 bg-sky/50" aria-hidden />
            {lang === "es" ? "Contacto" : "Contact"}
          </p>
          <h2 id="contact-title" className="mx-auto max-w-3xl text-balance font-display text-4xl font-semibold leading-[1.02] tracking-[-0.03em] md:text-6xl">
            {lang === "es" ? (
              <>
                ¿Hablamos? Te respondo <span className="text-[#8cc0ff] underline decoration-[#8cc0ff]/40 decoration-4 underline-offset-8">rápido</span>.
              </>
            ) : (
              <>
                Let's talk. I reply <span className="text-[#8cc0ff] underline decoration-[#8cc0ff]/40 decoration-4 underline-offset-8">fast</span>.
              </>
            )}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[15px] leading-7 text-brand-soft">
            {lang === "es" ? "Para prácticas, proyectos o simplemente para charlar sobre datos. Mantén pulsado el botón para copiar mi email." : "For internships, projects or just to chat about data. Press and hold the button to copy my email."}
          </p>

          <div className="mt-9 flex flex-col items-center gap-3">
            <div className="rounded-lg bg-surface-panel p-1">
              <HoldButton
                label={lang === "es" ? "Mantén pulsado para copiar mi email" : "Hold to copy my email"}
                holdingLabel={lang === "es" ? "Sigue pulsando…" : "Keep holding…"}
                holdMs={900}
                onConfirm={copy}
                icon={<Copy className="h-4 w-4" aria-hidden />}
                className="rounded-md border-transparent"
              />
            </div>
            <div className="h-6">
              <AnimatePresence mode="wait">
                {copied ? (
                  <m.p key="ok" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={SPRING} className="inline-flex items-center gap-1.5 text-[13px] text-sky">
                    <Check className="h-4 w-4" aria-hidden /> {lang === "es" ? "Copiado:" : "Copied:"} {LINKS.email}
                  </m.p>
                ) : (
                  <m.a key="mail" href={`mailto:${LINKS.email}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-[13px] text-brand-soft underline decoration-sky/50 underline-offset-4 hover:text-surface-panel">
                    {LINKS.email}
                  </m.a>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {[
              { href: LINKS.linkedin, label: "LinkedIn", Icon: Linkedin },
              { href: LINKS.github, label: "GitHub", Icon: Github },
            ].map(({ href, label, Icon }) => (
              <m.a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.96 }}
                transition={SPRING}
                className="group inline-flex items-center gap-2 rounded-md border border-surface-panel/25 bg-surface-panel/10 px-5 py-3 text-sm font-medium backdrop-blur hover:bg-surface-panel/20"
              >
                <Icon className="h-4 w-4" aria-hidden />
                {label}
                <ArrowUpRight className="h-4 w-4 opacity-60 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
              </m.a>
            ))}
          </div>
        </Reveal>
      </div>
      <p className="mt-8 text-center text-[12px] text-ink-3">
        {lang === "es" ? "Hecho a mano con React, motion, anime.js, Lenis y Kokonut UI · Actualizado en noviembre de 2026" : "Hand-built with React, motion, anime.js, Lenis and Kokonut UI components · Updated November 2026"}
      </p>
    </section>
  );
}

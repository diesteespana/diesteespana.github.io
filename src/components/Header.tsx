import { useEffect, useState } from "react";
import * as m from "motion/react-m";
import { NAV } from "@/lib/content";
import { useLang } from "@/lib/i18n";
import { scrollToId } from "@/lib/scroll";
import { cn } from "@/lib/utils";

/**
 * Cabecera fija arriba: iniciales a la izquierda, secciones en el centro (un subrayado se desliza
 * bajo la activa) y el idioma a la derecha. En movil las secciones bajan a una segunda fila
 * que se desplaza en horizontal.
 */
export function Header() {
  const { lang, setLang, t } = useLang();
  const [active, setActive] = useState(NAV[0].id);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    NAV.forEach((n) => {
      const el = document.getElementById(n.id);
      if (el) io.observe(el);
    });
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const nav = (id: string) => (
    <ul className="flex items-center gap-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {NAV.map((n) => {
        const on = active === n.id;
        return (
          <li key={n.id}>
            <button
              type="button"
              onClick={() => scrollToId(n.id)}
              aria-current={on ? "true" : undefined}
              className={cn("relative whitespace-nowrap px-3 py-2 text-[13px] font-medium transition-colors duration-200", on ? "text-brand" : "text-ink-2 hover:text-ink")}
            >
              {t(n.label)}
              {on && <m.span layoutId={`nav-underline-${id}`} className="absolute inset-x-3 -bottom-px h-[2px] bg-spark" transition={{ type: "spring", stiffness: 500, damping: 40 }} aria-hidden />}
            </button>
          </li>
        );
      })}
    </ul>
  );

  return (
    <header className={cn("fixed inset-x-0 top-0 z-40 border-b transition-[background-color,border-color] duration-300", scrolled ? "border-surface-border bg-surface/90 backdrop-blur-md" : "border-transparent bg-transparent")}>
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 md:px-8">
        <button type="button" onClick={() => scrollToId("inicio")} className="flex items-center gap-2.5" aria-label="Inicio">
          <span className="grid h-8 w-8 place-items-center rounded-md bg-brand font-display text-[13px] font-semibold text-surface-panel">ND</span>
          <span className="hidden font-display text-[14px] font-semibold tracking-tight text-ink sm:block">Nicolás Dieste</span>
        </button>
        <nav aria-label={lang === "es" ? "Secciones" : "Sections"} className="hidden md:block">
          {nav("desk")}
        </nav>
        <div role="group" aria-label="Idioma / Language" className="flex rounded-md border border-surface-border bg-surface-panel p-0.5">
          {(["es", "en"] as const).map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => setLang(l)}
              aria-pressed={lang === l}
              className={cn("relative rounded px-2.5 py-1 font-mono text-[11px] font-semibold uppercase transition-colors duration-200", lang === l ? "text-surface-panel" : "text-ink-3 hover:text-ink")}
            >
              {lang === l && <m.span layoutId="lang-pill" className="absolute inset-0 rounded bg-brand" transition={{ type: "spring", stiffness: 500, damping: 40 }} aria-hidden />}
              <span className="relative">{l}</span>
            </button>
          ))}
        </div>
      </div>
      <nav aria-label={lang === "es" ? "Secciones" : "Sections"} className={cn("border-t px-2 md:hidden", scrolled ? "border-surface-border" : "border-transparent")}>
        {nav("mob")}
      </nav>
    </header>
  );
}

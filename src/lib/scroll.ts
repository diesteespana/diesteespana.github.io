import type Lenis from "lenis";

/** Ir a una seccion: con Lenis si esta activo (para que la inercia no pelee), si no, nativo. */
export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;
  if (lenis) lenis.scrollTo(el, { offset: id === "inicio" ? 0 : -56, duration: 1.1 });
  else el.scrollIntoView({ behavior: "smooth" });
}

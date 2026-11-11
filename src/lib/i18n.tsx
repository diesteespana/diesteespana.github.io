import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "es" | "en";
/** Cada texto visible existe en los dos idiomas. */
export type T = { es: string; en: string };

const Ctx = createContext<{ lang: Lang; setLang: (l: Lang) => void; t: (x: T) => string }>({
  lang: "es",
  setLang: () => {},
  t: (x) => x.es,
});

// Prioridad: ?lang= en la URL, la eleccion guardada y por ultimo el idioma del navegador.
function initialLang(): Lang {
  const q = new URLSearchParams(location.search).get("lang");
  if (q === "es" || q === "en") return q;
  try {
    const s = localStorage.getItem("cv-lang");
    if (s === "es" || s === "en") return s;
  } catch {
    /* almacenamiento bloqueado: seguimos */
  }
  return (navigator.language || "es").toLowerCase().startsWith("es") ? "es" : "en";
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang);
  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = lang === "es" ? "Nicolás Dieste España — Currículum" : "Nicolás Dieste España — CV";
  }, [lang]);
  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem("cv-lang", l);
    } catch {
      /* sin almacenamiento: solo dura esta visita */
    }
  };
  return <Ctx.Provider value={{ lang, setLang, t: (x) => x[lang] }}>{children}</Ctx.Provider>;
}

export const useLang = () => useContext(Ctx);

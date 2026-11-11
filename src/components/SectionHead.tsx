import type { ReactNode } from "react";
import { Reveal } from "@/components/Reveal";

/** Cabecera de seccion: "01 — SOBRE MI" en mono con una regla fina, y el titular debajo. */
export function SectionHead({ n, label, children, id, intro }: { n: string; label: string; children: ReactNode; id: string; intro?: ReactNode }) {
  return (
    <Reveal>
      <div className="mb-5 flex items-center gap-3">
        <span className="font-mono text-[12px] font-semibold text-spark">{n}</span>
        <span className="h-px w-8 bg-surface-strong" aria-hidden />
        <span className="label">{label}</span>
      </div>
      <h2 id={id} className="h-section max-w-3xl">
        {children}
      </h2>
      {intro && <p className="mt-5 max-w-2xl text-[15px] leading-7 text-ink-2">{intro}</p>}
    </Reveal>
  );
}

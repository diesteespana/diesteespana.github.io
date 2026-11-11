import { CountUp } from "@/components/CountUp";
import { Reveal } from "@/components/Reveal";
import { STATS } from "@/lib/content";
import { useLang } from "@/lib/i18n";

/** Cuatro cifras en una regla de plano: numero grande que cuenta solo y su leyenda en mono. */
export function Stats() {
  const { t } = useLang();
  return (
    <section aria-label="En cifras" className="px-4 md:px-8">
      <div className="mx-auto grid max-w-6xl grid-cols-2 border-y border-surface-strong md:grid-cols-4">
        {STATS.map((s, k) => (
          <Reveal key={s.label.es} delay={k * 0.08} y={16} className={`px-4 py-7 md:px-6 ${k % 2 ? "border-l" : ""} ${k > 1 ? "border-t md:border-t-0" : ""} ${k === 2 ? "md:border-l" : ""} border-surface-strong`}>
            <p className="font-mono text-[11px] text-spark">0{k + 1}</p>
            <p className="mt-2 font-display text-4xl font-semibold tracking-tight text-ink md:text-[2.75rem]">
              <CountUp value={s.value} suffix={s.suffix} />
            </p>
            <p className="mt-1.5 text-[13px] leading-5 text-ink-2">{t(s.label)}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

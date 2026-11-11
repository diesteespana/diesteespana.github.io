

/**
 * @author: @dorianbaffier
 * @description: Shimmer Text
 * @version: 1.0.0
 * @date: 2025-06-26
 * @license: MIT
 * @website: https://kokonutui.com
 * @github: https://github.com/kokonut-labs/kokonutui
 *
 * Adapted for PumpWatch, reused in this CV: a one-line loading label instead of a heading. The original
 * looped background-position (a repaint every frame); this version is transform-only:
 * a narrow window slides across while its bright copy of the text counter-slides, so
 * the highlight travels over static letters. Reduced motion leaves the plain label.
 */

import * as m from "motion/react-m";
import { cn } from "@/lib/utils";

const WINDOW = 0.35; // highlight width as a fraction of the text
const LOOP = { duration: 1.8, ease: "linear", repeat: Number.POSITIVE_INFINITY, repeatDelay: 0.3 } as const;

export default function ShimmerText({ text, className }: { text: string; className?: string }) {
  return (
    <span role="status" className={cn("relative inline-block whitespace-nowrap font-mono text-sm text-ink-3", className)}>
      {text}
      <m.span
        aria-hidden
        className="absolute inset-y-0 left-0 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_40%,#000_60%,transparent)]"
        style={{ width: `${WINDOW * 100}%` }}
        initial={{ x: "-100%" }}
        animate={{ x: ["-100%", `${100 / WINDOW}%`] }}
        transition={LOOP}
      >
        <m.span
          className="absolute inset-y-0 left-0 text-brand"
          style={{ width: `${100 / WINDOW}%` }}
          initial={{ x: `${WINDOW * 100}%` }}
          animate={{ x: [`${WINDOW * 100}%`, "-100%"] }}
          transition={LOOP}
        >
          {text}
        </m.span>
      </m.span>
    </span>
  );
}

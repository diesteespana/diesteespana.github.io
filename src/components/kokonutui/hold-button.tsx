

/**
 * @author: @dorianbaffier
 * @description: Hold Button
 * @version: 1.0.0
 * @date: 2025-06-26
 * @license: MIT
 * @website: https://kokonutui.com
 * @github: https://github.com/kokonut-labs/kokonutui
 *
 * Adapted for PumpWatch, reused in this CV: a hold-to-confirm button for things that can't be undone. The fill is
 * transform-only (scaleX from the left, instead of animating width), mouse, touch and pen share
 * pointer events, the keyboard holds Space or Enter, it calls `onConfirm` when the fill
 * completes (nothing happens on a short tap), the labels are props, and it uses the blue
 * brand colours of this CV. Releasing early empties the fill quickly.
 */

import { useAnimate } from "motion/react";
import * as React from "react";
import { cn } from "@/lib/utils";

interface HoldButtonProps {
  /** What it does, shown at rest («Mantén pulsado para borrar»). */
  label: string;
  /** Shown while holding («Sigue pulsando…»). */
  holdingLabel?: string;
  onConfirm: () => void;
  holdMs?: number;
  icon?: React.ReactNode;
  disabled?: boolean;
  className?: string;
}

export function HoldButton({ label, holdingLabel = "Sigue pulsando…", onConfirm, holdMs = 1600, icon, disabled, className }: HoldButtonProps) {
  const [scope, animate] = useAnimate<HTMLButtonElement>();
  const [holding, setHolding] = React.useState(false);
  const run = React.useRef(0);

  const start = async () => {
    if (disabled || holding) return;
    const id = ++run.current;
    setHolding(true);
    try {
      await animate("[data-hold-fill]", { scaleX: [0, 1] }, { duration: holdMs / 1000, ease: "linear" });
    } catch {
      return; // stopped by release
    }
    if (id !== run.current) return;
    setHolding(false);
    onConfirm();
  };

  const stop = () => {
    if (!holding) return;
    run.current++;
    setHolding(false);
    animate("[data-hold-fill]", { scaleX: 0 }, { duration: 0.15, ease: "easeOut" });
  };

  return (
    <button
      ref={scope}
      type="button"
      disabled={disabled}
      onPointerDown={(e) => {
        e.currentTarget.setPointerCapture(e.pointerId);
        void start();
      }}
      onPointerUp={stop}
      onPointerCancel={stop}
      onKeyDown={(e) => {
        if ((e.key === " " || e.key === "Enter") && !e.repeat) {
          e.preventDefault();
          void start();
        }
      }}
      onKeyUp={(e) => {
        if (e.key === " " || e.key === "Enter") stop();
      }}
      onBlur={stop}
      className={cn(
        "relative inline-flex h-12 min-w-60 touch-none select-none items-center justify-center overflow-hidden rounded-full border border-brand/40 bg-brand-soft px-5 text-sm font-medium text-brand",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
        "disabled:pointer-events-none disabled:opacity-50",
        className,
      )}
    >
      <span data-hold-fill aria-hidden className="absolute inset-0 origin-left scale-x-0 bg-brand/20" />
      <span className="relative z-10 flex items-center gap-2">
        {icon}
        <span aria-live="polite">{holding ? holdingLabel : label}</span>
      </span>
    </button>
  );
}

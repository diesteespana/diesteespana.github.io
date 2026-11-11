

/**
 * @author: @dorianbaffier
 * @description: Smooth Tab
 * @version: 1.0.0
 * @date: 2025-06-26
 * @license: MIT
 * @website: https://kokonutui.com
 * @github: https://github.com/kokonut-labs/kokonutui
 *
 * Adapted for PumpWatch, reused in this CV: a controlled, generic tab set. The sliding highlight is a
 * shared-layout element (transform only, instead of animating width/left), the demo
 * waveform cards are gone, panels slide in the direction of travel, and it has the
 * full WAI-ARIA tabs pattern (roving tabindex, arrows/Home/End, tabpanel labelling).
 */

import type { LucideIcon } from "lucide-react";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import * as React from "react";
import { EASE_CRISP } from "@/lib/motion";
import { cn } from "@/lib/utils";

export interface SmoothTabItem<T extends string> {
  id: T;
  label: string;
  icon?: LucideIcon;
}

interface SmoothTabsProps<T extends string> {
  items: SmoothTabItem<T>[];
  value: T;
  onChange: (id: T) => void;
  /** Accessible name for the tab list. */
  label: string;
  children: React.ReactNode;
  className?: string;
}

export function SmoothTabs<T extends string>({ items, value, onChange, label, children, className }: SmoothTabsProps<T>) {
  const baseId = React.useId();
  const highlightId = `${baseId}-highlight`;
  const refs = React.useRef(new Map<T, HTMLButtonElement>());
  const index = items.findIndex((i) => i.id === value);
  const previous = React.useRef(index);
  const direction = index >= previous.current ? 1 : -1;
  React.useEffect(() => {
    previous.current = index;
  }, [index]);

  const select = (i: number) => {
    const item = items[(i + items.length) % items.length];
    onChange(item.id);
    refs.current.get(item.id)?.focus();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    const moves: Record<string, number> = { ArrowRight: index + 1, ArrowLeft: index - 1, Home: 0, End: items.length - 1 };
    if (!(e.key in moves)) return;
    e.preventDefault();
    select(moves[e.key]);
  };

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <div className="well flex gap-1 overflow-x-auto rounded-md p-1" role="tablist" aria-label={label}>
        {items.map(({ id, label: text, icon: Icon }) => {
          const selected = id === value;
          return (
            <button
              key={id}
              ref={(el) => {
                if (el) refs.current.set(id, el);
                else refs.current.delete(id);
              }}
              type="button"
              role="tab"
              id={`${baseId}-tab-${id}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel`}
              tabIndex={selected ? 0 : -1}
              onClick={() => onChange(id)}
              onKeyDown={onKeyDown}
              className={cn(
                "relative flex flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-sm px-3 py-2 text-sm transition-colors duration-200",
                selected ? "text-ink" : "text-ink-2 hover:text-ink",
              )}
            >
              {selected && (
                <m.span
                  layoutId={highlightId}
                  className="absolute inset-0 rounded-sm border border-surface-strong bg-surface-raised"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  aria-hidden
                />
              )}
              {Icon && <Icon className={cn("relative h-3.5 w-3.5", selected && "text-brand")} aria-hidden />}
              <span className="relative">{text}</span>
            </button>
          );
        })}
      </div>

      <div className="relative">
        {/* "wait": the old panel leaves before the new one mounts, so one tabpanel id at a time. */}
        <AnimatePresence mode="wait" initial={false} custom={direction}>
          <m.div
            key={value}
            id={`${baseId}-panel`}
            role="tabpanel"
            aria-labelledby={`${baseId}-tab-${value}`}
            custom={direction}
            variants={{
              enter: (d: number) => ({ opacity: 0, x: 24 * d }),
              center: { opacity: 1, x: 0 },
              exit: (d: number) => ({ opacity: 0, x: -24 * d }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.16, ease: EASE_CRISP }}
          >
            {children}
          </m.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

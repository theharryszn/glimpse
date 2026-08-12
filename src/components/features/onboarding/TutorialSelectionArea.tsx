import { forwardRef } from "react";
import { cn } from "@/shared/utils/classnames";

interface TutorialSelectionAreaProps {
  state?: "idle" | "holding" | "complete";
  describedBy?: string;
}

export const TutorialSelectionArea = forwardRef<
  HTMLDivElement,
  TutorialSelectionAreaProps
>(function TutorialSelectionArea({ state = "idle", describedBy }, ref) {
  const complete = state === "complete";
  const holding = state === "holding";

  return (
    <div
      ref={ref}
      role="group"
      aria-label="Selectable practice passage"
      aria-describedby={describedBy}
      className={cn(
        "relative cursor-text select-text overflow-hidden rounded-[var(--radius-lg)] border px-6 py-7 text-center transition-[background-color,border-color,box-shadow] duration-150 motion-reduce:transition-none",
        complete
          ? "border-accent/45 bg-accent-soft"
          : holding
            ? "border-accent bg-accent-soft shadow-[0_0_0_3px_var(--accent-gold-soft)]"
            : "border-hairline bg-surface-inset hover:border-accent/50",
      )}
    >
      <span className="mb-3 block font-mono text-[9px] font-medium uppercase tracking-[0.08em] text-ink-muted">
        Select this passage
      </span>
      <p
        className={cn(
          "mx-auto mb-0 mt-0 max-w-[520px] text-[15px] font-medium leading-[1.7]",
          complete ? "text-accent-strong" : "text-ink",
        )}
      >
        A useful idea becomes easier to revisit when its source and context stay
        together.
      </p>

      {holding && (
        <span
          className="pointer-events-none absolute bottom-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full bg-surface-raised px-2.5 py-1 font-mono text-[9px] font-medium text-accent-strong shadow-[0_2px_10px_rgba(0,0,0,0.2)]"
          aria-hidden
        >
          <span className="size-1.5 rounded-full bg-accent animate-pulse motion-reduce:animate-none" />
          Keep holding still · 1.5 sec
        </span>
      )}
    </div>
  );
});

import { forwardRef } from "react";
import { cn } from "@/shared/utils/classnames";

interface TutorialSelectionAreaProps {
  complete?: boolean;
}

export const TutorialSelectionArea = forwardRef<
  HTMLDivElement,
  TutorialSelectionAreaProps
>(function TutorialSelectionArea({ complete = false }, ref) {
  return (
    <div
      ref={ref}
      className={cn(
        "cursor-text select-text rounded-[var(--radius-lg)] border border-dashed border-accent/70 px-6 py-7 text-center transition-colors duration-200 motion-reduce:transition-none",
        complete ? "bg-accent-soft" : "bg-surface-raised",
      )}
    >
      <p
        className={cn(
          "m-0 text-base italic leading-relaxed",
          complete ? "text-accent-strong" : "text-ink",
        )}
      >
        &quot;The ephemeral nature of digital fragments requires a persistent
        observer to forge lasting knowledge.&quot;
      </p>
    </div>
  );
});

import { CheckCircle } from "@phosphor-icons/react";
import { Button } from "@/components/ui/Button";

interface TutorialSuccessStateProps {
  onReset: () => void;
}

export function TutorialSuccessState({ onReset }: TutorialSuccessStateProps) {
  return (
    <div
      className="mt-4 flex items-center justify-between gap-4 rounded-[var(--radius-lg)] bg-accent-soft p-3 animate-[fadeIn_0.2s_ease-out] motion-reduce:animate-none"
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      <div className="flex min-w-0 items-start gap-2.5">
        <CheckCircle
          size={18}
          weight="fill"
          className="mt-0.5 shrink-0 text-accent-strong"
          aria-hidden
        />
        <div>
          <strong className="block text-xs font-semibold text-ink">
            Magic Hold recognized
          </strong>
          <span className="mt-0.5 block text-[11px] leading-relaxed text-ink-muted">
            This is the same gesture Glimpse listens for while you read.
          </span>
        </div>
      </div>
      <Button variant="ghost" size="sm" onClick={onReset}>
        Try again
      </Button>
    </div>
  );
}

import { CheckCircle } from "@phosphor-icons/react";

export function TutorialSuccessState() {
  return (
    <div
      className="mt-5 flex items-start gap-2.5 rounded-[var(--radius-md)] bg-accent-soft p-3 animate-[fadeIn_0.35s_ease-in]"
      role="status"
    >
      <CheckCircle
        size={18}
        weight="fill"
        className="mt-0.5 shrink-0 text-accent-strong"
        aria-hidden
      />
      <div>
        <strong className="block text-xs font-semibold text-ink">
          Hold gesture complete
        </strong>
        <span className="mt-0.5 block text-[11px] leading-relaxed text-ink-muted">
          You&apos;re ready to use Glimpse anywhere you read.
        </span>
      </div>
    </div>
  );
}

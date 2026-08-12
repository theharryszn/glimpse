import { useId } from "react";
import { KeyboardShortcut } from "@/components/ui/KeyboardShortcut";
import { Button } from "@/components/ui/Button";

const remainingSteps = [
  {
    label: "Explain a passage",
    detail: "Drag to highlight, then keep holding still for 1.5 seconds.",
  },
  {
    label: "Continue the thought",
    detail: "Ask a follow-up from the explanation.",
  },
];

interface QuickStartStepsProps {
  shortcutKeys?: string[];
  onOpenScrapbook?: () => void;
}

export function QuickStartSteps({
  shortcutKeys = ["Alt / Option", "Shift", "G"],
  onOpenScrapbook,
}: QuickStartStepsProps = {}) {
  const headingId = useId();
  const steps = [
    {
      label: "Open your scrapbook",
      detail: (
        <span className="flex flex-wrap items-center gap-2">
          {shortcutKeys.length > 0 ? (
            <KeyboardShortcut
              keys={shortcutKeys}
              label={shortcutKeys.join(" plus ")}
            />
          ) : (
            <span>Shortcut not assigned in Chrome.</span>
          )}
          {onOpenScrapbook ? (
            <Button
              variant="ghost"
              size="sm"
              className="!h-7 px-2 text-[10px]"
              onClick={onOpenScrapbook}
            >
              Open now
            </Button>
          ) : null}
        </span>
      ),
    },
    ...remainingSteps,
  ];

  return (
    <section aria-labelledby={headingId}>
      <div className="mb-2.5 flex items-baseline justify-between gap-3">
        <h2
          id={headingId}
          className="m-0 text-xs font-semibold text-ink"
        >
          Start here
        </h2>
        <span className="font-mono text-[9px] uppercase tracking-[0.07em] text-ink-muted">
          3 steps
        </span>
      </div>
      <ol className="m-0 list-none divide-y divide-hairline overflow-hidden rounded-[var(--radius-lg)] bg-surface-inset p-0">
        {steps.map((step, index) => (
          <li
            key={step.label}
            className="flex items-start gap-2.5 px-3 py-2.5 text-xs leading-[1.4]"
          >
            <span className="mt-px w-4 shrink-0 font-mono text-[10px] leading-[1.7] text-accent-strong">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="min-w-0">
              <strong className="block font-medium text-ink">{step.label}</strong>
              <span className="mt-1 block text-[11px] leading-[1.45] text-ink-muted">
                {step.detail}
              </span>
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}

import type { MouseEvent as ReactMouseEvent } from "react";
import { ArrowSquareOut, WarningCircle } from "@phosphor-icons/react";

interface CapabilityInstructionsProps {
  onOpenChromeUrl: (url: string) => void;
}

const steps = [
  {
    label: "Prompt API for Gemini Nano",
    instruction: "Set the flag to Enabled.",
    url: "chrome://flags/#prompt-api-for-gemini-nano",
  },
  {
    label: "On-device model performance",
    instruction: "Choose Enabled BypassPerfRequirement.",
    url: "chrome://flags/#optimization-guide-on-device-model",
  },
  {
    label: "Optimization Guide model",
    instruction: "Find the on-device model, then choose Check for update.",
    url: "chrome://components",
  },
] as const;

export function CapabilityInstructions({
  onOpenChromeUrl,
}: CapabilityInstructionsProps) {
  const open = (event: ReactMouseEvent, url: string) => {
    event.preventDefault();
    onOpenChromeUrl(url);
  };

  return (
    <div className="mt-4 rounded-[var(--radius-lg)] border border-[#ff9a92]/25 bg-surface-inset p-3.5">
      <div className="flex items-start gap-2.5">
        <WarningCircle
          size={16}
          weight="fill"
          className="mt-0.5 shrink-0 text-[#ff9a92]"
          aria-hidden
        />
        <div>
          <strong className="text-xs font-semibold text-ink">
            Chrome setup required
          </strong>
          <p className="mb-0 mt-1 text-[11px] leading-relaxed text-ink-muted">
            Open each browser page and apply the setting shown below.
          </p>
        </div>
      </div>
      <ol className="mb-0 mt-3 list-none space-y-1.5 p-0">
        {steps.map((step, index) => (
          <li key={step.url}>
            <button
              type="button"
              onClick={(event) => open(event, step.url)}
              className="group flex min-h-11 w-full cursor-pointer items-start gap-2.5 rounded-[var(--radius-md)] border-0 bg-surface-raised px-3 py-2.5 text-left text-ink transition-colors duration-150 hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent motion-reduce:transition-none"
            >
              <span className="mt-px w-4 shrink-0 font-mono text-[9px] leading-[1.7] text-accent-strong">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="min-w-0 flex-1">
                <strong className="block text-[11px] font-medium">
                  {step.label}
                </strong>
                <span className="mt-0.5 block text-[10px] leading-relaxed text-ink-muted">
                  {step.instruction}
                  <span className="sr-only"> Opens in a new tab.</span>
                </span>
              </span>
              <ArrowSquareOut
                size={14}
                className="mt-0.5 shrink-0 text-ink-muted transition-colors duration-150 group-hover:text-ink motion-reduce:transition-none"
                aria-hidden
              />
            </button>
          </li>
        ))}
      </ol>
      <p className="mb-0 mt-3 text-[10px] leading-relaxed text-ink-muted">
        Relaunch Chrome after changing flags, then check again.
      </p>
    </div>
  );
}

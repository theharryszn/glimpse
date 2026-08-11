import type { MouseEvent as ReactMouseEvent } from "react";

interface CapabilityInstructionsProps {
  onOpenChromeUrl: (url: string) => void;
}

const steps = [
  {
    label: "Enable the Prompt API flag",
    url: "chrome://flags/#prompt-api-for-gemini-nano",
  },
  {
    label: "Bypass the on-device model performance requirement",
    url: "chrome://flags/#optimization-guide-on-device-model",
  },
  {
    label: "Update the Optimization Guide On Device Model",
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
    <div className="mt-3 rounded-[var(--radius-md)] bg-[#b3261e]/[0.06] p-3 text-[#8f1d17]">
      <strong className="text-xs font-semibold">Local AI needs setup</strong>
      <p className="mb-2 mt-1 text-[11px] leading-relaxed">
        Use Chrome 127 or newer, then complete these browser settings.
      </p>
      <ol className="m-0 space-y-1.5 pl-4 text-[11px] leading-relaxed">
        {steps.map((step) => (
          <li key={step.url}>
            <a
              href={step.url}
              onClick={(event) => open(event, step.url)}
              className="font-medium underline underline-offset-2"
            >
              {step.label}
            </a>
          </li>
        ))}
      </ol>
    </div>
  );
}

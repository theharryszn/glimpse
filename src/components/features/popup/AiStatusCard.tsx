import { StatusIndicator, type StatusTone } from "@/components/ui/StatusIndicator";
import { Surface } from "@/components/ui/Surface";
import type { AiCapabilityStatus } from "@/shared/utils/ai-health-service";

export type AiStatusTone = StatusTone;

interface AiStatusCardProps {
  status: AiCapabilityStatus | "checking";
  enabled: boolean;
}

const statusCopy: Record<
  AiCapabilityStatus | "checking",
  { label: string; detail: string; tone: AiStatusTone; busy?: boolean }
> = {
  checking: {
    label: "Checking local AI",
    detail: "Reading this device’s built-in AI status.",
    tone: "idle",
    busy: true,
  },
  available: {
    label: "Local AI ready",
    detail: "Explanations run on this device.",
    tone: "success",
  },
  downloadable: {
    label: "Model download available",
    detail: "Open setup to prepare Chrome’s built-in model.",
    tone: "warning",
  },
  downloading: {
    label: "Downloading local model",
    detail: "Chrome is preparing the built-in model.",
    tone: "warning",
    busy: true,
  },
  unavailable: {
    label: "Local AI needs setup",
    detail: "Open setup to check Chrome support and model settings.",
    tone: "error",
  },
};

export function AiStatusCard({ status, enabled }: AiStatusCardProps) {
  const presentation = enabled
    ? statusCopy[status]
    : {
        label: "Glimpse is paused",
        detail: "Page capture and the scrapbook shortcut are off.",
        tone: "idle" as AiStatusTone,
      };

  return (
    <Surface
      elevation="raised"
      className="px-3.5 py-3"
      role="status"
      aria-live="polite"
      aria-atomic="true"
      aria-busy={presentation.busy || undefined}
    >
      <StatusIndicator
        label={presentation.label}
        tone={presentation.tone}
        className="text-ink"
      />
      <p className="mb-0 mt-1.5 pl-3.5 text-[11px] leading-[1.5] text-ink-muted">
        {presentation.detail}
      </p>
    </Surface>
  );
}

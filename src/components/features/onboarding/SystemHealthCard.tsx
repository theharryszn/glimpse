import { useId } from "react";
import type { AiCapabilityStatus } from "@/shared/utils/ai-health-service";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { CapabilityInstructions } from "./CapabilityInstructions";
import { HealthStatusRow } from "./HealthStatusRow";

export type IdentityStatus = "checking" | "ready" | "unavailable";

interface SystemHealthCardProps {
  aiStatus: AiCapabilityStatus | "checking";
  identityStatus: IdentityStatus;
  isPreparingAi?: boolean;
  onPrepareAi?: () => void;
  onCheckAgain?: () => void;
  onOpenChromeUrl?: (url: string) => void;
}

export function SystemHealthCard({
  aiStatus,
  identityStatus,
  isPreparingAi = false,
  onPrepareAi,
  onCheckAgain,
  onOpenChromeUrl = (url) => browser.tabs.create({ url }),
}: SystemHealthCardProps) {
  const titleId = useId();
  const isSystemReady = identityStatus === "ready" && aiStatus === "available";
  const needsAttention =
    identityStatus === "unavailable" || aiStatus === "unavailable";
  const summary = isSystemReady
    ? { label: "Ready", tone: "success" as const }
    : needsAttention
      ? { label: "Needs attention", tone: "error" as const }
      : identityStatus === "checking" || aiStatus === "checking"
        ? { label: "Checking", tone: "neutral" as const }
        : aiStatus === "downloadable"
        ? { label: "Download available", tone: "warning" as const }
        : aiStatus === "downloading" || isPreparingAi
          ? { label: "Downloading", tone: "warning" as const }
          : { label: "Checking", tone: "neutral" as const };
  const aiDetail = {
    checking: "Checking browser and hardware support.",
    available: "Gemini Nano is available on this device.",
    downloadable: "The local model can be downloaded now.",
    downloading: "Downloading the local model in Chrome.",
    unavailable: "This browser is not currently ready for built-in AI.",
  }[aiStatus];

  return (
    <section
      className="rounded-[var(--radius-lg)] bg-surface-raised p-5"
      aria-labelledby={titleId}
      aria-busy={
        aiStatus === "checking" ||
        aiStatus === "downloading" ||
        identityStatus === "checking" ||
        isPreparingAi ||
        undefined
      }
    >
      <div className="mb-3 flex items-center justify-between gap-4">
        <div>
          <span className="mb-1 block font-mono text-[9px] font-medium uppercase tracking-[0.08em] text-ink-muted">
            On this device
          </span>
          <h2 id={titleId} className="m-0 text-base font-semibold">
            System readiness
          </h2>
        </div>
        <Badge tone={summary.tone}>{summary.label}</Badge>
      </div>

      <div className="divide-y divide-hairline">
        <HealthStatusRow
          label="Local identity"
          detail={
            identityStatus === "ready"
              ? "Created and stored only on this device."
              : identityStatus === "unavailable"
                ? "Chrome could not create the local identity."
                : "Creating a local identity."
          }
          tone={
            identityStatus === "ready"
              ? "ready"
              : identityStatus === "unavailable"
                ? "unavailable"
                : "checking"
          }
        />
        <HealthStatusRow
          label="Built-in AI"
          detail={aiDetail}
          tone={
            aiStatus === "available"
              ? "ready"
              : aiStatus === "unavailable"
                ? "unavailable"
                : aiStatus === "downloadable"
                  ? "action"
                  : "checking"
          }
        />
      </div>

      {aiStatus === "downloadable" && onPrepareAi && (
        <div className="mt-4 flex items-center justify-between gap-4 rounded-[var(--radius-md)] bg-surface-inset p-3">
          <p className="m-0 max-w-[360px] text-[11px] leading-relaxed text-ink-muted">
            Chrome downloads the model once. Glimpse uses it locally after that.
          </p>
          <Button
            size="sm"
            onClick={onPrepareAi}
            disabled={isPreparingAi}
          >
            Download model
          </Button>
        </div>
      )}

      {aiStatus === "unavailable" && (
        <CapabilityInstructions onOpenChromeUrl={onOpenChromeUrl} />
      )}

      {(aiStatus === "unavailable" || identityStatus === "unavailable") &&
        onCheckAgain && (
        <div className="mt-3 flex justify-end">
          <Button variant="secondary" size="sm" onClick={onCheckAgain}>
            Check again
          </Button>
        </div>
        )}
    </section>
  );
}

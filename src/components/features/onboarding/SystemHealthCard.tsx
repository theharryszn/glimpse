import type { AiCapabilityStatus } from "@/shared/utils/ai-health-service";
import { CapabilityInstructions } from "./CapabilityInstructions";
import { HealthStatusRow } from "./HealthStatusRow";

interface SystemHealthCardProps {
  aiStatus: AiCapabilityStatus | "checking";
  identityReady: boolean;
  onOpenChromeUrl?: (url: string) => void;
}

export function SystemHealthCard({
  aiStatus,
  identityReady,
  onOpenChromeUrl = (url) => browser.tabs.create({ url }),
}: SystemHealthCardProps) {
  const isSystemReady = identityReady && aiStatus === "available";
  const aiDetail = {
    checking: "Checking browser and hardware support.",
    available: "Gemini Nano is available on this device.",
    downloadable: "The local model is ready to download.",
    downloading: "Downloading the local model in Chrome.",
    unavailable: "This browser is not currently ready for built-in AI.",
  }[aiStatus];

  return (
    <section className="rounded-[var(--radius-md)] border border-hairline bg-surface-raised p-6">
      <div className="mb-3 flex items-baseline justify-between gap-4">
        <h2 className="m-0 text-lg">System health</h2>
        <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-ink-muted">
          {isSystemReady ? "Ready" : "Preparing"}
        </span>
      </div>

      <div className="divide-y divide-hairline">
        <HealthStatusRow
          label="Local identity"
          detail={identityReady ? "Created and stored on this device." : "Creating a secure local identity."}
          tone={identityReady ? "ready" : "preparing"}
        />
        <HealthStatusRow
          label="Built-in AI"
          detail={aiDetail}
          tone={
            aiStatus === "available"
              ? "ready"
              : aiStatus === "unavailable"
                ? "unavailable"
                : "preparing"
          }
        />
      </div>

      {aiStatus === "unavailable" && (
        <CapabilityInstructions onOpenChromeUrl={onOpenChromeUrl} />
      )}
    </section>
  );
}

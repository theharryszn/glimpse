import { AiStatusCard } from "@/components/features/popup/AiStatusCard";
import { PopupFooter } from "@/components/features/popup/PopupFooter";
import { PopupHeader } from "@/components/features/popup/PopupHeader";
import { QuickStartSteps } from "@/components/features/popup/QuickStartSteps";
import type { AiCapabilityStatus } from "@/shared/utils/ai-health-service";
import { useStoredState } from "../shared/useStoredState";

const statuses: Array<AiCapabilityStatus | "checking"> = [
  "available",
  "checking",
  "downloadable",
  "downloading",
  "unavailable",
];

export function PopupStory() {
  const [enabled, setEnabled] = useStoredState(
    "glimpse-design-lab-popup-enabled",
    true,
  );
  const [statusIndex, setStatusIndex] = useStoredState(
    "glimpse-design-lab-popup-status",
    0,
  );
  const status = statuses[statusIndex] ?? "available";

  return (
    <div className="design-lab-small-component-frame">
      <div className="design-lab-state-controls">
        {statuses.map((option, index) => (
          <button
            key={option}
            data-active={statusIndex === index}
            onClick={() => setStatusIndex(index)}
          >
            {option}
          </button>
        ))}
        <button data-active={!enabled} onClick={() => setEnabled(!enabled)}>
          paused
        </button>
      </div>
      <div className="design-lab-popup-width dark">
        <PopupHeader
          enabled={enabled}
          onToggleEnabled={() => setEnabled(!enabled)}
        />
        <div className="px-5 py-4">
          <AiStatusCard status={status} enabled={enabled} />
          <div className="mt-4">
            <QuickStartSteps
              onOpenScrapbook={() =>
                window.location.assign("#scrapbook-panel")
              }
            />
          </div>
        </div>
        <PopupFooter
          setupNeeded={status !== "available"}
          showDesignLab
          onOpenDesignLab={() => window.location.assign("#foundations")}
          onOpenSetupGuide={() =>
            window.open("/welcome.html", "_blank", "noopener")
          }
        />
      </div>
    </div>
  );
}

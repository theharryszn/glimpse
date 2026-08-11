import { SystemHealthCard } from "@/components/features/onboarding/SystemHealthCard";
import type { AiCapabilityStatus } from "@/shared/utils/ai-health-service";
import { useStoredState } from "../shared/useStoredState";

const healthStates: Array<AiCapabilityStatus | "checking"> = [
  "available",
  "checking",
  "downloading",
  "unavailable",
];

export function SystemHealthStory() {
  const [selected, setSelected] = useStoredState(
    "glimpse-design-lab-system-health",
    0,
  );
  const status = healthStates[selected] ?? "available";

  return (
    <div className="design-lab-health-frame">
      <div className="design-lab-state-controls">
        {healthStates.map((option, index) => (
          <button
            key={option}
            data-active={selected === index}
            onClick={() => setSelected(index)}
          >
            {option}
          </button>
        ))}
      </div>
      <SystemHealthCard
        aiStatus={status}
        identityReady={status === "available"}
        onOpenChromeUrl={() => undefined}
      />
    </div>
  );
}

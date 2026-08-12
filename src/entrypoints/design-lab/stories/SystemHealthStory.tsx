import {
  SystemHealthCard,
  type IdentityStatus,
} from "@/components/features/onboarding/SystemHealthCard";
import type { AiCapabilityStatus } from "@/shared/utils/ai-health-service";
import { useStoredState } from "../shared/useStoredState";

const healthStates: Array<{
  label: string;
  ai: AiCapabilityStatus | "checking";
  identity: IdentityStatus;
}> = [
  { label: "ready", ai: "available", identity: "ready" },
  { label: "checking", ai: "checking", identity: "checking" },
  { label: "download", ai: "downloadable", identity: "ready" },
  { label: "downloading", ai: "downloading", identity: "ready" },
  { label: "AI unavailable", ai: "unavailable", identity: "ready" },
  { label: "identity failed", ai: "available", identity: "unavailable" },
];

export function SystemHealthStory() {
  const [selected, setSelected] = useStoredState(
    "glimpse-design-lab-system-health",
    0,
  );
  const state = healthStates[selected] ?? healthStates[0];
  const selectState = (label: (typeof healthStates)[number]["label"]) => {
    const nextIndex = healthStates.findIndex((option) => option.label === label);
    if (nextIndex >= 0) setSelected(nextIndex);
  };

  return (
    <div className="design-lab-health-frame">
      <div className="design-lab-state-controls">
        {healthStates.map((option, index) => (
          <button
            key={option.label}
            data-active={selected === index}
            onClick={() => setSelected(index)}
          >
            {option.label}
          </button>
        ))}
      </div>
      <SystemHealthCard
        aiStatus={state.ai}
        identityStatus={state.identity}
        onPrepareAi={() => {
          selectState("downloading");
          window.setTimeout(() => selectState("ready"), 900);
        }}
        onCheckAgain={() => {
          selectState("checking");
          window.setTimeout(() => selectState("ready"), 650);
        }}
        onOpenChromeUrl={(url) => window.open(url, "_blank", "noopener")}
      />
    </div>
  );
}

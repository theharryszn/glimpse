import {
  AiStatusCard,
  type AiStatusTone,
} from "@/components/features/popup/AiStatusCard";
import { useStoredState } from "../shared/useStoredState";

const states: Array<{ label: string; tone: AiStatusTone }> = [
  { label: "Active", tone: "success" },
  { label: "Preparing...", tone: "warning" },
  { label: "Unavailable", tone: "error" },
  { label: "Disabled", tone: "idle" },
];

export function AiStatusCardStory() {
  const [selected, setSelected] = useStoredState(
    "glimpse-design-lab-ai-status",
    0,
  );
  const state = states[selected] ?? states[0];

  return (
    <div className="design-lab-small-component-frame">
      <div className="design-lab-state-controls">
        {states.map((option, index) => (
          <button
            key={option.label}
            data-active={selected === index}
            onClick={() => setSelected(index)}
          >
            {option.label}
          </button>
        ))}
      </div>
      <div className="design-lab-popup-width">
        <AiStatusCard label={state.label} tone={state.tone} />
      </div>
    </div>
  );
}

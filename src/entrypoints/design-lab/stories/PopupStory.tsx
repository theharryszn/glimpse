import {
  AiStatusCard,
  type AiStatusTone,
} from "@/components/features/popup/AiStatusCard";
import { PopupFooter } from "@/components/features/popup/PopupFooter";
import { PopupHeader } from "@/components/features/popup/PopupHeader";
import { QuickStartSteps } from "@/components/features/popup/QuickStartSteps";
import { useStoredState } from "../shared/useStoredState";

const statuses: Array<{ label: string; tone: AiStatusTone }> = [
  { label: "Active", tone: "success" },
  { label: "Preparing...", tone: "warning" },
  { label: "Unavailable", tone: "error" },
  { label: "Disabled", tone: "idle" },
];

export function PopupStory() {
  const [enabled, setEnabled] = useStoredState(
    "glimpse-design-lab-popup-enabled",
    true,
  );
  const [theme, setTheme] = useStoredState<"light" | "dark">(
    "glimpse-design-lab-popup-theme",
    "light",
  );
  const [statusIndex, setStatusIndex] = useStoredState(
    "glimpse-design-lab-popup-status",
    0,
  );
  const status = statuses[statusIndex] ?? statuses[0];

  return (
    <div className="design-lab-small-component-frame">
      <div className="design-lab-state-controls">
        {statuses.map((option, index) => (
          <button
            key={option.label}
            data-active={statusIndex === index}
            onClick={() => setStatusIndex(index)}
          >
            {option.label}
          </button>
        ))}
      </div>
      <div className={`design-lab-popup-width ${theme === "dark" ? "dark" : ""}`}>
        <PopupHeader
          enabled={enabled}
          theme={theme}
          onToggleEnabled={() => setEnabled(!enabled)}
          onToggleTheme={() => setTheme(theme === "light" ? "dark" : "light")}
        />
        <div className="px-5 py-4">
          <AiStatusCard label={status.label} tone={status.tone} />
          <div className="mt-4">
            <QuickStartSteps />
          </div>
        </div>
        <PopupFooter
          showDesignLab
          onOpenDesignLab={() => undefined}
          onOpenSetupGuide={() => undefined}
        />
      </div>
    </div>
  );
}

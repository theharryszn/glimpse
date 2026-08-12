import { MagicHoldTutorial } from "@/components/features/onboarding/MagicHoldTutorial";
import { useStoredState } from "../shared/useStoredState";

export function MagicHoldTutorialStory() {
  const [complete, setComplete] = useStoredState(
    "glimpse-design-lab-magic-hold-complete",
    false,
  );

  return (
    <div className="design-lab-tutorial-frame">
      <div className="design-lab-state-controls">
        <button data-active={!complete} onClick={() => setComplete(false)}>
          practice
        </button>
        <button data-active={complete} onClick={() => setComplete(true)}>
          complete
        </button>
      </div>
      <MagicHoldTutorial key={String(complete)} initialComplete={complete} />
    </div>
  );
}

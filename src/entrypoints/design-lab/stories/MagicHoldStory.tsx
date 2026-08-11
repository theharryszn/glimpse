import { HoldProgressIndicator } from "@/components/features/capture/HoldProgressIndicator";
import { useStoredState } from "../shared/useStoredState";

export function MagicHoldStory() {
  const [visible, setVisible] = useStoredState(
    "glimpse-design-lab-magic-visible",
    true,
  );

  return (
    <div className="design-lab-page-preview design-lab-compact-preview">
      <div className="design-lab-state-controls">
        <button data-active={visible} onClick={() => setVisible(true)}>
          Holding
        </button>
        <button data-active={!visible} onClick={() => setVisible(false)}>
          Hidden
        </button>
      </div>
      <div className="design-lab-hold-copy">
        <strong>Highlight and hold.</strong>
        <span>The animation stays anchored to the production pointer position.</span>
      </div>
      <HoldProgressIndicator position={visible ? { x: 500, y: 180 } : null} />
    </div>
  );
}

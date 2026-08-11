import { FabButton } from "@/components/overlays/FabButton";
import { useStoredState } from "../shared/useStoredState";

export function FabButtonStory() {
  const [open, setOpen] = useStoredState(
    "glimpse-design-lab-fab-button-open",
    false,
  );

  return (
    <div className="design-lab-fab-button-frame">
      <div className="design-lab-frame-toolbar">
        <span>Draggable production control</span>
        <button onClick={() => setOpen(!open)}>
          {open ? "Set closed" : "Set open"}
        </button>
      </div>
      <FabButton isOpen={open} onClick={() => setOpen(!open)} />
    </div>
  );
}

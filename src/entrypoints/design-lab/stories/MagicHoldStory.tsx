import * as React from "react";
import { HoldProgressIndicator } from "@/components/features/capture/HoldProgressIndicator";
import { useStoredState } from "../shared/useStoredState";

export function MagicHoldStory() {
  const previewRef = React.useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useStoredState(
    "glimpse-design-lab-magic-visible",
    true,
  );
  const [position, setPosition] = React.useState({ x: 260, y: 218 });

  React.useLayoutEffect(() => {
    const preview = previewRef.current;
    if (!preview) return;

    const centerCue = () => {
      setPosition({
        x: preview.clientWidth / 2,
        y: Math.min(218, preview.clientHeight - 72),
      });
    };

    centerCue();
    const observer = new ResizeObserver(centerCue);
    observer.observe(preview);
    return () => observer.disconnect();
  }, []);

  const updateFromPointer = (event: React.PointerEvent<HTMLDivElement>) => {
    const preview = previewRef.current;
    if (!preview) return;
    const rect = preview.getBoundingClientRect();
    setPosition({ x: event.clientX - rect.left, y: event.clientY - rect.top });
  };

  return (
    <div
      ref={previewRef}
      className="design-lab-page-preview design-lab-compact-preview touch-none select-none"
      onPointerDown={(event) => {
        if ((event.target as HTMLElement).closest("button")) return;
        event.currentTarget.setPointerCapture(event.pointerId);
        updateFromPointer(event);
        setVisible(true);
      }}
      onPointerMove={(event) => {
        if (!event.currentTarget.hasPointerCapture(event.pointerId)) return;
        updateFromPointer(event);
      }}
      onPointerUp={(event) => {
        if (event.currentTarget.hasPointerCapture(event.pointerId)) {
          event.currentTarget.releasePointerCapture(event.pointerId);
        }
        setVisible(false);
      }}
      onPointerCancel={() => setVisible(false)}
    >
      <div className="design-lab-state-controls">
        <button data-active={visible} onClick={() => setVisible(true)}>
          Holding
        </button>
        <button data-active={!visible} onClick={() => setVisible(false)}>
          Hidden
        </button>
      </div>
      <div className="design-lab-hold-copy">
        <strong>Highlight, then hold still.</strong>
        <span>
          Press and hold anywhere here. Moving the pointer moves the production
          cue; releasing cancels it.
        </span>
      </div>
      <HoldProgressIndicator position={visible ? position : null} />
    </div>
  );
}

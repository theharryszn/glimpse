import * as React from "react";
import { CodexTooltip } from "@/components/overlays/CodexTooltip";

type Placement = "center" | "top" | "right";

export function TooltipStory() {
  const previewRef = React.useRef<HTMLDivElement>(null);
  const [placement, setPlacement] = React.useState<Placement>("center");
  const [position, setPosition] = React.useState({ x: 260, y: 195 });

  React.useLayoutEffect(() => {
    const preview = previewRef.current;
    if (!preview) return;

    const updatePosition = () => {
      const width = preview.clientWidth;
      const positions: Record<Placement, { x: number; y: number }> = {
        center: { x: width / 2, y: 195 },
        top: { x: width / 2, y: 18 },
        right: { x: width - 12, y: 195 },
      };
      setPosition(positions[placement]);
    };

    updatePosition();
    const observer = new ResizeObserver(updatePosition);
    observer.observe(preview);
    return () => observer.disconnect();
  }, [placement]);

  return (
    <div
      ref={previewRef}
      className="design-lab-page-preview design-lab-compact-preview"
    >
      <div className="design-lab-state-controls">
        <button
          data-active={placement === "center"}
          onClick={() => setPlacement("center")}
        >
          Center
        </button>
        <button
          data-active={placement === "top"}
          onClick={() => setPlacement("top")}
        >
          Top edge
        </button>
        <button
          data-active={placement === "right"}
          onClick={() => setPlacement("right")}
        >
          Right edge
        </button>
      </div>
      <div className="design-lab-tooltip-copy">
        This sentence contains a previously learned term: {" "}
        <span className="glimpse-codex-underline active">
          semantic compression
        </span>
      </div>
      <CodexTooltip
        term="Semantic compression"
        learnedAt={Date.now() - 1000 * 60 * 60 * 24 * 2}
        domainUrl="example.com/reading/meaning"
        position={position}
      />
    </div>
  );
}

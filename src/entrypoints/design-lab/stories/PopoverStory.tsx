import * as React from "react";
import { TacticalPopover } from "@/components/overlays/TacticalPopover";
import { useAiStream } from "@/hooks/use-ai-stream";
import { ReadingSample } from "../components/ReadingSample";
import { designLabContext } from "../shared/fixtures";
import { useStoredState } from "../shared/useStoredState";

export function PopoverStory() {
  const previewRef = React.useRef<HTMLDivElement>(null);
  const aiStream = useAiStream();
  const [isOpen, setIsOpen] = useStoredState(
    "glimpse-design-lab-popover-open",
    false,
  );
  const [lastResponse, setLastResponse] = useStoredState(
    "glimpse-design-lab-popover-live-response",
    "",
  );
  const [position, setPosition] = React.useState({ x: 560, y: 300 });

  React.useLayoutEffect(() => {
    const preview = previewRef.current;
    if (!preview) return;

    const placeNearSelection = () => {
      setPosition({
        x: preview.clientWidth / 2,
        y: Math.min(300, preview.clientHeight / 2),
      });
    };

    placeNearSelection();
    const observer = new ResizeObserver(placeNearSelection);
    observer.observe(preview);
    return () => observer.disconnect();
  }, []);

  React.useEffect(() => {
    if (!aiStream.isStreaming && aiStream.streamingText) {
      setLastResponse(aiStream.streamingText);
    }
  }, [aiStream.isStreaming, aiStream.streamingText, setLastResponse]);

  const runExplanation = (elaborate = false) => {
    setIsOpen(true);
    setLastResponse("");
    if (elaborate) {
      aiStream.startElaborateStream(
        designLabContext.term,
        designLabContext.metadata,
      );
    } else {
      aiStream.startStream(
        designLabContext.term,
        designLabContext.metadata.surroundingText,
      );
    }
  };

  const dismiss = () => {
    setIsOpen(false);
    aiStream.resetStream();
  };

  return (
    <div ref={previewRef} className="design-lab-page-preview">
      <div className="design-lab-state-controls">
        <button onClick={() => runExplanation()}>Run explanation</button>
        <button
          disabled={!lastResponse && !aiStream.streamingText}
          onClick={() => runExplanation(true)}
        >
          More detail
        </button>
        <button disabled={!isOpen} onClick={dismiss}>
          Dismiss
        </button>
      </div>
      <ReadingSample compact />
      <TacticalPopover
        term={designLabContext.term}
        position={isOpen ? position : null}
        isVisible={isOpen}
        streamingText={
          aiStream.isStreaming
            ? aiStream.streamingText
            : aiStream.streamingText || lastResponse
        }
        isStreaming={aiStream.isStreaming}
        error={aiStream.error}
        onExplainFurther={() => runExplanation(true)}
        onDismiss={dismiss}
      />
    </div>
  );
}

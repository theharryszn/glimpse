import * as React from "react";
import { TacticalPopover } from "@/components/overlays/TacticalPopover";
import { useAiStream } from "@/hooks/use-ai-stream";
import { ReadingSample } from "../components/ReadingSample";
import { designLabContext } from "../shared/fixtures";
import { useStoredState } from "../shared/useStoredState";

export function PopoverStory() {
  const aiStream = useAiStream();
  const [lastResponse, setLastResponse] = useStoredState(
    "glimpse-design-lab-popover-live-response",
    "",
  );
  const [manualError, setManualError] = React.useState<{
    message: string;
    code?: string;
  } | null>(null);

  React.useEffect(() => {
    if (!aiStream.isStreaming && aiStream.streamingText) {
      setLastResponse(aiStream.streamingText);
    }
  }, [aiStream.isStreaming, aiStream.streamingText, setLastResponse]);

  const runExplanation = (elaborate = false) => {
    setManualError(null);
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

  return (
    <div className="design-lab-page-preview">
      <div className="design-lab-state-controls">
        <button onClick={() => runExplanation()}>Run explanation</button>
        <button onClick={() => runExplanation(true)}>Explain further</button>
        <button
          onClick={() => {
            aiStream.resetStream();
            setManualError({
              message: "The local model stopped responding.",
              code: "STREAM_ERROR",
            });
          }}
        >
          Error state
        </button>
      </div>
      <ReadingSample compact />
      <TacticalPopover
        term={designLabContext.term}
        position={{ x: 560, y: 300 }}
        isVisible
        streamingText={
          aiStream.isStreaming
            ? aiStream.streamingText
            : aiStream.streamingText || lastResponse
        }
        isStreaming={aiStream.isStreaming}
        error={manualError || aiStream.error}
        onAskFollowUp={() => undefined}
        onExplainFurther={() => runExplanation(true)}
        onDismiss={() => undefined}
      />
    </div>
  );
}

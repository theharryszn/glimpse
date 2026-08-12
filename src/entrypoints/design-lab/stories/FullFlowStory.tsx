import * as React from "react";
import { FabPanel } from "@/components/overlays/FabPanel";
import { HoldProgressIndicator } from "@/components/features/capture/HoldProgressIndicator";
import { TacticalPopover } from "@/components/overlays/TacticalPopover";
import { useAiStream } from "@/hooks/use-ai-stream";
import { useMagicHold } from "@/hooks/use-magic-hold";
import type { BloomContext } from "@/shared/types/messaging";
import type { UserScrapbook } from "@/shared/types/models";
import { ReadingSample } from "../components/ReadingSample";
import { designLabContext, initialScrapbookItems } from "../shared/fixtures";
import { useStoredState } from "../shared/useStoredState";

interface FlowPopoverState {
  open: boolean;
  term: string;
  position: { x: number; y: number };
}

export function FullFlowStory() {
  const { isHolding, isTriggered, position, dismiss } = useMagicHold();
  const aiStream = useAiStream();
  const previewRef = React.useRef<HTMLDivElement>(null);
  const [items, setItems] = useStoredState<UserScrapbook[]>(
    "glimpse-design-lab-flow-items",
    initialScrapbookItems,
  );
  const [panelOpen, setPanelOpen] = useStoredState(
    "glimpse-design-lab-flow-panel-open",
    false,
  );
  const [bloomContext, setBloomContext] = useStoredState<BloomContext | null>(
    "glimpse-design-lab-flow-live-context",
    null,
  );
  const [popover, setPopover] = useStoredState<FlowPopoverState>(
    "glimpse-design-lab-flow-live-popover",
    {
      open: false,
      term: designLabContext.term,
      position: { x: 560, y: 360 },
    },
  );
  const [manualError, setManualError] = React.useState<{
    message: string;
    code?: string;
  } | null>(null);
  const [lastResponse, setLastResponse] = useStoredState(
    "glimpse-design-lab-flow-live-response",
    "",
  );
  const wasTriggered = React.useRef(false);

  React.useEffect(() => {
    if (!aiStream.isStreaming && aiStream.streamingText) {
      setLastResponse(aiStream.streamingText);
    }
  }, [aiStream.isStreaming, aiStream.streamingText, setLastResponse]);

  const startExplanation = React.useCallback(
    (term: string, at: { x: number; y: number }, elaborate = false) => {
      setManualError(null);
      setLastResponse("");
      setPopover({ open: true, term, position: at });
      if (elaborate) {
        aiStream.startElaborateStream(term, designLabContext.metadata);
      } else {
        aiStream.startStream(
          term,
          designLabContext.metadata.surroundingText,
        );
      }
    },
    [
      aiStream.startElaborateStream,
      aiStream.startStream,
      setLastResponse,
      setPopover,
    ],
  );

  React.useEffect(() => {
    if (isTriggered && !wasTriggered.current) {
      wasTriggered.current = true;
      const selection = window.getSelection()?.toString().trim();
      const term = selection || designLabContext.term;
      const previewRect = previewRef.current?.getBoundingClientRect();
      const nextPosition =
        position && previewRect
          ? {
              x: position.x - (previewRect.left + window.scrollX),
              y: position.y - (previewRect.top + window.scrollY),
            }
          : { x: 560, y: 360 };
      startExplanation(term, nextPosition);
    } else if (wasTriggered.current) {
      wasTriggered.current = false;
      setPopover((current) => ({ ...current, open: false }));
      aiStream.resetStream();
    }
  }, [
    aiStream.resetStream,
    isTriggered,
    position,
    setPopover,
    startExplanation,
  ]);

  const openFollowUp = () => {
    const explanation = aiStream.streamingText || lastResponse;
    setBloomContext({
      ...designLabContext,
      term: popover.term,
      explanation,
      timestamp: Date.now(),
    });
    setPanelOpen(true);
    setPopover((current) => ({ ...current, open: false }));
    dismiss();
  };

  const resetFlow = () => {
    aiStream.resetStream();
    setLastResponse("");
    setManualError(null);
    setPopover((current) => ({ ...current, open: false }));
    setBloomContext(null);
    setPanelOpen(false);
    dismiss();
  };

  const previewRect = previewRef.current?.getBoundingClientRect();
  const localHoldPosition =
    position && previewRect
      ? {
          x: position.x - (previewRect.left + window.scrollX),
          y: position.y - (previewRect.top + window.scrollY),
        }
      : position;

  return (
    <div
      ref={previewRef}
      className="design-lab-page-preview design-lab-flow-preview"
    >
      <div className="design-lab-flow-toolbar">
        <span>
          Select the highlighted phrase, then hold the mouse still for 1.5
          seconds.
        </span>
        <div>
          <button
            onClick={() => {
              setBloomContext(null);
              setPanelOpen(!panelOpen);
            }}
          >
            {panelOpen ? "Close scrapbook" : "Open scrapbook"}
          </button>
          <button
            onClick={() => {
              aiStream.resetStream();
              setPopover((current) => ({ ...current, open: true }));
              setManualError({
                message: "The local model stopped responding.",
                code: "STREAM_ERROR",
              });
            }}
          >
            Simulate error
          </button>
          <button onClick={resetFlow}>Reset flow</button>
        </div>
      </div>
      <div className="design-lab-selectable-article">
        <ReadingSample />
      </div>
      <HoldProgressIndicator position={isHolding ? localHoldPosition : null} />
      <TacticalPopover
        term={popover.term}
        position={popover.open ? popover.position : null}
        isVisible={popover.open}
        streamingText={
          aiStream.isStreaming
            ? aiStream.streamingText
            : aiStream.streamingText || lastResponse
        }
        isStreaming={aiStream.isStreaming}
        error={manualError || aiStream.error}
        onAskFollowUp={openFollowUp}
        onExplainFurther={() =>
          startExplanation(popover.term, popover.position, true)
        }
        onDismiss={() => {
          setPopover((current) => ({ ...current, open: false }));
          aiStream.resetStream();
          dismiss();
        }}
      />
      <FabPanel
        isOpen={panelOpen}
        bloomContext={bloomContext}
        onCloseChat={() => setBloomContext(null)}
        simulation={{
          scrapbookItems: items,
          onDelete: (id) =>
            setItems((current) => current.filter((item) => item.id !== id)),
          onArchive: (id) =>
            setItems((current) =>
              current.map((item) =>
                item.id === id ? { ...item, archivedAt: Date.now() } : item,
              ),
            ),
          onRestore: (id) =>
            setItems((current) =>
              current.map((item) =>
                item.id === id ? { ...item, archivedAt: undefined } : item,
              ),
            ),
          chatStoragePrefix: "glimpse-design-lab-flow-live-chat",
        }}
      />
    </div>
  );
}

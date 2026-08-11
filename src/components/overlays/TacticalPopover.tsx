import React from "react";
import { AiErrorState } from "@/components/features/ai/AiErrorState";
import { ResponseActions } from "@/components/features/ai/ResponseActions";
import { StreamingResponse } from "@/components/features/ai/StreamingResponse";
import { DraggableSurface } from "@/components/features/capture/DraggableSurface";

interface Props {
  term?: string;
  position: { x: number; y: number } | null;
  isVisible: boolean;
  streamingText?: string;
  isStreaming?: boolean;
  error?: { message: string; code?: string } | null;
  onAskFollowUp?: () => void;
  onExplainFurther?: () => void;
  onDismiss?: () => void;
}

export const TacticalPopover: React.FC<Props> = ({
  term,
  position,
  isVisible,
  streamingText,
  isStreaming,
  error,
  onAskFollowUp,
  onExplainFurther,
  onDismiss,
}) => {
  return (
    <DraggableSurface
      anchor={position}
      isVisible={isVisible}
      role="status"
      aria-live="polite"
      aria-busy={isStreaming}
      className="tactical-popover"
    >
      <div className="popover-content">
        <header
          data-drag-handle
          className="flex cursor-grab select-none items-center gap-2 active:cursor-grabbing"
        >
          <h3
            className="m-0 line-clamp-3 text-ellipsis font-heading text-sm font-semibold text-ink"
          >
            {term || (isStreaming ? "Synthesizing..." : "Explanation")}
          </h3>
        </header>
        <main className="mb-4 mt-3">
          {error ? (
            <AiErrorState message={error.message} code={error.code} />
          ) : (
            <StreamingResponse
              text={streamingText}
              isStreaming={isStreaming}
            />
          )}
        </main>
        {!error && !isStreaming && streamingText && (
          <footer className="popover-footer mt-3 flex items-center justify-between">
            <ResponseActions
              onExplainFurther={onExplainFurther}
              onAskFollowUp={onAskFollowUp}
              onDismiss={onDismiss}
            />
          </footer>
        )}
      </div>
    </DraggableSurface>
  );
};

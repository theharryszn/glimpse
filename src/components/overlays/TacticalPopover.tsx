import * as React from "react";
import {
  ChatCircleDots,
  DotsSixVertical,
  TextAlignLeft,
  X,
} from "@phosphor-icons/react";
import { AiErrorState } from "@/components/features/ai/AiErrorState";
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

const actionClassName =
  "inline-flex h-8 shrink-0 items-center justify-center gap-1.5 rounded-md border px-2.5 text-[11px] font-medium transition-[background-color,color,border-color,transform] duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--surface-overlay)] active:translate-y-px motion-reduce:transition-none";

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
  const dialogRef = React.useRef<HTMLElement>(null);
  const previousFocusRef = React.useRef<HTMLElement | null>(null);
  const titleId = React.useId();
  const selectionId = React.useId();
  const dragHelpId = React.useId();

  React.useEffect(() => {
    if (!isVisible) return;

    previousFocusRef.current = document.activeElement as HTMLElement | null;
    const frame = window.requestAnimationFrame(() => {
      dialogRef.current?.focus({ preventScroll: true });
    });

    return () => {
      window.cancelAnimationFrame(frame);
      previousFocusRef.current?.focus?.({ preventScroll: true });
      previousFocusRef.current = null;
    };
  }, [isVisible]);

  React.useEffect(() => {
    if (!isVisible || !onDismiss) return;

    const dismissOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      event.preventDefault();
      onDismiss();
    };

    document.addEventListener("keydown", dismissOnEscape);
    return () => document.removeEventListener("keydown", dismissOnEscape);
  }, [isVisible, onDismiss]);

  const hasActions =
    !error &&
    !isStreaming &&
    Boolean(streamingText) &&
    Boolean(onExplainFurther || onAskFollowUp);

  return (
    <DraggableSurface
      anchor={position}
      isVisible={isVisible}
      className="tactical-popover !z-[1000000] w-[min(360px,calc(100vw-20px),calc(100%-20px))]"
    >
      <section
        ref={dialogRef}
        role="dialog"
        tabIndex={-1}
        aria-labelledby={titleId}
        aria-describedby={term ? selectionId : undefined}
        aria-busy={isStreaming}
        className="flex max-h-[min(520px,calc(100vh-20px))] min-h-0 flex-col overflow-hidden rounded-[var(--radius-lg)] border border-hairline bg-[var(--surface-overlay)] text-ink shadow-[var(--shadow-popover)] backdrop-blur-md focus:outline-none focus-visible:ring-2 focus-visible:ring-accent motion-reduce:scroll-auto"
      >
        <header
          data-drag-handle
          className="flex shrink-0 cursor-grab touch-none select-none items-center gap-2 border-b border-hairline px-2.5 py-2 active:cursor-grabbing"
        >
          <span
            className="size-1.5 shrink-0 rounded-full bg-accent shadow-[0_0_0_3px_var(--accent-gold-soft)]"
            aria-hidden
          />
          <h2
            id={titleId}
            className="m-0 min-w-0 flex-1 font-heading text-xs font-semibold leading-5 text-ink"
          >
            Glimpse
          </h2>
          <span
            className="text-[10px] font-medium text-ink-muted"
            aria-live="polite"
          >
            {isStreaming ? "Explaining" : streamingText ? "Ready" : "Selected"}
          </span>
          <button
            type="button"
            data-drag-handle
            aria-label="Move explanation"
            aria-describedby={dragHelpId}
            title="Drag to move"
            className="inline-flex size-8 shrink-0 touch-none cursor-grab items-center justify-center rounded-md text-ink-muted transition-colors duration-150 hover:bg-surface-raised hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent active:cursor-grabbing motion-reduce:transition-none"
          >
            <DotsSixVertical size={16} weight="bold" aria-hidden />
          </button>
          <span id={dragHelpId} className="sr-only">
            Drag with the pointer, or use the arrow keys. Hold Shift to move
            faster.
          </span>
          {onDismiss && (
            <button
              type="button"
              data-no-drag
              onClick={onDismiss}
              aria-label="Close explanation"
              title="Close"
              className="inline-flex size-8 shrink-0 items-center justify-center rounded-md text-ink-muted transition-colors duration-150 hover:bg-surface-raised hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent motion-reduce:transition-none"
            >
              <X size={15} aria-hidden />
            </button>
          )}
        </header>

        {term && (
          <div className="shrink-0 px-3 pt-3">
            <div className="rounded-md border-l-2 border-l-accent bg-surface-raised px-2.5 py-2">
              <span className="mb-0.5 block text-[9px] font-semibold uppercase tracking-[0.08em] text-ink-muted">
                Selected passage
              </span>
              <p
                id={selectionId}
                className="m-0 line-clamp-2 text-pretty text-xs leading-[1.45] text-ink [overflow-wrap:anywhere]"
              >
                {term}
              </p>
            </div>
          </div>
        )}

        <div className="min-h-[72px] flex-1 overflow-y-auto overscroll-contain px-3 py-3 [scrollbar-color:var(--surface-hover)_transparent] [scrollbar-width:thin]">
          {error ? (
            <AiErrorState message={error.message} code={error.code} />
          ) : (
            <StreamingResponse
              text={streamingText}
              isStreaming={isStreaming}
            />
          )}
        </div>

        {hasActions && (
          <footer className="flex shrink-0 items-center justify-end gap-1.5 border-t border-hairline bg-[var(--surface-overlay)] px-3 py-2.5">
            {onExplainFurther && (
              <button
                type="button"
                onClick={onExplainFurther}
                className={`${actionClassName} border-transparent bg-surface-raised text-ink hover:bg-surface-hover`}
              >
                <TextAlignLeft size={14} className="shrink-0" aria-hidden />
                More detail
              </button>
            )}
            {onAskFollowUp && (
              <button
                type="button"
                onClick={onAskFollowUp}
                className={`${actionClassName} border-transparent bg-ink text-surface hover:opacity-90`}
              >
                <ChatCircleDots size={14} className="shrink-0" aria-hidden />
                Ask follow-up
              </button>
            )}
          </footer>
        )}
      </section>
    </DraggableSurface>
  );
};

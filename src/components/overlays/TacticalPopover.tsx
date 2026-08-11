import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

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
  const popoverRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState<{ left: number; top: number } | null>(
    null,
  );

  // Drag state
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef<{
    x: number;
    y: number;
    startLeft: number;
    startTop: number;
  } | null>(null);

  useLayoutEffect(() => {
    // Only set initial coords once per appearance to allow dragging later
    if (isVisible && position && popoverRef.current && !coords) {
      const popover = popoverRef.current;
      const { width } = popover.getBoundingClientRect();

      let left = position.x - width / 2;
      let top = position.y + 10;

      const padding = 10;
      if (left < padding) left = padding;

      setCoords({ left, top });
    } else if (!isVisible) {
      setCoords(null);
    }
  }, [isVisible, position]);

  useLayoutEffect(() => {
    if (!popoverRef.current || !position) return;
    const current = coords ?? { left: position.x, top: position.y };
    popoverRef.current.style.setProperty("--popover-left", `${current.left}px`);
    popoverRef.current.style.setProperty("--popover-top", `${current.top}px`);
  }, [coords, position]);

  useEffect(() => {
    if (!isDragging) return;

    const handleDragMove = (e: MouseEvent) => {
      if (!dragStartRef.current) return;
      const dx = e.pageX - dragStartRef.current.x;
      const dy = e.pageY - dragStartRef.current.y;
      setCoords({
        left: dragStartRef.current.startLeft + dx,
        top: dragStartRef.current.startTop + dy,
      });
    };

    const handleDragEnd = () => {
      setIsDragging(false);
      dragStartRef.current = null;
    };

    window.addEventListener("mousemove", handleDragMove);
    window.addEventListener("mouseup", handleDragEnd);
    return () => {
      window.removeEventListener("mousemove", handleDragMove);
      window.removeEventListener("mouseup", handleDragEnd);
    };
  }, [isDragging]);

  const handleDragStart = (e: React.MouseEvent) => {
    if (!coords) return;
    setIsDragging(true);
    dragStartRef.current = {
      x: e.pageX,
      y: e.pageY,
      startLeft: coords.left,
      startTop: coords.top,
    };
    e.stopPropagation();
  };

  if (!isVisible || !position) return null;

  return (
    <div
      ref={popoverRef}
      role="status"
      aria-live="polite"
      aria-busy={isStreaming}
      className={`tactical-popover pointer-events-auto absolute left-[var(--popover-left)] top-[var(--popover-top)] ${coords ? "opacity-100" : "opacity-0"}`}
    >
      <div className="popover-content">
        <header
          className={`flex select-none items-center gap-2 ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
          onMouseDown={handleDragStart}
        >
          <h3
            className="m-0 line-clamp-3 text-ellipsis font-heading text-sm font-semibold text-ink"
          >
            {term || (isStreaming ? "Synthesizing..." : "Explanation")}
          </h3>
        </header>
        <main className="mb-4 mt-3">
          {error ? (
            <p className="text-error m-0 text-[var(--color-error,#ff4d4f)]">
              {error.message}
            </p>
          ) : (
            <div className="streaming-container min-h-[1.5em]">
              {isStreaming && (
                <span className="sr-only">Glimpse synthesis in progress.</span>
              )}
              <p className="text-serif m-0 leading-normal text-ink">
                {streamingText || (isStreaming ? "Thinking..." : "")}
              </p>
            </div>
          )}
        </main>
        {!error && !isStreaming && streamingText && (
          <footer className="popover-footer mt-3 flex items-center justify-between">
            <div className="flex gap-2">
              <button className="btn-secondary" onClick={onExplainFurther}>
                Explain Further
              </button>
              <button className="btn-primary" onClick={onAskFollowUp}>
                Ask Follow-up
              </button>
              <button className="btn-ghost" onClick={onDismiss}>
                Got it
              </button>
            </div>
          </footer>
        )}
      </div>
    </div>
  );
};

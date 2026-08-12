import { useEffect, useId, useRef, useState } from "react";
import { TutorialSelectionArea } from "./TutorialSelectionArea";
import { TutorialSuccessState } from "./TutorialSuccessState";

interface MagicHoldTutorialProps {
  initialComplete?: boolean;
}

export function MagicHoldTutorial({
  initialComplete = false,
}: MagicHoldTutorialProps) {
  const [complete, setComplete] = useState(initialComplete);
  const [holding, setHolding] = useState(false);
  const tutorialRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const titleId = useId();
  const instructionsId = useId();

  useEffect(() => {
    const clearTimer = () => {
      if (!timerRef.current) return;
      clearTimeout(timerRef.current);
      timerRef.current = null;
    };

    const selectionIsInsideTutorial = () => {
      const selection = window.getSelection();
      const area = tutorialRef.current;
      if (!selection?.toString().trim() || !area) return false;

      return [selection.anchorNode, selection.focusNode].some(
        (node) => node && area.contains(node),
      );
    };

    const handleMouseDown = (event: MouseEvent) => {
      if (
        event.button !== 0 ||
        event.altKey ||
        event.ctrlKey ||
        event.metaKey ||
        event.shiftKey
      ) {
        return;
      }
      if (!tutorialRef.current?.contains(event.target as Node)) return;

      clearTimer();
      setHolding(true);

      const finishHold = () => {
        timerRef.current = null;
        setHolding(false);
        if (selectionIsInsideTutorial()) setComplete(true);
      };

      const startTimer = () => {
        clearTimer();
        timerRef.current = setTimeout(finishHold, 1500);
      };

      const handleMouseMove = () => {
        startTimer();
      };

      const handleMouseUp = () => {
        clearTimer();
        setHolding(false);
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };

      window.addEventListener("mousemove", handleMouseMove, { passive: true });
      window.addEventListener("mouseup", handleMouseUp, { once: true });
      startTimer();
    };

    window.addEventListener("mousedown", handleMouseDown, { capture: true });
    return () => {
      window.removeEventListener("mousedown", handleMouseDown, {
        capture: true,
      });
      clearTimer();
    };
  }, []);

  const reset = () => {
    setComplete(false);
    setHolding(false);
    window.getSelection()?.removeAllRanges();
  };

  return (
    <section aria-labelledby={titleId}>
      <div className="mb-5">
        <span className="mb-1.5 block font-mono text-[9px] font-medium uppercase tracking-[0.08em] text-accent-strong">
          Practice on real text
        </span>
        <h2 id={titleId} className="mb-2 text-lg font-semibold">
          Learn Magic Hold
        </h2>
        <p
          id={instructionsId}
          className="m-0 max-w-[600px] text-[13px] leading-relaxed text-ink-muted"
        >
          Drag across the passage to highlight it. Without releasing the mouse,
          keep the pointer still for 1.5 seconds.
        </p>
      </div>

      <TutorialSelectionArea
        ref={tutorialRef}
        state={complete ? "complete" : holding ? "holding" : "idle"}
        describedBy={instructionsId}
      />

      {!complete && (
        <p
          className="mb-0 mt-3 min-h-4 font-mono text-[10px] text-ink-muted"
          role="status"
          aria-live="polite"
        >
          {holding
            ? "Pointer detected — finish selecting, then hold still."
            : "Nothing is sent and no AI response is generated in this practice."}
        </p>
      )}

      {complete && <TutorialSuccessState onReset={reset} />}
    </section>
  );
}

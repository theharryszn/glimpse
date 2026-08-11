import { useEffect, useRef, useState } from "react";
import { TutorialSelectionArea } from "./TutorialSelectionArea";
import { TutorialSuccessState } from "./TutorialSuccessState";

interface MagicHoldTutorialProps {
  initialComplete?: boolean;
}

export function MagicHoldTutorial({
  initialComplete = false,
}: MagicHoldTutorialProps) {
  const [complete, setComplete] = useState(initialComplete);
  const tutorialRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleMouseDown = (event: MouseEvent) => {
      if (event.button !== 0) return;
      if (!tutorialRef.current?.contains(event.target as Node)) return;
      if (timerRef.current) clearTimeout(timerRef.current);

      timerRef.current = setTimeout(() => {
        const selection = window.getSelection();
        if (selection?.toString().trim()) setComplete(true);
        timerRef.current = null;
      }, 1500);
    };

    const handleMouseUp = () => {
      if (!timerRef.current) return;
      clearTimeout(timerRef.current);
      timerRef.current = null;
    };

    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <section>
      <h2 className="mb-4 text-lg font-semibold">Interactive tutorial</h2>
      <p className="mb-5 leading-relaxed text-ink-muted">
        Try the <strong>Magic Hold</strong>. Highlight the sentence below and
        hold your mouse button down for 1.5 seconds.
      </p>

      <TutorialSelectionArea ref={tutorialRef} complete={complete} />

      {complete && <TutorialSuccessState />}
    </section>
  );
}

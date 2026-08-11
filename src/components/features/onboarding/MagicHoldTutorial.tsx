import { useEffect, useRef, useState } from "react";

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
      <h2 className="mb-4 text-lg">Interactive Tutorial</h2>
      <p className="text-serif mb-5">
        Try the <strong>Magic Hold</strong>. Highlight the sentence below and
        hold your mouse button down for 1.5 seconds.
      </p>

      <div
        ref={tutorialRef}
        className={`cursor-text select-text rounded-[var(--radius-md)] border-2 border-dashed border-accent p-8 text-center transition-colors duration-500 ease-in-out ${
          complete ? "bg-accent-soft" : "bg-transparent"
        }`}
      >
        <p
          className={`m-0 text-lg italic ${
            complete ? "text-accent-strong" : "text-inherit"
          }`}
        >
          &quot;The ephemeral nature of digital fragments requires a persistent
          observer to forge lasting knowledge.&quot;
        </p>
      </div>

      {complete && (
        <div className="mt-6 animate-[fadeIn_0.5s_ease-in] text-center">
          <p className="text-lg font-bold text-[green]">
            ✨ Onboarding Complete!
          </p>
          <p className="text-caption">
            You&apos;re ready to start using Glimpse. Happy learning.
          </p>
        </div>
      )}
    </section>
  );
}

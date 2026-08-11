const steps = [
  "Highlight any text on a webpage.",
  "Hold your mouse button for 1.5s.",
  "Get an instant, private explanation.",
];

export function QuickStartSteps() {
  return (
    <div>
      <p className="mb-2.5 mt-0 font-mono text-[10px] font-medium uppercase tracking-[0.06em] text-ink-muted">
        How to use
      </p>
      <ol className="m-0 flex list-none flex-col gap-2 p-0">
        {steps.map((step, index) => (
          <li
            key={step}
            className="flex items-start gap-2 text-xs leading-[1.4]"
          >
            <span className="w-4 shrink-0 font-mono text-[10px] leading-[1.7] text-ink-muted">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="text-ink-muted">{step}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

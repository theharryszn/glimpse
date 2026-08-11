const steps = [
  "Highlight any text on a webpage.",
  "Hold your mouse button for 1.5s.",
  "Get an instant, private explanation.",
];

export function QuickStartSteps() {
  return (
    <div>
      <p className="mb-2 mt-0 text-[11px] font-semibold uppercase tracking-[0.5px] text-ink-muted">
        How to use
      </p>
      <ol className="m-0 flex list-none flex-col gap-1.5 p-0">
        {steps.map((step, index) => (
          <li
            key={step}
            className="flex items-start gap-2 text-xs leading-[1.4]"
          >
            <span className="shrink-0">{index + 1}.</span>
            <span className="text-ink-muted">{step}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

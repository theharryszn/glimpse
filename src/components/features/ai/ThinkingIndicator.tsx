export function ThinkingIndicator() {
  return (
    <span
      className="inline-flex items-center gap-1 font-mono text-sm leading-[1.6] text-ink-muted"
      role="status"
    >
      Thinking
      <span className="flex gap-0.5" aria-hidden>
        {[0, 1, 2].map((index) => (
          <span
            key={index}
            className={`h-1 w-1 rounded-full bg-current animate-[thinkingDot_1.2s_ease-in-out_infinite] ${
              index === 1
                ? "[animation-delay:0.15s]"
                : index === 2
                  ? "[animation-delay:0.3s]"
                  : ""
            }`}
          />
        ))}
      </span>
    </span>
  );
}

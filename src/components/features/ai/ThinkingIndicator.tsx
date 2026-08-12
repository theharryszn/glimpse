interface ThinkingIndicatorProps {
  label?: string;
}

export function ThinkingIndicator({
  label = "Preparing answer",
}: ThinkingIndicatorProps) {
  return (
    <span
      className="inline-flex min-w-0 items-center gap-1.5 text-[11px] leading-4 text-ink-muted"
      role="status"
      aria-label={`${label}. On-device.`}
    >
      <span className="flex shrink-0 gap-0.5" aria-hidden>
        {[0, 1, 2].map((index) => (
          <span
            key={index}
            className={`h-1 w-1 rounded-full bg-current animate-[thinkingDot_1.2s_ease-in-out_infinite] motion-reduce:animate-none ${
              index === 1
                ? "[animation-delay:0.15s]"
                : index === 2
                  ? "[animation-delay:0.3s]"
                  : ""
            }`}
          />
        ))}
      </span>
      <span className="min-w-0 truncate">{label}</span>
      <span className="text-ink-muted/60" aria-hidden>
        ·
      </span>
      <span className="shrink-0 font-mono text-[10px] text-ink-muted/75">
        On-device
      </span>
    </span>
  );
}

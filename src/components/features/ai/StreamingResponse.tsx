import { ThinkingIndicator } from "./ThinkingIndicator";

interface StreamingResponseProps {
  text?: string;
  isStreaming?: boolean;
}

export function StreamingResponse({
  text = "",
  isStreaming = false,
}: StreamingResponseProps) {
  const hasText = text.length > 0;

  return (
    <div
      className="min-h-[1.5em] min-w-0 break-words [overflow-wrap:anywhere]"
      aria-live="polite"
      aria-busy={isStreaming}
      aria-atomic="false"
    >
      {hasText && (
        <p className="m-0 whitespace-pre-wrap text-[13px] leading-[1.62] text-ink [overflow-wrap:anywhere]">
          {text}
        </p>
      )}
      {isStreaming && (
        <div className={hasText ? "mt-2" : undefined}>
          <ThinkingIndicator
            label={hasText ? "Writing answer" : "Preparing answer"}
          />
        </div>
      )}
    </div>
  );
}

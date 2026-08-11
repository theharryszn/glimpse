import { ThinkingIndicator } from "./ThinkingIndicator";

interface StreamingResponseProps {
  text?: string;
  isStreaming?: boolean;
}

export function StreamingResponse({
  text = "",
  isStreaming = false,
}: StreamingResponseProps) {
  return (
    <div
      className="min-w-0 min-h-[1.5em] break-words [overflow-wrap:anywhere]"
      aria-live="polite"
      aria-busy={isStreaming}
    >
      {isStreaming && <span className="sr-only">Glimpse is responding.</span>}
      {text ? (
        <p className="m-0 text-sm leading-[1.6] text-ink">{text}</p>
      ) : isStreaming ? (
        <ThinkingIndicator />
      ) : null}
    </div>
  );
}

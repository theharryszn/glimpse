import * as React from "react";
import { AiErrorState } from "@/components/features/ai/AiErrorState";
import { ChatEmptyState } from "@/components/features/ai/ChatEmptyState";
import { FollowUpSuggestions } from "@/components/features/ai/FollowUpSuggestions";
import { ResponseActions } from "@/components/features/ai/ResponseActions";
import { SourceContext } from "@/components/features/ai/SourceContext";
import { StreamingResponse } from "@/components/features/ai/StreamingResponse";
import { Button } from "@/components/ui/Button";
import { useAiStream } from "@/hooks/use-ai-stream";
import { designLabContext } from "../shared/fixtures";
import { useStoredState } from "../shared/useStoredState";

const initialPrompt = `Explain “${designLabContext.term}” using this passage: “${designLabContext.metadata.surroundingText}”`;

const followUps = [
  `Give a concrete example of ${designLabContext.term.toLowerCase()}`,
  `What distinction is this passage making?`,
];

export function ChatActionsStory() {
  const aiStream = useAiStream();
  const [savedResponse, setSavedResponse] = useStoredState(
    "glimpse-design-lab-chat-actions-response",
    "",
  );
  const [showFollowUps, setShowFollowUps] = React.useState(false);

  React.useEffect(() => {
    if (!aiStream.isStreaming && aiStream.streamingText) {
      setSavedResponse(aiStream.streamingText);
    }
  }, [aiStream.isStreaming, aiStream.streamingText, setSavedResponse]);

  const visibleResponse = aiStream.isStreaming
    ? aiStream.streamingText
    : aiStream.streamingText || savedResponse;

  const continueFromResponse = (prompt: string) => {
    const history = visibleResponse
      ? [
          { role: "user" as const, content: initialPrompt },
          { role: "assistant" as const, content: visibleResponse },
          { role: "user" as const, content: prompt },
        ]
      : [{ role: "user" as const, content: prompt }];

    setShowFollowUps(false);
    aiStream.continueStream(prompt, history, designLabContext.metadata);
  };

  const runInitialResponse = () => {
    aiStream.continueStream(
      initialPrompt,
      [{ role: "user", content: initialPrompt }],
      designLabContext.metadata,
    );
  };

  const clearResponse = () => {
    aiStream.resetStream();
    setSavedResponse("");
    setShowFollowUps(false);
  };

  return (
    <div className="grid min-h-[380px] w-full gap-5 p-5 lg:grid-cols-[minmax(0,1fr)_280px]">
      <section className="flex min-w-0 flex-col overflow-hidden rounded-[var(--radius-lg)] border border-hairline bg-surface">
        <header className="border-b border-hairline px-4 py-3">
          <span className="font-mono text-[10px] leading-4 text-ink-muted">
            Live local response
          </span>
          <div className="mt-2">
            <SourceContext
              title={designLabContext.metadata.title}
              url={designLabContext.metadata.url}
              excerpt={designLabContext.metadata.surroundingText}
            />
          </div>
        </header>

        <div className="flex min-h-[220px] min-w-0 flex-1 flex-col p-4">
          {aiStream.error ? (
            <AiErrorState
              message={aiStream.error.message}
              code={aiStream.error.code}
            />
          ) : visibleResponse || aiStream.isStreaming ? (
            <StreamingResponse
              text={visibleResponse}
              isStreaming={aiStream.isStreaming}
            />
          ) : (
            <ChatEmptyState />
          )}
        </div>

        <footer className="flex min-h-14 flex-wrap items-center justify-between gap-2 border-t border-hairline px-3 py-2">
          {visibleResponse && !aiStream.isStreaming && !aiStream.error ? (
            <ResponseActions
              onExplainFurther={() =>
                continueFromResponse(
                  `Explain ${designLabContext.term.toLowerCase()} in more detail`,
                )
              }
              onAskFollowUp={() => setShowFollowUps((visible) => !visible)}
              onDismiss={clearResponse}
            />
          ) : (
            <span className="text-[11px] leading-4 text-ink-muted">
              No canned answer is used in this preview.
            </span>
          )}
          {!visibleResponse && !aiStream.isStreaming && (
            <Button size="sm" onClick={runInitialResponse}>
              Run local response
            </Button>
          )}
        </footer>
      </section>

      <aside className="min-w-0 rounded-[var(--radius-lg)] bg-surface-raised p-3">
        {showFollowUps && visibleResponse ? (
          <FollowUpSuggestions
            suggestions={followUps}
            onSelect={continueFromResponse}
          />
        ) : (
          <div className="flex h-full min-h-28 items-center px-2">
            <p className="m-0 text-xs leading-[1.55] text-ink-muted">
              Choose <span className="text-ink">Ask follow-up</span> after a
              live response to reveal contextual questions. Selecting one
              continues the same local conversation.
            </p>
          </div>
        )}
      </aside>
    </div>
  );
}

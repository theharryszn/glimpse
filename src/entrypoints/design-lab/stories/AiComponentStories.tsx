import { useState } from "react";
import { AiErrorState } from "@/components/features/ai/AiErrorState";
import { ChatComposer } from "@/components/features/ai/ChatComposer";
import { ChatMessage } from "@/components/features/ai/ChatMessage";
import { FollowUpSuggestions } from "@/components/features/ai/FollowUpSuggestions";
import { ResponseActions } from "@/components/features/ai/ResponseActions";
import { StreamingResponse } from "@/components/features/ai/StreamingResponse";
import { ThinkingIndicator } from "@/components/features/ai/ThinkingIndicator";

export function ChatMessageStory() {
  return (
    <div className="design-lab-message-stack">
      <ChatMessage role="user">Explain semantic compression.</ChatMessage>
      <ChatMessage role="assistant">
        I’ll use the selected passage as context.
      </ChatMessage>
    </div>
  );
}

export function ChatComposerStory() {
  const [value, setValue] = useState("");
  return (
    <div className="design-lab-composer-frame">
      <ChatComposer
        value={value}
        onChange={setValue}
        onSubmit={() => setValue("")}
      />
    </div>
  );
}

export function StreamingResponseStory() {
  return (
    <div className="design-lab-ai-inline-frame">
      <StreamingResponse isStreaming />
    </div>
  );
}

export function ThinkingIndicatorStory() {
  return (
    <div className="design-lab-ai-inline-frame">
      <ThinkingIndicator />
    </div>
  );
}

export function AiErrorStateStory() {
  return (
    <div className="design-lab-ai-inline-frame">
      <AiErrorState
        message="Gemini Nano is not available on this device."
        code="MODEL_UNAVAILABLE"
      />
    </div>
  );
}

export function ResponseActionsStory() {
  return (
    <div className="design-lab-ai-inline-frame">
      <ResponseActions />
    </div>
  );
}

export function FollowUpSuggestionsStory() {
  return (
    <div className="design-lab-ai-inline-frame">
      <FollowUpSuggestions
        suggestions={[
          "How does this differ from summarization?",
          "Give me an example from this passage",
        ]}
        onSelect={() => undefined}
      />
    </div>
  );
}

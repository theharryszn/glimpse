import React, { useState, useEffect, useRef } from "react";
import { ArrowLeft } from "@phosphor-icons/react";
import { AiErrorState } from "@/components/features/ai/AiErrorState";
import { ChatComposer } from "@/components/features/ai/ChatComposer";
import { ChatEmptyState } from "@/components/features/ai/ChatEmptyState";
import { ChatMessage } from "@/components/features/ai/ChatMessage";
import { StreamingResponse } from "@/components/features/ai/StreamingResponse";
import { Button } from "@/components/ui/Button";
import { BloomContext } from "../../../shared/types/messaging";
import { useAiStream } from "../../../hooks/use-ai-stream";
import { extractPageMetadata } from "../../../shared/utils/metadata-utils";
import "./AiChat.css";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const legacyGreeting = "Hello! I am Glimpse. How can I help you today?";

interface Props {
  initialContext?: BloomContext;
  onClose: () => void;
  persistenceStorageKey?: string;
  autoFocus?: boolean;
}

export const AiChat: React.FC<Props> = ({
  initialContext,
  onClose,
  persistenceStorageKey,
  autoFocus = false,
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const aiStream = useAiStream();
  const scrollRef = useRef<HTMLDivElement>(null);
  const { streamingText, isStreaming, error } = aiStream;

  useEffect(() => {
    if (persistenceStorageKey) {
      try {
        const storedMessages = localStorage.getItem(persistenceStorageKey);
        if (storedMessages) {
          const parsedMessages = JSON.parse(storedMessages) as Message[];
          const isLegacyGreeting =
            parsedMessages.length === 1 &&
            parsedMessages[0]?.role === "assistant" &&
            parsedMessages[0]?.content === legacyGreeting;
          setMessages(isLegacyGreeting ? [] : parsedMessages);
          return;
        }
      } catch {
        // Fall through to the same initial state used in production.
      }
    }

    if (initialContext) {
      setMessages([
        { role: "user", content: `Explain the term: ${initialContext.term}` },
        { role: "assistant", content: initialContext.explanation },
      ]);
    } else setMessages([]);
  }, [initialContext, persistenceStorageKey]);

  useEffect(() => {
    if (persistenceStorageKey && messages.length > 0) {
      localStorage.setItem(persistenceStorageKey, JSON.stringify(messages));
    }
  }, [messages, persistenceStorageKey]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, streamingText]);

  const handleSend = async () => {
    if (!inputValue.trim() || isStreaming) return;

    const userMessage: Message = { role: "user", content: inputValue };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInputValue("");

    let metadata = initialContext?.metadata;
    if (!metadata) {
      const pageMeta = extractPageMetadata();
      // Grab a chunk of the visible page text for context, same approach as the popup flow
      const fullText =
        document.body?.innerText || document.body?.textContent || "";
      const surroundingText =
        fullText.length > 2000 ? `${fullText.substring(0, 2000)}…` : fullText;
      metadata = { ...pageMeta, surroundingText };
    }

    aiStream.continueStream(inputValue, newMessages, metadata);
  };

  useEffect(() => {
    if (!isStreaming && streamingText && messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.role === "user") {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: streamingText },
        ]);
      }
    }
  }, [isStreaming, streamingText, messages]);

  return (
    <div className="ai-chat-container">
      <header className="chat-header">
        <Button
          variant="iconGhost"
          onClick={onClose}
          aria-label="Back to Scrapbook"
        >
          <ArrowLeft size={16} aria-hidden />
        </Button>
        <div className="header-info ml-[var(--spacing-2)] min-w-0 flex-1">
          <span
            className="text-caption block truncate text-[12px] font-medium text-ink-muted"
            title={initialContext?.title ?? "New chat"}
          >
            {initialContext?.title ?? "New chat"}
          </span>
        </div>
      </header>

      <div className="chat-messages" ref={scrollRef}>
        {messages.length === 0 && !isStreaming && !error ? (
          <ChatEmptyState />
        ) : null}
        {messages.map((msg, i) => (
          <ChatMessage key={i} role={msg.role}>
            {msg.content}
          </ChatMessage>
        ))}
        {isStreaming && (
          <ChatMessage role="assistant">
            <StreamingResponse text={streamingText} isStreaming />
          </ChatMessage>
        )}
        {error && (
          <AiErrorState message={error.message} code={error.code} />
        )}
      </div>

      <ChatComposer
        value={inputValue}
        onChange={setInputValue}
        onSubmit={handleSend}
        disabled={isStreaming}
        autoFocus={autoFocus}
      />
    </div>
  );
};

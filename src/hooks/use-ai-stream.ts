import { useState, useCallback, useRef, useEffect } from "react";
import {
  AppMessage,
  type ChatTitleResult,
  PageMetadata,
} from "../shared/types/messaging";
import { extractPageMetadata } from "../shared/utils/metadata-utils";
import { getFallbackChatTitle } from "../shared/utils/chat-title-utils";
import { useScrapbook } from "./use-scrapbook";

export function useAiStream() {
  const [streamingText, setStreamingText] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<{ message: string; code?: string } | null>(
    null,
  );
  const portRef = useRef<ReturnType<typeof browser.runtime.connect> | null>(
    null,
  );
  const { saveInteraction, updateInteractionTitle } = useScrapbook();

  const generateAndSaveTitle = useCallback(
    async (
      contextText: string,
      explanation: string,
      metadata: PageMetadata,
    ) => {
      let title = getFallbackChatTitle(explanation, contextText);

      try {
        const result = (await browser.runtime.sendMessage({
          type: "GENERATE_CHAT_TITLE",
          payload: { contextText, explanation, metadata },
        } satisfies AppMessage)) as ChatTitleResult;

        if (result.success) title = result.title;
      } catch (titleError) {
        console.warn("Using fallback conversation title:", titleError);
      }

      return updateInteractionTitle(contextText, title);
    },
    [updateInteractionTitle],
  );

  const cleanup = useCallback(() => {
    const activePort = portRef.current;
    if (activePort) {
      portRef.current = null;
      activePort.disconnect();
    }
    setIsStreaming(false);
  }, []);

  useEffect(() => {
    return () => cleanup();
  }, [cleanup]);

  const startStream = useCallback(
    (contextText: string, surroundingText?: string) => {
      if (isStreaming) return;

      setStreamingText("");
      setIsStreaming(true);
      setError(null);

      const port = browser.runtime.connect({ name: "ai-bridge" });
      portRef.current = port;
      const metadata = extractPageMetadata();

      if (surroundingText) {
        metadata.surroundingText = surroundingText;
      }

      const message: AppMessage = {
        type: "START_AI_STREAM",
        payload: { contextText, metadata },
      };

      port.postMessage(message);

      const listener = (msg: AppMessage) => {
        if (portRef.current !== port) return;
        if (msg.type === "AI_STREAM_CHUNK") {
          setStreamingText((prev) =>
            msg.payload.token.length > prev.length ? msg.payload.token : prev,
          );
        } else if (msg.type === "AI_STREAM_COMPLETE") {
          const url = metadata?.url || "";
          if (!contextText || !msg.payload.fullText || !url) {
            console.warn(
              "Skipping auto-save: missing required interaction data",
            );
            cleanup();
            return;
          }

          const fallbackTitle = getFallbackChatTitle(
            msg.payload.fullText,
            contextText,
          );
          void saveInteraction({
            term: contextText,
            title: fallbackTitle,
            explanation: msg.payload.fullText,
            domainUrl: metadata.url,
          }).then((saved) => {
            cleanup();
            if (!saved.success) {
              console.error("Failed to auto-save interaction:", saved.error);
              return;
            }

            generateAndSaveTitle(
              contextText,
              msg.payload.fullText,
              metadata,
            ).then((titled) => {
              if (!titled.success) {
                console.error("Failed to title interaction:", titled.error);
              }
            });
          });
        } else if (msg.type === "AI_STREAM_ERROR") {
          setError({ message: msg.payload.error, code: msg.payload.code });
          cleanup();
        }
      };

      port.onMessage.addListener(listener);
      port.onDisconnect.addListener(() => {
        if (portRef.current === port) {
          setIsStreaming(false);
          portRef.current = null;
        }
      });
    },
    [isStreaming, cleanup, generateAndSaveTitle, saveInteraction],
  );

  const continueStream = useCallback(
    (
      prompt: string,
      history: { role: "user" | "assistant"; content: string }[],
      metadata?: PageMetadata,
    ) => {
      if (isStreaming) return;
      prompt += `\nDo not use any markdown formatting, asterisks, or bullet points. Just provide a brief, plain-text summary`;
      setStreamingText("");
      setIsStreaming(true);
      setError(null);

      const port = browser.runtime.connect({ name: "ai-bridge" });
      portRef.current = port;

      // Fallback to local extraction if not provided (works in Content Script)
      const finalMetadata = metadata || extractPageMetadata();

      const message: AppMessage = {
        type: "CONTINUE_AI_STREAM",
        payload: { prompt, history, metadata: finalMetadata },
      };

      port.postMessage(message);

      const listener = (msg: AppMessage) => {
        if (portRef.current !== port) return;
        if (msg.type === "AI_STREAM_CHUNK") {
          setStreamingText((prev) =>
            msg.payload.token.length > prev.length ? msg.payload.token : prev,
          );
        } else if (msg.type === "AI_STREAM_COMPLETE") {
          cleanup();
        } else if (msg.type === "AI_STREAM_ERROR") {
          setError({ message: msg.payload.error, code: msg.payload.code });
          cleanup();
        }
      };

      port.onMessage.addListener(listener);
      port.onDisconnect.addListener(() => {
        if (portRef.current === port) {
          setIsStreaming(false);
          portRef.current = null;
        }
      });
    },
    [isStreaming, cleanup],
  );

  const startElaborateStream = useCallback(
    (contextText: string, metadata?: PageMetadata) => {
      if (isStreaming) return;

      setStreamingText("");
      setIsStreaming(true);
      setError(null);

      const port = browser.runtime.connect({ name: "ai-bridge" });
      portRef.current = port;
      const finalMetadata = metadata || extractPageMetadata();

      const message: AppMessage = {
        type: "ELABORATE_AI_STREAM",
        payload: { contextText, metadata: finalMetadata },
      };

      port.postMessage(message);

      const listener = (msg: AppMessage) => {
        if (portRef.current !== port) return;
        if (msg.type === "AI_STREAM_CHUNK") {
          setStreamingText((prev) =>
            msg.payload.token.length > prev.length ? msg.payload.token : prev,
          );
        } else if (msg.type === "AI_STREAM_COMPLETE") {
          const url = finalMetadata?.url || "";
          if (contextText && msg.payload.fullText && url) {
            saveInteraction({
              term: contextText,
              explanation: msg.payload.fullText,
              domainUrl: url,
            }).then((result) => {
              if (!result.success) {
                console.error("Failed to update interaction:", result.error);
              }
            });
          }
          cleanup();
        } else if (msg.type === "AI_STREAM_ERROR") {
          setError({ message: msg.payload.error, code: msg.payload.code });
          cleanup();
        }
      };

      port.onMessage.addListener(listener);
      port.onDisconnect.addListener(() => {
        if (portRef.current === port) {
          setIsStreaming(false);
          portRef.current = null;
        }
      });
    },
    [isStreaming, cleanup],
  );

  const resetStream = useCallback(() => {
    cleanup();
    setStreamingText("");
    setError(null);
  }, [cleanup]);

  const setCachedStream = useCallback((text: string) => {
    cleanup();
    setStreamingText(text);
    setError(null);
  }, [cleanup]);

  return {
    streamingText,
    isStreaming,
    error,
    startStream,
    startElaborateStream,
    continueStream,
    resetStream,
    setCachedStream,
  };
}

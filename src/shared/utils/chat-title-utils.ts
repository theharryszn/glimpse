import type { PageMetadata } from "../types/messaging";
import type { UserScrapbook } from "../types/models";

const DEFAULT_CHAT_TITLE = "New conversation";
const MAX_TITLE_WORDS = 7;
const MAX_TITLE_LENGTH = 60;

function cleanTitle(value: string): string {
  return value
    .replace(/^\s*(?:title\s*:\s*)?/i, "")
    .replace(/^["'`*_\s]+|["'`*_\s]+$/g, "")
    .replace(/[.!?]+$/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function limitTitle(value: string): string {
  const words = cleanTitle(value).split(" ").filter(Boolean);
  const limited = words.slice(0, MAX_TITLE_WORDS).join(" ");
  return limited.slice(0, MAX_TITLE_LENGTH).trim();
}

export function getFallbackChatTitle(
  explanation?: string,
  contextText?: string,
): string {
  if (!explanation?.trim()) return DEFAULT_CHAT_TITLE;

  let firstSentence = explanation.split(/[.!?](?:\s|$)/, 1)[0] ?? "";
  if (contextText?.trim()) {
    const escapedContext = contextText.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    firstSentence = firstSentence.replace(
      new RegExp(`^${escapedContext}\\s+(?:is|means|refers to)\\s+`, "i"),
      "",
    );
  }
  const title = limitTitle(firstSentence);
  return title
    ? `${title.charAt(0).toLocaleUpperCase()}${title.slice(1)}`
    : DEFAULT_CHAT_TITLE;
}

export function getScrapbookTitle(item: UserScrapbook): string {
  return (
    cleanTitle(item.title ?? "") ||
    getFallbackChatTitle(item.explanation, item.term)
  );
}

export function normalizeGeneratedChatTitle(
  generatedTitle: string,
  explanation: string,
  contextText: string,
): string {
  const title = limitTitle(generatedTitle.split("\n", 1)[0] ?? "");
  const highlightedText = cleanTitle(contextText).toLocaleLowerCase();

  if (!title || title.toLocaleLowerCase().includes(highlightedText)) {
    return getFallbackChatTitle(explanation, contextText);
  }

  return title;
}

export function formatChatTitlePrompt(
  contextText: string,
  explanation: string,
  metadata: PageMetadata,
): string {
  return `Create a concise title for this conversation.

The title must summarize what the person learned, not repeat the highlighted text verbatim. Use 3 to 7 words, sentence case, and plain text only. Do not use quotation marks, labels, markdown, or ending punctuation.

Highlighted text: ${contextText}
Explanation: ${explanation}
Source page: ${metadata.title}`;
}

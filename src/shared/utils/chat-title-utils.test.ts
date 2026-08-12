import { describe, expect, it } from "vitest";
import {
  formatChatTitlePrompt,
  getFallbackChatTitle,
  getScrapbookTitle,
  normalizeGeneratedChatTitle,
} from "./chat-title-utils";

describe("chat title utilities", () => {
  it("normalizes generated titles to a short plain-text title", () => {
    expect(
      normalizeGeneratedChatTitle(
        'Title: "How meaning survives compression."',
        "Meaning can be preserved in a smaller representation.",
        "Semantic compression",
      ),
    ).toBe("How meaning survives compression");
  });

  it("does not use the highlighted text as the conversation title", () => {
    expect(
      normalizeGeneratedChatTitle(
        "Semantic compression",
        "Meaning survives even when information is represented more compactly.",
        "Semantic compression",
      ),
    ).toBe("Meaning survives even when information is represented");
  });

  it("removes a highlighted-term definition prefix from fallback titles", () => {
    expect(
      getFallbackChatTitle(
        "Latent space is a compact map where related ideas sit nearby.",
        "Latent space",
      ),
    ).toBe("A compact map where related ideas sit");
  });

  it("derives legacy titles from the explanation", () => {
    expect(
      getScrapbookTitle({
        term: "Latent space",
        explanation: "Related ideas occupy nearby positions in a compressed space.",
        domainUrl: "https://example.com",
        learnedAt: 0,
      }),
    ).toBe("Related ideas occupy nearby positions in a");
  });

  it("creates a constrained title prompt", () => {
    const prompt = formatChatTitlePrompt(
      "Latent space",
      "A compact representation of related features.",
      { url: "https://example.com", title: "Representation learning" },
    );

    expect(prompt).toContain("3 to 7 words");
    expect(prompt).toContain("not repeat the highlighted text verbatim");
  });

  it("uses a stable fallback for empty explanations", () => {
    expect(getFallbackChatTitle("")).toBe("New conversation");
  });
});

import { describe, expect, it } from "vitest";
import { formatRelativeDate } from "./date-utils";

describe("formatRelativeDate", () => {
  const now = new Date(2026, 7, 20, 18, 0).getTime();

  it("uses relative time for recent entries", () => {
    expect(formatRelativeDate(now - 60 * 60 * 1000, now, "en")).toBe(
      "1 hour ago",
    );
  });

  it("uses Today for older entries from the same day", () => {
    expect(formatRelativeDate(new Date(2026, 7, 20, 8).getTime(), now, "en")).toBe(
      "Today",
    );
  });

  it("uses Yesterday for the previous calendar day", () => {
    expect(formatRelativeDate(new Date(2026, 7, 19, 15).getTime(), now, "en")).toBe(
      "Yesterday",
    );
  });

  it("uses a compact calendar date for older entries", () => {
    expect(formatRelativeDate(new Date(2026, 7, 18, 15).getTime(), now, "en")).toBe(
      "Aug 18",
    );
  });
});

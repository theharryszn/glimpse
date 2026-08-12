import type { UserScrapbook } from "../types/models";

export const SCRAPBOOK_STORAGE_KEY = "glimpse_scrapbook_items";

export async function readScrapbookItems() {
  const stored = await browser.storage.local.get(SCRAPBOOK_STORAGE_KEY);
  const items = stored[SCRAPBOOK_STORAGE_KEY];
  return Array.isArray(items) ? (items as UserScrapbook[]) : [];
}

export async function writeScrapbookItems(items: UserScrapbook[]) {
  await browser.storage.local.set({ [SCRAPBOOK_STORAGE_KEY]: items });
}

export function nextScrapbookId(items: UserScrapbook[]) {
  return items.reduce((highest, item) => Math.max(highest, item.id ?? 0), 0) + 1;
}

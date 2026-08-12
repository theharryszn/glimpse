import { useEffect, useId, useMemo, useState } from "react";
import { MagnifyingGlass, WarningCircle, X } from "@phosphor-icons/react";
import { useScrapbook } from "../../../hooks/use-scrapbook";
import { ScrapbookRow } from "./ScrapbookRow";
import { ScrapbookEmptyState } from "./ScrapbookEmptyState";
import { UserScrapbook } from "../../../shared/types/models";
import { BloomContext } from "../../../shared/types/messaging";
import { getScrapbookTitle } from "../../../shared/utils/chat-title-utils";
import {
  readScrapbookItems,
  SCRAPBOOK_STORAGE_KEY,
  writeScrapbookItems,
} from "../../../shared/utils/scrapbook-storage";
import "./ScrapbookList.css";

type ScrapbookFilter = "all" | "active" | "archived";

const filterLabels: Record<ScrapbookFilter, string> = {
  all: "All",
  active: "Active",
  archived: "Archived",
};

interface Props {
  onOpenChat?: (context: BloomContext) => void;
  resultsRegionLabel?: string;
  simulatedItems?: UserScrapbook[];
  onSimulatedDelete?: (id: number) => void;
  onSimulatedArchive?: (id: number) => void;
  onSimulatedRestore?: (id: number) => void;
}

export function ScrapbookList({
  onOpenChat,
  resultsRegionLabel = "Scrapbook results",
  simulatedItems,
  onSimulatedDelete,
  onSimulatedArchive,
  onSimulatedRestore,
}: Props = {}) {
  const { archiveInteraction, deleteInteraction } = useScrapbook();
  const [query, setQuery] = useState("");
  // Keep the existing production default: archived conversations stay out of
  // the primary view until a person explicitly asks to see them.
  const [filter, setFilter] = useState<ScrapbookFilter>("active");
  const [pendingItemId, setPendingItemId] = useState<number | null>(null);
  const [operationError, setOperationError] = useState<string | null>(null);
  const searchId = useId();
  const resultsId = useId();
  const resultsStatusId = useId();

  const [storedItems, setStoredItems] = useState<UserScrapbook[] | undefined>();

  useEffect(() => {
    if (simulatedItems) return;

    let cancelled = false;
    const load = async () => {
      const nextItems = await readScrapbookItems();
      if (!cancelled) {
        setStoredItems(nextItems.sort((a, b) => b.learnedAt - a.learnedAt));
      }
    };
    void load();

    const handleStorageChange = (
      changes: Record<string, Browser.storage.StorageChange>,
      areaName: string,
    ) => {
      if (areaName === "local" && changes[SCRAPBOOK_STORAGE_KEY]) void load();
    };
    browser.storage.onChanged.addListener(handleStorageChange);
    return () => {
      cancelled = true;
      browser.storage.onChanged.removeListener(handleStorageChange);
    };
  }, [simulatedItems]);
  const items = simulatedItems ?? storedItems;

  const counts = useMemo(() => {
    const all = items?.length ?? 0;
    const archived = items?.filter((item) => Boolean(item.archivedAt)).length ?? 0;
    return { all, active: all - archived, archived };
  }, [items]);

  const visibleItems = useMemo(() => {
    if (!items) return undefined;
    const normalizedQuery = query.trim().toLocaleLowerCase();

    return items.filter((item) => {
      const matchesFilter =
        filter === "all" ||
        (filter === "archived" ? Boolean(item.archivedAt) : !item.archivedAt);
      if (!matchesFilter) return false;
      if (!normalizedQuery) return true;

      const searchableText = [
        getScrapbookTitle(item),
        item.term,
        item.explanation,
        item.domainUrl,
      ]
        .join(" ")
        .toLocaleLowerCase();
      return searchableText.includes(normalizedQuery);
    });
  }, [filter, items, query]);

  const handleOpen = (item: UserScrapbook) => {
    if (onOpenChat) {
      onOpenChat({
        term: item.term,
        title: getScrapbookTitle(item),
        explanation: item.explanation,
        metadata: { url: item.domainUrl, title: "", h1s: [] },
        timestamp: item.learnedAt,
      });
    }
  };

  const handleArchive = async (id: number) => {
    setOperationError(null);
    if (simulatedItems) {
      onSimulatedArchive?.(id);
      return;
    }

    setPendingItemId(id);
    const result = await archiveInteraction(id);
    setPendingItemId(null);
    if (!result.success) {
      setOperationError(`Couldn’t archive this conversation. ${result.error}`);
    }
  };

  const handleRestore = async (id: number) => {
    setOperationError(null);
    if (simulatedItems) {
      onSimulatedRestore?.(id);
      return;
    }

    setPendingItemId(id);
    try {
      const currentItems = await readScrapbookItems();
      await writeScrapbookItems(
        currentItems.map((item) =>
          item.id === id ? { ...item, archivedAt: undefined } : item,
        ),
      );
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown database error";
      setOperationError(`Couldn’t restore this conversation. ${message}`);
    } finally {
      setPendingItemId(null);
    }
  };

  const handleDelete = async (id: number) => {
    setOperationError(null);
    if (simulatedItems) {
      onSimulatedDelete?.(id);
      return;
    }

    setPendingItemId(id);
    const result = await deleteInteraction(id);
    setPendingItemId(null);
    if (!result.success) {
      setOperationError(`Couldn’t delete this conversation. ${result.error}`);
    }
  };

  if (items === undefined || visibleItems === undefined) {
    return (
      <div className="loading font-body" role="status" aria-live="polite">
        Loading scrapbook…
      </div>
    );
  }

  const hasQuery = query.trim().length > 0;
  const resultsLabel = `${visibleItems.length} ${
    visibleItems.length === 1 ? "conversation" : "conversations"
  }`;
  const emptyKind = hasQuery
    ? "search"
    : items.length === 0
      ? "empty"
      : filter === "archived"
        ? "archived"
        : filter === "active"
          ? "active"
          : "empty";

  return (
    <div className="scrapbook-list">
      {items.length > 0 ? (
        <div className="scrapbook-list-controls">
          <form
            role="search"
            className="relative"
            onSubmit={(event) => event.preventDefault()}
          >
            <label htmlFor={searchId} className="sr-only">
              Search scrapbook conversations
            </label>
            <MagnifyingGlass
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted"
              size={15}
              aria-hidden
            />
            <input
              id={searchId}
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search conversations"
              autoComplete="off"
              spellCheck={false}
              aria-controls={resultsId}
              aria-describedby={resultsStatusId}
              className="h-9 w-full appearance-none rounded-[var(--radius-md)] border border-hairline bg-surface-raised py-0 pl-9 pr-9 text-xs text-ink outline-none transition-[border-color,box-shadow,background-color] duration-150 placeholder:text-ink-muted hover:bg-surface-hover focus:border-accent focus:bg-surface-raised focus:ring-2 focus:ring-accent-soft motion-reduce:transition-none [&::-webkit-search-cancel-button]:hidden"
            />
            {query ? (
              <button
                type="button"
                className="absolute right-1 top-1/2 grid size-7 -translate-y-1/2 cursor-pointer place-items-center rounded-full border-0 bg-transparent text-ink-muted transition-colors duration-150 hover:bg-surface-hover hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent motion-reduce:transition-none"
                onClick={() => setQuery("")}
                aria-label="Clear scrapbook search"
              >
                <X size={14} aria-hidden />
              </button>
            ) : null}
          </form>

          <div
            className="flex items-center gap-1"
            role="group"
            aria-label="Filter scrapbook conversations"
          >
            {(Object.keys(filterLabels) as ScrapbookFilter[]).map((value) => {
              const isSelected = value === filter;
              return (
                <button
                  key={value}
                  type="button"
                  aria-pressed={isSelected}
                  aria-label={`${filterLabels[value]}, ${counts[value]}`}
                  className={`inline-flex h-8 min-w-0 cursor-pointer items-center gap-1.5 rounded-[var(--radius-sm)] border-0 px-2.5 text-[11px] font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent motion-reduce:transition-none [@media(pointer:coarse)]:h-10 ${
                    isSelected
                      ? "bg-surface-hover text-ink"
                      : "bg-transparent text-ink-muted hover:bg-surface-raised hover:text-ink"
                  }`}
                  onClick={() => setFilter(value)}
                >
                  {filterLabels[value]}
                  <span
                    className={`font-mono text-[9px] ${
                      isSelected ? "text-ink" : "text-ink-muted"
                    }`}
                    aria-hidden
                  >
                    {counts[value]}
                  </span>
                </button>
              );
            })}
          </div>

          <span id={resultsStatusId} className="sr-only" aria-live="polite">
            {resultsLabel}
          </span>
        </div>
      ) : null}

      {operationError ? (
        <div
          className="mx-1 flex items-start gap-2 rounded-[var(--radius-md)] border border-red-500/20 bg-red-500/10 px-3 py-2 text-[11px] leading-4 text-red-200"
          role="alert"
        >
          <WarningCircle className="mt-0.5 shrink-0" size={14} aria-hidden />
          <span className="min-w-0 flex-1">{operationError}</span>
          <button
            type="button"
            className="grid size-6 shrink-0 cursor-pointer place-items-center rounded-full border-0 bg-transparent text-red-200 transition-colors duration-150 hover:bg-red-500/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500/50 motion-reduce:transition-none"
            onClick={() => setOperationError(null)}
            aria-label="Dismiss error"
          >
            <X size={13} aria-hidden />
          </button>
        </div>
      ) : null}

      <div
        id={resultsId}
        role="region"
        aria-label={`${resultsRegionLabel}: ${resultsLabel}`}
      >
        {visibleItems.length === 0 ? (
          <ScrapbookEmptyState
            kind={emptyKind}
            query={query}
            onClearSearch={() => setQuery("")}
            onShowAll={() => setFilter("all")}
          />
        ) : (
          <ul className="m-0 flex list-none flex-col gap-2 p-0" role="list">
            {visibleItems.map((item) => (
              <li key={item.id ?? `${item.term}:${item.learnedAt}`}>
                <ScrapbookRow
                  item={item}
                  onDelete={handleDelete}
                  onArchive={handleArchive}
                  onRestore={
                    simulatedItems && !onSimulatedRestore
                      ? undefined
                      : handleRestore
                  }
                  onOpen={handleOpen}
                  busy={item.id !== undefined && pendingItemId === item.id}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

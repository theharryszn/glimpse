import { Archive, BookOpenText, MagnifyingGlass } from "@phosphor-icons/react";

type ScrapbookEmptyStateKind = "empty" | "search" | "active" | "archived";

interface ScrapbookEmptyStateProps {
  kind?: ScrapbookEmptyStateKind;
  query?: string;
  onClearSearch?: () => void;
  onShowAll?: () => void;
}

const emptyStateContent: Record<
  Exclude<ScrapbookEmptyStateKind, "search">,
  { title: string; description: string }
> = {
  empty: {
    title: "Your scrapbook is quiet",
    description:
      "Highlight something worth understanding, then hold to create your first entry.",
  },
  active: {
    title: "No active conversations",
    description: "Your conversations are archived. Show everything to find them.",
  },
  archived: {
    title: "Nothing archived yet",
    description: "Conversations you archive will wait here until you need them.",
  },
};

export function ScrapbookEmptyState({
  kind = "empty",
  query = "",
  onClearSearch,
  onShowAll,
}: ScrapbookEmptyStateProps) {
  const isSearch = kind === "search";
  const content = isSearch
    ? {
        title: "No matching conversations",
        description: query.trim()
          ? `Nothing matches “${query.trim()}”. Try a title, topic, or website.`
          : "Try a different title, topic, or website.",
      }
    : emptyStateContent[kind];
  const Icon = isSearch
    ? MagnifyingGlass
    : kind === "archived"
      ? Archive
      : BookOpenText;

  return (
    <div className="flex flex-col items-center px-6 py-10 text-center text-ink-muted">
      <div className="mb-3 grid size-9 place-items-center rounded-[var(--radius-md)] bg-surface-raised text-ink-muted">
        <Icon size={18} aria-hidden />
      </div>
      <strong className="text-sm font-medium text-ink">
        {content.title}
      </strong>
      <p className="mb-0 mt-1 max-w-64 text-xs leading-relaxed [overflow-wrap:anywhere]">
        {content.description}
      </p>
      {isSearch && onClearSearch ? (
        <button
          type="button"
          className="mt-4 inline-flex h-8 cursor-pointer items-center justify-center rounded-[var(--radius-sm)] border border-hairline bg-surface-raised px-3 text-xs font-medium text-ink transition-colors duration-150 hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent motion-reduce:transition-none"
          onClick={onClearSearch}
        >
          Clear search
        </button>
      ) : kind === "active" && onShowAll ? (
        <button
          type="button"
          className="mt-4 inline-flex h-8 cursor-pointer items-center justify-center rounded-[var(--radius-sm)] border border-hairline bg-surface-raised px-3 text-xs font-medium text-ink transition-colors duration-150 hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent motion-reduce:transition-none"
          onClick={onShowAll}
        >
          Show all conversations
        </button>
      ) : null}
    </div>
  );
}

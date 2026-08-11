import { BookOpenText } from "@phosphor-icons/react";

export function ScrapbookEmptyState() {
  return (
    <div className="flex flex-col items-center px-6 py-10 text-center text-ink-muted">
      <div className="mb-3 grid size-9 place-items-center rounded-[var(--radius-md)] bg-surface-raised text-ink-muted">
        <BookOpenText size={18} aria-hidden />
      </div>
      <strong className="text-sm font-medium text-ink">
        Your scrapbook is quiet
      </strong>
      <p className="mb-0 mt-1 max-w-64 text-xs leading-relaxed">
        Highlight something worth understanding, then hold to create your first
        entry.
      </p>
    </div>
  );
}

import { Sparkle } from "@phosphor-icons/react";

export function ChatEmptyState() {
  return (
    <div className="m-auto flex max-w-64 flex-col items-center px-5 py-8 text-center">
      <div className="mb-3 grid size-9 place-items-center rounded-[var(--radius-md)] bg-surface-raised text-ink-muted">
        <Sparkle size={17} aria-hidden />
      </div>
      <strong className="text-sm font-medium text-ink">Ask from this page</strong>
      <p className="mb-0 mt-1 text-xs leading-relaxed text-ink-muted">
        Your question and the page context stay on this device while the local
        model responds.
      </p>
    </div>
  );
}

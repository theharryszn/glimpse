import { BookOpenText } from "@phosphor-icons/react";

export function ChatEmptyState() {
  return (
    <div className="m-auto flex w-full max-w-[300px] items-start gap-3 px-6 py-10 text-left">
      <div className="grid size-9 shrink-0 place-items-center rounded-[var(--radius-md)] bg-accent-soft text-accent-strong">
        <BookOpenText size={17} weight="duotone" aria-hidden />
      </div>
      <div className="min-w-0 pt-0.5">
        <strong className="block text-sm font-medium leading-5 text-ink">
          Ask about what you’re reading
        </strong>
        <p className="mb-0 mt-1 text-xs leading-[1.55] text-ink-muted">
          Glimpse uses this page as context. Your question and the response stay
          on this device.
        </p>
      </div>
    </div>
  );
}

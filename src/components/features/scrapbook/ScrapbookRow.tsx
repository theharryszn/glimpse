import { ArrowRight } from "@phosphor-icons/react";
import { Button } from "@/components/ui/Button";
import { getScrapbookTitle } from "@/shared/utils/chat-title-utils";
import { UserScrapbook } from "../../../shared/types/models";
import { ScrapbookActions } from "./ScrapbookActions";
import { ScrapbookHeader } from "./ScrapbookHeader";
import { ScrapbookMetadata } from "./ScrapbookMetadata";
import { SourceLink } from "./SourceLink";

interface ScrapbookRowProps {
  item: UserScrapbook;
  onDelete: (id: number) => void | Promise<void>;
  onArchive: (id: number) => void | Promise<void>;
  onRestore?: (id: number) => void | Promise<void>;
  onOpen: (item: UserScrapbook) => void;
  busy?: boolean;
}

export function ScrapbookRow({
  item,
  onDelete,
  onArchive,
  onRestore,
  onOpen,
  busy = false,
}: ScrapbookRowProps) {
  const title = getScrapbookTitle(item);
  const hasId = item.id !== undefined;

  return (
    <article
      className="scrapbook-row group relative flex min-w-0 items-center gap-3 rounded-[var(--radius-lg)] bg-surface-raised px-3.5 py-3 transition-colors duration-150 hover:bg-surface-hover focus-within:bg-surface-hover motion-reduce:transition-none"
      aria-busy={busy || undefined}
    >
      <div className="min-w-0 flex-1">
        <ScrapbookHeader title={title} />
        <div className="mt-1.5 flex min-w-0 items-center gap-2">
          <SourceLink url={item.domainUrl} />
          <span className="size-0.5 shrink-0 rounded-full bg-ink-muted" aria-hidden />
          <ScrapbookMetadata learnedAt={item.learnedAt} />
          {item.archivedAt ? (
            <span className="shrink-0 rounded-full bg-white/5 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.08em] text-ink-muted">
              Archived
            </span>
          ) : null}
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-1">
        <Button
          variant="icon"
          className="pointer-events-none size-8 translate-x-1 rounded-full p-0 opacity-0 !border-transparent !bg-transparent !text-ink-muted transition-[color,opacity,transform] duration-150 hover:!bg-transparent hover:!text-ink focus-visible:ring-offset-surface group-hover:pointer-events-auto group-hover:translate-x-0 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:translate-x-0 group-focus-within:opacity-100 motion-reduce:transition-none [@media(pointer:coarse)]:pointer-events-auto [@media(pointer:coarse)]:size-10 [@media(pointer:coarse)]:translate-x-0 [@media(pointer:coarse)]:opacity-100"
          onClick={() => onOpen(item)}
          disabled={busy}
          aria-label={`Open conversation: ${title}`}
        >
          <ArrowRight className="shrink-0" size={16} aria-hidden />
        </Button>
        <ScrapbookActions
          archived={Boolean(item.archivedAt)}
          onArchive={() => {
            if (hasId) return onArchive(item.id!);
          }}
          onRestore={
            hasId && onRestore ? () => onRestore(item.id!) : undefined
          }
          onDelete={() => {
            if (hasId) return onDelete(item.id!);
          }}
          disabled={!hasId || busy}
        />
      </div>
    </article>
  );
}

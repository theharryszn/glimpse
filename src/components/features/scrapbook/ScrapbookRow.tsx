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
  onDelete: (id: number) => void;
  onArchive: (id: number) => void;
  onOpen: (item: UserScrapbook) => void;
}

export function ScrapbookRow({
  item,
  onDelete,
  onArchive,
  onOpen,
}: ScrapbookRowProps) {
  const title = getScrapbookTitle(item);
  const hasId = item.id !== undefined;

  return (
    <article className="scrapbook-row group relative flex min-w-0 items-center gap-3 border-b border-hairline px-4 py-3.5 transition-colors last:border-b-0 hover:bg-surface-raised focus-within:bg-surface-raised">
      <div className="min-w-0 flex-1">
        <ScrapbookHeader title={title} />
        <div className="mt-1.5 flex min-w-0 items-center gap-2">
          <SourceLink url={item.domainUrl} />
          <span className="size-0.5 shrink-0 rounded-full bg-ink-muted" aria-hidden />
          <ScrapbookMetadata learnedAt={item.learnedAt} />
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-1">
        <Button
          variant="ghost"
          size="sm"
          className="size-8 translate-x-1 rounded-full p-0 opacity-0 !border-hairline !bg-surface !text-ink transition-[opacity,transform] duration-150 group-hover:translate-x-0 group-hover:opacity-100 group-focus-within:translate-x-0 group-focus-within:opacity-100 [@media(hover:none)]:translate-x-0 [@media(hover:none)]:opacity-100"
          onClick={() => onOpen(item)}
          aria-label={`Open conversation: ${title}`}
        >
          <ArrowRight size={16} aria-hidden />
        </Button>
        <ScrapbookActions
          onArchive={() => hasId && onArchive(item.id!)}
          onDelete={() => hasId && onDelete(item.id!)}
          disabled={!hasId}
        />
      </div>
    </article>
  );
}

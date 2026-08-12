import {
  ArrowSquareOut,
  CaretDown,
  LinkSimple,
} from "@phosphor-icons/react";

interface SourceContextProps {
  title?: string;
  url?: string;
  excerpt?: string;
}

function getSafeSource(url?: string) {
  if (!url) return null;

  try {
    const parsedUrl = new URL(url);
    if (parsedUrl.protocol !== "http:" && parsedUrl.protocol !== "https:") {
      return null;
    }

    return {
      href: parsedUrl.href,
      hostname: parsedUrl.hostname.replace(/^www\./, ""),
    };
  } catch {
    return null;
  }
}

export function SourceContext({ title, url, excerpt }: SourceContextProps) {
  const source = getSafeSource(url);
  if (!source) return null;

  const sourceTitle = title?.trim() || source.hostname;

  return (
    <details className="group min-w-0 rounded-[var(--radius-md)] bg-surface-raised text-ink">
      <summary className="flex min-h-8 cursor-pointer list-none items-center gap-2 rounded-[var(--radius-md)] px-2.5 text-[11px] text-ink-muted outline-none transition-colors duration-150 hover:bg-surface-hover hover:text-ink focus-visible:ring-2 focus-visible:ring-accent motion-reduce:transition-none [&::-webkit-details-marker]:hidden">
        <LinkSimple size={13} className="shrink-0" aria-hidden />
        <span className="shrink-0 font-medium">Page context</span>
        <span className="min-w-0 flex-1 truncate font-mono text-[10px] text-ink-muted">
          {source.hostname}
        </span>
        <CaretDown
          size={12}
          className="shrink-0 transition-transform duration-150 group-open:rotate-180 motion-reduce:transition-none"
          aria-hidden
        />
      </summary>

      <div className="border-t border-hairline px-2.5 py-2.5">
        <p className="m-0 break-words text-xs font-medium leading-[1.45] [overflow-wrap:anywhere]">
          {sourceTitle}
        </p>
        {excerpt?.trim() && (
          <p className="mb-0 mt-1 line-clamp-3 break-words text-[11px] leading-[1.5] text-ink-muted [overflow-wrap:anywhere]">
            {excerpt.trim()}
          </p>
        )}
        <a
          href={source.href}
          target="_blank"
          rel="noreferrer noopener"
          className="mt-2 inline-flex items-center gap-1 rounded-[var(--radius-sm)] text-[11px] font-medium text-ink no-underline outline-none transition-colors duration-150 hover:text-accent-strong focus-visible:ring-2 focus-visible:ring-accent motion-reduce:transition-none"
          aria-label={`Open page context: ${sourceTitle}`}
        >
          Open page
          <ArrowSquareOut size={12} className="shrink-0" aria-hidden />
        </a>
      </div>
    </details>
  );
}

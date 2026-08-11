import { GlobeSimple } from "@phosphor-icons/react";

interface SourceLinkProps {
  url: string;
}

export function SourceLink({ url }: SourceLinkProps) {
  const safeUrl = url.startsWith("http") ? url : `https://${url}`;
  let label = url;

  try {
    label = new URL(safeUrl).hostname.replace(/^www\./, "");
  } catch {
    // Keep the original value readable when a legacy entry is not a valid URL.
  }

  return (
    <a
      href={safeUrl}
      target="_blank"
      rel="noreferrer"
      className="inline-flex min-w-0 items-center gap-1 text-[11px] text-ink-muted no-underline transition-colors duration-150 hover:text-ink focus-visible:rounded-[var(--radius-sm)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent motion-reduce:transition-none"
    >
      <GlobeSimple size={12} aria-hidden />
      <span className="truncate">{label}</span>
      <span className="sr-only">Open source in a new tab</span>
    </a>
  );
}

import { ArrowSquareOut } from "@phosphor-icons/react";

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
      className="inline-flex min-w-0 items-center gap-1 font-mono text-[10px] text-accent-strong no-underline hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
    >
      <span className="truncate">{label}</span>
      <ArrowSquareOut size={12} aria-hidden />
      <span className="sr-only">Open source in a new tab</span>
    </a>
  );
}

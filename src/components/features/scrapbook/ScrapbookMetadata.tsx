interface ScrapbookMetadataProps {
  learnedAt?: number;
}

export function ScrapbookMetadata({ learnedAt }: ScrapbookMetadataProps) {
  const date = learnedAt
    ? new Date(learnedAt).toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "Unknown date";

  return (
    <time
      className="font-mono text-[10px] uppercase tracking-[0.08em] text-ink-muted"
      dateTime={learnedAt ? new Date(learnedAt).toISOString() : undefined}
    >
      {date}
    </time>
  );
}

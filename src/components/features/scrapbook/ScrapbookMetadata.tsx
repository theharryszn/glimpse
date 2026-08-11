import { formatRelativeDate } from "@/shared/utils/date-utils";

interface ScrapbookMetadataProps {
  learnedAt?: number;
}

export function ScrapbookMetadata({ learnedAt }: ScrapbookMetadataProps) {
  const date = learnedAt ? formatRelativeDate(learnedAt) : "Unknown date";
  const exactDate = learnedAt
    ? new Date(learnedAt).toLocaleString(undefined, {
        dateStyle: "medium",
        timeStyle: "short",
      })
    : undefined;

  return (
    <time
      className="shrink-0 font-mono text-[10px] text-ink-muted"
      dateTime={learnedAt ? new Date(learnedAt).toISOString() : undefined}
      title={exactDate}
    >
      {date}
    </time>
  );
}

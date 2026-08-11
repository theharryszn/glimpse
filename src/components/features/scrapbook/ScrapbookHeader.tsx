import { ScrapbookMetadata } from "./ScrapbookMetadata";

interface ScrapbookHeaderProps {
  term: string;
  learnedAt?: number;
}

export function ScrapbookHeader({ term, learnedAt }: ScrapbookHeaderProps) {
  return (
    <header className="flex items-start justify-between gap-4">
      <h3 className="m-0 text-[1.05rem] font-semibold leading-snug text-ink">
        {term}
      </h3>
      <ScrapbookMetadata learnedAt={learnedAt} />
    </header>
  );
}

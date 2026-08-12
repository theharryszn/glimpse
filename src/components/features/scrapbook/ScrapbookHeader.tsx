interface ScrapbookHeaderProps {
  title: string;
}

export function ScrapbookHeader({ title }: ScrapbookHeaderProps) {
  return (
    <header>
      <h2 className="m-0 line-clamp-2 text-pretty text-sm font-medium leading-5 text-ink">
        {title}
      </h2>
    </header>
  );
}

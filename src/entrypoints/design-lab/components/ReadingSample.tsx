interface ReadingSampleProps {
  compact?: boolean;
}

export function ReadingSample({ compact = false }: ReadingSampleProps) {
  return (
    <article
      className={`design-lab-article ${compact ? "design-lab-article-compact" : ""}`}
    >
      <h1>Meaning is not the same thing as volume.</h1>
      <p>
        When we learn, we rarely preserve every sentence exactly as it
        appeared. We retain structure, relationships, and a few unusually
        durable details.
      </p>
      <p>
        The useful trick is <mark>semantic compression</mark>: reducing
        information without flattening what makes it meaningful.
      </p>
      {!compact && (
        <p>
          This distinction matters because a shorter representation is only
          useful when it preserves the relationships a reader will need later.
        </p>
      )}
    </article>
  );
}

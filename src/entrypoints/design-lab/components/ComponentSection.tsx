import type { ReactNode } from "react";

interface ComponentSectionProps {
  id: string;
  index: string;
  title: string;
  description: string;
  children: ReactNode;
  frameClassName?: string;
}

export function ComponentSection({
  id,
  index,
  title,
  description,
  children,
  frameClassName = "",
}: ComponentSectionProps) {
  return (
    <section id={id} className="design-lab-section">
      <header className="design-lab-section-header">
        <span>{index}</span>
        <h2>{title}</h2>
        <p>{description}</p>
      </header>
      <div className={`design-lab-section-frame ${frameClassName}`}>
        {children}
      </div>
    </section>
  );
}

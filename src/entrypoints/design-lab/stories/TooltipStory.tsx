import { CodexTooltip } from "@/components/overlays/CodexTooltip";

export function TooltipStory() {
  return (
    <div className="design-lab-page-preview design-lab-compact-preview">
      <div className="design-lab-tooltip-copy">
        This sentence contains a previously learned term: {" "}
        <span className="glimpse-codex-underline active">
          semantic compression
        </span>
      </div>
      <CodexTooltip
        term="Semantic compression"
        learnedAt={Date.now() - 1000 * 60 * 60 * 24 * 2}
        domainUrl="example.com/reading/meaning"
        position={{ x: 500, y: 195 }}
      />
    </div>
  );
}

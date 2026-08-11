import { Moon, Sun } from "@phosphor-icons/react";
import { ComponentSection } from "./components/ComponentSection";
import { AiStatusCardStory } from "./stories/AiStatusCardStory";
import { ChatStory } from "./stories/ChatStory";
import { FabButtonStory } from "./stories/FabButtonStory";
import { FabPanelStory } from "./stories/FabPanelStory";
import { FullFlowStory } from "./stories/FullFlowStory";
import { MagicHoldStory } from "./stories/MagicHoldStory";
import { MagicHoldTutorialStory } from "./stories/MagicHoldTutorialStory";
import { PopoverStory } from "./stories/PopoverStory";
import { PopupFooterStory } from "./stories/PopupFooterStory";
import { PopupHeaderStory } from "./stories/PopupHeaderStory";
import { QuickStartStepsStory } from "./stories/QuickStartStepsStory";
import { ScrapbookListStory } from "./stories/ScrapbookListStory";
import { ScrapbookRowStory } from "./stories/ScrapbookRowStory";
import { TooltipStory } from "./stories/TooltipStory";
import { SystemHealthStory } from "./stories/SystemHealthStory";
import { useStoredState } from "./shared/useStoredState";

const catalog = [
  { id: "popup-header", label: "Popup header" },
  { id: "ai-status", label: "AI status" },
  { id: "quick-start", label: "Quick start" },
  { id: "popup-footer", label: "Popup footer" },
  { id: "system-health", label: "System health" },
  { id: "hold-tutorial", label: "Hold tutorial" },
  { id: "magic-hold", label: "Magic Hold" },
  { id: "explanation-popover", label: "Explanation popover" },
  { id: "learned-tooltip", label: "Learned-term tooltip" },
  { id: "scrapbook-row", label: "Scrapbook row" },
  { id: "scrapbook-list", label: "Scrapbook list" },
  { id: "follow-up-chat", label: "Follow-up chat" },
  { id: "launcher", label: "Launcher" },
  { id: "scrapbook-panel", label: "Scrapbook panel" },
  { id: "full-flow", label: "Full product flow" },
] as const;

export default function App() {
  const [dark, setDark] = useStoredState(
    "glimpse-design-lab-dark",
    false,
  );

  return (
    <div className={`design-lab ${dark ? "dark" : ""}`}>
      <aside className="design-lab-sidebar">
        <div className="design-lab-brand">
          <span>G</span>
          <div>
            <strong>Glimpse</strong>
            <small>Design Lab</small>
          </div>
        </div>

        <nav aria-label="Component catalog">
          <span>Components</span>
          {catalog.map((item) => (
            <a key={item.id} href={`#${item.id}`}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="design-lab-sidebar-note">
          <strong>Production components</strong>
          <span>Fixtures provide state. AI responses use the live local model.</span>
        </div>
      </aside>

      <main className="design-lab-main">
        <header className="design-lab-intro">
          <div>
            <span>Component catalog</span>
            <h1>Glimpse interface primitives.</h1>
            <p>
              The exact components used by the extension, isolated with their
              real states and interactions.
            </p>
          </div>
          <button
            className="design-lab-theme-toggle"
            onClick={() => setDark(!dark)}
            aria-label={dark ? "Use light theme" : "Use dark theme"}
          >
            {dark ? (
              <Sun size={15} weight="regular" aria-hidden />
            ) : (
              <Moon size={15} weight="regular" aria-hidden />
            )}
            {dark ? "Light" : "Dark"}
          </button>
        </header>

        <ComponentSection
          id="popup-header"
          index="01"
          title="Popup header"
          description="Extension identity, theme control, and the global enabled state."
        >
          <PopupHeaderStory />
        </ComponentSection>

        <ComponentSection
          id="ai-status"
          index="02"
          title="AI status"
          description="A compact, semantic readout for local-model availability and preparation states."
        >
          <AiStatusCardStory />
        </ComponentSection>

        <ComponentSection
          id="quick-start"
          index="03"
          title="Quick start"
          description="The three-step instruction block used in the extension popup."
        >
          <QuickStartStepsStory />
        </ComponentSection>

        <ComponentSection
          id="popup-footer"
          index="04"
          title="Popup footer"
          description="Privacy reassurance and routes into setup and development tools."
        >
          <PopupFooterStory />
        </ComponentSection>

        <ComponentSection
          id="system-health"
          index="05"
          title="System health"
          description="Local identity and Gemini Nano readiness with actionable unavailable states."
        >
          <SystemHealthStory />
        </ComponentSection>

        <ComponentSection
          id="hold-tutorial"
          index="06"
          title="Hold tutorial"
          description="The production onboarding exercise with real selection-and-hold completion behavior."
        >
          <MagicHoldTutorialStory />
        </ComponentSection>

        <ComponentSection
          id="magic-hold"
          index="07"
          title="Magic Hold"
          description="A deliberate hold gesture that confirms Glimpse is listening without interrupting selection."
        >
          <MagicHoldStory />
        </ComponentSection>

        <ComponentSection
          id="explanation-popover"
          index="08"
          title="Explanation popover"
          description="The draggable streamed answer surface, connected to the production local-AI bridge."
        >
          <PopoverStory />
        </ComponentSection>

        <ComponentSection
          id="learned-tooltip"
          index="09"
          title="Learned-term tooltip"
          description="Saved context revealed when a reader returns to a term they have already explored."
        >
          <TooltipStory />
        </ComponentSection>

        <ComponentSection
          id="scrapbook-row"
          index="10"
          title="Scrapbook row"
          description="One saved concept with source, recency, deletion, and follow-up actions."
        >
          <ScrapbookRowStory />
        </ComponentSection>

        <ComponentSection
          id="scrapbook-list"
          index="11"
          title="Scrapbook list"
          description="The collection state using the same rows and deletion behavior as production."
        >
          <ScrapbookListStory />
        </ComponentSection>

        <ComponentSection
          id="follow-up-chat"
          index="12"
          title="Follow-up chat"
          description="Persistent conversation history with responses streamed by the live local model."
          frameClassName="design-lab-narrow-frame"
        >
          <ChatStory />
        </ComponentSection>

        <ComponentSection
          id="launcher"
          index="13"
          title="Launcher"
          description="The current draggable entry control, preserved here while shortcut-first access is developed."
        >
          <FabButtonStory />
        </ComponentSection>

        <ComponentSection
          id="scrapbook-panel"
          index="14"
          title="Scrapbook panel"
          description="The combined saved-concepts and follow-up-chat container used over a webpage."
        >
          <FabPanelStory />
        </ComponentSection>

        <ComponentSection
          id="full-flow"
          index="15"
          title="Full product flow"
          description="Select, hold, explain, continue, save, and revisit as one production-equivalent journey."
        >
          <FullFlowStory />
        </ComponentSection>
      </main>
    </div>
  );
}

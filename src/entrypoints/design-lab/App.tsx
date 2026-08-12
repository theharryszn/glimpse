import { ComponentSection } from "./components/ComponentSection";
import { ChatActionsStory } from "./stories/ChatActionsStory";
import { ChatStory } from "./stories/ChatStory";
import { FabButtonStory } from "./stories/FabButtonStory";
import { FabPanelStory } from "./stories/FabPanelStory";
import {
  ButtonStory,
  FoundationsStory,
  StatusStory,
  ToggleStory,
} from "./stories/FoundationStories";
import { FullFlowStory } from "./stories/FullFlowStory";
import { MagicHoldStory } from "./stories/MagicHoldStory";
import { MagicHoldTutorialStory } from "./stories/MagicHoldTutorialStory";
import { PopoverStory } from "./stories/PopoverStory";
import { PopupStory } from "./stories/PopupStory";
import { ScrapbookListStory } from "./stories/ScrapbookListStory";
import { ScrapbookRowStory } from "./stories/ScrapbookRowStory";
import { SystemHealthStory } from "./stories/SystemHealthStory";
import { TooltipStory } from "./stories/TooltipStory";

const catalog = [
  { id: "foundations", label: "Foundations" },
  { id: "button", label: "Button" },
  { id: "status", label: "Status" },
  { id: "toggle", label: "Toggle" },
  { id: "chat", label: "Chat" },
  { id: "chat-actions", label: "Chat actions" },
  { id: "popup", label: "Popup" },
  { id: "system-health", label: "System health" },
  { id: "hold-tutorial", label: "Hold tutorial" },
  { id: "hold-progress", label: "Hold progress" },
  { id: "explanation-popover", label: "Explanation popover" },
  { id: "learned-tooltip", label: "Learned tooltip" },
  { id: "scrapbook-row", label: "Scrapbook row" },
  { id: "scrapbook-list", label: "Scrapbook list" },
  { id: "launcher", label: "Legacy launcher" },
  { id: "scrapbook-panel", label: "Scrapbook panel" },
  { id: "full-flow", label: "Full product flow" },
] as const;

export default function App() {
  return (
    <div className="design-lab dark">
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
      </aside>

      <main className="design-lab-main" aria-label="Glimpse component catalog">
        <header className="design-lab-intro">
          <div>
            <span>Product component catalog</span>
            <h1>Glimpse interface system.</h1>
            <p>
              Product-level components and flows, isolated with their real
              states and production interactions. AI examples use the live
              local model.
            </p>
          </div>
        </header>

        <ComponentSection
          id="foundations"
          index="01"
          title="Foundations"
          description="Surface and field treatments shared across every Glimpse interface."
        >
          <FoundationsStory />
        </ComponentSection>

        <ComponentSection
          id="button"
          index="02"
          title="Button"
          description="Text and icon-only actions with one shared hierarchy and behavior."
        >
          <ButtonStory />
        </ComponentSection>

        <ComponentSection
          id="status"
          index="03"
          title="Status"
          description="Compact badges and readable indicators for local capability states."
        >
          <StatusStory />
        </ComponentSection>

        <ComponentSection
          id="toggle"
          index="04"
          title="Toggle"
          description="The controlled switch used for global and local binary settings."
        >
          <ToggleStory />
        </ComponentSection>

        <ComponentSection
          id="chat"
          index="05"
          title="Chat"
          description="The complete local-model conversation, including empty, streaming, error, history, and composer states."
          frameClassName="design-lab-narrow-frame"
        >
          <ChatStory />
        </ComponentSection>

        <ComponentSection
          id="chat-actions"
          index="06"
          title="Chat actions"
          description="Ways to continue a completed explanation or begin from a suggested prompt."
        >
          <ChatActionsStory />
        </ComponentSection>

        <ComponentSection
          id="popup"
          index="07"
          title="Popup"
          description="Extension identity, availability, controls, quick start, and setup routes as one product surface."
        >
          <PopupStory />
        </ComponentSection>

        <ComponentSection
          id="system-health"
          index="08"
          title="System health"
          description="Identity and Gemini Nano readiness, including actionable recovery guidance."
        >
          <SystemHealthStory />
        </ComponentSection>

        <ComponentSection
          id="hold-tutorial"
          index="09"
          title="Hold tutorial"
          description="The complete onboarding exercise with real selection-and-hold completion behavior."
        >
          <MagicHoldTutorialStory />
        </ComponentSection>

        <ComponentSection
          id="hold-progress"
          index="10"
          title="Hold progress"
          description="The signature cue that confirms Glimpse is listening while selection remains uninterrupted."
        >
          <MagicHoldStory />
        </ComponentSection>

        <ComponentSection
          id="explanation-popover"
          index="11"
          title="Explanation popover"
          description="The draggable answer surface connected to the production local-AI bridge."
        >
          <PopoverStory />
        </ComponentSection>

        <ComponentSection
          id="learned-tooltip"
          index="12"
          title="Learned tooltip"
          description="Saved context revealed when a reader returns to a previously explored term."
        >
          <TooltipStory />
        </ComponentSection>

        <ComponentSection
          id="scrapbook-row"
          index="13"
          title="Scrapbook row"
          description="One conversation with its generated title, source, date, and management actions."
        >
          <ScrapbookRowStory />
        </ComponentSection>

        <ComponentSection
          id="scrapbook-list"
          index="14"
          title="Scrapbook list"
          description="The active conversation index with relative dates and production interactions."
        >
          <ScrapbookListStory />
        </ComponentSection>

        <ComponentSection
          id="launcher"
          index="15"
          title="Legacy launcher"
          description="Kept here for comparison; the production scrapbook now opens with Alt or Option + Shift + G."
        >
          <FabButtonStory />
        </ComponentSection>

        <ComponentSection
          id="scrapbook-panel"
          index="16"
          title="Scrapbook panel"
          description="Saved concepts and follow-up chat combined in the production overlay container."
        >
          <FabPanelStory />
        </ComponentSection>

        <ComponentSection
          id="full-flow"
          index="17"
          title="Full product flow"
          description="Select, hold, explain, continue, save, and revisit as one production-equivalent journey."
        >
          <FullFlowStory />
        </ComponentSection>
      </main>
    </div>
  );
}

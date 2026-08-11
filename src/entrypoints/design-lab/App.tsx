import { Moon, Sun } from "@phosphor-icons/react";
import { ComponentSection } from "./components/ComponentSection";
import { AiStatusCardStory } from "./stories/AiStatusCardStory";
import {
  AiErrorStateStory,
  ChatComposerStory,
  ChatMessageStory,
  FollowUpSuggestionsStory,
  ResponseActionsStory,
  StreamingResponseStory,
  ThinkingIndicatorStory,
} from "./stories/AiComponentStories";
import { ChatStory } from "./stories/ChatStory";
import { FabButtonStory } from "./stories/FabButtonStory";
import { FabPanelStory } from "./stories/FabPanelStory";
import {
  BadgeStory,
  ButtonStory,
  IconButtonStory,
  StatusIndicatorStory,
  SurfaceStory,
  TextFieldStory,
  ToggleStory,
} from "./stories/FoundationStories";
import { FullFlowStory } from "./stories/FullFlowStory";
import { MagicHoldStory } from "./stories/MagicHoldStory";
import { MagicHoldTutorialStory } from "./stories/MagicHoldTutorialStory";
import { PopoverStory } from "./stories/PopoverStory";
import { PopupFooterStory } from "./stories/PopupFooterStory";
import { PopupHeaderStory } from "./stories/PopupHeaderStory";
import { QuickStartStepsStory } from "./stories/QuickStartStepsStory";
import { ScrapbookListStory } from "./stories/ScrapbookListStory";
import { ScrapbookRowStory } from "./stories/ScrapbookRowStory";
import {
  ScrapbookActionsStory,
  ScrapbookEmptyStateStory,
  ScrapbookHeaderStory,
  ScrapbookMetadataStory,
  SourceLinkStory,
} from "./stories/ScrapbookComponentStories";
import { TooltipStory } from "./stories/TooltipStory";
import { SystemHealthStory } from "./stories/SystemHealthStory";
import { useStoredState } from "./shared/useStoredState";

const catalog = [
  { id: "button", label: "Button" },
  { id: "icon-button", label: "Icon button" },
  { id: "toggle", label: "Toggle" },
  { id: "badge", label: "Badge" },
  { id: "status-indicator", label: "Status indicator" },
  { id: "surface", label: "Surface" },
  { id: "text-field", label: "Text field" },
  { id: "chat-message", label: "Chat message" },
  { id: "chat-composer", label: "Chat composer" },
  { id: "thinking-indicator", label: "Thinking indicator" },
  { id: "streaming-response", label: "Streaming response" },
  { id: "ai-error", label: "AI error" },
  { id: "response-actions", label: "Response actions" },
  { id: "follow-up-suggestions", label: "Follow-up suggestions" },
  { id: "popup-header", label: "Popup header" },
  { id: "ai-status", label: "AI status" },
  { id: "quick-start", label: "Quick start" },
  { id: "popup-footer", label: "Popup footer" },
  { id: "system-health", label: "System health" },
  { id: "hold-tutorial", label: "Hold tutorial" },
  { id: "magic-hold", label: "Magic Hold" },
  { id: "explanation-popover", label: "Explanation popover" },
  { id: "learned-tooltip", label: "Learned-term tooltip" },
  { id: "scrapbook-metadata", label: "Scrapbook metadata" },
  { id: "scrapbook-header", label: "Scrapbook header" },
  { id: "source-link", label: "Source link" },
  { id: "scrapbook-actions", label: "Scrapbook actions" },
  { id: "scrapbook-empty", label: "Scrapbook empty state" },
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
          id="button"
          index="01"
          title="Button"
          description="Shared actions with primary, secondary, quiet, destructive, and disabled states."
        >
          <ButtonStory />
        </ComponentSection>

        <ComponentSection
          id="icon-button"
          index="02"
          title="Icon button"
          description="Compact Phosphor actions with consistent sizing, focus, and disabled treatment."
        >
          <IconButtonStory />
        </ComponentSection>

        <ComponentSection
          id="toggle"
          index="03"
          title="Toggle"
          description="A controlled switch for global and local binary settings."
        >
          <ToggleStory />
        </ComponentSection>

        <ComponentSection
          id="badge"
          index="04"
          title="Badge"
          description="JetBrains Mono metadata labels for state, availability, and environment."
        >
          <BadgeStory />
        </ComponentSection>

        <ComponentSection
          id="status-indicator"
          index="05"
          title="Status indicator"
          description="Semantic availability states that combine a signal and readable label."
        >
          <StatusIndicatorStory />
        </ComponentSection>

        <ComponentSection
          id="surface"
          index="06"
          title="Surface"
          description="The shared flat, raised, and overlay containers behind Glimpse content."
        >
          <SurfaceStory />
        </ComponentSection>

        <ComponentSection
          id="text-field"
          index="07"
          title="Text field"
          description="Text entry with consistent focus, placeholder, and unavailable states."
        >
          <TextFieldStory />
        </ComponentSection>

        <ComponentSection
          id="chat-message"
          index="08"
          title="Chat message"
          description="User and assistant turns with one consistent conversational rhythm."
        >
          <ChatMessageStory />
        </ComponentSection>

        <ComponentSection
          id="chat-composer"
          index="09"
          title="Chat composer"
          description="Controlled follow-up input with submit and streaming-disabled behavior."
        >
          <ChatComposerStory />
        </ComponentSection>

        <ComponentSection
          id="thinking-indicator"
          index="10"
          title="Thinking indicator"
          description="A quiet local-model activity signal set in JetBrains Mono."
        >
          <ThinkingIndicatorStory />
        </ComponentSection>

        <ComponentSection
          id="streaming-response"
          index="11"
          title="Streaming response"
          description="The accessible live region used while Gemini Nano returns an answer."
        >
          <StreamingResponseStory />
        </ComponentSection>

        <ComponentSection
          id="ai-error"
          index="12"
          title="AI error"
          description="Actionable model failures with a readable message and technical code."
        >
          <AiErrorStateStory />
        </ComponentSection>

        <ComponentSection
          id="response-actions"
          index="13"
          title="Response actions"
          description="The shared continuation actions used beneath completed explanations."
        >
          <ResponseActionsStory />
        </ComponentSection>

        <ComponentSection
          id="follow-up-suggestions"
          index="14"
          title="Follow-up suggestions"
          description="Contextual prompts that help a reader continue without composing from scratch."
        >
          <FollowUpSuggestionsStory />
        </ComponentSection>

        <ComponentSection
          id="popup-header"
          index="15"
          title="Popup header"
          description="Extension identity, theme control, and the global enabled state."
        >
          <PopupHeaderStory />
        </ComponentSection>

        <ComponentSection
          id="ai-status"
          index="16"
          title="AI status"
          description="A compact, semantic readout for local-model availability and preparation states."
        >
          <AiStatusCardStory />
        </ComponentSection>

        <ComponentSection
          id="quick-start"
          index="17"
          title="Quick start"
          description="The three-step instruction block used in the extension popup."
        >
          <QuickStartStepsStory />
        </ComponentSection>

        <ComponentSection
          id="popup-footer"
          index="18"
          title="Popup footer"
          description="Privacy reassurance and routes into setup and development tools."
        >
          <PopupFooterStory />
        </ComponentSection>

        <ComponentSection
          id="system-health"
          index="19"
          title="System health"
          description="Local identity and Gemini Nano readiness with actionable unavailable states."
        >
          <SystemHealthStory />
        </ComponentSection>

        <ComponentSection
          id="hold-tutorial"
          index="20"
          title="Hold tutorial"
          description="The production onboarding exercise with real selection-and-hold completion behavior."
        >
          <MagicHoldTutorialStory />
        </ComponentSection>

        <ComponentSection
          id="magic-hold"
          index="21"
          title="Magic Hold"
          description="A deliberate hold gesture that confirms Glimpse is listening without interrupting selection."
        >
          <MagicHoldStory />
        </ComponentSection>

        <ComponentSection
          id="explanation-popover"
          index="22"
          title="Explanation popover"
          description="The draggable streamed answer surface, connected to the production local-AI bridge."
        >
          <PopoverStory />
        </ComponentSection>

        <ComponentSection
          id="learned-tooltip"
          index="23"
          title="Learned-term tooltip"
          description="Saved context revealed when a reader returns to a term they have already explored."
        >
          <TooltipStory />
        </ComponentSection>

        <ComponentSection
          id="scrapbook-metadata"
          index="24"
          title="Scrapbook metadata"
          description="Compact learned-at context kept intentionally secondary to the saved concept."
        >
          <ScrapbookMetadataStory />
        </ComponentSection>

        <ComponentSection
          id="scrapbook-header"
          index="25"
          title="Scrapbook header"
          description="A saved term paired with its capture date in a resilient row header."
        >
          <ScrapbookHeaderStory />
        </ComponentSection>

        <ComponentSection
          id="source-link"
          index="26"
          title="Source link"
          description="A recognizable domain label that preserves the original reading context."
        >
          <SourceLinkStory />
        </ComponentSection>

        <ComponentSection
          id="scrapbook-actions"
          index="27"
          title="Scrapbook actions"
          description="Continue the conversation or remove an entry with clear action hierarchy."
        >
          <ScrapbookActionsStory />
        </ComponentSection>

        <ComponentSection
          id="scrapbook-empty"
          index="28"
          title="Scrapbook empty state"
          description="A useful first-use cue that explains how a reader creates the first entry."
        >
          <ScrapbookEmptyStateStory />
        </ComponentSection>

        <ComponentSection
          id="scrapbook-row"
          index="29"
          title="Scrapbook row"
          description="One saved concept with source, recency, deletion, and follow-up actions."
        >
          <ScrapbookRowStory />
        </ComponentSection>

        <ComponentSection
          id="scrapbook-list"
          index="30"
          title="Scrapbook list"
          description="The collection state using the same rows and deletion behavior as production."
        >
          <ScrapbookListStory />
        </ComponentSection>

        <ComponentSection
          id="follow-up-chat"
          index="31"
          title="Follow-up chat"
          description="Persistent conversation history with responses streamed by the live local model."
          frameClassName="design-lab-narrow-frame"
        >
          <ChatStory />
        </ComponentSection>

        <ComponentSection
          id="launcher"
          index="32"
          title="Launcher"
          description="The current draggable entry control, preserved here while shortcut-first access is developed."
        >
          <FabButtonStory />
        </ComponentSection>

        <ComponentSection
          id="scrapbook-panel"
          index="33"
          title="Scrapbook panel"
          description="The combined saved-concepts and follow-up-chat container used over a webpage."
        >
          <FabPanelStory />
        </ComponentSection>

        <ComponentSection
          id="full-flow"
          index="34"
          title="Full product flow"
          description="Select, hold, explain, continue, save, and revisit as one production-equivalent journey."
        >
          <FullFlowStory />
        </ComponentSection>
      </main>
    </div>
  );
}

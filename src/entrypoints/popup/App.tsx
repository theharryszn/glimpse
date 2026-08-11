import { useState, useEffect } from "react";
import {
  AiStatusCard,
  type AiStatusTone,
} from "@/components/features/popup/AiStatusCard";
import { PopupFooter } from "@/components/features/popup/PopupFooter";
import { PopupHeader } from "@/components/features/popup/PopupHeader";
import { QuickStartSteps } from "@/components/features/popup/QuickStartSteps";
import {
  checkAiCapabilities,
  AiCapabilityStatus,
} from "@/shared/utils/ai-health-service";

const STORAGE_KEY_ENABLED = "glimpse_enabled";
const STORAGE_KEY_THEME = "glimpse_theme";

function App() {
  const [enabled, setEnabled] = useState(true);
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [aiStatus, setAiStatus] = useState<AiCapabilityStatus | "checking">(
    "checking",
  );
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const init = async () => {
      // Load persisted state
      const stored = await browser.storage.local.get([STORAGE_KEY_ENABLED, STORAGE_KEY_THEME]);
      const isEnabled = stored[STORAGE_KEY_ENABLED] !== false; // default true
      const storedTheme = stored[STORAGE_KEY_THEME] || "dark";
      setEnabled(isEnabled);
      setTheme(storedTheme as "light" | "dark");

      document.documentElement.classList.toggle("dark", storedTheme === "dark");

      // Check AI health
      const result = await checkAiCapabilities();
      if (result.success) {
        setAiStatus(result.data.available);
      } else {
        setAiStatus("unavailable");
      }

      setLoaded(true);
    };
    init();
  }, []);

  const handleToggle = async () => {
    const newState = !enabled;
    setEnabled(newState);
    await browser.storage.local.set({ [STORAGE_KEY_ENABLED]: newState });
    // Notify all content scripts of the state change
    const tabs = await browser.tabs.query({});
    for (const tab of tabs) {
      if (tab.id) {
        browser.tabs
          .sendMessage(tab.id, {
            type: "GLIMPSE_TOGGLE",
            payload: { enabled: newState },
          })
          .catch(() => {});
      }
    }
  };

  const handleThemeToggle = async () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    await browser.storage.local.set({ [STORAGE_KEY_THEME]: newTheme });
    
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    const tabs = await browser.tabs.query({});
    for (const tab of tabs) {
      if (tab.id) {
        browser.tabs
          .sendMessage(tab.id, {
            type: "GLIMPSE_THEME",
            payload: { theme: newTheme },
          })
          .catch(() => {});
      }
    }
  };

  const getStatusDot = () => {
    if (!loaded) return { tone: "idle" as AiStatusTone, label: "Loading…" };
    if (!enabled) return { tone: "idle" as AiStatusTone, label: "Disabled" };
    if (aiStatus === "available") return { tone: "success" as AiStatusTone, label: "Active" };
    if (aiStatus === "checking")
      return { tone: "warning" as AiStatusTone, label: "Checking…" };
    if (aiStatus === "downloadable" || aiStatus === "downloading")
      return { tone: "warning" as AiStatusTone, label: "Preparing…" };
    return { tone: "error" as AiStatusTone, label: "Unavailable" };
  };

  const status = getStatusDot();

  return (
    <div className="m-0 w-[300px] overflow-hidden bg-surface p-0 font-[var(--font-serif)] text-ink">
      <PopupHeader
        enabled={enabled}
        theme={theme}
        onToggleEnabled={handleToggle}
        onToggleTheme={handleThemeToggle}
      />

      {/* Status Section */}
      <div className="px-5 py-4">
        <AiStatusCard label={status.label} tone={status.tone} />

        {/* Quick Tips */}
        <div className="mt-4">
          <QuickStartSteps />
        </div>
      </div>

      <PopupFooter
        showDesignLab={import.meta.env.COMMAND === "serve"}
        onOpenDesignLab={() =>
          browser.tabs.create({
            url: browser.runtime.getURL("/design-lab.html"),
          })
        }
        onOpenSetupGuide={() =>
          browser.tabs.create({
            url: browser.runtime.getURL("/welcome.html"),
          })
        }
      />
    </div>
  );
}

export default App;

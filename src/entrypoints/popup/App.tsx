import { useEffect, useState } from "react";
import { AiStatusCard } from "@/components/features/popup/AiStatusCard";
import { PopupFooter } from "@/components/features/popup/PopupFooter";
import { PopupHeader } from "@/components/features/popup/PopupHeader";
import { QuickStartSteps } from "@/components/features/popup/QuickStartSteps";
import {
  checkAiCapabilities,
  type AiCapabilityStatus,
} from "@/shared/utils/ai-health-service";

const STORAGE_KEY_ENABLED = "glimpse_enabled";

function App() {
  const [enabled, setEnabled] = useState(true);
  const [aiStatus, setAiStatus] = useState<AiCapabilityStatus | "checking">(
    "checking",
  );
  const [loaded, setLoaded] = useState(false);
  const [shortcutKeys, setShortcutKeys] = useState<string[]>([
    "Alt / Option",
    "Shift",
    "G",
  ]);

  useEffect(() => {
    document.documentElement.classList.add("dark");

    const init = async () => {
      try {
        const stored = await browser.storage.local.get(STORAGE_KEY_ENABLED);
        setEnabled(stored[STORAGE_KEY_ENABLED] !== false);
      } catch {
        setEnabled(true);
      } finally {
        setLoaded(true);
      }

      const result = await checkAiCapabilities();
      setAiStatus(result.success ? result.data.available : "unavailable");

      try {
        const commands = await browser.commands.getAll();
        const scrapbookCommand = commands.find(
          (command) => command.name === "toggle-scrapbook",
        );
        setShortcutKeys(
          scrapbookCommand?.shortcut
            ? scrapbookCommand.shortcut.split("+").map((key) =>
                key === "Alt" ? "Alt / Option" : key,
              )
            : [],
        );
      } catch {
        setShortcutKeys([]);
      }
    };

    void init();
  }, []);

  const handleToggle = async () => {
    if (!loaded) return;
    const newState = !enabled;
    setEnabled(newState);
    await browser.storage.local.set({ [STORAGE_KEY_ENABLED]: newState });

    const tabs = await browser.tabs.query({});
    for (const tab of tabs) {
      if (!tab.id) continue;
      void browser.tabs
        .sendMessage(tab.id, {
          type: "GLIMPSE_TOGGLE",
          payload: { enabled: newState },
        })
        .catch(() => {});
    }
  };

  const openExtensionPage = (
    path: "/design-lab.html" | "/welcome.html",
  ) =>
    browser.tabs.create({ url: browser.runtime.getURL(path) });

  const openScrapbook = async () => {
    const [activeTab] = await browser.tabs.query({
      active: true,
      lastFocusedWindow: true,
    });
    if (!activeTab?.id) return;

    await browser.tabs
      .sendMessage(
        activeTab.id,
        { type: "GLIMPSE_TOGGLE_SCRAPBOOK" },
        { frameId: 0 },
      )
      .catch(() => {});
    window.close();
  };

  return (
    <div className="m-0 w-[320px] overflow-hidden bg-surface p-0 font-body text-ink">
      <PopupHeader
        enabled={enabled}
        controlsReady={loaded}
        onToggleEnabled={handleToggle}
      />

      <div className="px-5 py-4">
        <AiStatusCard status={aiStatus} enabled={enabled} />
        <div className="mt-4">
          <QuickStartSteps
            shortcutKeys={shortcutKeys}
            onOpenScrapbook={enabled ? openScrapbook : undefined}
          />
        </div>
      </div>

      <PopupFooter
        setupNeeded={aiStatus !== "available"}
        showDesignLab={import.meta.env.COMMAND === "serve"}
        onOpenDesignLab={() => openExtensionPage("/design-lab.html")}
        onOpenSetupGuide={() => openExtensionPage("/welcome.html")}
      />
    </div>
  );
}

export default App;

/// <reference types="@types/dom-chromium-ai" />

import { useCallback, useEffect, useState } from "react";
import { MagicHoldTutorial } from "@/components/features/onboarding/MagicHoldTutorial";
import {
  SystemHealthCard,
  type IdentityStatus,
} from "@/components/features/onboarding/SystemHealthCard";
import { KeyboardShortcut } from "@/components/ui/KeyboardShortcut";
import {
  checkAiCapabilities,
  type AiCapabilityStatus,
} from "@/shared/utils/ai-health-service";
import { getOrCreateIdentity } from "@/shared/utils/identity-service";

function App() {
  const [aiStatus, setAiStatus] = useState<AiCapabilityStatus | "checking">(
    "checking",
  );
  const [identityStatus, setIdentityStatus] =
    useState<IdentityStatus>("checking");
  const [isPreparingAi, setIsPreparingAi] = useState(false);

  const checkReadiness = useCallback(async () => {
    setAiStatus("checking");
    setIdentityStatus("checking");
    const [aiResult, identityResult] = await Promise.all([
      checkAiCapabilities(),
      getOrCreateIdentity(),
    ]);
    setAiStatus(aiResult.success ? aiResult.data.available : "unavailable");
    setIdentityStatus(identityResult.success ? "ready" : "unavailable");
  }, []);

  useEffect(() => {
    document.documentElement.classList.add("dark");

    void checkReadiness();
  }, [checkReadiness]);

  const prepareAi = async () => {
    if (typeof LanguageModel === "undefined") {
      setAiStatus("unavailable");
      return;
    }

    setIsPreparingAi(true);
    setAiStatus("downloading");
    try {
      const session = await LanguageModel.create({
        monitor(monitor) {
          monitor.addEventListener("downloadprogress", () => {
            setAiStatus("downloading");
          });
        },
      });
      session.destroy();
      await checkReadiness();
    } catch {
      setAiStatus("unavailable");
    } finally {
      setIsPreparingAi(false);
    }
  };

  return (
    <main className="mx-auto min-h-screen max-w-[760px] px-6 py-12 sm:px-10 sm:py-16">
      <header className="mb-10">
        <span className="mb-3 block font-mono text-[10px] font-medium uppercase tracking-[0.08em] text-accent-strong">
          Welcome to Glimpse
        </span>
        <h1 className="mb-3 max-w-[620px] text-[34px] font-semibold leading-[1.12] tracking-[-0.9px] text-ink sm:text-[40px]">
          Understand what you read without leaving the page.
        </h1>
        <p className="m-0 max-w-[580px] text-sm leading-relaxed text-ink-muted">
          Glimpse explains selected text with Chrome’s built-in AI, keeps the
          source attached, and saves the conversation in your local scrapbook.
        </p>
      </header>

      <section
        className="mb-10 grid gap-4 rounded-[var(--radius-lg)] bg-surface-raised p-5 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center"
        aria-labelledby="scrapbook-shortcut-title"
      >
        <div>
          <span className="mb-1 block font-mono text-[9px] font-medium uppercase tracking-[0.08em] text-ink-muted">
            Available on any supported page
          </span>
          <h2
            id="scrapbook-shortcut-title"
            className="mb-1.5 text-base font-semibold"
          >
            Your scrapbook has a shortcut
          </h2>
          <p className="m-0 text-xs leading-relaxed text-ink-muted">
            Press it again to close the scrapbook and return to reading.
          </p>
        </div>
        <KeyboardShortcut
          keys={["Alt / Option", "Shift", "G"]}
          label="Alt or Option plus Shift plus G"
          className="justify-self-start rounded-[var(--radius-md)] bg-surface-inset p-2 sm:justify-self-end"
        />
      </section>

      <SystemHealthCard
        aiStatus={aiStatus}
        identityStatus={identityStatus}
        isPreparingAi={isPreparingAi}
        onPrepareAi={prepareAi}
        onCheckAgain={checkReadiness}
      />

      <div className="mt-10 border-t border-hairline pt-10">
        <MagicHoldTutorial />
      </div>

      <footer className="mt-12 border-t border-hairline pt-5 text-[11px] leading-relaxed text-ink-muted">
        Reading context, identity, and conversations stay on this device.
      </footer>
    </main>
  );
}

export default App;

import { useEffect, useState } from "react";
import { MagicHoldTutorial } from "@/components/features/onboarding/MagicHoldTutorial";
import { SystemHealthCard } from "@/components/features/onboarding/SystemHealthCard";
import {
  checkAiCapabilities,
  type AiCapabilityStatus,
} from "@/shared/utils/ai-health-service";
import { getOrCreateIdentity } from "@/shared/utils/identity-service";

function App() {
  const [aiStatus, setAiStatus] = useState<AiCapabilityStatus | "checking">(
    "checking",
  );
  const [identityReady, setIdentityReady] = useState(false);

  useEffect(() => {
    const initialize = async () => {
      const [aiResult, idResult] = await Promise.all([
        checkAiCapabilities(),
        getOrCreateIdentity(),
      ]);

      setAiStatus(
        aiResult.success ? aiResult.data.available : "unavailable",
      );
      setIdentityReady(idResult.success);
    };
    initialize();
  }, []);

  return (
    <main className="mx-auto min-h-screen max-w-[720px] px-6 py-16 sm:px-10 sm:py-20">
      <header className="mb-10 border-b border-hairline pb-8">
        <span className="mb-3 block font-mono text-[10px] font-medium uppercase tracking-[0.08em] text-accent-strong">
          Local setup
        </span>
        <h1 className="mb-3 text-[32px] font-semibold tracking-[-0.7px] text-ink">
          Set up Glimpse
        </h1>
        <p className="m-0 max-w-[560px] text-sm leading-relaxed text-ink-muted">
          Check your local AI, then practice the highlight-and-hold gesture
          once. Your reading context and conversations stay on this device.
        </p>
      </header>

      <section aria-label="System readiness">
        <SystemHealthCard
          aiStatus={aiStatus}
          identityReady={identityReady}
        />
      </section>

      <div className="mt-10 border-t border-hairline pt-10">
        <MagicHoldTutorial />
      </div>
    </main>
  );
}

export default App;

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
    <div className="mx-auto my-20 max-w-[600px] rounded-[var(--radius-lg)] border border-hairline bg-surface p-10 shadow-[var(--shadow-popover)]">
      <header className="mb-10 text-center">
        <h1 className="mb-2 text-[32px] tracking-[-0.5px] text-accent-strong">
          Glimpse
        </h1>
        <div className="mx-auto h-0.5 w-10 bg-accent" />
      </header>

      <p className="text-serif mb-8 text-base leading-[1.6]">
        Your seamless learning partner is being initialized. Glimpse uses
        Chrome&apos;s local AI (Gemini Nano) to provide explanations of anything
        you read.
      </p>

      <div className="mt-10">
        <SystemHealthCard
          aiStatus={aiStatus}
          identityReady={identityReady}
        />
      </div>

      <div className="mt-12">
        <MagicHoldTutorial />
      </div>
    </div>
  );
}

export default App;

import { CapabilityInstructions } from "@/components/features/onboarding/CapabilityInstructions";
import { HealthStatusRow } from "@/components/features/onboarding/HealthStatusRow";
import { TutorialSelectionArea } from "@/components/features/onboarding/TutorialSelectionArea";
import { TutorialSuccessState } from "@/components/features/onboarding/TutorialSuccessState";

export function HealthStatusRowStory() {
  return (
    <div className="w-full max-w-md divide-y divide-hairline rounded-[var(--radius-md)] border border-hairline bg-surface-raised px-4">
      <HealthStatusRow
        label="Local identity"
        detail="Created and stored on this device."
        tone="ready"
      />
      <HealthStatusRow
        label="Built-in AI"
        detail="Downloading the local model in Chrome."
        tone="preparing"
      />
      <HealthStatusRow
        label="Browser support"
        detail="This browser is not currently ready for built-in AI."
        tone="unavailable"
      />
    </div>
  );
}

export function CapabilityInstructionsStory() {
  return (
    <div className="w-full max-w-md">
      <CapabilityInstructions onOpenChromeUrl={() => undefined} />
    </div>
  );
}

export function TutorialSelectionAreaStory() {
  return (
    <div className="w-full max-w-xl">
      <TutorialSelectionArea />
    </div>
  );
}

export function TutorialSuccessStateStory() {
  return (
    <div className="w-full max-w-md">
      <TutorialSuccessState />
    </div>
  );
}

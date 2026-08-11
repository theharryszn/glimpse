import type { MouseEvent as ReactMouseEvent } from "react";
import type { AiCapabilityStatus } from "@/shared/utils/ai-health-service";

interface SystemHealthCardProps {
  aiStatus: AiCapabilityStatus | "checking";
  identityReady: boolean;
  onOpenChromeUrl?: (url: string) => void;
}

export function SystemHealthCard({
  aiStatus,
  identityReady,
  onOpenChromeUrl = (url) => browser.tabs.create({ url }),
}: SystemHealthCardProps) {
  const isSystemReady = identityReady && aiStatus === "available";
  const openChromeUrl = (event: ReactMouseEvent, url: string) => {
    event.preventDefault();
    onOpenChromeUrl(url);
  };

  return (
    <section className="rounded-[var(--radius-md)] border border-hairline bg-surface-raised p-6">
      <h2 className="mb-4 text-lg">System Health</h2>

      <div className="mb-4">
        {isSystemReady ? (
          <p className="text-[15px] font-bold text-[green]">
            ✅ System Ready: AI is active.
          </p>
        ) : (
          <p className="text-[15px] text-ink-muted">⏳ System Preparing...</p>
        )}
      </div>

      <div className="text-sm">
        {identityReady ? (
          <p className="my-1 text-[green]">
            • Local Identity: Created and secure.
          </p>
        ) : (
          <p className="my-1 text-ink-muted">• Initializing identity...</p>
        )}

        {aiStatus === "checking" && (
          <p className="text-caption">• Checking AI capabilities...</p>
        )}
        {aiStatus === "available" && (
          <p className="my-1 text-[green]">• Hardware Support: Verified.</p>
        )}
        {aiStatus === "downloadable" && (
          <p className="my-1 text-accent-strong">
            • System Preparing: Model download required.
          </p>
        )}
        {aiStatus === "downloading" && (
          <p className="my-1 text-accent-strong">
            • System Preparing: Downloading local model...
          </p>
        )}
        {aiStatus === "unavailable" && (
          <div className="mt-4 text-[#d93025]">
            <p className="mb-2 font-semibold">❌ Hardware Not Supported</p>
            <p className="text-serif text-[13px] leading-[1.4]">
              Your current setup does not support built-in AI. To enable
              Glimpse, please follow these steps:
            </p>
            <ul className="pl-5 text-[13px] leading-normal">
              <li>Using Chrome 127+ (Dev/Canary recommended).</li>
              <li>
                Enable{" "}
                <a
                  href="chrome://flags/#prompt-api-for-gemini-nano"
                  onClick={(event) =>
                    openChromeUrl(
                      event,
                      "chrome://flags/#prompt-api-for-gemini-nano",
                    )
                  }
                >
                  #prompt-api-for-gemini-nano
                </a>
                .
              </li>
              <li>
                Enable{" "}
                <a
                  href="chrome://flags/#optimization-guide-on-device-model"
                  onClick={(event) =>
                    openChromeUrl(
                      event,
                      "chrome://flags/#optimization-guide-on-device-model",
                    )
                  }
                >
                  #optimization-guide-on-device-model
                </a>{" "}
                (set to &quot;Enabled BypassPerfRequirement&quot;).
              </li>
              <li>
                Visit{" "}
                <a
                  href="chrome://components"
                  onClick={(event) =>
                    openChromeUrl(event, "chrome://components")
                  }
                >
                  chrome://components
                </a>{" "}
                and update &quot;Optimization Guide On Device Model&quot;.
              </li>
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}

import { WarningCircle } from "@phosphor-icons/react";

interface AiErrorStateProps {
  message: string;
  code?: string;
}

export function AiErrorState({ message, code }: AiErrorStateProps) {
  return (
    <div
      className="flex min-w-0 items-start gap-2.5 rounded-[var(--radius-md)] border border-red-500/20 bg-red-500/10 p-3 text-red-700 dark:text-red-200"
      role="alert"
      aria-atomic="true"
    >
      <WarningCircle
        size={16}
        weight="fill"
        className="mt-0.5 shrink-0"
        aria-hidden
      />
      <div className="min-w-0">
        <p className="m-0 text-xs font-medium leading-4">
          Couldn’t complete the response
        </p>
        <p className="mb-0 mt-1 break-words text-xs leading-[1.55] text-red-800/80 [overflow-wrap:anywhere] dark:text-red-100/75">
          {message}
        </p>
        {code && (
          <span className="mt-1.5 block break-words font-mono text-[10px] leading-4 text-red-800/70 [overflow-wrap:anywhere] dark:text-red-100/60">
            Code: {code}
          </span>
        )}
      </div>
    </div>
  );
}

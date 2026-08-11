import { WarningCircle } from "@phosphor-icons/react";

interface AiErrorStateProps {
  message: string;
  code?: string;
}

export function AiErrorState({ message, code }: AiErrorStateProps) {
  return (
    <div className="flex min-w-0 gap-2 rounded-[var(--radius-lg)] border border-red-500/20 bg-red-500/10 p-2.5 text-red-700 dark:text-red-300">
      <WarningCircle size={16} className="mt-0.5 shrink-0" aria-hidden />
      <div className="min-w-0">
        <p className="m-0 break-words text-xs leading-[1.45] [overflow-wrap:anywhere]">
          {message}
        </p>
        {code && (
          <span className="mt-1 block break-words font-mono text-[9px] [overflow-wrap:anywhere]">
            {code}
          </span>
        )}
      </div>
    </div>
  );
}

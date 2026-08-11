import { WarningCircle } from "@phosphor-icons/react";

interface AiErrorStateProps {
  message: string;
  code?: string;
}

export function AiErrorState({ message, code }: AiErrorStateProps) {
  return (
    <div className="flex gap-2 rounded-[var(--radius-md)] border border-[#ffa39e] bg-[#fff1f0] p-2 text-[#b3261e] dark:border-[#7f312f] dark:bg-[#3a1717] dark:text-[#ff8a80]">
      <WarningCircle size={16} className="mt-0.5 shrink-0" aria-hidden />
      <div>
        <p className="m-0 text-xs leading-[1.45]">{message}</p>
        {code && <span className="mt-1 block font-mono text-[9px] opacity-70">{code}</span>}
      </div>
    </div>
  );
}

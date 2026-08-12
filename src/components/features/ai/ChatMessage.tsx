import { cn } from "@/shared/utils/classnames";
import type { ReactNode } from "react";

export type ChatRole = "user" | "assistant";

interface ChatMessageProps {
  role: ChatRole;
  children: ReactNode;
  className?: string;
}

export function ChatMessage({ role, children, className }: ChatMessageProps) {
  return (
    <div
      className={cn(
        "flex min-w-0",
        role === "user" ? "max-w-[86%] self-end" : "w-full self-start",
        className,
      )}
    >
      <div
        className={cn(
          "min-w-0 break-words text-[13px] leading-[1.62] text-ink [overflow-wrap:anywhere]",
          role === "user"
            ? "rounded-[14px] rounded-br-[5px] bg-surface-raised px-3 py-2"
            : "w-full px-0 py-0",
        )}
      >
        {typeof children === "string" ? (
          <p className="m-0">{children}</p>
        ) : (
          children
        )}
      </div>
    </div>
  );
}

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
        "flex max-w-[90%]",
        role === "user" ? "self-end" : "self-start",
        className,
      )}
    >
      <div
        className={cn(
          "rounded-[var(--radius-lg)] px-3 py-2 text-sm leading-[1.6]",
          role === "user"
            ? "rounded-br-[var(--radius-sm)] bg-accent text-ink"
            : "rounded-bl-[var(--radius-sm)] border border-hairline bg-accent-soft text-ink",
        )}
      >
        {typeof children === "string" ? <p className="m-0">{children}</p> : children}
      </div>
    </div>
  );
}

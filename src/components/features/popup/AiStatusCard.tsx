export type AiStatusTone = "idle" | "success" | "warning" | "error";

interface AiStatusCardProps {
  label: string;
  tone: AiStatusTone;
}

const dotClasses: Record<AiStatusTone, string> = {
  idle: "bg-[#9AA0A6] shadow-[0_0_6px_rgba(154,160,166,0.25)]",
  success: "bg-[#34A853] shadow-[0_0_6px_rgba(52,168,83,0.25)]",
  warning: "bg-[#FBBC04] shadow-[0_0_6px_rgba(251,188,4,0.25)]",
  error: "bg-[#EA4335] shadow-[0_0_6px_rgba(234,67,53,0.25)]",
};

export function AiStatusCard({ label, tone }: AiStatusCardProps) {
  return (
    <div className="flex items-center gap-2 rounded-lg border border-hairline bg-surface-raised px-3 py-2.5">
      <span
        className={`h-2 w-2 shrink-0 rounded-full ${dotClasses[tone]}`}
      />
      <span className="text-[13px] font-medium">Local AI: {label}</span>
    </div>
  );
}

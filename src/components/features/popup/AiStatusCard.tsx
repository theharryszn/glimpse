import { StatusIndicator, type StatusTone } from "@/components/ui/StatusIndicator";
import { Surface } from "@/components/ui/Surface";

export type AiStatusTone = StatusTone;

interface AiStatusCardProps {
  label: string;
  tone: AiStatusTone;
}

export function AiStatusCard({ label, tone }: AiStatusCardProps) {
  return (
    <Surface elevation="raised" className="px-3 py-2.5">
      <StatusIndicator label={`Local AI: ${label}`} tone={tone} />
    </Surface>
  );
}

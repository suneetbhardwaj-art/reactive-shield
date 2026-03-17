import { Radio, Cpu, Zap } from "lucide-react";

const CONTRACT = "0x4A3f...9C12";
const CHAIN_ID = "50312";

interface SomniaStatusProps {
  latestEvent: string;
  latestHash: string;
  eventCount: number;
}

export function SomniaStatus({ latestEvent, latestHash, eventCount }: SomniaStatusProps) {
  return (
    <div className="rounded-2xl bg-primary/5 border border-primary/10 p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Radio className="w-4 h-4 text-primary" />
          <span className="text-xs font-bold uppercase tracking-widest text-primary">Somnia Reactivity SDK</span>
        </div>
        <span className="flex items-center gap-1 text-xs text-green-400 font-semibold font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          LIVE
        </span>
      </div>

      <div className="space-y-2 text-xs">
        {[
          { label: "Subscription", value: "Active", color: "text-green-400" },
          { label: "Network", value: "Somnia Testnet", color: "text-primary" },
          { label: "Chain ID", value: CHAIN_ID, color: "text-foreground" },
          { label: "Contract", value: CONTRACT, color: "text-secondary" },
          { label: "Events Captured", value: String(eventCount), color: "text-foreground" },
          { label: "Reaction Latency", value: "< 50ms", color: "text-primary" },
          { label: "Latest Event", value: latestEvent || "—", color: "text-yellow-400" },
          { label: "Latest Hash", value: latestHash || "—", color: "text-muted-foreground" },
        ].map((row, i) => (
          <div key={i} className="flex justify-between items-center">
            <span className="text-muted-foreground">{row.label}</span>
            <span className={`font-mono font-semibold ${row.color} text-right truncate max-w-[120px]`}>{row.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

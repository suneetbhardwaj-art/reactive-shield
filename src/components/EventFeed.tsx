import { CheckCircle2, XCircle, Activity, Hash } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export type EventStatus = "ok" | "blocked" | "warning";

export interface FeedEvent {
  id: number;
  event: string;
  detail: string;
  hash: string;
  status: EventStatus;
  time: string;
}

interface EventFeedProps {
  events: FeedEvent[];
}

const STATUS_STYLES: Record<EventStatus, { icon: typeof CheckCircle2; color: string; label: string }> = {
  ok: { icon: CheckCircle2, color: "text-green-400", label: "OK" },
  warning: { icon: Activity, color: "text-yellow-400", label: "WARN" },
  blocked: { icon: XCircle, color: "text-destructive", label: "BLOCKED" },
};

export function EventFeed({ events }: EventFeedProps) {
  return (
    <div className="rounded-2xl bg-white/3 border border-white/5 p-5">
      <div className="flex items-center gap-2 mb-4">
        <Activity className="w-4 h-4 text-secondary" />
        <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Security Event Feed</span>
        <span className="ml-auto flex items-center gap-1 text-xs text-secondary font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
          STREAMING
        </span>
      </div>

      <div className="space-y-0 overflow-y-auto max-h-[240px] pr-1 scrollbar-thin">
        <AnimatePresence initial={false}>
          {events.map((entry, i) => {
            const s = STATUS_STYLES[entry.status];
            const Icon = s.icon;
            return (
              <motion.div
                key={entry.id}
                layout
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className={`flex items-start gap-3 py-2.5 border-b border-white/5 last:border-0 ${i === 0 ? "bg-white/2 -mx-1 px-1 rounded-lg" : ""}`}
              >
                <Icon className={`w-3.5 h-3.5 ${s.color} shrink-0 mt-0.5`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono text-xs font-semibold text-foreground/90">{entry.event}</span>
                    <span className={`text-xs font-bold px-1.5 py-0.5 rounded ${
                      entry.status === "ok" ? "bg-green-500/10 text-green-400"
                      : entry.status === "warning" ? "bg-yellow-500/10 text-yellow-400"
                      : "bg-destructive/10 text-destructive"
                    }`}>{s.label}</span>
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5 truncate">{entry.detail}</div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground/60 mt-0.5">
                    <Hash className="w-2.5 h-2.5" />
                    <span className="font-mono truncate">{entry.hash}</span>
                  </div>
                </div>
                <div className="text-xs text-muted-foreground shrink-0 font-mono">{entry.time}</div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}

import { useEffect } from "react";
import { AlertTriangle, AlertOctagon, Info, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export type AlertSeverity = "info" | "medium" | "high";

export interface Alert {
  id: number;
  severity: AlertSeverity;
  title: string;
  message: string;
  time: string;
}

interface AlertSystemProps {
  alerts: Alert[];
  onDismiss: (id: number) => void;
}

function AlertItem({ alert, onDismiss }: { alert: Alert; onDismiss: (id: number) => void }) {
  useEffect(() => {
    const timer = setTimeout(() => onDismiss(alert.id), 5000);
    return () => clearTimeout(timer);
  }, [alert.id, onDismiss]);

  const styles = {
    info: {
      border: "border-primary/30",
      bg: "bg-primary/10",
      icon: Info,
      iconColor: "text-primary",
      titleColor: "text-primary",
    },
    medium: {
      border: "border-yellow-500/30",
      bg: "bg-yellow-500/10",
      icon: AlertTriangle,
      iconColor: "text-yellow-400",
      titleColor: "text-yellow-400",
    },
    high: {
      border: "border-destructive/40",
      bg: "bg-destructive/10",
      icon: AlertOctagon,
      iconColor: "text-destructive",
      titleColor: "text-destructive",
    },
  }[alert.severity];

  const Icon = styles.icon;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 40, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 40, scale: 0.9 }}
      transition={{ type: "spring", bounce: 0.25, duration: 0.4 }}
      className={`rounded-xl border ${styles.border} ${styles.bg} p-3.5 relative`}
    >
      {/* Auto-dismiss progress bar */}
      <motion.div
        className="absolute bottom-0 left-0 h-0.5 rounded-full bg-current opacity-30"
        style={{ color: "inherit" }}
        initial={{ width: "100%" }}
        animate={{ width: "0%" }}
        transition={{ duration: 5, ease: "linear" }}
      />

      <div className="flex items-start gap-3">
        <Icon className={`w-4 h-4 ${styles.iconColor} shrink-0 mt-0.5`} />
        <div className="flex-1 min-w-0">
          <div className={`text-xs font-bold ${styles.titleColor} mb-0.5`}>{alert.title}</div>
          <div className="text-xs text-muted-foreground leading-snug">{alert.message}</div>
          <div className="text-xs text-muted-foreground/60 mt-1">{alert.time}</div>
        </div>
        <button
          onClick={() => onDismiss(alert.id)}
          className="text-muted-foreground/40 hover:text-muted-foreground transition-colors shrink-0"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </motion.div>
  );
}

export function AlertSystem({ alerts, onDismiss }: AlertSystemProps) {
  return (
    <div className="rounded-2xl bg-white/3 border border-white/5 p-5">
      <div className="flex items-center gap-2 mb-4">
        <AlertOctagon className="w-4 h-4 text-destructive" />
        <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Security Alerts</span>
        <AnimatePresence>
          {alerts.length > 0 && (
            <motion.span
              key="badge"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="ml-auto bg-destructive text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
            >
              {alerts.length}
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      <div className="space-y-2 min-h-[80px]">
        <AnimatePresence mode="popLayout">
          {alerts.length === 0 ? (
            <motion.div
              key="clear"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center h-20 text-xs text-muted-foreground gap-2"
            >
              <div className="w-8 h-8 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                <Info className="w-4 h-4 text-green-400" />
              </div>
              All clear — monitoring active
            </motion.div>
          ) : (
            alerts.map(alert => (
              <AlertItem key={alert.id} alert={alert} onDismiss={onDismiss} />
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

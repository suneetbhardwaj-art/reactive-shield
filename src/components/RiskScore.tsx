import { ShieldAlert, ShieldCheck, ShieldX } from "lucide-react";
import { motion } from "framer-motion";

interface RiskScoreProps {
  score: number;
}

export function RiskScore({ score }: RiskScoreProps) {
  const isLow = score < 30;
  const isMedium = score >= 30 && score < 70;
  const isHigh = score >= 70;

  const color = isLow ? "text-green-400" : isMedium ? "text-yellow-400" : "text-destructive";
  const barColor = isLow ? "bg-green-500" : isMedium ? "bg-yellow-500" : "bg-destructive";
  const bgColor = isLow ? "bg-green-500/5 border-green-500/10" : isMedium ? "bg-yellow-500/5 border-yellow-500/10" : "bg-destructive/5 border-destructive/10";
  const label = isLow ? "SAFE" : isMedium ? "MEDIUM RISK" : "HIGH RISK";
  const Icon = isLow ? ShieldCheck : isMedium ? ShieldAlert : ShieldX;

  return (
    <div className={`rounded-2xl border p-5 transition-colors duration-500 ${bgColor}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Icon className={`w-4 h-4 ${color}`} />
          <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Risk Score</span>
        </div>
        <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${
          isLow ? "bg-green-500/10 border-green-500/20 text-green-400"
          : isMedium ? "bg-yellow-500/10 border-yellow-500/20 text-yellow-400"
          : "bg-destructive/10 border-destructive/20 text-destructive"
        }`}>
          {label}
        </span>
      </div>

      {/* Big number */}
      <div className={`text-5xl font-display font-bold mb-1 ${color}`}>
        {score}
        <span className="text-xl text-muted-foreground">/100</span>
      </div>

      {/* Bar */}
      <div className="relative h-2.5 bg-white/5 rounded-full overflow-hidden mt-3 mb-4">
        <motion.div
          className={`absolute top-0 left-0 h-full rounded-full ${barColor}`}
          animate={{ width: `${score}%` }}
          transition={{ type: "spring", bounce: 0, duration: 0.6 }}
        />
      </div>

      {/* Thresholds */}
      <div className="flex justify-between text-xs text-muted-foreground">
        <span className="text-green-400">Safe</span>
        <span className="text-yellow-400">Medium</span>
        <span className="text-destructive">High</span>
      </div>
      <div className="relative h-px bg-white/5 mt-1">
        <div className="absolute left-[30%] top-0 w-px h-2 -translate-y-1 bg-yellow-500/30" />
        <div className="absolute left-[70%] top-0 w-px h-2 -translate-y-1 bg-destructive/30" />
      </div>
    </div>
  );
}

import { useState, useRef, useCallback } from "react";
import { Fingerprint, Activity, RotateCcw, Play, AlertTriangle, Skull } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { WalletConnect } from "@/components/WalletConnect";
import { RiskScore } from "@/components/RiskScore";
import { SomniaStatus } from "@/components/SomniaStatus";
import { AlertSystem, type Alert } from "@/components/AlertSystem";
import { EventFeed, type FeedEvent } from "@/components/EventFeed";

type SimType = "normal" | "large" | "suspicious";
type ScanState = "idle" | "scanning" | "result";

function shortHash() {
  return "0x" + Math.random().toString(16).slice(2, 10) + "..." + Math.random().toString(16).slice(2, 6);
}
function nowStr() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
}

const SIM_CONFIG = {
  normal: {
    label: "Simulate Normal Transaction",
    icon: Play,
    buttonClass: "border-primary/30 text-primary hover:bg-primary/10",
    scanLabel: "Analyzing transaction…",
    targetScore: 18,
    alertSeverity: "info" as const,
    alertTitle: "Transaction Detected",
    alertMessage: "Normal transaction verified. Risk score: LOW. Proceeding safely.",
    events: [
      { event: "TransactionDetected", detail: "0x72A...3F91 → 0xBc4...7F22 — 0.12 ETH", status: "ok" as const },
    ],
    resultType: "ok" as const,
  },
  large: {
    label: "Simulate Large Transfer",
    icon: AlertTriangle,
    buttonClass: "border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10",
    scanLabel: "Detecting large transfer…",
    targetScore: 62,
    alertSeverity: "medium" as const,
    alertTitle: "⚠ Large Transfer Detected",
    alertMessage: "1 ETH outflow flagged. High-value transfer requires manual review.",
    events: [
      { event: "LargeTransfer", detail: "0x72A...3F91 → 0xA92...91BC — 1 ETH", status: "warning" as const },
      { event: "TransactionDetected", detail: "Large value transfer initiated on Somnia Testnet", status: "warning" as const },
    ],
    resultType: "warning" as const,
  },
  suspicious: {
    label: "Simulate Suspicious Interaction",
    icon: Skull,
    buttonClass: "border-destructive/30 text-destructive hover:bg-destructive/10",
    scanLabel: "Scanning for suspicious activity…",
    targetScore: 91,
    alertSeverity: "high" as const,
    alertTitle: "⚠ High Risk Activity — BLOCKED",
    alertMessage: "Unknown contract interaction detected. Reactive contract blocked execution on Somnia Testnet.",
    events: [
      { event: "SuspiciousInteraction", detail: "Unknown contract call: 0xDEAD...BEEF — drainer pattern", status: "blocked" as const },
      { event: "LargeTransfer", detail: "Attempted rapid token drain blocked by Reactive Shield", status: "blocked" as const },
      { event: "SecurityAlertTriggered", detail: "Reactive contract intercepted and halted transaction", status: "blocked" as const },
    ],
    resultType: "blocked" as const,
  },
};

const INITIAL_EVENTS: FeedEvent[] = [
  { id: 1, event: "ReactivitySDK", detail: "Somnia Reactivity SDK subscriptions initialized", hash: shortHash(), status: "ok", time: "12:00:51" },
  { id: 2, event: "WalletConnected", detail: "0x72A...3F91 connected to Somnia Testnet", hash: shortHash(), status: "ok", time: "12:01:04" },
  { id: 3, event: "MonitoringActive", detail: "Subscribed to: LargeTransfer, SuspiciousInteraction", hash: shortHash(), status: "ok", time: "12:01:09" },
];

export function DemoDashboard() {
  const [walletConnected, setWalletConnected] = useState(true);
  const [riskScore, setRiskScore] = useState(12);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [events, setEvents] = useState<FeedEvent[]>(INITIAL_EVENTS);
  const [scanState, setScanState] = useState<ScanState>("idle");
  const [activeSim, setActiveSim] = useState<SimType | null>(null);
  const [progress, setProgress] = useState(0);
  const [lastResult, setLastResult] = useState<"ok" | "warning" | "blocked" | null>(null);
  const idRef = useRef(200);

  const latestEvent = events[0]?.event ?? "—";
  const latestHash = events[0]?.hash ?? "—";

  const dismissAlert = useCallback((id: number) => {
    setAlerts(prev => prev.filter(a => a.id !== id));
  }, []);

  const runSim = (type: SimType) => {
    if (scanState === "scanning") return;

    const cfg = SIM_CONFIG[type];
    setActiveSim(type);
    setScanState("scanning");
    setProgress(0);
    setLastResult(null);

    // Animate progress bar
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { clearInterval(interval); return 100; }
        return p + 4;
      });
    }, 60);

    // Animate risk score
    const startScore = riskScore;
    const target = cfg.targetScore;
    const step = (target - startScore) / 30;
    let current = startScore;
    const scoreInterval = setInterval(() => {
      current += step;
      if ((step > 0 && current >= target) || (step < 0 && current <= target)) {
        clearInterval(scoreInterval);
        setRiskScore(target);
      } else {
        setRiskScore(Math.round(current));
      }
    }, 50);

    // After scan completes
    setTimeout(() => {
      clearInterval(interval);
      setProgress(100);
      setRiskScore(target);
      setScanState("result");
      setLastResult(cfg.resultType);

      // Push alert
      setAlerts(prev => [{
        id: idRef.current++,
        severity: cfg.alertSeverity,
        title: cfg.alertTitle,
        message: cfg.alertMessage,
        time: nowStr(),
      }, ...prev.slice(0, 4)]);

      // Push events to feed
      const newEvents: FeedEvent[] = cfg.events.map(e => ({
        id: idRef.current++,
        ...e,
        hash: shortHash(),
        time: nowStr(),
      }));
      setEvents(prev => [...newEvents, ...prev].slice(0, 20));

    }, 1800);
  };

  const reset = () => {
    setScanState("idle");
    setActiveSim(null);
    setProgress(0);
    setRiskScore(12);
    setLastResult(null);
  };

  return (
    <section id="demo" className="py-28 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-12">
          <h2 className="text-sm font-bold tracking-widest text-primary uppercase mb-3">Interactive Demo</h2>
          <h3 className="text-3xl md:text-5xl font-display font-bold mb-4">Real-Time Security Dashboard</h3>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Trigger blockchain events and watch the <span className="text-primary font-semibold">Somnia Reactivity SDK</span> respond
            instantly — alerts, risk scores, and event feed update live.
          </p>
        </div>

        {/* Dashboard Frame */}
        <div className="rounded-3xl border border-white/10 bg-black/40 backdrop-blur-2xl shadow-2xl overflow-hidden">

          {/* Title bar */}
          <div className="h-11 bg-white/5 border-b border-white/10 flex items-center px-5 gap-3">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <div className="flex-1 text-center text-xs font-mono text-muted-foreground flex items-center justify-center gap-2">
              <Fingerprint className="w-3 h-3" />
              REACTIVE-SHIELD — Somnia Testnet
            </div>
            <div className="flex items-center gap-1.5 text-xs text-green-400 font-mono font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              LIVE
            </div>
          </div>

          {/* Main Grid */}
          <div className="p-4 md:p-6 grid lg:grid-cols-12 gap-5">

            {/* ── Left Column (4 cols): Wallet + Risk + Somnia ── */}
            <div className="lg:col-span-4 space-y-4">
              <WalletConnect connected={walletConnected} onConnect={() => setWalletConnected(true)} />
              <RiskScore score={riskScore} />
              <SomniaStatus
                latestEvent={latestEvent}
                latestHash={latestHash}
                eventCount={events.length}
              />
            </div>

            {/* ── Right Column (8 cols): Controls + Alerts + Feed ── */}
            <div className="lg:col-span-8 flex flex-col gap-4">

              {/* Simulation Controls */}
              <div className="rounded-2xl bg-white/3 border border-white/5 p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Activity className="w-4 h-4 text-primary" />
                  <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Interactive Demo Controls</span>
                  <span className="ml-auto text-xs text-muted-foreground">Click a button to simulate a blockchain event</span>
                </div>

                <div className="grid sm:grid-cols-3 gap-3 mb-5">
                  {(Object.keys(SIM_CONFIG) as SimType[]).map(type => {
                    const cfg = SIM_CONFIG[type];
                    const Icon = cfg.icon;
                    const isActive = activeSim === type && scanState === "scanning";
                    return (
                      <button
                        key={type}
                        onClick={() => runSim(type)}
                        disabled={scanState === "scanning"}
                        className={`relative flex flex-col items-center gap-2 p-4 rounded-xl border text-sm font-semibold transition-all
                          ${cfg.buttonClass}
                          ${scanState === "scanning" ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:scale-[1.02]"}
                          ${isActive ? "ring-1 ring-inset ring-current" : ""}
                        `}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="text-center text-xs leading-tight">{cfg.label}</span>
                        {isActive && (
                          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-current animate-ping" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Scan Status */}
                <AnimatePresence mode="wait">
                  {scanState === "idle" && (
                    <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      className="text-xs text-muted-foreground text-center py-3">
                      Choose a simulation above to trigger a Somnia Reactivity SDK event
                    </motion.div>
                  )}

                  {scanState === "scanning" && (
                    <motion.div key="scanning" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                      className="space-y-2">
                      <div className="text-primary text-sm font-bold flex items-center gap-2 animate-pulse">
                        <Activity className="w-4 h-4 animate-spin" />
                        {activeSim ? SIM_CONFIG[activeSim].scanLabel : "Scanning…"}
                      </div>
                      <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
                        <motion.div
                          className="h-full bg-primary rounded-full"
                          animate={{ width: `${progress}%` }}
                          transition={{ duration: 0.1 }}
                        />
                      </div>
                      <div className="text-xs text-muted-foreground">Somnia Reactivity SDK analyzing on-chain data…</div>
                    </motion.div>
                  )}

                  {scanState === "result" && lastResult && (
                    <motion.div key="result" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                      {lastResult === "ok" && (
                        <div className="flex items-center justify-between p-3 rounded-xl bg-green-500/10 border border-green-500/20">
                          <span className="text-green-400 text-sm font-bold">✓ Transaction safe — proceeded normally</span>
                          <button onClick={reset} className="text-xs text-muted-foreground flex items-center gap-1 hover:text-foreground transition-colors">
                            <RotateCcw className="w-3 h-3" /> Reset
                          </button>
                        </div>
                      )}
                      {lastResult === "warning" && (
                        <div className="flex items-center justify-between p-3 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
                          <span className="text-yellow-400 text-sm font-bold">⚡ Large transfer flagged — review required</span>
                          <button onClick={reset} className="text-xs text-muted-foreground flex items-center gap-1 hover:text-foreground transition-colors">
                            <RotateCcw className="w-3 h-3" /> Reset
                          </button>
                        </div>
                      )}
                      {lastResult === "blocked" && (
                        <div className="flex items-center justify-between p-3 rounded-xl bg-destructive/10 border border-destructive/30">
                          <span className="text-destructive text-sm font-bold">✗ Transaction BLOCKED by Reactive Contract</span>
                          <button onClick={reset} className="text-xs text-muted-foreground flex items-center gap-1 hover:text-foreground transition-colors">
                            <RotateCcw className="w-3 h-3" /> Reset
                          </button>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Alerts + Event Feed (2 cols) */}
              <div className="grid md:grid-cols-2 gap-4">
                <AlertSystem alerts={alerts} onDismiss={dismissAlert} />
                <EventFeed events={events} />
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

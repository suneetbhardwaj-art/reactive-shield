import { motion } from "framer-motion";
import { ExternalLink, Hash, Cpu, Radio, Zap, CheckCircle2 } from "lucide-react";

const CONTRACT_ADDRESS = "0x4A3f...9C12";
const TX_HASH = "0xb82a...f301";
const LATEST_EVENT = "LargeTransactionDetected";
const BLOCK = "7,421,083";

const events = [
  { name: "LargeTransactionDetected", time: "Just now", status: "blocked" },
  { name: "SecurityAlertTriggered", time: "2s ago", status: "blocked" },
  { name: "WalletConnected", time: "18s ago", status: "ok" },
  { name: "TokenTransfer", time: "45s ago", status: "ok" },
];

const howReactivityWorks = [
  {
    step: "01",
    title: "Subscribe to Events",
    desc: "ReactiveShield uses the Somnia Reactivity SDK to subscribe to live on-chain events — LargeTransfer, UnknownContractInteraction, RapidTokenTransfer.",
  },
  {
    step: "02",
    title: "Reactive Smart Contract Fires",
    desc: "When a suspicious event is detected, the Reactive contract deployed on Somnia Testnet immediately evaluates the risk and triggers a response.",
  },
  {
    step: "03",
    title: "UI Updates Instantly",
    desc: "The dashboard updates in real time without a page refresh — security alerts appear, risk score rises, and the event log records the blocked transaction.",
  },
  {
    step: "04",
    title: "Transaction Blocked",
    desc: "If the risk score exceeds the threshold, the reactive contract blocks the transaction at the protocol level before it reaches the destination.",
  },
];

export function SomniaDeployment() {
  return (
    <section id="somnia" className="py-28 relative z-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 text-secondary font-medium text-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            Deployed on Somnia Testnet
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
            Somnia <span className="text-gradient">Integration</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            ReactiveShield's smart contracts are live on Somnia Testnet. The Somnia Reactivity SDK powers every real-time detection event — no polling, no delays.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6 mb-10">

          {/* Contract Info Card */}
          <motion.div
            className="rounded-2xl border border-white/10 bg-card/50 backdrop-blur-md p-6"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 mb-6">
              <div className="w-9 h-9 rounded-xl bg-secondary/10 border border-secondary/20 flex items-center justify-center">
                <Cpu className="w-4 h-4 text-secondary" />
              </div>
              <h4 className="font-display font-bold text-lg">Testnet Deployment Info</h4>
            </div>

            <div className="space-y-4 font-mono text-sm">
              {[
                { label: "Contract Address", value: CONTRACT_ADDRESS, color: "text-primary" },
                { label: "Transaction Hash", value: TX_HASH, color: "text-secondary" },
                { label: "Latest Event", value: LATEST_EVENT, color: "text-destructive" },
                { label: "Block Number", value: BLOCK, color: "text-foreground" },
                { label: "Network", value: "Somnia Testnet", color: "text-green-400" },
                { label: "SDK", value: "Somnia Reactivity SDK v1", color: "text-muted-foreground" },
              ].map((row, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/3 border border-white/5">
                  <span className="text-muted-foreground text-xs">{row.label}</span>
                  <div className="flex items-center gap-2">
                    <span className={`${row.color} font-semibold text-xs`}>{row.value}</span>
                    {(row.label === "Contract Address" || row.label === "Transaction Hash") && (
                      <ExternalLink className="w-3 h-3 text-muted-foreground cursor-pointer hover:text-primary transition-colors" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Live Event Stream */}
          <motion.div
            className="rounded-2xl border border-white/10 bg-card/50 backdrop-blur-md p-6"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 mb-6">
              <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                <Radio className="w-4 h-4 text-primary" />
              </div>
              <h4 className="font-display font-bold text-lg">Live Reactivity Stream</h4>
              <span className="ml-auto flex items-center gap-1.5 text-xs text-green-400 font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                SUBSCRIBED
              </span>
            </div>

            <div className="space-y-3 mb-6">
              {events.map((ev, i) => (
                <motion.div
                  key={i}
                  className={`flex items-center justify-between p-3 rounded-xl border ${
                    ev.status === "blocked"
                      ? "bg-destructive/10 border-destructive/20"
                      : "bg-white/3 border-white/5"
                  }`}
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center gap-3">
                    <Hash className={`w-3.5 h-3.5 ${ev.status === "blocked" ? "text-destructive" : "text-primary"}`} />
                    <span className="font-mono text-sm text-foreground">{ev.name}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-muted-foreground">{ev.time}</span>
                    <span className={`font-bold uppercase ${ev.status === "blocked" ? "text-destructive" : "text-green-400"}`}>
                      {ev.status === "blocked" ? "BLOCKED" : "OK"}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="p-4 rounded-xl bg-secondary/5 border border-secondary/10 text-xs text-muted-foreground leading-relaxed">
              <span className="text-secondary font-semibold block mb-1">Somnia Reactivity SDK</span>
              Events are delivered via reactive subscriptions — no polling. Every on-chain event triggers an instant UI update and contract response.
            </div>
          </motion.div>
        </div>

        {/* How Reactivity Works — 4 steps */}
        <motion.div
          className="rounded-2xl border border-white/10 bg-card/50 backdrop-blur-md p-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-10">
            <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
              <Zap className="w-4 h-4 text-primary" />
            </div>
            <h4 className="font-display font-bold text-xl">How Somnia Reactivity Works</h4>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {howReactivityWorks.map((item, i) => (
              <div key={i} className="relative flex lg:flex-row items-stretch">
                {/* Step Card */}
                <motion.div
                  className="flex-1 rounded-2xl border border-primary/15 bg-gradient-to-b from-primary/5 to-transparent p-5 flex flex-col gap-3"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.12 }}
                  viewport={{ once: true }}
                >
                  {/* Number Badge */}
                  <div className="flex items-center gap-3 mb-1">
                    <div className="w-10 h-10 rounded-xl bg-primary text-background flex items-center justify-center font-display font-bold text-lg shadow-[0_0_18px_hsl(var(--primary)/0.45)] shrink-0">
                      {item.step}
                    </div>
                    <div className="h-px flex-1 bg-gradient-to-r from-primary/30 to-transparent" />
                  </div>

                  <h5 className="font-bold text-sm text-foreground leading-snug">{item.title}</h5>
                  <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                </motion.div>

                {/* Connector Arrow between cards */}
                {i < howReactivityWorks.length - 1 && (
                  <div className="hidden lg:flex items-center justify-center w-6 shrink-0">
                    <svg width="20" height="16" viewBox="0 0 20 16" fill="none">
                      <path d="M0 8h16M10 2l8 6-8 6" stroke="hsl(var(--primary))" strokeOpacity="0.5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}

import { motion } from "framer-motion";
import { Wallet, Code2, ShieldCheck, BellRing, ArrowDown, ArrowRight } from "lucide-react";

const steps = [
  {
    icon: Wallet,
    label: "User Transaction",
    description: "The user initiates a crypto transfer from their Web3 wallet — just like any normal transaction.",
    color: "primary",
    detail: "Standard wallet interaction (MetaMask, WalletConnect, etc.)",
  },
  {
    icon: Code2,
    label: "Reactive Smart Contract",
    description: "ReactiveShield's on-chain contract intercepts the transaction in the mempool before it is mined.",
    color: "secondary",
    detail: "Zero latency — reacts at the protocol level, not the UI level",
  },
  {
    icon: ShieldCheck,
    label: "Risk Analysis",
    description: "The destination address is scored against scam databases, heuristic patterns, and phishing history.",
    color: "primary",
    detail: "Cross-referenced with 50M+ flagged addresses in real time",
  },
  {
    icon: BellRing,
    label: "Security Warning",
    description: "If the address is flagged, the transaction is blocked and the user receives an immediate on-screen alert.",
    color: "destructive",
    detail: "No funds lost — protection happens before block confirmation",
  },
];

const colorMap: Record<string, { card: string; icon: string; badge: string }> = {
  primary: {
    card: "border-primary/30 shadow-[0_0_30px_hsl(var(--primary)/0.12)]",
    icon: "bg-primary/15 border-primary/30 text-primary",
    badge: "bg-primary/10 text-primary border-primary/20",
  },
  secondary: {
    card: "border-secondary/30 shadow-[0_0_30px_hsl(var(--secondary)/0.12)]",
    icon: "bg-secondary/15 border-secondary/30 text-secondary",
    badge: "bg-secondary/10 text-secondary border-secondary/20",
  },
  destructive: {
    card: "border-destructive/30 shadow-[0_0_30px_hsl(var(--destructive)/0.12)]",
    icon: "bg-destructive/15 border-destructive/30 text-destructive",
    badge: "bg-destructive/10 text-destructive border-destructive/20",
  },
};

export function ArchitectureDiagram() {
  return (
    <section className="py-28 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold tracking-widest text-primary uppercase mb-3">Architecture</h2>
          <h3 className="text-3xl md:text-5xl font-display font-bold mb-4">
            How <span className="text-gradient">ReactiveShield</span> Works
          </h3>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A fully automated pipeline that stops scams at the protocol level — before your funds ever leave your wallet.
          </p>
        </div>

        {/* 2x2 Grid layout */}
        <div className="grid md:grid-cols-2 gap-6">
          {steps.map((step, i) => {
            const c = colorMap[step.color];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15, duration: 0.55 }}
                viewport={{ once: true }}
                className={`relative rounded-2xl border backdrop-blur-xl bg-card/50 p-8 flex gap-6 items-start ${c.card}`}
              >
                {/* Step number */}
                <div className="absolute top-5 right-5 w-7 h-7 rounded-full bg-background/80 border border-white/10 flex items-center justify-center text-xs font-bold text-muted-foreground">
                  {i + 1}
                </div>

                {/* Icon */}
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 border ${c.icon}`}>
                  <step.icon className="w-8 h-8" />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="font-display font-bold text-xl text-foreground mb-2">{step.label}</div>
                  <p className="text-muted-foreground leading-relaxed mb-4">{step.description}</p>
                  <div className={`inline-flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-full border ${c.badge}`}>
                    {step.detail}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Flow connector row */}
        <div className="mt-10 flex items-center justify-center gap-3 flex-wrap">
          {steps.map((step, i) => {
            const c = colorMap[step.color];
            return (
              <div key={i} className="flex items-center gap-3">
                <div className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-semibold ${c.badge}`}>
                  <step.icon className="w-4 h-4" />
                  {step.label}
                </div>
                {i < steps.length - 1 && (
                  <ArrowRight className="w-4 h-4 text-muted-foreground shrink-0" />
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

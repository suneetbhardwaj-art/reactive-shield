import { Wallet, Search, ShieldCheck, BellRing, ArrowRight } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { motion } from "framer-motion";

export function HowItWorks() {
  const steps = [
    {
      icon: Wallet,
      title: "User Initiates Transaction",
      desc: "You send a transaction or interact with a dApp using your standard Web3 wallet.",
      glow: "none" as const,
      color: "text-blue-400",
      bg: "bg-blue-400/10"
    },
    {
      icon: Search,
      title: "Smart Contract Scans Address",
      desc: "ReactiveShield's on-chain contract instantly analyzes the destination address against our threat database.",
      glow: "primary" as const,
      color: "text-primary",
      bg: "bg-primary/10"
    },
    {
      icon: ShieldCheck,
      title: "Risk Analysis Performed",
      desc: "Advanced heuristics score the address for scam patterns, phishing history, and honeypot behavior.",
      glow: "none" as const,
      color: "text-secondary",
      bg: "bg-secondary/10"
    },
    {
      icon: BellRing,
      title: "Security Warning Triggered",
      desc: "If the address is suspicious, the transaction is blocked and you receive an immediate on-screen alert.",
      glow: "destructive" as const,
      color: "text-destructive",
      bg: "bg-destructive/10"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.25 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section id="how-it-works" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold tracking-widest text-primary uppercase mb-3">The Process</h2>
          <h3 className="text-3xl md:text-5xl font-display font-bold">How <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">ReactiveShield</span> Works</h3>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 relative"
        >
          {/* Animated connecting line */}
          <div className="hidden lg:block absolute top-1/3 left-0 right-0 h-px bg-white/5 z-0">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-400/40 via-primary/60 via-secondary/60 to-destructive/60"
              initial={{ width: "0%" }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 0.5 }}
            />
          </div>

          {steps.map((step, index) => (
            <motion.div key={index} variants={itemVariants} className="relative z-10">
              <GlassCard glowColor={step.glow} className="p-6 h-full">
                <div className="relative mb-5">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${step.bg} border border-white/5`}>
                    <step.icon className={`w-7 h-7 ${step.color}`} />
                  </div>
                  <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-background border border-white/10 flex items-center justify-center font-display font-bold text-sm shadow-lg">
                    {index + 1}
                  </div>
                </div>
                <h4 className="text-lg font-bold mb-2">{step.title}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
              </GlassCard>

              {/* Mobile arrow */}
              {index < steps.length - 1 && (
                <div className="lg:hidden flex justify-center py-3">
                  <ArrowRight className="w-5 h-5 text-white/20 rotate-90" />
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

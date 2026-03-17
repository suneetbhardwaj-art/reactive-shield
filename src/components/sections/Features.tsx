import { Crosshair, Code2, Activity, AlertTriangle, LayoutDashboard } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { motion } from "framer-motion";

export function Features() {
  const features = [
    {
      title: "Real-Time Scam Detection",
      desc: "Instantly cross-references receiver addresses with live global threat databases before any transaction executes.",
      icon: Crosshair,
    },
    {
      title: "Reactive Smart Contract Protection",
      desc: "On-chain contracts react to pending mempool data and intercept malicious payload executions automatically.",
      icon: Code2,
    },
    {
      title: "Wallet Risk Monitoring",
      desc: "Continuously monitors all connected wallets and scores them against known scam patterns and behaviors.",
      icon: Activity,
    },
    {
      title: "Large Transaction Alerts",
      desc: "Adds extra verification and friction for unusual high-volume fund transfers to protect against drainer attacks.",
      icon: AlertTriangle,
    },
    {
      title: "On-Chain Security Dashboard",
      desc: "A comprehensive health score and full security history for every connected wallet in your portfolio.",
      icon: LayoutDashboard,
    },
  ];

  return (
    <section id="features" className="py-24 relative z-10 bg-background/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 md:flex justify-between items-end">
          <div className="max-w-2xl">
            <h2 className="text-sm font-bold tracking-widest text-secondary uppercase mb-3">Defense Suite</h2>
            <h3 className="text-3xl md:text-5xl font-display font-bold mb-4">Enterprise-Grade <br/>Security Features</h3>
            <p className="text-muted-foreground text-lg">Comprehensive protection against phishing, honeypots, and malicious contracts.</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <GlassCard className="p-6 h-full group" hoverEffect>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-6 h-6 text-foreground group-hover:text-primary transition-colors duration-300" />
                </div>
                <h4 className="text-xl font-bold mb-2">{feature.title}</h4>
                <p className="text-muted-foreground">{feature.desc}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

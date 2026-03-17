import { Lock, Zap, Clock, Globe, ShieldCheck, TrendingUp, Building2 } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { motion } from "framer-motion";

export function WhyReactive() {
  const stats = [
    { value: "$4.3B", label: "Lost to crypto scams in 2023", icon: Lock },
    { value: "99%", label: "Phishing attacks prevented", icon: Zap },
    { value: "0.0s", label: "User action required", icon: Clock },
  ];

  const productPotential = [
    {
      icon: Globe,
      title: "Web3 Security Infrastructure",
      desc: "ReactiveShield can become a protocol-level security layer adopted by every major DeFi platform and wallet provider.",
    },
    {
      icon: ShieldCheck,
      title: "Enterprise Wallet Protection",
      desc: "Institutions managing large crypto portfolios need automated, real-time transaction monitoring — exactly what ReactiveShield provides.",
    },
    {
      icon: TrendingUp,
      title: "SDK for Developers",
      desc: "Package the reactive scanning engine as an SDK so any dApp can integrate scam protection in minutes using the Somnia Reactivity SDK.",
    },
    {
      icon: Building2,
      title: "On-Chain Insurance",
      desc: "Partner with DeFi insurance protocols to offer coverage discounts for wallets protected by ReactiveShield — aligning incentives.",
    },
  ];

  return (
    <section id="security" className="py-24 relative z-10 border-t border-white/5 bg-gradient-to-b from-transparent to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Why It Matters */}
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold tracking-widest text-primary uppercase mb-3">The Problem</h2>
          <h3 className="text-3xl md:text-5xl font-display font-bold mb-4">Why This <span className="text-gradient">Matters</span></h3>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Crypto scams cause <strong className="text-foreground">billions of dollars in losses every year</strong>. ReactiveShield provides an automated security layer powered by the <span className="text-primary font-semibold">Somnia Reactivity SDK</span> that reacts instantly and protects users before funds are lost.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          <div>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              Why <span className="text-gradient">Reactive Security</span> Matters
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Traditional Web3 security relies on users reading complex code or post-mortem analysis after funds are already drained.
              <br/><br/>
              ReactiveShield introduces a paradigm shift: <strong className="text-foreground">pre-execution interception</strong> powered by Somnia Reactivity. Smart contracts subscribe to live blockchain events and react in real time — stopping malicious transfers before the block is mined with zero user action required.
            </p>
            <div className="flex gap-4 flex-wrap">
              {["Proactive Defense", "Automated", "Non-Custodial", "Somnia-Powered"].map((tag, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-primary' : i === 1 ? 'bg-secondary' : i === 2 ? 'bg-white' : 'bg-green-400'}`} />
                  <span className="text-sm font-medium">{tag}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {stats.map((stat, i) => (
              <GlassCard key={i} className={`p-8 ${i === 2 ? 'sm:col-span-2' : ''}`} glowColor={i === 0 ? "destructive" : "primary"}>
                <stat.icon className={`w-8 h-8 mb-4 ${i === 0 ? 'text-destructive' : 'text-primary'}`} />
                <div className="text-4xl font-display font-bold text-foreground mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* Potential Product Section */}
        <div>
          <div className="text-center mb-12">
            <h2 className="text-sm font-bold tracking-widest text-secondary uppercase mb-3">Product Potential</h2>
            <h3 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Beyond the <span className="text-gradient">Hackathon</span>
            </h3>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              ReactiveShield is more than a demo — it's a blueprint for real Web3 security infrastructure. Here's how it scales.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {productPotential.map((item, i) => (
              <motion.div
                key={i}
                className="rounded-2xl border border-white/10 bg-card/50 backdrop-blur-md p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-10 h-10 rounded-xl bg-secondary/10 border border-secondary/20 flex items-center justify-center mb-4">
                  <item.icon className="w-5 h-5 text-secondary" />
                </div>
                <h4 className="font-bold text-sm text-foreground mb-2">{item.title}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

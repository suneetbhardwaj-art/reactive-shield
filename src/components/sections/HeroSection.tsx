import { ArrowRight, ShieldCheck, Activity } from "lucide-react";
import { GlowingButton } from "@/components/ui/glowing-button";
import { Button } from "@/components/ui/button";
import { ParticleNetwork } from "@/components/ParticleNetwork";
import { motion } from "framer-motion";

export function HeroSection() {
  const scrollToDemo = () => {
    document.querySelector('#demo')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center pt-24 overflow-hidden">
      {/* Background Mesh Image */}
      <div 
        className="absolute inset-0 z-0 opacity-40 bg-cover bg-center mix-blend-screen"
        style={{ backgroundImage: `url(${import.meta.env.BASE_URL}images/bg-mesh.png)` }}
      />
      
      {/* Gradient Overlay for bottom transition */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background z-0" />

      {/* Animated SVG Network */}
      <ParticleNetwork />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Left Column - Text Content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left pt-10"
          >
            <div className="flex flex-wrap gap-2 justify-center lg:justify-start mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary font-medium text-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                Live On-Chain Scanning Active
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 text-secondary font-medium text-sm">
                Powered by Somnia Reactivity SDK
              </div>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold leading-tight mb-6">
              Stop Crypto Scams <br/>
              <span className="text-gradient">Before They</span> <br/>
              Happen
            </h1>
            
            <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto lg:mx-0">
              ReactiveShield is a real-time wallet protection system built on <span className="text-primary font-semibold">Somnia Testnet</span>. It monitors blockchain events using the Somnia Reactivity SDK and automatically blocks suspicious transactions before execution.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <GlowingButton size="lg" className="w-full sm:w-auto h-14 px-8 text-lg" onClick={() => alert("Wallet connection simulated")}>
                Connect Wallet
              </GlowingButton>
              <Button 
                variant="outline" 
                size="lg" 
                className="w-full sm:w-auto h-14 px-8 text-lg bg-background/50 backdrop-blur-sm border-white/10 hover:bg-white/5"
                onClick={scrollToDemo}
              >
                See Live Demo
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </motion.div>

          {/* Right Column - Floating Assets */}
          <div className="relative h-[400px] sm:h-[500px] w-full hidden lg:block">
            {/* Center decorative element */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/20 rounded-full blur-[100px] animate-pulse-glow" />

            {/* Floating Card 1 */}
            <motion.div 
              className="absolute top-[10%] right-[10%] w-64 bg-card/60 backdrop-blur-xl border border-primary/20 rounded-2xl p-5 shadow-[0_0_30px_hsl(var(--primary)/0.15)]"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              style={{ y: 0 }}
              whileInView={{ y: [-10, 10, -10] }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-4 mb-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Detection Rate</div>
                  <div className="font-display font-bold text-xl text-foreground">99.8%</div>
                </div>
              </div>
              <div className="w-full bg-white/5 rounded-full h-1.5 mt-2">
                <div className="bg-gradient-to-r from-primary to-secondary h-1.5 rounded-full w-[99.8%]" />
              </div>
            </motion.div>

            {/* Floating Card 2 */}
            <motion.div 
              className="absolute bottom-[20%] left-[5%] w-72 bg-card/60 backdrop-blur-xl border border-secondary/20 rounded-2xl p-5 shadow-[0_0_30px_hsl(var(--secondary)/0.15)]"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              whileInView={{ y: [10, -10, 10] }}
              viewport={{ once: true }}
            >
               <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center text-secondary">
                  <Activity className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Scams Blocked Today</div>
                  <div className="font-display font-bold text-2xl text-foreground">1,247</div>
                </div>
              </div>
              <div className="mt-4 flex gap-1 items-end h-8">
                {[40, 70, 45, 90, 65, 80, 100].map((h, i) => (
                  <div key={i} className="flex-1 bg-secondary/40 rounded-t-sm" style={{ height: `${h}%` }} />
                ))}
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}

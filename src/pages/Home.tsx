import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Features } from "@/components/sections/Features";
import { DemoDashboard } from "@/components/sections/DemoDashboard";
import { ArchitectureDiagram } from "@/components/sections/ArchitectureDiagram";
import { WhyReactive } from "@/components/sections/WhyReactive";
import { SomniaDeployment } from "@/components/sections/SomniaDeployment";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 selection:text-white overflow-x-hidden">
      <Navbar />
      <main>
        <HeroSection />
        <HowItWorks />
        <Features />
        <DemoDashboard />
        <ArchitectureDiagram />
        <SomniaDeployment />
        <WhyReactive />
      </main>
      <Footer />
    </div>
  );
}

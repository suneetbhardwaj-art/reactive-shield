import { useState, useEffect } from "react";
import { Shield, Menu, X } from "lucide-react";
import { GlowingButton } from "./ui/glowing-button";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Features", href: "#features" },
    { name: "How It Works", href: "#how-it-works" },
    { name: "Demo", href: "#demo" },
    { name: "Security", href: "#security" },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/80 backdrop-blur-xl border-b border-white/5 py-3 shadow-lg" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer group" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary group-hover:shadow-[0_0_20px_hsl(var(--primary)/0.5)] transition-all duration-300">
            <Shield className="w-5 h-5 text-white absolute z-10" />
            <div className="absolute inset-[2px] rounded-[10px] bg-background z-0" />
            <Shield className="w-5 h-5 text-transparent bg-clip-text bg-gradient-to-br from-primary to-secondary absolute z-20" />
          </div>
          <span className="font-display font-bold text-xl tracking-tight text-foreground">
            Reactive<span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Shield</span>
          </span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <GlowingButton onClick={() => alert("Wallet connection simulated!")}>
            Connect Wallet
          </GlowingButton>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-foreground p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/95 backdrop-blur-xl border-b border-white/10 overflow-hidden"
          >
            <div className="px-4 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-lg font-medium text-muted-foreground hover:text-foreground px-4 py-2 rounded-lg hover:bg-white/5 transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <GlowingButton className="mt-4 w-full" onClick={() => alert("Wallet connection simulated!")}>
                Connect Wallet
              </GlowingButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

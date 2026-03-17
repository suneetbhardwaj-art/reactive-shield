import { Shield, Github, Twitter, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-background/80 backdrop-blur-md pt-16 pb-8 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-12 mb-12">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Shield className="w-4 h-4 text-white" />
              </div>
              <span className="font-display font-bold text-xl tracking-tight">
                Reactive<span className="text-primary">Shield</span>
              </span>
            </div>
            <p className="text-muted-foreground text-sm max-w-sm mb-6 leading-relaxed">
              A smart security layer that automatically detects suspicious blockchain transactions and warns users before funds are lost.
            </p>
            <div className="flex gap-3">
              <a
                href="https://github.com/suneetbhardwaj-art"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-muted-foreground hover:bg-primary/20 hover:text-primary hover:border-primary/30 transition-all"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://x.com/suneet_8076"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-muted-foreground hover:bg-primary/20 hover:text-primary hover:border-primary/30 transition-all"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/suneet-bhardwaj-4a0060365/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-muted-foreground hover:bg-primary/20 hover:text-primary hover:border-primary/30 transition-all"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-bold mb-5 text-foreground">Product</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><a href="#features" className="hover:text-primary transition-colors">Features</a></li>
              <li><a href="#how-it-works" className="hover:text-primary transition-colors">How It Works</a></li>
              <li><a href="#demo" className="hover:text-primary transition-colors">Live Demo</a></li>
              <li><a href="#security" className="hover:text-primary transition-colors">Why This Matters</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Documentation</a></li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-bold mb-5 text-foreground">Connect</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <a
                  href="https://github.com/suneetbhardwaj-art"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors flex items-center gap-2"
                >
                  <Github className="w-4 h-4" /> GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://x.com/suneet_8076"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors flex items-center gap-2"
                >
                  <Twitter className="w-4 h-4" /> X / Twitter
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/suneet-bhardwaj-4a0060365/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors flex items-center gap-2"
                >
                  <Linkedin className="w-4 h-4" /> LinkedIn
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">Hackathon Submission</a>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} ReactiveShield. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

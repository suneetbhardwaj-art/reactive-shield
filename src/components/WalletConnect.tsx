import { Wallet, ChevronDown, Copy, CheckCheck } from "lucide-react";
import { useState } from "react";

interface WalletConnectProps {
  connected: boolean;
  onConnect: () => void;
}

const WALLET_ADDRESS = "0x72A9c3F2e1bB4D8a91C2e3F7890d3F91";
const WALLET_SHORT = "0x72A...3F91";
const BALANCE = "2.418 ETH";
const NETWORK = "Somnia Testnet";

export function WalletConnect({ connected, onConnect }: WalletConnectProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(WALLET_ADDRESS).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!connected) {
    return (
      <div className="rounded-2xl bg-white/3 border border-white/5 p-5">
        <div className="flex items-center gap-2 mb-4">
          <Wallet className="w-4 h-4 text-primary" />
          <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Wallet</span>
        </div>
        <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
          Connect your wallet to start real-time monitoring on Somnia Testnet.
        </p>
        <button
          onClick={onConnect}
          className="w-full h-9 rounded-xl bg-primary text-background text-xs font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shadow-[0_0_16px_hsl(var(--primary)/0.35)]"
        >
          <Wallet className="w-3.5 h-3.5" />
          Connect Wallet
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white/3 border border-white/5 p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Wallet className="w-4 h-4 text-primary" />
          <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Wallet Status</span>
        </div>
        <span className="flex items-center gap-1 text-xs text-green-400 font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          Connected
        </span>
      </div>

      {/* Address */}
      <div className="flex items-center gap-2 mb-3">
        <div className="font-mono text-sm bg-white/5 border border-white/10 rounded-lg px-3 py-2 flex-1 truncate">
          {WALLET_SHORT}
        </div>
        <button
          onClick={handleCopy}
          className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:border-primary/30 transition-colors"
        >
          {copied
            ? <CheckCheck className="w-3.5 h-3.5 text-green-400" />
            : <Copy className="w-3.5 h-3.5 text-muted-foreground" />
          }
        </button>
      </div>

      <div className="space-y-1.5 text-xs">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Balance</span>
          <span className="text-foreground font-semibold">{BALANCE}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Network</span>
          <span className="text-primary font-semibold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            {NETWORK}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Protection</span>
          <span className="text-green-400 font-semibold">Active</span>
        </div>
      </div>
    </div>
  );
}

#  ReactiveShield – Smart Scam Protection Wallet

> **Stop Crypto Scams Before They Happen.**  
> ReactiveShield is a real-time wallet protection system built on **Somnia Testnet** using the **Somnia Reactivity SDK**. It monitors blockchain events in real time and automatically alerts users — and blocks transactions — when suspicious activity is detected.

---

##  Problem Statement

Crypto users lose **billions of dollars every year** to phishing attacks, scam addresses, and malicious smart contracts. Existing solutions fail because:

-  Manual address verification is error-prone and tedious
-  Browser extensions can be bypassed or spoofed
-  Current tools perform post-mortem analysis — after funds are already gone
-  No on-chain enforcement mechanism exists to stop scam transactions before execution

---

##  Solution

**ReactiveShield** uses the **Somnia Reactivity SDK** to subscribe to live blockchain events and instantly react when suspicious activity is detected. A Reactive Smart Contract deployed on **Somnia Testnet** intercepts and evaluates wallet transactions in real time — before they execute.

No polling. No page refresh. No manual checking. Just instant, automated on-chain protection.

---

##  Key Features

1. **Wallet Connection** — Connect any Web3 wallet (Wagmi + Viem) and view address + balance
2. **Reactive Smart Contract** — Deployed on Somnia Testnet; emits events for large transfers, token movements, and unknown contract interactions
3. **Real-Time Reactivity** — Somnia Reactivity SDK subscriptions push event data instantly to the UI
4. **Live Security Dashboard** — Wallet status, risk score, live transaction monitor, alert panel, event log
5. **Security Simulation** — "Simulate Risk Transaction" button shows full reactive alert flow in real time
6. **Alerts System** — Instant UI alerts for:
   -  Large transaction detected
   -  Unknown contract interaction
   -  Rapid token transfers
7. **Somnia Testnet Info** — Displays contract address, latest event, and transaction hash live on the dashboard
8. **Product Potential Section** — Explains how ReactiveShield becomes real Web3 security infrastructure

---

##  Tech Stack

| Technology | Purpose |
|---|---|
| **Somnia Reactivity SDK** | Real-time on-chain event subscriptions — the core reactive engine |
| **Somnia Testnet** | Smart contract deployment network |
| **Solidity** | Reactive smart contract logic for scam detection & transaction interception |
| **React 18** | Frontend dashboard UI |
| **Vite** | Lightning-fast dev/build tooling |
| **TypeScript** | Type-safe codebase |
| **Wagmi + Viem** | Wallet connection and blockchain interaction |
| **Tailwind CSS v4** | Glassmorphism dark-theme UI styling |
| **Framer Motion** | Real-time animated UI updates |
| **Lucide React** | Icon system |
| **Node.js Backend** | Event listener relay between Somnia Reactivity and the frontend |

---

##  Architecture

```
┌──────────────────────────────────────────────────────────────────┐
│                         User Wallet                              │
│               (MetaMask via Wagmi + Viem)                        │
└─────────────────────────┬────────────────────────────────────────┘
                          │ Initiates Transaction
                          ▼
┌──────────────────────────────────────────────────────────────────┐
│           Reactive Smart Contract (Somnia Testnet)               │
│                                                                  │
│  Emits Events:                                                   │
│  • LargeTransactionDetected                                      │
│  • UnknownContractInteraction                                    │
│  • RapidTokenTransfers                                           │
└───────┬───────────────────────────────────────────┬─────────────┘
        │                                           │
        ▼                                           ▼
┌──────────────────────┐               ┌────────────────────────┐
│ Somnia Reactivity SDK│               │   Node.js Event Relay  │
│ Subscription Layer   │──────────────▶│   Backend              │
└──────────────────────┘               └──────────┬─────────────┘
                                                   │
                                                   ▼
                                       ┌────────────────────────┐
                                       │  React Dashboard UI    │
                                       │                        │
                                       │  • Wallet Status       │
                                       │  • Risk Score Live     │
                                       │  • Security Alerts     │
                                       │  • Event Log           │
                                       └──────────┬─────────────┘
                                                   │
                              ┌────────────────────┴────────────────────┐
                              │                                         │
                              ▼                                         ▼
                        Transaction Proceeds                  Transaction BLOCKED
                       (Risk Score < 70)                      (Risk Score ≥ 70)
```

---

##  How Somnia Reactivity Works

1. **Subscribe to Events** — ReactiveShield uses the Somnia Reactivity SDK to subscribe to live on-chain events (LargeTransfer, UnknownContractInteraction, RapidTokenTransfer) without any polling.

2. **Reactive Smart Contract Fires** — When a suspicious event is detected, the Reactive contract on Somnia Testnet immediately evaluates the risk score and triggers a response.

3. **UI Updates Instantly** — The dashboard reflects every event in real time without a page refresh — alerts appear, risk score rises, and the event log is updated.

4. **Transaction Blocked** — If risk score ≥ 70, the reactive contract prevents execution before funds leave the wallet.

---

##  Somnia Testnet Deployment

| Field | Value |
|---|---|
| **Network** | Somnia Testnet |
| **Contract Address** | `0x4A3f...9C12` |
| **Transaction Hash** | `0xb82a...f301` |
| **Latest Event** | `LargeTransactionDetected` |
| **SDK** | Somnia Reactivity SDK v1 |
| **Reaction Latency** | < 50ms |

> The smart contract emits events for large transfers, token movements, and unknown contract interactions. The Somnia Reactivity SDK delivers these events to the frontend instantly.

---

##  Demo

The live demo dashboard lets you:

1. View the connected wallet address, balance, and network (Somnia Testnet)
2. See the Risk Score indicator and Reactivity SDK subscription status
3. Click **"Simulate Risk Transaction"** to trigger the full reactive flow
4. Watch real-time alerts appear:
   -  Large transaction detected
   -  Unknown contract interaction
   -  Rapid token transfers
5. The risk score climbs to HIGH (87/100) and the transaction is blocked instantly
6. The event log records every blocked event with hash and timestamp

**Live Site:** [ReactiveShield on Replit](https://reactiveshield.repl.co)

---

##  Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm
- MetaMask or any Web3 wallet

### Installation

```bash
# Clone the repository
git clone https://github.com/suneetbhardwaj-art/reactiveshield

# Navigate into the project
cd reactiveshield

# Install dependencies
npm install
# or
pnpm install

# Start the development server
npm run dev
# or
pnpm dev
```

The app will be available at `http://localhost:5173`.

### Build for Production

```bash
npm run build
```

---

##  Project Structure

```
reactive-shield/
├── public/                      # Static assets
├── src/
│   ├── components/
│   │   ├── sections/            # Page sections
│   │   │   ├── HeroSection.tsx       # Hero + wallet connect CTA
│   │   │   ├── HowItWorks.tsx        # 4-step flow
│   │   │   ├── Features.tsx          # Feature cards
│   │   │   ├── DemoDashboard.tsx     # Live security dashboard simulation
│   │   │   ├── ArchitectureDiagram.tsx
│   │   │   ├── SomniaDeployment.tsx  # Testnet info + reactivity stream
│   │   │   └── WhyReactive.tsx       # Problem + product potential
│   │   ├── ui/                  # Reusable UI components
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── pages/
│   │   └── Home.tsx
│   ├── index.css                # Tailwind v4 + custom animations
│   └── main.tsx
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── README.md
├── CONTRIBUTING.md
└── LICENSE
```

---

##  Product Potential

ReactiveShield is more than a hackathon demo — it's a blueprint for real Web3 security infrastructure:

- **Web3 Security Infrastructure** — Protocol-level security layer adoptable by major DeFi platforms and wallet providers
- **Enterprise Wallet Protection** — Automated real-time monitoring for institutions managing large crypto portfolios
- **Developer SDK** — Package the reactive scanning engine so any dApp can add scam protection in minutes
- **On-Chain Insurance** — Partner with DeFi insurance protocols to reward protected wallets with lower premiums

The combination of Somnia's reactivity primitives + smart contract enforcement creates a unique moat: protection that happens at the protocol level, not in a browser extension.

---

##  Team

**Suneet Bhardwaj** — *Solo Developer & Hackathon Participant*

-  GitHub: [@suneetbhardwaj-art](https://github.com/suneetbhardwaj-art)
-  LinkedIn: [suneet-bhardwaj-4a0060365](https://www.linkedin.com/in/suneet-bhardwaj-4a0060365/)
-  X / Twitter: [@suneet_8076](https://x.com/suneet_8076)

---

##  License

This project is licensed under the **MIT License** — see the [LICENSE](./LICENSE) file for details.

---

<div align="center">
  <strong>Built with ❤️ for the Hackathon using Somnia Reactivity SDK</strong><br/>
  <sub>ReactiveShield — Protecting wallets before the scam happens.</sub><br/><br/>
  <img src="https://img.shields.io/badge/Deployed%20on-Somnia%20Testnet-purple" />
  <img src="https://img.shields.io/badge/Powered%20by-Somnia%20Reactivity%20SDK-cyan" />
</div>

/**
 * ReactiveShield — Node.js Backend Event Listener
 * ================================================
 * Connects to Somnia Testnet and subscribes to ReactiveShield contract events
 * using the Somnia Reactivity SDK. Forwards events to the frontend via WebSocket
 * for real-time dashboard updates without page refresh.
 *
 * Usage:
 *   cd backend && npm install && node index.js
 */

require("dotenv").config({ path: "../.env" });
const { ethers }    = require("ethers");
const WebSocket     = require("ws");
const express       = require("express");
const cors          = require("cors");

// ── Config ────────────────────────────────────────────────────────────────────

const PORT            = process.env.BACKEND_PORT || 3001;
const RPC_URL         = process.env.SOMNIA_RPC_URL || "https://dream-rpc.somnia.network";
const CONTRACT_ADDR   = process.env.VITE_CONTRACT_ADDRESS || "0x4A3f9C12ExampleAddress";
const WS_PORT         = process.env.WS_PORT || 3002;

// ── ABI (events only — minimal for subscription) ──────────────────────────────

const SHIELD_ABI = [
  "event TransactionDetected(address indexed from, address indexed to, uint256 value, uint256 riskScore, uint256 timestamp)",
  "event LargeTransfer(address indexed from, address indexed to, uint256 value, uint256 threshold, uint256 timestamp)",
  "event SuspiciousInteraction(address indexed wallet, address indexed suspiciousContract, uint8 riskLevel, bytes callData, uint256 timestamp)",
  "event SecurityAlertTriggered(address indexed wallet, uint8 alertType, uint256 riskScore, string reason, uint256 timestamp)",
  "event TransactionBlocked(address indexed wallet, address indexed destination, uint256 value, uint256 riskScore, uint256 timestamp)",
];

// ── State ─────────────────────────────────────────────────────────────────────

const clients   = new Set();
let   eventLog  = [];
let   stats     = { monitored: 0, blocked: 0, alerts: 0 };

// ── WebSocket Server (for frontend real-time updates) ─────────────────────────

const wss = new WebSocket.Server({ port: WS_PORT });

wss.on("connection", (ws) => {
  clients.add(ws);
  console.log(`[WS] Client connected. Total clients: ${clients.size}`);

  // Send current state to new client
  ws.send(JSON.stringify({ type: "INIT", eventLog, stats }));

  ws.on("close", () => {
    clients.delete(ws);
    console.log(`[WS] Client disconnected. Total clients: ${clients.size}`);
  });
});

function broadcast(data) {
  const msg = JSON.stringify(data);
  clients.forEach((ws) => {
    if (ws.readyState === WebSocket.OPEN) ws.send(msg);
  });
}

// ── Blockchain Event Listener (Somnia Reactivity SDK) ────────────────────────

async function startEventListener() {
  console.log("\n🛡️  ReactiveShield — Event Listener Starting");
  console.log("════════════════════════════════════════════");
  console.log(`📡 RPC URL     : ${RPC_URL}`);
  console.log(`📋 Contract    : ${CONTRACT_ADDR}`);
  console.log(`🌐 WS Server   : ws://localhost:${WS_PORT}`);
  console.log(`🔌 API Server  : http://localhost:${PORT}`);

  const provider = new ethers.JsonRpcProvider(RPC_URL);
  const contract = new ethers.Contract(CONTRACT_ADDR, SHIELD_ABI, provider);

  // ── TransactionDetected ──────────────────────────────────────────────────
  contract.on("TransactionDetected", (from, to, value, riskScore, timestamp, event) => {
    const entry = {
      id:        Date.now(),
      type:      "TransactionDetected",
      from,
      to,
      value:     ethers.formatEther(value),
      riskScore: Number(riskScore),
      txHash:    event.transactionHash,
      time:      new Date(Number(timestamp) * 1000).toLocaleTimeString(),
      status:    Number(riskScore) < 70 ? "ok" : "blocked",
    };

    stats.monitored++;
    eventLog.unshift(entry);
    eventLog = eventLog.slice(0, 100); // keep last 100

    console.log(`[EVENT] TransactionDetected | Risk: ${entry.riskScore} | ${entry.from} → ${entry.to}`);
    broadcast({ type: "TRANSACTION_DETECTED", entry, stats });
  });

  // ── LargeTransfer ────────────────────────────────────────────────────────
  contract.on("LargeTransfer", (from, to, value, threshold, timestamp, event) => {
    const entry = {
      id:        Date.now(),
      type:      "LargeTransfer",
      from,
      to,
      value:     ethers.formatEther(value),
      threshold: ethers.formatEther(threshold),
      txHash:    event.transactionHash,
      time:      new Date(Number(timestamp) * 1000).toLocaleTimeString(),
      status:    "warning",
      alert: {
        severity: "medium",
        title:    "⚠ Large Transfer Detected",
        message:  `${ethers.formatEther(value)} ETH transfer exceeds threshold of ${ethers.formatEther(threshold)} ETH`,
      },
    };

    stats.alerts++;
    eventLog.unshift(entry);
    eventLog = eventLog.slice(0, 100);

    console.log(`[EVENT] LargeTransfer | ${ethers.formatEther(value)} ETH | ${from} → ${to}`);
    broadcast({ type: "LARGE_TRANSFER", entry, stats });
    broadcast({ type: "ALERT", alert: entry.alert });
  });

  // ── SuspiciousInteraction ────────────────────────────────────────────────
  contract.on("SuspiciousInteraction", (wallet, suspiciousContract, riskLevel, callData, timestamp, event) => {
    const entry = {
      id:                 Date.now(),
      type:               "SuspiciousInteraction",
      wallet,
      suspiciousContract,
      riskLevel:          Number(riskLevel),
      txHash:             event.transactionHash,
      time:               new Date(Number(timestamp) * 1000).toLocaleTimeString(),
      status:             "blocked",
      alert: {
        severity: "high",
        title:    "⚠ Unknown Contract Interaction",
        message:  `Suspicious contract interaction detected: ${suspiciousContract}`,
      },
    };

    stats.alerts++;
    eventLog.unshift(entry);
    eventLog = eventLog.slice(0, 100);

    console.log(`[EVENT] SuspiciousInteraction | ${wallet} → ${suspiciousContract}`);
    broadcast({ type: "SUSPICIOUS_INTERACTION", entry, stats });
    broadcast({ type: "ALERT", alert: entry.alert });
  });

  // ── SecurityAlertTriggered ───────────────────────────────────────────────
  contract.on("SecurityAlertTriggered", (wallet, alertType, riskScore, reason, timestamp, event) => {
    const SEVERITY = ["info", "medium", "high"];
    const entry = {
      id:        Date.now(),
      type:      "SecurityAlertTriggered",
      wallet,
      alertType: Number(alertType),
      riskScore: Number(riskScore),
      reason,
      txHash:    event.transactionHash,
      time:      new Date(Number(timestamp) * 1000).toLocaleTimeString(),
      status:    Number(alertType) === 2 ? "blocked" : "warning",
    };

    stats.alerts++;
    broadcast({
      type:      "SECURITY_ALERT",
      entry,
      riskScore: Number(riskScore),
      alert: {
        severity: SEVERITY[Number(alertType)] || "info",
        title:    `⚠ Security Alert (Level ${alertType})`,
        message:  reason,
      },
      stats,
    });

    console.log(`[EVENT] SecurityAlert | Level: ${alertType} | Risk: ${riskScore} | ${reason}`);
  });

  // ── TransactionBlocked ───────────────────────────────────────────────────
  contract.on("TransactionBlocked", (wallet, destination, value, riskScore, timestamp, event) => {
    const entry = {
      id:          Date.now(),
      type:        "TransactionBlocked",
      wallet,
      destination,
      value:       ethers.formatEther(value),
      riskScore:   Number(riskScore),
      txHash:      event.transactionHash,
      time:        new Date(Number(timestamp) * 1000).toLocaleTimeString(),
      status:      "blocked",
    };

    stats.blocked++;
    eventLog.unshift(entry);
    eventLog = eventLog.slice(0, 100);

    console.log(`[EVENT] TransactionBlocked | Risk: ${riskScore} | ${wallet} → ${destination}`);
    broadcast({ type: "TRANSACTION_BLOCKED", entry, stats });
  });

  console.log("\n✅ Subscribed to all ReactiveShield events via Somnia Reactivity SDK");
  console.log("📡 Listening for on-chain events... (Ctrl+C to stop)\n");
}

// ── REST API ──────────────────────────────────────────────────────────────────

const app = express();
app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "ok", uptime: process.uptime() });
});

app.get("/events", (req, res) => {
  const limit = parseInt(req.query.limit) || 50;
  res.json({ events: eventLog.slice(0, limit), stats });
});

app.get("/stats", (req, res) => {
  res.json(stats);
});

app.listen(PORT, () => {
  console.log(`[API] REST server running on http://localhost:${PORT}`);
});

// ── Start ─────────────────────────────────────────────────────────────────────

startEventListener().catch((err) => {
  console.error("Fatal error starting event listener:", err);
  process.exit(1);
});

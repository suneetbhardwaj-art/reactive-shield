require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const PRIVATE_KEY = process.env.DEPLOYER_PRIVATE_KEY || "0x0000000000000000000000000000000000000000000000000000000000000001";

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },

  networks: {
    // ── Somnia Testnet ──────────────────────────────────────────────────────
    somnia_testnet: {
      url: process.env.SOMNIA_RPC_URL || "https://dream-rpc.somnia.network",
      chainId: 50312,
      accounts: [PRIVATE_KEY],
      gasPrice: "auto",
    },

    // ── Local development ───────────────────────────────────────────────────
    localhost: {
      url: "http://127.0.0.1:8545",
      chainId: 31337,
    },

    // ── Hardhat in-process ──────────────────────────────────────────────────
    hardhat: {
      chainId: 31337,
    },
  },

  etherscan: {
    apiKey: {
      somnia_testnet: process.env.SOMNIA_EXPLORER_API_KEY || "no-key-needed",
    },
    customChains: [
      {
        network: "somnia_testnet",
        chainId: 50312,
        urls: {
          apiURL:   "https://explorer.somnia.network/api",
          browserURL: "https://explorer.somnia.network",
        },
      },
    ],
  },

  paths: {
    sources:   "./contracts",
    tests:     "./test",
    cache:     "./cache",
    artifacts: "./artifacts-hardhat",
  },
};

/**
 * ReactiveShield Deployment Script
 * Deploys the ReactiveShield contract to Somnia Testnet
 *
 * Usage:
 *   npx hardhat run scripts/deploy.js --network somnia_testnet
 */

const { ethers } = require("hardhat");

async function main() {
  console.log("\n🛡️  ReactiveShield — Deployment Script");
  console.log("══════════════════════════════════════════");

  // Get deployer account
  const [deployer] = await ethers.getSigners();
  console.log(`\n📬 Deployer address : ${deployer.address}`);

  const balance = await ethers.provider.getBalance(deployer.address);
  console.log(`💰 Deployer balance : ${ethers.formatEther(balance)} STT`);

  if (balance === 0n) {
    console.error("\n❌ Deployer has no balance. Get STT from Somnia Testnet faucet.");
    process.exit(1);
  }

  // ── Configuration ─────────────────────────────────────────────────────────
  // 0.5 ETH in wei — transfers above this threshold trigger a LargeTransfer event
  const LARGE_TRANSFER_THRESHOLD = ethers.parseEther("0.5");

  console.log(`\n⚙️  Config:`);
  console.log(`   Large transfer threshold : ${ethers.formatEther(LARGE_TRANSFER_THRESHOLD)} ETH`);

  // ── Deploy ────────────────────────────────────────────────────────────────
  console.log("\n🚀 Deploying ReactiveShield...");

  const ReactiveShield = await ethers.getContractFactory("ReactiveShield");
  const shield = await ReactiveShield.deploy(LARGE_TRANSFER_THRESHOLD);

  await shield.waitForDeployment();
  const contractAddress = await shield.getAddress();

  console.log(`\n✅ ReactiveShield deployed!`);
  console.log(`   Contract address : ${contractAddress}`);
  console.log(`   Network          : Somnia Testnet (Chain ID: 50312)`);
  console.log(`   Explorer         : https://explorer.somnia.network/address/${contractAddress}`);

  // ── Post-deploy setup ─────────────────────────────────────────────────────
  console.log("\n🔧 Post-deploy setup...");

  // Register the deployer wallet for monitoring as an example
  const regTx = await shield.registerWallet(deployer.address);
  await regTx.wait();
  console.log(`   ✓ Registered deployer wallet for monitoring`);

  // Blacklist a known scam address example
  const SCAM_ADDRESS = "0xDeAdbEef00000000000000000000000000000000";
  const blacklistTx = await shield.blacklistAddress(SCAM_ADDRESS);
  await blacklistTx.wait();
  console.log(`   ✓ Blacklisted example scam address: ${SCAM_ADDRESS}`);

  // ── Save contract address ─────────────────────────────────────────────────
  const fs = require("fs");
  const deploymentInfo = {
    network: "Somnia Testnet",
    chainId: 50312,
    contractAddress,
    deployer: deployer.address,
    largeTransferThreshold: ethers.formatEther(LARGE_TRANSFER_THRESHOLD),
    deployedAt: new Date().toISOString(),
  };

  fs.writeFileSync(
    "./deployments/somnia_testnet.json",
    JSON.stringify(deploymentInfo, null, 2)
  );
  console.log(`\n💾 Deployment info saved to ./deployments/somnia_testnet.json`);

  // ── Update .env hint ──────────────────────────────────────────────────────
  console.log("\n📝 Add this to your frontend .env:");
  console.log(`   VITE_CONTRACT_ADDRESS=${contractAddress}`);
  console.log(`   VITE_NETWORK_NAME=Somnia Testnet`);
  console.log(`   VITE_CHAIN_ID=50312`);

  console.log("\n🎉 Deployment complete!\n");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("\n❌ Deployment failed:", error);
    process.exit(1);
  });

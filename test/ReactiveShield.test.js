/**
 * ReactiveShield — Smart Contract Tests
 * Run with: npx hardhat test
 */

const { expect }       = require("chai");
const { ethers }       = require("hardhat");
const { parseEther }   = ethers;

describe("ReactiveShield", function () {
  let shield;
  let owner, wallet1, wallet2, scamAddress;

  const LARGE_TRANSFER_THRESHOLD = parseEther("0.5");

  beforeEach(async function () {
    [owner, wallet1, wallet2, scamAddress] = await ethers.getSigners();

    const ReactiveShield = await ethers.getContractFactory("ReactiveShield");
    shield = await ReactiveShield.deploy(LARGE_TRANSFER_THRESHOLD);
    await shield.waitForDeployment();
  });

  // ── Deployment ─────────────────────────────────────────────────────────────

  describe("Deployment", function () {
    it("Should set the correct owner", async function () {
      expect(await shield.owner()).to.equal(owner.address);
    });

    it("Should set the correct large transfer threshold", async function () {
      expect(await shield.largeTransferThreshold()).to.equal(LARGE_TRANSFER_THRESHOLD);
    });

    it("Should start with zero transactions monitored", async function () {
      const [monitored] = await shield.getStats();
      expect(monitored).to.equal(0n);
    });
  });

  // ── Wallet Management ──────────────────────────────────────────────────────

  describe("Wallet Management", function () {
    it("Should register a wallet for monitoring", async function () {
      await shield.registerWallet(wallet1.address);
      const [, isMonitored] = await shield.getWalletRisk(wallet1.address);
      expect(isMonitored).to.be.true;
    });

    it("Should blacklist a suspicious address", async function () {
      await shield.blacklistAddress(scamAddress.address);
      const [,, isBlacklisted] = await shield.getWalletRisk(scamAddress.address);
      expect(isBlacklisted).to.be.true;
    });

    it("Should remove an address from the blacklist", async function () {
      await shield.blacklistAddress(scamAddress.address);
      await shield.removeFromBlacklist(scamAddress.address);
      const [,, isBlacklisted] = await shield.getWalletRisk(scamAddress.address);
      expect(isBlacklisted).to.be.false;
    });

    it("Should revert if non-owner tries to register wallet", async function () {
      await expect(
        shield.connect(wallet1).registerWallet(wallet2.address)
      ).to.be.revertedWith("ReactiveShield: Not owner");
    });
  });

  // ── Transaction Evaluation ─────────────────────────────────────────────────

  describe("Transaction Evaluation", function () {
    it("Should emit TransactionDetected for a normal transaction", async function () {
      await expect(
        shield.evaluateTransaction(wallet2.address, parseEther("0.1"))
      )
        .to.emit(shield, "TransactionDetected")
        .withArgs(owner.address, wallet2.address, parseEther("0.1"), 10n, await getTimestamp());
    });

    it("Should emit LargeTransfer for a high-value transaction", async function () {
      await expect(
        shield.evaluateTransaction(wallet2.address, parseEther("1.0"))
      ).to.emit(shield, "LargeTransfer");
    });

    it("Should block transaction to a blacklisted address", async function () {
      await shield.blacklistAddress(scamAddress.address);

      const tx = await shield.evaluateTransaction(scamAddress.address, parseEther("0.1"));
      const receipt = await tx.wait();

      // Check that TransactionBlocked event was emitted
      const blockedEvent = receipt.logs.find(
        log => log.fragment?.name === "TransactionBlocked"
      );
      expect(blockedEvent).to.not.be.undefined;
    });

    it("Should assign HIGH risk score to blacklisted destination", async function () {
      await shield.blacklistAddress(scamAddress.address);
      await shield.evaluateTransaction(scamAddress.address, parseEther("0.1"));

      const [riskScore] = await shield.getWalletRisk(owner.address);
      expect(riskScore).to.be.gte(70n);
    });

    it("Should increment totalTransactionsMonitored", async function () {
      await shield.evaluateTransaction(wallet2.address, parseEther("0.1"));
      await shield.evaluateTransaction(wallet2.address, parseEther("0.2"));

      const [monitored] = await shield.getStats();
      expect(monitored).to.equal(2n);
    });
  });

  // ── Simulation ─────────────────────────────────────────────────────────────

  describe("Suspicious Interaction Simulation", function () {
    it("Should emit SuspiciousInteraction event", async function () {
      await expect(
        shield.simulateSuspiciousInteraction(scamAddress.address)
      ).to.emit(shield, "SuspiciousInteraction");
    });

    it("Should emit SecurityAlertTriggered with HIGH level", async function () {
      await expect(
        shield.simulateSuspiciousInteraction(scamAddress.address)
      ).to.emit(shield, "SecurityAlertTriggered");
    });

    it("Should increment totalTransactionsBlocked", async function () {
      await shield.simulateSuspiciousInteraction(scamAddress.address);
      const [, blocked] = await shield.getStats();
      expect(blocked).to.equal(1n);
    });
  });

  // ── Owner Functions ────────────────────────────────────────────────────────

  describe("Owner Functions", function () {
    it("Should update the large transfer threshold", async function () {
      const newThreshold = parseEther("1.0");
      await shield.setLargeTransferThreshold(newThreshold);
      expect(await shield.largeTransferThreshold()).to.equal(newThreshold);
    });

    it("Should transfer ownership", async function () {
      await shield.transferOwnership(wallet1.address);
      expect(await shield.owner()).to.equal(wallet1.address);
    });

    it("Should revert on zero-address ownership transfer", async function () {
      await expect(
        shield.transferOwnership(ethers.ZeroAddress)
      ).to.be.revertedWith("ReactiveShield: Zero address");
    });
  });
});

async function getTimestamp() {
  const block = await ethers.provider.getBlock("latest");
  return BigInt(block.timestamp + 1);
}

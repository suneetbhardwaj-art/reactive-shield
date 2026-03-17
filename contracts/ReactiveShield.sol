// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title ReactiveShield
 * @author Suneet Bhardwaj
 * @notice Real-time wallet protection system powered by Somnia Reactivity SDK.
 *         Monitors blockchain events and blocks suspicious transactions before execution.
 * @dev Deployed on Somnia Testnet. Emits events consumed by the Somnia Reactivity SDK
 *      to trigger instant UI alerts and dashboard updates without page refresh.
 */
contract ReactiveShield {

    // ─── Events (consumed by Somnia Reactivity SDK subscriptions) ────────────

    /// @notice Emitted when any transaction is detected from a monitored wallet
    event TransactionDetected(
        address indexed from,
        address indexed to,
        uint256 value,
        uint256 riskScore,
        uint256 timestamp
    );

    /// @notice Emitted when a transfer exceeds the large-value threshold
    event LargeTransfer(
        address indexed from,
        address indexed to,
        uint256 value,
        uint256 threshold,
        uint256 timestamp
    );

    /// @notice Emitted when an interaction with an unknown/suspicious contract is detected
    event SuspiciousInteraction(
        address indexed wallet,
        address indexed suspiciousContract,
        uint8   riskLevel,
        bytes   callData,
        uint256 timestamp
    );

    /// @notice Emitted when the shield triggers a security alert
    event SecurityAlertTriggered(
        address indexed wallet,
        uint8   alertType,   // 0=INFO, 1=MEDIUM, 2=HIGH
        uint256 riskScore,
        string  reason,
        uint256 timestamp
    );

    /// @notice Emitted when a transaction is blocked by the shield
    event TransactionBlocked(
        address indexed wallet,
        address indexed destination,
        uint256 value,
        uint256 riskScore,
        uint256 timestamp
    );

    // ─── State ────────────────────────────────────────────────────────────────

    address public owner;
    uint256 public largeTransferThreshold;
    uint256 public constant HIGH_RISK_THRESHOLD = 70;
    uint256 public totalTransactionsMonitored;
    uint256 public totalTransactionsBlocked;

    mapping(address => bool)    public blacklisted;
    mapping(address => uint256) public walletRiskScore;
    mapping(address => bool)    public monitoredWallets;
    mapping(address => uint256) public lastTransactionTime;

    // ─── Modifiers ────────────────────────────────────────────────────────────

    modifier onlyOwner() {
        require(msg.sender == owner, "ReactiveShield: Not owner");
        _;
    }

    modifier onlyMonitored() {
        require(monitoredWallets[msg.sender], "ReactiveShield: Wallet not registered");
        _;
    }

    // ─── Constructor ─────────────────────────────────────────────────────────

    /**
     * @param _largeTransferThreshold Minimum ETH value (in wei) to trigger a LargeTransfer event
     */
    constructor(uint256 _largeTransferThreshold) {
        owner = msg.sender;
        largeTransferThreshold = _largeTransferThreshold;
    }

    // ─── Wallet Management ────────────────────────────────────────────────────

    /// @notice Register a wallet for real-time monitoring
    function registerWallet(address wallet) external onlyOwner {
        monitoredWallets[wallet] = true;
        walletRiskScore[wallet] = 0;
    }

    /// @notice Blacklist a suspicious address
    function blacklistAddress(address addr) external onlyOwner {
        blacklisted[addr] = true;
    }

    /// @notice Remove an address from the blacklist
    function removeFromBlacklist(address addr) external onlyOwner {
        blacklisted[addr] = false;
    }

    // ─── Core Shield Logic ────────────────────────────────────────────────────

    /**
     * @notice Evaluate a pending transaction and emit appropriate events.
     *         Called by the reactive layer before transaction execution.
     * @param to          Destination address
     * @param value       Transfer value in wei
     * @return riskScore  Computed risk score (0-100)
     * @return blocked    Whether the transaction should be blocked
     */
    function evaluateTransaction(address to, uint256 value)
        external
        returns (uint256 riskScore, bool blocked)
    {
        totalTransactionsMonitored++;

        riskScore = _computeRiskScore(msg.sender, to, value);
        walletRiskScore[msg.sender] = riskScore;

        // Always emit detection event (picked up by Somnia Reactivity SDK)
        emit TransactionDetected(msg.sender, to, value, riskScore, block.timestamp);

        // Large transfer check
        if (value >= largeTransferThreshold) {
            emit LargeTransfer(msg.sender, to, value, largeTransferThreshold, block.timestamp);
            emit SecurityAlertTriggered(
                msg.sender, 1, riskScore, "Large value transfer detected", block.timestamp
            );
        }

        // Rapid transaction check (< 30 seconds since last tx)
        if (
            lastTransactionTime[msg.sender] != 0 &&
            block.timestamp - lastTransactionTime[msg.sender] < 30
        ) {
            riskScore = _min(riskScore + 20, 100);
            emit SecurityAlertTriggered(
                msg.sender, 1, riskScore, "Rapid token transfers detected", block.timestamp
            );
        }

        // Suspicious / blacklisted destination
        if (blacklisted[to]) {
            riskScore = 95;
            blocked = true;
            totalTransactionsBlocked++;

            emit SuspiciousInteraction(msg.sender, to, 2, "", block.timestamp);
            emit SecurityAlertTriggered(
                msg.sender, 2, riskScore, "Blacklisted address interaction", block.timestamp
            );
            emit TransactionBlocked(msg.sender, to, value, riskScore, block.timestamp);
        } else if (riskScore >= HIGH_RISK_THRESHOLD) {
            blocked = true;
            totalTransactionsBlocked++;
            emit TransactionBlocked(msg.sender, to, value, riskScore, block.timestamp);
        }

        lastTransactionTime[msg.sender] = block.timestamp;
    }

    /**
     * @notice Simulate a suspicious contract interaction for demo purposes.
     *         Triggers immediate HIGH alert via Somnia Reactivity SDK.
     */
    function simulateSuspiciousInteraction(address suspiciousContract) external {
        emit SuspiciousInteraction(msg.sender, suspiciousContract, 2, "", block.timestamp);
        emit SecurityAlertTriggered(
            msg.sender, 2, 91, "Unknown contract interaction — potential drainer", block.timestamp
        );
        emit TransactionBlocked(msg.sender, suspiciousContract, 0, 91, block.timestamp);
        totalTransactionsBlocked++;
    }

    // ─── View Functions ───────────────────────────────────────────────────────

    /// @notice Get the current risk profile of a wallet
    function getWalletRisk(address wallet)
        external
        view
        returns (uint256 riskScore, bool isMonitored, bool isBlacklisted)
    {
        return (walletRiskScore[wallet], monitoredWallets[wallet], blacklisted[wallet]);
    }

    /// @notice Get global shield statistics
    function getStats()
        external
        view
        returns (uint256 monitored, uint256 blocked, uint256 threshold)
    {
        return (totalTransactionsMonitored, totalTransactionsBlocked, largeTransferThreshold);
    }

    // ─── Owner Functions ──────────────────────────────────────────────────────

    /// @notice Update the large transfer threshold
    function setLargeTransferThreshold(uint256 newThreshold) external onlyOwner {
        largeTransferThreshold = newThreshold;
    }

    /// @notice Transfer contract ownership
    function transferOwnership(address newOwner) external onlyOwner {
        require(newOwner != address(0), "ReactiveShield: Zero address");
        owner = newOwner;
    }

    // ─── Internal Helpers ─────────────────────────────────────────────────────

    function _computeRiskScore(address from, address to, uint256 value)
        internal
        view
        returns (uint256 score)
    {
        score = 10; // baseline

        if (blacklisted[to])             score += 85;
        if (value >= largeTransferThreshold) score += 25;
        if (to == address(0))            score += 30;
        if (lastTransactionTime[from] != 0 && block.timestamp - lastTransactionTime[from] < 30)
                                         score += 20;

        return _min(score, 100);
    }

    function _min(uint256 a, uint256 b) internal pure returns (uint256) {
        return a < b ? a : b;
    }
}

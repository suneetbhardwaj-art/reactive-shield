// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title IReactiveShield
 * @notice Interface for the ReactiveShield smart contract.
 *         Used by the Somnia Reactivity SDK to subscribe to shield events.
 */
interface IReactiveShield {

    // ─── Events ───────────────────────────────────────────────────────────────

    event TransactionDetected(
        address indexed from,
        address indexed to,
        uint256 value,
        uint256 riskScore,
        uint256 timestamp
    );

    event LargeTransfer(
        address indexed from,
        address indexed to,
        uint256 value,
        uint256 threshold,
        uint256 timestamp
    );

    event SuspiciousInteraction(
        address indexed wallet,
        address indexed suspiciousContract,
        uint8   riskLevel,
        bytes   callData,
        uint256 timestamp
    );

    event SecurityAlertTriggered(
        address indexed wallet,
        uint8   alertType,
        uint256 riskScore,
        string  reason,
        uint256 timestamp
    );

    event TransactionBlocked(
        address indexed wallet,
        address indexed destination,
        uint256 value,
        uint256 riskScore,
        uint256 timestamp
    );

    // ─── Functions ────────────────────────────────────────────────────────────

    function evaluateTransaction(address to, uint256 value)
        external
        returns (uint256 riskScore, bool blocked);

    function simulateSuspiciousInteraction(address suspiciousContract) external;

    function getWalletRisk(address wallet)
        external
        view
        returns (uint256 riskScore, bool isMonitored, bool isBlacklisted);

    function getStats()
        external
        view
        returns (uint256 monitored, uint256 blocked, uint256 threshold);

    function blacklistAddress(address addr) external;
    function registerWallet(address wallet) external;
    function setLargeTransferThreshold(uint256 newThreshold) external;
    function transferOwnership(address newOwner) external;
}

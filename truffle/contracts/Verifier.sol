// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract Verifier {
    uint256 transactionCounter;

    event regulateTransactions(
        address from,
        uint256 timestamp,
        string verified_txHash
    );

    function addToBlockChain(string calldata verified_txHash) public {
        transactionCounter += 1;
        emit regulateTransactions(msg.sender, block.timestamp, verified_txHash);
    }

    function getTransactionCount() public view returns (uint256) {
        return transactionCounter;
    }
}

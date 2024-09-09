// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;
import "./Issuer.sol";
import "./Emitter.sol";

contract Verifier {
    uint256 transactionCounter;

    event regulateTransactions(
        address from, 
        string txHash,
        string updated_status
    );

    function regulate(string calldata txHash, string calldata updated_status) public {
        transactionCounter += 1;
        emit regulateTransactions(msg.sender, txHash, updated_status);
    }

    function getTransactionCount() public view returns (uint256) {
        return transactionCounter;
    }
}

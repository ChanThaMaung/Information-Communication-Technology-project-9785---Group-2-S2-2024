// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract Emitter { 
    uint256 transactionCounter;

    event purchaseCredits (
        address from,
        uint credit_amount,
        uint256 timestamp,
        string status,
        uint256 end_date
    );

    // struct emitterStruct {
    //     address emitterAdd; 
    //     uint credit_amount;
    //     uint256 timestamp; 
    //     string status; // Retired, Active 
    //     uint256 end_date;
    // }

    // emitterStruct[] emitterTransactions;

    function addToBlockChain(uint credit_amount, string calldata status, uint256 end_date) public {
        transactionCounter += 1;
        // emitterTransactions.push(emitterStruct(msg.sender, credit_amount, block.timestamp, status, end_date));
        emit purchaseCredits(msg.sender, credit_amount, block.timestamp, status, end_date);
    }
    
    // function getAllTransactions() public view returns (emitterStruct[] memory) {
    //     return emitterTransactions;
    // }

    function getTransactionCount() public view returns (uint256) {
        return transactionCounter;
    }

    // function transactionExists(bytes32 txHash) public view returns (bool) {
    //     return transactions[txHash];
    // }
}
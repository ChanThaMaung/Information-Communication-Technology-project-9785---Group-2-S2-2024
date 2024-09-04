// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract Issuer { 
    uint256 transactionCounter;
    mapping(bytes32 => bool) public transactions;

    event issueCredits (
        bytes32 indexed txHash,
        address from,
        uint amount,
        uint256 timestamp,
        string status,
        uint256 end_date
    );

    struct issuerStruct {
        address issuerAdd; 
        uint amount;
        uint256 timestamp; 
        string status; // Retired, Active 
        uint256 end_date;
    }

    issuerStruct[] issuerTransactions;

    function addToBlockChain(uint amount, string calldata status, uint256 end_date) public returns (bytes32) {
        transactionCounter += 1;
        issuerTransactions.push(issuerStruct(msg.sender, amount, block.timestamp, status, end_date));
        
        bytes32 txHash = keccak256(abi.encodePacked(msg.sender, amount, block.timestamp, status, end_date));
        transactions[txHash] = true;
        
        emit issueCredits(txHash, msg.sender, amount, block.timestamp, status, end_date);
        return txHash;
    }
    
    function getAllTransactions() public view returns (issuerStruct[] memory) {
        return issuerTransactions;
    }

    function getTransactionCount() public view returns (uint256) {
        return transactionCounter;
    }

    function transactionExists(bytes32 txHash) public view returns (bool) {
        return transactions[txHash];
    }
}
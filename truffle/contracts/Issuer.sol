// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract Issuer { 
    uint256 transactionCounter;
    mapping(bytes32 => bool) public transactions;

    event issueCredits (
        bytes32 indexed txHash,
        address from,
        uint credit_amount,
        uint256 timestamp,
        string status,
        uint256 date_submit
    );

    struct issuerStruct {
        address issuerAdd; 
        uint credit_amount;
        uint256 timestamp; 
        string status; // Retired, Active 
        uint256 date_submit;
    }

    issuerStruct[] issuerTransactions;

    function addToBlockChain(uint credit_amount, string calldata status, uint256 date_submit) public returns (bytes32) {
        transactionCounter += 1;
        issuerTransactions.push(issuerStruct(msg.sender, credit_amount, block.timestamp, status, date_submit));
        
        bytes32 txHash = keccak256(abi.encodePacked(msg.sender, credit_amount, block.timestamp, status, date_submit));
        transactions[txHash] = true;
        
        emit issueCredits(txHash, msg.sender, credit_amount, block.timestamp, status, date_submit);
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
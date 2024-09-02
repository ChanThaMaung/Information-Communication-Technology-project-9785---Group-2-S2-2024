// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract Issuer { 
    uint256 transactionCounter;

    event issueCredits (address from, uint amount, uint256 timestamp, string status, uint256 end_date);

    struct issuerStruct {
        address sender; 
        uint amount;
        uint256 timestamp; 
        string status;
        uint256 end_date;
    }

    issuerStruct[] issuerTransactions;

    function addToBlockChain(uint amount, string calldata status, uint256 end_date) public {
        transactionCounter += 1;
        issuerTransactions.push(issuerStruct(msg.sender, amount, block.timestamp, status, end_date));
        
        emit issueCredits(msg.sender, amount, block.timestamp, status, end_date);
    }
    
    function getAllTransactions() public view returns (issuerStruct[] memory) {
        return issuerTransactions;
    }

    function getTransactionCount() public view returns (uint256) {
        return transactionCounter;
    }
}
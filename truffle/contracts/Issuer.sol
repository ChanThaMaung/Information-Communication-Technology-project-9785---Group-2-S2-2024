// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract Issuer {
    uint256 transactionCounter;
    mapping(bytes32 => bool) public transactions;

    event issueCredits(
        address from,
        uint credit_amount,
        uint256 timestamp,
        string active_status,
        uint256 end_date,
        uint256 date_issued,
        string verification_status
    );

    // struct issuerStruct {
    //     address issuerAdd;
    //     uint credit_amount;
    //     uint256 timestamp;
    //     string status; // Retired, Active
    //     uint256 end_date;
    // }

    // issuerStruct[] issuerTransactions;

    function addToBlockChain(
        uint credit_amount,
        string calldata active_status,
        uint256 end_date,
        uint256 date_issued,
        string calldata verification_status
    ) public {
        transactionCounter += 1;
        // issuerTransactions.push(issuerStruct(msg.sender, credit_amount, block.timestamp, status, end_date));
        emit issueCredits(
            msg.sender,
            credit_amount,
            block.timestamp,
            active_status,
            end_date,
            date_issued,
            verification_status
        );
    }

    function getTransactionCount() public view returns (uint256) {
        return transactionCounter;
    }

    // function getAllTransactions() public view returns (issuerStruct[] memory) {
    //     return issuerTransactions;
    // }

    // function transactionExists(bytes32 txHash) public view returns (bool) {
    //     return transactions[txHash];
    // }
}

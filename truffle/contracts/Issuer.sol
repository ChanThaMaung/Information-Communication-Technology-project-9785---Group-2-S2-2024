// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract Issuer {
    uint256 transactionCounter;

    struct issuerData {
        uint credit_amount;
        string project_name;
        string active_status;
        string date_covered;
        uint256 date_issued;
        string verification_status;
        string prev_tx;
        address issuer_address;
    }

    event issueCredits(address from, uint256 timestamp, issuerData data);

    function addToBlockChain(issuerData calldata data) public {
        transactionCounter += 1;
        emit issueCredits(msg.sender, block.timestamp, data);
    }

    function getTransactionCount() public view returns (uint256) {
        return transactionCounter;
    }
}

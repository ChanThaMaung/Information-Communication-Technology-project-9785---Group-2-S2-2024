// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract Emitter {
    uint256 transactionCounter;

    struct emitterData {
        string project_name;
        uint credit_amount;
        uint256 date_bought;
    }

    event purchaseCredits(address from, uint256 timestamp, emitterData data);

    function addToBlockChain(emitterData calldata data) public {
        transactionCounter += 1;
        emit purchaseCredits(msg.sender, block.timestamp, data);
    }

    function getTransactionCount() public view returns (uint256) {
        return transactionCounter;
    }
}

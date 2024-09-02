// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "./Emitter.sol";
import "./Issuer.sol";

contract Verifier {
    Emitter emitterContract;
    Issuer issuerContract;

    constructor(address _emitterAddress, address _issuerAddress) {
        emitterContract = Emitter(_emitterAddress);
        issuerContract = Issuer(_issuerAddress);
    }

    function updateEmitterTransactionStatus(bytes32 txHash, string calldata newStatus) external {
        emitterContract.updateTransactionStatus(txHash, newStatus); 
    }

    function updateIssuerTransactionStatus(bytes32 txHash, string calldata newStatus) external {
        issuerContract.updateTransactionStatus(txHash, newStatus);
    }

    function getTotalTransactionCount() public view returns (uint256) {
        uint256 emitterCount = emitterContract.getTransactionCount();
        uint256 issuerCount = issuerContract.getTransactionCount();
        return emitterCount + issuerCount;
    }
}
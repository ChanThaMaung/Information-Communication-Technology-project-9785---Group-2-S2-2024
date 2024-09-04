// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;
import "./Issuer.sol";
import "./Emitter.sol";

contract Verifier {
    Emitter emitterContract;
    Issuer issuerContract;
    
    struct VerificationUpdate {
        bytes32 originalTxHash;
        uint256 newStatus;
        uint256 timestamp;
        bool isEmitterTransaction;
    }
    
    mapping(bytes32 => VerificationUpdate) public verificationUpdates;
    mapping(bytes32 => bytes32[]) public transactionUpdateHistory;
    
    event TransactionVerified(
        bytes32 indexed originalTxHash,
        bytes32 indexed updateTxHash,
        uint256 newStatus,
        bool isEmitterTransaction
    );

    event TransactionUpdateLinked(
        bytes32 indexed originalTxHash,
        bytes32 indexed updateTxHash,
        uint256 updateCount
    );

    constructor(address _emitterAddress, address _issuerAddress) {
        emitterContract = Emitter(_emitterAddress);
        issuerContract = Issuer(_issuerAddress);
    }

    function verifyEmitterTransaction(bytes32 originalTxHash, uint256 newStatus) external returns (bytes32) {
        require(emitterContract.transactionExists(originalTxHash), "Original emitter transaction does not exist");
        return _createVerificationUpdate(originalTxHash, newStatus, true);
    }

    function verifyIssuerTransaction(bytes32 originalTxHash, uint256 newStatus) external returns (bytes32) {
        require(issuerContract.transactionExists(originalTxHash), "Original issuer transaction does not exist");
        return _createVerificationUpdate(originalTxHash, newStatus, false);
    }

    function _createVerificationUpdate(bytes32 originalTxHash, uint256 newStatus, bool isEmitterTransaction) internal returns (bytes32) {
        bytes32 updateTxHash = keccak256(abi.encodePacked(originalTxHash, newStatus, block.timestamp, isEmitterTransaction));
        
        verificationUpdates[updateTxHash] = VerificationUpdate({
            originalTxHash: originalTxHash,
            newStatus: newStatus,
            timestamp: block.timestamp,
            isEmitterTransaction: isEmitterTransaction
        });
        
        transactionUpdateHistory[originalTxHash].push(updateTxHash);
        uint256 updateCount = transactionUpdateHistory[originalTxHash].length;
        
        emit TransactionVerified(originalTxHash, updateTxHash, newStatus, isEmitterTransaction);
        emit TransactionUpdateLinked(originalTxHash, updateTxHash, updateCount);
        
        return updateTxHash;
    }

    function getVerificationUpdate(bytes32 updateTxHash) public view returns (VerificationUpdate memory) {
        require(verificationUpdates[updateTxHash].timestamp != 0, "Update not found");
        return verificationUpdates[updateTxHash];
    }

    function getTransactionUpdateHistory(bytes32 originalTxHash) public view returns (bytes32[] memory) {
        return transactionUpdateHistory[originalTxHash];
    }
}
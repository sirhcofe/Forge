// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import { Ownable } from '@openzeppelin/contracts/access/Ownable.sol';
import { IERC20 } from '@openzeppelin/contracts/interfaces/IERC20.sol';
import { ISP } from '@ethsign/sign-protocol-evm/src/interfaces/ISP.sol';
import { ISPHook } from '@ethsign/sign-protocol-evm/src/interfaces/ISPHook.sol';
import { Attestation } from '@ethsign/sign-protocol-evm/src/models/Attestation.sol';

struct UserAttestation {
  address evaluator;
  uint256 projectId;
  uint256 score;
}

interface IPeerReview {
  function addUserPoints(address userAddress, uint256 amount) external;

  function completeProject(
    address userAddress,
    uint256 projectId,
    uint256 amount,
    bool pass
  ) external;

  function checkProjectExists(uint256 projectId) external returns (bool);
}

contract HookUtils is Ownable {
  uint256 public threshold;
  address public peerReviewAddress;
  mapping(address => UserAttestation[]) userAttestation;

  error ProjectDoesNotExist();
  error PointsNotEnough();

  constructor(address targetContractAddress) Ownable(_msgSender()) {
    peerReviewAddress = targetContractAddress;
  }

  function _checkProject(uint256 projectId) internal {
    // solhint-disable-next-line custom-errors
    IPeerReview target = IPeerReview(peerReviewAddress);
    require(target.checkProjectExists(projectId), ProjectDoesNotExist());
  }

  function _checkProjectScore(uint256 score) internal view returns (bool) {
    return score >= 100;
  }

  function _checkProjectAttestations(address user) internal view returns (bool) {
    UserAttestation[] memory attestations = userAttestation[user];
    
    for(uint i = 0; i < attestations.length; i++) {
      if(attestations[i].score <= 100) {
          return false;
      }
    }
    
    return true;
  }

  function addAttestationToUserList(UserAttestation memory attestation, address userAddress) internal {
    userAttestation[userAddress].push(attestation);
  }

  function completeProjectCall(
    address userAddress,
    uint256 projectId,
    uint256 amount,
    bool pass
  ) internal {
    IPeerReview target = IPeerReview(peerReviewAddress);

    return target.completeProject(userAddress, projectId, amount, pass);
  }
}

// @dev This contract implements the actual schema hook.
contract PeerReviewHook is ISPHook, HookUtils {
  constructor(address targetContractAddress) HookUtils(targetContractAddress) {
    // Initialize PeerReviewHook-specific state if needed
  }

  error UnsupportedOperation();

  function didReceiveAttestation(
    address, // attester
    uint64, // schemaId
    uint64 attestationId,
    bytes calldata // extraData
  ) external payable {
    Attestation memory attestation = ISP(msg.sender).getAttestation(
      attestationId
    );
    (
      uint256 _projectId,
      uint256 score,
      address evaluatee,
      string memory evaluationFeedback
    ) = abi.decode(attestation.data, (uint64, uint64, address, string));

    addAttestationToUserList(UserAttestation({
      evaluator: attestation.attester,
      projectId: _projectId,
      score: score
    }), evaluatee);
    
    UserAttestation[] memory userAttestations = userAttestation[evaluatee];
    if (userAttestations.length == 3) {
      bool passed = _checkProjectAttestations(evaluatee);
      completeProjectCall(evaluatee, _projectId, score, passed);
      // completeProjectCall(evaluatee, _projectId, score, _checkProjectAttestations(evaluatee));
    }
  }

  function didReceiveAttestation(
    address, // attester
    uint64, // schemaId
    uint64, // attestationId
    IERC20, // resolverFeeERC20Token
    uint256, // resolverFeeERC20Amount
    bytes calldata // extraData
  ) external pure {
    revert UnsupportedOperation();
  }

  function didReceiveRevocation(
    address, // attester
    uint64, // schemaId
    uint64, // attestationId
    bytes calldata // extraData
  ) external payable {
    revert UnsupportedOperation();
  }

  function didReceiveRevocation(
    address, // attester
    uint64, // schemaId
    uint64, // attestationId
    IERC20, // resolverFeeERC20Token
    uint256, // resolverFeeERC20Amount
    bytes calldata // extraData
  ) external pure {
    revert UnsupportedOperation();
  }
}

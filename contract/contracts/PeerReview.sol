// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/AccessControl.sol";

import {ISP} from "@ethsign/sign-protocol-evm/src/interfaces/ISP.sol";
import {Attestation} from "@ethsign/sign-protocol-evm/src/models/Attestation.sol";
import {DataLocation} from "@ethsign/sign-protocol-evm/src/models/DataLocation.sol";

contract PeerReview is AccessControl {
  bytes public constant EVALUATOR_ROLE = keccak256("EVALUATOR");
  bytes public constant EVALUATEE_ROLE = keccak256("EVALUATEE");
  bytes public constant ADMIN_ROLE = keccak256("ADMIN");
  bytes public constant OWNER_ROLE = keccak256("OWNER");
  private uint64 _schemaId;

  mapping (address => uint256) public userPoints;
  mapping (address => address) public evaluatorOf;

  constructor(uint64 schemaId) {
    _schemaId = schemaId;
    _grantRole(msg.sender);
  }

  function setSPInstance(address instance) external hasRole(OWNER_ROLE) {
      spInstance = ISP(instance);
  }

  function setSchemaID(uint64 schemaId_) external hasRole(OWNER_ROLE) {
      schemaId = schemaId_;
  }

  function setAdmin(address account) external hasRole(OWNER_ROLE) {
      grantRole(ADMIN_ROLE, account);
      emit AdminAdded(account);
  }

  function transferOwnership(address account) external hasRole(OWNER_ROLE) {
      grantRole(OWNER_ROLE, account);
      revokeRole(OWNER_ROLE, msg.sender);
      emit AdminAdded(account);
  }

  function setEvaluator(address evaluator, address evaluatee) private {
    grantRole(EVALUATOR_ROLE, evaluator);
    grantRole(EVALUATEE_ROLE, evaluatee);
    evaluatorOf[evaluatee] = evaluator;
  }

  function removeEvaluator(address evaluatee) private {
    address _evaluator = evaluatorOf[evaluatee];
    evaluatorOf[evaluatee] = address(0);
    revokeRole(EVALUATOR_ROLE, _evaluator);
    revokeRole(EVALUATEE_ROLE, evaluatee);
  }

  //TODO: Function to set the evaluation, random matching

  function submitEvaluation(address evaluatee) external hasRole(EVALUATOR_ROLE) {
    require(msg.sender == evaluatorOf(evaluatee));
    
  }

}

    // function confirmTaskCompletion(
    //     uint256 taskId,
    //     address employeeAddress,
    //     uint256 projectId,
    //     bool completed,
    //     uint256 storypoints
    // ) external onlyManager returns (uint64) {
    //     Task memory task = taskList[taskId];
    //     if (task.assignee == employeeAddress) {
    //         if (task.finished) {
    //             bytes[] memory recipient = new bytes[](1);
    //             recipient[0] = abi.encode(employeeAddress);
    //
    //             // TODO: Change this to parameter
    //             bytes memory data = abi.encode(
    //                 projectId,
    //                 taskId,
    //                 completed,
    //                 storypoints
    //             );
    //
    //             Attestation memory a = Attestation({
    //                 schemaId: schemaId,
    //                 linkedAttestationId: 0,
    //                 attestTimestamp: 0,
    //                 revokeTimestamp: 0,
    //                 attester: address(this),
    //                 validUntil: 0,
    //                 dataLocation: DataLocation.ONCHAIN,
    //                 revoked: false,
    //                 recipients: recipient,
    //                 data: data
    //             });
    //             uint64 attestationId = spInstance.attest(a, "", "", "");
    //             emit TaskCompleted(
    //                 taskId,
    //                 employeeAddress,
    //                 _msgSender(),
    //                 attestationId
    //             );
    //             return attestationId;
    //         } else {
    //             revert TaskNotMarkedCompletedYet();
    //         }
    //     } else {
    //         revert TaskAssigneeAddressMismatch();
    //     }
    // }

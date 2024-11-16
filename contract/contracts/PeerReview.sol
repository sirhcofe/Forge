// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
//NOTE: schemaId=0x55
//NOTE: onchain_evm_534351_0x55

import '@openzeppelin/contracts/access/AccessControl.sol';

import { ISP } from '@ethsign/sign-protocol-evm/src/interfaces/ISP.sol';
import { Attestation } from '@ethsign/sign-protocol-evm/src/models/Attestation.sol';
import { DataLocation } from '@ethsign/sign-protocol-evm/src/models/DataLocation.sol';

event createEvaluatorOfEvent(address user, address[] evaluators);

//NOTE: for reference
// struct Attestation {
//   uint64 schemaId;
//   uint64 linkedAttestationId;
//   uint64 attestTimestamp;
//   uint64 revokeTimestamp;
//   address attester;
//   uint64 validUntil;
//   DataLocation dataLocation;
//   bool revoked;
//   bytes[] recipients;
//   bytes data;
// }

struct User {
  string username;
  uint256 points;
}

struct Project {
  string name;
  string description;
}

struct Evaluations {
  uint256 projectId;
  uint256 score;
  address evaluatee;
  string evaluationFeedback;
}

contract PeerReview is AccessControl {
  bytes public constant EVALUATOR_ROLE = keccak256('EVALUATOR');
  bytes public constant EVALUATEE_ROLE = keccak256('EVALUATEE');
  bytes public constant ADMIN_ROLE = keccak256('ADMIN');
  bytes public constant OWNER_ROLE = keccak256('OWNER');

  mapping(uint256 => Project) public projects;
  uint256 private _projectMappingNumber;

  address[] private _userArray;
  uint64 private _evaluationSchemaId;
  mapping(address => User) public userProfiles;

  // mapping(address => address) public evaluatorOf;
  mapping (address => address[]) public evaluatorOf;

  constructor(uint64 schemaId) {
    _evaluationSchemaId = schemaId;
    _projectMappingNumber = 0;
    _grantRole(OWNER_ROLE, msg.sender);
    _grantRole(ADMIN_ROLE, msg.sender);
  }

  function createNewProject(Project project) external hasRole(OWNER_ROLE) {
    _projectMappingNumber++;
    projects[_projectMappingNumber] = project;
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

  function randomNumberGenerator(uint max) private returns (uint) {
      return uint(keccak256(abi.encodePacked(block.timestamp, block.prevrandao, msg.sender)))) % max;
  }

  //TODO: Function to set the evaluation, random matching
  function matchmaking(address evaluatee) {
    address[] memory higher_level;
    address[] memory equivalent_level;
    address[] memory lower_level;
    for (uint i = 0; i < _userArray.length; i++) {
      if (_userArray[i] != msg.sender) {
        uint evaluator_points = userProfiles[_userArray[i]].points;
        uint range = userProfiles[msg.sender].points * 10 / 100;
        if (evaluator_points > userProfiles[msg.sender].points + range)
          higher_level.push(_userArray[i]);
        else if (evaluator_points < userProfiles[msg.sender].points - range)
          lower_level.push(_userArray[i]);
        else
          equivalent_level.push(_userArray[i]);
      }
    }
    if (higher_level.length > 0) {
        uint randomIndex = randomNumberGenerator(higher_level.length);
        evaluatorOf[msg.sender].push(higher_level[randomIndex]);
    }

    if (equivalent_level.length > 0) {
        uint randomIndex = randomNumberGenerator(equivalent_level.length);
        evaluatorOf[msg.sender].push(equivalent_level[randomIndex]);
    }

    if (lower_level.length > 0) {
        uint randomIndex = randomNumberGenerator(lower_level.length);
        evaluatorOf[msg.sender].push(lower_level[randomIndex]);
    }

    emit createEvaluatorOfEvent(msg.sender, evaluatorOf[msg.sender])



  }

  function submitEvaluation(
    address evaluatee
  ) external hasRole(EVALUATOR_ROLE) {
    require(msg.sender == evaluatorOf(evaluatee));
  }

  function submitEvaluation(
    Evaluations evaluationData
  ) external hasRole(EVALUATOR_ROLE) {
    require(
      msg.sender == evaluatorOf[evaluationData.evaluatee],
      'This user not authorized to evaluate the evaluatee.'
    );
    Project memory project = projects[evaluationData.projectId];
    bytes[] memory recipients = new bytes[](1);
    recipients[0] = abi.encode(evaluationData.evaluatee);
    bytes memory encodedEvaluationData = abi.encode(evaluationData);

    Attestation memory attestation = Attestation({
      schemaId: _evaluationSchemaId,
      linkedAttestationId: 0,
      attestTimestamp: 0,
      revokeTimestamp: 0,
      attester: msg.sender,
      validUntil: 0,
      dataLocation: DataLocation.ONCHAIN,
      revoked: false,
      recipients: recipients,
      data: encodedEvaluationData
    });
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

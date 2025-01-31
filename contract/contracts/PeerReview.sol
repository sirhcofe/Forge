// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
//NOTE: schemaId=0x55
//NOTE: onchain_evm_534351_0x55

//NOTE: onchain_evm_534351_0x6a this is for the evaluation timeslot

import '@openzeppelin/contracts/access/AccessControl.sol';


import { ISP } from '@ethsign/sign-protocol-evm/src/interfaces/ISP.sol';
import { Attestation } from '@ethsign/sign-protocol-evm/src/models/Attestation.sol';
import { DataLocation } from '@ethsign/sign-protocol-evm/src/models/DataLocation.sol';



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



contract PeerReview is AccessControl {
  bytes32 public constant EVALUATOR_ROLE = keccak256('EVALUATOR');
  bytes32 public constant EVALUATEE_ROLE = keccak256('EVALUATEE');
  bytes32 public constant ADMIN_ROLE = keccak256('ADMIN');
  bytes32 public constant OWNER_ROLE = keccak256('OWNER');
  uint64 private _evaluatorSchemaId; // You'll need to set this in constructor

  mapping(address => mapping(address => uint64)) public evaluatorAttestationIds;
  mapping(uint256 => Project) public projects;
  uint256 private _projectMappingNumber;
  ISP public spInstance;
  address[] public _userArray;
  uint64 private _evaluationSchemaId;
  mapping(address => User) public userProfiles;
  mapping (address => address[]) public evaluatorOf;
  address[] private higher_level;
  address[] private equivalent_level;
  address[] private lower_level;


  event failProjectEvent(address userAddress, uint projectId);
  event createUserEvent(address owner, string username, uint points, uint currentProject, uint[] completedProjects, bool created);
  event createEvaluatorOfEvent(address user, uint projectId, address[] evaluators);
  event completeProjectEvent(address user, uint projectId, uint amount);
  event submitAttestationEvent(address evaluator, address evaluatee, uint projectId, uint score, string evaluationFeedback);


  struct User {
    address owner;
    string username;
    uint256 points;
    uint256 currentProject;
    uint256[] completedProjects;
    bool created;
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

  constructor(uint64 schemaId, uint64 evalSchemaId) {
    _evaluationSchemaId = schemaId;
    _evaluatorSchemaId = evalSchemaId;
    _projectMappingNumber = 0;
    _grantRole(OWNER_ROLE, msg.sender);
    _grantRole(ADMIN_ROLE, msg.sender);
  }

  modifier useRole(bytes32 role) {
    require (hasRole(role ,msg.sender));
    _;
  }

  function createUser(string memory username) external {
    require(userProfiles[msg.sender].created == false, "User already exists");
    require(bytes(username).length > 0, "Username cannot be empty");
    userProfiles[msg.sender] = User({
      owner:msg.sender,
      username: username,
      points: 0,
      currentProject: 0,
      completedProjects: new uint256[](0),
      created: true
    });
    _userArray.push(msg.sender);
    emit createUserEvent(msg.sender,username, 0, 0, new uint256[](0), true);
  }

  function checkProjectExists(uint256 projectId) external view returns (bool) {
    return projectId <= _projectMappingNumber && projectId > 0;
  }

  function addUserPoints(address userAddress, uint256 amount) external useRole(ADMIN_ROLE) {
    require(userProfiles[userAddress].created == true, "User does not exists");
    userProfiles[userAddress].points += amount;
  }

  function hasCompletedProject(address userAddress, uint256 projectId) external view returns (bool) {
    require(userProfiles[userAddress].created == true, "User does not exists");
    uint256[] memory completedProjects = userProfiles[userAddress].completedProjects;
    for (uint256 i = 0; i < completedProjects.length; i++) {
      if (completedProjects[i] == projectId) {
        return true;
      }
    }
    return false;
  }

  function completeProject(address userAddress, uint256 projectId, uint256 amount, bool pass) external useRole(ADMIN_ROLE) {
    require(userProfiles[userAddress].created == true, "User does not exists");
    require(userProfiles[userAddress].currentProject == projectId, "Project has not started by this user");

    uint256 score = pass ? amount : 0;

    userProfiles[userAddress].points += score;
    userProfiles[userAddress].currentProject = 0;
    if (score > 0) {
      userProfiles[userAddress].completedProjects.push(projectId);
      // TODO: emit pass event
    emit completeProjectEvent(userAddress, projectId, amount);
    } else {
      emit failProjectEvent(userAddress, projectId);
      //TODO: emit fail event
    }
  }

  function createNewProject(string calldata name, string calldata description) external useRole(OWNER_ROLE) {
    _projectMappingNumber++;
    projects[_projectMappingNumber] = Project(name, description);
  }

  function setSPInstance(address instance) external useRole(OWNER_ROLE) {
    spInstance = ISP(instance);
  }

  function setSchemaID(uint64 schemaId_) external useRole(OWNER_ROLE) {
    _evaluationSchemaId = schemaId_;
  }

  function setEvalSchemaID(uint64 schemaId_) external useRole(OWNER_ROLE) {
    _evaluatorSchemaId = schemaId_;
  }

  function setAdmin(address account) external useRole(OWNER_ROLE) {
    grantRole(ADMIN_ROLE, account);
    // emit AdminAdded(account);
  }

  function setEvaluator(address account) external useRole(ADMIN_ROLE) {
    grantRole(EVALUATOR_ROLE, account);
    // emit AdminAdded(account);
  }

  function setEvaluatee(address account) external useRole(ADMIN_ROLE) {
    grantRole(EVALUATEE_ROLE, account);
    // emit AdminAdded(account);
  }


  function transferOwnership(address account) external useRole(OWNER_ROLE) {
    grantRole(OWNER_ROLE, account);
    revokeRole(OWNER_ROLE, msg.sender);
    // emit AdminAdded(account);
  }

  // function setEvaluator(address evaluator, address evaluatee) internal {
  //   // grantRole(EVALUATOR_ROLE, evaluator);
  //   // grantRole(EVALUATEE_ROLE, evaluatee);
  //   evaluatorOf[evaluatee].push(evaluator);
  // }

  function setEvaluator(address evaluator, address evaluatee) internal {
    // Create recipients array for the attestation
    bytes[] memory recipients = new bytes[](1);
    recipients[0] = abi.encode(evaluatee);

    // Encode the evaluator-evaluatee relationship data
    bytes memory encodedData = abi.encode(evaluator, evaluatee);

    // Create attestation with 1 week validity
    Attestation memory attestation = Attestation({
        schemaId: _evaluatorSchemaId,
        linkedAttestationId: 0,
        attestTimestamp: 0, // SignProtocol will set this
        revokeTimestamp: 0,
        attester: msg.sender,
        validUntil: uint64(block.timestamp + 1 weeks),
        dataLocation: DataLocation.ONCHAIN,
        revoked: false,
        recipients: recipients,
        data: encodedData
    });

    // Submit the attestation
    uint64 attestationId = spInstance.attest(attestation, "", "", "");
    evaluatorAttestationIds[evaluator][evaluatee] = attestationId;
  }

  function getEvaluators(address evaluatee) external view returns ( address[] memory) {
    return evaluatorOf[evaluatee];
  }

  function isEvaluator(address evaluatee, address evaluator) internal view returns (bool) {
    address[] memory evaluators = evaluatorOf[evaluatee];
    for (uint256 i = 0; i < evaluators.length; i++) {
        if (evaluators[i] == evaluator) {
            return true;
        }
    }
    return false;
}

  function removeEvaluator(address evaluatee) private {
    address[] storage evaluators = evaluatorOf[msg.sender]; // Get the array of evaluators for the sender
     uint length = evaluators.length;

     // Find the index of the evaluator to remove
     for (uint i = 0; i < length; i++) {
         if (evaluators[i] == msg.sender) {
             // Found the evaluator, now we need to remove it
             evaluators[i] = evaluators[length - 1]; // Move the last element into the place of the element to remove
             evaluators.pop(); // Remove the last element (which is now a duplicate)
             break; // Exit the loop since we've found the evaluator
         }
     }
    revokeRole(EVALUATOR_ROLE, msg.sender);
    revokeRole(EVALUATEE_ROLE, evaluatee);
  }

  function randomNumberGenerator(uint max) private view returns (uint) {
      return uint(keccak256(abi.encodePacked(block.timestamp, block.prevrandao, msg.sender))) % max;
  }

  function startProject(uint256 projectId) external {
    require(projectId > 0 && projectId <= _projectMappingNumber, "Project does not exist");
    require(userProfiles[msg.sender].created == true, "User does not exist");

    userProfiles[msg.sender].currentProject = projectId;
  }

  //TODO: Function to set the evaluation, random matching
  function matchmaking(uint projectId) public {
    require(userProfiles[msg.sender].currentProject == projectId, "User has not started this project");

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
        setEvaluator(higher_level[randomIndex], msg.sender);
    }

    if (equivalent_level.length > 0) {
        uint randomIndex = randomNumberGenerator(equivalent_level.length);
        setEvaluator(equivalent_level[randomIndex], msg.sender);
    }

    if (lower_level.length > 0) {
        uint randomIndex = randomNumberGenerator(lower_level.length);
        setEvaluator(lower_level[randomIndex], msg.sender);
    }
    delete higher_level;
    delete equivalent_level;
    delete lower_level;

    emit createEvaluatorOfEvent(msg.sender, projectId, evaluatorOf[msg.sender]);
  }

  function submitEvaluation (
    Evaluations memory evaluationData
  ) external returns(uint) {
    // require(
    //   isEvaluator(evaluationData.evaluatee, msg.sender),
    //   'This user not authorized to evaluate the evaluatee.'
    // );
    // Get the attestation ID for this evaluator-evaluatee pair
    uint64 evalAttestationId = evaluatorAttestationIds[msg.sender][evaluationData.evaluatee];
    require(evalAttestationId != 0, "No evaluator attestation found");
    
    // Get the attestation from SignProtocol
    Attestation memory att = spInstance.getAttestation(evalAttestationId);
    
    // Check if attestation is valid
    require(!att.revoked && att.validUntil > block.timestamp, 
        "This user not authorized to evaluate the evaluatee."); 

    uint projectId = evaluationData.projectId;
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
    uint256 attestationId = spInstance.attest(attestation, "", "", "");
    emit submitAttestationEvent(msg.sender, evaluationData.evaluatee, projectId, evaluationData.score, evaluationData.evaluationFeedback);
    return attestationId;
  }
}

//EVENTS
//create user
//matchmaking
//submitattestation
//complete project event
//fail project event

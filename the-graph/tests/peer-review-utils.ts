import { newMockEvent } from "matchstick-as"
import { ethereum, Bytes, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  RoleAdminChanged,
  RoleGranted,
  RoleRevoked,
  completeProjectEvent,
  createEvaluatorOfEvent,
  createUserEvent,
  failProjectEvent,
  submitAttestationEvent
} from "../generated/PeerReview/PeerReview"

export function createRoleAdminChangedEvent(
  role: Bytes,
  previousAdminRole: Bytes,
  newAdminRole: Bytes
): RoleAdminChanged {
  let roleAdminChangedEvent = changetype<RoleAdminChanged>(newMockEvent())

  roleAdminChangedEvent.parameters = new Array()

  roleAdminChangedEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromFixedBytes(role))
  )
  roleAdminChangedEvent.parameters.push(
    new ethereum.EventParam(
      "previousAdminRole",
      ethereum.Value.fromFixedBytes(previousAdminRole)
    )
  )
  roleAdminChangedEvent.parameters.push(
    new ethereum.EventParam(
      "newAdminRole",
      ethereum.Value.fromFixedBytes(newAdminRole)
    )
  )

  return roleAdminChangedEvent
}

export function createRoleGrantedEvent(
  role: Bytes,
  account: Address,
  sender: Address
): RoleGranted {
  let roleGrantedEvent = changetype<RoleGranted>(newMockEvent())

  roleGrantedEvent.parameters = new Array()

  roleGrantedEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromFixedBytes(role))
  )
  roleGrantedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  roleGrantedEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )

  return roleGrantedEvent
}

export function createRoleRevokedEvent(
  role: Bytes,
  account: Address,
  sender: Address
): RoleRevoked {
  let roleRevokedEvent = changetype<RoleRevoked>(newMockEvent())

  roleRevokedEvent.parameters = new Array()

  roleRevokedEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromFixedBytes(role))
  )
  roleRevokedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  roleRevokedEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )

  return roleRevokedEvent
}

export function createcompleteProjectEventEvent(
  user: Address,
  projectId: BigInt,
  amount: BigInt
): completeProjectEvent {
  let completeProjectEventEvent = changetype<completeProjectEvent>(
    newMockEvent()
  )

  completeProjectEventEvent.parameters = new Array()

  completeProjectEventEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  completeProjectEventEvent.parameters.push(
    new ethereum.EventParam(
      "projectId",
      ethereum.Value.fromUnsignedBigInt(projectId)
    )
  )
  completeProjectEventEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return completeProjectEventEvent
}

export function createcreateEvaluatorOfEventEvent(
  user: Address,
  projectId: BigInt,
  evaluators: Array<Address>
): createEvaluatorOfEvent {
  let createEvaluatorOfEventEvent = changetype<createEvaluatorOfEvent>(
    newMockEvent()
  )

  createEvaluatorOfEventEvent.parameters = new Array()

  createEvaluatorOfEventEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  createEvaluatorOfEventEvent.parameters.push(
    new ethereum.EventParam(
      "projectId",
      ethereum.Value.fromUnsignedBigInt(projectId)
    )
  )
  createEvaluatorOfEventEvent.parameters.push(
    new ethereum.EventParam(
      "evaluators",
      ethereum.Value.fromAddressArray(evaluators)
    )
  )

  return createEvaluatorOfEventEvent
}

export function createcreateUserEventEvent(
  owner: Address,
  username: string,
  points: BigInt,
  currentProject: BigInt,
  completedProjects: Array<BigInt>,
  created: boolean
): createUserEvent {
  let createUserEventEvent = changetype<createUserEvent>(newMockEvent())

  createUserEventEvent.parameters = new Array()

  createUserEventEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  createUserEventEvent.parameters.push(
    new ethereum.EventParam("username", ethereum.Value.fromString(username))
  )
  createUserEventEvent.parameters.push(
    new ethereum.EventParam("points", ethereum.Value.fromUnsignedBigInt(points))
  )
  createUserEventEvent.parameters.push(
    new ethereum.EventParam(
      "currentProject",
      ethereum.Value.fromUnsignedBigInt(currentProject)
    )
  )
  createUserEventEvent.parameters.push(
    new ethereum.EventParam(
      "completedProjects",
      ethereum.Value.fromUnsignedBigIntArray(completedProjects)
    )
  )
  createUserEventEvent.parameters.push(
    new ethereum.EventParam("created", ethereum.Value.fromBoolean(created))
  )

  return createUserEventEvent
}

export function createfailProjectEventEvent(
  userAddress: Address,
  projectId: BigInt
): failProjectEvent {
  let failProjectEventEvent = changetype<failProjectEvent>(newMockEvent())

  failProjectEventEvent.parameters = new Array()

  failProjectEventEvent.parameters.push(
    new ethereum.EventParam(
      "userAddress",
      ethereum.Value.fromAddress(userAddress)
    )
  )
  failProjectEventEvent.parameters.push(
    new ethereum.EventParam(
      "projectId",
      ethereum.Value.fromUnsignedBigInt(projectId)
    )
  )

  return failProjectEventEvent
}

export function createsubmitAttestationEventEvent(
  evaluator: Address,
  evaluatee: Address,
  projectId: BigInt,
  score: BigInt,
  evaluationFeedback: string
): submitAttestationEvent {
  let submitAttestationEventEvent = changetype<submitAttestationEvent>(
    newMockEvent()
  )

  submitAttestationEventEvent.parameters = new Array()

  submitAttestationEventEvent.parameters.push(
    new ethereum.EventParam("evaluator", ethereum.Value.fromAddress(evaluator))
  )
  submitAttestationEventEvent.parameters.push(
    new ethereum.EventParam("evaluatee", ethereum.Value.fromAddress(evaluatee))
  )
  submitAttestationEventEvent.parameters.push(
    new ethereum.EventParam(
      "projectId",
      ethereum.Value.fromUnsignedBigInt(projectId)
    )
  )
  submitAttestationEventEvent.parameters.push(
    new ethereum.EventParam("score", ethereum.Value.fromUnsignedBigInt(score))
  )
  submitAttestationEventEvent.parameters.push(
    new ethereum.EventParam(
      "evaluationFeedback",
      ethereum.Value.fromString(evaluationFeedback)
    )
  )

  return submitAttestationEventEvent
}

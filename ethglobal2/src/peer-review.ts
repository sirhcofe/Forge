import {
  RoleAdminChanged as RoleAdminChangedEvent,
  RoleGranted as RoleGrantedEvent,
  RoleRevoked as RoleRevokedEvent,
  completeProjectEvent as completeProjectEventEvent,
  createEvaluatorOfEvent as createEvaluatorOfEventEvent,
  createUserEvent as createUserEventEvent,
  failProjectEvent as failProjectEventEvent,
  submitAttestationEvent as submitAttestationEventEvent
} from "../generated/PeerReview/PeerReview"
import {
  RoleAdminChanged,
  RoleGranted,
  RoleRevoked,
  completeProjectEvent,
  createEvaluatorOfEvent,
  createUserEvent,
  failProjectEvent,
  submitAttestationEvent
} from "../generated/schema"

export function handleRoleAdminChanged(event: RoleAdminChangedEvent): void {
  let entity = new RoleAdminChanged(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.role = event.params.role
  entity.previousAdminRole = event.params.previousAdminRole
  entity.newAdminRole = event.params.newAdminRole

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRoleGranted(event: RoleGrantedEvent): void {
  let entity = new RoleGranted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.role = event.params.role
  entity.account = event.params.account
  entity.sender = event.params.sender

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRoleRevoked(event: RoleRevokedEvent): void {
  let entity = new RoleRevoked(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.role = event.params.role
  entity.account = event.params.account
  entity.sender = event.params.sender

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlecompleteProjectEvent(
  event: completeProjectEventEvent
): void {
  let entity = new completeProjectEvent(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.user = event.params.user
  entity.projectId = event.params.projectId
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlecreateEvaluatorOfEvent(
  event: createEvaluatorOfEventEvent
): void {
  let entity = new createEvaluatorOfEvent(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.user = event.params.user
  entity.projectId = event.params.projectId
  entity.evaluators = event.params.evaluators

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlecreateUserEvent(event: createUserEventEvent): void {
  let entity = new createUserEvent(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.owner = event.params.owner
  entity.username = event.params.username
  entity.points = event.params.points
  entity.currentProject = event.params.currentProject
  entity.completedProjects = event.params.completedProjects
  entity.created = event.params.created

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlefailProjectEvent(event: failProjectEventEvent): void {
  let entity = new failProjectEvent(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.userAddress = event.params.userAddress
  entity.projectId = event.params.projectId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlesubmitAttestationEvent(
  event: submitAttestationEventEvent
): void {
  let entity = new submitAttestationEvent(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.evaluator = event.params.evaluator
  entity.evaluatee = event.params.evaluatee
  entity.projectId = event.params.projectId
  entity.score = event.params.score
  entity.evaluationFeedback = event.params.evaluationFeedback

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

import { BigInt } from "@graphprotocol/graph-ts"
import {
  PeerReview,
  RoleAdminChanged,
  RoleGranted,
  RoleRevoked,
  completeProjectEvent,
  createEvaluatorOfEvent,
  createUserEvent,
  failProjectEvent,
  submitAttestationEvent
} from "../generated/PeerReview/PeerReview"
import { ExampleEntity } from "../generated/schema"

export function handleRoleAdminChanged(event: RoleAdminChanged): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = ExampleEntity.load(event.transaction.from)

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (!entity) {
    entity = new ExampleEntity(event.transaction.from)

    // Entity fields can be set using simple assignments
    entity.count = BigInt.fromI32(0)
  }

  // BigInt and BigDecimal math are supported
  entity.count = entity.count + BigInt.fromI32(1)

  // Entity fields can be set based on event parameters
  entity.role = event.params.role
  entity.previousAdminRole = event.params.previousAdminRole

  // Entities can be written to the store with `.save()`
  entity.save()

  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = Contract.bind(event.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // - contract.ADMIN_ROLE(...)
  // - contract.DEFAULT_ADMIN_ROLE(...)
  // - contract.EVALUATEE_ROLE(...)
  // - contract.EVALUATOR_ROLE(...)
  // - contract.OWNER_ROLE(...)
  // - contract.checkProjectExists(...)
  // - contract.evaluatorOf(...)
  // - contract.getRoleAdmin(...)
  // - contract.hasRole(...)
  // - contract.projects(...)
  // - contract.spInstance(...)
  // - contract.submitEvaluation(...)
  // - contract.supportsInterface(...)
  // - contract.userProfiles(...)
}

export function handleRoleGranted(event: RoleGranted): void {}

export function handleRoleRevoked(event: RoleRevoked): void {}

export function handlecompleteProjectEvent(event: completeProjectEvent): void {}

export function handlecreateEvaluatorOfEvent(
  event: createEvaluatorOfEvent
): void {}

export function handlecreateUserEvent(event: createUserEvent): void {}

export function handlefailProjectEvent(event: failProjectEvent): void {}

export function handlesubmitAttestationEvent(
  event: submitAttestationEvent
): void {}

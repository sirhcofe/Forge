import { BigInt } from "@graphprotocol/graph-ts"
import {
  PeerReview, 
  completeProjectEvent,
  createEvaluatorOfEvent,
  createUserEvent,
  failProjectEvent,
  submitAttestationEvent
} from "../generated/PeerReview/PeerReview"
import { User, Evaluation } from "../generated/schema"

export function handlecompleteProjectEvent(event: completeProjectEvent): void {
  let entity = User.load(event.params.user)!;
  entity.completedProject.push(event.params.projectId)
  entity.currentProject =  BigInt.fromI32(0);
  entity.evaluation = []
  entity.points = entity.points + event.params.amount
  entity.save()
}

export function handlecreateEvaluatorOfEvent(
  event: createEvaluatorOfEvent
): void {
  for (let i = 0; i < event.params.evaluators.length; i++) {
    let entity = new Evaluation(event.params.user.concat(event.params.evaluators[i]))
    let evaluatee = User.load(event.params.user)!
    let evaluator = User.load(event.params.evaluators[i])!
    entity.evaluatee = evaluatee.id
    entity.evaluator = evaluator.id
    entity.projectId = event.params.projectId 
    entity.save()
  }
}

export function handlecreateUserEvent(event: createUserEvent): void {
  let entity = User.load(event.params.owner)
  if (entity == null)
    entity = new User(
      event.params.owner)
  
  entity.username = event.params.username;
  entity.points = event.params.points;
  entity.currentProject = event.params.currentProject;
  entity.completedProject = [];
  entity.blockTimestamp = event.block.timestamp
  entity.save()
}

export function handlefailProjectEvent(event: failProjectEvent): void {
  let entity = User.load(event.params.userAddress)!
  entity.currentProject = BigInt.fromI32(0);
  entity.evaluation = []
  entity.save()
}

export function handlesubmitAttestationEvent(
  event: submitAttestationEvent
): void {
  let entity = Evaluation.load(event.params.evaluator.concat(event.params.evaluatee))!
  entity.score = event.params.score;
  entity.blockTimeStamp = event.block.timestamp; 
  entity.save()
}

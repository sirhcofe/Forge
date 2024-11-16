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
  let entity = User.load(event.params.user.toHexString());
  entity.completedProjects.push(event.params.user.projectId)
  entity.score += event.params.amount
  entity.save()
}

export function handlecreateEvaluatorOfEvent(
  event: createEvaluatorOfEvent
): void {
  for (let i = 0; i < event.params.evaluators.length; i++) {
    let entity = Evaluation.load(event.params.user.toHexString() + event.params.evaluators[i].toHexString())
    if (entity == null) {
      entity = new Evaluation(
        event.params.user.toHexString() + event.params.evaluators[i].toHexString()
      )
    }
    entity.projectId = event.params.projectId 
    entity.save()
  }
}

export function handlecreateUserEvent(event: createUserEvent): void {
  let entity = User.load(event.params.owner.toHexString())
  if (entity == null)
    entity = new User(
      event.params.owner.toHexString()
  )
  entity.username = event.params.username;
  entity.points = event.params.points;
  entity.currentProject = event.params.currentProject;
  entity.completedProjects = [];
  entity.evaluated = [];
  entity.evaluation = [];
  entity.blockTimestamp = event.block.timestamp
  entity.save()
}

export function handlefailProjectEvent(event: failProjectEvent): void {
  let entity = User.load(event.params.userAddress.toHexString())
  entity.currentProject = 0
  entity.save()
}

export function handlesubmitAttestationEvent(
  event: submitAttestationEvent
): void {
  let entity = Evaluation.load(event.params.evaluator.toHexString() + event.params.evaluatee.toHexString())
  entity.score = event.params.score;
  entity.evaluationFeedback = event.params.evaluationFeedback;
  entity.save()
}

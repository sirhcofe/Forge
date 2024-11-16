import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as"
import { Bytes, Address, BigInt } from "@graphprotocol/graph-ts"
import { RoleAdminChanged } from "../generated/schema"
import { RoleAdminChanged as RoleAdminChangedEvent } from "../generated/PeerReview/PeerReview"
import { handleRoleAdminChanged } from "../src/peer-review"
import { createRoleAdminChangedEvent } from "./peer-review-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let role = Bytes.fromI32(1234567890)
    let previousAdminRole = Bytes.fromI32(1234567890)
    let newAdminRole = Bytes.fromI32(1234567890)
    let newRoleAdminChangedEvent = createRoleAdminChangedEvent(
      role,
      previousAdminRole,
      newAdminRole
    )
    handleRoleAdminChanged(newRoleAdminChangedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("RoleAdminChanged created and stored", () => {
    assert.entityCount("RoleAdminChanged", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "RoleAdminChanged",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "role",
      "1234567890"
    )
    assert.fieldEquals(
      "RoleAdminChanged",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "previousAdminRole",
      "1234567890"
    )
    assert.fieldEquals(
      "RoleAdminChanged",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "newAdminRole",
      "1234567890"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})

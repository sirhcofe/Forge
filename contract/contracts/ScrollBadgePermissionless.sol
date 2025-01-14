// SPDX-License-Identifier: MIT

pragma solidity 0.8.19;

// import {Attestation} from "@eas/contracts/IEAS.sol";
import { Attestation } from '@ethereum-attestation-service/eas-contracts/contracts/IEAS.sol';

import { ScrollBadge } from './ScrollBadge.sol';
import { ScrollBadgeDefaultURI } from './extensions/ScrollBadgeDefaultURI.sol';
import { ScrollBadgeEligibilityCheck } from './extensions/ScrollBadgeEligibilityCheck.sol';
import { ScrollBadgeSelfAttest } from './extensions/ScrollBadgeSelfAttest.sol';
import { ScrollBadgeSingleton } from './extensions/ScrollBadgeSingleton.sol';

interface IPeerReview {
  function hasCompletedProject(
    address userAddress,
    uint256 projectId
  ) external view returns (bool);
}

/// @title ScrollBadgePermissionless
/// @notice A simple badge that anyone can mint in a permissionless manner.
contract ScrollBadgePermissionless is
  ScrollBadgeDefaultURI,
  ScrollBadgeEligibilityCheck,
  ScrollBadgeSelfAttest,
  ScrollBadgeSingleton
{
  address public contractAddress;
  error Unauthorized();

  constructor(
    address resolver_,
    string memory _defaultBadgeURI,
    address peerContract
  ) ScrollBadge(resolver_) ScrollBadgeDefaultURI(_defaultBadgeURI) {
    contractAddress = peerContract;
  }

  /// @inheritdoc ScrollBadge
  function onIssueBadge(
    Attestation calldata attestation
  )
    internal
    virtual
    override(ScrollBadge, ScrollBadgeSelfAttest, ScrollBadgeSingleton)
    returns (bool)
  {
    if (!super.onIssueBadge(attestation)) {
      return false;
    }

    if (attestation.attester != contractAddress) {
      revert Unauthorized();
    }
    return true;
  }

  /// @inheritdoc ScrollBadge
  function onRevokeBadge(
    Attestation calldata attestation
  )
    internal
    virtual
    override(ScrollBadge, ScrollBadgeSelfAttest, ScrollBadgeSingleton)
    returns (bool)
  {
    return super.onRevokeBadge(attestation);
  }
}


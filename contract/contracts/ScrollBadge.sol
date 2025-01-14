// SPDX-License-Identifier: MIT

pragma solidity 0.8.19;

// import {Attestation} from "@eas/contracts/IEAS.sol";

import {Attestation} from '@ethereum-attestation-service/eas-contracts/contracts/IEAS.sol';

import {decodeBadgeData} from "./Common.sol";
import {IScrollBadge} from "./IScrollBadge.sol";
import {IScrollBadgeResolver} from "./IScrollBadgeResolver.sol";
import {AttestationBadgeMismatch, Unauthorized} from "./Errors.sol";

/// @title ScrollBadge
/// @notice This contract implements the basic functionalities of a Scroll badge.
///         It serves as the base contract for more complex badge functionalities.
abstract contract ScrollBadge is IScrollBadge {
    // The global Scroll badge resolver contract.
    address public immutable resolver;

    // wallet address => badge count
    mapping(address => uint256) private _userBadgeCount;

    /// @dev Creates a new ScrollBadge instance.
    /// @param resolver_ The address of the global Scroll badge resolver contract.
    constructor(address resolver_) {
        resolver = resolver_;
    }

    /// @inheritdoc IScrollBadge
    function issueBadge(Attestation calldata attestation) public returns (bool) {
        // only callable from resolver
        if (msg.sender != address(resolver)) {
            revert Unauthorized();
        }

        // delegate logic to subcontract
        if (!onIssueBadge(attestation)) {
            return false;
        }

        _userBadgeCount[attestation.recipient] += 1;

        emit IssueBadge(attestation.uid);
        return true;
    }

    /// @inheritdoc IScrollBadge
    function revokeBadge(Attestation calldata attestation) public returns (bool) {
        // only callable from resolver
        if (msg.sender != address(resolver)) {
            revert Unauthorized();
        }

        // delegate logic to subcontract
        if (!onRevokeBadge(attestation)) {
            return false;
        }

        _userBadgeCount[attestation.recipient] -= 1;

        emit RevokeBadge(attestation.uid);
        return true;
    }

    /// @notice A resolver callback that should be implemented by child contracts.
    /// @param {attestation} The new attestation.
    /// @return Whether the attestation is valid.
    function onIssueBadge(Attestation calldata /*attestation*/ ) internal virtual returns (bool) {
        return true;
    }

    /// @notice A resolver callback that should be implemented by child contracts.
    /// @param {attestation} The existing attestation to be revoked.
    /// @return Whether the attestation can be revoked.
    function onRevokeBadge(Attestation calldata /*attestation*/ ) internal virtual returns (bool) {
        return true;
    }

    /// @inheritdoc IScrollBadge
    function getAndValidateBadge(bytes32 uid) public view returns (Attestation memory) {
        Attestation memory attestation = IScrollBadgeResolver(resolver).getAndValidateBadge(uid);

        (address badge,) = decodeBadgeData(attestation.data);

        if (badge != address(this)) {
            revert AttestationBadgeMismatch(uid);
        }

        return attestation;
    }

    /// @inheritdoc IScrollBadge
    function badgeTokenURI(bytes32 uid) public view virtual returns (string memory);

    /// @inheritdoc IScrollBadge
    function hasBadge(address user) public view virtual returns (bool) {
        return _userBadgeCount[user] > 0;
    }
}

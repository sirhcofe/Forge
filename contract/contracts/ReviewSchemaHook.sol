// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IPeerReview {
  function addUserPoints(address userAddress, uint256 amount) external;
  function completeProject(address userAddress, uint256 projectId, uint256 amount) external;
}

contract ReviewSchemaHook {
  IPeerReview public peerReview;

  constructor(address peerReviewAddress) {
    peerReview = IPeerReview(peerReviewAddress);
  }
}

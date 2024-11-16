// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import { parseEther } from "viem";

const peerReviewModule = buildModule("PeerReviewModule", (m) => {
    const schemaID = "0x55"
  const peerReview = m.contract("PeerReview", [parseInt(schemaID, 16)]);

  return { peerReview };
});

export default peerReviewModule;


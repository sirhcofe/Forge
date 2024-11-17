// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import { parseEther } from "viem";

require("dotenv").config();

const resolverAddress = process.env.SCROLL_SEPOLIA_BADGE_RESOLVER_ADDRESS;
console.log("RESOLVER ADDY: ", resolverAddress);

if (!resolverAddress) {
  throw new Error("No resolver address");
}

const reviewSchemaHookModule = buildModule("ScrollBadgePermissionless", (m) => {
  const reviewSchemaHook = m.contract("ScrollBadgePermissionless", [process.env.SCROLL_SEPOLIA_BADGE_RESOLVER_ADDRESS, "http://www.example.com/animal/actor.html", process.env.CONTRACT_ADDRESS]);

  return { reviewSchemaHook };
});

export default reviewSchemaHookModule;



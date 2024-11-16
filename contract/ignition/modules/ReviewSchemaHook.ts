// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import { parseEther } from "viem";

require("dotenv").config

const reviewSchemaHookModule = buildModule("ReviewSchemaHookModule", (m) => {
  const reviewSchemaHook = m.contract("ReviewSchemaHook", [process.env.CONTRACT_ADDRESS]);

  return { reviewSchemaHook };
});

export default reviewSchemaHookModule;


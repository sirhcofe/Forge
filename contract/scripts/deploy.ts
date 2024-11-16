import { ethers } from "hardhat";

async function main() {
  // Replace with the contract you want to deploy
  const ContractName = "Lock"; // Change to the contract you want to deploy
  const ContractFactory = await ethers.getContractFactory(ContractName);

  console.log(`Deploying ${ContractName} contract...`);

  // Deploy the contract (add constructor parameters if needed)
  const contract = await ContractFactory.deploy();
  await contract.deployed();

  console.log(`${ContractName} contract deployed at: ${contract.address}`);
}

// Run the main function and handle errors
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

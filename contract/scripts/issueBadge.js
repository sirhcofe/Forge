import { http, createPublicClient } from 'viem'
import { scrollSepolia } from 'viem/chains'
// import { web3 } from 'hardhat';
import web3 from "@nomicfoundation/hardhat-web3-v4";
import * as ScrollBadge from '../artifacts/contracts/ScrollBadgePermissionless.sol/ScrollBadgePermissionless.json';

const client = createPublicClient({
  chain: scrollSepolia,
  transport: http(),
})

const address = '0xca11bde05977b3631167028862be2a173976ca11';
const abi = ScrollBadge.abi;

let contract = new web3.eth.Contract(abi, address);

await contract.methods.onIssueBadge

// Note: this is a naive example – you should probably use multicall for these
// types of batched reads instead.
// const [name, totalSupply, symbol, tokenUri, balance] = await Promise.all([
//   client.readContract({
//     ...wagmiContract,
//     functionName: 'name',
//   }),
//   client.readContract({
//     ...wagmiContract,
//     functionName: 'totalSupply',
//   }),
//   client.readContract({
//     ...wagmiContract,
//     functionName: 'symbol',
//   }),
//   client.readContract({
//     ...wagmiContract,
//     functionName: 'tokenURI',
//     args: [420n],
//   }),
//   client.readContract({
//     ...wagmiContract,
//     functionName: 'balanceOf',
//     args: [address],
//   }),
// ])

// async function main() {
//   const [account] = await hre.ethers.getSigners();
//
//   const contractAddress = '0xca11bde05977b3631167028862be2a173976ca11';
//   const contract = new ethers.Contract(contractAddress, abi, account);
//
//   const attestation = {
//     // Example attestation structure
//     attestationId: 12345,
//     holder: '0x985F554cEab743cDF91D2F0D08c8Fca8871eD406',
//     metadata: 'Some metadata here',
//   };
//
//   // Encode the data for the contract call
//   const data = await contract.populateTransaction.onIssueBadge(attestation);
//
//   console.log('Encoded function data:', data);
//
//   // Send the transaction
//   const tx = await account.sendTransaction({
//     to: contractAddress,
//     data: data.data,
//   });
//
//   console.log('Transaction sent, hash:', tx.hash);
//
//   // Wait for the transaction to be mined
//   const receipt = await tx.wait();
//
//   console.log('Transaction mined:', receipt);
//   console.log('Logs:', receipt.logs);
// }
//
// main().catch((error) => {
//   console.error(error);
//   process.exitCode = 1;
// });

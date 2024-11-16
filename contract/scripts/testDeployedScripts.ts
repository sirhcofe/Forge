import { createPublicClient, http, createWalletClient, parseEther, defineChain, encodeFunctionData } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
// import { * as ScrollBadgePermissionlessAbi } from '../abis/ScrollBadgePermissionlessAbi'; // Ensure to have ABI imported
import * as ScrollPermissionlessBadgeArtifact from '../artifacts/contracts/ScrollBadgePermissionless.sol/ScrollBadgePermissionless.json';

require('dotenv').config();

// Define the custom chain configuration for Scroll Sepolia
// const scrollSepoliaChain = {
//   id: 534351, // Scroll Sepolia chain ID
//   name: 'scrollSepolia',
//   network: 'scrollSepolia',
//   nativeCurrency: {
//     decimals: 18,
//     name: 'Sepolia Ether',
//     symbol: 'sETH',
//   },
//   rpcUrls: {
//     default: [ 'https://sepolia-rpc.scroll.io/' ], // RPC URL for Sepolia
//   },
//   blockExplorers: {
//     default: {
//       name: 'ScrollScan',
//       url: 'https://sepolia.scrollscan.com/',
//     },
//   },
// };


const abi = ScrollPermissionlessBadgeArtifact.abi;
const scrollSepolia = /*#__PURE__*/ defineChain({
  id: 534_351,
  name: 'Scroll Sepolia',
  nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['https://sepolia-rpc.scroll.io'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Scrollscan',
      url: 'https://sepolia.scrollscan.com',
      apiUrl: 'https://api-sepolia.scrollscan.com/api',
    },
  },
  contracts: {
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 9473,
    },
  },
  testnet: true,
})

// Extract account address from the private key
const privateKey = process.env.PRIVATE_KEY;
if (!privateKey) {
  throw new Error('Private key is required');
}
const account = privateKeyToAccount(`0x${privateKey}`);

// Set up the public client to interact with the Scroll Sepolia network
const publicClient = createPublicClient({
  chain: scrollSepolia, // Define the network
  transport: http('https://sepolia-rpc.scroll.io/'), // Sepolia RPC URL
});

// Set up the wallet client (make sure the private key is correct)
const walletClient = createWalletClient({
  chain: scrollSepolia,
  transport: http('https://sepolia-rpc.scroll.io/'),
  account: account,
});

const contractAddress = process.env.SCROLL_BADGE_PERMISSIONLESS_ADDRESS || '';

if (!contractAddress) {
  throw new Error('Contract address is not defined. Please set SCROLL_BADGE_PERMISSIONLESS_ADDRESS.');
}

async function main() {
  try {
    // Example: Interacting with the deployed contract's `onIssueBadge` function
    const attestation = {
      // Example attestation structure, ensure it matches your contract's requirement
      attestationId: 12345,
      holder: '0x985F554cEab743cDF91D2F0D08c8Fca8871eD406', 
      metadata: 'Some metadata here',
    };

    // Encode the data and prepare the transaction call
    // const data = publicClient.encodeFunctionData('onIssueBadge', [attestation]);
    const data = encodeFunctionData({
      abi,
      functionName: 'onIssueBadge',
      args: [attestation]
    })

    console.log('Encoded function data:', data);
    const { request } = await publicClient.simulateContract({
      account,
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      abi: abi,
      functionName: 'onIssueBadge',
    })
    console.log("request: ", request);
    const hash = await walletClient.writeContract({
      account,
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      abi: abi,
      functionName: 'onIssueBadge',
    });

    console.log("hash: ", hash);
    // Wait for the transaction to be mined
    const receipt = await publicClient.waitForTransactionReceipt({ hash });

    // Listen for the IssueBadge event using the receipt's transaction hash
    const logs = receipt.logs;

  } catch (error) {
    console.error('Error interacting with contract:', error);
  }
}

main();


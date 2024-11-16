import type { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-web3-v4";
import "@nomicfoundation/hardhat-toolbox-viem";

require("dotenv").config()

const preconf = {
  solidity: {
    compilers: [
      {
        version: "0.8.19", // The version your contracts currently use
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: "0.8.20", // Version for the external dependencies (e.g., @openzeppelin, @ethsign)
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: "0.8.27", // For your Lock.sol contract or other specific contracts
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
};

const config: HardhatUserConfig = {
  ...preconf,
  networks: {
    scrollSepolia: {
      url: "https://sepolia-rpc.scroll.io/",
      accounts:[process.env.PRIVATE_KEY, "c221d9dd5e7f11ac40c7aae0c5d83990a01d1696c87dfd0205e19ce2b2e06475"]
    },
  },
  etherscan: {
    apiKey: {
      scrollSepolia: process.env.ETHERSCAN_SCROLL_API || "",
    },
    customChains: [
      {
        network: 'scrollSepolia',
        chainId: 534351,
        urls: {
          apiURL: 'https://api-sepolia.scrollscan.com/api',
          browserURL: 'https://sepolia.scrollscan.com/',
        },
      },
    ],
  },
};

export default config;

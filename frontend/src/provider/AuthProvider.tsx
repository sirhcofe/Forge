import { Web3AuthContextType } from "@/types/user";
import { AuthAdapter, AuthUserInfo } from "@web3auth/auth-adapter";
import {
  AccountAbstractionProvider,
  BiconomySmartAccount,
  SafeSmartAccount,
} from "@web3auth/account-abstraction-provider";
import { MetamaskAdapter } from "@web3auth/metamask-adapter";
import {
  CHAIN_NAMESPACES,
  UX_MODE,
  IProvider,
  WALLET_ADAPTERS,
  WEB3AUTH_NETWORK,
  ADAPTER_STATUS,
} from "@web3auth/base";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { Web3AuthNoModal } from "@web3auth/no-modal";
import { Web3Auth, Web3AuthOptions } from "@web3auth/modal";

import { createContext, useEffect, useState } from "react";
import RPC from "@/utils/ethersRPC";
import toast from "react-hot-toast";
import {
  createPublicClient,
  createWalletClient,
  custom,
  encodeFunctionData,
  parseAbi,
  PublicClient,
  WalletClient,
} from "viem";
import { polygonZkEvmTestnet, scrollSepolia, sepolia } from "viem/chains";
import {
  BiconomySmartAccountV2,
  createPaymaster,
  createSmartAccountClient,
  IPaymaster,
  PaymasterMode,
} from "@biconomy/account";
import { ethers } from "ethers";

export const Web3AuthContext = createContext<Web3AuthContextType | null>(null);

const clientId = import.meta.env.VITE_WEB3AUTH_CLIENT_ID;

const biconomyConfig = {
  biconomyPaymasterApiKey: import.meta.env.VITE_BICONOMY_PAYMASTER_API_KEY,
  bundleUrl: "https://bundler.biconomy.io/api/v2/534351/nJPK7B3ru.dd7f7861-190d-41bd-af80-6877f74b8f44"
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [web3Auth, setWeb3Auth] = useState<Web3AuthNoModal | null>(null);
  const [web3AuthProvider, setWeb3AuthProvider] = useState<IProvider | null>(
    null
  );
  const [viemPublicClient, setViemPublicClient] = useState<PublicClient>();
  const [viemWalletClient, setViemWalletClient] = useState<WalletClient>();
  //   const [smartWallet, setSmartWallet] = useState<WalletClient>();
  const [pushWalletClient, setPushWalletClient] = useState<WalletClient>();
  const [smartWallet, setSmartWallet] = useState<BiconomySmartAccountV2>();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] =
    useState<Partial<AuthUserInfo & { address: `0x${string}` }>>();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      try {
        const chainConfig = {
          chainNamespace: CHAIN_NAMESPACES.EIP155,
          chainId: "0x8274F", // hex of 534351, Scroll Sepolia Testnet
          rpcTarget: "https://sepolia-rpc.scroll.io",
          displayName: "Scroll Sepolia Testnet",
          blockExplorerUrl: "https://sepolia.scrollscan.com",
          ticker: "ETH",
          tickerName: "ETH",
          logo: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
        };

        const accountAbstractionProvider = new AccountAbstractionProvider({
          config: {
            chainConfig,
            // smartAccountInit: new BiconomySmartAccount(),
            smartAccountInit: new SafeSmartAccount(),
            bundlerConfig: {
              url: import.meta.env.VITE_PIMLICO_RPC_URL,
              // url: biconomyConfig.bundleUrl,
              // paymasterContext: {
              //   mode: "SPONSORED",
              //   calculateGasLimits: true,
              //   expiryDuration: 300,
              //   sponsorshipInfo: {
              //     webhookData: {},
              //     smartAccountInfo: {
              //       name: "BICONOMY",
              //       version: "2.0.0",
              //     },
              //   },
              // },
            },
            paymasterConfig: {
              // url: import.meta.env.VITE_BICONOMY_PAYMASTER_URL,
              url: import.meta.env.VITE_PIMLICO_RPC_URL,
            },
          },
        });

        // console.log(accountAbstractionProvider);

        const privateKeyProvider = new EthereumPrivateKeyProvider({
          config: { chainConfig },
        });

        const web3AuthOptions: Web3AuthOptions = {
          clientId: import.meta.env.VITE_WEB3AUTH_CLIENT_ID || "",
          web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
          privateKeyProvider,
          accountAbstractionProvider,
        };

        const web3AuthInstance = new Web3AuthNoModal(web3AuthOptions);

        const web3AuthAdapter = new AuthAdapter({
          adapterSettings: {
            uxMode: UX_MODE.REDIRECT,
            loginConfig: {
              google: {
                verifier: "peerflux-g",
                typeOfLogin: "google",
                clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
              },
            },
          },
        });
        web3AuthInstance.configureAdapter(web3AuthAdapter);
        // const metamaskAdapter = new MetamaskAdapter({
        //   clientId,
        //   sessionTime: 3600, // 1 hour in seconds
        //   web3AuthNetwork: "sapphire_devnet",
        //   chainConfig,
        // });
        // web3AuthInstance.configureAdapter(metamaskAdapter as any);

        setWeb3Auth(web3AuthInstance);

        await web3AuthInstance.init();
        setWeb3AuthProvider(web3AuthInstance.provider);
      } catch (error) {
        console.error("web3auth init failed", error);
      }
    };
    init();
  }, []);

  useEffect(() => {
    console.log("w3a provider", web3Auth);
    if (web3Auth && web3AuthProvider) {
      if (web3Auth.status === ADAPTER_STATUS.CONNECTED && !isLoggedIn)
        postLoginFlow(web3AuthProvider);
      setTimeout(() => {
        // small timeout to wait for set state to finish before setIsLoading to false
        setIsLoading(false);
      }, 300);
    }
  }, [web3Auth?.status, web3AuthProvider, isLoggedIn]);

  const login = async () => {
    console.log(web3Auth);
    if (web3Auth) {
      //   const web3AuthProvider = await web3Auth.connectTo(WALLET_ADAPTERS.AUTH, {
      //     loginProvider: "jwt",
      //     extraLoginOptions: {
      //       domain: import.meta.env.VITE_AUTH0_DOMAIN,
      //       verifierIdField: "sub",
      //       connection: "worldcoin",
      //     },
      //   });
      const web3AuthProvider = await web3Auth.connectTo(WALLET_ADAPTERS.AUTH, {
        loginProvider: "google",
      });
      setWeb3AuthProvider(web3AuthProvider);
      postLoginFlow(web3AuthProvider);
    } else {
      toast.error("Web3Auth not initialized yet!");
      throw new Error("Web3Auth not initialized yet!");
    }
  };

  const authenticateUser = async () => {
    if (web3Auth) {
      const idToken = await web3Auth.authenticateUser();
      console.debug("User successfully verified!", idToken);
      return idToken;
    } else {
      toast.error("Web3Auth not initialized yet!");
      return;
    }
  };

  const getUserInfo = async () => {
    if (web3Auth) {
      const user = await web3Auth.getUserInfo();
      console.debug("Get user successful!", user);
      return user;
    } else {
      console.debug("Web3Auth not initialized yet!");
      return;
    }
  };

  const postLoginFlow = async (provider: IProvider | null) => {
    console.log("here");
    if (!web3Auth?.connected || !provider) {
      toast.error("Login failed!");
      return;
    }
    const user = await getUserInfo();
    const address = await RPC.getAccounts(provider);
    setUser({ ...user, address });

    const pClient: any = createPublicClient({
      chain: scrollSepolia,
      transport: custom(web3AuthProvider!),
    });
    setViemPublicClient(pClient);
    // const [account] = await window.ethereum!.request({ method: 'eth_requestAccounts' })

    const wClient = createWalletClient({
      account: address,
      chain: scrollSepolia,
      transport: custom(web3AuthProvider!),
    });
    setViemWalletClient(wClient);
    // const sw = createWalletClient({
    //   account: address,
    //   chain: scrollSepolia,
    //   transport: custom(web3AuthProvider!),
    // });
    // console.log(sw);
    // setSmartWallet(sw);

    const pushClient = createWalletClient({
      account: address,
      chain: sepolia,
      transport: custom(web3AuthProvider!),
    });
    setPushWalletClient(pushClient);

    const ethersProvider = new ethers.providers.Web3Provider(provider);
    const paymaster: IPaymaster = await createPaymaster({
      paymasterUrl: `https://paymaster.biconomy.io/api/v1/534351/${biconomyConfig.biconomyPaymasterApiKey}`,
      strictMode: false,
    });
    const smartWallet = await createSmartAccountClient({
      signer: ethersProvider.getSigner(),
      biconomyPaymasterApiKey: biconomyConfig.biconomyPaymasterApiKey,
      bundlerUrl: biconomyConfig.bundleUrl,
      paymaster: paymaster,
      rpcUrl: "https://sepolia-rpc.scroll.io",
      chainId: 534351,
    });
    setSmartWallet(smartWallet);


    const userInfo = await getUserInfo();
    const encodedCall = encodeFunctionData({
      abi: parseAbi(["function createUser(string memory username) external"]),
      functionName: "createUser",
      args: [userInfo?.name || "John Doe"],
    });
    const tx = {
      to: import.meta.env.VITE_SMART_CONTRACT_ADDR,
      data: encodedCall,
      account: wClient!.account!.address,
      value: "0x0"
    };
    try {
      await wClient.sendTransaction(tx as any)
    } catch (error) {
      console.error("Error sending transaction", error)
    }
  };

  const logout = async () => {
    if (web3Auth) {
      await web3Auth.logout();
      setIsLoggedIn(false);
      setWeb3AuthProvider(null);
      setUser(undefined);
    } else {
      toast.error("Web3Auth not initialized yet!");
      return;
    }
  };

  return (
    <Web3AuthContext.Provider
      value={{
        isLoading,
        user,
        viemPublicClient,
        viemWalletClient,
        pushWalletClient,
        smartWallet,
        login,
        logout,
        authenticateUser,
      }}
    >
      {children}
    </Web3AuthContext.Provider>
  );
};

import { AuthUserInfo } from "@web3auth/auth-adapter";
import { PublicClient, WalletClient } from "viem";
import { BOKWGeoABI } from "@/abis/BOKWGeoABI";

export type Web3AuthContextType = {
  isLoading: boolean;
  user: Partial<AuthUserInfo & { address: `0x${string}` }> | undefined;
  viemPublicClient?: PublicClient;
  viemWalletClient?: WalletClient;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  authenticateUser: () => Promise<UserAuthInfo | undefined>;
};

import { AuthUserInfo } from "@web3auth/auth-adapter";
import { PublicClient, WalletClient } from "viem";

export type Web3AuthContextType = {
  isLoading: boolean;
  user: Partial<AuthUserInfo & { address: `0x${string}` }> | undefined;
  viemPublicClient?: PublicClient;
  viemWalletClient?: WalletClient;
  smartWallet: BiconomySmartAccountV2 | undefined;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  authenticateUser: () => Promise<UserAuthInfo | undefined>;
};

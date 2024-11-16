import { Web3AuthContext } from "@/provider/AuthProvider";
import { Web3AuthContextType } from "@/types/user";
import { useContext } from "react";

export const useWeb3Auth = () => {
  const {
    isLoading,
    user,
    viemPublicClient,
    viemWalletClient,
    smartWallet,
    login,
    logout,
    authenticateUser,
  } = useContext(Web3AuthContext) as Web3AuthContextType;

  return {
    isLoading,
    user,
    viemPublicClient,
    viemWalletClient,
    smartWallet,
    login,
    logout,
    authenticateUser,
  };
};

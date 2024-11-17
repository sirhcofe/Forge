import { parseGwei } from "viem";
import { useWeb3Auth } from "./useWeb3Auth";

export const useSendTransaction = () => {
    const { viemWalletClient, viemPublicClient } = useWeb3Auth();

    const sendTransaction = async (encodedCall: `0x${string}`) => {
        // const maxPriorityFeePerGas = await viemPublicClient!.estimateMaxPriorityFeePerGas()
        const tx = {
            to: import.meta.env.VITE_SMART_CONTRACT_ADDR,
            data: encodedCall,
            account: viemWalletClient!.account!.address,
            value: "0x0",
            // maxFeePerGas: Number(maxPriorityFeePerGas),
            // maxPriorityFeePerGas: Number(maxPriorityFeePerGas),
            maxFeePerGas: parseGwei("100"),
            maxPriorityFeePerGas: parseGwei("100"),

        };
        const hash = await viemWalletClient!.sendTransaction(tx as any);
        const receipt = await viemPublicClient!.waitForTransactionReceipt({ hash });
        console.log(receipt);

    }

    return {
        sendTransaction
    };
}

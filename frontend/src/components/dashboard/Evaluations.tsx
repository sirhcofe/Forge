import { useState } from "react";
import Button from "../Button";
import { LuTimer } from "react-icons/lu";
import { encodeFunctionData, parseAbi } from "viem";
import { useWeb3Auth } from "@/hooks/useWeb3Auth";
import test from "./test.json";
import { PaymasterMode, UserOpResponse } from "@biconomy/account";
import { Chat } from "@pushprotocol/restapi/src/lib/pushapi/chat";
import ChatModal from "../ChatModal";
import evals from "./evals.json";

const NoEval = () => {
  const { smartWallet, viemPublicClient, user } = useWeb3Auth();

  const handleClick = async () => {

    const data = {
      projectId: BigInt(1),
      score: BigInt(50),
      evaluatee: user?.address || "0x0",
      evaluationFeedback: "Great job!",
    }
    const encodedCall = encodeFunctionData({
      abi: parseAbi(["function submitEvaluation(Evaluations memory evaluationData) external returns (uint256)", "struct Evaluations { uint256 projectId; uint256 score; address evaluatee; string evaluationFeedback;}"]),
      functionName: "submitEvaluation",
      args: [data],
    });

    /** The following is when using Biconomy smart wallet **/
    const tx = {
      to: import.meta.env.VITE_SMART_CONTRACT_ADDR,
      data: encodedCall,
    };

    const { waitForTxHash } = (await smartWallet?.sendTransaction(tx, {
      paymasterServiceData: { mode: PaymasterMode.SPONSORED },
    })) as UserOpResponse;
    const { transactionHash, userOperationReceipt } = await waitForTxHash();
    console.log("tx", transactionHash);
  };

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex flex-col flex-1 items-center justify-center">
        <p className="px-3 text-sm">No scheduled evaluations!</p>
      </div>

      <Button className="mt-auto" onClick={handleClick}>
        Eval a project
      </Button>
    </div>
  );
};

const CurrentEval = ({ currentEval }: { currentEval: any }) => {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <div className="w-full h-full flex flex-col">
      {currentEval.map((evall: any, index: number) => {
        return (
          <>
            {index ? <div className="w-full h-[1px] bg-black/50" /> : null}
            <div
              className={`flex flex-col my-1 py-1 gap-y-1 ${evall.evalOthers
                ? "bg-gradient-to-r from-primary-light to-transparent to-10%"
                : "bg-gradient-to-l from-accent to-transparent to-10%"
                }`}
            >
              {evall.evalOthers ? (
                <p className="w-full px-3 text-sm" key={index}>
                  You will evaluate someone's {evall.project}!
                </p>
              ) : (
                <p className="w-full px-3 text-sm" key={index}>
                  You will be evaluated on {evall.project}!
                </p>
              )}
              <div className="w-full flex items-center px-3 gap-x-1">
                <LuTimer />
                <p className="flex flex-1">3h</p>
                <Button className="text-sm !py-1 !px-6 !mr-8" small onClick={() => setIsOpened(true)}>
                  More
                </Button>
              </div>
              <ChatModal isOpen={isOpened} setOpen={setIsOpened} />
            </div>
          </>
        );
      })}
    </div>
  );
};

const Evaluations = () => {
  const [currentEval, setCurrentEval] = useState<any | undefined>(undefined);

  // TODO: remove later
  const handleClick = () => {
    if (currentEval) setCurrentEval(undefined);
    else
      setCurrentEval([
        {
          project: "NFT Art Gallery",
          evalOthers: false,
        },
        {
          project: "DeFi Dashboard",
          evalOthers: true,
        },
      ]);
  };


  return (
    <div className="relative w-full h-full flex flex-col">
      <button
        className="absolute top-2 left-2 w-5 h-5 rounded-full bg-red-400"
        onClick={handleClick}
      />
      <h2>Evaluations</h2>
      {currentEval ? <CurrentEval currentEval={currentEval} /> : <NoEval />}
    </div>
  );
};

export default Evaluations;

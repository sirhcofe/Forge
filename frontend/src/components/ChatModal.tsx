import { useContext, useEffect, useRef, useState } from "react"
import { AppDataContext, ChatMessage } from "./DataProviders"
import * as Dialog from "@radix-ui/react-dialog";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import Card from "./Card";
import Button from "./Button";
import { usePushProtocolContext } from "@/hooks/usePushProtocol";
import { useWeb3Auth } from "@/hooks/useWeb3Auth";
import { encodeFunctionData, parseAbi } from "viem";
import { PaymasterMode, UserOpResponse } from "@biconomy/account";
import { IoSend } from "react-icons/io5";
import { useSendTransaction } from "@/hooks/useSendTransaction";
import EvaluationModal from "./EvaluationModal";




const ChatModal = ({ isOpen, setOpen }: { isOpen: boolean; setOpen: (open: boolean) => void }) => {
  const appData = useContext(AppDataContext);
  const { chatInstance } = usePushProtocolContext();
  const { smartWallet, viemPublicClient, user } = useWeb3Auth();
  const [isLoading, setIsLoading] = useState(false);
  const [chats, setChats] = useState<ChatMessage[] | undefined>(undefined);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const { sendTransaction } = useSendTransaction();



  const handleEval = async () => {
    if (import.meta.env.VITE_DEMO === 'true') {
      appData?.setCurrentStep("evalsheet");
      setOpen(false);
      return;
    }
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
    setIsLoading(true);
    sendTransaction(encodedCall);
    setIsLoading(false);
    setOpen(false);
  }

  useEffect(() => {
    // dummy data for chats
    setChats([
      { message: "Hello", sender: "0x123" },
      { message: "Hi", sender: user?.address || "" },
      { message: "How are you?", sender: "0x123" },
      { message: "I'm good, thanks!", sender: user?.address || "" },
    ])
  }, [])


  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const chatField = event.target as HTMLInputElement;
      const message = chatField.value;
      chatField.value = ""; // Clear the input field
      // Append the message to the chats array
      const newChats = chats ? [...chats, { message, sender: user?.address || "" }] : [];
      setChats(newChats);
      setTimeout(() => {
        setChats((prevChats) => [
          ...(prevChats || []),
          { message: "Sure!", sender: "0x123" },
        ]);
      }, 2000);
      chatInstance?.send("0x0", { content: message });
    }
  };






  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chats]);

  return (
    <>
      <Dialog.Root open={isOpen} onOpenChange={setOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 backdrop-blur-sm z-10" />
          <Dialog.Content>
            <Card
              className="fixed left-1/2 top-1/2 max-h-[85vh] w-[90vw] max-w-[450px] h-[500px] -translate-x-1/2 -translate-y-1/2 rounded-xl overflow-y-auto z-10 p-4"
              corner={false}
              layout={
                <div className="flex flex-col h-full" >
                  <div className="flex justify-between ">
                    <h2>Chat</h2>
                    <Button className="pl-14 pr-2" onClick={() => handleEval()}>Evaluate</Button>
                  </div>
                  <div className="flex-1 flex-col space-y-2 mt-4 overflow-y-auto" ref={chatContainerRef}>
                    {chats &&
                      chats.map((chat, index) => (
                        <div
                          key={index}
                          className={`max-w-[60%] w-fit p-2 rounded  ${chat.sender === user?.address
                            ? "mr-auto bg-primary-light"
                            : "ml-auto bg-tertiary"
                            }`}
                        >
                          <p className="inline">{chat.message}</p>
                        </div>
                      ))}
                  </div>
                  <div className="flex">
                    <input
                      type="text"
                      id="chatField"
                      className="border border-gray-300 rounded-md px-4 py-2 w-full"
                      onKeyDown={handleKeyDown}
                    />
                    <button className="bg-accent p-4 rounded ml-1">
                      <IoSend />
                    </button>
                  </div>
                </div>
              }
            />
            <VisuallyHidden.Root asChild>
              <Dialog.Title />
            </VisuallyHidden.Root>
            <VisuallyHidden.Root asChild>
              <Dialog.Description />
            </VisuallyHidden.Root>
            <Dialog.Close />
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>

  );
}

export default ChatModal
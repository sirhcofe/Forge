import { useContext, useState } from "react"
import { AppDataContext } from "./DataProviders"
import * as Dialog from "@radix-ui/react-dialog";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import Card from "./Card";
import Button from "./Button";
// import { useWeb3Auth } from "@/hooks/useWeb3Auth";
import { encodeFunctionData, parseAbi } from "viem";
import { useSendTransaction } from "@/hooks/useSendTransaction";


const SubmissionModal = ({ isOpen, setOpen }: { isOpen: boolean; setOpen: (open: boolean) => void }) => {
  const appData = useContext(AppDataContext);
  // const { pushInstance } = usePushProtocolContext();
  // const { viemWalletClient } = useWeb3Auth();
  const [isLoading, setIsLoading] = useState(false);
  const { sendTransaction } = useSendTransaction();



  const handleSubmit = async () => {
    // pushInstance?.channel.send(["0x2aD7EA01994F1b8b26D5222659CDF6Df23A974F0"], {
    //   notification: { title: 'test', body: 'test' },
    // })
    // console.log("sent notification!");

    // Handle submission

    const encodedCall = encodeFunctionData({
      abi: parseAbi(["function matchmaking(uint projectId) public"]),
      functionName: "matchmaking",
      args: [BigInt(appData?.selectedProject?.id || 0)],
    });
    setIsLoading(true);
    sendTransaction(encodedCall);
    setIsLoading(false);
    setOpen(false);

  }

  return (
    <Dialog.Root open={isOpen} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 backdrop-blur-sm z-10" />
        <Dialog.Content>
          <Card className="fixed left-1/2 top-1/2 max-h-[85vh] w-[90vw] max-w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-xl overflow-y-auto z-10 p-4" corner={false} layout={
            <div>

              <h2>Submission</h2>

              <div className="border border-primary-dark mt-2 p-4 rounded shadow">
                <h2 className="text-xl font-bold mb-2">{appData?.selectedProject?.title}</h2>
                <p className="mb-2">{appData?.selectedProject?.description}</p>
              </div>

              <div className="mt-4">
                <label htmlFor="projectLink" className="block font-bold mb-2">Project Link</label>
                <input type="text" id="projectLink" className="border border-gray-300 rounded-md px-4 py-2 w-full" />

                {/* <label htmlFor="fileInput" className="block font-bold mt-4 mb-2">File Input</label>
                <input type="file" id="fileInput" className="border border-gray-300 rounded px-4 py-2 w-full" /> */}
              </div>
              <Button className="w-full mt-8" onClick={handleSubmit}>
                {isLoading ? "Loading" : "Submit"}
              </Button>
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
    </Dialog.Root >
  )
}

export default SubmissionModal
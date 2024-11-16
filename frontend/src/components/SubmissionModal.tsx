import { useContext } from "react"
import { AppDataContext } from "./DataProviders"
import * as Dialog from "@radix-ui/react-dialog";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import Card from "./Card";
import Button from "./Button";
import { usePushProtocolContext } from "@/hooks/usePushProtocol";


const SubmissionModal = ({ isOpen, setOpen }: { isOpen: boolean; setOpen: (open: boolean) => void }) => {
  const appData = useContext(AppDataContext);
  const { pushInstance } = usePushProtocolContext();


  const handleSubmit = () => {
    pushInstance?.channel.send(["0x2aD7EA01994F1b8b26D5222659CDF6Df23A974F0"], {
      notification: { title: 'test', body: 'test' },
    })
    // Handle submission
    setOpen(false);
  }

  return (
    <Dialog.Root open={isOpen} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 backdrop-blur-sm z-10" />
        <Dialog.Content>
          <Card className="fixed left-1/2 top-1/2 max-h-[85vh] w-[90vw] max-w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-md overflow-y-auto z-10" corner={false} layout={
            <div>

              <h1 className="text-2xl font-bold mb-4">Submission</h1>

              <div className="bg-white p-4 rounded shadow">
                <h2 className="text-xl font-bold mb-2">{appData?.selectedProject?.title}</h2>
                <p className="mb-2">{appData?.selectedProject?.description}</p>
              </div>

              <div className="mt-4">
                <label htmlFor="projectLink" className="block font-bold mb-2">Project Link</label>
                <input type="text" id="projectLink" className="border border-gray-300 rounded px-4 py-2 w-full" />

                <label htmlFor="fileInput" className="block font-bold mt-4 mb-2">File Input</label>
                <input type="file" id="fileInput" className="border border-gray-300 rounded px-4 py-2 w-full" />
              </div>
              <Button className="w-full mt-8" onClick={handleSubmit}>
                Submit
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
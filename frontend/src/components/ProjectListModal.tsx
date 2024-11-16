import { useContext } from "react"
import { AppDataContext } from "./DataProviders"
import * as Dialog from "@radix-ui/react-dialog";
import bgImg from "@/../public/devcon.jpg";
import Button from "./Button";
import Card from "./Card";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";




const ProjectListModal = ({ isOpen, setOpen }: { isOpen: boolean; setOpen: (open: boolean) => void }) => {
  const appData = useContext(AppDataContext);

  return (
    <Dialog.Root open={isOpen} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 backdrop-blur-sm z-10" />
        <Dialog.Content>
          <Card className="fixed left-1/2 top-1/2 max-h-[85vh] w-[90vw] max-w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-md overflow-y-auto z-10" corner={false} layout={
            <div>
              {appData?.projects.map((project, index) => (
                <div className="w-full h-full py-5 flex flex-col" key={index}>
                  <div className="flex flex-col border border-tertiary rounded-2xl gap-y-2 overflow-hidden pb-2">
                    <img
                      src={bgImg}
                      alt="project-img"
                      className="w-full h-32 object-cover"
                    />
                    <h3 className="w-full px-3">{project.title}</h3>
                  </div>
                  <Button className="mt-auto" onClick={() => {
                    if (appData.setSelectedProject) appData.setSelectedProject(project);
                    setOpen(false);
                  }}>Subscribe</Button>
                </div>
              ))}
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
  )
}

export default ProjectListModal
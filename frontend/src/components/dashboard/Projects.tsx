import { useContext, useState } from "react";
import Button from "../Button";
import bgImg from "@/../public/devcon.jpg";
import { AppDataContext, Project } from "../DataProviders";
import SubmissionModal from "../SubmissionModal";
import ProjectListModal from "../ProjectListModal";

const NoProject = () => {
  const [isOpen, setOpen] = useState(false);
  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex flex-col flex-1 items-center justify-center">
        <p className="px-3 text-sm">No project in progress!</p>
      </div>
      <Button className="mt-auto" onClick={() => setOpen(true)}>Subcribe project</Button>
      <ProjectListModal isOpen={isOpen} setOpen={setOpen} />
    </div>
  );
};

const CurrentProject = ({ currentProject }: { currentProject: Project }) => {
  const appData = useContext(AppDataContext);
  const [isOpen, setOpen] = useState(false);

  const startSubmission = () => {
    if (appData && appData.setSelectedProject) appData.setSelectedProject(currentProject);
    setOpen(true);
  }
  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex flex-col border border-tertiary rounded-2xl gap-y-2 overflow-hidden pb-2">
        <img
          src={bgImg}
          alt="project-img"
          className="w-full h-14 object-cover"
        />
        <h3 className="w-full px-3">{currentProject.title}</h3>
      </div>
      <Button className="mt-auto" onClick={startSubmission}>Submit project</Button>
      <SubmissionModal isOpen={isOpen} setOpen={setOpen} />
    </div>
  );
};

const Projects = () => {
  // const [currentProject, setCurrentProject] = useState<any | undefined>(
  //   undefined
  // );
  const appData = useContext(AppDataContext);


  return (
    <div className="relative w-full h-full flex flex-col">
      <h2>Projects</h2>
      {appData?.selectedProject ? (
        <CurrentProject currentProject={appData.selectedProject} />
      ) : (
        <NoProject />
      )}
    </div>
  );
};

export default Projects;

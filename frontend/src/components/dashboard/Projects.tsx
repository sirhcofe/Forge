import { useState } from "react";
import Button from "../Button";
import bgImg from "@/../public/devcon.jpg";

const NoProject = () => {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex flex-col flex-1 items-center justify-center">
        <p className="px-3 text-sm">No project in progress!</p>
      </div>
      <Button className="mt-auto">Submit project</Button>
    </div>
  );
};

const CurrentProject = ({ currentProject }: { currentProject: any }) => {
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
      <Button className="mt-auto">Submit project</Button>
    </div>
  );
};

const Projects = () => {
  const [currentProject, setCurrentProject] = useState<any | undefined>(
    undefined
  );

  // TODO: remove later
  const handleClick = () => {
    if (currentProject) setCurrentProject(undefined);
    else
      setCurrentProject({
        id: 1,
        title: "NFT Art Gallery",
        description:
          "Build an NFT marketplace where artists can mint and sell their digital artwork. Implement features like auctions, direct sales, and royalties.",
        link: "https://example.com/nft-art-gallery",
        image: "https://example.com/nft-art-gallery.jpg",
        tags: ["Web3"],
      });
  };

  return (
    <div className="relative w-full h-full flex flex-col">
      {/* // TODO: remove later */}
      <button
        className="absolute top-2 left-2 w-5 h-5 rounded-full bg-red-400"
        onClick={handleClick}
      />
      <h2>Projects</h2>
      {currentProject ? (
        <CurrentProject currentProject={currentProject} />
      ) : (
        <NoProject />
      )}
    </div>
  );
};

export default Projects;

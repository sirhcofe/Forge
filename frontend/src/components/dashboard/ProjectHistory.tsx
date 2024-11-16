import { ProjectHistoryType } from "@/types/project-history";
import { useState } from "react";
import bgImg from "@/../public/devcon.jpg";
import { format } from "date-fns";

const ProjectsHistory = () => {
  const [projectHistory, setProjectHistory] = useState<
    ProjectHistoryType[] | undefined
  >([
    {
      projectTItle: "DeFi Dashboard",
      attempts: [
        {
          score: 100,
          date: 1731736588,
        },
      ],
    },
    {
      projectTItle: "DeFi Dashboard",
      attempts: [
        {
          score: 100,
          date: 1731736588,
        },
        {
          score: 0,
          date: 1731726588,
        },
      ],
    },
  ]);

  return (
    <div className="relative w-full h-full flex flex-col">
      <h2>Project History</h2>

      {projectHistory ? (
        <div className="flex flex-col gap-y-2 pt-2">
          {projectHistory.map((history: ProjectHistoryType, index: number) => {
            return (
              <div className="w-full h-full flex flex-col">
                <div className="relative flex flex-1 flex-col border border-tertiary rounded-2xl gap-y-1 overflow-hidden pb-2">
                  <img
                    src={bgImg}
                    alt="project-img"
                    className="w-full h-14 object-cover"
                  />
                  <div className="w-full flex">
                    <div className="flex flex-1 flex-col">
                      <h3 className="w-full px-3">{history.projectTItle}</h3>
                      <p className="w-full px-3 text-xs text-black/70">
                        {format(new Date(history.attempts[0].date), "dd/MM/yy")}
                      </p>
                    </div>
                    <div className="h-full flex justify-end pr-3">
                      <h2 className="!text-black">
                        {history.attempts[0].score}
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default ProjectsHistory;

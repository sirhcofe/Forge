import Card from "../Card";
import Badges from "./Badges";
import Evaluations from "./Evaluations";
import LogTime from "./LogTime";
import MainContent from "./MainContent";
import Notification from "./Notification";
import Points from "./Points";
import Projects from "./Projects";

const Dashboard = () => {
  return (
    <div className="w-full min-h-screen max-h-screen bg-background-dark grid grid-cols-[repeat(11,minmax(0,1fr))] grid-rows-[repeat(10,minmax(0,1fr))] gap-3 p-4">
      <Card
        className="row-span-4 col-span-3 h-full w-full"
        layout={<Notification />}
      />
      <Card
        className="row-span-5 col-span-5 h-full w-full"
        layout={<MainContent />}
      />
      <Card
        className="row-span-4 col-span-3 h-full w-full"
        corner
        layout={<LogTime />}
      />
      <Card
        className="row-span-6 col-span-3 h-full w-full"
        layout={<Projects />}
      />
      <Card
        className="row-span-3 col-span-5 h-full w-full"
        layout={<Points />}
      />
      <Card
        className="row-span-2 col-span-5 h-full w-full"
        layout={<Badges />}
      />
      <Card
        className="row-span-3 row-start-5 col-start-9 col-span-3 h-full w-full"
        layout={<Projects />}
      />
      <Card
        className="row-span-3 row-start-8 col-start-9 col-span-3 h-full w-full"
        layout={<Evaluations />}
      />
    </div>
  );
};

export default Dashboard;

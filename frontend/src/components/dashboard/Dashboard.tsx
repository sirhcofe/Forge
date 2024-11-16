import Card from "../Card";
import LogTime from "./LogTime";
import MainContent from "./MainContent";
import Notification from "./Notification";
import Projects from "./Projects";

const Dashboard = () => {
  return (
    <div className="w-full min-h-screen grid grid-cols-[repeat(11,minmax(0,1fr))] grid-rows-4 gap-4 p-4">
      <Card
        className="row-span-2 col-span-3 h-full w-full"
        layout={<Notification />}
      />
      <Card
        className="row-span-2 col-span-5 h-full w-full"
        layout={<MainContent />}
      />
      <Card
        className="row-span-2 col-span-3 h-full w-full"
        corner
        layout={<LogTime />}
      />
      <Card
        className="row-span-2 col-span-3 h-full w-full"
        layout={<Projects />}
      />
    </div>
  );
};

export default Dashboard;

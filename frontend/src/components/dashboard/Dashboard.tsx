import Card from "../Card";
import Badges from "./Badges";
import Evaluations from "./Evaluations";
import LogTime from "./LogTime";
import MainContent from "./MainContent";
import Updates from "./Updates";
import Points from "./Points";
import Projects from "./Projects";
import ProjectsHistory from "./ProjectHistory";
import { useWeb3Auth } from "@/hooks/useWeb3Auth";
import { motion } from "framer-motion";

const Dashboard = () => {
  const { logout } = useWeb3Auth();
  return (
    <motion.div className="w-full min-h-screen max-h-screen bg-background-dark grid grid-cols-[repeat(11,minmax(0,1fr))] grid-rows-[repeat(10,minmax(0,1fr))] gap-3 p-4">
      <Card
        className="row-span-4 col-span-3 h-full w-full"
        layout={<Updates />}
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
        layout={<ProjectsHistory />}
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
      <button
        className="absolute top-40 right-40 w-5 h-5 bg-blue-600 z-20"
        onClick={logout}
      ></button>
    </motion.div>
  );
};

export default Dashboard;

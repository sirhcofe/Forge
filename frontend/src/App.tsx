import { useEffect, useState } from "react";
import Dashboard from "./components/dashboard/Dashboard";
import Landing from "./components/landing/Landing";
import { useWeb3Auth } from "./hooks/useWeb3Auth";
import { AnimatePresence } from "framer-motion";

function App() {
  const { isLoading, user } = useWeb3Auth();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    console.log(user);
  }, [user]);

  useEffect(() => {
    if (!isLoading) {
      const timeout = setTimeout(() => {
        setReady(true);
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [isLoading]);

  return (
    <div className="relative w-screen min-h-screen h-fit bg-background">
      <AnimatePresence>
        {ready && user ? (
          <Dashboard key="Dashboard" />
        ) : (
          <Landing key="Landing" ready={ready} user={user} />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;

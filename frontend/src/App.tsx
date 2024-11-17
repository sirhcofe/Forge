import { useEffect, useState } from "react";
import Dashboard from "./components/dashboard/Dashboard";
import Landing from "./components/landing/Landing";
import { useWeb3Auth } from "./hooks/useWeb3Auth";
import { AnimatePresence } from "framer-motion";
import { useSendTransaction } from "./hooks/useSendTransaction";
import { encodeFunctionData, parseAbi } from "viem";

function App() {
  const { isLoading, user, logout } = useWeb3Auth();
  const [ready, setReady] = useState(false);
  const { sendTransaction } = useSendTransaction();

  useEffect(() => {
    console.log("XDD", user);
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
      <div className="absolute top-0 left-0">
        <button onClick={logout}>Logout</button>
        <button onClick={async () => {

          const encodedCall = encodeFunctionData({
            abi: parseAbi(["function createUser(string memory username) external"]),
            functionName: "createUser",
            args: ["John Doe"],
          });

          // eslint-disable-next-line no-debugger
          // debugger;
          console.log("ok")
          try {
            await sendTransaction(encodedCall);
          } catch (error) {
            console.error("Error sending transaction", error)
          }
        }}>Register</button>

      </div>
    </div>
  );
}

export default App;

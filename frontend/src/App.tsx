import { usePrivy } from "@privy-io/react-auth";
import Dashboard from "./components/dashboard/Dashboard";
import Button from "./components/Button";


function LoginPanel() {
  const { ready, authenticated, login } = usePrivy();
  // Disable login when Privy is not ready or the user is already authenticated
  const disableLogin = !ready || (ready && authenticated);

  return (
    <div className="w-screen h-screen absolute top-0 left-0 backdrop-blur-sm bg-background">
      <Button className="w-full" disabled={disableLogin} onClick={login}>
        Get Started
      </Button>
    </div>

  );
}

function App() {
  const { authenticated } = usePrivy();

  return (
    <div className="w-screen min-h-screen h-fit bg-background">
      {!authenticated ? <LoginPanel /> : <Dashboard />}
      {/* <Dashboard /> */}
    </div>
  );
}

export default App;

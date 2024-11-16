import { createRoot } from "react-dom/client";
import "./index.css";
import { Web3ReactProvider } from '@web3-react/core';
import App from "./App.tsx";
// import { AuthProvider } from "./provider/AuthProvider.tsx";
import PrivyProvider from "./provider/PrivyProvider.tsx";
import { AppDataProvider } from "./components/DataProviders.tsx";
import { createWalletClient, custom } from "viem";
import { scrollSepolia } from "viem/chains";

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
function getLibrary(_provider: any) {
  // this will vary according to whether you use e.g. ethers or web3.js
  const client = createWalletClient({
    chain: scrollSepolia,
    transport: custom(window.ethereum)
  })
  return client;
}

createRoot(document.getElementById("root")!).render(
  <PrivyProvider>
    <Web3ReactProvider getLibrary={getLibrary}>
      <AppDataProvider>
        <App />
      </AppDataProvider>
    </Web3ReactProvider>
  </PrivyProvider>
  // <AuthProvider>
  //   <App />
  // </AuthProvider>
);

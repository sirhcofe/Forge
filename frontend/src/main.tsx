import { createRoot } from "react-dom/client";
import "./index.css";
// import { Web3ReactProvider } from '@web3-react/core';
import App from "./App.tsx";
import { AuthProvider } from "./provider/AuthProvider.tsx";
// import PrivyProvider from "./provider/PrivyProvider.tsx";
import { AppDataProvider } from "./components/DataProviders.tsx";
// import { createWalletClient, custom } from "viem";
// import { scrollSepolia } from "viem/chains";
import { Toaster } from 'react-hot-toast';
import PushProtocolProvider from "./provider/PushProtocolProvider.tsx";


// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
// function getLibrary(_provider: any) {
//   // this will vary according to whether you use e.g. ethers or web3.js
//   const client = createWalletClient({
//     chain: scrollSepolia,
//     transport: custom(window.ethereum)
//   })
//   return client;
// }

createRoot(document.getElementById("root")!).render(
  // <Web3ReactProvider getLibrary={getLibrary}>
  <AuthProvider>
    <AppDataProvider>
      <PushProtocolProvider>
        <App />
        <Toaster />
      </PushProtocolProvider>
    </AppDataProvider>
  </AuthProvider>
  // </Web3ReactProvider>
  // <PrivyProvider>

  // </PrivyProvider>
  // <AuthProvider>
  //   <App />
);

import { PushAPI, CONSTANTS } from '@pushprotocol/restapi';
import React, { createContext, useEffect } from 'react'

import toast from 'react-hot-toast';
import { useWeb3Auth } from '@/hooks/useWeb3Auth';

export const PushProtocolContext = createContext({});

const PushProtocolProvider = ({ children }: { children: React.ReactNode }) => {
    const { viemWalletClient } = useWeb3Auth();
    const [pushInstance, setPushInstance] = React.useState<PushAPI | null>(null);


    useEffect(() => {
        (async () => {
            console.log(viemWalletClient)
            if (!viemWalletClient || !viemWalletClient.account) return;
            console.log(viemWalletClient.account.address)
            const pushUser = await PushAPI.initialize(viemWalletClient, {
                env: CONSTANTS.ENV.STAGING,
            });
            setPushInstance(pushUser);

            // To listen to real time notifications
            const stream = await pushUser.initStream([CONSTANTS.STREAM.NOTIF]);

            // Setup event handling
            stream.on(CONSTANTS.STREAM.NOTIF, (data) => {
                console.log(data);
                toast(data);
            });

            // Connect stream but only after setting all event handling
            stream.connect();
        })();
    }, [viemWalletClient, viemWalletClient?.account]);



    return (
        <PushProtocolContext.Provider value={{ pushInstance }}>
            {children}
        </PushProtocolContext.Provider>
    )
}

export default PushProtocolProvider
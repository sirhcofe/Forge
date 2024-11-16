import { PushAPI, CONSTANTS } from '@pushprotocol/restapi';
import React, { createContext, useEffect } from 'react'

import toast from 'react-hot-toast';
import { useWeb3Auth } from '@/hooks/useWeb3Auth';
import { privateKeyToAccount } from 'viem/accounts';
import { createWalletClient, http } from 'viem';
import { sepolia } from 'viem/chains';
import { AppDataContext } from '@/components/DataProviders';

export const PushProtocolContext = createContext({});

const PushProtocolProvider = ({ children }: { children: React.ReactNode }) => {
    const { pushWalletClient } = useWeb3Auth();
    const [pushInstance, setPushInstance] = React.useState<PushAPI | null>(null);
    const [chatInstance, setChatInstance] = React.useState<any>(null);
    const appData = React.useContext(AppDataContext);


    useEffect(() => {
        (async () => {
            // console.log(viemWalletClient, viemPublicClient)
            if (!pushWalletClient || !pushWalletClient.account) return;
            console.log(pushWalletClient.account.address, "PUSH PROC INIT!!!")
            const account = privateKeyToAccount('0x9c8ffffc7b4cc95172b2a7b84792d2138e359f1075ac510f4cffa6fb5904a27a')

            const client = createWalletClient({
                account,
                chain: sepolia,
                transport: http()
            })
            const pushAdmin = await PushAPI.initialize(client, {
                env: CONSTANTS.ENV.STAGING,
            });
            setPushInstance(pushAdmin);



            const pushUser = await PushAPI.initialize(pushWalletClient as any, {
                env: CONSTANTS.ENV.STAGING,
            });
            setChatInstance(pushUser.chat);

            // // userAlice.notification.subscribe(channel, {settings?})
            // const response = await pushUser.notification.subscribe(
            //     `eip155:11155111:${"0x6Ce9b4B77977BAd7BeFBDf0793aa1ba48F6f8706"}`
            // );
            // console.log(response);
            // To listen to real time notifications
            const stream = await pushUser.initStream([CONSTANTS.STREAM.NOTIF, CONSTANTS.STREAM.CHAT]);

            // Setup event handling
            stream.on(CONSTANTS.STREAM.NOTIF, (data) => {
                console.log(data);
                toast(data.message.payload.body);
            });

            // Chat message received:
            stream.on(CONSTANTS.STREAM.CHAT, (message) => {
                console.log('Encrypted Message Received');
                console.log(message); // Log the message payload
            });

            // Connect stream but only after setting all event handling
            stream.connect();
            setTimeout(() => {
                toast("connected to push protocol")
            }, 3000)
        })();
    }, [pushWalletClient, pushWalletClient?.account]);



    return (
        <PushProtocolContext.Provider value={{ pushInstance, chatInstance }}>
            {children}
        </PushProtocolContext.Provider>
    )
}

export default PushProtocolProvider
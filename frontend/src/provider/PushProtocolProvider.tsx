import { PushAPI, CONSTANTS } from '@pushprotocol/restapi';
import React, { createContext, useEffect } from 'react'

import toast from 'react-hot-toast';
import { useWeb3Auth } from '@/hooks/useWeb3Auth';

export const PushProtocolContext = createContext({});

const PushProtocolProvider = ({ children }: { children: React.ReactNode }) => {
  const { viemWalletClient } = useWeb3Auth();
  const [pushInstance, setPushInstance] = React.useState<PushAPI | null>(null);
  const [chatInstance, setChatInstance] = useState(null);


  useEffect(() => {
    (async () => {
      console.log(viemWalletClient)
      if (!viemWalletClient || !viemWalletClient.account) return;
      console.log(viemWalletClient.account.address)
      const pushUser = await PushAPI.initialize(viemWalletClient, {
        env: CONSTANTS.ENV.STAGING,
      });
      setPushInstance(pushUser);
      setChatInstance(pushUser.chat);

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
  // Chat functionality
  const sendMessage = async (recipient, content) => {
    if (!chatInstance) return;
    return await chatInstance.send(recipient, {
      content,
      type: 'Text',
    });
  };

  const acceptChatRequest = async (requester) => {
    if (!chatInstance) return;
    return await chatInstance.accept(requester);
  };

  const rejectChatRequest = async (requester) => {
    if (!chatInstance) return;
    return await chatInstance.reject(requester);
  };

  const getChatHistory = async (chatPartner) => {
    if (!chatInstance) return;
    return await chatInstance.history(chatPartner);
  };

  const getLatestChat = async (chatPartner) => {
    if (!chatInstance) return;
    return await chatInstance.latest(chatPartner);
  };

  const listChats = async () => {
    if (!chatInstance) return;
    return await chatInstance.list('CHATS');
  };

  const listRequests = async () => {
    if (!chatInstance) return;
    return await chatInstance.list('REQUESTS');
  };

  return (
    <PushProtocolContext.Provider value={{ pushInstance, chatInstance, sendMessage, acceptChatRequest, rejectChatRequest, getChatHistory, getLatestChat, listChats, listRequests, }}>
      {children}
    </PushProtocolContext.Provider>
  )
}

export default PushProtocolProvider

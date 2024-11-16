import { PushAPI } from "@pushprotocol/restapi";
import { Chat } from "@pushprotocol/restapi/src/lib/pushapi/chat";

export type PushProtocolContextType = {
    pushInstance: PushAPI | null;
    chatInstance: Chat | null;
};

import { PushProtocolContext } from "@/provider/PushProtocolProvider";
import { PushProtocolContextType } from "@/types/push-protocol";
import { useContext } from "react";


export const usePushProtocolContext = () => {
    const {
        pushInstance,
        chatInstance
    } = useContext(PushProtocolContext) as PushProtocolContextType;

    return {
        pushInstance,
        chatInstance
    };
};

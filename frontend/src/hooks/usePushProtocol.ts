import { PushProtocolContext } from "@/provider/PushProtocolProvider";
import { PushProtocolContextType } from "@/types/push-protocol";
import { useContext } from "react";


export const usePushProtocolContext = () => {
    const {
        pushInstance,
    } = useContext(PushProtocolContext) as PushProtocolContextType;

    return {
        pushInstance,
    };
};

"use client";
import { createContext, useContext } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext<any>(null)

export const useSocket = () => {
    return useContext(SocketContext);
}

export const SocketProvider = (props:any) => {
    return(
        <SocketContext.Provider value={null}>
            {props.children}
        </SocketContext.Provider>
    )
}
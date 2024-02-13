// SocketContext.js
"use client";

import React, { useEffect, useState, createContext, useContext } from "react";
import io from "socket.io-client";

import { errorNotifier, successNotifier } from "@/app/providers";
import { socketBaseURL } from "@/services/api";
import { ACCESS_TOKEN } from "@/constants/appConstants";
import { getLocalStorageString } from "@/utils/localStorage";

const SocketContext = createContext({});

type SocketProviderProps = {
  children: React.ReactNode;
};

export const SocketProvider = ({ children }: SocketProviderProps) => {
  const [socketConnection, setSocketConnection] = useState(null);
  const token = getLocalStorageString(ACCESS_TOKEN);

  useEffect(() => {
    // const socketClient = io(socketBaseURL as string, {
    //   extraHeaders: {
    //     authorization: token ? `Bearer ${token}` : "",
    //   },
    // });
    const socketClient = token
      ? io(socketBaseURL as string, {
          extraHeaders: {
            authorization: `Bearer ${token}`,
          },
        })
      : io(socketBaseURL as string);

    // const socketClient = io(socketBaseURL as string);

    setSocketConnection(socketClient as any);
    socketClient.on("connect", () => {
      console.log("CONNECTED IN REAL TIME", socketClient);
      successNotifier("Connection restored");
    });

    socketClient.on("disconnect", () => {
      console.log("Disconnected from the server!");
      errorNotifier("Connection lost");
    });

    return () => {
      if (socketClient) {
        socketClient.disconnect();
      }
    };
  }, []);

  console.log("socketConnection", socketConnection);

  return (
    <SocketContext.Provider value={{ socketConnection }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  return useContext<{ socketConnection: any }>(SocketContext as any);
};

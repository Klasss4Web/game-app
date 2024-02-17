// SocketContext.js
"use client";

import React, {
  useEffect,
  useState,
  createContext,
  useContext,
  useCallback,
} from "react";
import io from "socket.io-client";

import { errorNotifier, successNotifier } from "@/app/providers";
import { socketBaseURL } from "@/services/api";
import { ACCESS_TOKEN, SAVED_ITEMS } from "@/constants/appConstants";
import {
  getLocalStorageItem,
  getLocalStorageString,
} from "@/utils/localStorage";
import { SOCKET_EVENTS } from "@/services/socket";
import { LoggedInParticipant } from "@/types/user";

const SocketContext = createContext({});

type SocketProviderProps = {
  children: React.ReactNode;
};

export const SocketProvider = ({ children }: SocketProviderProps) => {
  const [socketConnection, setSocketConnection] = useState(null);
  const [refresh, setRefresh] = useState<boolean>(false);
  const token = getLocalStorageString(ACCESS_TOKEN);
  const participant = getLocalStorageItem<LoggedInParticipant>(
    SAVED_ITEMS.participant
  );

  useEffect(() => {
    // const socketClient = token
    //   ? io(socketBaseURL as string, {
    //       extraHeaders: {
    //         authorization: `Bearer ${token}`,
    //       },
    //     })
    //   : io(socketBaseURL as string);

    const socketClient = io(socketBaseURL as string, {
      extraHeaders: {
        authorization: token ? `Bearer ${token}` : "",
      },
    });
    const payload = {
      nonce_id: participant?.nonce_id,
      experience_id: participant?.experience_id,
    };
    setSocketConnection(socketClient as any);
    socketClient.on("connect", () => {
      console.log("CONNECTED IN REAL TIME", socketClient.active);
      successNotifier("Connection restored");
      socketClient.emit(
        SOCKET_EVENTS.rejoinExperience,
        payload,
        (response: any) => {
          console.log(
            response,
            `EMIT RESPONSE FOR ${SOCKET_EVENTS.rejoinExperience}`
          );
        }
      );
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
  }, [token]);

  //  const dispatch = (incoming) => {
  //    setState((prev) => ({ ...prev, ...incoming }));
  //  };

  console.log("socketConnection", socketConnection);

  return (
    <SocketContext.Provider value={{ socketConnection, setRefresh, refresh }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  return useContext<{
    socketConnection: any;
    refresh: boolean;
    setRefresh: (arg: boolean) => void;
  }>(SocketContext as any);
};

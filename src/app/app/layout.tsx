"use client";

import { socketBaseURL } from "@/services/api";
import { connect, disconnect, onDisconnect } from "@/services/socket";
import React, { useEffect } from "react";
import { io } from "socket.io-client";
import { errorNotifier, successNotifier } from "../providers";

type LayoutProps = {
  children: React.ReactNode;
};

let socketClient: any;
const Layout = ({ children }: LayoutProps) => {
  // Connect to the Socket.io server

  useEffect(() => {
    // connect();
    // console.log("EFFECT RUNNING FOR SOCKET");
    // onDisconnect();
    // return () => {
    //   disconnect();
    // };
    // const socket = io(socketBaseURL as string);
    socketClient = io(socketBaseURL as string);
    socketClient.on("connect", () => {
      console.log("CONNECTED IN REAL TIME");
      successNotifier("Connection restored");
    });

    socketClient.on("disconnect", () => {
      console.log("Disconnected from the server!");
      errorNotifier("Connection lost");
    });

    return () => {
      socketClient.disconnect();
    };
  }, []);
  return <div>{children}</div>;
};

export default Layout;
export { socketClient };

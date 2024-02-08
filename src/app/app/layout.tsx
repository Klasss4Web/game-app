"use client";

import { socketBaseURL } from "@/services/api";
import { connect, disconnect, onDisconnect } from "@/services/socket";
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { errorNotifier, successNotifier } from "../providers";
import { SocketProvider } from "@/contexts/SocketContext";

type LayoutProps = {
  children: React.ReactNode;
};

let socketClient: any;
const Layout = ({ children }: LayoutProps) => {
  // const [socketConnection, setSocketConnection] = useState({});
  // useEffect(() => {
  //   socketClient = io(socketBaseURL as string);
  //   setSocketConnection(socketClient);
  //   socketClient.on("connect", () => {
  //     console.log("CONNECTED IN REAL TIME", socketClient);
  //     successNotifier("Connection restored");
  //   });

  //   socketClient.on("disconnect", () => {
  //     console.log("Disconnected from the server!");
  //     errorNotifier("Connection lost");
  //   });

  //   return () => {
  //     socketClient.disconnect();
  //   };
  // }, []);

  // console.log("socketConnection", socketConnection);
  return <SocketProvider>{children}</SocketProvider>;
};

export default Layout;

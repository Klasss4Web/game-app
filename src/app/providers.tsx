"use client";

import { CacheProvider } from "@chakra-ui/next-js";
import {
  ChakraProvider,
  createStandaloneToast,
  extendTheme,
  theme,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { UserProfileContextProvider } from "@/contexts/UserContext";
// import AOS from 'aos';

const { toast, ToastContainer } = createStandaloneToast();

const Theme: Partial<typeof theme> = extendTheme({
  colors: {
    lightGreen: "#F2FAF5",
    themeGreen: "rgba(160, 214, 180, 1)",
    u_black: "#121212",
    primary: "rgba(160, 214, 180, 1)",
    headerGreen: "#5F806B",
    minst: "rgba(17, 20, 45, 1)",
    formGray: "#BDBDBD",
    btnText: "#828282",
    formGreen: "#DAE5DE",
    red: "#FF0000",
    bgGrey: "#F7F7F7",
    darkGrey: "#585A69",
    grayBG: "#F2F2F2",
  },

  styles: {
    global: {
      body: {
        fontSize: "15px",
        fontWeight: 500,
        color: "black",
      },
    },
  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = React.useState(() => new QueryClient());

  // const queryClient = new QueryClient();

  // useEffect(() => {
  //   AOS.init();
  // }, []);

  return (
    <CacheProvider>
      <QueryClientProvider client={queryClient}>
        <UserProfileContextProvider>
          <ChakraProvider theme={Theme}>
           
              {children}
            <ToastContainer />
            <ReactQueryDevtools position="bottom-right" initialIsOpen={false} />
          </ChakraProvider>
        </UserProfileContextProvider>
      </QueryClientProvider>
    </CacheProvider>
  );
}

export const errorNotifier = (errorMessage: string) => {
  return toast({
    // title: "Error",
    description:
      typeof errorMessage === "string" ? errorMessage : "SOMETHING WENT WRONG",
    status: "error",
    duration: 5000,
    isClosable: true,
    position: "top-right",
  });
};

export const successNotifier = (info: string) => {
  return toast({
    // title: "Success",
    description: info,
    status: "success",
    duration: 5000,
    isClosable: true,
    position: "top",
  });
};

export const inputStyles = {
  fontSize: 14,
  focusBorderColor: "transparent",
  outline: "1px solid #ccc",
};

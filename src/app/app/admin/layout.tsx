"use client";

import { useEffect, useRef, useState } from "react";
import { BiMenu } from "react-icons/bi";

import { APP_CONSTANTS, LOGGED_IN_USER } from "@/constants/appConstants";
import { COLORS } from "@/constants/colors";
import { Box, Button, Stack } from "@chakra-ui/react";
import DashboardNavBar from "@/components/navbar/DashboardNavBar";
import useIsMounted from "@/hooks/useIsMounted";
import { getLocalStorageItem } from "@/utils/localStorage";
import { AuthUserType } from "@/types/user";
import { FullPageLoader } from "@/components/common/FullPageLoader";
import SideBar from "@/components/sidebar/SideBar";
import { connect, disconnect } from "@/services/socket";
import AuthContextProvider from "@/contexts/AuthContext";
import { socketBaseURL } from "@/services/api";
import { errorNotifier, successNotifier } from "@/app/providers";
import { io } from "socket.io-client";
import { useGetState } from "@/contexts/useGetState";

export default function Layout({ children }: { children: React.ReactNode }) {
  const userId = "dummy id";

  const isMounted = useIsMounted();
  const loggedinUser = getLocalStorageItem(LOGGED_IN_USER) as AuthUserType;
  // console.log("loggedinUserrrr", loggedinUser);

  const [showSidebar, setShowSidebar] = useState<boolean>(
    false
    // () => !(window.innerWidth <= APP_CONSTANTS.windowSidebarWidth)
  );

  useEffect(() => {
    setShowSidebar(
      () => !(window.innerWidth <= APP_CONSTANTS.sidebarBreakPoint)
    );
  }, []);

  const [tabWidth, setTabWidth] = useState<string>(
    APP_CONSTANTS.collapsedSideBarWidth
  );

  const collapsedWidth =
    tabWidth === APP_CONSTANTS.collapsedSideBarWidth
      ? ["100%", "80%", "98%", "96%", "96.4%"]
      : ["100%", "80%", "100%", "88%", "82.8%"];
  const leftOffset =
    tabWidth === APP_CONSTANTS.collapsedSideBarWidth
      ? [0, 0, 0, "3rem", APP_CONSTANTS.collapsedSideBarWidth]
      : [0, 0, 0, "3rem", APP_CONSTANTS.sidebarWidth];

  useEffect(() => {
    const handleResize = () =>
      window.innerWidth <= APP_CONSTANTS.sidebarBreakPoint
        ? setShowSidebar(false)
        : setShowSidebar(true);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [tabWidth]);

  const adminUser = loggedinUser?.role === "dummyToken";

  return !isMounted ? (
    <FullPageLoader />
  ) : (
    <AuthContextProvider>
      <Box width="100%" position="relative" className="gradient-background">
        {/* {!adminUser && ( */}
        <Box bg={COLORS.u_black} pos="relative">
          {typeof window !== "undefined" &&
            window.innerWidth <= APP_CONSTANTS.mobileBreakPoint &&
            adminUser && (
              <Box
                width={["10%"]}
                // bg={COLORS.u_black}
                pos="absolute"
                marginTop="4.1%"
                left="2%"
                zIndex={10000000}
              >
                <Button
                  onClick={() => {
                    setShowSidebar(true);
                    setTabWidth(APP_CONSTANTS.sidebarWidth);
                  }}
                  _focus={{
                    bg: "inherit",
                  }}
                >
                  <BiMenu
                    size={24}
                    cursor={"pointer"}
                    color={COLORS.secondary}
                  />
                </Button>
              </Box>
            )}
          <Box
            className={showSidebar ? "animate" : ""}
            width={["8rem", "8rem", tabWidth, tabWidth, tabWidth]}
            position="fixed"
            top="0"
            left={`-${APP_CONSTANTS.sidebarWidth}`}
            transition="left 1s ease"
            zIndex={1032}
          >
            <SideBar
              showSidebar={showSidebar}
              setShowSidebar={setShowSidebar}
              setTabWidth={setTabWidth}
              tabWidth={tabWidth}
            />
          </Box>
        </Box>
        {/* )} */}
        <Stack
          direction={"row"}
          position="relative"
          onClick={() => {
            if (
              typeof window !== "undefined" &&
              adminUser &&
              window.innerWidth < APP_CONSTANTS.mobileBreakPoint
            ) {
              setShowSidebar(false);
            }
          }}
        >
          <Box
            className="gradient-background"
            width={collapsedWidth}
            position={"relative"}
            left={leftOffset}
            bg={COLORS.bgGrey}
            // px={[".8rem", ".8rem", "1rem", "1rem", "1rem"]}
            // py={["1rem"]}
          >
            <DashboardNavBar />
            <Box
              className="gradient-background"
              // height="100vh"
              // overflowY="scroll"

              px={[".8rem", ".8rem", "1rem", "1rem", "1rem"]}
              py={["1rem"]}
            >
              {children}
            </Box>
          </Box>
        </Stack>
      </Box>
    </AuthContextProvider>
  );
}

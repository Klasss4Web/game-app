"use client";

import { useEffect, useState } from "react";
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

export default function Layout({ children }: { children: React.ReactNode }) {
  const userId = "dummy id";
  const isMounted = useIsMounted();
  const loggedinUser = getLocalStorageItem(LOGGED_IN_USER) as AuthUserType;
  console.log("loggedinUserrrr", loggedinUser);

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

  // useEffect(() => {
  //   connect();

  //   return disconnect;
  // }, []);

  const participant = loggedinUser?.role === "participant";

  return !isMounted ? (
    <FullPageLoader />
  ) : (
    <Box width="100%" minH="100vh" position={"relative"} bg={COLORS.bgGrey}>
      {participant && <DashboardNavBar />}
      <Box
        // mt=".7rem"
        height="100vh"
        overflowY="scroll"
        className="gradient-background"
        px={[".8rem", ".8rem", "1rem", "1rem", "1rem"]}
        py={["1rem"]}
      >
        {children}
      </Box>
    </Box>
  );
}

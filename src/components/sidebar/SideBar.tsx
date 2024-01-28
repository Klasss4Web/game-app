/* eslint-disable no-nested-ternary */
import { Box, Flex, Image, Stack, Text, Tooltip } from "@chakra-ui/react";
import React from "react";
import {
  MdOutlineArrowBackIosNew,
  MdOutlineArrowForwardIos,
} from "react-icons/md";
import { FaPeopleGroup } from "react-icons/fa6";

import { APP_CONSTANTS, LOGGED_IN_USER } from "@/constants/appConstants";
import { COLORS } from "@/constants/colors";
import { SidebarProps } from "@/types/navigation";
import { NavLink } from "./NavLink";
import { NAV_LINKS, ROUTES } from "@/constants/pageRoutes";
import { usePathname } from "next/navigation";
import { getLocalStorageItem } from "@/utils/localStorage";
import { AuthUserType } from "@/types/user";

type IsActiveProps = {
  isActive: boolean;
};

const SideBar = ({
  setShowSidebar,
  setTabWidth,
  tabWidth,
}: SidebarProps): JSX.Element => {
  const pathname = usePathname();
  const loggedinUser = getLocalStorageItem(LOGGED_IN_USER) as AuthUserType;

  console.log("PATHNAME", pathname);

  const responsivePaddings =
    typeof window !== "undefined" &&
    window.innerWidth >= APP_CONSTANTS.mobileBreakPoint &&
    tabWidth === APP_CONSTANTS.collapsedSideBarWidth
      ? "1.5rem 0"
      : typeof window !== "undefined" &&
        window.innerWidth >= APP_CONSTANTS.mobileBreakPoint
      ? "1.2rem 1.2rem"
      : ".8rem 1rem";

  console.log("TAB WIDTH", tabWidth);
  return (
    <Stack
      spacing={".1rem"}
      h="100vh"
      alignItems={"flex-start"}
      bg={COLORS.blue}
      borderRight={`1px solid ${COLORS.bgGrey}`}
    >
      <Flex
        my="4rem"
        width="100%"
        p={responsivePaddings}
        justify={
          tabWidth === APP_CONSTANTS.collapsedSideBarWidth
            ? "center"
            : "flex-start"
        }
        borderRadius="1rem"
      >
        <Box
          position={["absolute"]}
          top={["4%"]}
          left={tabWidth === APP_CONSTANTS.collapsedSideBarWidth ? "" : "25%"}
          // display={["none", "none", "block"]}
        >
          <Image
            src={"/images/logo.svg"}
            height={["3rem", "3rem", "6rem"]}
            width={["3rem", "3rem", "6rem"]}
            alt="Logo"
          />
        </Box>
      </Flex>
      {NAV_LINKS.map((link) => (
        <NavLink href={link.route} exact key={link.key}>
          <Flex
            width="100%"
            direction={["column", "column", "row"]}
            bg={pathname === link.route ? COLORS.secondary : ""}
            color={pathname === link.route ? COLORS.orange : COLORS.white}
            padding={[".3rem", ".4rem", ".9rem"]}
            align="center"
            gap={[".2rem", ".2rem", ".6rem"]}
            fontSize={[".8rem", ".9rem", "1rem"]}
            borderLeft={
              pathname === link.route ? `.5rem solid ${COLORS.orange}` : ""
            }
            borderRadius=".3rem"
          >
            <link.Icon size={APP_CONSTANTS.iconSize} />
            <Text
              display={
                typeof window !== "undefined" &&
                tabWidth === APP_CONSTANTS.collapsedSideBarWidth
                  ? "none"
                  : "block"
              }
              textAlign={["center", "center", "left"]}
            >
              {link.name}
            </Text>
          </Flex>
        </NavLink>
      ))}
      <Box
        p={"1.9rem 3.8rem"}
        position={"absolute"}
        bottom="0"
        color={COLORS.white}
        left="-2rem"
        display={["none", "none", "block"]}
      >
        {tabWidth === APP_CONSTANTS.collapsedSideBarWidth ? (
          <Tooltip label="Expand sidebar">
            <MdOutlineArrowForwardIos
              cursor="pointer"
              size={APP_CONSTANTS.iconSize}
              onClick={() => {
                setTabWidth(APP_CONSTANTS.sidebarWidth);
              }}
            />
          </Tooltip>
        ) : (
          <Stack
            direction={"row"}
            align="center"
            justify="center"
            cursor={"pointer"}
            color={COLORS.white}
            transition="left 1s ease"
            onClick={() => {
              setTabWidth(APP_CONSTANTS.collapsedSideBarWidth);
            }}
          >
            <MdOutlineArrowBackIosNew
              size={APP_CONSTANTS.iconSize}
              cursor="pointer"
            />
            <Text
              fontSize={[
                "1.25rem",
                "1.25rem",
                "1.25rem",
                "1.55rem",
                APP_CONSTANTS.iconSize,
              ]}
              color={COLORS.white}
              display={
                tabWidth === APP_CONSTANTS.collapsedSideBarWidth &&
                typeof window !== "undefined" &&
                window.innerWidth > APP_CONSTANTS.mobileBreakPoint
                  ? "none"
                  : "block"
              }
            >
              Collapse
            </Text>
          </Stack>
        )}
      </Box>
    </Stack>
  );
};

export default SideBar;

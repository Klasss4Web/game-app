"use client";

import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import {
  Avatar,
  Box,
  Flex,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  Spinner,
  Heading,
} from "@chakra-ui/react";

import { COLORS } from "@/constants/colors";
import { ROUTES } from "@/constants/pageRoutes";
// import { useAuth } from "@/context/AuthContext";
import {
  getLocalStorageItem,
  removeAllStorageItems,
} from "@/utils/localStorage";

import { AuthUserType } from "@/types/user";
import {
  LOGGED_IN_USER,
} from "@/constants/appConstants";

const DashboardNavBar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  // @ts-ignore
  // const { setLoggedinUser } = useAuth();
  const loggedinUser = getLocalStorageItem(LOGGED_IN_USER) as AuthUserType;

  const handleLogout = () => {
    setLoading(true);
    removeAllStorageItems();
    router.push(ROUTES.login);
    // setLoading(false);
  };

  const handleNavigate = () => {
    setLoading(true);
    router.push(ROUTES.home);
    setLoading(false);
  };
  return (
    <Box
      position="sticky"
      top="0"
      width="100"
      zIndex={2}
      bg={COLORS.blue}
      color={COLORS.white}
      // py=".5rem"
      px={[".8rem", ".8rem", "1rem", "1rem", "1rem"]}
      py={[".5rem"]}
    >
      <Flex justify="space-between" align="center" width="100%" mb=".6rem">
        {/* {getComponentTitle(pathname) === "Welcome" ? (
          <GoBackButton />
        ) : (
          <Flex gap=".6rem" align="center">
            <GoBackButton />
            <Heading fontSize={["1.2rem", "1.4rem", "2rem"]}>
              {getComponentTitle(pathname)}
            </Heading>
          </Flex>
        )} */}
        <Heading
          fontSize={["1.2rem", "1.4rem", "2rem"]}
          fontStyle="italic"
          fontWeight="normal"
        >
          The Genius
        </Heading>
        <Flex direction="column" align="center">
          {loading ? (
            <Spinner color={COLORS.headerGreen} />
          ) : (
            <Menu>
              <MenuButton
                as={Box}
                bg={COLORS.blue}
                _hover={{ bg: "inherit" }}
                cursor="pointer"
              >
                <Flex gap=".6rem">
                  <Avatar
                    src={
                      loggedinUser?.photo_id ||
                      `data:image/png;base64,${loggedinUser?.photo}`
                    }
                    name={`${loggedinUser?.first_name} ${loggedinUser?.last_name}`}
                  />

                  {loggedinUser?.first_name && (
                    <Box>
                      <Text fontWeight="semibold" textTransform="capitalize">
                        {loggedinUser?.first_name} {loggedinUser?.last_name}
                      </Text>
                      <Text fontWeight="light" textTransform="capitalize">
                        {loggedinUser?.role}
                      </Text>
                    </Box>
                  )}
                </Flex>
              </MenuButton>
              <MenuList
                onClick={(value) => console.log(value, "VALUED")}
                bg={COLORS.secondary}
                padding="0"
                borderRadius=".4rem"
              >
                <MenuItem
                  minH="40px"
                  onClick={handleNavigate}
                  bg={COLORS.blue}
                  mb=".3rem"
                >
                  <Image
                    boxSize="1.5rem"
                    borderRadius="full"
                    src="/icons/profile.png"
                    alt="Profile"
                    mr="12px"
                  />
                  <span>View Profile</span>
                </MenuItem>
                <MenuItem
                  minH="40px"
                  onClick={handleLogout}
                  color={COLORS.white}
                  bg={COLORS.blue}
                >
                  <Image
                    boxSize="1.5rem"
                    borderRadius="full"
                    src="/icons/logout.png"
                    alt="Logout Image"
                    mr="12px"
                  />
                  <span>Log Out</span>
                </MenuItem>
              </MenuList>
            </Menu>
          )}
        </Flex>
      </Flex>
    </Box>
  );
};

export default DashboardNavBar;

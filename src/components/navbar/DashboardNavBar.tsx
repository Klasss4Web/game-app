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
} from "@chakra-ui/react";

import { COLORS } from "@/constants/colors";
import { ROUTES } from "@/constants/pageRoutes";
// import { useAuth } from "@/context/AuthContext";
import {
  getLocalStorageItem,
  removeLocalStorageItem,
} from "@/utils/localStorage";
// import { CustomDrawer } from "../common/CustomDrawer";

// import GoBackButton from "../common/GoBackButton";
import { AuthUserType } from "@/types/user";
import { LOGGED_IN_USER } from "@/constants/appConstants";

const DashboardNavBar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  // @ts-ignore
  const { setLoggedinUser } = useAuth();
  const loggedinUser = getLocalStorageItem(LOGGED_IN_USER) as AuthUserType;

  const handleLogout = () => {
    setLoading(true);
    removeLocalStorageItem(LOGGED_IN_USER);
    setLoggedinUser(null);
    router.push(ROUTES.home);
    setLoading(false);
  };

  const handleNavigate = () => {
    setLoading(true);
    router.push(ROUTES.userProfile);
    setLoading(false);
  };
  return (
    <Box
      style={{
        position: "sticky",
        top: 0,
        background: COLORS.bgGrey,
        zIndex: 2,
        width: "100%",
      }}
      py=".5rem"
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

        <Flex direction="column" align="center">
          <Menu>
            <MenuButton
              as={Box}
              bg="inherit"
              _hover={{ bg: "inherit" }}
              cursor="pointer"
            >
              <Flex gap=".6rem">
                {loading ? (
                  <Spinner />
                ) : (
                  <Avatar
                    src={
                      loggedinUser?.photo_id ||
                      `data:image/png;base64,${loggedinUser?.photo}`
                    }
                    name={`${loggedinUser?.first_name} ${loggedinUser?.last_name}`}
                  />
                )}
                {loggedinUser?.role?.toLowerCase() === "admin" && (
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
            <MenuList onClick={(value) => console.log(value, "VALUED")}>
              <MenuItem minH="40px" onClick={handleNavigate}>
                <Image
                  boxSize="1.5rem"
                  borderRadius="full"
                  src="/icons/profile.png"
                  alt="Profile"
                  mr="12px"
                />
                <span>View Profile</span>
              </MenuItem>
              <MenuItem minH="40px" onClick={handleLogout}>
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
        </Flex>
      </Flex>
    </Box>
  );
};

export default DashboardNavBar;

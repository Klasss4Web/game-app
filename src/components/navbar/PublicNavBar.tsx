"use client";

import {
  Box,
  Flex,
  Image,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { COLORS } from "@/constants/colors";
import { ROUTES } from "@/constants/pageRoutes";
import { useRouter } from "next/navigation";
import NavigationMenu from "./NavigationMenu";
import { APP_CONSTANTS } from "@/constants/appConstants";
import Link from "next/link";
import CustomLink from "../common/CustomLink";
import { CustomBtn } from "../common/CustomBtn";

type NavProps = {
  bg?: string;
  btnBg?: string;
  color?: string;
  hoverBg?: string;
  position?: "relative";
};

const PublicNavBar = ({ btnBg, color, hoverBg, bg, position }: NavProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useRouter();

  return (
    <>
      {typeof window !== "undefined" &&
      window.innerWidth < APP_CONSTANTS.mobileBreakPoint ? (
        <>
          <Flex
            position="fixed"
            top="0"
            left="0"
            right="0"
            zIndex={100000}
            bg={"inherit"}
            width="100%"
            justify="space-between"
            p="1rem 1.5rem"
            align="center"
            mb="1rem"
            shadow={!isOpen ? "md" : 0}
          >
            <Box>
              <Link href={ROUTES.home}>
                <Image
                  src="/images/logo.svg"
                  height={["4rem"]}
                  width={["4rem"]}
                  alt="logo"
                />
              </Link>
            </Box>
            {!isOpen ? (
              <GiHamburgerMenu
                size={APP_CONSTANTS.iconSize}
                onClick={() => setIsOpen(true)}
              />
            ) : (
              <AiOutlineClose
                size={APP_CONSTANTS.iconSize}
                onClick={() => setIsOpen(false)}
              />
            )}
          </Flex>
          {isOpen && <NavigationMenu />}
        </>
      ) : (
        <Flex
          position={position || "fixed"}
          left="0"
          right="0"
          align="center"
          bg={bg}
          justify="space-between"
          zIndex={100000}
          width="100%"
          height={["2.8rem"]}
          padding={["3rem 4rem", "3rem 4rem", "3rem 1rem", "3rem 9%"]}
          display={["none", "none", "flex"]}
        >
          <Flex width="15%" gap="1rem" align="center">
            <Image
              src="/images/logo.svg"
              width={["4rem", "4rem", "3rem", "4rem"]}
              height={["4rem", "4rem", "3rem", "4rem"]}
              alt="logo"
              cursor="pointer"
              onClick={() => navigate.push(ROUTES.home)}
            />
            <Image
              src="/images/itfLogo.png"
              width={["4.5rem", "4.5rem", "3rem", "4.5rem"]}
              height="auto"
              alt="logo"
              cursor="pointer"
              onClick={() => navigate.push(ROUTES.home)}
            />
          </Flex>
          <Flex
            gap={["1.5rem", "1.5rem", ".5rem", "1.5rem"]}
            width="70%"
            justify="flex-end"
            align="center"
          >
            <CustomLink
              to={ROUTES.home}
              text="Home"
              color={color || COLORS.white}
              hoverBg={hoverBg}
            />

            {/* <CustomLink
              text="Artisans"
              to={ROUTES.marketPlace}
              color={color || COLORS.white}
              hoverBg={hoverBg}
            /> */}
            <CustomLink
              text="Apply for License"
              to={ROUTES.registration}
              color={color || COLORS.white}
              hoverBg={hoverBg}
            />
            {/* <CustomLink
              text="Market Place"
              to={ROUTES.marketPlace}
              color={color || COLORS.white}
              hoverBg={hoverBg}
            />
            <CustomLink
              text="Contact Us"
              to={ROUTES.contact}
              color={color || COLORS.white}
              hoverBg={hoverBg}
            /> */}
          </Flex>
          <Flex width="15%" justify="end">
            <CustomBtn
              bg={btnBg || COLORS.white}
              color={COLORS.u_black}
              text="Login"
              w={["6rem"]}
              loading={false}
              handleSubmit={() => navigate.push(ROUTES.login)}
            />
          </Flex>
        </Flex>
      )}
    </>
  );
};

export default PublicNavBar;

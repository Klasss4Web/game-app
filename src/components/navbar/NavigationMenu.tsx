"use client"
import { Box, Divider, Flex } from "@chakra-ui/react";

import { COLORS } from "@/constants/colors";
import { ROUTES } from "@/constants/pageRoutes";
import { useRouter } from "next/navigation";
import CustomLink from "../CustomLink";
import { CustomBtn } from "../CustomBtn";

const NavigationMenu = () => {
  const router = useRouter();
  return (
    <Flex
      position="fixed"
      top="0"
      left="0"
      right="0"
      zIndex={1000}
      bg={COLORS.secondary}
      direction="column"
      align="center"
      gap=".4rem"
      fontSize="1rem"
      shadow="md"
    >
      <Divider />
      <CustomLink to={ROUTES.home} text="Home" />
      {/* <CustomLink to="#" text="About" /> */}
      <Divider />
      <CustomLink to={ROUTES.registration} text="Artisans" />
      <Divider />
      <CustomLink
        to={ROUTES.marketPlace}
        text="Market Place"
      />
      <Divider />
      <CustomLink to={ROUTES.programmes} text="Programmes" />
      <Divider />
      <CustomLink to={ROUTES.contact} text="Contact Us" />
      <Divider />
      <Box width="20rem">
        <CustomBtn
          text="Login"
          color={COLORS.black}
          bg={COLORS.secondary}
          loading={false}
          h={["4rem"]}
          handleSubmit={() => router.push(ROUTES.login)}
        />
      </Box>
    </Flex>
  );
};

export default NavigationMenu;

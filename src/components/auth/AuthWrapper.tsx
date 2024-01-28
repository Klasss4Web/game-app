"use client";

import { Flex } from "@chakra-ui/react";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import { COLORS } from "@/constants/colors";
import useIsMounted from "@/hooks/useIsMounted";
import { FullPageLoader } from "@/components/common/FullPageLoader";

interface AuthWrapperProps {
  children: React.ReactNode;
}
const AuthWrapper: React.FunctionComponent<AuthWrapperProps> = ({
  children,
}) => {
  const isMounted = useIsMounted();
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return !isMounted ? (
    <FullPageLoader />
  ) : (
    <Flex
      width="100%"
      justify="center"
      align="center"
      backgroundImage="/images/loginBg.jpg"
      h="100vh"
      data-aos="zoom-in"
      objectFit="cover"
      bgRepeat="no-repeat"
      bgPos="center"
      bgSize="cover"
    >
      <Flex
        width={["90%", "90%", "50%", "26%"]}
        direction="column"
        justify="center"
        align="center"
        padding="1.1rem"
        background={COLORS.white}
        borderRadius="1rem"
      >
        {children}
      </Flex>
    </Flex>
  );
};

export default AuthWrapper;

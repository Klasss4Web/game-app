"use client";

import { useRouter } from "next/navigation";

import { Flex } from "@chakra-ui/react";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import { COLORS } from "@/constants/colors";
import { ROUTES } from "@/constants/pageRoutes";
import useIsMounted from "@/hooks/useIsMounted";
import { FullPageLoader } from "@/components/common/FullPageLoader";
import { CustomBtn } from "@/components/common/CustomBtn";
import { BiChevronRight } from "react-icons/bi";

const Home: React.FunctionComponent = () => {
  const router = useRouter();
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
        <CustomBtn
          text="Continue"
          rightIcon={<BiChevronRight size={22} />}
          loading={false}
          handleSubmit={() => router.push(ROUTES.login)}
        />
      </Flex>
    </Flex>
  );
};

export default Home;


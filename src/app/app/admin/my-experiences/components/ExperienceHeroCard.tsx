"use client";

import React from "react";
import { Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

import HeroSectionWrapper from "./HeroSectionWrapper";
import { CustomBtn } from "@/components/common/CustomBtn";
import { COLORS } from "@/constants/colors";
import { ROUTES } from "@/constants/pageRoutes";


const ExperienceHeroCard = () => {
  const router = useRouter();
  return (
    <HeroSectionWrapper>
      <Text fontSize={["1.2rem", "1.2rem", "2.6rem"]}>
        Ready to engage your audience?
      </Text>
      <Text fontSize={["1rem", "1rem", "1.2rem"]}>
        Click Get Started to create your first experience.
      </Text>
      <CustomBtn
        text="Create Experience"
        w={["100%", "100%", "14rem"]}
        bg={COLORS.secondary}
        color={COLORS.white}
        loading={false}
        handleSubmit={() => router.push(ROUTES.create_experience)}
      />
    </HeroSectionWrapper>
  );
};

export default ExperienceHeroCard;

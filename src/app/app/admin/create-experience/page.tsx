"use client";

import { FullPageLoader } from "@/components/common/FullPageLoader";
import PageTitle from "@/components/common/PageTitle";
import useIsMounted from "@/hooks/useIsMounted";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { COLORS } from "@/constants/colors";
import { CustomBtn } from "@/components/common/CustomBtn";
import ExperienceCard from "./components/ExperienceCard";
import SectionWrapper from "./components/SectionWrapper";

const CreateExperience = () => {
  const isMounted = useIsMounted();

  const createExpData = [
    {
      color: COLORS.white,
      bg: COLORS.blue,
      name: "Countdown Trivia",
      heading: "Answer faster to get more points",
      description:
        "Players earn more points by answering faster and see live rankings update on the leaderboard!",
    },
  ];
  return !isMounted ? (
    <FullPageLoader />
  ) : (
    <>
      <PageTitle title="Create Experience" />
      <SectionWrapper>
        {createExpData?.map((experience, idx) => (
          <ExperienceCard
            key={idx}
            heading={experience?.heading}
            name={experience?.name}
            bg={experience?.bg}
            color={experience?.color}
            description={experience?.description}
          />
        ))}
      </SectionWrapper>
    </>
  );
};

export default CreateExperience;

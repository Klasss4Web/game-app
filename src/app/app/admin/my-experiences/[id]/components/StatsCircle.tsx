import { COLORS } from "@/constants/colors";
import { ExperienceData } from "@/types/experience";
import { Flex, Stat, StatLabel, StatNumber } from "@chakra-ui/react";
import React from "react";
import { IconType } from "react-icons";

type CircleProps = {
  ICON: IconType;
  statNumber: number;
  statLabel: string;
};

const StatsCircle = ({ ICON, statNumber, statLabel }: CircleProps) => {
  return (
    <Flex direction="column" align="center">
      <Flex
        direction="column"
        justify="center"
        align="center"
        bg={COLORS.secondary}
        width="4rem"
        height="4rem"
        borderRadius="50%"
        border={`.4rem solid ${COLORS.white}`}
        fontWeight="bold"
      >
        <ICON size={26} />
      </Flex>
      <Stat textAlign="center" mt=".2rem">
        <StatNumber fontSize="1rem">{statNumber}</StatNumber>
        <StatLabel>{statLabel}</StatLabel>
      </Stat>
    </Flex>
  );
};

export default StatsCircle;

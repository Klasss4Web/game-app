import { COLORS } from "@/constants/colors";
import { Flex } from "@chakra-ui/react";
import React from "react";

type ExperienceCardProps = {
  children?: React.ReactNode;
};

const GameControlExperienceCard = ({ children }: ExperienceCardProps) => {
  return (
    <Flex
      className="card-animate"
      direction="column"
      width={["100%", "100%", "32.5%"]}
      gap=".5rem"
      justify="center"
      align="center"
      mt={["1rem", "1rem", "0"]}
      padding="1rem"
      color={COLORS.white}
      bg={COLORS.blue}
      borderRadius=".6rem"
    >
      {children}
    </Flex>
  );
};

export default GameControlExperienceCard;

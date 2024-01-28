import React from "react";
import GameControlExperienceCard from "./ExperienceControlCard";
import { Progress, Text } from "@chakra-ui/react";
import { COLORS } from "@/constants/colors";

type CountdownControlCardProps = {
  isFinished: boolean;
};

const GameExperienceCard = ({ isFinished }: CountdownControlCardProps) => {
  return (
    <GameControlExperienceCard>
      <Text fontSize="1.4rem">
        {isFinished ? "Finished" : "Waiting to start countdown"}
      </Text>
      <Text
        fontSize="1rem"
        borderRadius="40%"
        bg={COLORS.formGray}
        padding=".1rem .2rem"
      >
        0:20
      </Text>
      <Progress
        size="xs"
        width="100%"
        height=".6rem"
        value={50}
        background={COLORS.white}
        borderRadius=".4rem"
        isIndeterminate
      />
    </GameControlExperienceCard>
  );
};

export default GameExperienceCard;

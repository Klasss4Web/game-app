import React from "react";
import GameControlExperienceCard from "./ExperienceControlCard";
import { Progress, Text } from "@chakra-ui/react";
import { COLORS } from "@/constants/colors";

type CountdownControlCardProps = {
  isFinished: boolean;
  minutes: number;
  seconds: number;
};

const GameExperienceCard = ({
  isFinished,
  minutes,
  seconds,
}: CountdownControlCardProps) => {
  console.log("SECONDS", seconds);
  return (
    <GameControlExperienceCard>
      <Text fontSize="1.4rem">
        {isFinished ? "In Progress..." : "Waiting to start countdown"}
      </Text>
      <Text
        fontSize="1rem"
        borderRadius="40%"
        bg={COLORS.formGray}
        padding=".1rem .4rem"
      >
        {minutes} : {seconds}
      </Text>
      <Progress
        hasStripe
        size="xs"
        width="100%"
        height=".6rem"
        value={isFinished ? 100 : 0}
        // background={COLORS.white}
        borderRadius=".4rem"
        isIndeterminate={isFinished}
      />
    </GameControlExperienceCard>
  );
};

export default GameExperienceCard;

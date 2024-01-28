import React from "react";
import GameControlExperienceCard from "./ExperienceControlCard";
import { Flex, Text } from "@chakra-ui/react";
import { stats } from "../helper/stats";
import StatsCircle from "./StatsCircle";
import { Stats } from "@/types/stats";
import { ExperienceData } from "@/types/experience";

type StatsCardProps = {
  experience: ExperienceData;
};

const StatsCard = ({ experience }: StatsCardProps) => {
  return (
    <GameControlExperienceCard>
      <Text fontSize="1.4rem">Quick Stats</Text>
      <Flex width="100%" justify="space-between">
        {stats?.map((stat: Stats) => (
          <StatsCircle
            key={stat?.id}
            ICON={stat?.icon}
            statNumber={stat?.statNumber}
            statLabel={stat?.statLabel}
          />
        ))}
      </Flex>
    </GameControlExperienceCard>
  );
};

export default StatsCard;

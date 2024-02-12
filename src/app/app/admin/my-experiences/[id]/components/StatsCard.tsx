import React from "react";
import GameControlExperienceCard from "./ExperienceControlCard";
import { Flex, Text } from "@chakra-ui/react";
import { stats } from "../helper/stats";
import StatsCircle from "./StatsCircle";
import { Stats } from "@/types/stats";
import { ExperienceData } from "@/types/experience";

type StatsCardProps = {
  experience: ExperienceData;
  participantsWhoAnsweredQuest: number;
};

const StatsCard = ({
  experience,
  participantsWhoAnsweredQuest,
}: StatsCardProps) => {
  return (
    <GameControlExperienceCard>
      <Text fontSize="1.4rem">Quick Stats</Text>
      <Flex width="100%" justify="space-between">
        {stats?.map((stat: Stats) => {
          // Explicitly specify the property name based on the stat key
          let statNumber = 0;
          switch (stat.key) {
            case "id":
              statNumber = experience?.id as number;
              break;
            case "participant_count":
              statNumber = experience?.participant_count;
              break;
            case "no_of_questions":
              statNumber = experience?.no_of_questions;
              break;
            case "no_of_answers":
              statNumber = participantsWhoAnsweredQuest;
            // Add more cases for other stats keys as needed
            default:
              break;
          }

          return (
            <StatsCircle
              key={stat?.id}
              ICON={stat?.icon}
              statNumber={statNumber}
              statLabel={stat.statLabel}
            />
          );
        })}
      </Flex>
    </GameControlExperienceCard>
  );
};

export default StatsCard;

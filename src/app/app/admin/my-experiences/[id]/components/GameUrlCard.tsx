import React from "react";
import GameControlExperienceCard from "./ExperienceControlCard";
import { handleCopyLink } from "@/utils/copyToClipboard";
import CustomLink from "@/components/common/CustomLink";
import { FaRegCopy } from "react-icons/fa6";
import { Flex, Text } from "@chakra-ui/react";
import { ROUTES } from "@/constants/pageRoutes";
import { ExperienceData } from "@/types/experience";
import { truncateText } from "@/utils/truncateTexts";

type GameUrlCardProps = {
  experience: ExperienceData;
};

const GameUrlCard = ({ experience }: GameUrlCardProps) => {
  return (
    <GameControlExperienceCard>
      <Text fontSize="1.4rem">Genius URL</Text>
      <Text fontSize="1rem">Share the link below to participants</Text>
      <Flex gap=".5rem" align="center">
        <CustomLink
          to={`${ROUTES?.participant}?id=${experience?.id}`}
          text={truncateText(
            `${process.env.NEXT_PUBLIC_FRONTEND_URL}${ROUTES?.participant}?id=${experience?.id}`,
            24
          )}
        />
        <FaRegCopy
          cursor="pointer"
          size={22}
          onClick={() =>
            handleCopyLink(
              `${process.env.NEXT_PUBLIC_FRONTEND_URL}${ROUTES?.participant}?id=${experience?.id}`
            )
          }
        />
      </Flex>
    </GameControlExperienceCard>
  );
};

export default GameUrlCard;

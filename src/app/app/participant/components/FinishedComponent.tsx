"use client";

import Circle from "@/components/common/Circle";
import { COLORS } from "@/constants/colors";
import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";
import PlayersRankingTable from "./PlayersRankingTable";
import HeroSectionWrapper from "../../admin/my-experiences/components/HeroSectionWrapper";

const FinishedComponent = () => {
  return (
    <HeroSectionWrapper bg={COLORS.formGray} align="center">
      <Text fontSize="1rem">Game Finished.</Text>
      <Circle width="8rem" height="8rem" bg={COLORS.secondary}>
        <Text color={COLORS.white}>1</Text>
        <Text color={COLORS.white}>Points</Text>
      </Circle>
      <Text fontSize={["1.2rem"]}>
        The trivia game has ended. Thank you for answering
      </Text>
      <Flex
        width="100%"
        justify="space-between"
        padding="1rem 0"
        color={COLORS.white}
        bg={COLORS.secondary}
        borderRadius=".5rem"
      >
        <Box width="33%">
          <Text>1</Text>
          <Text>Your Rank</Text>
        </Box>
        <Box width="33%" color={COLORS.orange}>
          <Text>Ochade</Text>
          <Text>Winner</Text>
        </Box>
        <Box width="33%">
          <Text>6</Text>
          <Text>Participants</Text>
        </Box>
      </Flex>
      <Flex
        direction="column"
        width="100%"
        justify="center"
        padding=".9rem"
        color={COLORS.white}
        bg={COLORS.blue}
        borderRadius=".5rem"
      >
        <Text fontSize={["1.6rem"]}>Player Rankings</Text>
        <PlayersRankingTable />
      </Flex>
    </HeroSectionWrapper>
  );
};

export default FinishedComponent;

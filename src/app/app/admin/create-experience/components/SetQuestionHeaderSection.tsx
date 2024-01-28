import React from "react";
import { COLORS } from "@/constants/colors";
import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

import HashTagBox from "../[set-up]/components/HashTagBox";

const SetQuestionHeaderSection = () => {
  const hashTagData = [
    {
      hashTagText: "TRENDING",
      bg: COLORS.blue,
      color: COLORS.white,
    },
    {
      hashTagText: "NEW",
      bg: COLORS.orange,
      color: COLORS.white,
    },
    {
      hashTagText: "GENERAL",
      bg: COLORS.secondary,
      color: COLORS.white,
    },
    {
      hashTagText: "HISTORY",
      bg: COLORS.blue,
      color: COLORS.white,
    },
  ];
  return (
    <Box width="100%" padding="1rem" bg={COLORS.bgGrey}>
      <Flex gap=".6rem">
        <Box width="20%">
          <Avatar size="2xl" src="/images/genius.jpg" />
          <Text fontSize=".8rem" textAlign="center" mt=".4rem">
            Published January 16, 2024
          </Text>
        </Box>
        <Box>
          <Text
            fontSize="1.6rem"
            color={COLORS.secondary}
            fontWeight="semibold"
          >
            Turning 10 in 2024
          </Text>
          <Text my=".7rem">
            We take a look a back at the glory days of 2014 with this trivia
            game featuring people, places, and things celebrating a tenth
            birthday in 2024.
          </Text>

          <Flex width="100%" gap=".7rem">
            {hashTagData?.map((tag, index) => (
              <HashTagBox
                key={index}
                hashTagText={tag?.hashTagText}
                bg={tag?.bg}
                color={tag?.color}
              />
            ))}
          </Flex>
          <Text my=".6rem">
            By: Immanuel D.{" "}
            <Text as="span" color={COLORS.blue}>
              Official Genius Club Team
            </Text>
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default SetQuestionHeaderSection;

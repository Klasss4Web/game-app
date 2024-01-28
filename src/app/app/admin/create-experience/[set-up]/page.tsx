"use client";

import PageTitle from "@/components/common/PageTitle";
import { COLORS } from "@/constants/colors";
import {
  Box,
  Button,
  Divider,
  Flex,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { FaArrowRight } from "react-icons/fa6";

import CategoryCard from "./components/CategoryCard";
import GameDescriptionCard from "./components/GameDescriptionCard";

const Setup = () => {
  const [search, setSearch] = React.useState(false);
  const handleSearch = () => setSearch(!search);
  const categoriesData = [
    {
      id: 1,
      name: "Trending",
      imageUrl: "/images/genius.jpg",
    },
    { id: 2, name: "New", imageUrl: "/images/loginBg.jpg" },
  ];
  return (
    <>
      <PageTitle title="Countdown Trivia" />
      <Text my="1rem" color={COLORS.white}>
        Select a trivia from the list below
      </Text>
      <Divider mb="1rem" />
      <Flex width="100%">
        <Box width="16%">
          <Text color={COLORS.white} mb="1rem">
            All Categories
          </Text>
          <Flex width="100%" wrap="wrap" justify="space-between">
            {categoriesData?.map((details) => (
              <CategoryCard
                key={details?.id}
                name={details?.name}
                imageUrl={details?.imageUrl}
              />
            ))}
          </Flex>
        </Box>
        <Flex width="63%" direction="column">
          <InputGroup size="md">
            <Input
              pr="4rem"
              type="test"
              placeholder="Type something..."
              color={COLORS.white}
            />
            <InputRightElement width="6rem">
              <Button h="1.75rem" size="sm" onClick={handleSearch} mr=".2rem">
                {search ? "Searching..." : "Search"}
              </Button>
            </InputRightElement>
          </InputGroup>
          <Box my="1rem">
            <Text color={COLORS.white}>
              <Text
                as="span"
                p=".2rem"
                bg={COLORS.bgGrey}
                color={COLORS.secondary}
                borderRadius=".3rem"
              >
                TRENDING
              </Text>{" "}
              <Text as="span">
                These are the hottest trivia games on Crowdpurr based on
                popularity and usage trends.
              </Text>
            </Text>
          </Box>
          <Box height="60vh" overflowY="scroll" className="scroll">
            {[...Array(5)].map((datum, index) => (
              <GameDescriptionCard
                key={index}
                title="Russian Roulette"
                publishedDate="Published January 16, 2024"
                description=" We take a look a back at the glory days of 2014 with this
                  trivia game featuring people, places, and things celebrating a
                  tenth birthday in 2024."
              />
            ))}
          </Box>
        </Flex>
        <Flex width="20%"></Flex>
      </Flex>
    </>
  );
};

export default Setup;

"use client";

import React from "react";
import { CustomBtn } from "@/components/common/CustomBtn";
import { COLORS } from "@/constants/colors";
import { Box, Flex, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import CustomModal from "@/components/common/CustomModal";
import CreateExperienceModalContent from "./CreateExperienceModalContent";

type ExperienceCardProps = {
  bg: string;
  color: string;
  name: string;
  heading: string;
  description: string;
};

const ExperienceCard = ({
  bg,
  color,
  heading,
  name,
  description,
}: ExperienceCardProps) => {
  // const router = useRouter();
  return (
    <Flex
      direction="column"
      justify="space-between"
      width="33%"
      height="15rem"
      borderRadius=".5rem"
      padding="1rem"
      color={color}
      bg={bg}
      //   color={COLORS.white}
      //   bg={COLORS.blue}
    >
      <Box textAlign="left">
        <Text
          textTransform="uppercase"
          padding=".4rem"
          bg={COLORS.secondary}
          borderRadius=".4rem"
        >
          {heading}
        </Text>
        <Text fontSize={["1.2rem"]} fontWeight="bold">
          {name}
        </Text>
        <Text>{description}</Text>
      </Box>
      <Flex width="100%" justify="space-between">
        <CustomModal
          div
          bg={COLORS.bgGrey}
          addCloseModalBtn
          size="4xl"
          btnTitle={
            <CustomBtn
              text="Create"
              loading={false}
            />
          }
        >
          <CreateExperienceModalContent />
        </CustomModal>
        {/* <Box>
          <CustomBtn
            text="Create"
            loading={false}
            handleSubmit={() => router.push(`/app/admin/create-experience/1`)}
          />
        </Box> */}
      </Flex>
    </Flex>
  );
};

export default ExperienceCard;

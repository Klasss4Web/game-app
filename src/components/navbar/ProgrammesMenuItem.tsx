"use client";

import { Box, Flex, HStack, Img, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React from "react";

export type TProgrammesMenuItemProps = {
  // icon: As | undefined;
  icon: string;
  menuTitle: string;
  subMenuTitle: string;
  to: string;
};

export const ProgrammesMenuItem = ({
  icon,
  to,
  menuTitle,
  subMenuTitle,
}: TProgrammesMenuItemProps) => {
  const { push } = useRouter();
  return (
    <HStack onClick={() => push(to)} cursor="pointer">
      <Flex gap="0.7rem" align={"flex-start"}>
        {/* <Icon fontSize={24} as={icon || People} /> */}
        <Img src={icon} alt="programme" />
        <Box>
          <Text fontWeight={700} pb={1} fontSize={14}>
            {menuTitle || "Enumeration and Registration"}
          </Text>
          <Text fontSize={14} color="gray.600" noOfLines={2}>
            {subMenuTitle ||
              "We support organizations in the use of global best practice standards such as"}
          </Text>
        </Box>
      </Flex>
    </HStack>
  );
};

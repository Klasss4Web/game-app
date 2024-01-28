"use client";

import { COLORS } from "@/constants/colors";
import { Flex } from "@chakra-ui/react";
import React from "react";

type SectionWrapperProps = {
  bg?: string;
  children?: React.ReactNode;
  align?: "flex-start" | "center" | "space-between";
  textAlign?: "center" | "left";
};

const HeroSectionWrapper = ({
  bg,
  align,
  textAlign,
  children,
  ...props
}: SectionWrapperProps) => {
  return (
    <Flex
      {...props}
      direction="column"
      justify="center"
      align={align || "center"}
      width="100%"
      bg={bg || COLORS.bgGrey}
      borderRadius=".5rem"
      textAlign={textAlign || "center"}
      padding="3rem"
      my="1rem"
      gap="1rem"
    >
      {children}
    </Flex>
  );
};

export default HeroSectionWrapper;

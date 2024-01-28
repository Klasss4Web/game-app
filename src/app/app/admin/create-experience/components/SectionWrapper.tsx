import { COLORS } from "@/constants/colors";
import { Flex } from "@chakra-ui/react";
import React from "react";

type SectionWrapperProps = {
  bg?: string;
  children?: React.ReactNode;
};

const SectionWrapper = ({ bg, children, ...props }: SectionWrapperProps) => {
  return (
    <Flex
      {...props}
      justify="space-between"
      align="center"
      width="100%"
      bg={bg || COLORS.bgGrey}
      borderRadius=".5rem"
      textAlign="center"
      padding="3rem"
      my="1rem"
      gap="1rem"
    >
      {children}
    </Flex>
  );
};

export default SectionWrapper;

import { COLORS } from "@/constants/colors";
import { Flex } from "@chakra-ui/react";
import React from "react";

type CircleProps = {
  bg?: string;
  top?: string[] | string;
  left?: string;
  children?: React.ReactNode;
  size?: string;
  width: string;
  height: string;
  position?: "relative" | "absolute" | "fixed";
};

const Circle = ({ children, ...props }: CircleProps) => {
  return (
    <Flex
      {...props}
      direction="column"
      justify="center"
      align="center"
      borderRadius="50%"
      border={`.4rem solid ${COLORS.white}`}
      fontWeight="bold"
    >
      {children}
    </Flex>
  );
};

export default Circle;

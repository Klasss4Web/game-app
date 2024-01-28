import { Text } from "@chakra-ui/react";
import React from "react";

type HashTagBoxProps = {
  bg: string;
  color: string;
  hashTagText: string;
};

const HashTagBox = ({ bg, color, hashTagText }: HashTagBoxProps) => {
  return (
    <Text
      as="span"
      p=".2rem"
      bg={bg}
      color={color}
      borderRadius=".3rem"
      cursor="pointer"
    >
      {hashTagText}
    </Text>
  );
};

export default HashTagBox;

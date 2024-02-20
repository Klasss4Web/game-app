import { COLORS } from "@/constants/colors";
import { Flex, Spinner, Text } from "@chakra-ui/react";
import React from "react";
import { IconType } from "react-icons";

type ControlModalContentProps = {
  loading: boolean;
  ICON: IconType;
  text: string;
  helperText: "Start" | "End" | "Closed";
  onClose?: () => void;
  startExperience: (arg?: () => void) => void;
};

const ControlModalContent = ({
  loading,
  ICON,
  text,
  helperText,
  startExperience,
  onClose,
}: ControlModalContentProps) => {
  return (
    <Flex
      direction="column"
      width="100%"
      align="center"
      justify="center"
      padding="2rem"
      gap=".2rem"
    >
      <Text>{text}</Text>
      {loading ? (
        <Spinner />
      ) : (
        <ICON
          size={40}
          cursor="pointer"
          color={helperText === "End" ? COLORS.red : COLORS.success}
          onClick={() => {
            startExperience(onClose);
            // onClose();
          }}
        />
      )}
      <Text>{helperText}</Text>
    </Flex>
  );
};

export default ControlModalContent;

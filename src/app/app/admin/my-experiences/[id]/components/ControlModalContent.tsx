import { Flex, Spinner, Text } from "@chakra-ui/react";
import React from "react";
import { IconType } from "react-icons";
import { FaRegCirclePlay } from "react-icons/fa6";

type ControlModalContentProps = {
  loading: boolean;
  ICON: IconType;
  text: string;
  helperText: "Start" | "End" | "Closed";
  onClose?: () => void;
  startExperience: () => void;
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
          onClick={() => {
            startExperience();
            // onClose();
          }}
        />
      )}
      <Text>{helperText}</Text>
    </Flex>
  );
};

export default ControlModalContent;

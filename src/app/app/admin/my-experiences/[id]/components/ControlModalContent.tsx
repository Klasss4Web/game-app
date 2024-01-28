import { Flex, Spinner, Text } from "@chakra-ui/react";
import React from "react";
import { FaRegCirclePlay } from "react-icons/fa6";

type ControlModalContentProps = {
  loading: boolean;
  onClose?: () => void;
  startExperience: () => void;
};

const ControlModalContent = ({
  loading,
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
      <Text>Click the start button to begin the game</Text>
      {loading ? (
        <Spinner />
      ) : (
        <FaRegCirclePlay
          size={40}
          cursor="pointer"
          onClick={() => {
            startExperience();
            // onClose();
          }}
        />
      )}
      <Text>Start</Text>
    </Flex>
  );
};

export default ControlModalContent;

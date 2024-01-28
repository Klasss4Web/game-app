"use client";

import { COLORS } from "@/constants/colors";
import { Button, Text } from "@chakra-ui/react";
import React, { MouseEventHandler } from "react";

type QuestionOptionsCardProps = {
  id: string;
  option: string;
  isRunning: boolean;
  isAnswered: boolean;
  selectedBtnId: string;
  // setSelectedBtnId: (arg: number) => void;
  handleSubmitAnswer: MouseEventHandler<HTMLButtonElement>;
};

const QuestionOptionsCard = ({
  id,
  option,
  isRunning,
  isAnswered,
  selectedBtnId,
  // setSelectedBtnId,
  handleSubmitAnswer,
}: QuestionOptionsCardProps) => {
  return (
    <Button
      width="100%"
      mb=".5rem"
      bg={selectedBtnId === id ? COLORS.yellow : COLORS.formGray}
      borderRadius="2rem"
      padding=".8rem"
      cursor="pointer"
      _hover={{ bg: COLORS.yellow }}
      isDisabled={!isRunning && !isAnswered}
      onClick={handleSubmitAnswer}
    >
      <Text textAlign="center" fontSize="1.2rem" color={COLORS.secondary}>
        {option}
      </Text>
    </Button>
  );
};

export default QuestionOptionsCard;

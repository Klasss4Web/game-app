"use client";

import { COLORS } from "@/constants/colors";
import { AnswerQuestionResponse } from "@/types/questions";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import React, { MouseEventHandler } from "react";
import { GrStatusGood } from "react-icons/gr";
import { ImCancelCircle } from "react-icons/im";

type QuestionOptionsCardProps = {
  id: string | number;
  index: number;
  option: string;
  position: string;
  isRunning: boolean;
  isCorrect: boolean;
  flashCount: number;
  isAnswered: boolean;
  selectedBtnId: string;
  answerResponse: AnswerQuestionResponse;
  // setSelectedBtnId: (arg: number) => void;
  handleSubmitAnswer: MouseEventHandler<HTMLButtonElement>;
};

const QuestionOptionsCard = ({
  id,
  index,
  option,
  position,
  isCorrect,
  isRunning,
  isAnswered,
  flashCount,
  selectedBtnId,
  answerResponse,
  // setSelectedBtnId,
  handleSubmitAnswer,
}: QuestionOptionsCardProps) => {
  let optionTag;
  switch (index) {
    case 0:
      optionTag = "A";
      break;
    case 1:
      optionTag = "B";
      break;
    case 2:
      optionTag = "C";
      break;
    case 3:
      optionTag = "D";
      break;
    case 4:
      optionTag = "E";
      break;
    case 5:
      optionTag = "F";
      break;
    // Add more cases for other stats keys as needed
    default:
      break;
  }

  console.log("optionTag", optionTag, index);
  return (
    <Button
      // className={
      //   answerResponse.is_answer_correct
      //     ? `flashing-button ${flashCount > 0 ? "flashing" : ""}`
      //     : ""
      // }
      width="100%"
      mb=".5rem"
      bg={
        selectedBtnId === id && position === "question"
          ? COLORS.yellow
          : isCorrect && position !== "question"
          ? COLORS.success
          : !isCorrect && position !== "question"
          ? COLORS.red
          : COLORS.formGray
      }
      borderRadius="2rem"
      padding=".8rem 0 !important"
      cursor="pointer"
      _hover={{ bg: COLORS.yellow }}
      isDisabled={(!isRunning && !isAnswered) || position !== "question"}
      onClick={handleSubmitAnswer}
    >
      <Flex
        width="100%"
        align="center"
        fontWeight={isCorrect ? "bold" : "normal"}
      >
        <Text width="10%" fontSize="1.2rem" color={COLORS.secondary}>
          {optionTag}
        </Text>
        <Text
          width="80%"
          textAlign="center"
          fontSize="1.2rem"
          color={COLORS.secondary}
        >
          {option}
        </Text>
        {position !== "question" && (
          <Box fontSize="1.2rem" fontWeight="bold">
            {isCorrect ? (
              <GrStatusGood color={COLORS.white} />
            ) : (
              <ImCancelCircle color={COLORS.white} />
            )}
          </Box>
        )}
      </Flex>
    </Button>
  );
};

export default QuestionOptionsCard;

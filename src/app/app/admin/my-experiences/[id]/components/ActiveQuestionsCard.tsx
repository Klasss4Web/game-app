import React, { useState } from "react";
import GameControlExperienceCard from "./ExperienceControlCard";
import { COLORS } from "@/constants/colors";
import { Flex, Text } from "@chakra-ui/react";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
import { ActiveQuestionPayload, Questions } from "@/types/questions";
import { errorNotifier } from "@/app/providers";

type ActiveQuestionsCardProps = {
  sliceIndex: number;
  experience_id: string;
  setSliceIndex: (arg: number) => void;
  allQuestions: Questions[];
  setActiveQuestion: (
    payload: ActiveQuestionPayload,
    questionNo: number,
    isQuestionInvalid: boolean
  ) => void;
  // totalQuestions: number;
};

const ActiveQuestionsCard = ({
  // selectedQuestion,
  setActiveQuestion,
  experience_id,
  setSliceIndex,
  sliceIndex,
  allQuestions = [],
}: // totalQuestions,
ActiveQuestionsCardProps) => {
  const [response, setResponse] = useState({});

  // const getSelectedQuestions = (): Questions | undefined => {
  //   const selectedQuestion = allQuestions?.find(
  //     (question: Questions) => question?.order === sliceIndex + 1
  //   );
  //   return selectedQuestion;
  // };

  // console.log("ACCCC", getSelectedQuestions(), "sliceIndex", sliceIndex);
  const handleBack = async () => {
    if (sliceIndex < 1) return;

    const activeQuestion = allQuestions[sliceIndex - 1];
    const payload = {
      experience_id,
      question_id: activeQuestion?.id,
    };
    const questionNo = sliceIndex - 1;
    console.log("ACTIVE QUES", payload, "INDEX", allQuestions[sliceIndex - 1]);
    // await setActiveQuestion(payload, setLoading, setResponse);
    await setActiveQuestion(payload, questionNo, activeQuestion?.hasBeenActive);
    setSliceIndex(sliceIndex - 1);
  };

  const handleNext = async () => {
    if (sliceIndex === allQuestions.length - 1)
      return errorNotifier("You have reached the end");
    const activeQuestion = allQuestions[sliceIndex + 1];
    const questionNo = sliceIndex + 1;
    const payload = {
      experience_id,
      question_id: activeQuestion?.id,
    };
    console.log("ACTIVE QUES", payload, "INDEX", allQuestions[sliceIndex + 1]);
    await setActiveQuestion(payload, questionNo, activeQuestion?.hasBeenActive);
    setSliceIndex(sliceIndex + 1);
  };

  console.log("ACTIVE QUES", response);
  return (
    <GameControlExperienceCard>
      <Text fontSize="1.4rem">Active Question</Text>
      <Flex width="100%" justify="center" align="center" gap=".4rem">
        <FaArrowCircleLeft size={60} cursor="pointer" onClick={handleBack} />
        <Flex
          justify="center"
          align="center"
          bg={COLORS.secondary}
          width="5rem"
          height="5rem"
          borderRadius="50%"
          border={`.4rem solid ${COLORS.white}`}
          fontWeight="bold"
        >
          <Text fontSize="1.4rem">
            {allQuestions.length > 0 ? sliceIndex + 1 : 0}
          </Text>
        </Flex>
        <FaArrowCircleRight size={60} cursor="pointer" onClick={handleNext} />
      </Flex>
    </GameControlExperienceCard>
  );
};

export default ActiveQuestionsCard;

import React, { useState } from "react";
import GameControlExperienceCard from "./ExperienceControlCard";
import { COLORS } from "@/constants/colors";
import { Flex, Text } from "@chakra-ui/react";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
import { setActiveQuestion } from "@/services/socket";
import { Questions } from "@/types/questions";

type ActiveQuestionsCardProps = {
  sliceIndex: number;
  experience_id: string;
  setSliceIndex: (arg: number) => void;
  allQuestions: Questions[];
  // totalQuestions: number;
};

const ActiveQuestionsCard = ({
  // selectedQuestion,
  experience_id,
  setSliceIndex,
  sliceIndex,
  allQuestions,
}: // totalQuestions,
ActiveQuestionsCardProps) => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState({});

  const getSelectedQuestions = (): Questions | undefined => {
    const selectedQuestion = allQuestions?.find(
      (question: Questions) => question?.order === sliceIndex + 1
    );
    return selectedQuestion;
  };

  console.log("ACCCC", getSelectedQuestions(), "sliceIndex", sliceIndex);
  const handleBack = () => {
    if (sliceIndex < 1) return;
    const payload = {
      experience_id,
      question_id: getSelectedQuestions()?.id,
    };
    console.log("ACTIVE QUES", payload);
    setActiveQuestion(payload, setLoading, setResponse);
    setSliceIndex(sliceIndex - 1);
  };

  const handleNext = () => {
    if (sliceIndex === allQuestions.length) return;
    const payload = {
      experience_id,
      question_id: getSelectedQuestions()?.id,
    };
    console.log("ACTIVE QUES", payload);
    setActiveQuestion(payload, setLoading, setResponse);
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
          <Text fontSize="1.4rem">{sliceIndex + 1}</Text>
        </Flex>
        <FaArrowCircleRight size={60} cursor="pointer" onClick={handleNext} />
      </Flex>
    </GameControlExperienceCard>
  );
};

export default ActiveQuestionsCard;

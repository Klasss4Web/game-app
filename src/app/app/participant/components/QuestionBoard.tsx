"use client";

import Circle from "@/components/common/Circle";
import { COLORS } from "@/constants/colors";
import { setTimer } from "@/utils/setTimer";
import { Box, Flex, Progress, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useTimer } from "react-timer-hook";
import QuestionOptionsCard from "./QuestionOptionsCard";
import {
  AnswerQuestionResponse,
  OptionFields,
  Questions,
  SubmitAnswerPayload,
} from "@/types/questions";
import {
  SOCKET_EVENTS,
  answerExperienceQuestion,
  socketClient,
} from "@/services/socket";
import { errorNotifier, successNotifier } from "@/app/providers";
import { formatToIsoDate } from "@/utils/dateFormat";
import { useSocket } from "@/contexts/SocketContext";
import { setLocalStorageItem, setLocalStorageString } from "@/utils/localStorage";

type QuestionsProps = {
  questions: Questions;
  position: string;
  experience_id: string;
  setResponse: (arg: Questions) => void;
  setPosition: (arg: string) => void;
};

const QuestionBoard = ({
  questions,
  position,
  experience_id,
  setResponse,
  setPosition,
}: QuestionsProps) => {
  const { socketConnection } = useSocket();
  const { seconds, minutes, isRunning, resume, restart, pause } = useTimer({
    expiryTimestamp: setTimer(),
    autoStart: true,
    onExpire: () => console.warn("onExpire called"),
  });

  const [isAnswered, setIsAnswered] = useState(false);
  const [loading, setLoading] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [selectedBtnId, setSelectedBtnId] = useState("");
  const [answerResponse, setAnswerResponse] = useState<AnswerQuestionResponse>(
    {} as AnswerQuestionResponse
  );
  const [flashCount, setFlashCount] = useState(0);

  const handleFlash = () => {
    setFlashCount(3); // Set the number of flashes
    setTimeout(() => setFlashCount(0), 3000); // Reset flash count after 3 seconds
  };

  console.log("socketConnection SUBMIT", socketConnection);

  useEffect(() => {
    setLoading(false);
    socketConnection.on(SOCKET_EVENTS.experienceReactivity, (data: any) => {
      setAnswerResponse({} as AnswerQuestionResponse);
      const audioElement = new Audio("/audio/notification1.wav");
      audioElement.play();
      console.log(
        `EXP MSG RESP FOR ${SOCKET_EVENTS.experienceReactivity}`,
        data
      );
      setPosition(data?.display_type);
      setLocalStorageString("position", data?.display_type);
      
      if (data?.display_type === "question") {
        setResponse(data?.result?.question);
        setLocalStorageItem("question", data?.result?.question);
        restart(setTimer());
        setLoading(false);
      } else if (!data?.display_type) {
         setResponse(data?.result);
         setLocalStorageItem("question", data?.result);
         pause();
      } else {
        setResponse(data?.result);
        pause();
      }
    });
    // socketClient.on(SOCKET_EVENTS.experienceReactivity, (error: any) => {
    //   console.log(
    //     `EXP ERROR FOR ${SOCKET_EVENTS.experienceReactivity}`,
    //     error
    //   );
    //   errorNotifier(error.message);
    // });

    return () => {
      socketConnection.removeAllListeners(SOCKET_EVENTS.experienceReactivity);
    };
  }, [setResponse, setPosition, restart, pause, questions?.id, selectedBtnId, socketConnection]);

  function answerExperienceQuestions(
    payload: SubmitAnswerPayload,
    setLoading: (arg: boolean) => void
  ) {
    // const participant = getLocalStorageItem<LoggedInParticipant>(
    //   SAVED_ITEMS.participant
    // );
    setLoading(true);
    // socketClient = io(socketBaseURL as string);
    console.log("socketClient", socketConnection);

    socketConnection.emit(
      SOCKET_EVENTS.answerExperienceQuestion,
      payload,
      (response: any) => {
        console.log(
          response,
          `EMIT RESPONSE FOR ${SOCKET_EVENTS.answerExperienceQuestion}`
        ); // ok
        setLoading(false);
        successNotifier("Submitted...");
      }
    );

    socketConnection.on(
      SOCKET_EVENTS.answerExperienceQuestionResponse,
      (data: any) => {
        console.log(
          `MSG RESP FOR ${SOCKET_EVENTS.answerExperienceQuestionResponse}`,
          data
        );
        setAnswerResponse(data);
        handleFlash();
        // successNotifier("Submitted...");
        // errorNotifier(error?.message);
        setLoading(false);
      }
    );
    socketConnection.on(
      SOCKET_EVENTS.answerExperienceQuestionError,
      (error: any) => {
        console.log(
          `MSG RESP FOR ${SOCKET_EVENTS.answerExperienceQuestionError}`,
          error
        );
        errorNotifier(error?.message);
        setLoading(false);
      }
    );
  }

  const handleSubmitAnswer = async (answer_id: string) => {
    // const participant = getLocalStorageItem(SAVED_ITEMS.participant)
    setLoading(true);
    const payload = {
      answer_id,
      experience_id,
      question_id: questions?.id,
      question_answered_at: formatToIsoDate(),
    };
    setSelectedBtnId(answer_id);
    console.log("PAYLOAD", payload, questions);
    answerExperienceQuestions(payload, setBtnLoading);
    pause();
    const audioElement = new Audio("/audio/notification.wav");
    audioElement.play();
  };

  // console.log("PAYLOAD", questions);
  return (
    <Box width="100%" position="relative">
      <Text color={COLORS.white} fontSize="1.2rem" my="1rem" textAlign="center">
        Answer correctly faster to earn more points!
      </Text>
      <Box
        width="100%"
        bg={COLORS.white}
        padding={["1rem .5rem", "1rem .6rem", "1rem"]}
        borderRadius=".5rem"
        textAlign="center"
      >
        <Text fontSize={["1.4rem"]}>{questions?.text}</Text>

        <Circle
          bg={COLORS.blue}
          width="3rem"
          height="3rem"
          position="absolute"
          top={["15%", "15%", "8%"]}
          left="-2%"
        >
          <Text fontSize="1.6rem">{questions?.order}</Text>
        </Circle>
      </Box>
      <Flex
        my="1rem"
        width="100%"
        justify="space-between"
        align="center"
        padding={[".5rem", ".6rem", "1rem"]}
        bg={COLORS.white}
      >
        <Text
          // mb="1rem"
          fontSize="1rem"
          borderRadius=".4rem"
          bg={COLORS.formGray}
          padding=".1rem .4rem"
        >
          {minutes}:{seconds}
        </Text>
        <Progress
          size="xs"
          width="75%"
          height=".6rem"
          value={(answerResponse?.point / questions?.point) * questions?.point}
          background={COLORS.secondary}
          borderRadius=".4rem"
          isIndeterminate={isRunning}
        />
        <Text
          fontSize="1rem"
          borderRadius=".5REM"
          bg={COLORS.secondary}
          color={COLORS.white}
          padding=".1rem .4rem"
        >
          {answerResponse?.point} Points
        </Text>
      </Flex>
      {!isAnswered && !isRunning && (
        <Text
          fontSize="1.2rem"
          color={selectedBtnId ? COLORS.headerGreen : COLORS.red}
          textAlign="center"
          mb="1rem"
        >
          {!selectedBtnId && position === "question"
            ? "Time has run out to answer."
            : selectedBtnId && position === "question"
            ? "You have selected an option"
            : "See correct answer below"}
        </Text>
      )}
      {questions?.answers?.map((opt: OptionFields, index: number) => (
        <QuestionOptionsCard
          key={index}
          index={index}
          option={opt?.text}
          isRunning={isRunning}
          isAnswered={isAnswered}
          selectedBtnId={selectedBtnId}
          id={opt?.id}
          flashCount={flashCount}
          answerResponse={answerResponse}
          position={position}
          isCorrect={opt?.is_correct}
          // setSelectedBtnId={() => setSelectedBtnId(opt?.id)}
          handleSubmitAnswer={() => handleSubmitAnswer(opt?.id)}
        />
      ))}
    </Box>
  );
};

export default QuestionBoard;

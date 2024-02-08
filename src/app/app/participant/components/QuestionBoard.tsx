"use client";

import Circle from "@/components/common/Circle";
import { COLORS } from "@/constants/colors";
import { setTimer } from "@/utils/setTimer";
import { Box, Flex, Progress, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useTimer } from "react-timer-hook";
import QuestionOptionsCard from "./QuestionOptionsCard";
import { OptionFields, Questions } from "@/types/questions";
import {
  SOCKET_EVENTS,
  answerExperienceQuestion,
  socketClient,
} from "@/services/socket";
import { errorNotifier, successNotifier } from "@/app/providers";
import { formatToIsoDate } from "@/utils/dateFormat";
import { getLocalStorageItem } from "@/utils/localStorage";
import { SAVED_ITEMS } from "@/constants/appConstants";
import { useSocket } from "@/contexts/SocketContext";

type QuestionsProps = {
  questions: Questions;
  experience_id: string;
  setResponse: (arg: Questions) => void;
};

const QuestionBoard = ({
  questions,
  experience_id,
  setResponse,
}: QuestionsProps) => {
  const { seconds, minutes, isRunning, resume, restart, pause } = useTimer({
    expiryTimestamp: setTimer(),
    autoStart: true,
    onExpire: () => console.warn("onExpire called"),
  });

  const [isAnswered, setIsAnswered] = useState(false);
  const [loading, setLoading] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [selectedBtnId, setSelectedBtnId] = useState("");

  const { socketConnection } = useSocket();
  console.log("socketConnection SUBMIT", socketConnection);

  useEffect(() => {
    setLoading(false);
    socketConnection.on(SOCKET_EVENTS.experienceReactivity, (data: any) => {
      const audioElement = new Audio("/audio/notification1.wav");
      audioElement.play();
      console.log(
        `EXP MSG RESP FOR ${SOCKET_EVENTS.experienceReactivity}`,
        data
      );
      setResponse(data?.result?.question);
      restart(setTimer());
      setLoading(false);
    });
    // socketClient.on(SOCKET_EVENTS.experienceReactivity, (error: any) => {
    //   console.log(
    //     `EXP ERROR FOR ${SOCKET_EVENTS.experienceReactivity}`,
    //     error
    //   );
    //   errorNotifier(error.message);
    // });

    return () => {
      socketClient.removeAllListeners(SOCKET_EVENTS.experienceReactivity);
    };
  }, [setResponse, restart, questions?.id, selectedBtnId, socketConnection]);

  function answerExperienceQuestions(
    payload: any,
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
      (error: any) => {
        console.log(
          `MSG RESP FOR ${SOCKET_EVENTS.answerExperienceQuestionResponse}`,
          error
        );
        successNotifier("Submitted...");
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
      // participant_id: participant?.id,
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
          value={0}
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
          {questions?.point} Points
        </Text>
      </Flex>
      {!isAnswered && !isRunning && (
        <Text
          fontSize="1.2rem"
          color={selectedBtnId ? COLORS.headerGreen : COLORS.red}
          textAlign="center"
          mb="1rem"
        >
          {!selectedBtnId
            ? "Time has run out to answer."
            : "You have selected an option"}
        </Text>
      )}
      {questions?.answers?.map((opt: OptionFields, index: number) => (
        <QuestionOptionsCard
          key={index}
          option={opt?.text}
          isRunning={isRunning}
          isAnswered={isAnswered}
          selectedBtnId={selectedBtnId}
          id={opt?.id}
          // setSelectedBtnId={() => setSelectedBtnId(opt?.id)}
          handleSubmitAnswer={() => handleSubmitAnswer(opt?.id)}
        />
      ))}
    </Box>
  );
};

export default QuestionBoard;

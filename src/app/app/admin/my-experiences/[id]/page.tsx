"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Switch,
  Text,
} from "@chakra-ui/react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { COLORS } from "@/constants/colors";
import PageTitle from "@/components/common/PageTitle";
import GameControlExperienceCard from "./components/ExperienceControlCard";
import CountdownControlCard from "./components/CountdownControlCard";
import ActiveQuestionsCard from "./components/ActiveQuestionsCard";
import GameExperienceCard from "./components/GameExperienceCard";
import GameUrlCard from "./components/GameUrlCard";
import StatsCard from "./components/StatsCard";
import QuestionSection from "./components/Questions";
import { getAllQuestions, getSpecificExperience } from "./service";
import { FullPageLoader } from "@/components/common/FullPageLoader";
import { socketBaseURL } from "@/services/api";
import {
  SOCKET_EVENTS,
  getExperienceQuestion,
  getParticipantsCurrentScore,
  setActiveQuestion,
} from "@/services/socket";
import { errorNotifier } from "@/app/providers";
import { getLocalStorageString } from "@/utils/localStorage";
import { ACCESS_TOKEN } from "@/constants/appConstants";
import { io } from "socket.io-client";
import { ActiveQuestionPayload, Questions } from "@/types/questions";
import { Participants } from "@/types/experience";
import { useTimer } from "react-timer-hook";
import { setTimer } from "@/utils/setTimer";
// import notification from "/audio/notification.wav";

const ExperienceDashboard = () => {
  const params = useParams();
  const [isFinished, setIsFinished] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeLoading, setActiveLoading] = useState(false);
  const [participants, setParticipants] = useState<Participants[]>([]);
  const [activeQuestionResponse, setActiveQuestionResponse] =
    useState<Questions>({} as Questions);
  const [sliceIndex, setSliceIndex] = useState(0);
  const [allQuestions, setAllQuestions] = useState<Questions[]>([]);

  const { seconds, minutes, isRunning, resume, restart, pause } = useTimer({
    expiryTimestamp: setTimer(),
    autoStart: false,
    onExpire: () => console.warn("onExpire called"),
  });

  const { data: specificExperience, isLoading } = useQuery({
    queryKey: ["specificExperience", params?.id],
    queryFn: () => getSpecificExperience(params?.id as string),
    retry: 3,
    enabled: !!params?.id,
  });

  const handleSetActiveQuestion = (
    payload: ActiveQuestionPayload,
    questNo: number
  ) => {
    if (specificExperience?.data?.experience_status === "finish")
      return errorNotifier("This experience is finished");
    setActiveQuestion(
      payload,
      setActiveLoading,
      setActiveQuestionResponse,
      restart
    );
    setSliceIndex(questNo);
  };

  useEffect(() => {
    // const audioElement = new Audio("/audio/notification.wav");
    const audioElement = new Audio("/audio/backgroundSound.mp3");
    // audioElement.loop = true;
    audioElement.play();
    const token = getLocalStorageString(ACCESS_TOKEN);
    setLoading(true);
    const payload = {
      experience_id: params?.id,
    };
    getExperienceQuestion(payload, setLoading, setAllQuestions);
    const socketClient = io(socketBaseURL as string, {
      extraHeaders: {
        authorization: `Bearer ${token}`,
      },
    });
    // if (allQuestions.length > 0) {
    socketClient.emit(
      SOCKET_EVENTS.adminGetExperienceParticipants,
      { experience_id: params?.id },
      (response: any) => {
        console.log(
          response,
          `EMIT RESPONSE FOR ${SOCKET_EVENTS.adminGetExperienceParticipants}`
        ); // ok
      }
    );
    // }
    socketClient.on(
      SOCKET_EVENTS.getExperienceParticipantResponse,
      (data: any) => {
        setParticipants(data);
        console.log(
          `PARTICIPANTS MSG RESP FOR ${SOCKET_EVENTS.getExperienceParticipantResponse}`,
          data
        );
        setLoading(false);
      }
    );
    socketClient.on(
      SOCKET_EVENTS.getExperienceParticipantError,
      (error: any) => {
        // setData(data);
        errorNotifier(error?.message);
        console.log(
          `PARTICIPANTS ERROR RESP FOR ${SOCKET_EVENTS.getExperienceParticipantError}`,
          error
        );
        setLoading(false);
      }
    );

    // getParticipantsCurrentScore(payload, socketClient);
    // socketClient.on(SOCKET_EVENTS.joinExperienceResponse, (data: any) => {
    //   console.log("ADMIN JOIN EXP RESP", data);
    // });
    return () => {
      socketClient.removeAllListeners(
        SOCKET_EVENTS.adminGetExperienceParticipants
      );
      socketClient.removeAllListeners(
        SOCKET_EVENTS.getExperienceParticipantResponse
      );
      socketClient.removeAllListeners(
        SOCKET_EVENTS.getExperienceParticipantError
      );
    };
  }, [params?.id, allQuestions.length, participants.length]);

  console.log("PARTICIPANTS", participants, specificExperience);

  // const { data: questions, isLoadingQuestions } = useQuery({
  //   queryKey: ["questions"],
  //   queryFn: getAllQuestions,
  //   retry: 3,
  //   //  enabled: !!params?.id,
  // });

  // const { data: questionById, isLoadingQuestionsById } = useQuery({
  //   queryKey: ["specificQuestion", params?.id],
  //   queryFn: () => getSpecificQuestion(params?.id as string),
  //   retry: 3,
  //   enabled: !!params?.id,
  // });
  // console.log("specificExperience", specificExperience, "QUEST", questions);
  return isLoading ? (
    <FullPageLoader />
  ) : (
    <Box width="100%" className="">
      <PageTitle title={specificExperience?.data?.title} />
      <Text fontSize={["1rem", "1rem", "1.2rem"]} color={COLORS.white}>
        {specificExperience?.data?.description}
      </Text>
      <Flex
        direction={["column", "column", "row"]}
        width="100%"
        justify="space-between"
        my="1rem"
      >
        <CountdownControlCard
          isFinished={isFinished}
          experience_id={specificExperience?.data?.id}
          experience_status={specificExperience?.data?.experience_status}
        />
        <ActiveQuestionsCard
          experience_id={specificExperience?.data?.id}
          setSliceIndex={setSliceIndex}
          sliceIndex={sliceIndex}
          allQuestions={allQuestions}
          setActiveQuestion={handleSetActiveQuestion}
        />
        <GameExperienceCard
          isFinished={isRunning}
          minutes={minutes}
          seconds={seconds}
        />
      </Flex>
      <Flex
        direction={["column", "column", "row"]}
        width="100%"
        justify="space-between"
        my="1rem"
      >
        <GameUrlCard experience={specificExperience?.data} />
        <GameControlExperienceCard>
          <Text fontSize="1.4rem">Viewer Controls</Text>
          <Flex width="100%" wrap="wrap">
            <FormControl
              display="flex"
              flexDirection="column"
              alignItems="center"
              width="25%"
            >
              <Switch id="manually-start" size="lg" />
              <FormLabel
                htmlFor="manually-start"
                mb="0"
                fontSize=".7rem"
                textAlign="center"
              >
                Manually Start Questions
              </FormLabel>
            </FormControl>
            <FormControl
              display="flex"
              flexDirection="column"
              alignItems="center"
              width="25%"
            >
              <Switch id="live-results" size="lg" />
              <FormLabel
                htmlFor="live-results"
                mb="0"
                fontSize=".7rem"
                textAlign="center"
              >
                Show Live Answer Results
              </FormLabel>
            </FormControl>
            <FormControl
              display="flex"
              flexDirection="column"
              alignItems="center"
              width="25%"
            >
              <Switch id="correct-answers" size="lg" />
              <FormLabel
                htmlFor="correct-answers"
                mb="0"
                fontSize=".7rem"
                textAlign="center"
              >
                Show Correct Answers
              </FormLabel>
            </FormControl>
            <FormControl
              display="flex"
              flexDirection="column"
              alignItems="center"
              width="25%"
            >
              <Switch id="question-notes" size="lg" />
              <FormLabel
                htmlFor="question-notes"
                mb="0"
                fontSize=".7rem"
                textAlign="center"
              >
                Show Question Notes
              </FormLabel>
            </FormControl>
          </Flex>
        </GameControlExperienceCard>
        <StatsCard experience={specificExperience?.data} />
      </Flex>
      <QuestionSection
        experience_id={specificExperience?.data?.id}
        // setAllQuestions={setAllQuestions}
        allQuestions={allQuestions}
        setSliceIndex={setSliceIndex}
        sliceIndex={sliceIndex}
        participants={participants}
        setActiveQuestion={handleSetActiveQuestion}
      />
    </Box>
  );
};

export default ExperienceDashboard;

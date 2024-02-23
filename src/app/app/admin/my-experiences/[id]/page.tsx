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
  getParticipantsFinalScore,
  handleAdminControls,
  participantJoinNotification,
  // handleShowCorrectAnswer,
  setActiveQuestion,
  socketListenEvent,
} from "@/services/socket";
import { errorNotifier } from "@/app/providers";
import { getLocalStorageString } from "@/utils/localStorage";
import { ACCESS_TOKEN } from "@/constants/appConstants";
import { io } from "socket.io-client";
import { ActiveQuestionPayload, Questions } from "@/types/questions";
import { Participants } from "@/types/experience";
import { useTimer } from "react-timer-hook";
import { setTimer } from "@/utils/setTimer";
import { getUniqueArray } from "@/utils/uniqueArray";
import { useSocket } from "@/contexts/SocketContext";
import Participant from "@/app/app/participant/page";
// import notification from "/audio/notification.wav";

const ExperienceDashboard = () => {
  const params = useParams();
  const { socketConnection, setRefresh, refresh } = useSocket();
  const [isFinished, setIsFinished] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeLoading, setActiveLoading] = useState(false);
  const [participants, setParticipants] = useState<Participants[]>([]);
  const [activeQuestionResponse, setActiveQuestionResponse] =
    useState<Questions>({} as Questions);
  const [sliceIndex, setSliceIndex] = useState(0);
  const [controlName, setControlName] = useState<string | null>("");
  // const [allQuestions, setAllQuestions] = useState<Questions[]>([]);

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

  const {
    data: allQuestions,
    isLoading: isLoadingQuestions,
    refetch: refetchQuestions,
  } = useQuery<{
    data: Questions[];
  }>({
    queryKey: ["all-questions"],
    queryFn: () => getAllQuestions(params?.id as string),
    // retry: 3,
    enabled: !!params?.id,
  });
  console.log("allQuest----", allQuestions);
  const handleSetActiveQuestion = (
    payload: ActiveQuestionPayload,
    questNo: number
  ) => {
    if (specificExperience?.data?.experience_status === "finish")
      return errorNotifier("This experience is finished");
    if (specificExperience?.data?.experience_status === "initial")
      return errorNotifier("Please start experience to begin");
    setControlName(null);
    setActiveQuestion(
      payload,
      setActiveLoading,
      setActiveQuestionResponse,
      restart,
      socketConnection
    );
    setSliceIndex(questNo);
  };

  const handleViewersControl = (
    switchName: string | null,
    eventName: string,
    reponseName: string,
    errorName: string,
    setData: (arg: Participants[]) => void = (arg) => null
  ) => {
    const payload = { experience_id: specificExperience?.data?.id };
    //  console.log("TARGET", event.target.value===controlName);
    //   if (event.target.value === controlName) {
    //     setIsChecked(true);
    setControlName(switchName === controlName ? null : switchName);
    handleAdminControls(
      eventName,
      reponseName,
      errorName,
      payload,
      socketConnection,
      setData
    );
    // } else {
    //   setIsChecked(false);
    // }
  };

  useEffect(() => {
    // if (!socketConnection?.connected) {
    //   setRefresh(!refresh);
    // }
    // const audioElement = new Audio("/audio/notification.wav");
    const audioElement = new Audio("/audio/backgroundSound.mp3");
    // audioElement.loop = true;
    // audioElement.play();
    const token = getLocalStorageString(ACCESS_TOKEN);
    setLoading(true);
    const payload = {
      experience_id: params?.id,
    };

    // getExperienceQuestion(payload, setLoading, setAllQuestions);
    // const socketClient = io(socketBaseURL as string, {
    //   extraHeaders: {
    //     authorization: `Bearer ${token}`,
    //   },
    // });
    // getParticipantsFinalScore(payload, socketClient);
    // if (allQuestions.length > 0) {
    socketConnection.emit(
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
    socketConnection.on(
      SOCKET_EVENTS.getExperienceParticipantResponse,
      (data: any) => {
        const audioElement = new Audio("/audio/notification1.wav");
        audioElement.play();
        const removeDuplicateData = getUniqueArray(data);
        setParticipants(removeDuplicateData as Participants[]);
        console.log(
          `PARTICIPANTS MSG RESP FOR ${SOCKET_EVENTS.getExperienceParticipantResponse}`,
          removeDuplicateData
        );
        setLoading(false);
      }
    );
    socketConnection.on(
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

    participantJoinNotification(
      socketConnection,
      participants,
      setParticipants
    );

    // getParticipantsCurrentScore(payload, socketConnection);
    // socketConnection.on(SOCKET_EVENTS.joinExperienceResponse, (data: any) => {
    //   console.log("ADMIN JOIN EXP RESP", data);
    // });
    return () => {
      socketConnection.removeAllListeners(SOCKET_EVENTS.adminJoinNotification);
      socketConnection.removeAllListeners(
        SOCKET_EVENTS.adminGetExperienceParticipants
      );
      socketConnection.removeAllListeners(
        SOCKET_EVENTS.getExperienceParticipantResponse
      );
      socketConnection.removeAllListeners(
        SOCKET_EVENTS.getExperienceParticipantError
      );
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    // refresh,
    params?.id,
    participants?.length,
    socketConnection,
    specificExperience?.data?.experience_status,
  ]);

  const participantsWhoAnsweredQuest = participants?.filter(
    (participant) => participant?.is_question_answered
  );

   const activeQuestion = allQuestions?.data?.find(
     (question) => question?.id === specificExperience?.data?.active_questions
   );
  console.log(
    "PARTICIPANTS",
    participants,
    "EXPERIENCES",
    specificExperience,
    "participantsWhoAnsweredQuest",
    participantsWhoAnsweredQuest,
    activeQuestion,
  );

 

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
          allQuestions={allQuestions?.data as Questions[]}
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
            {/* <FormControl
              display="flex"
              flexDirection="column"
              alignItems="center"
              width="25%"
            >
              <Switch
                id="manually-start"
                size="lg"
                checked={controlName === "manual"}
                value="manual"
              />
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
            </FormControl> */}
            <FormControl
              display="flex"
              flexDirection="column"
              alignItems="center"
              width="25%"
            >
              <Switch
                id="correct-answers"
                size="lg"
                // isChecked={isChecked}
                isChecked={controlName === "correct-answer"}
                value="correct-answer"
                onChange={
                  () => {
                    if (
                      specificExperience?.data?.experience_status === "initial"
                    )
                      return errorNotifier("You have not started the game yet");
                    handleViewersControl(
                      "correct-answer",
                      SOCKET_EVENTS.adminShowCorrectAnswer,
                      SOCKET_EVENTS.showCorrectAnswerResponse,
                      SOCKET_EVENTS.showCorrectAnswerError
                    );
                  }
                  // handleShowCorrectAnswer(
                  //   {
                  //     experience_id: specificExperience?.data?.id,
                  //   },
                  //   socketConnection
                  // )
                }
              />
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
              <Switch
                id="question-ranking"
                size="lg"
                // isChecked={isChecked}
                value="question-ranking"
                isChecked={controlName === "question-ranking"}
                onChange={(e) => {
                  // setControlName(
                  //   "question-ranking" === controlName
                  //     ? null
                  //     : "question-ranking"
                  // );
                  handleViewersControl(
                    "question-ranking",
                    SOCKET_EVENTS.adminShowQuestionRank,
                    SOCKET_EVENTS.showQuestionRankResponse,
                    SOCKET_EVENTS.showQuestionRankError,
                    setParticipants
                  );
                }}
              />
              <FormLabel
                htmlFor="question-ranking"
                mb="0"
                fontSize=".7rem"
                textAlign="center"
              >
                Show Question Ranking
              </FormLabel>
            </FormControl>
            <FormControl
              display="flex"
              flexDirection="column"
              alignItems="center"
              width="25%"
            >
              <Switch
                id="leader-board"
                size="lg"
                // isChecked={isChecked}
                isChecked={controlName === "leader-board"}
                value="leader-board"
                onChange={(e) => {
                  // setControlName(
                  //   "leader-board" === controlName ? null : "leader-board"
                  // );
                  handleViewersControl(
                    "leader-board",
                    SOCKET_EVENTS.adminShowFinalRank,
                    SOCKET_EVENTS.showFinalRankResponse,
                    SOCKET_EVENTS.showFinalRankError,
                    setParticipants
                  );
                }}
              />
              <FormLabel
                htmlFor="leader-board"
                mb="0"
                fontSize=".7rem"
                textAlign="center"
              >
                Show Leader Board
              </FormLabel>
            </FormControl>
            <FormControl
              display="flex"
              flexDirection="column"
              alignItems="center"
              width="25%"
            >
              <Switch
                id="show-winner"
                size="lg"
                isChecked={controlName === "show-winner"}
                value="show-winner"
                onChange={(e) => {
                  if (specificExperience?.data?.experience_status !== "finish")
                    return errorNotifier("Please end the game to see winner");
                  handleViewersControl(
                    "show-winner",
                    SOCKET_EVENTS.adminShowFinalRank,
                    SOCKET_EVENTS.showFinalRankResponse,
                    SOCKET_EVENTS.showFinalRankError,
                    setParticipants
                  );
                }}
              />
              <FormLabel
                htmlFor="show-winner"
                mb="0"
                fontSize=".7rem"
                textAlign="center"
              >
                Show Winner
              </FormLabel>
            </FormControl>
          </Flex>
        </GameControlExperienceCard>
        <StatsCard
          totalParticipants={getUniqueArray(participants)?.length as number}
          experience={specificExperience?.data}
          participantsWhoAnsweredQuest={participantsWhoAnsweredQuest?.length}
        />
      </Flex>
      <QuestionSection
        experience_id={specificExperience?.data?.id}
        // setAllQuestions={setAllQuestions}
        allQuestions={(allQuestions?.data as Questions[]) || []}
        setSliceIndex={setSliceIndex}
        sliceIndex={sliceIndex}
        participants={getUniqueArray(participants) as Participants[]}
        setActiveQuestion={handleSetActiveQuestion}
        refetchQuestions={refetchQuestions}
      />
    </Box>
  );
};

export default ExperienceDashboard;

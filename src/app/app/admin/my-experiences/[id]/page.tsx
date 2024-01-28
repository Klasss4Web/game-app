"use client";

import React, { useEffect, useState } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
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
import { SOCKET_EVENTS } from "@/services/socket";
import { errorNotifier } from "@/app/providers";
import { getLocalStorageString } from "@/utils/localStorage";
import { ACCESS_TOKEN } from "@/constants/appConstants";
import { io } from "socket.io-client";
import { Questions } from "@/types/questions";
import { Participants } from "@/types/experience";

const ExperienceDashboard = () => {
  const params = useParams();
  const [isFinished, setIsFinished] = useState(false);
  const [loading, setLoading] = useState(false);
  const [participants, setParticipants] = useState<Participants[]>([]);
  const [sliceIndex, setSliceIndex] = useState(0);
  const [allQuestions, setAllQuestions] = useState<Questions[]>([]);

  const { data: specificExperience, isLoading } = useQuery({
    queryKey: ["specificExperience", params?.id],
    queryFn: () => getSpecificExperience(params?.id as string),
    retry: 3,
    enabled: !!params?.id,
  });

  const selectedQuestion = allQuestions.find(
    (question) => question?.order === sliceIndex + 1
  );

  useEffect(() => {
    const token = getLocalStorageString(ACCESS_TOKEN);
    setLoading(true);
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
    return () => {
      socketClient.removeAllListeners(
        SOCKET_EVENTS.getExperienceParticipantResponse
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
        />
        <ActiveQuestionsCard
          experience_id={specificExperience?.data?.id}
          // selectedQuestion={selectedQuestion as Questions}
          setSliceIndex={setSliceIndex}
          sliceIndex={sliceIndex}
          allQuestions={allQuestions}
          // totalQuestions={allQuestions?.length}
        />
        <GameExperienceCard isFinished={isFinished} />
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
        </GameControlExperienceCard>
        <StatsCard experience={specificExperience?.data} />
      </Flex>
      <QuestionSection
        experience_id={specificExperience?.data?.id}
        setAllQuestions={setAllQuestions}
        allQuestions={allQuestions}
        setSliceIndex={setSliceIndex}
        sliceIndex={sliceIndex}
        participants={participants}
        // selectedQuestion={selectedQuestion}
      />
    </Box>
  );
};

export default ExperienceDashboard;

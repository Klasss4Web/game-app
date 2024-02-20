"use client";

import Circle from "@/components/common/Circle";
import { COLORS } from "@/constants/colors";
import { Box, Flex, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import PlayersRankingTable from "./PlayersRankingTable";
import HeroSectionWrapper from "../../admin/my-experiences/components/HeroSectionWrapper";
import { useSocket } from "@/contexts/SocketContext";
import { SOCKET_EVENTS } from "@/services/socket";
import { Questions } from "@/types/questions";
import { Participants } from "@/types/experience";
import { LoggedInParticipant } from "@/types/user";
import {
  getLocalStorageItem,
  getLocalStorageString,
  setLocalStorageItem,
  setLocalStorageString,
} from "@/utils/localStorage";
import { SAVED_ITEMS } from "@/constants/appConstants";
import { getUniqueArray } from "@/utils/uniqueArray";
import BackgroundVideo from "./BackgroundVideo";

type FinishedComponentProps = {
  participants: Participants[];
  position: string;
  // experience_id: string;
  setResponse: (arg: Questions) => void;
  setPosition: (arg: string) => void;
};

const FinishedComponent = ({
  position,
  participants,
  setPosition,
  setResponse,
}: FinishedComponentProps) => {
  const { socketConnection } = useSocket();

  const loggedInParticipant = getLocalStorageItem<LoggedInParticipant>(
    SAVED_ITEMS.participant
  );
  const savedStatus = getLocalStorageString("game-status");
  const removedDuplicateData = getUniqueArray(participants) || [];
  const sortedDataInDescOrder = removedDuplicateData
    ?.sort((a, b) => b.point - a.point)
    ?.map((sortedData, index) => ({ ...sortedData, index }));
  const getCurrentParticipantScore = sortedDataInDescOrder?.find(
    (participant) => participant?.id === loggedInParticipant?.id
  );
  console.log("getCurrentParticipantScore", getCurrentParticipantScore);
  useEffect(() => {
    // setLoading(false);
    socketConnection.on(SOCKET_EVENTS.experienceReactivity, (data: any) => {
      // setAnswerResponse({} as AnswerQuestionResponse);
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
        // restart(setTimer());
        // setLoading(false);
      } else if (data?.display_type === "status") {
        setResponse(data?.result?.experience_status);
        setLocalStorageString("position", data?.result?.experience_status);
        setLocalStorageString("game-status", data?.result?.experience_status);
      } else {
        setResponse(data?.result);
        setLocalStorageItem("question", data?.result);
      }
    });

    return () => {
      socketConnection.removeAllListeners(SOCKET_EVENTS.experienceReactivity);
    };
  }, [setResponse, setPosition, socketConnection]);
  return (
    <HeroSectionWrapper
      bg={COLORS.formGray}
      align="center"
      height={position ? "75vh" : "100vh"}
      position="relative"
      overflowY="scroll"
    >
      {position === "finish" && (
        <Text fontSize={["1.6rem", "1.6rem", "1rem"]}>Game Finished.</Text>
      )}
      {position !== "finish" && (
        <Circle
          width="8rem"
          height="8rem"
          bg={COLORS.secondary}
          position="absolute"
          top={
            position !== "finish"
              ? ["-4%", "-4%", "-7%", "-7%"]
              : ["2%", "3%", "0"]
          }
          // zIndex={10}
        >
          <Text color={COLORS.white} mt={["1rem", "0", "1rem"]}>
            {position === "show_final_rank"
              ? sortedDataInDescOrder?.[0]?.total_point
              : getCurrentParticipantScore?.point}
          </Text>
          <Text color={COLORS.white}>Points</Text>
        </Circle>
      )}
      {position === "finish" && (
        <Text fontSize={["1.2rem"]}>
          The game has ended. Thank you for answering
        </Text>
      )}
      {position !== "finish" && (
        <Flex
          width="100%"
          justify="space-between"
          align="center"
          padding="1rem 0"
          color={COLORS.white}
          bg={COLORS.secondary}
          borderRadius=".5rem"
        >
          <Box width="30%">
            <Text>
              {(getCurrentParticipantScore?.index as number) + 1 || "--"}
            </Text>
            <Text>Your Rank</Text>
          </Box>
          <Box
            width="36%"
            color={COLORS.red}
            position="relative"
            zIndex={10000}
            mt={["1.5rem"]}
          >
            {position === "show_question_rank" ? (
              <>
                <Text>Next question coming up...</Text>
              </>
            ) : (
              <>
                <Text>{sortedDataInDescOrder?.[0]?.username}</Text>
                <Text>Top Genius</Text>
              </>
            )}
          </Box>
          <Box width="30%">
            <Text>{sortedDataInDescOrder?.length}</Text>
            <Text>Participants</Text>
          </Box>
        </Flex>
      )}
      {(position === "finish" || savedStatus === "finish") && (
        <BackgroundVideo position={position} />
      )}

      {savedStatus === "finish" && position !== "finish" && (
        <Flex
          direction="column"
          width="100%"
          justify="center"
          padding=".9rem"
          color={COLORS.white}
          bg={COLORS.blue}
          borderRadius=".5rem"
        >
          <Text fontSize={["1.6rem"]}>
            Current Question Leaders
            {/* {position === "show_final_rank"
              ? "Player Rankings"
              : "Current Question Leaders"} */}
          </Text>
          <PlayersRankingTable
            data={sortedDataInDescOrder}
            position={position}
          />
        </Flex>
      )}
      {savedStatus !== "finish" && position !== "finish" && (
        <Flex
          direction="column"
          width="100%"
          justify="center"
          padding=".9rem"
          color={COLORS.white}
          bg={COLORS.blue}
          borderRadius=".5rem"
        >
          <Text fontSize={["1.6rem"]}>
            {position === "show_final_rank"
              ? "Player Rankings"
              : "Current Question Leaders"}
          </Text>
          <PlayersRankingTable
            data={sortedDataInDescOrder}
            position={position}
          />
        </Flex>
      )}
    </HeroSectionWrapper>
  );
};

export default FinishedComponent;

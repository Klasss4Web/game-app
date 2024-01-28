"use client";

import { Box, Flex, Heading, Image, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { COLORS } from "@/constants/colors";
import FinishedComponent from "./components/FinishedComponent";
import ParticipantLogin from "./components/ParticipantLogin";
import WaitingToStart from "./components/WaitingToStart";
import QuestionBoard from "./components/QuestionBoard";
import { SOCKET_EVENTS, socketClient } from "@/services/socket";
import { useSearchParams } from "next/navigation";
import { SAVED_ITEMS } from "@/constants/appConstants";
import { getLocalStorageItem } from "@/utils/localStorage";
import { LoggedInParticipant } from "@/types/user";
import { errorNotifier } from "@/app/providers";
import { FullPageLoader } from "@/components/common/FullPageLoader";
import useIsMounted from "@/hooks/useIsMounted";
import { Questions } from "@/types/questions";

const Participant = () => {
  const params = useSearchParams();
  const [userName, setUserName] = useState("");
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const [position, setPosition] = useState<string>("login");

  const experienceId = params.get("id");
  const participant = getLocalStorageItem<LoggedInParticipant>(
    SAVED_ITEMS.participant
  );
  const [response, setResponse] = useState<Questions>({} as Questions);
  const [loading, setLoading] = useState(true);
  const isMounted = useIsMounted();

  // useEffect(() => {
  //   setLoading(false);
  //   socketClient.on(SOCKET_EVENTS.experienceReactivity, (data: any) => {
  //     setResponse(data);
  //     console.log(
  //       `EXP MSG RESP FOR ${SOCKET_EVENTS.experienceReactivity}`,
  //       data
  //     );
  //     setLoading(false);
  //   });

  //   return () => {
  //     socketClient.removeAllListeners(SOCKET_EVENTS.experienceReactivity);
  //   };
  // }, []);

  console.log("START RESPONSE", response, "POSITION", position);

  return !isMounted ? (
    <FullPageLoader />
  ) : (
    <Flex direction="column" justify="center" align="center" width="100%">
      <Box position="absolute" right="3%" top="2%">
        <Text color={COLORS.white} fontSize="1.6rem">
          {participant?.username}
        </Text>
      </Box>
      <Flex direction="column" width="50%" justify="center" align="center">
        <Image
          src="/images/loginBg.jpg"
          width={150}
          height={150}
          borderRadius="50%"
          alt=""
        />
        <Heading color={COLORS.white} fontWeight="normal">
          Genius Game
        </Heading>
        {(position === "waiting" || position === "active") && (
          <WaitingToStart
            setPosition={setPosition}
            setResponse={setResponse}
            setLoading={setLoading}
          />
        )}
        {position === "login" && (
          <ParticipantLogin
            setPosition={setPosition}
            experience_id={experienceId as string}
          />
        )}
        {/* FINISHED GAME */}
        {isFinished && <FinishedComponent />}
        {(position === "started" || position.includes("question")) && (
          <QuestionBoard
            questions={response as Questions}
            experience_id={experienceId as string}
            setResponse={setResponse}
          />
        )}
      </Flex>
    </Flex>
  );
};

export default Participant;

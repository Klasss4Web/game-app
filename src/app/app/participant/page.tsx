"use client";

import { Avatar, Box, Flex, Heading, Image, Text } from "@chakra-ui/react";
import React, { useCallback, useEffect, useState } from "react";
import { COLORS } from "@/constants/colors";
import FinishedComponent from "./components/FinishedComponent";
import ParticipantLogin from "./components/ParticipantLogin";
import WaitingToStart from "./components/WaitingToStart";
import QuestionBoard from "./components/QuestionBoard";
import { SOCKET_EVENTS } from "@/services/socket";
import { useSearchParams } from "next/navigation";
import { SAVED_ITEMS } from "@/constants/appConstants";
import {
  getLocalStorageItem,
  getLocalStorageString,
  removeLocalStorageItem,
} from "@/utils/localStorage";
import { LoggedInParticipant } from "@/types/user";
import { errorNotifier } from "@/app/providers";
import { FullPageLoader } from "@/components/common/FullPageLoader";
import useIsMounted from "@/hooks/useIsMounted";
import { Questions } from "@/types/questions";
import { useSocket } from "@/contexts/SocketContext";
import { Participants } from "@/types/experience";
import { BiVolumeMute } from "react-icons/bi";
import { GoUnmute } from "react-icons/go";

const Participant = () => {
  const params = useSearchParams();
  // const [userName, setUserName] = useState("");
  // const [isFinished, setIsFinished] = useState<boolean>(false);

  const [position, setPosition] = useState<string>("login");
  const [muteAudio, setMuteAudio] = useState(false);
  const [countDown, setCountDown] = useState(10);
  const experienceId = params.get("id");
  const savedStatus = getLocalStorageString("game-status");
  const participant = getLocalStorageItem<LoggedInParticipant>(
    SAVED_ITEMS.participant
  );
  const [rejoinData, setRejoinData] = useState({});
  const [response, setResponse] = useState<
    Questions | Questions[] | Participants[]
  >({} as Questions);
  const [loading, setLoading] = useState(true);
  const isMounted = useIsMounted();
  const { socketConnection, setRefresh, refresh } = useSocket();

  const reJoinExperience = useCallback(
    (
      payload: any,
      setData: (arg: any) => void,
      setPosition: (arg: string) => void,
      setLoading: (arg: boolean) => void
    ) => {
      const savedPosition = getLocalStorageString("position");
      const saveQuestions = getLocalStorageItem("question");

      if (position) {
        setPosition(savedPosition as string);
        setResponse((saveQuestions as Questions[]) || []);
      } else {
        setPosition("waiting");
        // setPosition("status");
      }
      if (socketConnection && typeof socketConnection.emit === "function") {
        console.log("socketConnection", socketConnection);
        socketConnection.emit(
          SOCKET_EVENTS.rejoinExperience,
          payload,
          (response: any) => {
            console.log(
              response,
              `EMIT RESPONSE FOR ${SOCKET_EVENTS.rejoinExperience}`
            );
          }
        );

        socketConnection.on(
          SOCKET_EVENTS.rejoinExperienceResponse,
          (data: any) => {
            setData(data);
            // setPosition("waiting");

            console.log("REJOIN EXP RESP", data);
            // socketConnection.emit(
            //   SOCKET_EVENTS.adminGetExperienceParticipants,
            //   { experience_id: participant?.experience_id },
            //   (response: any) => {
            //     console.log(
            //       response,
            //       `EMIT RESPONSE FOR ${SOCKET_EVENTS.adminGetExperienceParticipants}`
            //     ); // ok
            //   }
            // );
          }
        );

        socketConnection.on(
          SOCKET_EVENTS.rejoinExperienceError,
          (error: any) => {
            console.log("REJOIN EXP ERROR RESP", error);
            errorNotifier(error?.message);
            setLoading(false);
          }
        );
      } else {
        console.warn("Socket connection not ready yet.");
      }
    },
    [socketConnection]
  );
  console.log("PLAY", muteAudio);
  useEffect(() => {
    // if (!socketConnection?.connected) {
    //   setRefresh(!refresh);
    // }
    const audioElement = new Audio("/audio/backgroundSound.mp3");

    if (!muteAudio) {
      audioElement.play();
      audioElement.loop = true;
    } else {
      audioElement.pause();
    }

    if (participant?.experience_id === experienceId) {
      setCountDown(0);
      const payload = {
        nonce_id: participant?.nonce_id,
        experience_id: participant?.experience_id,
      };
      console.log("REJOINED");
      reJoinExperience(payload, setRejoinData, setPosition, setLoading);
    } else {
      removeLocalStorageItem("participant");
    }
    return () => {
      audioElement.pause();
    };
  }, [
    muteAudio,
    participant?.experience_id,
    participant?.nonce_id,
    experienceId,
    reJoinExperience,
    socketConnection?.connected,
    // position,
  ]);

  console.log(
    "START RESPONSE",
    response,
    "POSITION",
    position,
    rejoinData,
    socketConnection?.connected
  );

  const responseAsParticipants = response as Participants[];
  return !isMounted ? (
    <FullPageLoader />
  ) : (
    <Flex
      direction="column"
      justify="center"
      align="center"
      width="100%"
      // height="90vh"
      // overflowY="scroll"
      position="relative"
    >
      <Box position="absolute" right="3%" top="1%" textAlign="right">
        <Text color={COLORS.white} fontSize={["1rem", "1rem", "1.6rem"]}>
          {participant?.username}
        </Text>
        <Text color={socketConnection?.connected ? COLORS.success : COLORS.red}>
          {socketConnection?.connected ? "Connected" : "Not Connected"}
        </Text>
      </Box>
      <Flex
        direction="column"
        width={position ? ["100%", "100%", "50%"] : []}
        justify="center"
        align="center"
      >
        {/* {position && ( */}
        <>
          <Image
            src={"/images/loginBg.jpg"}
            width={["80px", "80px", 120]}
            height={["80px", "80px", 120]}
            borderRadius="50%"
            alt="Genius logo"
          />
          {savedStatus === "finish" && position === "show_final_rank" && (
            <Heading color={COLORS.success}>
              {responseAsParticipants?.[0]?.username as string}
            </Heading>
          )}
          <Heading color={COLORS.white} fontWeight="normal">
            {savedStatus === "finish" && position === "show_final_rank"
              ? "Winner!!!"
              : "Genius Game"}
          </Heading>
        </>
        {/* )} */}
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
        {(position === "final_score_board" ||
          position === "show_question_rank" ||
          position === "show_final_rank" ||
          position === "finish") && (
          <FinishedComponent
            position={position}
            participants={response as Participants[]}
            setResponse={setResponse}
            setPosition={setPosition}
          />
        )}
        {(position === "started" ||
          position === "show_correct_answer" ||
          position === "question") && (
          <QuestionBoard
            position={position}
            questions={response as Questions}
            experience_id={experienceId as string}
            setResponse={setResponse}
            setPosition={setPosition}
            setCountDown={setCountDown}
            countDown={countDown}
          />
        )}
      </Flex>
      <div
        style={{
          position: "fixed",
          top: "3%",
          left: "3%",
          background: "inherit",
        }}
      >
        {!muteAudio ? (
          <GoUnmute
            size={26}
            color={COLORS.red}
            cursor="pointer"
            onClick={() => setMuteAudio(!muteAudio)}
          />
        ) : (
          <BiVolumeMute
            size={26}
            color={COLORS.red}
            cursor="pointer"
            onClick={() => setMuteAudio(!muteAudio)}
          />
        )}
        {/* <button onClick={() => setMuteAudio(!muteAudio)}>
          {muteAudio ? "Unmute" : "Mute"}
        </button> */}
        {/* <audio controls style={{ background: "inherit" }}>
          <source src="/audio/backgroundSound.mp3" type="audio/mp3" />
        </audio> */}
      </div>
    </Flex>
  );
};

export default Participant;

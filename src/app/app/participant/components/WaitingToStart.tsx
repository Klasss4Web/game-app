"use client";

import { COLORS } from "@/constants/colors";
import { Text } from "@chakra-ui/react";
import { FcAlarmClock } from "react-icons/fc";
import useVibration from "../hooks/useVibration";
import { useEffect, useState } from "react";
import HeroSectionWrapper from "../../admin/my-experiences/components/HeroSectionWrapper";
import { SOCKET_EVENTS, socketClient } from "@/services/socket";
import { errorNotifier } from "@/app/providers";
import { Questions } from "@/types/questions";
import { useSocket } from "@/contexts/SocketContext";

type WaitingToStartProps = {
  setPosition: (arg: string) => void;
  setResponse: (arg: Questions) => void;
  setLoading: (arg: boolean) => void;
};

const WaitingToStart = ({
  setPosition,
  setResponse,
  setLoading,
}: WaitingToStartProps) => {
  const { isVibrating } = useVibration();
  // const [response, setResponse] = useState({});

  const { socketConnection } = useSocket();
  console.log("socketConnection", socketConnection);

  useEffect(() => {
    setLoading(false);
    socketConnection.on(SOCKET_EVENTS.experienceReactivity, (data: any) => {
      setResponse(data?.result?.question);
      if (data?.display_type === "status") {
        setPosition(data?.result?.experience_status);
      } else {
        setPosition(data?.display_type);
      }
      console.log(
        `EXP MSG RESP FOR ${SOCKET_EVENTS.experienceReactivity}`,
        data
      );
      setLoading(false);
    });
    socketConnection.on(SOCKET_EVENTS.experienceReactivity, (data: any) => {
      console.log(`EXP data FOR ${SOCKET_EVENTS.experienceReactivity}`, data);
      const audioElement = new Audio("/audio/notification1.wav");
      audioElement.play();
    });

    return () => {
      socketConnection.removeAllListeners(SOCKET_EVENTS.experienceReactivity);
      // socketClient.removeAllListeners("attachment");
    };
  }, [setResponse, setPosition, setLoading, socketConnection]);

  // console.log("START RESPONSE WAITING", response);

  return (
    <HeroSectionWrapper bg={COLORS.formGray}>
      <Text fontSize="1.2rem">Game Will Begin Shortly</Text>
      <FcAlarmClock
        size={80}
        className={isVibrating ? "vibrating-image" : ""}
      />
      <Text fontSize="1rem">
        The trivia game has not started yet. Once activated, this area will
        allow you to play!
      </Text>
    </HeroSectionWrapper>
  );
};

export default WaitingToStart;

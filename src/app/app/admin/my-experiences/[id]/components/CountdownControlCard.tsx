import React, { useState } from "react";
import GameControlExperienceCard from "./ExperienceControlCard";
import { Flex, Spinner, Text } from "@chakra-ui/react";
import { COLORS } from "@/constants/colors";
import { TfiReload } from "react-icons/tfi";
import { LuClock } from "react-icons/lu";
import CustomModal from "@/components/common/CustomModal";
import {
  SOCKET_EVENTS,
  endExperience,
  getMessageResponse,
  sendMessage,
} from "@/services/socket";
import ControlModalContent from "./ControlModalContent";
import { FaRegCirclePlay, FaRegCircleStop } from "react-icons/fa6";
import { errorNotifier } from "@/app/providers";

type CountdownControlCardProps = {
  isFinished: boolean;
  experience_id: string;
  experience_status: string;
};

const CountdownControlCard = ({
  isFinished,
  experience_id,
  experience_status,
}: CountdownControlCardProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [startResponse, setStartResponse] = useState({});
  const startExperience = (onClose?: () => void) => {
    if (experience_status === "finish")
      return errorNotifier("This experience is closed");
    setLoading(true);
    const payload = {
      experience_id,
    };
    experience_status === "active"
      ? endExperience(payload, setLoading, setStartResponse, onClose)
      : sendMessage(
          SOCKET_EVENTS.adminStartExperience,
          payload,
          setLoading,
          setStartResponse,
          onClose
        );
  };

  console.log(startResponse, experience_id);
  return (
    <GameControlExperienceCard>
      <Text fontSize="1.4rem">Countdown Control</Text>
      <Flex
        justify="center"
        align="center"
        bg={COLORS.secondary}
        width="4rem"
        height="4rem"
        borderRadius="50%"
      >
        {experience_status === "finish" ? (
          <>
            <TfiReload size={40} cursor="pointer" />
            <Text>This experience has ended</Text>
          </>
        ) : (
          <CustomModal
            div
            btnTitle={<LuClock size={40} cursor="pointer" />}
            addCloseModalBtn
          >
            <ControlModalContent
              loading={loading}
              startExperience={(onClose?: () => void) =>
                startExperience(onClose)
              }
              text={
                experience_status === "active"
                  ? "Click the end button to end the game"
                  : "Click the start button to begin the game"
              }
              ICON={
                experience_status === "active"
                  ? FaRegCircleStop
                  : FaRegCirclePlay
              }
              helperText={experience_status === "active" ? "End" : "Start"}
            />
          </CustomModal>
        )}
      </Flex>
    </GameControlExperienceCard>
  );
};

export default CountdownControlCard;

import React, { useState } from "react";
import GameControlExperienceCard from "./ExperienceControlCard";
import { Flex, Spinner, Text } from "@chakra-ui/react";
import { COLORS } from "@/constants/colors";
import { TfiReload } from "react-icons/tfi";
import { LuClock } from "react-icons/lu";
import CustomModal from "@/components/common/CustomModal";
import {
  SOCKET_EVENTS,
  getMessageResponse,
  sendMessage,
} from "@/services/socket";
import ControlModalContent from "./ControlModalContent";

type CountdownControlCardProps = {
  isFinished: boolean;
  experience_id: string;
};

const CountdownControlCard = ({
  isFinished,
  experience_id,
}: CountdownControlCardProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [startResponse, setStartResponse] = useState({});
  const startExperience = () => {
    setLoading(true);
    const payload = {
      experience_id,
    };
    sendMessage(
      SOCKET_EVENTS.adminStartExperience,
      payload,
      setLoading,
      setStartResponse
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
        {isFinished ? (
          <TfiReload size={40} cursor="pointer" />
        ) : (
          <CustomModal
            div
            btnTitle={<LuClock size={40} cursor="pointer" />}
            addCloseModalBtn
          >
            <ControlModalContent
              loading={loading}
              startExperience={startExperience}
            />
          </CustomModal>
        )}
      </Flex>
    </GameControlExperienceCard>
  );
};

export default CountdownControlCard;

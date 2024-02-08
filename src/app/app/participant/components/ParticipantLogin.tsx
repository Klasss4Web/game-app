"use client";

import React, { useEffect, useState } from "react";
import { CustomBtn } from "@/components/common/CustomBtn";
import { Formcontrol } from "@/components/common/FormControl";
import { COLORS } from "@/constants/colors";
import { Text } from "@chakra-ui/react";
import HeroSectionWrapper from "../../admin/my-experiences/components/HeroSectionWrapper";
import { SOCKET_EVENTS, joinExperience } from "@/services/socket";

type ParticipantLogin = {
  setPosition: (arg: string) => void;
  experience_id: string;
};

const ParticipantLogin = ({ setPosition, experience_id }: ParticipantLogin) => {
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [experienceResponse, setExperienceResponse] = useState({});

  const handleJoinExperience = () => {
    setLoading(true);
    const payload = {
      username: userName,
      // experience_id: "bd3dcb95-220a-486d-babd-1e457075db80",
      experience_id,
    };
    console.log("CLICKED");
    joinExperience(
      SOCKET_EVENTS.joinExperience,
      payload,
      setExperienceResponse,
      setPosition,
      setLoading
    );
    // setLoading(false);
  };

  

  console.log("RESP", experienceResponse);
  return (
    <>
      <HeroSectionWrapper bg={COLORS.formGray}>
        <Text fontSize="1rem">Enter a user name for the leaderboard.</Text>
        <Formcontrol
          type="text"
          mb=".3rem"
          name="userName"
          height={["5rem"]}
          placeholder="Enter your user name, e.g Doe"
          bg={COLORS.white}
          borderColor={COLORS.secondary}
          textAlign="center"
          fontSize={["1.8rem", "2rem", "3rem"]}
          value={userName}
          handleChange={(e) => setUserName(e.target.value)}
        />
        <CustomBtn
          text={loading ? "LOADING..." : "JOIN"}
          h={["5rem"]}
          bg={COLORS.secondary}
          loading={loading}
          // handleSubmit={() => setPosition("waiting")}
          handleSubmit={handleJoinExperience}
        />
      </HeroSectionWrapper>
      <Text
        textAlign="center"
        color={COLORS.formGray}
        mt=".5rem"
        fontSize=".8rem"
      >
        By signing in you accept our Privacy Policy, Terms & Conditions, & Data
        Compliance Policy.
      </Text>
    </>
  );
};

export default ParticipantLogin;

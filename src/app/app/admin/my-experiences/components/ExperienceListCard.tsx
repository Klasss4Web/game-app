"use client";

import React from "react";
import { Box, Flex, Spinner, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

import { FaRegCopy } from "react-icons/fa6";
import { MdDeleteOutline } from "react-icons/md";

import { COLORS } from "@/constants/colors";
import { handleCopyLink } from "@/utils/copyToClipboard";
import Circle from "@/components/common/Circle";
import { ExperienceData } from "@/types/experience";
import { formatDate } from "@/utils/dateFormat";
import { ROUTES } from "@/constants/pageRoutes";
import { useMutation } from "@tanstack/react-query";
import { deleteExperience } from "../service";
import CautionAlertDialog from "@/components/common/CautionAlertDialog";

type ExperienceListCardProps = {
  index: number;
  experience: ExperienceData;
};

const ExperienceListCard = ({ experience, index }: ExperienceListCardProps) => {
  const router = useRouter();

  const handleDelete = () => {
    mutate();
  };

  const { mutate, isLoading } = useMutation({
    mutationFn: () => deleteExperience(experience?.id as string),
    mutationKey: ["experiences"],
    onSuccess: (data) => {
      console.log("data", data);
      // router.push(ROUTES.my_experience);
      // onClose && onClose();
    },
    onError: (error: any) => {
      console.error("Mutation error", error);
    },
  });
  return (
    <Flex
      width="100%"
      justify="space-between"
      padding=".5rem 1rem"
      borderRadius=".5rem"
      cursor="pointer"
      mt="1rem"
      border={`.1rem solid ${COLORS.orange}`}
    >
      <Flex
        align="center"
        width="75%"
        color={COLORS.white}
        gap=".6rem"
        onClick={() => router.push(`${ROUTES.my_experience}/${experience?.id}`)}
      >
        <Text fontSize="1.6rem">{index + 1}</Text>
        <Box>
          <Text lineHeight={".9"}>{experience?.title}</Text>
          <Text fontWeight="light">
            Created {formatDate(experience?.created_at)}
          </Text>
        </Box>
      </Flex>
      <Flex
        width="25%"
        align="center"
        gap=".5rem"
        color={COLORS.white}
        justify="space-between"
      >
        <Text>{experience?.experience_type}</Text>
        <Text>{experience?.lookup_code}</Text>
        <Circle bg={COLORS.blue} width="2.5rem" height="2.5rem">
          <FaRegCopy
            cursor="pointer"
            size={16}
            onClick={() =>
              handleCopyLink(
                `${process.env.NEXT_PUBLIC_FRONTEND_URL}${ROUTES.participant}?id=${experience?.id}`
              )
            }
          />
        </Circle>
        {isLoading ? (
          <Spinner color={COLORS.red} />
        ) : (
          <CautionAlertDialog
            ICON={
              <Circle bg={COLORS.red} width="2.5rem" height="2.5rem">
                <MdDeleteOutline cursor="pointer" size={16} />
              </Circle>
            }
            agree="Yes"
            toolTipLabel="Delete Experience"
            cautionTitle="Are you sure you want to delete this experience?"
            onContinue={handleDelete}
          />
        )}
      </Flex>
    </Flex>
  );
};

export default ExperienceListCard;

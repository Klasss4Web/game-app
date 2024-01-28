"use client";

import React, { useState } from "react";
import { CustomBtn } from "@/components/common/CustomBtn";
import { Formcontrol } from "@/components/common/FormControl";
import { COLORS } from "@/constants/colors";
import { Box, Divider, Flex, Text } from "@chakra-ui/react";

import SetQuestionHeaderSection from "./SetQuestionHeaderSection";
import useHandleChange from "@/hooks/useHandleChange";
import { errorNotifier } from "@/app/providers";
import { useMutation } from "@tanstack/react-query";
import { createExperience } from "../service";
import { CreateExpPayload } from "@/types/experience";
import { ROUTES } from "@/constants/pageRoutes";
import { useRouter } from "next/navigation";

type CreateExperienceModalContentProps = {
  onClose?: () => void;
};

const CreateExperienceModalContent = ({
  onClose,
}: CreateExperienceModalContentProps) => {
  const router = useRouter();
  const [formValues, setFormValues] = useState<CreateExpPayload>({
    title: "",
    description: "",
  });

  const { handleChange } = useHandleChange(setFormValues);

  const handleCreate = () => {
    if (!formValues?.title || !formValues?.description)
      return errorNotifier("You have not entered your name and description");
    const payload = {
      ...formValues,
    };
    mutate(payload);
  };

  const { mutate, isLoading } = useMutation({
    mutationFn: createExperience,
    onSuccess: (data) => {
      console.log("data", data);
      router.push(ROUTES.my_experience);
      onClose && onClose();
    },
    onError: (error: any) => {
      console.error("Mutation error", error);
    },
  });

  console.log("FORMVALUES", formValues);
  return (
    <>
      <SetQuestionHeaderSection />
      <Flex width="100%" justify="space-between" px="1rem" my="2rem">
        <Box width={["18%"]} bg={COLORS.blue}></Box>
        <Box width={["80%"]}>
          <Text>Now...Its time to give your game a suitable name</Text>
          <Formcontrol
            type="text"
            name="title"
            label="Name"
            placeholder="Enter any name of your choice"
            value={formValues?.title}
            handleChange={handleChange}
          />
          <Formcontrol
            type="text"
            name="description"
            label="Description"
            placeholder="Enter description"
            value={formValues?.description}
            handleChange={handleChange}
          />
        </Box>
      </Flex>
      <Divider />
      <Flex
        width="100%"
        justify={["center", "center", "end"]}
        my=".6rem"
        padding="1rem"
      >
        <CustomBtn
          text="Create"
          bg={COLORS.secondary}
          color={COLORS.white}
          w={["100%", "100%", "14rem"]}
          loading={isLoading}
          handleSubmit={handleCreate}
        />
      </Flex>
    </>
  );
};

export default CreateExperienceModalContent;

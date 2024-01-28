"use client";

import React, { useState } from "react";
import {
  Box,
  Divider,
  Flex,
  Image,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from "@chakra-ui/react";

import { FaArrowRight, FaSquarePlus } from "react-icons/fa6";
import { RiMenuAddFill } from "react-icons/ri";
import { FaCheck } from "react-icons/fa";

import HashTagBox from "./HashTagBox";
import SetQuestionHeaderSection from "../../components/SetQuestionHeaderSection";
import CustomModal from "@/components/common/CustomModal";
import { COLORS } from "@/constants/colors";
import { CustomBtn } from "@/components/common/CustomBtn";
import { Formcontrol } from "@/components/common/FormControl";
import { useRouter } from "next/navigation";

type GameDescriptionCardProps = {
  title: string;
  description: string;
  publishedDate: string;
};

const GameDescriptionCard = ({
  title,
  publishedDate,
  description,
}: GameDescriptionCardProps) => {
  const router = useRouter();
  const [showOptions, setShowOptions] = useState(false);
  const [id, setId] = useState("");
  const [tabIndex, setTabIndex] = useState(0);
  const [radioValue, setRadioValue] = React.useState("host");

  const handleShowOptions = (questionId: string) => {
    console.log("ID", questionId);
    setShowOptions(!showOptions);
  };

  console.log("ID", id);

  const questions = [
    {
      id: "1",
      question: "What digital assistant did Amazon first introduce in 2014?",
      answerType: "MULTIPLE CHOICE",
      options: [
        {
          id: "1",
          optionTag: "A",
          name: "Alexa",
          isCorrect: true,
        },
        {
          id: "2",
          optionTag: "B",
          name: "Alexxa",
          isCorrect: false,
        },
        {
          id: "3",
          optionTag: "C",
          name: "Alexxia",
          isCorrect: false,
        },
      ],
    },
    {
      id: "2",
      question: "What digital assistant did Amazon first introduce in 2014?",
      answerType: "MULTIPLE CHOICE",
      options: [
        {
          id: "1",
          optionTag: "A",
          name: "Alexa",
          isCorrect: true,
        },
        {
          id: "2",
          optionTag: "B",
          name: "Alexxa",
          isCorrect: false,
        },
        {
          id: "3",
          optionTag: "C",
          name: "Alexxia",
          isCorrect: false,
        },
      ],
    },
    {
      id: "3",
      question: "What digital assistant did Amazon first introduce in 2014?",
      answerType: "MULTIPLE CHOICE",
      options: [
        {
          id: "1",
          optionTag: "A",
          name: "Alexa",
          isCorrect: true,
        },
        {
          id: "2",
          optionTag: "B",
          name: "Alexxa",
          isCorrect: false,
        },
        {
          id: "3",
          optionTag: "C",
          name: "Alexxia",
          isCorrect: false,
        },
      ],
    },
  ];
  return (
    <Flex
      width="100%"
      borderRadius=".5rem"
      p=".6rem"
      gap=".6rem"
      bg={COLORS.bgGrey}
      mb="1rem"
    >
      <Box width="12%">
        <Image
          src="/images/loginBg.jpg"
          width="4.5rem"
          height="4.5rem"
          borderRadius="50%"
          alt="image representing game type"
        />
      </Box>
      <Box width="86%" color={COLORS.secondary}>
        <Flex width="100%" justify="space-between">
          <Text fontSize="1.2rem" fontWeight="semibold">
            {title}
          </Text>
          <Text fontSize="1rem">{publishedDate}</Text>
        </Flex>
        <Text my=".6rem">{description}</Text>
        <Flex width="100%" justify="space-between" align="center">
          <Text cursor="pointer">#TRENDING</Text>

          <CustomModal
            div
            bg={COLORS.bgGrey}
            addCloseModalBtn
            size="4xl"
            btnTitle={
              <Flex
                width="3rem"
                height="3rem"
                justify="center"
                align="center"
                bg={COLORS.secondary}
                borderRadius="50%"
                cursor="pointer"
              >
                <FaArrowRight color={COLORS.white} size={26} />
              </Flex>
            }
          >
            <SetQuestionHeaderSection />
            {tabIndex === 0 && (
              <Flex width="100%" bg={COLORS.bgGrey} padding={"1rem"}>
                <Box width="20%"></Box>
                <Box
                  width="80%"
                  padding="1rem"
                  bg={COLORS.plainGray}
                  borderRadius=".4rem"
                >
                  {questions?.map((question) => (
                    <Box
                      bg={COLORS.bgGrey}
                      padding="1rem"
                      position="relative"
                      key={question?.id}
                      mb=".7rem"
                    >
                      <Text mb=".5rem">{question?.question}</Text>
                      <HashTagBox
                        bg={COLORS.blue}
                        color={COLORS.white}
                        hashTagText={question?.answerType}
                      />
                      <Flex width="100%" justify="flex-end">
                        <Flex gap=".5rem">
                          <RiMenuAddFill
                            size={26}
                            color={COLORS.orange}
                            cursor="pointer"
                            onClick={() => {
                              setId(question?.id);
                              handleShowOptions(question?.id);
                            }}
                          />
                          <FaSquarePlus
                            size={26}
                            cursor="pointer"
                            color={COLORS.headerGreen}
                          />
                        </Flex>
                      </Flex>

                      <Box
                        display={
                          question?.id === id && showOptions ? "block" : "none"
                        }
                        bg={COLORS.plainGray}
                        padding="1rem"
                        borderBottomRadius=".6rem"
                      >
                        {question?.options?.map((option) => (
                          <React.Fragment key={option?.id}>
                            <Flex
                              width="100%"
                              justify="space-between"
                              align="center"
                            >
                              <Flex align="center" gap=".4rem">
                                <Flex
                                  align="center"
                                  justify="center"
                                  height="1.5rem"
                                  width="1.5rem"
                                  borderRadius="50%"
                                  bg={COLORS.formGray}
                                >
                                  <Text
                                    color={
                                      option?.isCorrect
                                        ? COLORS.orange
                                        : COLORS.u_black
                                    }
                                  >
                                    {option?.optionTag}
                                  </Text>
                                </Flex>
                                <Text>{option?.name}</Text>
                              </Flex>
                              {option?.isCorrect && (
                                <FaCheck size={24} color={COLORS.headerGreen} />
                              )}
                            </Flex>
                            <Divider my=".2rem" borderColor={COLORS.blue} />
                          </React.Fragment>
                        ))}
                      </Box>
                    </Box>
                  ))}
                  <Flex width="100%" justify="end" my=".6rem">
                    <CustomBtn
                      text="Add All"
                      bg={COLORS.secondary}
                      color={COLORS.white}
                      w={["48%", "48%", "14rem"]}
                      loading={false}
                      handleSubmit={() => null}
                    />
                  </Flex>
                </Box>
              </Flex>
            )}
            {tabIndex === 1 && (
              <Flex width="100%" justify="space-between" px="1rem" my="2rem">
                <Box width={["20%"]}></Box>
                <Box width={["80%"]}>
                  <Text>Now...Its time to create the rules for the game</Text>
                  <RadioGroup onChange={setRadioValue} value={radioValue}>
                    <Stack direction="column">
                      <Radio value="host">Host Controlled</Radio>
                      <Radio value="crowd">Crowd Controlled</Radio>
                      <Radio value="automatic">Auto Controlled</Radio>
                    </Stack>
                  </RadioGroup>
                </Box>
              </Flex>
            )}
            {tabIndex === 2 && (
              <Flex width="100%" justify="space-between" px="1rem" my="2rem">
                <Box width={["18%"]} bg={COLORS.blue}></Box>
                <Box width={["80%"]}>
                  <Text>Now...Its time to give your game a suitable name</Text>
                  <Formcontrol
                    type="text"
                    name="gameName"
                    label="Name"
                    value=""
                    placeholder="Enter any name of your choice"
                    handleChange={() => null}
                  />
                  <Formcontrol
                    type="text"
                    name="description"
                    label="Description"
                    value=""
                    placeholder="Enter description"
                    handleChange={() => null}
                  />
                </Box>
              </Flex>
            )}
            <Divider />
            <Flex
              width="100%"
              justify="space-between"
              my=".6rem"
              padding="1rem"
            >
              <CustomBtn
                text="Go Back"
                bg={COLORS.secondary}
                color={COLORS.white}
                w={["48%", "48%", "14rem"]}
                loading={false}
                handleSubmit={() => setTabIndex(tabIndex - 1)}
              />
              {/* {tabIndex === 2 && ( */}
              <CustomBtn
                text={tabIndex < 2 ? "Next" : "Create"}
                bg={COLORS.blue}
                color={COLORS.white}
                borderColor={COLORS.blue}
                w={["48%", "48%", "14rem"]}
                loading={false}
                handleSubmit={() => {
                  tabIndex < 2
                    ? setTabIndex(tabIndex + 1)
                    : router.push(`/app/admin/my-experiences/1`);
                }}
              />
              {/* )} */}
            </Flex>
          </CustomModal>
        </Flex>
      </Box>
    </Flex>
  );
};

export default GameDescriptionCard;

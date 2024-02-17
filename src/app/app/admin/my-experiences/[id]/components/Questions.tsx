"use client";

import {
  Box,
  Divider,
  Flex,
  FormLabel,
  Heading,
  Text,
  Textarea,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { BiPlusCircle } from "react-icons/bi";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { CustomBtn } from "@/components/common/CustomBtn";
import { Formcontrol } from "@/components/common/FormControl";
import { COLORS } from "@/constants/colors";
import {
  ActiveQuestionPayload,
  AnswerFields,
  OptionFields,
  Questions,
} from "@/types/questions";

import useQuestionFunctions from "../hooks/useQuestionFunctions";
import { createQuestions } from "../service";
import { Participants } from "@/types/experience";
import { truncateText } from "@/utils/truncateTexts";

type QuestionSectionProps = {
  experience_id: string;
  setSliceIndex: (arg: number) => void;
  sliceIndex: number;
  allQuestions: Questions[];
  // setAllQuestions: (arg: []) => void;
  setActiveQuestion: (
    payload: ActiveQuestionPayload,
    questionNo: number
  ) => void;
  participants: Participants[];
};

const QuestionSection = ({
  experience_id,
  sliceIndex,
  setSliceIndex,
  allQuestions,
  participants,
  setActiveQuestion,
}: // selectedQuestion,
QuestionSectionProps) => {
  const [formValues, setFormValues] = useState({
    answerFields: [] as AnswerFields[],
  });

  const [activeQuestionResponse, setActiveQuestionResponse] = useState({});
  const [loading, setLoading] = useState<boolean>(false);
  const [tabToShow, setTabToShow] = useState("allQuestions");
  const {
    // sliceIndex,
    // setSliceIndex,
    addOptionField,
    addAnswerField,
    toggleIsCorrect,
    removeOptionField,
    removeAnswerField,
    handleOptionChange,
    handleAnswerFieldChange,
  } = useQuestionFunctions(setFormValues, setSliceIndex, sliceIndex);

  const handleCreate = () => {
    //  if (!formValues?.title || !formValues?.description)
    //    return errorNotifier("You have not entered your name and description");
    const payload = {
      experience_id,
      question_type: "count-down-trivia",
      answer_type: "multi-choice",
      ...formValues?.answerFields[0],
    };
    mutate(payload);
  };

  const queryClient = new QueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: createQuestions,
    mutationKey: ["create-questions"],
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["all-questions"] });
      console.log("data", data);
      //  onClose && onClose();
      setTabToShow("allQuestions");
      setFormValues({
        answerFields: [] as AnswerFields[],
      });
    },
    onError: (error: any) => {
      console.error("Mutation error", error);
    },
  });

  const getQuestions = () => {
    setTabToShow("allQuestions");
    // const payload = {
    //   experience_id,
    // };
    // getExperienceQuestion(payload, setLoading, setAllQuestions);
  };

  const handleSetActiveQuestion = (question_id: string, questionNo: number) => {
    const payload = {
      experience_id,
      question_id,
    };
    console.log("ACTIVE QUES", payload);
    setActiveQuestion(payload, questionNo);
    // setActiveQuestion(payload, setLoading, setActiveQuestionResponse);
  };

  console.log(
    "FORM VALUES",
    formValues,
    "ALL QUESTIONS",
    allQuestions,
    sliceIndex,
    "activeQuestionResponse",
    activeQuestionResponse
  );

  return (
    <Box width="100%" color={COLORS.white} mt="2rem">
      <Flex direction="column" width="100%" gap="2rem">
        <Box width={["100%", "100%", "40%"]}>
          <Heading as="h3" fontSize={["1.6rem"]}>
            Questions
          </Heading>
          <Flex width="100%" justify="space-between" align="center">
            <Flex
              mt=".7rem"
              gap=".2rem"
              align="center"
              cursor="pointer"
              onClick={() => {
                setTabToShow("addQuestions");
                addAnswerField();
              }}
            >
              <BiPlusCircle size={22} />
              <Text
                borderBottom={
                  tabToShow === "addQuestions"
                    ? `.3rem solid ${COLORS.orange}`
                    : ""
                }
              >
                Add Question
              </Text>
            </Flex>
            <Text
              borderBottom={
                tabToShow === "allQuestions"
                  ? `.3rem solid ${COLORS.orange}`
                  : ""
              }
              mt=".7rem"
              cursor={"pointer"}
              onClick={getQuestions}
            >
              All Questions({allQuestions?.length})
            </Text>
          </Flex>
          {/* <Flex width="100%" gap=".7rem" wrap="wrap">
            {formValues?.answerFields?.map(
              (item: AnswerFields, index: number) => (
                <Flex
                  className="card-animate"
                  width="2rem"
                  direction="column"
                  // gap=".2rem"
                  bg={index === sliceIndex ? COLORS.secondary : COLORS.blue}
                  cursor="pointer"
                  key={index}
                  onClick={() => setSliceIndex(index)}
                  border={`.1rem solid ${COLORS.darkGrey}`}
                  padding=".6rem"
                  borderRadius=".5rem"
                >
                  <Text>{index + 1}</Text>
                </Flex>
              )
            )}
          </Flex> */}
        </Box>
        <Divider />
        {/* {tabToShow !== "allQuestions" && ( */}
        <Flex
          width="100%"
          justify="space-between"
          direction={["column", "column", "row"]}
        >
          <Flex
            padding="2rem"
            direction="column"
            align="center"
            // justify="center"
            overflowY="scroll"
            width={["100%", "100%", "79%"]}
            height={["65vh"]}
            border={`.1rem solid ${COLORS.formGray}`}
            borderRadius=".4rem"
          >
            {tabToShow !== "allQuestions" && (
              <>
                {formValues?.answerFields
                  ?.map((answerOption, index: number) => (
                    <React.Fragment key={index}>
                      <Box width="100%" color={COLORS.secondary}>
                        <Flex
                          width="100%"
                          justify="space-between"
                          align="center"
                          color={COLORS.white}
                        >
                          <FormLabel>Question {index + 1}</FormLabel>
                          <Text
                            cursor="pointer"
                            onClick={() => removeAnswerField(index)}
                          >
                            - Remove
                          </Text>
                        </Flex>
                        <Textarea
                          mb="1rem"
                          name={`text`}
                          // label={`Company Location ${index + 1}`}
                          placeholder={`Question`}
                          value={answerOption?.text}
                          bg={COLORS.white}
                          isRequired={true}
                          // height={["2.8rem"]}
                          onChange={(e) => {
                            handleAnswerFieldChange(
                              index,
                              "text",
                              e.target.value
                            );
                          }}
                          _focusVisible={{ borderColor: COLORS.formGray }}
                        />
                      </Box>
                      {answerOption.answers.map(
                        (option: OptionFields, optionIndex: number) => (
                          <Box key={option.id} width="100%">
                            <Flex
                              width="100%"
                              justify="end"
                              color={COLORS.formGray}
                            >
                              <button
                                onClick={() =>
                                  removeOptionField(index, optionIndex)
                                }
                              >
                                - Remove Option
                              </button>
                            </Flex>
                            <Flex
                              width="100%"
                              justify="space-between"
                              align="center"
                              color={COLORS.secondary}
                            >
                              <div className="icon-animate">
                                <FaStar
                                  size={30}
                                  cursor="pointer"
                                  color={
                                    option?.is_correct
                                      ? COLORS.orange
                                      : COLORS.white
                                  }
                                  style={{ marginBottom: "1rem" }}
                                  onClick={() =>
                                    toggleIsCorrect(index, optionIndex)
                                  }
                                />
                              </div>
                              <Formcontrol
                                type="text"
                                bg={COLORS.white}
                                width={["92%"]}
                                name={`text_${index}`}
                                // label="Artisan Trade"
                                placeholder={`Option ${optionIndex + 1}`}
                                height={["2.8rem"]}
                                value={option.text}
                                handleChange={(e) =>
                                  handleOptionChange(
                                    index,
                                    optionIndex,
                                    e.target.value
                                  )
                                }
                              />
                            </Flex>
                            <Divider mb=".7rem" />
                          </Box>
                        )
                      )}

                      <button
                        onClick={() => addOptionField(index)}
                        style={{ marginBottom: "1rem" }}
                      >
                        Add Option
                      </button>
                    </React.Fragment>
                  ))
                  .at(sliceIndex)}
                <Divider mb="1rem" />
                {formValues?.answerFields?.length > 0 &&
                  tabToShow === "addQuestions" && (
                    <CustomBtn
                      w={["100%", "100%", "14rem"]}
                      h={["2.4rem"]}
                      text="Submit"
                      loading={isLoading}
                      disabled={!formValues?.answerFields?.[0]?.text}
                      handleSubmit={handleCreate}
                    />
                  )}
              </>
            )}
            {tabToShow === "allQuestions" && (
              <>
                {allQuestions?.map((answerOption: Questions, index: number) => (
                  <React.Fragment key={index}>
                    <Box width="100%" color={COLORS.secondary}>
                      <Flex
                        width="100%"
                        justify="space-between"
                        align="center"
                        color={COLORS.white}
                      >
                        <FormLabel>Question {index + 1}</FormLabel>
                        <Text
                          color={COLORS.orange}
                          cursor="pointer"
                          onClick={() =>
                            handleSetActiveQuestion(answerOption?.id, index)
                          }
                        >
                          Set as active
                        </Text>
                        {/* <Text
                        cursor="pointer"
                        onClick={() => removeAnswerField(index)}
                      >
                        - Remove
                      </Text> */}
                      </Flex>
                      <Textarea
                        mb="1rem"
                        name={`text`}
                        // label={`Company Location ${index + 1}`}
                        placeholder={`Question`}
                        value={answerOption?.text}
                        bg={COLORS.white}
                        isRequired={true}
                        disabled
                        onChange={() => null}
                        _focusVisible={{ borderColor: COLORS.formGray }}
                      />
                    </Box>
                    {answerOption?.answers?.map(
                      (option: OptionFields, optionIndex: number) => (
                        <Box key={option.id} width="100%">
                          {/* <Flex
                          width="100%"
                          justify="end"
                          color={COLORS.formGray}
                        >
                          <button
                            onClick={() =>
                              removeOptionField(index, optionIndex)
                            }
                          >
                            - Remove Option
                          </button>
                        </Flex> */}
                          <Flex
                            width="100%"
                            justify="space-between"
                            align="center"
                            color={COLORS.secondary}
                          >
                            <div className="icon-animate">
                              <FaStar
                                size={30}
                                cursor="pointer"
                                color={
                                  option?.is_correct
                                    ? COLORS.orange
                                    : COLORS.white
                                }
                                style={{ marginBottom: "1rem" }}
                                // onClick={() =>
                                //   toggleIsCorrect(index, optionIndex)
                                // }
                              />
                            </div>
                            <Formcontrol
                              type="text"
                              bg={COLORS.white}
                              width={["92%"]}
                              name={`text_${index}`}
                              // label="Artisan Trade"
                              placeholder={`Option ${optionIndex + 1}`}
                              height={["2.8rem"]}
                              value={option.text}
                              handleChange={() => null}
                            />
                          </Flex>
                          <Divider mb=".7rem" />
                        </Box>
                      )
                    )}

                    {/* <button
                    onClick={() => addOptionField(index)}
                    style={{ marginBottom: "1rem" }}
                  >
                    Add Option
                  </button> */}
                  </React.Fragment>
                ))}
                <Divider mb="1rem" />
                {formValues?.answerFields?.length > 0 && (
                  <CustomBtn
                    w={["100%", "100%", "14rem"]}
                    h={["2.4rem"]}
                    text="Submit"
                    loading={isLoading}
                    disabled={!formValues?.answerFields?.[0]?.text}
                    handleSubmit={handleCreate}
                  />
                )}
              </>
            )}
          </Flex>
          <Flex
            padding="1rem .8rem"
            direction="column"
            overflowY="scroll"
            // align="center"
            // justify="center"
            width={["100%", "100%", "20%"]}
            height={["65vh"]}
            border={`.1rem solid ${COLORS.formGray}`}
            borderRadius=".4rem"
          >
            <Text>PARTICIPANTS({participants?.length})</Text>
            <Divider my=".4rem" />
            {participants?.map((participant: Participants, index: number) => (
              <React.Fragment key={participant?.id}>
                <Flex width="100%" justify="space-between">
                  <Text>
                    {index + 1}
                    {"."} {truncateText(participant?.username, 20)}
                  </Text>
                  <Text>{participant?.total_point}</Text>
                </Flex>
                <Divider my=".4rem" />
              </React.Fragment>
            ))}
          </Flex>
        </Flex>
        {/* )} */}
      </Flex>
    </Box>
  );
};

export default QuestionSection;

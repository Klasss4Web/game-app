import { useState } from "react";

import { AnswerFields } from "@/types/questions";

// type FormValues = {
//   answerFields: AnswerFields;
// };

const useQuestionFunctions = (
  setFormValues: (arg: any) => void,
  setSliceIndex: (arg: number) => void,
  sliceIndex: number
) => {
  // const [sliceIndex, setSliceIndex] = useState(0);

  const generateUniqueId = () => {
    return Math.random()?.toString(36)?.substr(2, 9);
  };

  const handleAnswerFieldChange = (
    index: number,
    fieldName: string,
    value: string
  ) => {
    setFormValues((prev: any) => {
      const newAnswerField = [...prev?.answerFields];
      newAnswerField[index] = {
        ...newAnswerField[index],
        [fieldName]: value,
      };
      return { ...prev, answerFields: newAnswerField };
    });
  };

  const handleOptionChange = (
    answerIndex: number,
    optionIndex: number,
    value: string
  ) => {
    setFormValues((prev: any) => {
      const newOptions = [...prev?.answerFields[answerIndex]?.answers];
      newOptions[optionIndex] = { ...newOptions[optionIndex], text: value };
      const newAnswerFields = [...prev.answerFields];
      newAnswerFields[answerIndex] = {
        ...newAnswerFields[answerIndex],
        answers: newOptions,
      };
      return { ...prev, answerFields: newAnswerFields };
    });
  };

  const addOptionField = (answerIndex: number) => {
    setFormValues((prev: any) => {
      const newOptions = [
        ...prev?.answerFields[answerIndex]?.answers,
        { text: "", is_correct: false },
      ];
      const newAnswerFields = [...prev?.answerFields];
      newAnswerFields[answerIndex] = {
        ...newAnswerFields[answerIndex],
        answers: newOptions,
      };
      return { ...prev, answerFields: newAnswerFields };
    });
  };

  const removeOptionField = (answerIndex: number, optionIndex: number) => {
    // e.preventDefault()
    // setSliceIndex(() => sliceIndex - 1);
    setFormValues((prev: any) => {
      const newOptions = [...prev?.answerFields[answerIndex]?.answers];
      newOptions.splice(optionIndex, 1);
      const newAnswerFields = [...prev?.answerFields];
      newAnswerFields[answerIndex] = {
        ...newAnswerFields[answerIndex],
        answers: newOptions,
      };
      return { ...prev, answerFields: newAnswerFields };
    });
  };

  const addAnswerField = () => {
    setSliceIndex(-1);
    console.log("FIELD ID");
    setFormValues((prev: any) => ({
      ...prev,
      answerFields: [
        // Uncomment this line if you want to add multiple questions
        // ...prev?.answerFields,
        { text: "", answers: [], order: null },
      ],
    }));
  };

  const removeAnswerField = (indexToRemove: number) => {
    setFormValues((prev: any) => ({
      ...prev,
      answerFields: prev?.answerFields?.filter(
        (_: any, index: number) => index !== indexToRemove
      ),
    }));
  };

  const toggleIsCorrect = (answerIndex: number, optionIndex: number) => {
    setFormValues((prev: any) => {
      const newOptions = [...prev?.answerFields[answerIndex]?.answers];
      // Toggle isCorrect for the clicked option and set others to false
      newOptions.forEach((option: any, index: number) => {
        option.is_correct = index === optionIndex;
      });
      const newAnswerFields = [...prev?.answerFields];
      newAnswerFields[answerIndex] = {
        ...newAnswerFields[answerIndex],
        answers: newOptions,
      };
      return { ...prev, answerFields: newAnswerFields };
    });
  };

  return {
    // formValues,
    sliceIndex,
    setSliceIndex,
    addOptionField,
    addAnswerField,
    toggleIsCorrect,
    removeOptionField,
    removeAnswerField,
    handleOptionChange,
    handleAnswerFieldChange,
  };
};

export default useQuestionFunctions;

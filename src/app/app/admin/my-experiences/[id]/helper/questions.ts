export const handleAnswerFieldChange = (
  index: number,
  fieldName: string,
  value: string,
  setFormValues: (arg: any) => void
) => {
  setFormValues((prev: any) => {
    const newAnswerField = [...prev.answerFields];
    newAnswerField[index] = {
      ...newAnswerField[index],
      [fieldName]: value,
    };
    return { ...prev, answerFields: newAnswerField };
  });
};

export const handleOptionChange = (
  answerIndex: number,
  optionIndex: number,
  value: string,
  setFormValues: (arg: any) => void
) => {
  setFormValues((prev: any) => {
    const newOptions = [...prev?.answerFields[answerIndex]?.options];
    newOptions[optionIndex] = { ...newOptions[optionIndex], text: value };
    const newAnswerFields = [...prev.answerFields];
    newAnswerFields[answerIndex] = {
      ...newAnswerFields[answerIndex],
      options: newOptions,
    };
    return { ...prev, answerFields: newAnswerFields };
  });
};

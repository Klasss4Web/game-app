import { ChangeEvent } from "react";

const useHandleChange = (setFormValues: (arg: any) => void) => {
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormValues((prev: any) => ({ ...prev, [name]: value }));
  };
  return {
    setFormValues,
    handleChange,
  };
};

export default useHandleChange;

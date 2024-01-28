import { errorNotifier, successNotifier } from "@/app/providers";
import axiosInstance, { API_ROUTES } from "@/services/api";

export const getSpecificExperience = async (id: string) => {
  try {
    const { data } = await axiosInstance.get(
      API_ROUTES.GET_EXPERIENCE_BY_ID(id)
    );
    return data;
  } catch (error: any) {
    if (error.response) {
      errorNotifier(error?.response?.data?.message);
    } else {
      errorNotifier("Network error, please check your network connection");
    }
    // throw error;
  }
};

export const createQuestions = async (payload: any) => {
  try {
    const { data } = await axiosInstance.post(API_ROUTES.QUESTIONS, payload);
    successNotifier("Question created successfully");
    return data;
  } catch (error: any) {
    if (error.response) {
      errorNotifier(error?.response?.data?.message);
    } else {
      errorNotifier("Network error, please check your network connection");
    }
    throw error;
  }
};

export const getAllQuestions = async () => {
  try {
    const { data } = await axiosInstance.get(API_ROUTES.QUESTIONS);
    return data;
  } catch (error: any) {
    if (error.response) {
      errorNotifier(error?.response?.data?.message);
    } else {
      errorNotifier("Network error, please check your network connection");
    }
    // throw error;
  }
};

export const getSpecificQuestion = async (experienceId: string) => {
  try {
    const { data } = await axiosInstance.get(
      API_ROUTES.GET_QUESTION_BY_ID(experienceId)
    );
    return data;
  } catch (error: any) {
    if (error.response) {
      errorNotifier(error?.response?.data?.message);
    } else {
      errorNotifier("Network error, please check your network connection");
    }
    // throw error;
  }
};

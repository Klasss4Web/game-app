import { errorNotifier, successNotifier } from "@/app/providers";
import axiosInstance from "@/services/api";
import { API_ROUTES } from "@/services/apiRoutes";
import { CreateExpPayload } from "@/types/experience";

export const createExperience = async (payload: CreateExpPayload) => {
  try {
    const { data } = await axiosInstance.post(API_ROUTES.EXPERIENCES, payload);
    successNotifier("Experience created successfully");
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

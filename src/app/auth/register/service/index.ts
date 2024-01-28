import { errorNotifier, successNotifier } from "@/app/providers";
import axiosInstance, { API_ROUTES } from "@/services/api";
import { RegisterPayload } from "@/types/form";

export const register = async (payload: RegisterPayload) => {
  try {
    const { data } = await axiosInstance.post(API_ROUTES.REGISTER, payload);
    successNotifier("Account created successfully");
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

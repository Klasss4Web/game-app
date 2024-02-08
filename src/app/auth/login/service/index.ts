import { errorNotifier } from "@/app/providers";
import axiosInstance, { API_ROUTES } from "@/services/api";
import { LoginPayload } from "@/types/form";

export const login = async (payload: LoginPayload) => {
  try {
    const { data } = await axiosInstance.post(API_ROUTES.LOGIN, payload);
    console.log("TOKEN", data);
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

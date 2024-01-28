import { errorNotifier } from "@/app/providers";
import axiosInstance, { API_ROUTES } from "@/services/api";

type ResetPasswordPayload = {
  new_password: string;
  code: string;
  email: string;
};

export const resetPassword = async (payload: ResetPasswordPayload) => {
  try {
    const { data } = await axiosInstance.post(
      API_ROUTES.RESET_PASSWORD,
      payload
    );
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

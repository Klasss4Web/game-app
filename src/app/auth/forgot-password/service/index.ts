import { errorNotifier } from "@/app/providers";
import axiosInstance, { API_ROUTES } from "@/services/api";
import { RegisterPayload } from "@/types/form";

type ForgotPasswordPayload = {
  email: string;
};

export const forgotPassword = async (payload: ForgotPasswordPayload) => {
  try {
    const { data } = await axiosInstance.post(
      API_ROUTES.FORGOT_PASSWORD,
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

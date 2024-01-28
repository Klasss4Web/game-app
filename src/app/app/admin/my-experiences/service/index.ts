import { errorNotifier } from "@/app/providers";
import { ROUTES } from "@/constants/pageRoutes";
import axiosInstance, { API_ROUTES } from "@/services/api";

export const getExperience = async () => {
  try {
    const { data } = await axiosInstance.get(API_ROUTES.EXPERIENCES);
    // successNotifier("Experience created successfully");
    return data;
  } catch (error: any) {
    if (error.response) {
      errorNotifier(error?.response?.data?.message);
      if (
        error?.response?.data?.message ===
        "Unauthorized. Please login to gain access."
      )
        window.location.href = ROUTES.login;
    } else {
      errorNotifier("Network error, please check your network connection");
    }
    // throw error;
  }
};

export const deleteExperience = async (id: string) => {
  try {
    const { data } = await axiosInstance.delete(
      API_ROUTES.GET_EXPERIENCE_BY_ID(id)
    );
    // successNotifier("Experience created successfully");
    return data;
  } catch (error: any) {
    if (error.response) {
      errorNotifier(error?.response?.data?.message);
      if (
        error?.response?.data?.message ===
        "Unauthorized. Please login to gain access."
      )
        window.location.href = ROUTES.login;
    } else {
      errorNotifier("Network error, please check your network connection");
    }
    throw error;
  }
};

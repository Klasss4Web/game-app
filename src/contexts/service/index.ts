import { errorNotifier } from "@/app/providers";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/constants/appConstants";
import { ROUTES } from "@/constants/pageRoutes";
import axiosInstance, { API_ROUTES } from "@/services/api";
import {
  getLocalStorageString,
  setLocalStorageString,
} from "@/utils/localStorage";

export const refreshAccessToken = async () => {
  const storedRefreshToken = getLocalStorageString(REFRESH_TOKEN);
  if (!storedRefreshToken) {
    return;
  }
  try {
    const { data } = await axiosInstance.get(API_ROUTES.REFRESH_TOKEN);
    setLocalStorageString(ACCESS_TOKEN, data?.data?.access_token);
    setLocalStorageString(REFRESH_TOKEN, data?.data?.refresh_token);
    return data;
  } catch (error: any) {
    console.error("Token refresh failed:", error);
    if (error.response) {
      errorNotifier(error?.response?.data?.message);
    } else {
      errorNotifier("Network error, please check your network connection");
    }
    window.location.href = ROUTES.login;
    // throw error;
  }
};

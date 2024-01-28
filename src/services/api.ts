"use client";

import { ACCESS_TOKEN, LOGGED_IN_USER } from "@/constants/appConstants";
import { LoggedInUser } from "@/types/user";
import {
  getLocalStorageItem,
  getLocalStorageString,
} from "@/utils/localStorage";
import axios, { AxiosHeaders } from "axios";

export * from "./apiRoutes";
export const socketBaseURL = process.env.NEXT_PUBLIC_SOCKET_CONNECTION;

const headers = {
  Accept: "application/json, text/plain, */*",
  "Content-Type": "application/json ",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Origin": "*",
};

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_API,
  headers,
});

const addTokenToRequest = async (req: any) => {
  // const loggedInUser = getLocalStorageItem<LoggedInUser>(LOGGED_IN_USER);
  const token = getLocalStorageString(ACCESS_TOKEN);

  req.headers = { ...req.headers } as AxiosHeaders;
  if (req.headers) {
    req.headers.Authorization = `Bearer ${token}`;
  } else {
    req.headers = {
      Authorization: `Bearer ${token}`,
    };
  }
  return req;
};

axiosInstance.interceptors.request.use(addTokenToRequest);

export default axiosInstance;

"use client";

import {
  ACCESS_TOKEN,
  LOGGED_IN_USER,
  REFRESH_TOKEN,
} from "@/constants/appConstants";

// export const USER_DETAILS = "profile";
// export const TOKEN = "#ART#PORT"
// export const REFRESH_TOKEN = "#ART#PORT#REF";

export const setLocalStorageItem = <T>(key: string, data: T): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(data));
  }
};

export const setLocalStorageString = <T>(key: string, data: string): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, data);
  }
};

export const getLocalStorageItem = <T>(key: string): T | null => {
  if (typeof window !== "undefined") {
    const storedItem = localStorage.getItem(key);

    try {
      return storedItem ? JSON.parse(storedItem) : null;
    } catch (error) {
      // console.error(`Error parsing JSON for key '${key}':`, error);
      return null;
    }
  }

  return null;
};

export const getLocalStorageString = <T>(key: string): string | null => {
  if (typeof window !== "undefined") {
    const storedItem = localStorage.getItem(key);

    try {
      return storedItem ? storedItem : null;
    } catch (error) {
      // console.error(`Error parsing JSON for key '${key}':`, error);
      return null;
    }
  }

  return null;
};
export const removeLocalStorageItem = (key: string): void => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(key);
  }
};

export const clearLocalStorage = (): void => {
  if (typeof window !== "undefined") {
    localStorage.clear();
  }
};

export const removeAllStorageItems = () => {
  removeLocalStorageItem(LOGGED_IN_USER);
  removeLocalStorageItem(ACCESS_TOKEN);
  removeLocalStorageItem(REFRESH_TOKEN);
};

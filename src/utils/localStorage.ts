"use client";

export const USER_DETAILS = "profile";
export const TOKEN = "#ART#PORT"
export const REFRESH_TOKEN = "#ART#PORT#REF";

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

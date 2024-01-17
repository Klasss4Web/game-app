"use client";

import { CompleteProfile, PersonalDetails } from "@/types/user";
import {
  USER_DETAILS,
  getLocalStorageItem,
  getLocalStorageString,
} from "@/utils/localStorage";
import { useQuery } from "@tanstack/react-query";
import { createContext, useState } from "react";

export const UserProfileContext = createContext({
  state: {} as CompleteProfile,
  dispatch: ({}) => {},
  // isLoadingReview: false,
});

type UserContext = {
  children: React.ReactNode;
};

export const UserProfileContextProvider = ({ children }: UserContext) => {
  const [state, setState] = useState<any>({});
  // const [, setData] = useState({});
  // const [, setLoading] = useState(true);

  const dispatch = (incoming: any) => {
    setState((prev: any) => ({ ...prev, ...incoming }));
  };

  // const profile = getLocalStorageItem<PersonalDetails>(USER_DETAILS);
  // const {
  //   data: reviewDetails,
  //   error: reviewError,
  //   isLoading: isLoadingReview,
  // } = useQuery({
  //   queryKey: ["review-details", profile?.nin],
  //   queryFn: reviewApplicationDetails,
  // });

  return (
    <UserProfileContext.Provider value={{ dispatch, state }}>
      {children}
    </UserProfileContext.Provider>
  );
};

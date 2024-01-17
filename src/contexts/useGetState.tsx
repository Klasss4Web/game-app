import { useContext, useEffect, useState } from "react";
import { UserProfileContext } from "./UserContext";

export const useGetState = () => {
  const { state, dispatch } = useContext(UserProfileContext);
  const [, setUserInfo] = useState({});

  useEffect(() => {
    setUserInfo(state);
    // eslint-disable-next-line
  }, [state]);

  return { state, dispatch };
};

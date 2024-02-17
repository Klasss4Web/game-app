"use client";

import { ACCESS_TOKEN, LOGGED_IN_USER } from "@/constants/appConstants";
import { ROUTES } from "@/constants/pageRoutes";
import { LoggedInUser } from "@/types/user";
import {
  getLocalStorageItem,
  getLocalStorageString,
  removeAllStorageItems,
  removeLocalStorageItem,
} from "@/utils/localStorage";
import { useQuery } from "@tanstack/react-query";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import { refreshAccessToken } from "./service";
import { FullPageLoader } from "@/components/common/FullPageLoader";
import WelcomeScreen from "@/components/common/WelcomeScreen";

export const AuthContext = createContext({});

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [loggedinUser, setLoggedinUser] = useState<LoggedInUser | null>(null);
  const router = useRouter();

  // const { data: refreshToken, isLoading } = useQuery({
  //   queryKey: ["refresh-token"],
  //   queryFn: refreshAccessToken,
  // });

  useEffect(() => {
    const user = getLocalStorageItem<LoggedInUser>(LOGGED_IN_USER);
    const credentials = getLocalStorageString(ACCESS_TOKEN);
    if (credentials) {
      // const parsedData = credentials ? JSON.parse(credentials) : null;
      setLoggedinUser(user);
      // console.log(credentials, "cred");
      const decoded = jwtDecode(credentials as string);
      const expiryDate = new Date((decoded?.exp as number) * 1000);
      if (new Date().getTime() > expiryDate.getTime()) {
        refreshAccessToken();
      } else {
        // router.push(ROUTES.my_experience);
        setIsLoggedin(true);
      }
    } else {
      setLoggedinUser(null);
      router.push(ROUTES.home);
    }
    // eslint-disable-next-line
  }, []);

  return !isLoggedin ? (
    <WelcomeScreen />
  ) : (
    <AuthContext.Provider
      value={{ isLoggedin, setIsLoggedin, loggedinUser, setLoggedinUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};

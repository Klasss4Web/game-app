import { LOGGED_IN_USER } from "@/constants/appConstants";
import { ROUTES } from "@/constants/pageRoutes";
import { LoggedInUser } from "@/types/user";
import {
  getLocalStorageItem,
  removeLocalStorageItem,
} from "@/utils/localStorage";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";

export const AuthContext = createContext({});

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [loggedinUser, setLoggedinUser] = useState<LoggedInUser | null>(null);
  const router = useRouter();

  useEffect(() => {
    const credentials = getLocalStorageItem<LoggedInUser>(LOGGED_IN_USER);
    if (credentials) {
      // const parsedData = credentials ? JSON.parse(credentials) : null;
      setLoggedinUser(credentials);
      const decoded = jwtDecode(credentials?.access_token);
      const expiryDate = new Date((decoded?.exp as number) * 1000);
      if (new Date() > expiryDate) {
        removeLocalStorageItem(LOGGED_IN_USER);
        router.push(ROUTES.login);
      } else {
        // dispatch(authSetUser({ ...decoded }));
        setIsLoggedin(true);
      }
    } else {
      setLoggedinUser(null);
      router.push(ROUTES.home);
    }
    // eslint-disable-next-line
  }, []);

  return (
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

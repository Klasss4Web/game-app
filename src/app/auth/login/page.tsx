"use client";

import { errorNotifier } from "@/app/providers";
import { CustomBtn } from "@/components/common/CustomBtn";
import AuthWrapper from "@/components/auth/AuthWrapper";
import {
  ACCESS_TOKEN,
  LOGGED_IN_USER,
  REFRESH_TOKEN,
} from "@/constants/appConstants";
import { COLORS } from "@/constants/colors";
import { ROUTES } from "@/constants/pageRoutes";
import {
  setLocalStorageItem,
  setLocalStorageString,
} from "@/utils/localStorage";
import {
  Flex,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaEnvelope, FaEye } from "react-icons/fa";
import CustomLink from "@/components/common/CustomLink";
import { login } from "./service";

const initialEmail = "immanueldiai@gmail.com";
const initialPassword = "qwerty123456";

const Login: React.FunctionComponent = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!email || !password)
      return errorNotifier(
        "You have not entered your email address and password"
      );

    // TO BE REMOVED
    // setLocalStorageItem(LOGGED_IN_USER, { role: "dummyToken" });
    // router.push(ROUTES.create_experience);
    const payload = {
      email,
      password,
    };
    mutate(payload);
  };

  const { mutate, isLoading } = useMutation({
    mutationFn: login,
    onSuccess: (loggedInData) => {
      console.log("loggedInData", loggedInData);
      setLocalStorageItem(LOGGED_IN_USER, loggedInData?.data);
      setLocalStorageString(ACCESS_TOKEN, loggedInData?.data?.access_token);
      setLocalStorageString(REFRESH_TOKEN, loggedInData?.data?.refresh_token);
      // setLocalStorageItem(TOKEN, loggedInData?.data?.access_token);
      // if (loggedInData?.data?.role === "admin") {
      //   router.push(ROUTES.my_experience);
      // }
      router.push(ROUTES.my_experience);
    },
    onError: (error) => {
      console.error("Mutation error", error);
    },
  });

  console.log("showPassworddd", showPassword);

  return (
    <AuthWrapper>
      <Flex direction="column" align="center" justify="center" width="100%">
        <Image
          alt="App Logo"
          width={100}
          height={80}
          src="/images/loginBg.jpg"
          style={{ cursor: "pointer", borderRadius: "50%" }}
          onClick={() => router.push(ROUTES.home)}
        />
        <Flex direction="column" align="center">
          <Heading fontSize={["1.8rem"]} color={COLORS.u_black}>
            Welcome back
          </Heading>
          <Text my=".5rem" color={COLORS.formGray}>
            Please enter your details.
          </Text>
        </Flex>
        {/* {error && <CustomAlert message={apiErrorHandler(error)} type="error" />} */}
        <FormLabel
          width={"100%"}
          color={COLORS.u_black}
          fontSize={"1rem"}
          px=".3rem"
        >
          Email
        </FormLabel>

        <InputGroup>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            type="email"
          />
          <InputRightElement>
            <FaEnvelope color={COLORS.darkGrey} />
          </InputRightElement>
        </InputGroup>

        <FormLabel
          width={"100%"}
          color={COLORS.u_black}
          fontSize={"1rem"}
          mt=".8rem"
          px=".3rem"
        >
          Password
        </FormLabel>
        <InputGroup width={"100%"}>
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            width={"100%"}
            placeholder="Enter Password"
            type={showPassword ? "text" : "password"}
          />
          <InputRightElement>
            <FaEye
              cursor="pointer"
              color={COLORS.darkGrey}
              onClick={() => setShowPassword(!showPassword)}
            />
          </InputRightElement>
        </InputGroup>

        <Flex justify="center" my=".5rem">
          <CustomLink to={ROUTES.forgotPassword} text="Forgot Password?" />
        </Flex>

        <CustomBtn
          text="Sign In"
          bg={COLORS.secondary}
          loading={isLoading}
          handleSubmit={handleLogin}
        />
        <Flex justify="center" my=".5rem">
          <Text>Dont have an account yet?</Text>
          <CustomLink
            to={ROUTES.registration}
            text="Sign Up"
            color={COLORS.blue}
          />
        </Flex>
      </Flex>
    </AuthWrapper>
  );
};

export default Login;

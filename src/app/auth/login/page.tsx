"use client";

import { errorNotifier } from "@/app/providers";
import { CustomBtn } from "@/components/CustomBtn";
import AuthWrapper from "@/components/auth/AuthWrapper";
// import CustomLink from "@/components/common/CustomLink";
// import { warningToast } from "@/components/common/NotificationHandler";
import { COLORS } from "@/constants/colors";
import { ROUTES } from "@/constants/pageRoutes";
// import axiosInstance from "@/services/api";
// import http, { AUTH_ROUTES } from "@/services/api";
import { TOKEN, setLocalStorageItem } from "@/utils/localStorage";
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

//TODO: to be removed

type FormValues = {
  email: string;
  password: string;
  remember: boolean;
};

const initialEmail = "immanueldiai@gmail.com";
const initialPassword = "qwerty123456";

const Login: React.FunctionComponent = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState(initialPassword);

  const handleLogin = () => {
    if (!email || !password)
      return errorNotifier(
        "You have not entered your email address and password"
      );

    router.push(ROUTES.create_experience);
    // mutate();
  };

  // const { mutate, isLoading } = useMutation({
  //   mutationFn: async () => {
  //     const { data } = await axiosInstance.post(AUTH_ROUTES.LOGIN, {
  //       email,
  //       password,
  //     });
  //     setLocalStorageItem("loggedinUser", data?.data);
  //     setLocalStorageItem(TOKEN, data?.data?.access_token);
  //     return data;
  //   },
  //   onSuccess: (loggedInData) => {
  //     console.log("loggedInData", loggedInData);
  //     if (loggedInData?.data?.role === "artisan") {
  //       router.push(ROUTES.artisanHome);
  //     } else {
  //       router.push(ROUTES.artisans);
  //     }
  //   },
  //   onError: (error: any) => {
  //     errorNotifier(error?.response?.data?.message);
  //   },
  // });

  return (
    <AuthWrapper>
      <Flex direction="column" align="center" justify="center" width="100%">
        <Image
          alt="App Logo"
          width={100}
          height={80}
          src=""
          style={{ cursor: "pointer" }}
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
          {/* <CustomLink to={ROUTES.forgotPassword} text="Forgot Password?" /> */}
        </Flex>

        <CustomBtn
          text="Sign In"
          loading={false}
          handleSubmit={handleLogin}
          bg={COLORS.secondary}
        />
      </Flex>
    </AuthWrapper>
  );
};

export default Login;

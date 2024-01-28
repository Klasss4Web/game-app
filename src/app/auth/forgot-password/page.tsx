"use client";

import { errorNotifier, successNotifier } from "@/app/providers";
import AuthWrapper from "@/components/auth/AuthWrapper";
import { CustomBtn } from "@/components/common/CustomBtn";
import CustomLink from "@/components/common/CustomLink";

import { COLORS } from "@/constants/colors";
import { ROUTES } from "@/constants/pageRoutes";
import { setLocalStorageString } from "@/utils/localStorage";
import { isValidEmail } from "@/utils/validateEmail";
import {
  Flex,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { forgotPassword } from "./service";

function ForgotPassword() {
  const router = useRouter();
  const [email, setEmail] = useState("");

  const { mutate, isLoading } = useMutation({
    mutationFn: forgotPassword,
    onSuccess: (data: any) => {
      successNotifier(data?.message as string);
      router.push(ROUTES.resetPassword);
    },
  });

  const handleContinue = () => {
    if (!email)
      return errorNotifier(
        "You have not Entered your registered email address"
      );
    if (!isValidEmail.test(email))
      return errorNotifier("Invalid email address");
    setLocalStorageString("email", email);
    const payload = {
      email,
    };
    mutate(payload);
    // router.push(ROUTES.verifyOTP);
  };

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
            Forgot Password
          </Heading>
          <Text my=".5rem" color={COLORS.formGray} align={"center"}>
            To reset your login password, please enter your email and submit
          </Text>
        </Flex>
        <FormLabel
          width={"100%"}
          color={COLORS.u_black}
          fontSize={"1rem"}
          px=".3rem"
          mt={5}
        >
          Email
        </FormLabel>

        <InputGroup mb={5}>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            type="email"
          />
        </InputGroup>
        <VStack spacing={5} mt={3} w="full">
          <CustomBtn
            text="Continue"
            loading={isLoading}
            handleSubmit={handleContinue}
            bg={COLORS.secondary}
          />

          <CustomLink to={ROUTES.login} text="Login" />
        </VStack>
      </Flex>
    </AuthWrapper>
  );
}

export default ForgotPassword;

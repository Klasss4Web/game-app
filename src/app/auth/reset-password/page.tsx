"use client";

import { errorNotifier, successNotifier } from "@/app/providers";
import AuthWrapper from "@/components/auth/AuthWrapper";
import { CustomBtn } from "@/components/common/CustomBtn";
import { COLORS } from "@/constants/colors";
import { ROUTES } from "@/constants/pageRoutes";
import { useToggle } from "@/hooks/useToggle";
// import axiosInstance, { AUTH_ROUTES } from "@/services/api";
import { getLocalStorageString } from "@/utils/localStorage";
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
import { useState } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { resetPassword } from "./service";

const ResetPassword = () => {
  const router = useRouter();
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const { toggle: toggleNewPasswordVisibility, value: isNewPasswordVisible } =
    useToggle();
  const {
    toggle: toggleConfirmPasswordVisibility,
    value: isConfirmPasswordVisible,
  } = useToggle();
  const code = getLocalStorageString("otpCode");
  const email = getLocalStorageString("email");

  const { mutate, isLoading } = useMutation({
    mutationFn: resetPassword,
    onSuccess: (data) => {
      successNotifier(data?.message);
      router.push(ROUTES.login);
    },
    onError: ({ response }) => {
      errorNotifier(response?.data?.message);
      console.error(response);
    },
  });

  const handleContinue = () => {
    if (!newPassword || !confirmNewPassword)
      return errorNotifier("Invalid Fields");
    if (newPassword !== confirmNewPassword)
      return errorNotifier("Passwords do not match");

    const payload = {
      new_password: newPassword as string,
      code: code as string,
      email: email as string,
    };
    mutate(payload);
  };

  return (
    <AuthWrapper>
      <Flex
        p={3}
        direction="column"
        align="center"
        justify="center"
        width="100%"
      >
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
            Reset Password
          </Heading>
          <Text my=".5rem" color={COLORS.formGray}>
            Enter a new password
          </Text>
        </Flex>

        <FormLabel
          width={"100%"}
          color={COLORS.u_black}
          fontSize={"1rem"}
          px=".3rem"
        >
          New Password
        </FormLabel>

        <InputGroup>
          <Input
            placeholder="Enter desired password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            type={isNewPasswordVisible ? "text" : "password"}
          />
          <InputRightElement onClick={toggleNewPasswordVisibility}>
            {isNewPasswordVisible ? (
              <BsEyeSlash color={COLORS.darkGrey} />
            ) : (
              <BsEye color={COLORS.darkGrey} />
            )}
          </InputRightElement>
        </InputGroup>

        <FormLabel
          width={"100%"}
          color={COLORS.u_black}
          fontSize={"1rem"}
          mt=".8rem"
          px=".3rem"
        >
          Confirm Password
        </FormLabel>
        <InputGroup width={"100%"}>
          <Input
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            width={"100%"}
            placeholder="Enter Password"
            type={isConfirmPasswordVisible ? "text" : "password"}
          />
          <InputRightElement onClick={toggleConfirmPasswordVisibility}>
            {isConfirmPasswordVisible ? (
              <BsEyeSlash color={COLORS.darkGrey} />
            ) : (
              <BsEye color={COLORS.darkGrey} />
            )}
          </InputRightElement>
        </InputGroup>

        <Flex justify="center" w="full" mt="1.5rem">
          <CustomBtn
            text="Reset"
            loading={isLoading}
            handleSubmit={handleContinue}
            bg={COLORS.secondary}
          />
        </Flex>
      </Flex>
    </AuthWrapper>
  );
};

export default ResetPassword;

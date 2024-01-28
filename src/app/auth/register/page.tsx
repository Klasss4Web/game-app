"use client";

import { errorNotifier, successNotifier } from "@/app/providers";
import { CustomBtn } from "@/components/common/CustomBtn";
import AuthWrapper from "@/components/auth/AuthWrapper";

import { COLORS } from "@/constants/colors";
import { ROUTES } from "@/constants/pageRoutes";
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
import React, { ChangeEvent, useState } from "react";
import { FaEnvelope, FaEye } from "react-icons/fa";
import CustomLink from "@/components/common/CustomLink";
import { IoPerson } from "react-icons/io5";
import { RegisterPayload } from "@/types/form";
import { register } from "./service";

const Register: React.FunctionComponent = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [formValues, setFormValues] = useState<RegisterPayload>({
    email: "",
    first_name: "",
    last_name: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev: RegisterPayload) => ({ ...prev, [name]: value }));
  };

  const { mutate, isLoading } = useMutation({
    mutationFn: register,
    onSuccess: () => {
      router.push(ROUTES.login);
    },
    onError: (error) => {
      console.error("Mutation error", error);
    },
  });

  const handleRegister = () => {
    if (!formValues?.email || !formValues?.password)
      return errorNotifier(
        "You have not entered your email address and password"
      );
    if (!formValues?.first_name || !formValues?.last_name)
      return errorNotifier(
        "You have not entered your first naame and last name"
      );
    // setLocalStorageItem(LOGGED_IN_USER, { role: "dummyToken" });

    mutate(formValues);
  };

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
          mt=".8rem"
          px=".3rem"
        >
          First Name
        </FormLabel>
        <InputGroup>
          <Input
            type="text"
            name="first_name"
            placeholder="Enter your first name"
            value={formValues?.first_name}
            onChange={handleChange}
          />
          <InputRightElement>
            <IoPerson color={COLORS.darkGrey} />
          </InputRightElement>
        </InputGroup>
        <FormLabel
          width={"100%"}
          color={COLORS.u_black}
          fontSize={"1rem"}
          mt=".8rem"
          px=".3rem"
        >
          Last Name
        </FormLabel>
        <InputGroup>
          <Input
            type="text"
            name="last_name"
            placeholder="Enter your last name"
            value={formValues.last_name}
            onChange={handleChange}
          />
          <InputRightElement>
            <IoPerson color={COLORS.darkGrey} />
          </InputRightElement>
        </InputGroup>
        <FormLabel
          width={"100%"}
          color={COLORS.u_black}
          fontSize={"1rem"}
          px=".3rem"
          mt=".8rem"
        >
          Email
        </FormLabel>

        <InputGroup>
          <Input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formValues?.email}
            onChange={handleChange}
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
        <InputGroup width={"100%"} mb=".8rem">
          <Input
            name="password"
            width={"100%"}
            placeholder="Enter Password"
            type={showPassword ? "text" : "password"}
            value={formValues?.password}
            onChange={handleChange}
          />
          <InputRightElement>
            <FaEye
              cursor="pointer"
              color={COLORS.darkGrey}
              onClick={() => setShowPassword(!showPassword)}
            />
          </InputRightElement>
        </InputGroup>

        <CustomBtn
          text="Register"
          loading={isLoading}
          handleSubmit={handleRegister}
          bg={COLORS.secondary}
        />
        <Flex justify="center" my=".5rem">
          <Text>Already have an account?</Text>
          <CustomLink to={ROUTES.login} text="Login" color={COLORS.blue} />
        </Flex>
      </Flex>
    </AuthWrapper>
  );
};

export default Register;

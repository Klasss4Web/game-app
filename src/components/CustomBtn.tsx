"use client";

import { COLORS } from "@/constants/colors";
import { ButtonProps } from "@/types/form";
import { Button } from "@chakra-ui/react";

export const CustomBtn = ({
  childComp,
  rightIcon,
  bg,
  color,
  text,
  fontSize,
  h,
  w,
  disabled,
  borderColor,
  handleSubmit = () => null,
  loading,
}: ButtonProps): JSX.Element => {
  return (
    <Button
      type="submit"
      leftIcon={childComp}
      rightIcon={rightIcon}
      width={w || "100%"}
      height={h || ["2.5rem", "2.5rem", "2.8rem"]}
      color={color || COLORS.btnText}
      bg={bg}
      borderRadius={".4rem"}
      border={
        borderColor
          ? `1px solid ${borderColor}`
          : `1px solid ${COLORS.secondary}`
      }
      fontSize={fontSize || ["1rem", "1rem", "1rem"]}
      fontWeight="semibold"
      _hover={{
        bg: bg || COLORS.secondary,
        color: color || COLORS.btnText,
      }}
      isDisabled={disabled}
      onClick={handleSubmit}
      isLoading={loading}
    >
      {text}
    </Button>
  );
};

export const CustomOutLinedBtn = ({
  childComp,
  rightIcon,
  bg,
  color,
  text,
  fontSize,
  h,
  w,
  disabled,
  borderColor,
  handleSubmit = () => null,
  loading,
}: ButtonProps): JSX.Element => {
  return (
    <Button
      type="submit"
      leftIcon={childComp}
      rightIcon={rightIcon}
      width={w || "100%"}
      height={h || ["2.5rem", "2.5rem", "2.8rem"]}
      color={color || COLORS.u_black}
      bg={COLORS.white}
      borderRadius={".4rem"}
      border={
        borderColor ? `1px solid ${borderColor}` : `1px solid ${COLORS.minst}`
      }
      fontSize={fontSize || ["1rem", "1rem", "1rem"]}
      fontWeight="semibold"
      _hover={{
        bg: bg || COLORS.white,
        color: color || COLORS.black,
      }}
      isDisabled={disabled}
      onClick={handleSubmit}
      isLoading={loading}
    >
      {text}
    </Button>
  );
};

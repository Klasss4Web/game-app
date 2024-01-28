import React, { HTMLInputTypeAttribute } from "react";

export type ButtonProps = {
  childComp?: React.ReactElement;
  rightIcon?: React.ReactElement;
  bg?: string;
  color?: string;
  text: string;
  fontSize?: string[];
  loading: boolean;
  disabled?: boolean;
  borderColor?: string;
  h?: string[];
  w?: string[];
  handleSubmit?: () => void;
};

export type ChangeProps = {
  name: string;
  value: string;
};

export type LoginFormValues = {
  email: string;
  password: string;
};

export type ContactUsFormValues = {
  first_name: string;
  last_name: string;
  email?: string;
  phone: string;
  message: string;
};
export type File = {
  name: string;
  blob: string;
  size: number;
};

export type FormControlProps = {
  variant?: "outline" | "filled" | "flushed" | "unstyled";
  type: HTMLInputTypeAttribute;
  placeholder: string;
  label?: string;
  bg?: string;
  mb?: string;
  name: string;
  value: string | number;
  color?: string;
  textAlign?: "left" | "center";
  fontSize?: string[];
  isInvalid?: boolean;
  isRequired?: boolean;
  borderColor?: string;
  handleChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  >;
  onBlur?: React.FocusEventHandler;
  onKeyPress?: React.KeyboardEventHandler;
  onKeyDown?: React.KeyboardEventHandler;
  onFocus?: React.FocusEventHandler<HTMLInputElement> | undefined;
  icon?: React.ReactNode;
  width?: string[];
  height?: string[];
  disabled?: boolean;
};

export type Base64Object = {
  name: string;
  blob: string | undefined;
  size: number;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type RegisterPayload = LoginPayload & {
  first_name: string;
  last_name: string;
};

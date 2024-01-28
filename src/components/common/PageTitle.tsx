import { COLORS } from "@/constants/colors";
import { Heading } from "@chakra-ui/react";
import React from "react";

type PageTitleProps = {
  title: string;
};

const PageTitle = ({ title }: PageTitleProps) => {
  return (
    <Heading fontWeight="light" color={COLORS.white}>
      {title}
    </Heading>
  );
};

export default PageTitle;

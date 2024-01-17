import { Flex, Spinner } from "@chakra-ui/react";

import { COLORS } from "@/constants/colors";

type LoadingProps = {
  h?: string;
};

export const FullPageLoader = ({ h }: LoadingProps): JSX.Element => {
  return (
    <Flex
      bg={COLORS.white}
      justifyContent="center"
      alignItems="center"
      height={h || "100vh"}
      width="100%"
      backgroundColor={"inherit"}
    >
      <Spinner color={COLORS.secondary} w="5rem" h="5rem" speed="0.65s" />
    </Flex>
  );
};

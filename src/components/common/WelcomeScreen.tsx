import { Stack } from "@chakra-ui/react";

import { COLORS } from "@/constants/colors";

type WelcomeProps = {
  loader?: boolean;
};

const WelcomeScreen = ({ loader = false }: WelcomeProps): JSX.Element => {
  return (
    <Stack
      bg={!loader ? COLORS.formGray : COLORS.secondary}
      w="100%"
      h={!loader ? "100vh" : "100%"}
      justifyContent={"center"}
      alignItems="center"
      position={"fixed"}
      zIndex="2000"
    >
      {/* {!loader && (
        <Image
          src={Logo}
          alt="logo"
          w={['18rem', '20rem', '25rem']}
          height={['10rem', '12rem', '18rem']}
          loading="lazy"
        />
      )} */}
      <svg
        width="25rem"
        height="10rem"
        version="1.1"
        id="L5"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        x="0rem"
        y="0rem"
        viewBox="0 0 100 100"
        enableBackground="new 0 0 0 0"
        xmlSpace="preserve"
      >
        <circle
          fill="#7a9ab9"
          stroke="none"
          cx="6"
          cy="50"
          r={!loader ? "15" : "10"}
        >
          <animateTransform
            attributeName="transform"
            dur="1s"
            type="translate"
            values="0 15 ; 0 -15; 0 15"
            repeatCount="indefinite"
            begin="0.1"
          />
        </circle>
        <circle
          fill="#4d7aa8"
          stroke="none"
          cx="40"
          cy="50"
          r={!loader ? "15" : "10"}
        >
          <animateTransform
            attributeName="transform"
            dur="1s"
            type="translate"
            values="0 10 ; 0 -10; 0 10"
            repeatCount="indefinite"
            begin="0.2"
          />
        </circle>
        <circle
          fill="#366a9e"
          stroke="none"
          cx="74"
          cy="50"
          r={!loader ? "15" : "10"}
        >
          <animateTransform
            attributeName="transform"
            dur="1s"
            type="translate"
            values="0 5 ; 0 -5; 0 5"
            repeatCount="indefinite"
            begin="0.3"
          />
        </circle>
        <circle
          fill="#24578a"
          stroke="none"
          cx="108"
          cy="50"
          r={!loader ? "15" : "10"}
        >
          <animateTransform
            attributeName="transform"
            dur="1s"
            type="translate"
            values="0 5 ; 0 -5; 0 5"
            repeatCount="indefinite"
            begin="0.4"
          />
        </circle>
      </svg>
    </Stack>
  );
};

export default WelcomeScreen;

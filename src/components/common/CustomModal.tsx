import {
  isValidElement,
  Children,
  cloneElement,
  ReactNode,
  ReactElement,
} from "react";
import {
  Modal as ChakraModal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  useDisclosure,
  Box,
  Button,
  ModalCloseButton,
} from "@chakra-ui/react";
import { COLORS } from "@/constants/colors";

interface ICustomModalProps {
  children: ReactNode;
  size: string;
  btnTitle: string | ReactNode;
  div: boolean;
  addCloseModalBtn?: boolean;
  buttonProps: any;
  bg?: string;
  [x: string]: any;
}

export default function CustomModal({
  children,
  size,
  btnTitle,
  div,
  bg,
  buttonProps,
  addCloseModalBtn,
  props,
}: Partial<ICustomModalProps>) {
  const { onOpen, isOpen, onClose } = useDisclosure();

  const childrenWithProps = Children.map(children, (child) => {
    // Checking isValidElement is the safe way and avoids a TS error too.
    if (isValidElement(child)) {
      return cloneElement(child as ReactElement, { onClose });
    }
    return child;
  });

  return (
    <>
      {div ? (
        <Box onClick={onOpen} cursor="pointer" {...buttonProps}>
          {btnTitle}
        </Box>
      ) : (
        <Button
          _focus={{ border: "none" }}
          fontSize={14}
          fontWeight={500}
          onClick={onOpen}
          color="#fff"
          bg="primary"
          _hover={{ opacity: 0.8 }}
          {...buttonProps}
        >
          {btnTitle}
        </Button>
      )}

      <ChakraModal
        size={size}
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        motionPreset="slideInBottom"
        {...props}
      >
        <ModalOverlay />

        <ModalContent borderRadius="5px" maxH="90vh" overflowY={"auto"} bg={bg}>
          {addCloseModalBtn && <ModalCloseButton bg={COLORS.formGray} />}
          <ModalBody p={0}>{childrenWithProps}</ModalBody>
        </ModalContent>
      </ChakraModal>
    </>
  );
}

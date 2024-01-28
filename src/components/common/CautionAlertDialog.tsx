import { COLORS } from "@/constants/colors";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Flex,
  Tooltip,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";

import { MdDeleteOutline, MdOutlineDelete } from "react-icons/md";

interface AlertDialogueProps {
  loading?: boolean;
  agree: string;
  disagree?: string;
  buttonText?: string;
  cautionTitle?: string;
  toolTipLabel: string;
  ICON?: React.ReactNode;
  onContinue: () => void;
  buttonProps?: React.ComponentProps<any>;
}

export default function CautionAlertDialog({
  onContinue,
  cautionTitle,
  agree,
  ICON,
  disagree,
  toolTipLabel,
}: AlertDialogueProps): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef: any = React.useRef();
  const BTN = { _focus: { boxShadow: "none" }, color: COLORS.white };

  const handleClick = () => {
    onClose();
    onContinue();
  };

  return (
    <>
      <Tooltip label={toolTipLabel}>
        <Box onClick={onOpen}>
          {ICON ? (
            ICON
          ) : (
            <MdOutlineDelete color={COLORS.red} size={22} cursor="pointer" />
          )}
        </Box>
      </Tooltip>

      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
        size={"xl"}
      >
        <AlertDialogOverlay />

        <AlertDialogContent bg={COLORS.secondary} color={COLORS.white}>
          <AlertDialogHeader style={{ fontSize: "1.1rem" }}>
            <Flex gap="1.1rem" align={"center"}>
              <MdDeleteOutline
                color={COLORS.red}
                size={26}
                onClick={onOpen}
                cursor="pointer"
              />
              {toolTipLabel}
            </Flex>
          </AlertDialogHeader>
          <AlertDialogBody fontSize={["1rem"]} color={COLORS.white}>
            {cautionTitle}
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button
              {...BTN}
              bg={COLORS.headerGreen}
              _hover={{ bg: COLORS.headerGreen }}
              ref={cancelRef}
              onClick={onClose}
            >
              {disagree || "No"}
            </Button>
            <Button
              bg={`${COLORS.red}`}
              _hover={{ backgroundColor: COLORS.red }}
              onClick={handleClick}
              ml={3}
            >
              {agree || "Yes"}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

import { COLORS } from "@/constants/colors";
import { Box, Flex, Td, Text, Tr } from "@chakra-ui/react";
import React from "react";
import { BsFillPersonCheckFill } from "react-icons/bs";
import { MdOutlinePersonOff } from "react-icons/md";

type RankingTableProps = {
  score: number;
  serialNo: number;
  userName: string;
  position: string;
  isQuestionAnswered: boolean;
};

const TableBodyRow = ({
  serialNo,
  userName,
  score,
  position,
  isQuestionAnswered,
}: RankingTableProps) => {
  return (
    <Flex
      width="100%"
      gap=".5rem"
      mb=".3rem"
      py=".5rem"
      bg={COLORS.secondary}
      borderRadius=".5rem"
      justify="start"
    >
      <Text width="10%">{serialNo}</Text>
      <Text width="55%" textAlign="left">
        {userName}
      </Text>
      {position === "show_question_rank" && (
        <Box fontSize="1.2rem" fontWeight="bold">
          {isQuestionAnswered ? (
            <BsFillPersonCheckFill color={COLORS.success} />
          ) : (
            <MdOutlinePersonOff color={COLORS.red} />
          )}
        </Box>
      )}
      <Text width="15%">{score}</Text>
    </Flex>
    // <Tr>
    //   <Td>{serialNo}</Td>
    //   <Td>{userName}</Td>
    //   {position === "show_question_rank" && (
    //     <Td>
    //       <Box fontSize="1.2rem" fontWeight="bold">
    //         {isQuestionAnswered ? (
    //           <GrStatusGood color={COLORS.success} />
    //         ) : (
    //           <ImCancelCircle color={COLORS.red} />
    //         )}
    //       </Box>
    //     </Td>
    //   )}
    //   <Td isNumeric>{score}</Td>
    // </Tr>
  );
};

export default TableBodyRow;

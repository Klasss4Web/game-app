import { COLORS } from "@/constants/colors";
import { Box, Td, Tr } from "@chakra-ui/react";
import React from "react";
import { GrStatusGood } from "react-icons/gr";
import { ImCancelCircle } from "react-icons/im";

type RankingTableProps = {
  score: number;
  serialNo: number;
  userName: string;
  position: string;
  isQuestionAnswered: boolean;
};

const TableBody = ({
  serialNo,
  userName,
  score,
  position,
  isQuestionAnswered,
}: RankingTableProps) => {
  return (
    <Tr>
      <Td>{serialNo}</Td>
      <Td>{userName}</Td>
      {position === "show_question_rank" && (
        <Td>
          <Box fontSize="1.2rem" fontWeight="bold">
            {isQuestionAnswered ? (
              <GrStatusGood color={COLORS.success} />
            ) : (
              <ImCancelCircle color={COLORS.red} />
            )}
          </Box>
        </Td>
      )}
      <Td isNumeric>{score}</Td>
    </Tr>
  );
};

export default TableBody;

import {
  Box,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React from "react";
import TableBody from "./TableBody";
import { Participants } from "@/types/experience";
import TableBodyRow from "./TableBodyRow";

type PlayersRankingTableProps = {
  data: Participants[];
  position: string;
};

const PlayersRankingTable = ({ data, position }: PlayersRankingTableProps) => {
  // const loggedInParticipant = getLocalStorageItem<LoggedInParticipant>(
  //   SAVED_ITEMS.participant
  // );
  // const sortedDataInDescOrder = data
  //   ?.sort((a, b) => b.point - a.point)
  //   ?.map((sortedData, index) => ({ index, ...sortedData }));
  // const getCurrentParticipantScore = sortedDataInDescOrder.find(
  //   (participant) => participant?.id === loggedInParticipant?.id
  // );
  // console.log("getCurrentParticipantScore", getCurrentParticipantScore);
  return (
    // <TableContainer h={position ? "40vh" : "10vh"} overflowY="scroll">
    //   <Table variant="striped" colorScheme="teal">
    //     <TableCaption>Players scores and rankings</TableCaption>
    //     <Thead>
    //       <Tr>
    //         <Th>Rank</Th>
    //         <Th>Player</Th>
    //         {position === "show_question_rank" && <Th>Status</Th>}
    //         <Th isNumeric>Points</Th>
    //       </Tr>
    //     </Thead>
    //     <Tbody>
    //       {data?.map((participant, index) => (
    //         <TableBody
    //           key={participant?.id}
    //           position={position}
    //           score={
    //             position === "show_final_rank"
    //               ? participant?.total_point
    //               : participant?.point
    //           }
    //           serialNo={participant?.index + 1}
    //           userName={participant.username}
    //           isQuestionAnswered={participant?.is_question_answered}
    //         />
    //       ))}
    //     </Tbody>
    //   </Table>
    // </TableContainer>
    <Box>
      {data?.map((participant) => (
        <TableBodyRow
          key={participant?.id}
          position={position}
          score={
            position === "show_final_rank"
              ? participant?.total_point
              : participant?.point
          }
          serialNo={participant?.index + 1}
          userName={participant.username}
          isQuestionAnswered={participant?.is_question_answered}
        />
      ))}
    </Box>
  );
};

export default PlayersRankingTable;

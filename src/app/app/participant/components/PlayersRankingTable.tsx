import {
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React from "react";

const PlayersRankingTable = () => {
  return (
    <TableContainer>
      <Table variant="striped" colorScheme="teal">
        <TableCaption>Players scores and rankings</TableCaption>
        <Thead>
          <Tr>
            <Th>Rank</Th>
            <Th>Player</Th>
            <Th isNumeric>Points</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>1</Td>
            <Td>John (mm)</Td>
            <Td isNumeric>100</Td>
          </Tr>
          <Tr>
            <Td>2</Td>
            <Td>Doe</Td>
            <Td isNumeric>98</Td>
          </Tr>
          <Tr>
            <Td>3</Td>
            <Td>Jane (m)</Td>
            <Td isNumeric>85</Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default PlayersRankingTable;

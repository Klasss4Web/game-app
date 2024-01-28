import { COLORS } from "@/constants/colors";
import { Box, Image, Text } from "@chakra-ui/react";
import React from "react";

type CategoryCardProps = {
  name: string;
  imageUrl: string;
};

const CategoryCard = ({ name, imageUrl }: CategoryCardProps) => {
  return (
    <Box width="49%" color={COLORS.white} cursor="pointer">
      <Image
        className="card-animate"
        src={imageUrl}
        alt=""
        width="5rem"
        height="5rem"
        borderRadius=".3rem"
      />
      <Text>{name}</Text>
    </Box>
  );
};

export default CategoryCard;

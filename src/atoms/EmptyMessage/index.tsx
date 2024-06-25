import React from "react";
import { FaLeaf } from "react-icons/fa";
import Box from "@/molecules/Box";
import Text from "../Text";

const EmptyMessage = () => {
  return (
    <Box className="flex h-64 w-full flex-col items-center justify-center gap-2 p-6 text-gray-600">
      <FaLeaf />
      <Text Tag="p">Parece tão vazio aqui...</Text>
    </Box>
  );
};

export default EmptyMessage;

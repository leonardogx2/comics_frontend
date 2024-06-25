import React from "react";
import Box from "../Box";
import Text from "@/atoms/Text";
import { MdErrorOutline } from "react-icons/md";
import DefaultLink from "@/atoms/Link";

const AccessDenied = () => {
  return (
    <Box className="absolute left-0 top-0 flex h-screen w-screen flex-col items-center justify-center gap-2">
      <Box className="flex items-center gap-2 text-gray-600">
        <MdErrorOutline className="text-2xl" />
        <Text Tag="h3">Acesso negado!</Text>
      </Box>
      <Text Tag="p">Volte duas quadras e tente novamente.</Text>
      <DefaultLink to="/login">Entrar em uma conta</DefaultLink>
    </Box>
  );
};

export default AccessDenied;

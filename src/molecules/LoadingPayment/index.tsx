import React from "react";
import Box from "../Box";
import { ImSpinner2 } from "react-icons/im";
import Text from "@/atoms/Text";
import { FaCheck } from "react-icons/fa6";

interface LoadingPaymentProps {
  success?: boolean;
}

const LoadingPayment = ({ success }: LoadingPaymentProps) => {
  return (
    <Box className="flex h-full min-h-[300px] w-full flex-col items-center justify-center gap-2">
      {!success ? (
        <>
          <Text Tag="p">Processando pagamento...</Text>
          <ImSpinner2 className="animate-spin" />
        </>
      ) : (
        <>
          <FaCheck className="animate-pulse text-2xl text-green-700" />
          <Text Tag="p">Pagamento realizado com sucesso!</Text>
        </>
      )}
    </Box>
  );
};

export default LoadingPayment;

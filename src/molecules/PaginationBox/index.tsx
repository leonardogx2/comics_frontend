import React from "react";
import Box from "../Box";
import IconButton from "../IconButton";
import Text from "@/atoms/Text";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

interface PaginationBoxProps {
  page: number;
  size: number;
  total: number;
  onBack: () => void;
  onNext: () => void;
}

const PaginationBox = ({
  page,
  size,
  total,
  onBack,
  onNext,
}: PaginationBoxProps) => {
  const totalPages = Math.ceil(total / size);

  const backHandler = () => {
    if (page <= 1) return;
    onBack();
  };
  const nextHandler = () => {
    if (page >= totalPages) return;
    onNext();
  };

  return totalPages > 1 ? (
    <Box className="mx-auto flex w-fit items-center">
      <IconButton
        onClick={backHandler}
        Icon={IoIosArrowBack}
        size="small"
        className="text-default-red"
      />
      <Text>
        {page} de {totalPages}
      </Text>
      <IconButton
        onClick={nextHandler}
        Icon={IoIosArrowForward}
        size="small"
        className="text-default-red"
      />
    </Box>
  ) : (
    <></>
  );
};

export default PaginationBox;

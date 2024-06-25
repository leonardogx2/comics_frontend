import React from "react";
import Text from "../Text";
import Box from "@/molecules/Box";
import { convertToBRL } from "@/infra/utils";
import SkeletonBox from "../SkeletonBox";

interface TotalPriceBoxProps {
  value: number;
  loading?: boolean;
  hiddenPlots?: boolean;
}

const TotalPriceBox = ({ value, loading, hiddenPlots }: TotalPriceBoxProps) => {
  const deliveryPrice = 30;
  const totalWithDelivery = value + deliveryPrice;
  const plotValue = convertToBRL(Math.round(totalWithDelivery / 3));

  if (!value) return <></>;

  return !loading ? (
    <Box className="flex items-center justify-between border-y border-y-gray-200 py-2">
      <Text Tag="h3">Total:</Text>
      <Box className="flex flex-col items-end gap-0">
        <Text Tag="h3">{convertToBRL(totalWithDelivery)}</Text>
        {!hiddenPlots && (
          <Text Tag="p" className="leading-0 text-xs text-gray-500">
            Ou 3x de {plotValue} (frete incluso)
          </Text>
        )}
      </Box>
    </Box>
  ) : (
    <Box className="flex items-center justify-between border-y border-y-gray-200 py-3">
      <SkeletonBox className="h-[10px] w-[70px]" />
      <Box className="flex flex-col items-end gap-3">
        <SkeletonBox className="h-[10px] w-[70px]" />
        <SkeletonBox className="h-[7px] w-[100px]" />
      </Box>
    </Box>
  );
};

export default TotalPriceBox;

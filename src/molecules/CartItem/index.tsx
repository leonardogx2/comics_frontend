import { BookImage } from "@/atoms/BookImage";
import { Image } from "@/interfaces";
import React, { memo } from "react";
import IconButton from "../IconButton";
import Box from "../Box";
import Text from "@/atoms/Text";
import { convertToBRL } from "@/infra/utils";
import { FaTrashAlt } from "react-icons/fa";

interface CartItemProps {
  title: string;
  valueInBRL: number;
  Image: Image;
  id: string;
  onDelete?: (id: string) => void;
}

const CartItem = memo(
  ({ title, onDelete, valueInBRL, id, Image }: CartItemProps) => {
    return (
      <li className="grid h-[70px] min-h-[70px] w-full grid-cols-[50px_1fr] gap-3">
        <BookImage className="flex h-full w-full self-start" image={Image} />
        <Box className="flex w-full items-center justify-between">
          <Box className="flex w-full flex-col gap-1">
            <Text Tag="p" className="max-w-[250px] truncate">
              {title}
            </Text>
            <Text>{convertToBRL(valueInBRL)}</Text>
          </Box>
          <IconButton
            size="medium"
            Icon={FaTrashAlt}
            className="text-red-500"
            onClick={onDelete ? () => onDelete(id) : () => {}}
          />
        </Box>
      </li>
    );
  },
);

CartItem.displayName = "CartItem";

export default CartItem;

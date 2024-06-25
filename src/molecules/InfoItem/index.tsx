import React from "react";
import { IconType } from "react-icons";
import Text from "@/atoms/Text";

export interface InfoItemProps {
  Icon: IconType;
  label: string;
  value: string | number;
}

const InfoItem = ({ Icon, label, value }: InfoItemProps) => {
  return (
    <li className="grid grid-cols-12 gap-2 items-center text-gray-700 p-2 bg-gray-100 rounded">
      <Icon className="text-xl col-span-1" />
      <div className="flex justify-between gap-1 items-center w-full col-span-11">
        <Text>{label}</Text>
        <Text Tag="span" className="font-semibold truncate text-end">
          {value}
        </Text>
      </div>
    </li>
  );
};

export { InfoItem };

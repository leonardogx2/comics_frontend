import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Text from "@/atoms/Text";
import { IconType } from "react-icons";

interface DefaultDropDownMenuProps {
  title: string;
  options: { onClick: () => void; label: string; Icon: IconType }[];
  children: React.ReactNode;
}

export function DefaultDropDownMenu({
  title,
  options,
  children,
}: DefaultDropDownMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div>{children}</div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="z-[2000] mr-4 flex w-56 flex-col">
        <DropdownMenuLabel>{title}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="z-[2000] flex w-full flex-col gap-1">
          {options.map((option) => {
            return (
              <DropdownMenuItem
                className="z-[2000] flex w-full items-center"
                onClick={option.onClick}
                key={option.label}
              >
                <option.Icon className="mr-2 h-4 w-4 text-default-red" />
                <Text Tag="p">{option.label}</Text>
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

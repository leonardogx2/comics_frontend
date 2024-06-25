import React from "react";
import { BookCategory } from "../../interfaces";
import { IconType } from "react-icons";

interface CategoryItemProps {
  title: string;
  value: BookCategory;
  Icon: IconType;
  onClick: () => void;
}

const CategoryItem = (props: CategoryItemProps) => {
  return (
    <li
      onClick={props.onClick}
      className="group flex h-44 w-32 min-w-32 cursor-pointer flex-col items-center justify-center gap-2"
    >
      <div className="flex h-2/3 rounded-full bg-default-red p-6 duration-100 group-hover:scale-105 group-hover:bg-white">
        <props.Icon className="h-full w-full text-white group-hover:text-default-red" />
      </div>
      <div>
        <h4 className="font-semibold text-gray-600">{props.title}</h4>
      </div>
    </li>
  );
};

export default CategoryItem;

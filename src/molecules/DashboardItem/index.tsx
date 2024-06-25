import React from "react";

interface DashboardItemProps {
  title: string;
  value: string | number;
}

const DashboardItem = (props: DashboardItemProps) => {
  return (
    <li className="flex h-64 w-full flex-col items-center justify-center rounded bg-white text-gray-600 shadow-lg">
      <h3 className="text-lg">{props.title}</h3>
      <h4 className="text-2xl font-semibold">{props.value}</h4>
    </li>
  );
};

export default DashboardItem;

import React from "react";
import { IconType } from "react-icons";
import { ImBooks } from "react-icons/im";
import { IoMdAdd } from "react-icons/io";
import { RiDashboard2Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import Box from "../Box";
import Text from "@/atoms/Text";
import { IoReturnDownBack } from "react-icons/io5";

const Aside = () => {
  const navigate = useNavigate();

  const Li = ({
    path,
    children,
    Icon,
  }: {
    path: string;
    Icon: IconType;
    children: React.ReactNode;
  }) => {
    return (
      <li
        className="flex cursor-pointer items-center gap-2 border-l-4 border-default-red p-3 font-semibold text-gray-600 duration-100 hover:border-l-8"
        onClick={() => navigate(path)}
      >
        <Icon />
        {children}
      </li>
    );
  };

  return (
    <aside className="fixed left-0 top-0 flex h-screen w-[50px] bg-white shadow-lg md:w-[300px]">
      <ul className="hidden md:block">
        <Li Icon={RiDashboard2Line} path="/dashboard">
          Home
        </Li>
        <Li Icon={ImBooks} path="/hub/comics">
          Quadrinhos
        </Li>
        <Li Icon={IoMdAdd} path="/hub/comics/register">
          Criar quadrinho
        </Li>
        <Box
          className="absolute bottom-4 flex cursor-pointer items-center gap-2 p-2 pl-4 text-lg font-semibold text-green-700 duration-100 hover:scale-105"
          onClick={() => navigate("/")}
        >
          <IoReturnDownBack />
          <Text>Marketplace</Text>
        </Box>
      </ul>
    </aside>
  );
};

export default Aside;

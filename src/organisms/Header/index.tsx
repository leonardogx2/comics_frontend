import Box from "@/molecules/Box";
import IconButton from "@/molecules/IconButton";
import { IoPersonSharp } from "react-icons/io5";
import { BiSolidCart } from "react-icons/bi";
import React, { useState } from "react";
import ModalCart from "../ModalCart";
import { useLocation, useNavigate } from "react-router-dom";
import { FaPerson } from "react-icons/fa6";
import { DefaultDropDownMenu } from "../DropDownMenu";
import { CiLogout } from "react-icons/ci";
import { AiOutlineOrderedList } from "react-icons/ai";
import { useAuthContext } from "@/context/userContext";
import { RiDashboard2Line } from "react-icons/ri";

const Header = () => {
  const [isCartModalVisible, setIsCartModalVisible] = useState<boolean>(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuthContext();

  const dropDownMenuoptions = [
    {
      label: user?.isSeller ? "Painel" : "Minha conta",
      onClick: () => navigate(user?.isSeller ? "/dashboard" : "/me"),
      Icon: user?.isSeller ? RiDashboard2Line : FaPerson,
    },
    {
      label: "Meus pedidos",
      onClick: () => navigate("/me/orders"),
      Icon: AiOutlineOrderedList,
    },
    {
      label: "Sair",
      onClick: () => {
        signOut();
        navigate("/login");
      },
      Icon: CiLogout,
    },
  ];

  return (
    <>
      <ModalCart
        isVisible={isCartModalVisible}
        onClose={() => setIsCartModalVisible(false)}
      />
      <Box className="flex h-20 w-full items-center justify-between rounded-none bg-default-red p-5">
        <Box>LOGO AQUI</Box>
        <Box className="flex">
          {!location.pathname.includes("/checkout") && (
            <IconButton
              onClick={() => setIsCartModalVisible(true)}
              Icon={BiSolidCart}
              className="border-2 bg-transparent text-gray-100"
            />
          )}
          <DefaultDropDownMenu
            options={dropDownMenuoptions}
            title={user?.firstName || "Usuário"}
          >
            <IconButton
              Icon={IoPersonSharp}
              className="border-2 bg-transparent text-gray-100"
            />
          </DefaultDropDownMenu>
        </Box>
      </Box>
    </>
  );
};

export default Header;

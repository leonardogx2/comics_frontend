import { useAuthContext } from "@/context/userContext";
import React from "react";
import { IconType } from "react-icons";
import { FaInstagram } from "react-icons/fa6";
import { MdOutlineMail } from "react-icons/md";
import { useNavigate } from "react-router-dom";

interface SocialItemProps {
  Icon: IconType;
  title: string;
}

const Footer = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const isSeller = user?.isSeller || false;

  const BecomeASeller = () => {
    return (
      <div className="absolute -top-[75px] mx-auto flex h-[150px] w-2/4 items-center justify-center gap-2 rounded-lg bg-white p-6 shadow-xl">
        <div className="flex flex-col gap-2">
          <h5 className="text-2xl font-bold text-default-red">
            Se torne um vendedor
          </h5>
          <p className="font-semibold tracking-wide text-gray-600">
            Nossa plataforma permite que o usuário possa anunciar quadrinhos. Se
            você tem interesse em se tornar um vendedor, clique em saiba mais.
          </p>
        </div>
        <div>
          <button
            onClick={() => navigate("/dashboard")}
            className="w-44 cursor-pointer rounded-2xl bg-default-red px-5 py-3 text-xl font-semibold text-white"
          >
            Saiba mais
          </button>
        </div>
      </div>
    );
  };

  const SocialItem = (props: SocialItemProps) => {
    return (
      <li className="group relative h-[200px] w-[200px] cursor-pointer">
        <div className="absolute bottom-0 right-0 h-[90%] w-[90%] rounded-br-xl rounded-tl-xl bg-default-red shadow-xl duration-100 group-hover:scale-95 group-hover:bg-white"></div>
        <div className="absolute left-0 top-0 flex h-[93%] w-[93%] flex-col items-center justify-center gap-3 rounded-br-xl rounded-tl-xl bg-gray-800 text-default-red duration-100 group-hover:text-gray-400">
          <props.Icon className="text-[2.5rem]" />
          <p className="font-semibold">{props.title}</p>
        </div>
      </li>
    );
  };

  return (
    <footer
      className={`relative flex min-h-[200px] w-full flex-col items-center justify-center bg-default-dark pb-16 ${
        !isSeller ? "mt-[150px] pt-[150px]" : "mt-16 pt-16"
      }`}
    >
      {!isSeller ? <BecomeASeller /> : <></>}
      <div className={`flex items-center justify-center gap-4 px-[20rem]`}>
        <div className="flex w-1/2 flex-col">
          <h3 className="text-[3rem] font-bold text-default-red">ArtComics</h3>
          <p className="tracking-wider text-gray-400">
            Conectamos apaixonados por quadrinhos, facilitando a compra e venda
            de suas edições favoritas. Aproveite ao máximo nossa plataforma e
            faça parte dessa comunidade incrível! :)
          </p>
          <div className="mt-4 flex items-center gap-2">
            <div className="h-[20px] w-[20px] bg-gray-400"></div>
            <div className="h-[20px] w-[20px] bg-gray-400"></div>
            <div className="h-[20px] w-[20px] bg-gray-400"></div>
            <div className="h-[20px] w-[20px] bg-gray-400"></div>
          </div>
        </div>
        <ul className="flex w-1/2 items-center justify-center gap-6">
          <SocialItem Icon={MdOutlineMail} title="E-mail" />
          <SocialItem Icon={FaInstagram} title="Instagram" />
        </ul>
      </div>
    </footer>
  );
};

export default Footer;

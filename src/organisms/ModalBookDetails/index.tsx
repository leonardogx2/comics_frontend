import React, { useEffect, useState } from "react";
import Modal, { ModalProps } from "../../templates/Modal";
import { findBookById } from "../../services/book/findBookById";
import { Book } from "../../interfaces";
import { MdDriveFileRenameOutline, MdDateRange } from "react-icons/md";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { FaUserPen } from "react-icons/fa6";
import { MdDelete, MdEdit } from "react-icons/md";
import { FaBoxes } from "react-icons/fa";
import { GrFormSubtract, GrFormAdd } from "react-icons/gr";
import { convertToBRL } from "../../infra/utils";
import Text from "@/atoms/Text";
import { InfoItem } from "@/molecules/InfoItem";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import BookProperties from "../BookProperties";
import IconButton from "@/molecules/IconButton";

interface ModalBookDetailsProps {
  withManagementButtons: boolean;
  bookId?: string;
}

const ModalBookDetails = ({
  bookId,
  isVisible,
  onClose,
}: ModalBookDetailsProps & Omit<ModalProps, "children">) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [book, setBook] = useState<Book | undefined>();
  const [stock, setStock] = useState<number>(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (bookId) {
      takeBook();
    }
  }, [bookId]);

  const takeBook = async () => {
    setLoading(true);
    const reqBook = await findBookById(bookId as string);
    setBook(reqBook);
    setStock(reqBook.stock);
    setLoading(false);
  };

  const setStockHandler = (to: "ADD" | "DEL") => {
    return () => {
      if (to === "ADD") {
        setStock((prevValue) => prevValue + 1);
      } else {
        if (stock <= 0) return;
        setStock((prevValue) => prevValue - 1);
      }
    };
  };

  return !loading && book ? (
    <Modal
      anim={{
        from: { opacity: 0, transform: "translateX(100%)" },
        enter: { opacity: 1, transform: "translateX(0%)" },
        leave: { opacity: 0, transform: "translateX(100%)" },
      }}
      className="fixed inset-0 left-auto right-0 top-0 mx-0 my-0 h-screen select-none rounded-none"
      isVisible={isVisible}
      onClose={onClose}
    >
      <div className="w-[350px] p-2">
        <div className="flex flex-col gap-2">
          <div className="flex items-center">
            <img
              src={
                book.Image?.local
                  ? `${import.meta.env.VITE_API_URL}/public/uploads/${book.Image?.name}`
                  : book.Image?.url
              }
              className="mx-auto h-[200px] rounded shadow-lg md:h-[350px]"
            />
          </div>
          <BookProperties book={book} omit={["stock"]} />
          <div className="flex flex-col gap-2 rounded bg-gray-100 px-3 py-2">
            <div className="flex items-center gap-2 font-semibold">
              <FaBoxes />
              <Text Tag="h3">Gerenciar estoque</Text>
            </div>
            <div className="flex items-center justify-center gap-3 rounded p-2 text-gray-600">
              <IconButton
                size="medium"
                Icon={GrFormSubtract}
                onClick={setStockHandler("DEL")}
              />
              <div className="flex flex-col items-center leading-3">
                <Text className="text-sm">Qtd. atual</Text>
                <Text className="text-lg font-semibold">{stock}</Text>
              </div>
              <IconButton
                size="medium"
                Icon={GrFormAdd}
                onClick={setStockHandler("ADD")}
              />
            </div>
          </div>
          <div className="absolute bottom-4 left-0 flex w-full justify-end gap-4 p-2 text-white">
            <div className="flex items-center gap-2">
              <Button
                onClick={() => navigate(`/hub/comics/edit/${book.id}`)}
                className="flex cursor-pointer items-center gap-2 border-2 border-transparent bg-blue-600 text-white duration-100 hover:border-blue-600 hover:bg-transparent hover:text-blue-600"
                asChild
              >
                <div>
                  <MdEdit />
                  <Text>Editar</Text>
                  <p></p>
                </div>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  ) : (
    <></>
  );
};

export default ModalBookDetails;

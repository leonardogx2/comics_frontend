import { convertToBRL } from "@/infra/utils";
import { Book, TBookProperty } from "@/interfaces";
import { InfoItem } from "@/molecules/InfoItem";
import React from "react";
import { IconType } from "react-icons";
import { FaBoxes } from "react-icons/fa";
import { FaUserPen } from "react-icons/fa6";
import { MdDriveFileRenameOutline, MdDateRange } from "react-icons/md";
import { RiMoneyDollarCircleFill } from "react-icons/ri";

interface BookPropertiesProps {
  book: Book;
  omit?: TBookProperty[];
}

interface InfoItemProps {
  label: string;
  value: string | number;
  key: TBookProperty;
  Icon: IconType;
}

const BookProperties = ({ book, omit }: BookPropertiesProps) => {
  return (
    <ul className="mt-2 flex flex-col gap-2 text-lg">
      {(
        [
          {
            Icon: MdDriveFileRenameOutline,
            label: "Título:",
            key: "title",
            value: book.title,
          },
          {
            Icon: MdDateRange,
            label: "Ano:",
            key: "releaseYear",
            value: book.releaseYear,
          },
          {
            Icon: FaBoxes,
            label: "Estoque:",
            key: "stock",
            value: book.stock,
          },
          {
            Icon: RiMoneyDollarCircleFill,
            label: "Preço:",
            key: "priceInBRL",
            value: convertToBRL(book.offerInBRL || book.priceInBRL),
          },
          {
            Icon: FaUserPen,
            label: "Escritor:",
            key: "writerName",
            value: book.writerName,
          },
          {
            Icon: FaUserPen,
            label: "Desenhista Geral:",
            key: "pencillerName",
            value: book.pencillerName,
          },
          {
            Icon: FaUserPen,
            label: "Desenhista da Capa:",
            key: "coverArtistName",
            value: book.coverArtistName,
          },
        ] as InfoItemProps[]
      ).map((props: InfoItemProps) => {
        if (!omit || !(omit && omit.includes(props.key)))
          return <InfoItem {...props} key={props.key} />;
        return <></>;
      })}
    </ul>
  );
};

export default BookProperties;

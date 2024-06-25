import React from "react";
import { Book } from "../../interfaces";
import { calculateOfferPercentage, convertToBRL } from "../../infra/utils";
import Text from "@/atoms/Text";
import { BookImage } from "@/atoms/BookImage";

interface BookItemProps {
  book: Book;
  onClick?: () => void;
  horizontal?: boolean;
}

export const BookItemComponent = ({
  book,
  onClick,
  horizontal,
}: BookItemProps) => {
  const verticalClassName = `h-52 w-[150px] min-w-[150px] flex-col items-center justify-center max-[430px]:mx-auto max-[430px]:h-96 max-[430px]:w-[250px] sm:h-64 sm:w-[170px] sm:min-w-[170px]`;
  const horizontalClassName = `h-[250px] p-5`;

  return (
    <li
      onClick={onClick ? onClick : () => {}}
      className={`group relative flex cursor-pointer gap-3 rounded bg-white ${horizontal ? horizontalClassName : verticalClassName}`}
    >
      {book.offerInBRL && (
        <span
          className={`absolute ${horizontal ? "top-0" : "bottom-0"} right-0 rounded-br rounded-tl bg-red-50 p-1 text-sm text-default-red`}
        >
          {calculateOfferPercentage(book.priceInBRL, book.offerInBRL)}
        </span>
      )}
      <div className={`${horizontal ? "w-[170px]" : "h-2/3 w-4/6"}`}>
        <BookImage
          alt={book.title}
          className={`${!horizontal ? "" : "mx-auto w-full"} h-full object-cover shadow-lg duration-100 group-hover:scale-105`}
          image={book.Image}
        />
      </div>
      <div
        className={`${horizontal ? "flex w-full flex-col items-start gap-2" : "mx-auto w-4/5"}`}
      >
        <div>
          <Text
            Tag="h4"
            className={`truncate text-center text-gray-700 max-[430px]:text-lg`}
          >
            {book.title}
          </Text>
        </div>
        <div>
          <span
            className={`${horizontal ? "text-xl text-gray-800" : "text-default-red max-[430px]:text-lg"} font-semibold`}
          >
            {convertToBRL(book.offerInBRL || book.priceInBRL)}
          </span>
        </div>
      </div>
    </li>
  );
};

export const BookItem = React.memo(BookItemComponent);

import React, { useEffect, useState } from "react";
import { Book } from "../../interfaces";
import { getAllBooks } from "../../services/book/getAllBooks";
import { FaCircleInfo } from "react-icons/fa6";
import { BookImage } from "@/atoms/BookImage";
import Box from "../Box";
import Text from "@/atoms/Text";
import { convertToBRL } from "@/infra/utils";
import { useNavigate } from "react-router-dom";

const SponsoredBook = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [book, setBook] = useState<Book | undefined>();
  const navigate = useNavigate();

  const takeBook = async () => {
    setLoading(true);
    const booksAndTotal = await getAllBooks({ page: 1, size: 1 });
    setBook(booksAndTotal.books[0]);
    setLoading(false);
  };

  useEffect(() => {
    takeBook();
  }, []);

  return (
    <Box
      onClick={() => navigate(`/comic/${book?.id}`)}
      className="flex w-full cursor-pointer items-center justify-center text-black"
    >
      {!loading && book ? (
        <Box className="relative flex w-full items-start justify-center rounded bg-white p-8 shadow-lg">
          <Box className="absolute -bottom-6 right-0 flex items-start justify-center gap-1 text-sm font-semibold text-gray-400">
            <p>Patrocinado</p>
            <FaCircleInfo />
          </Box>
          <Box className="h-[200px] w-[220px]">
            <BookImage image={book.Image} className="h-full w-full" />
          </Box>
          <Box className="flex flex-col">
            <Text Tag="h2" className="text-lg font-semibold">
              {book.title}
            </Text>
            <Text>{book.description}</Text>
            <Box>
              <Text Tag="h3" className="text-green-700">
                {convertToBRL(book.offerInBRL || book.priceInBRL)}
              </Text>
            </Box>
          </Box>
        </Box>
      ) : loading ? (
        <p>Carregando...</p>
      ) : (
        <p>Erro ao carregar.</p>
      )}
    </Box>
  );
};

export default SponsoredBook;

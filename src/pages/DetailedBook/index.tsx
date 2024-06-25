import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { findBookById } from "../../services/book/findBookById";
import { Book } from "../../interfaces";
import Header from "../../organisms/Header";
import Box from "@/molecules/Box";
import { BookImage } from "@/atoms/BookImage";
import Text from "@/atoms/Text";
import BookProperties from "@/organisms/BookProperties";
import MainBox from "@/templates/MainBox";
import { Button } from "@/components/ui/button";
import BookSection from "@/organisms/BookSection";
import { calculateOfferPercentage, convertToBRL } from "@/infra/utils";
import { addToCart } from "@/services/book/addToCart";
import { getAllBooks } from "@/services/book/getAllBooks";
import { delToCart } from "@/services/book/delToCart";
import { BsFillCartPlusFill, BsFillCartXFill } from "react-icons/bs";

const DetailedBookPage = () => {
  const [book, setBook] = useState<Book | undefined>();
  const [inCart, setInCart] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const { id } = useParams();

  const breadcrumbItems = [
    {
      title: "Home",
      path: "/",
    },
    {
      title: "Quadrinhos",
      path: "/comics",
    },
    {
      title: "Quadrinho detalhado",
      path: `/comic/${id}`,
    },
  ];

  const takeBook = async () => {
    const book = await findBookById(id!);
    if (book) setBook(book);
  };

  const cartHandler = async () => {
    if (inCart) {
      await delToCart(id as string);
    } else {
      await addToCart(id as string);
    }
    setInCart(!inCart);
  };

  const verifyIfIsInCart = async () => {
    const booksAndTotal = await getAllBooks({
      page: 1,
      size: 1,
      id: `${id}`,
      inCart: true,
    });

    setInCart(booksAndTotal.books.length ? true : false);
  };

  useEffect(() => {
    setLoading(true);
    takeBook()
      .then(() => verifyIfIsInCart())
      .finally(() => setLoading(false));
  }, [id]);

  return !loading && book ? (
    <>
      <Header />
      <MainBox breadcrumbItems={breadcrumbItems}>
        <Box className="flex w-[1000px] flex-col gap-5">
          <Box className="mx-auto mt-10 grid w-full grid-cols-2 items-start rounded p-4">
            <Box className="flex h-[700px] w-full items-center">
              <BookImage alt={book.title} image={book.Image} />
            </Box>
            <Box className="flex h-full flex-col items-start gap-6">
              <Box>
                <Text Tag="h1">{book.title}</Text>
                <Text Tag="span">
                  Por: <b>{book.writerName}</b> (escritor)
                </Text>
                <Box className="mt-4 flex flex-col gap-0">
                  {book.offerInBRL && (
                    <Text className="text-lg">
                      <s>{convertToBRL(book.priceInBRL)}</s>
                    </Text>
                  )}
                  <Text
                    Tag="h2"
                    className="font-base flex items-center gap-2 text-3xl"
                  >
                    {convertToBRL(
                      book.offerInBRL ? book.offerInBRL : book.priceInBRL,
                    )}
                    {book.offerInBRL && (
                      <b className="text-xl font-light text-green-600">
                        {calculateOfferPercentage(
                          book.priceInBRL,
                          book.offerInBRL!,
                        )}{" "}
                        OFF
                      </b>
                    )}
                  </Text>
                </Box>
              </Box>
              <Box className="flex h-full w-full flex-col text-gray-600">
                <Text Tag="p" className="max-h-1/2 overflow-y-hidden">
                  {book.description}
                </Text>
                <BookProperties
                  omit={["title", "writerName", "priceInBRL"]}
                  book={book}
                />
              </Box>
              <Box className="flex w-full items-center justify-end gap-2">
                <Button
                  size="lg"
                  className="flex items-center gap-2 font-semibold"
                  onClick={cartHandler}
                  variant={inCart ? "default" : "green"}
                >
                  {!inCart ? (
                    <>
                      <BsFillCartPlusFill className="text-2xl" />
                      <Text>Adicionar no carrinho</Text>
                    </>
                  ) : (
                    <>
                      <BsFillCartXFill className="text-2xl" />
                      <Text>Remover do carrinho</Text>
                    </>
                  )}
                </Button>
              </Box>
            </Box>
          </Box>
          <BookSection size={15} filterBy="RELATED" />
        </Box>
      </MainBox>
    </>
  ) : loading ? (
    <p>Carregando...</p>
  ) : (
    <p>Sem livro</p>
  );
};

export default DetailedBookPage;

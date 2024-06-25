import React, { useEffect, useState } from "react";
import { Book } from "../../interfaces";
import { BookItem } from "../../molecules/BookItem";
import { getAllBooks } from "../../services/book/getAllBooks";
import { useNavigate, useParams } from "react-router-dom";
import BookItemSkeleton from "@/molecules/BookItemSkeleton";
import ScrollableList from "@/molecules/ScrollableList";
import Text from "@/atoms/Text";
import Box from "@/molecules/Box";
import { Button } from "@/components/ui/button";
import { IoIosReturnRight } from "react-icons/io";
import EmptyMessage from "@/atoms/EmptyMessage";

type TFilterBy = "OFFER" | "USERPREFERENCE" | "RELATED";

interface BookSectionProps {
  filterBy: TFilterBy;
  size: number;
}

const BookSection = (props: BookSectionProps) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [books, setBooks] = useState<Book[]>([]);
  const bookId = useParams().id;
  const navigate = useNavigate();
  const filters: {
    [key in TFilterBy]: { title: string; reqFilter: object };
  } = {
    OFFER: { title: "Quadrinhos em Oferta", reqFilter: { inOffer: true } },
    USERPREFERENCE: {
      title: "Talvez você goste",
      reqFilter: { userPreference: true },
    },
    RELATED: { title: "Relacionados", reqFilter: { related: bookId } },
  };

  useEffect(() => {
    takeBooks();
  }, []);

  const takeBooks = async () => {
    setLoading(true);

    const booksAndTotal = await getAllBooks({
      page: 1,
      size: props.size,
      deleted: false,
      ...filters[props.filterBy].reqFilter,
    });

    setBooks(booksAndTotal.books);
    setLoading(false);
  };

  const SkeletonBooks = () => {
    const emptyArray = Array.from({ length: props.size });

    return emptyArray.map((_, i) => <BookItemSkeleton key={i} />);
  };

  return (
    <section className="relative flex w-full select-none flex-col items-start justify-center gap-4 overflow-x-visible">
      {!loading && books.length ? (
        <>
          <h3 className="text-2xl text-gray-600">
            {filters[props.filterBy].title}
          </h3>
          <div className="relative flex w-full items-center">
            <ScrollableList className="no-scrollbar flex w-full gap-4 overflow-x-scroll rounded bg-white p-6 shadow-lg">
              {books.map((book) => {
                if (book.id === bookId) return null;

                return (
                  <BookItem
                    onClick={() => navigate(`/comic/${book.id}`)}
                    key={book.id}
                    book={book}
                  />
                );
              })}
              <Box className="my-auto w-[200px]">
                <Button
                  onClick={() => navigate("/comics")}
                  className="flex items-center gap-2 text-white"
                >
                  <IoIosReturnRight className="text-xl" />
                  <Text Tag="p">Ver mais</Text>
                </Button>
              </Box>
            </ScrollableList>
          </div>
        </>
      ) : loading ? (
        <>
          <div className="h-4 w-56 animate-pulse bg-gray-300"></div>
          <ul className="no-scrollbar flex w-full gap-4 overflow-x-scroll rounded bg-white p-6 shadow-lg">
            <SkeletonBooks />
          </ul>
        </>
      ) : (
        <EmptyMessage />
      )}
    </section>
  );
};

export default BookSection;

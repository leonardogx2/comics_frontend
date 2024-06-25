import React, { useEffect, useState } from "react";
import { getAllBooks } from "../../services/book/getAllBooks";
import { Book } from "../../interfaces";
import { BookItem } from "../../molecules/BookItem";
import ModalBookDetails from "../../organisms/ModalBookDetails";
import MainBox from "@/templates/MainBox";
import { useAuthContext } from "@/context/userContext";

const HubBooksPage = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [selectedBookId, setSelectedBookId] = useState<string | undefined>();
  const [isDefaultModalVisible, setIsDefaultModalVisible] =
    useState<boolean>(false);
  const { user } = useAuthContext();

  const takeUserBooks = async () => {
    const booksAndTotal = await getAllBooks({
      page: 1,
      size: 100,
      ownerId: user?.id,
    });
    setBooks(booksAndTotal.books);
  };

  useEffect(() => {
    takeUserBooks();
  }, []);

  const handleBookClick = (bookId: string) => {
    return () => {
      setSelectedBookId(bookId);
      setIsDefaultModalVisible(true);
    };
  };

  return (
    <>
      <ModalBookDetails
        withManagementButtons={false}
        isVisible={isDefaultModalVisible}
        onClose={() => setIsDefaultModalVisible(false)}
        bookId={selectedBookId}
      />
      <MainBox transparent large withAside title="Meus quadrinhos">
        <ul className="flex min-h-[800px] flex-wrap gap-4 bg-white p-4">
          {books.length ? (
            books.map((book) => (
              <BookItem
                onClick={handleBookClick(book.id)}
                key={book.id}
                book={book}
              />
            ))
          ) : (
            <></>
          )}
        </ul>
      </MainBox>
    </>
  );
};

export default HubBooksPage;

import { Book } from "@/interfaces";
import React from "react";
import { BookItem } from "../BookItem";
import { useNavigate } from "react-router-dom";
import EmptyMessage from "@/atoms/EmptyMessage";

interface BookListProps {
  books?: Book[];
  loading: boolean;
}

const BookList = ({ books, loading }: BookListProps) => {
  const navigate = useNavigate();

  return !loading && books && books.length ? (
    <ul>
      {books.map((book) => (
        <BookItem
          onClick={() => navigate(`/comic/${book.id}`)}
          horizontal
          key={book.id}
          book={book}
        />
      ))}
    </ul>
  ) : loading ? (
    <p>Carregando...</p>
  ) : (
    <EmptyMessage />
  );
};

export default BookList;

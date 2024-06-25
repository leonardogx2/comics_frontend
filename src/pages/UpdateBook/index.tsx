import { Book } from "@/interfaces";
import MainBox from "@/templates/MainBox";
import BookForm from "@/organisms/BookForm";
import { findBookById } from "@/services/book/findBookById";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const UpdateBookPage = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [book, setBook] = useState<Book | undefined>();
  const { id } = useParams();

  const takeBook = async () => {
    setLoading(true);
    const resBook = await findBookById(id as string);
    setBook(resBook);
    setLoading(false);
  };

  useEffect(() => {
    takeBook();
  }, []);

  return (
    <MainBox withAside large transparent title="Editar quadrinho">
      <BookForm loading={loading} data={book} />
    </MainBox>
  );
};

export default UpdateBookPage;

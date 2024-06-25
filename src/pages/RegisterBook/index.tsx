import BookForm from "@/organisms/BookForm";
import MainBox from "@/templates/MainBox";
import React from "react";

const RegisterBookPage = () => {
  return (
    <MainBox withAside large transparent title="Cadastrar quadrinho">
      <BookForm loading={false} />
    </MainBox>
  );
};

export default RegisterBookPage;

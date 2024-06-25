import MainBox from "@/templates/MainBox";
import Box from "@/molecules/Box";
import React from "react";
import RegisterForm from "@/organisms/RegisterForm";

const RegisterUserPage = () => {
  return (
    <MainBox title="Criar conta" transparent>
      <Box className="absolute left-0 top-0 flex h-screen w-screen items-center justify-center">
        <RegisterForm />
      </Box>
    </MainBox>
  );
};

export default RegisterUserPage;

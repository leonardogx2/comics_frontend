import Box from "@/molecules/Box";
import LoginForm from "@/organisms/LoginForm";
import MainBox from "@/templates/MainBox";
import React from "react";

const LoginUserPage = () => {
  return (
    <MainBox title="Entrar na conta" transparent>
      <Box className="absolute left-0 top-0 flex h-screen w-screen items-center justify-center">
        <LoginForm />
      </Box>
    </MainBox>
  );
};

export default LoginUserPage;

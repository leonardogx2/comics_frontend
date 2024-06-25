import DefaultLink from "@/atoms/Link";
import DefaultInput from "@/molecules/DefaultInput";
import React, { useState } from "react";
import Text from "@/atoms/Text";
import { Button } from "@/components/ui/button";
import { MdMail, MdKey, MdPerson } from "react-icons/md";
import DefaultSwitch from "@/molecules/DefaultSwitch";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { TRegisterUserSchema, registerUserSchema } from "./validator";
import { toast } from "@/components/ui/use-toast";
import { isAxiosError } from "axios";
import { registerUser } from "@/services/user/register";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TRegisterUserSchema>({
    resolver: zodResolver(registerUserSchema),
  });
  const [submited, setSubmited] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleUserSubmit = async (data: TRegisterUserSchema) => {
    if (submited) return;
    setSubmited(true);
    try {
      await registerUser(data).then(() => navigate("/login"));
      toast({
        title: "Cadastrado com sucesso!",
        description: "Estamos lhe redirecionando para o login...",
      });
    } catch (err) {
      if (isAxiosError(err)) {
        toast({
          title: "Erro ao se cadastrar",
          description: err.response?.data.message,
        });
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleUserSubmit)}
      className="flex w-[320px] flex-col gap-6 p-2 sm:w-[400px]"
    >
      <DefaultInput
        {...register("name")}
        error={errors["name"]?.message}
        Icon={MdPerson}
        label="Nome"
      />
      <DefaultInput
        {...register("email")}
        error={errors["email"]?.message}
        Icon={MdMail}
        label="E-mail"
        type="email"
      />
      <DefaultInput
        {...register("password")}
        error={errors["password"]?.message}
        Icon={MdKey}
        type="password"
        label="Senha"
      />
      <DefaultInput
        {...register("confirmPassword")}
        error={errors["confirmPassword"]?.message}
        Icon={MdKey}
        type="password"
        label="Confirmar senha"
      />
      <DefaultSwitch
        onCheckedChange={(value) => setValue("isSeller", value)}
        horizontal
        label="Sou vendedor"
      />
      <Button variant="blue" className="mt-4">
        Criar conta
      </Button>
      <Text Tag="p" className="mx-auto text-sm text-gray-500">
        Já possui uma conta? <DefaultLink to="/login">Entre aqui</DefaultLink>
      </Text>
    </form>
  );
};

export default RegisterForm;

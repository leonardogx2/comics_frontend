import DefaultLink from "@/atoms/Link";
import Text from "@/atoms/Text";
import { Button } from "@/components/ui/button";
import DefaultInput from "@/molecules/DefaultInput";
import DefaultSwitch from "@/molecules/DefaultSwitch";
import React, { useState } from "react";
import { MdKey, MdMail } from "react-icons/md";
import { TLoginUserSchema, loginUserSchema } from "./validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useAuthContext } from "@/context/userContext";
import { toast } from "@/components/ui/use-toast";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TLoginUserSchema>({
    resolver: zodResolver(loginUserSchema),
  });
  const [submited, setSubmited] = useState<boolean>(false);
  const { signIn } = useAuthContext();

  const handleLoginSubmit = async (data: TLoginUserSchema) => {
    if (submited) return;
    setSubmited(true);
    const { isSigned, message } = await signIn(data);
    if (!isSigned) {
      toast({ title: "Erro ao entrar", description: message });
    } else {
      window.location.assign("/");
    }
    setSubmited(false);
  };

  return (
    <form
      onSubmit={handleSubmit(handleLoginSubmit)}
      className="flex w-[320px] flex-col gap-6 p-2 sm:w-[400px]"
    >
      <DefaultInput
        error={errors["email"]?.message}
        {...register("email")}
        Icon={MdMail}
        label="E-mail"
        type="email"
      />
      <DefaultInput
        error={errors["email"]?.message}
        {...register("password")}
        Icon={MdKey}
        type="password"
        label="Senha"
      />
      <DefaultSwitch
        onCheckedChange={(value) => setValue("keepSession", value)}
        horizontal
        label="Continuar conectado"
      />
      <Button variant="blue" className="mt-4">
        Entrar
      </Button>
      <Text Tag="p" className="mx-auto text-sm text-gray-500">
        Não possui uma conta?{" "}
        <DefaultLink to="/register">Crie aqui</DefaultLink>
      </Text>
    </form>
  );
};

export default LoginForm;

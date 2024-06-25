import { Button } from "@/components/ui/button";
import { CreateOrderControllerDTO, PaymentMethod } from "@/interfaces";
import Box from "@/molecules/Box";
import DefaultInput from "@/molecules/DefaultInput";
import DefaultRadio from "@/molecules/DefaultRadio";
import { DefaultSelect } from "@/molecules/DefaultSelect";
import React, { useEffect, useState } from "react";
import {
  TCreateOrderSchema,
  createOrderSchema,
  paymentOptions,
  plotOptions,
} from "./validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { IoWarningSharp } from "react-icons/io5";
import Text from "@/atoms/Text";

interface PaymentFormProps {
  onSubmit: (data: CreateOrderControllerDTO) => void;
  defaultData: CreateOrderControllerDTO | undefined;
}

const PaymentForm = ({ onSubmit, defaultData }: PaymentFormProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TCreateOrderSchema>({
    resolver: zodResolver(createOrderSchema),
  });
  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethod>("CREDITCARD");
  const [plots, setPlots] = useState<number>(1);

  useEffect(() => {
    if (defaultData) {
      setPaymentMethod((defaultData.method || "CREDITCARD") as PaymentMethod);
      setPlots(defaultData.plots || 1);
    }
  }, [defaultData]);

  useEffect(() => {
    setValue("method", paymentMethod);
  }, [paymentMethod]);

  useEffect(() => {
    setValue("plots", plots);
  }, [plots]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      <Text Tag="h2">Endereço</Text>
      <Box className="flex flex-col">
        <Box className="grid grid-cols-[0.6fr_0.4fr]">
          <DefaultInput
            {...register("state")}
            defaultValue={defaultData?.state}
            error={errors["state"]?.message}
            label="Estado"
          />
          <DefaultInput
            {...register("cep")}
            defaultValue={defaultData?.cep}
            error={errors["cep"]?.message}
            label="Cep"
            type="number"
          />
        </Box>
        <Box className="grid grid-cols-2">
          <DefaultInput
            {...register("city")}
            defaultValue={defaultData?.city}
            error={errors["city"]?.message}
            label="Cidade"
          />
          <DefaultInput
            {...register("neighborhood")}
            defaultValue={defaultData?.neighborhood}
            error={errors["neighborhood"]?.message}
            label="Bairro"
          />
        </Box>
        <Box className="grid grid-cols-[1fr_100px]">
          <DefaultInput
            {...register("streetName")}
            defaultValue={defaultData?.streetName}
            error={errors["streetName"]?.message}
            label="Rua"
          />
          <DefaultInput
            {...register("streetNumber")}
            defaultValue={defaultData?.streetNumber}
            error={errors["streetNumber"]?.message}
            label="Número"
            type="number"
          />
        </Box>
        <Text className="flex items-center gap-1 self-center text-gray-600">
          <IoWarningSharp /> Atenção: Aceitamos apenas pedidos dentro do país.
        </Text>
        <Text Tag="h2">Pagamento</Text>
        <DefaultRadio
          options={paymentOptions}
          onValueChange={(value) => {
            setPaymentMethod(value as PaymentMethod);
          }}
          defaultValue={defaultData?.method || "CREDITCARD"}
        />
        {["CREDITCARD", "DEBITCARD"].includes(paymentMethod) ? (
          <Box className="flex flex-col">
            <Box className="grid grid-cols-[0.8fr_0.2fr]">
              <DefaultInput
                {...register("name")}
                defaultValue={defaultData?.name}
                error={errors["name"]?.message}
                label="Nome do titular"
              />
              <DefaultInput
                {...register("cvv")}
                defaultValue={defaultData?.cvv}
                error={errors["cvv"]?.message}
                label="Cvv"
              />
            </Box>
            <Box
              className={`grid ${paymentMethod === "CREDITCARD" ? "grid-cols-[0.6fr_0.2fr_0.2fr]" : "grid-cols-[0.8fr_0.2fr]"}`}
            >
              <DefaultInput
                {...register("cardCode")}
                defaultValue={defaultData?.cardCode}
                error={errors["cardCode"]?.message}
                label="Número do cartão"
              />
              <DefaultInput
                {...register("expirationDate")}
                defaultValue={defaultData?.expirationDate}
                error={errors["expirationDate"]?.message}
                label="Data de validade"
                type="date"
              />
              {paymentMethod === "CREDITCARD" && (
                <DefaultSelect
                  error={errors["plots"]?.message}
                  label="Parcelas"
                  defaultValue={defaultData?.plots || 1}
                  options={plotOptions}
                  onValueChange={(value) => {
                    setPlots(parseInt(value));
                  }}
                />
              )}
            </Box>
          </Box>
        ) : (
          <Box>
            <Box className="grid grid-cols-2">
              <DefaultInput
                {...register("name")}
                error={errors["name"]?.message}
                defaultValue={defaultData?.name}
                label="Nome completo"
              />
              <DefaultInput
                {...register("cpf")}
                error={errors["cpf"]?.message}
                defaultValue={defaultData?.cpf}
                label="CPF"
              />
            </Box>
          </Box>
        )}
      </Box>
      <Button
        onClick={() => console.log(errors)}
        type="submit"
        variant="blue"
        className="self-end"
      >
        Revisar e efetuar compra
      </Button>
    </form>
  );
};

export default PaymentForm;

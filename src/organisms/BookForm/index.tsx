import DefaultInput from "@/molecules/DefaultInput";
import DefaultTextarea from "@/molecules/DefaultTextarea";
import ImageInput from "@/molecules/ImageInput";
import Box from "@/molecules/Box";
import React, { useEffect, useState } from "react";
import { DefaultSelect } from "@/molecules/DefaultSelect";
import { Button } from "@/components/ui/button";
import { MdOutlineAdd } from "react-icons/md";
import Text from "@/atoms/Text";
import { TiCancel } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createBook } from "@/services/book/createBook";
import {
  TRegisterBookSchema,
  TUpdateBookSchema,
  registerBookSchema,
  updateBookSchema,
} from "./validator";
import { Book } from "@/interfaces";
import { updateBook } from "@/services/book/updateBook";
import { useToast } from "@/components/ui/use-toast";
import { categorySelectOptions } from "@/infra/utils";

interface BookFormProps {
  data?: Book;
  loading: boolean;
}

const BookForm = ({ data, loading }: BookFormProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TRegisterBookSchema>({
    resolver: zodResolver(!data ? registerBookSchema : updateBookSchema),
  });
  const navigate = useNavigate();
  const [price, setPrice] = useState("");
  const [offer, setOffer] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    if (data) {
      setValue("title", data.title);
      setValue("releaseYear", data.releaseYear);
      setValue("writerName", data.writerName);
      setValue("pencillerName", data.pencillerName);
      setValue("coverArtistName", data.coverArtistName);
      setValue("category", data.category);
      setValue("priceInBRL", data.priceInBRL);
      setValue("offerInBRL", data.offerInBRL);
      setValue("description", data.description);
      setPrice(`R$ ${data.priceInBRL}`);
      if (data.offerInBRL) setOffer(`R$ ${data.offerInBRL}`);
    }
  }, [loading]);

  useEffect(() => {
    console.log({ errors });
  }, [errors]);

  const handleBookSubmit = async (
    bookData: TRegisterBookSchema | TUpdateBookSchema,
  ) => {
    if (!data) {
      await createBook(bookData);
      toast({
        title: "Sucesso!",
        description: "Seu quadrinho foi cadastrado.",
      });
      navigate("/hub/comics");
    } else {
      await updateBook({
        ...bookData,
        id: data.id,
      });
      toast({
        title: "Sucesso!",
        description: "Seu quadrinho foi atualizado.",
      });
      navigate("/hub/comics");
    }
  };

  const handleBRLChange = (target: "price" | "offer") => {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      let value = event.target.value.replace(/[^\d]/g, "");

      if (value.length === 0) {
        if (target === "price") {
          setPrice("");
          setValue("priceInBRL", 0);
        } else {
          setOffer("");
          setValue("offerInBRL", 0);
        }
        return;
      }

      value = (Number(value) / 100).toFixed(2);

      if (target === "price") {
        setPrice(`R$ ${value}`);
        setValue("priceInBRL", parseFloat(value));
      } else {
        setOffer(`R$ ${value}`);
        setValue("offerInBRL", parseFloat(value));
      }
    };
  };

  const handleSelectChange = (value: string) => {
    setValue("category", value);
  };

  const handleImageChange = (file: File) => {
    setValue("image", file);
  };

  if (loading) return <p>Carregando...</p>;

  return (
    <form onSubmit={handleSubmit(handleBookSubmit)}>
      <Box>
        <Box variant="default" className="grid grid-cols-[330px_1fr] pt-20">
          <Box>
            <ImageInput
              width={330}
              height={480}
              error={errors["image"]?.message}
              onImageChange={handleImageChange}
              defaultValue={
                data
                  ? data.Image?.local
                    ? `${import.meta.env.VITE_API_URL}/public/uploads/${data.Image.name}`
                    : data.Image?.url
                  : undefined
              }
            />
          </Box>
          <Box className="flex flex-col gap-6">
            <Box className="grid grid-cols-[0.8fr_0.2fr]">
              <DefaultInput
                error={errors["title"]?.message}
                label="Título"
                {...register("title")}
              />
              <DefaultInput
                label="Ano de lançamento"
                type="number"
                error={errors["releaseYear"]?.message}
                {...register("releaseYear")}
              />
            </Box>
            <Box className="grid grid-cols-3">
              <DefaultInput
                error={errors["writerName"]?.message}
                {...register("writerName")}
                label="Escritor"
              />
              <DefaultInput
                error={errors["pencillerName"]?.message}
                {...register("pencillerName")}
                label="Pintor geral"
              />
              <DefaultInput
                error={errors["coverArtistName"]?.message}
                {...register("coverArtistName")}
                label="Pintor da capa"
              />
            </Box>
            <Box className="grid grid-cols-2 items-center justify-between">
              <DefaultSelect
                onValueChange={handleSelectChange}
                error={errors["category"]?.message}
                options={categorySelectOptions}
                label="Categoria"
                placeholder="Selecione uma categoria"
                defaultValue={data?.category}
              />
              <Box className="grid grid-cols-2">
                <DefaultInput
                  error={errors["priceInBRL"]?.message}
                  value={price}
                  onChange={handleBRLChange("price")}
                  label="Preço original"
                />
                <DefaultInput
                  label="Preço em oferta"
                  error={errors["offerInBRL"]?.message}
                  value={offer}
                  onChange={handleBRLChange("offer")}
                />
              </Box>
            </Box>
            <Box className="h-full">
              <DefaultTextarea
                error={errors["description"]?.message}
                {...register("description")}
                label="Descrição"
              />
            </Box>
          </Box>
        </Box>
        <Box variant="default" className="flex justify-end">
          <Button
            onClick={() => navigate("/hub/comics")}
            type="reset"
            variant="outline"
            className="flex w-[150px] cursor-pointer gap-2 text-xl"
          >
            <Box className="flex gap-2">
              <TiCancel />
              <Text>Cancelar</Text>
            </Box>
          </Button>
          <Button
            type="submit"
            variant={data ? "blue" : "default"}
            className="flex w-[150px] cursor-pointer items-center gap-2"
          >
            <Box className="flex gap-2">
              <MdOutlineAdd className="text-xl" />
              <Text>{!data ? "Registrar" : "Editar"}</Text>
            </Box>
          </Button>
        </Box>
      </Box>
    </form>
  );
};

export default BookForm;

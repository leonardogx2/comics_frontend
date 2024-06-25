import { Button } from "@/components/ui/button";
import Box from "@/molecules/Box";
import DefaultInput from "@/molecules/DefaultInput";
import { DefaultSelect } from "@/molecules/DefaultSelect";
import DefaultSwitch from "@/molecules/DefaultSwitch";
import React, { useEffect } from "react";
import { TFilterBoxSchema, filterBoxSchema } from "./validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { categorySelectOptions } from "@/infra/utils";
import { useSearchParams } from "react-router-dom";

const orderByOptions = [
  { label: "Maior preço", value: "bigPrice" },
  { label: "Menor preço", value: "lowPrice" },
  { label: "Mais vendidos", value: "mostSelled" },
  { label: "A - Z", value: "az" },
  { label: "Z - A", value: "za" },
];

interface FilterBoxProps {
  defaultFilters?: TFilterBoxSchema;
  loading?: boolean;
  onSubmit: () => void;
}

const FilterBox = ({ onSubmit, defaultFilters, loading }: FilterBoxProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TFilterBoxSchema>({
    resolver: zodResolver(filterBoxSchema),
  });
  const [_, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (defaultFilters) {
      setValue("author", defaultFilters.author);
      setValue("releaseYear", defaultFilters.releaseYear);
      setValue("startPrice", defaultFilters.startPrice);
      setValue("endPrice", defaultFilters.endPrice);
      setValue("category", defaultFilters.category);
      setValue("inOffer", defaultFilters.inOffer);
      setValue("inStock", defaultFilters.inStock);
      setValue("orderBy", defaultFilters.orderBy);
    }
  }, [defaultFilters]);

  const submitHandler = (data: TFilterBoxSchema) => {
    setSearchParams((prevFilters) => ({
      ...prevFilters,
      orderBy: data.orderBy,
      releaseYear: data.releaseYear,
      author: data.author,
      startPrice: data.startPrice,
      endPrice: data.endPrice || undefined,
      category: data.category,
      inOffer: data.inOffer,
      inStock: data.inStock,
    }));
    onSubmit();
  };

  return !loading ? (
    <form onSubmit={handleSubmit(submitHandler)}>
      <Box className="top-10 flex flex-col gap-4 sm:sticky">
        <DefaultSelect
          label="Ordenar por"
          options={orderByOptions}
          onValueChange={(value) => setValue("orderBy", value)}
          defaultValue={defaultFilters?.orderBy}
        />
        <Box className="grid grid-cols-[100px_1fr] gap-2">
          <DefaultInput
            {...register("releaseYear")}
            error={errors["releaseYear"]?.message}
            defaultValue={defaultFilters?.releaseYear}
            label="Ano"
            type="number"
          />
          <DefaultInput
            error={errors["author"]?.message}
            {...register("author")}
            defaultValue={defaultFilters?.author}
            label="Autor"
          />
        </Box>
        <Box className="flex items-center gap-2">
          <DefaultInput
            {...register("startPrice")}
            defaultValue={defaultFilters?.startPrice}
            error={errors["startPrice"]?.message}
            label="Preço inicial"
            type="text"
          />
          <DefaultInput
            {...register("endPrice")}
            defaultValue={defaultFilters?.endPrice}
            error={errors["endPrice"]?.message}
            label="Preço final"
            type="text"
          />
        </Box>
        <DefaultSelect
          label="Categoria"
          defaultValue={defaultFilters?.category || "any"}
          error={errors["category"]?.message}
          options={[
            { label: "Qualquer", value: "any" },
            ...categorySelectOptions,
          ]}
          onValueChange={(value) => setValue("category", value)}
        />
        <Box className="flex items-center justify-start">
          <DefaultSwitch
            onCheckedChange={(value) => setValue("inStock", value)}
            defaultChecked={
              defaultFilters?.inStock !== undefined
                ? defaultFilters?.inStock
                : true
            }
            label="Em estoque"
          />
          <DefaultSwitch
            onCheckedChange={(value) => setValue("inOffer", value)}
            defaultChecked={defaultFilters?.inOffer}
            label="Somente em oferta"
          />
        </Box>
        <Box className="flex items-center justify-between gap-4">
          <Button
            type="reset"
            onClick={() => {
              setSearchParams(undefined);
              onSubmit();
            }}
            className="px-8"
            variant="outline"
          >
            Limpar filtros
          </Button>
          <Button className="px-8" variant="blue">
            Filtrar
          </Button>
        </Box>
      </Box>
    </form>
  ) : (
    <p>Carregando...</p>
  );
};

export default FilterBox;

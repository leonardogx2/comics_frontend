import { z } from "zod";
import { BookCategory } from "@/interfaces";
import { categorySelectOptions } from "@/infra/utils";

export const filterBoxSchema = z.object({
  releaseYear: z.coerce
    .number()
    .optional()
    .transform((value) => (value ? Number(value) : undefined)),
  author: z.string().optional(),
  startPrice: z.coerce
    .number({
      invalid_type_error: "Preço inicial inválido.",
    })
    .refine((value) => !isNaN(value), "Preço inicial inválido.")
    .optional(),
  endPrice: z.coerce
    .number({
      invalid_type_error: "Preço final inválido.",
    })
    .refine((value) => !isNaN(value), "Preço final inválido.")
    .optional(),
  category: z
    .string()
    .refine(
      (value) =>
        Array.from(
          [...categorySelectOptions, { label: "Qualquer", value: "any" }],
          (option) => option.value,
        ).includes(value as BookCategory),
      "Categoria inválida",
    )
    .transform((value) => {
      if (value === "any") return undefined;
      return value;
    })
    .optional(),
  inStock: z.boolean().optional(),
  inOffer: z.boolean().optional(),
  orderBy: z.string().optional(),
});

export type TFilterBoxSchema = z.infer<typeof filterBoxSchema>;

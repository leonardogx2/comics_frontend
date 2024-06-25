import { categorySelectOptions } from "@/infra/utils";
import { BookCategory } from "@/interfaces";
import { z } from "zod";

export const registerBookSchema = z.object({
  title: z.string().min(3, "O título é obrigatório."),
  category: z
    .string()
    .refine(
      (value) =>
        Array.from(
          [...categorySelectOptions],
          (option) => option.value,
        ).includes(value as BookCategory),
      "Categoria inválida",
    ),
  releaseYear: z.coerce.number().min(4, "Ano de lançamento incorreto"),
  description: z.string().min(25, "A descrição é muito curta"),
  coverArtistName: z.string().min(3, "O pintor da capa é obrigatório"),
  pencillerName: z.string().min(3, "O pintor do quadrinho é obrigatório"),
  writerName: z.string().min(3, "O escritor do quadrinho é obrigatório"),
  priceInBRL: z.coerce
    .number({
      required_error: "O preço é obrigatório.",
      invalid_type_error: "Preço inválido.",
    })
    .refine((value) => !isNaN(value), "Preço inválido."),
  offerInBRL: z.coerce
    .number({
      required_error: "O preço é obrigatório.",
      invalid_type_error: "Preço inválido.",
    })
    .optional()
    .refine((value) => (value && !isNaN(value)) || !value, "Preço inválido."),
  image: z
    .instanceof(File, {
      message: "A imagem é obrigatória.",
    })
    .refine((file) => file.size > 0, {
      message: "A imagem é obrigatória.",
    })
    .refine((file) => file.size <= 1024 * 1024 * 10, {
      message: "A imagem é muito grande",
    }),
});

export const updateBookSchema = z.object({
  title: z.string().min(3, "O título é obrigatório.").optional(),
  category: z
    .string()
    .refine(
      (value) =>
        Array.from(
          [...categorySelectOptions],
          (option) => option.value,
        ).includes(value as BookCategory),
      "Categoria inválida",
    )
    .optional(),
  releaseYear: z.coerce
    .number()
    .min(4, "Ano de lançamento incorreto")
    .optional(),
  description: z.string().min(25, "A descrição é muito curta").optional(),
  coverArtistName: z
    .string()
    .min(3, "O pintor da capa é obrigatório")
    .optional(),
  pencillerName: z
    .string()
    .min(3, "O pintor do quadrinho é obrigatório")
    .optional(),
  writerName: z
    .string()
    .min(3, "O escritor do quadrinho é obrigatório")
    .optional(),
  priceInBRL: z.coerce
    .number({
      required_error: "O preço é obrigatório.",
      invalid_type_error: "Preço inválido.",
    })
    .refine((value) => !isNaN(value), "Preço inválido.")
    .optional(),
  offerInBRL: z.coerce
    .number({
      required_error: "O preço é obrigatório.",
      invalid_type_error: "Preço inválido.",
    })
    .optional()
    .refine((value) => (value && !isNaN(value)) || !value, "Preço inválido."),
  image: z
    .instanceof(File, {
      message: "A imagem é obrigatória.",
    })
    .refine((file) => file.size > 0, {
      message: "A imagem é obrigatória.",
    })
    .refine((file) => file.size <= 1024 * 1024 * 10, {
      message: "A imagem é muito grande",
    })
    .optional(),
});

export type TUpdateBookSchema = z.infer<typeof updateBookSchema>;
export type TRegisterBookSchema = z.infer<typeof registerBookSchema>;

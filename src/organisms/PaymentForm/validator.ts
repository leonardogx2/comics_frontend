import {
  isFutureDate,
  isValidCPF,
  isValidCVV,
  isValidCardNumber,
} from "@/infra/utils";
import { CreateOrderControllerDTO } from "@/interfaces";
import { z } from "zod";

const paths: string[] = [];

export const plotOptions = [
  {
    label: "1x",
    value: 1,
  },
  {
    label: "2x",
    value: 2,
  },
  {
    label: "3x",
    value: 3,
  },
  {
    label: "4x",
    value: 4,
  },
];

export const paymentOptions = [
  {
    label: "Cartão de crédito",
    value: "CREDITCARD",
  },
  {
    label: "Cartão de débito",
    value: "DEBITCARD",
  },
  {
    label: "Pix",
    value: "PIX",
  },
];

export const createOrderSchema = z
  .object({
    method: z
      .string({
        required_error: "O método de pagamento é obrigatório",
        invalid_type_error: "Método de pagamento inválido",
      })
      .refine(
        (value) => {
          return ["PIX", "CREDITCARD", "DEBITCARD"].includes(value);
        },
        {
          message: "Método de pagamento inválido",
        },
      ),
    name: z
      .string({
        required_error: "O nome é obrigatório",
        invalid_type_error: "Nome inválido",
      })
      .min(5, "O nome é muito curto"),
    cpf: z
      .string({ invalid_type_error: "Cpf inválido" })
      .refine(
        (value) => {
          return isValidCPF(value);
        },
        {
          message: "CPF inválido",
        },
      )
      .optional(),
    cardCode: z
      .string({ invalid_type_error: "Número de cartão inválido" })
      .optional(),
    expirationDate: z
      .string({ invalid_type_error: "Data de validade inválida" })
      .optional(),
    cvv: z.string({ invalid_type_error: "CVV inválido" }).optional(),
    plots: z
      .number({
        invalid_type_error: "Quantidade de parcelas inválida",
      })
      .optional(),
    state: z
      .string({
        required_error: "O estado é obrigatório",
        invalid_type_error: "Estado inválido",
      })
      .min(1, "Estado inválido"),
    cep: z
      .string({
        invalid_type_error: "Cep inválido",
        required_error: "Cep é obrigatório",
      })
      .min(1, "Cep inválido"),
    city: z
      .string({
        invalid_type_error: "Cidade inválida",
        required_error: "Cidade é obrigatória",
      })
      .min(1, "Cidade inválida"),
    neighborhood: z
      .string({
        required_error: "O bairro é obrigatório",
        invalid_type_error: "Bairro inválido",
      })
      .min(1, "Bairro inválido"),
    streetName: z
      .string({
        required_error: "O nome da rua é obrigatório",
        invalid_type_error: "Nome da rua inválido",
      })
      .min(1, "Nome da rua é obrigatório"),
    streetNumber: z
      .string({
        invalid_type_error: "Inválido",
        required_error: "Inválido",
      })
      .min(1, "Inválido"),
  })
  .superRefine((data, ctx) => {
    const paymentValidator = paymentValidators[data.method];
    if (!paymentValidator(data as CreateOrderControllerDTO, ctx)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Campo inválido",
        path: paths,
      });
    }
  });

export type TCreateOrderSchema = z.infer<typeof createOrderSchema>;

const paymentValidators: {
  [key: string]: (
    data: CreateOrderControllerDTO,
    ctx: z.RefinementCtx,
  ) => boolean;
} = {
  DEBITCARD: (data: CreateOrderControllerDTO, ctx: z.RefinementCtx) => {
    const validCardNumber = isValidCardNumber(`${data.cardCode}`);
    const validExpirationDate = isFutureDate(`${data.expirationDate}`);
    const validCVV = isValidCVV(`${data.cvv}`);

    if (!validCardNumber) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Número de cartão inválido",
        path: ["cardCode"],
      });
    }
    if (!validExpirationDate) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Data de validade inválida",
        path: ["expirationDate"],
      });
    }
    if (!validCVV) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "CVV inválido",
        path: ["cvv"],
      });
    }

    return validCardNumber && validExpirationDate && validCVV;
  },
  CREDITCARD: (data: CreateOrderControllerDTO, ctx: z.RefinementCtx) => {
    const validCardNumber = isValidCardNumber(`${data.cardCode}`);
    const validExpirationDate = isFutureDate(`${data.expirationDate}`);
    const validCVV = isValidCVV(`${data.cvv}`);
    const validPlots = typeof data.plots === "number" && data.plots > 0;

    if (!validCardNumber) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Número de cartão inválido",
        path: ["cardCode"],
      });
    }
    if (!validExpirationDate) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Data de validade inválida",
        path: ["expirationDate"],
      });
    }
    if (!validCVV) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "CVV inválido",
        path: ["cvv"],
      });
    }
    if (!validPlots) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Quantidade de parcelas inválida",
        path: ["plots"],
      });
    }

    return validCardNumber && validExpirationDate && validCVV && validPlots;
  },
  PIX: (data: CreateOrderControllerDTO, ctx: z.RefinementCtx) => {
    const validCPF = isValidCPF(`${data.cpf}`);
    if (!validCPF) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "CPF inválido",
        path: ["cpf"],
      });
    }
    return validCPF;
  },
};

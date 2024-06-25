import { z } from "zod";

export const loginUserSchema = z.object({
  email: z
    .string({
      required_error: "O e-mail é obrigatório",
      invalid_type_error: "E-mail inválido",
    })
    .email({ message: "E-mail inválido" }),
  keepSession: z
    .boolean({ invalid_type_error: "Propriedade keepSession inválida" })
    .default(false),
  password: z
    .string({
      required_error: "A senha é obrigatória",
      invalid_type_error: "Senha inválida",
    })
    .min(8, "A senha é muito curta"),
});

export type TLoginUserSchema = z.infer<typeof loginUserSchema>;

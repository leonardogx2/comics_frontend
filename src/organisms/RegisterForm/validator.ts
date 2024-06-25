import { verifyAvailableEmail } from "@/services/user/verifyAvailableEmail";
import { z } from "zod";

export const registerUserSchema = z
  .object({
    name: z
      .string({
        required_error: "O nome é obrigatório",
        invalid_type_error: "Nome inválido",
      })
      .min(8, "O nome é muito curto"),
    email: z
      .string({
        required_error: "O e-mail é obrigatório",
        invalid_type_error: "E-mail inválido",
      })
      .email({ message: "E-mail inválido" })
      .refine(
        async (email) => {
          try {
            const { available } = await verifyAvailableEmail(email);
            return available;
          } catch (err) {
            console.log(
              "Erro ao verificar se já existe uma conta com o e-mail.",
            );
            return false; 
          }
        },
        { message: "Já possui uma conta com esse e-mail." },
      ),
    isSeller: z
      .boolean({ invalid_type_error: "Propriedade isSeller inválida" })
      .default(false),
    password: z
      .string({
        required_error: "A senha é obrigatória",
        invalid_type_error: "Senha inválida",
      })
      .min(8, "A senha é muito curta"),
    confirmPassword: z
      .string({
        required_error: "A senha é obrigatória",
        invalid_type_error: "Senha inválida",
      })
      .min(8, "A senha é muito curta"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

export type TRegisterUserSchema = z.infer<typeof registerUserSchema>;

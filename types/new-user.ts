import z from "zod"

export const registerFormSchema = z.object({
  first_name: z.string().min(3, { message: "O nome deve ter pelo menos 3 caracteres." }),
  last_name: z.string().min(3, { message: "O sobrenome deve ter pelo menos 3 caracteres." }),
  email: z.string().email({ message: "Por favor, insira um email válido." }),
  password: z.string().min(6, { message: "A senha deve ter pelo menos 6 caracteres." }),
  password_confirmation: z.string(),
}).refine(data => data.password === data.password_confirmation, {
  message: "As senhas não coincidem.",
  path: ["password_confirmation"]
});
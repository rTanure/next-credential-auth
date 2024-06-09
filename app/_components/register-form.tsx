"use client"

import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { signIn } from "next-auth/react"

import z from "zod"
import { useToast } from "@/components/ui/use-toast"

const registerFormSchema = z.object({
  first_name: z.string().min(3, { message: "O nome deve ter pelo menos 3 caracteres." }),
  last_name: z.string().min(3, { message: "O sobrenome deve ter pelo menos 3 caracteres." }),
  email: z.string().email({ message: "Por favor, insira um email válido." }),
  password: z.string().min(6, { message: "A senha deve ter pelo menos 6 caracteres." }),
  password_confirmation: z.string(),
}).refine(data => data.password === data.password_confirmation, {
  message: "As senhas não coincidem.",
  path: ["password_confirmation"]
});

export default function RegisterForm() {
  const { toast } = useToast()

  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
  })

  const handleSubmit = (values: z.infer<typeof registerFormSchema>) => {
    fetch("/api/user/create-first", {
      method: "POST",
      body: JSON.stringify(values),
      headers: { "Content-Type": "application/json" }
    })
      .then(res => res.ok)
      .then(() => {
        toast({
          title: "Conta criada com sucesso",
          description: "Você já pode fazer login com as credenciais fornecidas. O usuário criado é um administrador.",
        })
      })
      .catch(() => {
        toast({
          title: "Erro ao criar conta",
          description: "Ocorreu um erro ao criar a conta. Por favor, tente novamente.",
          variant: "destructive"
        })
      })
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <Card className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg dark:bg-gray-800">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Registre-se</CardTitle>
          <CardDescription className="text-gray-500 dark:text-gray-400">
            Crie uma conta para acessar o sistema.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-2">

              <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite o seu nome" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="last_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sobrenome</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite o seu sobrenome" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite o seu email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite o sua senha" type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password_confirmation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirme a senha</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite a senha novamente" type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="w-full flex justify-end bt-2">
                <Button type="submit" >Login</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
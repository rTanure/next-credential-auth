"use client"

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod"

import { registerFormSchema } from "@/types/new-user";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

function generatePassword() {
  return Math.random().toString(36).slice(2)
}

export function NewUserForm() {
  const password = generatePassword()
  const {toast} = useToast()

  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: password,
      password_confirmation: password,
    },
  })

  function onSubmit(values: z.infer<typeof registerFormSchema>) {
    fetch("/api/user", {
      method: "POST",
      body: JSON.stringify(values),
      headers: { "Content-Type": "application/json" }
    })
      .then(res => res.ok)
      .then(() => {
        toast({
          title: "User created",
          description: "User created"
        })
      })
      .catch((e) => {
        console.log(e)
        toast({
          title: "Error",
          description: "Error",
          variant: "destructive"
        })
      })

    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 my-4">
        <FormField
          control={form.control}
          name="first_name"
          render={({ field }) => (
            <FormItem className="space-y-0">
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input placeholder="Nome do novo integrante" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="last_name"
          render={({ field }) => (
            <FormItem className="space-y-0">
              <FormLabel>Sobrenome</FormLabel>
              <FormControl className="mt-0">
                <Input placeholder="Sobrenome do novo integrante" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />  

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="space-y-0">
              <FormLabel>Email</FormLabel>
              <FormControl className="mt-0">
                <Input placeholder="Email do novo integrante" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="space-y-0">
              <FormLabel>Senha</FormLabel>
              <FormControl className="mt-0">
                <Input className="cursor-text disabled:cursor-text disabled:opacity-1" disabled {...field}  />
              </FormControl>
              <FormDescription>
                A senha foi gerada automaticamente. Copie ele e envie para o novo integrante. Você não poderá ver essa senha novamente.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />  

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
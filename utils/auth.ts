import { NextAuthOptions } from "next-auth";

import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "./db";
import { Adapter } from "next-auth/adapters";
import Credentials from "next-auth/providers/credentials";

export const authOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    Credentials({

      name: "Credentials",

      credentials: {
        email: { label: "Email", type: "text" },
        password: {  label: "Password", type: "password" }
      },

      async authorize(credentials, req) {
        
        const res = await fetch("/api/login", {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" }
        })

        const user = await res.json()

        if(res.ok && user) {
          return user
        }

        return null

      }

    }),
  ]
} satisfies NextAuthOptions
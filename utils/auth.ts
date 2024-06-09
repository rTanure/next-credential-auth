import NextAuth from "next-auth";

import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "./db";

import CredentialsProvider from "next-auth/providers/credentials";

export const {
  handlers: {GET, POST},
  auth
} = NextAuth({
  pages: {
    signIn: "/auth",
    signOut: "/auth",
    error: "/auth",
    verifyRequest: "/auth",
    newUser: "/app"
  },
  secret: process.env.NEXT_SECRET,
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({

      name: "Credentials",

      credentials: {
        email: { label: "Email", type: "text" },
        password: {  label: "Password", type: "password" }
      },

      async authorize(credentials, req) {
        
        const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/login`, {
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
})
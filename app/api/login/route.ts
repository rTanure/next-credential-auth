import prisma from "@/utils/db"
import { NextApiRequest, NextApiResponse } from "next"
import { verifyPassword } from "@/utils/bcrypt";

export async function POST(request: Request) {
  const { email, password } = await request.json() as { email: string, password: string }

  const user = await prisma.user.findFirst({
    where: {
      email
    }
  })

  if (!user) {
    return Response.json({ error: "Invalid credentials" }, { status: 401 })
  }

  if(!user.password) return user

  const passwordMatch = await verifyPassword(password, user.password)

  if (!passwordMatch) {
    return Response.json({ error: "Invalid credentials" }, { status: 401 })
  }

  const session = {
    id: user.id,
    email: user.email,
    name: user.first_name + " " + user.last_name,
    role: user.role
  }

  return Response.json(session, { status: 200 })
}
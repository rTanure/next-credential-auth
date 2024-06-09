import prisma from "@/utils/db"
import { NextApiRequest, NextApiResponse } from "next"
import { compare } from "bcryptjs";

export async function POST (req: NextApiRequest, res: NextApiResponse) {
  const { email, password } = req.body

  const user = await prisma.user.findFirst({
    where: {
      email
    },
    include: {
      role: true
    }
  })

  if (!user) {
    return res.status(401).json({ error: "Invalid credentials" })
  }

  if(!user.password) return user

  const passwordMatch = await compare(password, user.password)

  if (!passwordMatch) {
    return res.status(401).json({ error: "Invalid credentials" })
  }

  const session = {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role
  }

  return res.status(200).json(session)
}
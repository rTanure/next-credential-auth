import { auth } from "@/utils/auth";
import prisma from "@/utils/db";
import { registerFormSchema } from "@/types/new-user";

export async function GET() {
  const section = await auth()

  const users = await prisma.user.findMany({
    select: {
      id: true,
      first_name: true,
      last_name: true,
      email: true,
      role: true,
      
    }
  })

  if (users.filter(user => user.email === section?.user?.email).length === 0){
    return new Response("not authorized", { status: 401 })
  }

  return new Response(JSON.stringify(users), { status: 200 })
}

export async function POST(request: Request) {
  const ROLES_ALLOWED = ["admin"]

  const body = await request.json()

  // Valida o body da requisição
  const newUser = registerFormSchema.safeParse(body)
  if(!newUser.success) return new Response(JSON.stringify(newUser.error), { status: 400 })


  // Verifica se o usuário que está fazendo a requisição é tem permissão para criar um novo usuário
  const section = await auth()
  if(!section?.user?.email) return new Response("not authorized 1", { status: 401 })
  const user = await prisma.user.findUnique({
    where: {
      email: section?.user?.email
    }
  })
  if(!user || ROLES_ALLOWED.includes(user.role)) return new Response("not authorized 1 ", { status: 401 })

  const createdNewUser = await prisma.user.create({
    data: {
      first_name: newUser.data.first_name,
      last_name: newUser.data.last_name,
      email: newUser.data.email,
      password: newUser.data.password,
      role: "USER"
    }
  })
  if(!createdNewUser) return new Response("erro ao criar um novo usuário", { status: 500 })

  return new Response("new user created", { status: 201 })
}
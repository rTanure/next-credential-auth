import prisma from "@/utils/db";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json()

  const USERS_COUNT = await prisma.user.count();
  if(USERS_COUNT > 0) return new Response("not authorized", { status: 400 })

  await prisma.user.create({
    data: {
      first_name: body.first_name,
      last_name: body.last_name,
      email: body.email,
      password: body.password,
    }
  })

    
  return new Response(JSON.stringify(body), {
    headers: {
      "Content-Type": "application/json"
    }
  })
}
import { auth } from "@/utils/auth";
import LoginForm from "../_components/login-form";
import prisma from "@/utils/db";
import RegisterForm from "../_components/register-form";

export default async function LoginPage() {
  const USERS_COUNT = await prisma.user.count();

  if(USERS_COUNT == 0) return <RegisterForm />
  return <LoginForm /> 
  
}
import bcrypt from "bcryptjs"

const SALT_ROUNDS = 10

export async function hashPassword(password: string) {
  const salt = await bcrypt.genSalt(SALT_ROUNDS)
  const hashedPassword = await bcrypt.hash(password, salt)
  return hashedPassword
}

export async function verifyPassword(plainPassword: string, hashedPassword: string) {
  const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
  return isMatch;
}
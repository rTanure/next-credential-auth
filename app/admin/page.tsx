import { auth } from "@/utils/auth"
import { LogoutButton } from "./_components/logout-button"

export default async function AdminPage() {
  const section = await auth()
  
  return (
    <main>
      <pre>{JSON.stringify(section, null, 1)}</pre>
      <LogoutButton />
    </main>
  )
}
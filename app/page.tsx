import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex items-center justify-center min-h-screen flex-col gap-4">
      <h1 className="text-4xl font-bold">Welcome to credential login website</h1>
      <div className="space-x-4">
        <Button size="lg">
          <Link href="/login">Login</Link>
        </Button>
        <Button variant="outline"  size="lg">
          <Link href="/admin">Admin</Link>
        </Button>
      </div>
    </main>
  );
}

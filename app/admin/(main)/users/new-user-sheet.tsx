import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { NewUserForm } from "./new-user-form"

export function NewUserSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Adicionar um novo usuário</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Adicione um novo usuário</SheetTitle>
          <SheetDescription>
            Adicione um novo usuário a sua equipe.
          </SheetDescription>
        </SheetHeader>
        <NewUserForm />
      </SheetContent>
    </Sheet>
  )
}

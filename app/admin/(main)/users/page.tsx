import { Button } from "@/components/ui/button";
import { UsersList } from "./users-list";
import { ScrollArea } from "@/components/ui/scroll-area";
import { NewUserSheet } from "./new-user-sheet";

export default function UsersManager() {
  return (
    <div className="h-full flex flex-col">
      <header className="flex justify-between p-4 border-b border-border items-center">
        <h1>Gerenciador de Usuários</h1>
        <NewUserSheet />
      </header>
      <ScrollArea>
        <div>
          <UsersList />
        </div>
      </ScrollArea>
    </div>
  )
}
import { ScrollArea } from "@/components/ui/scroll-area";
import { DashboardSidebar, DashboardSidebarFooter, DashboardSidebarHeader, DashboardSidebarHeaderTitle, DashboardSidebarMain, DashboardSidebarNav, DashboardSidebarNavHeader, DashboardSidebarNavLink, DashboardSidebarNavMain } from "./_components/dashboard-sidebar";
import { LogoutButton } from "./_components/logout-button";

export default function AdminLayout({children}: {children: React.ReactNode}) {
  return (
    <main className="flex">
      <DashboardSidebar className="w-64 h-screen">
        <DashboardSidebarHeader>
          <DashboardSidebarHeaderTitle>Sua dashboard</DashboardSidebarHeaderTitle>
        </DashboardSidebarHeader>
        <DashboardSidebarMain className="flex-1">
          <DashboardSidebarNav>
              <DashboardSidebarNavHeader>
                <DashboardSidebarHeaderTitle>Conteúdos</DashboardSidebarHeaderTitle>
              </DashboardSidebarNavHeader>
            <DashboardSidebarNavMain>
              <DashboardSidebarNavLink href="/admin">Início</DashboardSidebarNavLink>
            </DashboardSidebarNavMain>
          </DashboardSidebarNav>
        </DashboardSidebarMain>
        <DashboardSidebarFooter>
          <LogoutButton variant="outline" className="w-full"/>
        </DashboardSidebarFooter>
      </DashboardSidebar>
      <ScrollArea className="px-4 h-screen w-full">
        {children}
        {children}
        {children}
        {children}
        {children}
        {children}
      </ScrollArea>
    </main>
  )
}
import { ScrollArea } from "@/components/ui/scroll-area";
import { DashboardSidebar, DashboardSidebarFooter, DashboardSidebarHeader, DashboardSidebarHeaderTitle, DashboardSidebarMain, DashboardSidebarNav, DashboardSidebarNavHeader, DashboardSidebarNavLink, DashboardSidebarNavMain } from "../_components/dashboard-sidebar";
import { LogoutButton } from "../_components/logout-button";

export default function AdminLayout({children}: {children: React.ReactNode}) {
  const sidebarLinks = [
    {
      title: "Início",
      href: "/admin"
    },
    {
      title: "Usuários",
      href: "/admin/users"
    },
    {
      title: "Configurações",
      href: "/admin/settings"
    }
  ]

  return (
    <main className="flex">
      <DashboardSidebar className="w-72 h-screen">
        <DashboardSidebarHeader>
          <DashboardSidebarHeaderTitle>Sua dashboard</DashboardSidebarHeaderTitle>
        </DashboardSidebarHeader>
        <DashboardSidebarMain className="flex-1">
          <DashboardSidebarNav>
              <DashboardSidebarNavHeader>
                <DashboardSidebarHeaderTitle>Conteúdos</DashboardSidebarHeaderTitle>
              </DashboardSidebarNavHeader>
            <DashboardSidebarNavMain>
              {
                sidebarLinks.map((link, index) => (
                  <DashboardSidebarNavLink key={index} href={link.href}>{link.title}</DashboardSidebarNavLink>
                ))
              }
            </DashboardSidebarNavMain>
          </DashboardSidebarNav>
        </DashboardSidebarMain>
        <DashboardSidebarFooter>
          <LogoutButton variant="outline" className="w-full"/>
        </DashboardSidebarFooter>
      </DashboardSidebar>
      <div className="h-screen w-full">
        {children}
      </div>
    </main>
  )
}
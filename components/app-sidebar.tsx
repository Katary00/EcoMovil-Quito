"use client"

import { Car, Users, Gift, BarChart3, HelpCircle, Route, Home, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sidebar, SidebarContent, SidebarHeader, SidebarMain, SidebarFooter } from "@/components/simple-sidebar-v2"
import Link from "next/link"

const menuItems = [
  {
    title: "Inicio",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Planificar Viaje",
    url: "/planificar",
    icon: Route,
  },
  {
    title: "Carpooling",
    url: "/carpooling",
    icon: Users,
  },
  {
    title: "Recompensas",
    url: "/recompensas",
    icon: Gift,
  },
  {
    title: "Estadísticas",
    url: "/estadisticas",
    icon: BarChart3,
  },
  {
    title: "Ayuda",
    url: "/ayuda",
    icon: HelpCircle,
  },
]

export function AppSidebar() {
  return (
    <Sidebar className="shadow-lg">
      <SidebarContent>
        <SidebarHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
              <Car className="h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg text-primary">QuitoMove</span>
              <span className="text-xs text-muted-foreground">Movilidad Inteligente</span>
            </div>
          </div>
        </SidebarHeader>

        <SidebarMain>
          <div className="space-y-2">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4 px-2">
              Navegación Principal
            </p>
            {menuItems.map((item) => (
              <Link key={item.title} href={item.url}>
                <Button
                  variant="ghost"
                  className="w-full justify-start hover:bg-accent/80 transition-all duration-200 h-12"
                >
                  <item.icon className="h-5 w-5 text-primary mr-3" />
                  <span className="font-medium">{item.title}</span>
                </Button>
              </Link>
            ))}
          </div>
        </SidebarMain>

        <SidebarFooter>
          <Button variant="outline" size="sm" className="w-full justify-start bg-transparent hover:bg-accent">
            <Settings className="h-4 w-4 mr-2" />
            Configuración
          </Button>
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  )
}

"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import { SidebarProvider } from "@/components/simple-sidebar-v2"
import { AppSidebar } from "@/components/app-sidebar"
import { Header } from "@/components/header"
import { LayoutWrapper } from "@/components/layout-wrapper"
import { useRouter } from "next/navigation"

interface User {
  id: string
  name: string
  email: string
  avatar?: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  const login = async (email: string, password: string) => {
    // Simulación de login
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setUser({
      id: "1",
      name: "Juan Pérez",
      email: email,
      avatar: "/placeholder.svg?height=40&width=40",
    })
  }

  const register = async (name: string, email: string, password: string) => {
    // Simulación de registro
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setUser({
      id: "1",
      name: name,
      email: email,
      avatar: "/placeholder.svg?height=40&width=40",
    })
  }

  const logout = () => {
    setUser(null)
    router.push("/")
  }

  const isAuthenticated = !!user

  const value = {
    user,
    login,
    register,
    logout,
    isAuthenticated,
  }

  return (
    <AuthContext.Provider value={value}>
      {isAuthenticated ? (
        <SidebarProvider defaultOpen={false}>
          <div className="flex min-h-screen bg-background">
            <AppSidebar />
            <LayoutWrapper>
              <Header />
              <main className="flex-1 p-4 md:p-6 overflow-auto">{children}</main>
            </LayoutWrapper>
          </div>
        </SidebarProvider>
      ) : (
        <main className="min-h-screen">{children}</main>
      )}
    </AuthContext.Provider>
  )
}

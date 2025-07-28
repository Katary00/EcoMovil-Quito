"use client"

import type React from "react"

import { useState, createContext, useContext, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"
import { cn } from "@/lib/utils"

interface SidebarContextType {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  toggle: () => void
}

const SidebarContext = createContext<SidebarContextType | null>(null)

export function useSidebar() {
  const context = useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within SidebarProvider")
  }
  return context
}

interface SidebarProviderProps {
  children: React.ReactNode
  defaultOpen?: boolean
}

export function SidebarProvider({ children, defaultOpen = false }: SidebarProviderProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  const toggle = () => {
    console.log("Toggle function called, current state:", isOpen) // Para debug
    setIsOpen((prev) => {
      console.log("Setting new state:", !prev) // Para debug
      return !prev
    })
  }

  // Cerrar con tecla Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false)
      }
    }

    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [isOpen])

  return <SidebarContext.Provider value={{ isOpen, setIsOpen, toggle }}>{children}</SidebarContext.Provider>
}

interface SidebarProps {
  children: React.ReactNode
  className?: string
}

export function Sidebar({ children, className }: SidebarProps) {
  const { isOpen, setIsOpen } = useSidebar()
  const isMobile = useIsMobile()

  // Cerrar sidebar al hacer clic fuera en móvil
  const handleOverlayClick = () => {
    if (isMobile) {
      setIsOpen(false)
    }
  }

  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent side="left" className="w-80 p-0">
          {children}
        </SheetContent>
      </Sheet>
    )
  }

  return (
    <>
      {/* Overlay para cerrar el sidebar en desktop */}
      {isOpen && <div className="fixed inset-0 z-30 bg-black/20 backdrop-blur-sm" onClick={() => setIsOpen(false)} />}

      <aside
        className={cn(
          "fixed left-0 top-0 z-40 h-screen w-80 transform bg-background border-r transition-transform duration-300 ease-in-out shadow-xl",
          isOpen ? "translate-x-0" : "-translate-x-full",
          className,
        )}
      >
        {children}
      </aside>
    </>
  )
}

export function SidebarTrigger({ className }: { className?: string }) {
  const { isOpen, toggle } = useSidebar()

  const handleClick = () => {
    console.log("Toggle clicked, current state:", isOpen) // Para debug
    toggle()
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={handleClick}
      className={cn(
        "h-10 w-10 border-2 border-primary/30 bg-background hover:bg-primary/10 hover:border-primary/50 transition-all duration-200 shadow-sm",
        isOpen && "bg-primary/10 border-primary/50", // Visual feedback cuando está abierto
        className,
      )}
    >
      <Menu className={cn("h-5 w-5 text-primary transition-transform duration-200", isOpen && "rotate-90")} />
      <span className="sr-only">{isOpen ? "Cerrar menú" : "Abrir menú"}</span>
    </Button>
  )
}

interface SidebarContentProps {
  children: React.ReactNode
  className?: string
}

export function SidebarContent({ children, className }: SidebarContentProps) {
  return <div className={cn("flex h-full flex-col", className)}>{children}</div>
}

interface SidebarHeaderProps {
  children: React.ReactNode
  className?: string
}

export function SidebarHeader({ children, className }: SidebarHeaderProps) {
  return <div className={cn("border-b p-4 bg-primary/5", className)}>{children}</div>
}

interface SidebarMainProps {
  children: React.ReactNode
  className?: string
}

export function SidebarMain({ children, className }: SidebarMainProps) {
  return <div className={cn("flex-1 overflow-y-auto p-4", className)}>{children}</div>
}

interface SidebarFooterProps {
  children: React.ReactNode
  className?: string
}

export function SidebarFooter({ children, className }: SidebarFooterProps) {
  return <div className={cn("border-t p-4 bg-muted/20", className)}>{children}</div>
}

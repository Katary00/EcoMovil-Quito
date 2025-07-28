"use client"

import type React from "react"
import { useState, createContext, useContext, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { Menu, X } from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"
import { cn } from "@/lib/utils"

interface SidebarContextType {
  isOpen: boolean
  open: () => void
  close: () => void
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

  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)
  const toggle = () => setIsOpen((prev) => !prev)

  // Debug logs
  useEffect(() => {
    console.log("Sidebar state changed:", isOpen)
  }, [isOpen])

  // Cerrar con tecla Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        close()
      }
    }

    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [isOpen])

  return <SidebarContext.Provider value={{ isOpen, open, close, toggle }}>{children}</SidebarContext.Provider>
}

interface SidebarProps {
  children: React.ReactNode
  className?: string
}

export function Sidebar({ children, className }: SidebarProps) {
  const { isOpen, close } = useSidebar()
  const isMobile = useIsMobile()

  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={(open) => !open && close()}>
        <SheetContent side="left" className="w-80 p-0">
          {children}
        </SheetContent>
      </Sheet>
    )
  }

  return (
    <>
      {/* Overlay */}
      {isOpen && <div className="fixed inset-0 z-30 bg-black/20 backdrop-blur-sm" onClick={close} />}

      {/* Sidebar */}
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

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        console.log("Button clicked, current state:", isOpen)
        toggle()
      }}
      className={cn(
        "h-10 w-10 border-2 transition-all duration-200 shadow-sm",
        isOpen
          ? "border-primary/50 bg-primary/10 hover:bg-primary/20"
          : "border-primary/30 bg-background hover:bg-primary/10 hover:border-primary/50",
        className,
      )}
    >
      {isOpen ? <X className="h-5 w-5 text-primary" /> : <Menu className="h-5 w-5 text-primary" />}
      <span className="sr-only">{isOpen ? "Cerrar menú" : "Abrir menú"}</span>
    </Button>
  )
}

// Resto de componentes igual...
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

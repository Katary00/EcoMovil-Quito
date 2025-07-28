"use client"

import type React from "react"

import { useSidebar } from "@/components/simple-sidebar-v2"
import { cn } from "@/lib/utils"
import { useIsMobile } from "@/hooks/use-mobile"

interface LayoutWrapperProps {
  children: React.ReactNode
}

export function LayoutWrapper({ children }: LayoutWrapperProps) {
  const { isOpen } = useSidebar()
  const isMobile = useIsMobile()

  return (
    <div
      className={cn(
        "flex-1 flex flex-col transition-all duration-300 ease-in-out",
        // En desktop, cuando el sidebar está abierto, desplazar el contenido
        !isMobile && isOpen && "ml-80",
      )}
    >
      {children}
    </div>
  )
}

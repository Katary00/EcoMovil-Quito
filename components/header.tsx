"use client"

import { useState, useEffect } from "react"
import { SidebarTrigger } from "@/components/simple-sidebar-v2"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import {
  User,
  Settings,
  LogOut,
  AlertTriangle,
  CheckCircle,
  Calendar,
  Clock,
  Cloud,
  Sun,
  CloudRain,
} from "lucide-react"
import { useAuth } from "@/components/auth-provider"
import { ProfileModal } from "@/components/profile-modal"
import { SettingsModal } from "@/components/settings-modal"

export function Header() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [isPeakHour, setIsPeakHour] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const { logout, user } = useAuth()

  // Simulación de datos del clima
  const [weather] = useState({
    temp: 18,
    condition: "soleado", // soleado, nublado, lluvioso
    humidity: 65,
  })

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date()
      setCurrentTime(now)

      // Determinar si es hora pico (7-9 AM y 5-7 PM)
      const hour = now.getHours()
      const isPeak = (hour >= 7 && hour <= 9) || (hour >= 17 && hour <= 19)
      setIsPeakHour(isPeak)
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("es-EC", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("es-EC", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
  }

  const getWeatherIcon = () => {
    switch (weather.condition) {
      case "soleado":
        return <Sun className="h-5 w-5 text-yellow-500" />
      case "nublado":
        return <Cloud className="h-5 w-5 text-gray-500" />
      case "lluvioso":
        return <CloudRain className="h-5 w-5 text-blue-500" />
      default:
        return <Sun className="h-5 w-5 text-yellow-500" />
    }
  }

  const getTrafficStatus = () => {
    if (isPeakHour) {
      return {
        icon: <AlertTriangle className="h-4 w-4" />,
        text: "Hora pico",
        subtext: "Tráfico elevado",
        variant: "destructive" as const,
        bgColor: "bg-red-50 dark:bg-red-950",
        textColor: "text-red-700 dark:text-red-300",
      }
    } else {
      return {
        icon: <CheckCircle className="h-4 w-4" />,
        text: "Tráfico normal",
        subtext: "Condiciones favorables",
        variant: "secondary" as const,
        bgColor: "bg-green-50 dark:bg-green-950",
        textColor: "text-green-700 dark:text-green-300",
      }
    }
  }

  const handleLogout = () => {
    if (confirm("¿Estás seguro de que quieres cerrar sesión?")) {
      logout()
    }
  }

  const trafficStatus = getTrafficStatus()

  return (
    <>
      <header className="w-full border-b bg-background transition-all duration-300">
        <div className="w-full px-4 py-3">
          {/* Información principal - Ocupa todo el ancho */}
          <Card className="w-full bg-gradient-to-r from-primary/5 via-blue-50/50 to-green-50/50 dark:from-primary/10 dark:via-blue-950/50 dark:to-green-950/50 border-primary/20 shadow-sm mb-4">
            <CardContent className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                {/* Fecha */}
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-medium text-primary capitalize truncate">
                      {formatDate(currentTime).split(",")[0]}
                    </div>
                    <div className="text-xs text-muted-foreground">{formatDate(currentTime).split(",")[1]?.trim()}</div>
                  </div>
                </div>

                {/* Hora - Centro y más prominente */}
                <div className="flex flex-col items-center">
                  <div className="flex items-center space-x-2 mb-1">
                    <Clock className="h-5 w-5 text-primary animate-pulse" />
                    <div className="text-2xl md:text-3xl font-bold text-primary font-mono tracking-wider">
                      {formatTime(currentTime)}
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">Quito, Ecuador</div>
                </div>

                {/* Clima y Tráfico */}
                <div className="flex flex-col space-y-3">
                  {/* Clima */}
                  <div className="flex items-center justify-center md:justify-end space-x-2">
                    <div className="p-1.5 bg-yellow-100 dark:bg-yellow-900 rounded-full">{getWeatherIcon()}</div>
                    <div className="text-sm">
                      <span className="font-medium">{weather.temp}°C</span>
                      <span className="text-muted-foreground ml-1 capitalize">{weather.condition}</span>
                    </div>
                  </div>

                  {/* Estado del tráfico */}
                  <div
                    className={`flex items-center justify-center md:justify-end space-x-2 px-3 py-1.5 rounded-full ${trafficStatus.bgColor}`}
                  >
                    <div className={trafficStatus.textColor}>{trafficStatus.icon}</div>
                    <div className="text-xs">
                      <div className={`font-medium ${trafficStatus.textColor}`}>{trafficStatus.text}</div>
                      <div className="text-muted-foreground text-xs">{trafficStatus.subtext}</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Barra inferior con controles */}
          <div className="flex items-center justify-between">
            {/* Botón del menú lateral */}
            <div className="flex items-center gap-4">
              <SidebarTrigger />
              <div className="hidden md:block">
                <h2 className="text-lg font-semibold text-primary">QuitoMove</h2>
              </div>
            </div>

            {/* Espacio central vacío para balance */}
            <div className="flex-1" />

            {/* Menú de usuario */}
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-12 w-12 rounded-full ring-2 ring-primary/20 hover:ring-primary/40 transition-all"
                  >
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user?.avatar || "/placeholder.svg?height=40&width=40"} alt="Usuario" />
                      <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                        {user?.name
                          ?.split(" ")
                          .map((n) => n[0])
                          .join("") || "U"}
                      </AvatarFallback>
                    </Avatar>
                    {/* Indicador de estado online */}
                    <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 border-2 border-background rounded-full" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <div className="flex items-center space-x-2 p-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user?.avatar || "/placeholder.svg?height=32&width=32"} alt="Usuario" />
                      <AvatarFallback className="text-xs">
                        {user?.name
                          ?.split(" ")
                          .map((n) => n[0])
                          .join("") || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user?.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setShowProfile(true)}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Mi Perfil</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setShowSettings(true)}>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Configuración</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-red-600 dark:text-red-400">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Cerrar Sesión</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      <ProfileModal open={showProfile} onOpenChange={setShowProfile} />
      <SettingsModal open={showSettings} onOpenChange={setShowSettings} />
    </>
  )
}

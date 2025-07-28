"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Settings, Bell, Shield, Palette, Globe } from "lucide-react"

interface SettingsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SettingsModal({ open, onOpenChange }: SettingsModalProps) {
  const [settings, setSettings] = useState({
    notifications: {
      push: true,
      email: false,
      sms: false,
      carpooling: true,
      rewards: true,
      traffic: true,
    },
    privacy: {
      shareLocation: true,
      showProfile: true,
      shareStats: false,
    },
    preferences: {
      theme: "system",
      language: "es",
      defaultTransport: "publico",
    },
  })

  const handleSave = () => {
    alert("Configuración guardada correctamente")
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Configuración
          </DialogTitle>
          <DialogDescription>Personaliza tu experiencia en QuitoMove</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="notifications" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="notifications">Notificaciones</TabsTrigger>
            <TabsTrigger value="privacy">Privacidad</TabsTrigger>
            <TabsTrigger value="preferences">Preferencias</TabsTrigger>
            <TabsTrigger value="account">Cuenta</TabsTrigger>
          </TabsList>

          <TabsContent value="notifications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notificaciones
                </CardTitle>
                <CardDescription>Configura cómo y cuándo quieres recibir notificaciones</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="push-notifications">Notificaciones Push</Label>
                    <p className="text-sm text-muted-foreground">Recibe notificaciones en tu dispositivo</p>
                  </div>
                  <Switch
                    id="push-notifications"
                    checked={settings.notifications.push}
                    onCheckedChange={(checked) =>
                      setSettings({
                        ...settings,
                        notifications: { ...settings.notifications, push: checked },
                      })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="email-notifications">Notificaciones por Email</Label>
                    <p className="text-sm text-muted-foreground">Recibe resúmenes semanales por email</p>
                  </div>
                  <Switch
                    id="email-notifications"
                    checked={settings.notifications.email}
                    onCheckedChange={(checked) =>
                      setSettings({
                        ...settings,
                        notifications: { ...settings.notifications, email: checked },
                      })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="carpooling-notifications">Carpooling</Label>
                    <p className="text-sm text-muted-foreground">Notificaciones sobre viajes compartidos</p>
                  </div>
                  <Switch
                    id="carpooling-notifications"
                    checked={settings.notifications.carpooling}
                    onCheckedChange={(checked) =>
                      setSettings({
                        ...settings,
                        notifications: { ...settings.notifications, carpooling: checked },
                      })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="rewards-notifications">Recompensas</Label>
                    <p className="text-sm text-muted-foreground">Notificaciones sobre nuevas recompensas</p>
                  </div>
                  <Switch
                    id="rewards-notifications"
                    checked={settings.notifications.rewards}
                    onCheckedChange={(checked) =>
                      setSettings({
                        ...settings,
                        notifications: { ...settings.notifications, rewards: checked },
                      })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="traffic-notifications">Alertas de Tráfico</Label>
                    <p className="text-sm text-muted-foreground">Notificaciones sobre el estado del tráfico</p>
                  </div>
                  <Switch
                    id="traffic-notifications"
                    checked={settings.notifications.traffic}
                    onCheckedChange={(checked) =>
                      setSettings({
                        ...settings,
                        notifications: { ...settings.notifications, traffic: checked },
                      })
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="privacy" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Privacidad y Seguridad
                </CardTitle>
                <CardDescription>Controla qué información compartes con otros usuarios</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="share-location">Compartir Ubicación</Label>
                    <p className="text-sm text-muted-foreground">Permite que otros vean tu ubicación en carpooling</p>
                  </div>
                  <Switch
                    id="share-location"
                    checked={settings.privacy.shareLocation}
                    onCheckedChange={(checked) =>
                      setSettings({
                        ...settings,
                        privacy: { ...settings.privacy, shareLocation: checked },
                      })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="show-profile">Perfil Público</Label>
                    <p className="text-sm text-muted-foreground">Permite que otros usuarios vean tu perfil</p>
                  </div>
                  <Switch
                    id="show-profile"
                    checked={settings.privacy.showProfile}
                    onCheckedChange={(checked) =>
                      setSettings({
                        ...settings,
                        privacy: { ...settings.privacy, showProfile: checked },
                      })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="share-stats">Compartir Estadísticas</Label>
                    <p className="text-sm text-muted-foreground">Incluir tus datos en estadísticas públicas</p>
                  </div>
                  <Switch
                    id="share-stats"
                    checked={settings.privacy.shareStats}
                    onCheckedChange={(checked) =>
                      setSettings({
                        ...settings,
                        privacy: { ...settings.privacy, shareStats: checked },
                      })
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preferences" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  Preferencias de la App
                </CardTitle>
                <CardDescription>Personaliza la apariencia y comportamiento de la aplicación</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="theme">Tema</Label>
                  <Select
                    value={settings.preferences.theme}
                    onValueChange={(value) =>
                      setSettings({
                        ...settings,
                        preferences: { ...settings.preferences, theme: value },
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un tema" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Claro</SelectItem>
                      <SelectItem value="dark">Oscuro</SelectItem>
                      <SelectItem value="system">Sistema</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="language">Idioma</Label>
                  <Select
                    value={settings.preferences.language}
                    onValueChange={(value) =>
                      setSettings({
                        ...settings,
                        preferences: { ...settings.preferences, language: value },
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un idioma" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="es">Español</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="default-transport">Transporte Preferido</Label>
                  <Select
                    value={settings.preferences.defaultTransport}
                    onValueChange={(value) =>
                      setSettings({
                        ...settings,
                        preferences: { ...settings.preferences, defaultTransport: value },
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona transporte por defecto" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="publico">Transporte Público</SelectItem>
                      <SelectItem value="bicicleta">BiciQ</SelectItem>
                      <SelectItem value="caminata">Caminata</SelectItem>
                      <SelectItem value="auto">Auto Privado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="account" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Configuración de Cuenta
                </CardTitle>
                <CardDescription>Gestiona tu cuenta y datos personales</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full bg-transparent">
                  Cambiar Contraseña
                </Button>
                <Button variant="outline" className="w-full bg-transparent">
                  Descargar Mis Datos
                </Button>
                <Button variant="outline" className="w-full bg-transparent">
                  Exportar Historial de Viajes
                </Button>
                <div className="pt-4 border-t">
                  <Button variant="destructive" className="w-full">
                    Eliminar Cuenta
                  </Button>
                  <p className="text-xs text-muted-foreground mt-2 text-center">Esta acción no se puede deshacer</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end space-x-2 pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSave}>Guardar Cambios</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

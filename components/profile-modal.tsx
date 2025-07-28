"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Edit, Star, Car, Bus, Bike, MapPin } from "lucide-react"
import { useAuth } from "@/components/auth-provider"

interface ProfileModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ProfileModal({ open, onOpenChange }: ProfileModalProps) {
  const { user } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "+593 99 123-4567",
    address: "La Carolina, Quito",
  })

  const handleSave = () => {
    setIsEditing(false)
    alert("Perfil actualizado correctamente")
  }

  const recentTrips = [
    { id: 1, from: "La Carolina", to: "Centro Histórico", type: "Metro", date: "Hoy", points: 50 },
    { id: 2, from: "Cumbayá", to: "La Mariscal", type: "Carpooling", date: "Ayer", points: 25 },
    { id: 3, from: "El Recreo", to: "La Y", type: "BiciQ", date: "2 días", points: 100 },
  ]

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Metro":
        return <Bus className="h-4 w-4 text-blue-600" />
      case "Carpooling":
        return <Car className="h-4 w-4 text-green-600" />
      case "BiciQ":
        return <Bike className="h-4 w-4 text-purple-600" />
      default:
        return <MapPin className="h-4 w-4" />
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Mi Perfil
          </DialogTitle>
          <DialogDescription>Gestiona tu información personal y revisa tu actividad</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="info" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="info">Información</TabsTrigger>
            <TabsTrigger value="stats">Estadísticas</TabsTrigger>
            <TabsTrigger value="history">Historial</TabsTrigger>
          </TabsList>

          <TabsContent value="info" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src={user?.avatar || "/placeholder.svg?height=80&width=80"} alt="Usuario" />
                      <AvatarFallback className="text-2xl">
                        {user?.name
                          ?.split(" ")
                          .map((n) => n[0])
                          .join("") || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-2xl font-bold">{user?.name}</h3>
                      <p className="text-muted-foreground">{user?.email}</p>
                      <Badge variant="secondary" className="mt-2">
                        Nivel Plata
                      </Badge>
                    </div>
                  </div>
                  <Button variant="outline" onClick={() => setIsEditing(!isEditing)}>
                    <Edit className="h-4 w-4 mr-2" />
                    {isEditing ? "Cancelar" : "Editar"}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nombre completo</Label>
                    <Input
                      id="name"
                      value={editData.name}
                      onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={editData.email}
                      onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Teléfono</Label>
                    <Input
                      id="phone"
                      value={editData.phone}
                      onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Dirección</Label>
                    <Input
                      id="address"
                      value={editData.address}
                      onChange={(e) => setEditData({ ...editData, address: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
                {isEditing && (
                  <Button onClick={handleSave} className="w-full">
                    Guardar Cambios
                  </Button>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="stats" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Puntos Totales</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600">1,247</div>
                  <p className="text-sm text-muted-foreground">+180 esta semana</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Viajes Realizados</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-600">89</div>
                  <p className="text-sm text-muted-foreground">Este mes</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">CO₂ Evitado</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-purple-600">24.5 kg</div>
                  <p className="text-sm text-muted-foreground">Este mes</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Calificación</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2">
                    <div className="text-3xl font-bold text-yellow-600">4.8</div>
                    <div className="flex">
                      {Array.from({ length: 5 }, (_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${i < 4 ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">23 valoraciones</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Viajes Recientes</CardTitle>
                <CardDescription>Tus últimos viajes realizados</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentTrips.map((trip) => (
                    <div key={trip.id} className="flex items-center justify-between p-3 rounded-lg border">
                      <div className="flex items-center space-x-3">
                        {getTypeIcon(trip.type)}
                        <div>
                          <p className="font-medium">
                            {trip.from} → {trip.to}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {trip.type} • {trip.date}
                          </p>
                        </div>
                      </div>
                      <Badge variant="secondary">+{trip.points} pts</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

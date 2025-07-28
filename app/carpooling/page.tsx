"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Car, Clock, DollarSign, Star, Users, Plus, ArrowUpDown, CheckCircle, Loader2 } from "lucide-react"
import { LocationSelector } from "@/components/location-selector"

const availableRides = [
  {
    id: 1,
    driver: {
      name: "María González",
      rating: 4.8,
      trips: 45,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    origin: "La Carolina",
    destination: "Centro Histórico",
    time: "07:30",
    date: "Hoy",
    price: "$2.50",
    seats: 3,
    car: "Toyota Corolla 2020",
    points: 25,
    rules: ["No fumar", "Música suave", "Mascotas no permitidas"],
    preferences: "Conversación moderada",
  },
  {
    id: 2,
    driver: {
      name: "Carlos Mendoza",
      rating: 4.9,
      trips: 78,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    origin: "Cumbayá",
    destination: "La Mariscal",
    time: "08:00",
    date: "Hoy",
    price: "$3.00",
    seats: 2,
    car: "Chevrolet Sail 2019",
    points: 30,
    rules: ["No fumar", "Puntualidad obligatoria"],
    preferences: "Ambiente silencioso",
  },
]

export default function CarpoolingPage() {
  const [activeTab, setActiveTab] = useState("buscar")
  const [origen, setOrigen] = useState("")
  const [destino, setDestino] = useState("")
  const [reservedRide, setReservedRide] = useState<number | null>(null)
  const [isSearching, setIsSearching] = useState(false)
  const [searchResults, setSearchResults] = useState(availableRides)

  const swapLocations = () => {
    const temp = origen
    setOrigen(destino)
    setDestino(temp)
  }

  const handleReserve = (rideId: number) => {
    setReservedRide(rideId)
    alert("¡Viaje reservado exitosamente! El conductor ha sido notificado.")
  }

  const handleSearch = async () => {
    if (!origen || !destino) {
      alert("Por favor ingresa origen y destino para buscar viajes")
      return
    }

    setIsSearching(true)
    // Simular búsqueda
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Filtrar resultados basados en origen y destino
    const filtered = availableRides.filter(
      (ride) =>
        ride.origin.toLowerCase().includes(origen.toLowerCase()) ||
        ride.destination.toLowerCase().includes(destino.toLowerCase()),
    )

    setSearchResults(filtered.length > 0 ? filtered : availableRides)
    setIsSearching(false)

    if (filtered.length === 0) {
      alert(`No se encontraron viajes exactos de ${origen} a ${destino}, mostrando opciones similares.`)
    } else {
      alert(`¡Encontrados ${filtered.length} viajes disponibles!`)
    }
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-3 w-3 ${i < Math.floor(rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
      />
    ))
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Carpooling</h1>
        <p className="text-muted-foreground">Comparte viajes con ciudadanos verificados</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="buscar">Buscar Viajes</TabsTrigger>
          <TabsTrigger value="crear">Crear Viaje</TabsTrigger>
        </TabsList>

        <TabsContent value="buscar" className="space-y-6">
          {/* Estilo Uber para búsqueda */}
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="flex flex-col items-center space-y-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <div className="w-0.5 h-8 bg-gray-300"></div>
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  </div>

                  <div className="flex-1 space-y-4">
                    <LocationSelector
                      placeholder="¿Desde dónde sales?"
                      value={origen}
                      onChange={setOrigen}
                      className="text-lg py-6"
                    />
                    <LocationSelector
                      placeholder="¿A dónde vas?"
                      value={destino}
                      onChange={setDestino}
                      className="text-lg py-6"
                    />
                  </div>

                  <Button variant="ghost" size="icon" onClick={swapLocations}>
                    <ArrowUpDown className="h-5 w-5" />
                  </Button>
                </div>

                <div className="flex space-x-2">
                  <Input type="time" className="flex-1" defaultValue="07:30" />
                  <Input type="date" className="flex-1" />
                  <Button className="px-8" onClick={handleSearch} disabled={isSearching}>
                    {isSearching ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Buscando...
                      </>
                    ) : (
                      "Buscar"
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Lista de viajes disponibles */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Viajes Disponibles</h2>
            {searchResults.map((ride) => (
              <Card key={ride.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={ride.driver.avatar || "/placeholder.svg"} alt={ride.driver.name} />
                        <AvatarFallback>
                          {ride.driver.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>

                      <div className="space-y-3 flex-1">
                        <div>
                          <h3 className="font-semibold">{ride.driver.name}</h3>
                          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <div className="flex items-center">
                              {renderStars(ride.driver.rating)}
                              <span className="ml-1">{ride.driver.rating}</span>
                            </div>
                            <span>•</span>
                            <span>{ride.driver.trips} viajes</span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center space-x-2 text-sm">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span>{ride.origin}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm">
                            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                            <span>{ride.destination}</span>
                          </div>

                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <div className="flex items-center space-x-1">
                              <Clock className="h-4 w-4" />
                              <span>
                                {ride.time} - {ride.date}
                              </span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Car className="h-4 w-4" />
                              <span>{ride.car}</span>
                            </div>
                          </div>
                        </div>

                        {/* Normas del conductor */}
                        <div className="space-y-2">
                          <p className="text-sm font-medium">Normas del viaje:</p>
                          <div className="flex flex-wrap gap-1">
                            {ride.rules.map((rule, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {rule}
                              </Badge>
                            ))}
                          </div>
                          <p className="text-xs text-muted-foreground">Preferencias: {ride.preferences}</p>
                        </div>
                      </div>
                    </div>

                    <div className="text-right space-y-2 ml-4">
                      <div className="text-2xl font-bold text-green-600">{ride.price}</div>
                      <Badge variant="secondary">+{ride.points} pts</Badge>
                      <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                        <Users className="h-4 w-4" />
                        <span>{ride.seats} asientos</span>
                      </div>

                      {reservedRide === ride.id ? (
                        <div className="space-y-2">
                          <div className="flex items-center space-x-1 text-green-600 text-sm">
                            <CheckCircle className="h-4 w-4" />
                            <span>Reservado</span>
                          </div>
                          <Button size="sm" variant="outline" className="w-full bg-transparent">
                            Ver Detalles
                          </Button>
                        </div>
                      ) : (
                        <Button size="sm" className="w-full" onClick={() => handleReserve(ride.id)}>
                          Reservar
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="crear" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Crear Nuevo Viaje
              </CardTitle>
              <CardDescription>Ofrece asientos en tu vehículo y gana puntos</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Estilo Uber para crear viaje */}
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="flex flex-col items-center space-y-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <div className="w-0.5 h-8 bg-gray-300"></div>
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  </div>

                  <div className="flex-1 space-y-4">
                    <LocationSelector
                      placeholder="Punto de partida"
                      value=""
                      onChange={() => {}}
                      className="text-lg py-6"
                    />
                    <LocationSelector
                      placeholder="Punto de llegada"
                      value=""
                      onChange={() => {}}
                      className="text-lg py-6"
                    />
                  </div>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Fecha</label>
                  <Input type="date" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Hora de salida</label>
                  <Input type="time" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Asientos</label>
                  <Input type="number" min="1" max="4" placeholder="1-4" />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Precio por persona</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="2.50" className="pl-10" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Vehículo</label>
                  <Input placeholder="Marca, modelo, año" />
                </div>
              </div>

              {/* Normas del conductor */}
              <div className="space-y-4">
                <label className="text-sm font-medium">Normas de tu viaje</label>
                <div className="grid grid-cols-2 gap-2">
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">No fumar</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">No mascotas</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">Música suave</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">Puntualidad obligatoria</span>
                  </label>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Comentarios adicionales</label>
                <Textarea placeholder="Ej: Ambiente silencioso, conversación moderada, etc." />
              </div>

              <Button className="w-full" size="lg">
                <Plus className="mr-2 h-4 w-4" />
                Crear Viaje
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

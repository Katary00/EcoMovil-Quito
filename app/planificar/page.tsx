"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Car,
  Bus,
  Bike,
  MapPin,
  Clock,
  DollarSign,
  Star,
  Users,
  ArrowUpDown,
  Loader2,
  Navigation,
  TreePine,
  X,
  Plus,
  Minus,
} from "lucide-react"
import { LocationSelector } from "@/components/location-selector"
import { BikeUnlockModal } from "@/components/bike-unlock-modal"
import { calculateCO2Emissions, calculateTravelTime, formatTravelTime, type VehicleData } from "@/utils/co2-calculator"

// Datos de ubicaciones con coordenadas aproximadas
const locationData = {
  "La Carolina": { lat: -0.1807, lng: -78.4678, zone: "Norte" },
  "Centro Histórico": { lat: -0.2201, lng: -78.5123, zone: "Centro" },
  "La Mariscal": { lat: -0.1955, lng: -78.4834, zone: "Norte" },
  Cumbayá: { lat: -0.2089, lng: -78.4234, zone: "Valle" },
  "El Recreo": { lat: -0.2567, lng: -78.5234, zone: "Sur" },
  Quitumbe: { lat: -0.289, lng: -78.5456, zone: "Sur" },
  "La Y": { lat: -0.1678, lng: -78.4567, zone: "Norte" },
  "El Labrador": { lat: -0.1456, lng: -78.4789, zone: "Norte" },
  "Plaza Foch": { lat: -0.1934, lng: -78.4845, zone: "Norte" },
  "Terminal Terrestre": { lat: -0.2678, lng: -78.5345, zone: "Sur" },
  Aeropuerto: { lat: -0.1289, lng: -78.3567, zone: "Norte" },
}

// Líneas de transporte con sus paradas
const transportLines = {
  metro: {
    name: "Metro Línea 1",
    stations: ["El Labrador", "La Carolina", "Universidad Central", "Centro Histórico", "El Recreo", "Quitumbe"],
    color: "blue",
  },
  trole: {
    name: "Trolebús",
    stations: ["La Y", "La Carolina", "Centro Histórico", "El Recreo", "Terminal Terrestre"],
    color: "green",
  },
  ecovia: {
    name: "Ecovía",
    stations: ["Terminal Terrestre", "Centro Histórico", "La Mariscal", "Plaza Foch"],
    color: "orange",
  },
}

// Función para calcular distancia entre dos puntos
const calculateDistance = (origin: string, destination: string): number => {
  const orig = locationData[origin as keyof typeof locationData]
  const dest = locationData[destination as keyof typeof locationData]

  if (!orig || !dest) return 10 // Distancia por defecto

  const R = 6371 // Radio de la Tierra en km
  const dLat = ((dest.lat - orig.lat) * Math.PI) / 180
  const dLng = ((dest.lng - orig.lng) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((orig.lat * Math.PI) / 180) *
      Math.cos((dest.lat * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

// Función para encontrar la mejor línea de transporte
const findBestTransportLine = (origin: string, destination: string) => {
  const lines = Object.entries(transportLines)

  for (const [key, line] of lines) {
    const originIndex = line.stations.findIndex(
      (station) =>
        station.toLowerCase().includes(origin.toLowerCase()) || origin.toLowerCase().includes(station.toLowerCase()),
    )
    const destIndex = line.stations.findIndex(
      (station) =>
        station.toLowerCase().includes(destination.toLowerCase()) ||
        destination.toLowerCase().includes(station.toLowerCase()),
    )

    if (originIndex !== -1 && destIndex !== -1) {
      const originStation = line.stations[originIndex]
      const destStation = line.stations[destIndex]
      const stations =
        originIndex < destIndex
          ? line.stations.slice(originIndex, destIndex + 1)
          : line.stations.slice(destIndex, originIndex + 1).reverse()

      return {
        line: line.name,
        originStation,
        destStation,
        stations,
        transfers: 0,
      }
    }
  }

  // Si no hay línea directa, buscar con transbordo
  return {
    line: "Metro Línea 1 + Trolebús",
    originStation: "Estación más cercana",
    destStation: "Estación de destino",
    stations: ["Transbordo en Centro Histórico"],
    transfers: 1,
  }
}

const initialTransportOptions = [
  {
    id: "auto",
    name: "Auto Privado",
    icon: Car,
    time: "25 min",
    cost: "$3.50",
    co2: "4.2 kg CO₂",
    points: 0,
    comfort: 5,
    reliability: 4,
    color: "text-red-600",
    bgColor: "bg-red-50 dark:bg-red-950",
  },
  {
    id: "publico",
    name: "Transporte Público",
    icon: Bus,
    time: "45 min",
    cost: "$0.35",
    co2: "0.8 kg CO₂",
    points: 50,
    comfort: 3,
    reliability: 3,
    color: "text-blue-600",
    bgColor: "bg-blue-50 dark:bg-blue-950",
    subOptions: ["Metro", "Trole", "Ecovía", "Buses Municipales"],
  },
  {
    id: "bicicleta",
    name: "BiciQ",
    icon: Bike,
    time: "35 min",
    cost: "$0.50",
    co2: "0 kg CO₂",
    points: 100,
    comfort: 2,
    reliability: 4,
    color: "text-green-600",
    bgColor: "bg-green-50 dark:bg-green-950",
  },
  {
    id: "caminata",
    name: "Caminata",
    icon: Users,
    time: "1h 20min",
    cost: "$0.00",
    co2: "0 kg CO₂",
    points: 150,
    comfort: 1,
    reliability: 5,
    color: "text-purple-600",
    bgColor: "bg-purple-50 dark:bg-purple-950",
  },
]

export default function PlanificarPage() {
  const [origen, setOrigen] = useState("")
  const [destino, setDestino] = useState("")
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [selectedSubOption, setSelectedSubOption] = useState<string | null>(null)
  const [showMap, setShowMap] = useState(false)
  const [mapMode, setMapMode] = useState<"origin" | "destination" | null>(null)
  const [isSearching, setIsSearching] = useState(false)
  const [showBikeModal, setShowBikeModal] = useState(false)
  const [bikeUnlockCode, setBikeUnlockCode] = useState("")
  const [transportOptions, setTransportOptions] = useState(initialTransportOptions)
  const [routeDetails, setRouteDetails] = useState<any>(null)
  const [isOptimized, setIsOptimized] = useState(false)
  const [co2Analysis, setCo2Analysis] = useState<any>(null)

  // Datos del vehículo del usuario (normalmente vendría del contexto/perfil)
  const userVehicleData: VehicleData = {
    fuelType: "gasolina",
    fuelEfficiency: 12,
    vehicleType: "sedan",
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`h-3 w-3 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-300"}`} />
    ))
  }

  const swapLocations = () => {
    const temp = origen
    setOrigen(destino)
    setDestino(temp)
    if (isOptimized) {
      // Re-optimizar con las ubicaciones intercambiadas
      setTimeout(() => handleSearch(), 100)
    }
  }

  const handleMapClick = (mode: "origin" | "destination") => {
    setMapMode(mode)
    setShowMap(true)
  }

  const handleSearch = async () => {
    if (!origen || !destino) {
      alert("Por favor ingresa origen y destino para obtener rutas optimizadas")
      return
    }

    setIsSearching(true)

    // Simular búsqueda
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Calcular distancia real
    const distance = calculateDistance(origen, destino)

    // Calcular análisis de CO₂
    const co2Data = calculateCO2Emissions(distance, userVehicleData, "metro")

    // Calcular opciones optimizadas
    const optimizedOptions = [
      {
        id: "auto",
        name: "Auto Privado",
        icon: Car,
        time: formatTravelTime(calculateTravelTime(distance, "auto")),
        cost: `$${co2Data.privateVehicle.cost.toFixed(2)}`,
        co2: `${co2Data.privateVehicle.co2Emissions.toFixed(1)} kg CO₂`,
        co2Analysis: {
          emissions: co2Data.privateVehicle.co2Emissions,
          saved: 0,
          percentage: 0,
          impact: "Alto impacto ambiental",
          color: "text-red-600",
          bgColor: "bg-red-100 dark:bg-red-900",
        },
        points: 0,
        comfort: 5,
        reliability: 4,
        color: "text-red-600",
        bgColor: "bg-red-50 dark:bg-red-950",
        details: {
          fuel: `${co2Data.privateVehicle.fuelConsumed.toFixed(1)}L`,
          parking: "$1.50",
          distance: `${distance.toFixed(1)} km`,
          co2Impact: "Alto impacto ambiental",
        },
      },
      {
        id: "publico",
        name: "Transporte Público",
        icon: Bus,
        time: formatTravelTime(calculateTravelTime(distance, "metro")),
        cost: distance > 15 ? "$0.70" : "$0.35",
        co2: `${co2Data.publicTransport.co2Emissions.toFixed(1)} kg CO₂`,
        co2Analysis: {
          emissions: co2Data.publicTransport.co2Emissions,
          saved: co2Data.publicTransport.co2Saved,
          percentage: co2Data.publicTransport.percentageSaved,
          impact: `${co2Data.publicTransport.percentageSaved.toFixed(0)}% menos contaminación`,
          color: "text-green-600",
          bgColor: "bg-green-100 dark:bg-green-900",
        },
        points: Math.round(distance * 5),
        comfort: 3,
        reliability: 3,
        color: "text-blue-600",
        bgColor: "bg-blue-50 dark:bg-blue-950",
        subOptions: ["Metro", "Trole", "Ecovía", "Buses Municipales"],
        details: {
          ...findBestTransportLine(origen, destino),
          co2Saved: `${co2Data.publicTransport.co2Saved.toFixed(1)} kg CO₂ ahorrado`,
          percentageSaved: `${co2Data.publicTransport.percentageSaved.toFixed(0)}% menos contaminación`,
        },
      },
      {
        id: "bicicleta",
        name: "BiciQ",
        icon: Bike,
        time: formatTravelTime(calculateTravelTime(distance, "bicicleta")),
        cost: distance > 10 ? "$1.00" : "$0.50",
        co2: "0 kg CO₂",
        co2Analysis: {
          emissions: 0,
          saved: co2Data.bicycle.co2Saved,
          percentage: 100,
          impact: "100% libre de emisiones",
          color: "text-green-600",
          bgColor: "bg-green-100 dark:bg-green-900",
        },
        points: Math.round(distance * 8),
        comfort: 2,
        reliability: 4,
        color: "text-green-600",
        bgColor: "bg-green-50 dark:bg-green-950",
        details: {
          distance: `${distance.toFixed(1)} km`,
          calories: `~${Math.round(distance * 45)} cal`,
          stations: "Red BiciQ disponible",
          co2Saved: `${co2Data.bicycle.co2Saved.toFixed(1)} kg CO₂ ahorrado`,
          percentageSaved: "100% libre de emisiones",
        },
      },
      {
        id: "caminata",
        name: "Caminata",
        icon: Users,
        time: formatTravelTime(calculateTravelTime(distance, "caminata")),
        cost: "$0.00",
        co2: "0 kg CO₂",
        co2Analysis: {
          emissions: 0,
          saved: co2Data.walking.co2Saved,
          percentage: 100,
          impact: "100% libre de emisiones",
          color: "text-green-600",
          bgColor: "bg-green-100 dark:bg-green-900",
        },
        points: Math.round(distance * 12),
        comfort: 1,
        reliability: 5,
        color: "text-purple-600",
        bgColor: "bg-purple-50 dark:bg-purple-950",
        details: {
          distance: `${distance.toFixed(1)} km`,
          calories: `~${Math.round(distance * 65)} cal`,
          steps: `~${Math.round(distance * 1300)} pasos`,
          co2Saved: `${co2Data.walking.co2Saved.toFixed(1)} kg CO₂ ahorrado`,
          percentageSaved: "100% libre de emisiones",
        },
      },
    ]

    setTransportOptions(optimizedOptions)
    setRouteDetails({
      distance,
      origin: origen,
      destination: destino,
    })
    setCo2Analysis(co2Data)
    setIsOptimized(true)
    setIsSearching(false)

    alert("¡Rutas optimizadas con cálculos precisos de CO₂ y tiempo!")
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">¿A dónde vas?</h1>
        <p className="text-muted-foreground">Encuentra la mejor opción para tu viaje</p>
      </div>

      {/* Estilo Uber - Selección de ubicaciones */}
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
                <div className="relative">
                  <LocationSelector
                    placeholder="Origen - ¿Desde dónde sales?"
                    value={origen}
                    onChange={setOrigen}
                    className="text-lg py-6"
                    onMapClick={() => handleMapClick("origin")}
                  />
                </div>

                <div className="relative">
                  <LocationSelector
                    placeholder="Destino - ¿A dónde vas?"
                    value={destino}
                    onChange={setDestino}
                    className="text-lg py-6"
                    onMapClick={() => handleMapClick("destination")}
                  />
                </div>
              </div>

              <Button variant="ghost" size="icon" onClick={swapLocations} className="h-12 w-12">
                <ArrowUpDown className="h-5 w-5" />
              </Button>
            </div>

            <div className="flex space-x-2">
              <Button className="flex-1" onClick={handleSearch} disabled={isSearching}>
                {isSearching ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Optimizando rutas...
                  </>
                ) : (
                  <>
                    <Navigation className="mr-2 h-4 w-4" />
                    {isOptimized ? "Re-optimizar Rutas" : "Optimizar Rutas"}
                  </>
                )}
              </Button>
            </div>

            {/* Información de la ruta optimizada */}
            {isOptimized && routeDetails && (
              <div className="mt-4 p-3 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
                <div className="flex items-center space-x-2 text-green-700 dark:text-green-300">
                  <Navigation className="h-4 w-4" />
                  <span className="font-medium">Ruta optimizada:</span>
                  <span>
                    {routeDetails.origin} → {routeDetails.destination}
                  </span>
                  <span className="text-sm">({routeDetails.distance.toFixed(1)} km)</span>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Mapa Interactivo de Quito */}
      {showMap && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Seleccionar {mapMode === "origin" ? "Origen" : "Destino"} en el Mapa
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setShowMap(false)
                  setMapMode(null)
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            </CardTitle>
            <CardDescription>Haz clic en el mapa para seleccionar la ubicación exacta</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="w-full h-96 bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900 dark:to-blue-900 rounded-lg relative overflow-hidden border-2 border-dashed border-gray-300">
              {/* Simulación de mapa interactivo */}
              <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width%3D%2260%22 height%3D%2260%22 viewBox%3D%220 0 60 60%22 xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg fill%3D%22none%22 fillRule%3D%22evenodd%22%3E%3Cg fill%3D%22%239C92AC%22 fillOpacity%3D%220.1%22%3E%3Ccircle cx%3D%2230%22 cy%3D%2230%22 r%3D%224%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-20"></div>

              {/* Ubicaciones predefinidas en el mapa */}
              <div className="absolute inset-0 p-4">
                {Object.entries(locationData).map(([name, coords], index) => (
                  <button
                    key={name}
                    className="absolute bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold hover:scale-110 transition-transform shadow-lg"
                    style={{
                      left: `${((coords.lng + 78.6) / 0.4) * 100}%`,
                      top: `${((coords.lat + 0.35) / 0.25) * 100}%`,
                    }}
                    onClick={() => {
                      const location = name
                      if (mapMode === "origin") {
                        setOrigen(location)
                      } else if (mapMode === "destination") {
                        setDestino(location)
                      }
                      setShowMap(false)
                      setMapMode(null)
                    }}
                    title={name}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>

              {/* Controles del mapa */}
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                <Button size="sm" variant="secondary">
                  <Plus className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="secondary">
                  <Minus className="h-4 w-4" />
                </Button>
              </div>

              {/* Leyenda */}
              <div className="absolute bottom-4 left-4 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg">
                <h4 className="font-medium text-sm mb-2">Ubicaciones Populares</h4>
                <div className="grid grid-cols-2 gap-1 text-xs">
                  {Object.keys(locationData)
                    .slice(0, 6)
                    .map((name, index) => (
                      <div key={name} className="flex items-center gap-1">
                        <div className="w-4 h-4 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold">
                          {index + 1}
                        </div>
                        <span className="truncate">{name}</span>
                      </div>
                    ))}
                </div>
              </div>

              {/* Instrucciones */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center bg-white/90 dark:bg-gray-800/90 p-4 rounded-lg">
                <MapPin className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                <p className="text-sm font-medium">
                  Selecciona {mapMode === "origin" ? "el punto de origen" : "el punto de destino"}
                </p>
                <p className="text-xs text-muted-foreground">Haz clic en cualquier ubicación numerada</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Opciones de transporte - SIEMPRE VISIBLES */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Opciones de Movilidad</h2>
        <p className="text-sm text-muted-foreground">
          {origen && destino
            ? `Rutas ${isOptimized ? "optimizadas" : "disponibles"} de ${origen} a ${destino}`
            : "Selecciona origen y destino para rutas optimizadas"}
        </p>
        <div className="grid gap-3 md:grid-cols-2">
          {transportOptions.map((option) => (
            <div
              key={option.id}
              className={`cursor-pointer transition-all hover:shadow-md ${selectedOption === option.id ? "ring-2 ring-primary" : ""}`}
              onClick={() => {
                setSelectedOption(option.id)
                setSelectedSubOption(null)
              }}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${option.bgColor}`}>
                      <option.icon className={`h-5 w-5 ${option.color}`} />
                    </div>
                    <div>
                      <h3 className="font-medium">{option.name}</h3>
                      <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                        <span className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {option.time}
                        </span>
                        <span className="flex items-center">
                          <DollarSign className="h-3 w-3 mr-1" />
                          {option.cost}
                        </span>
                        {isOptimized && (
                          <span className="flex items-center">
                            <TreePine className="h-3 w-3 mr-1" />
                            {option.co2}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    {option.points > 0 && (
                      <Badge variant="secondary" className="text-xs">
                        +{option.points}
                      </Badge>
                    )}
                    <div className="flex mt-1">{renderStars(option.comfort)}</div>
                  </div>
                </div>
              </CardContent>
              {/* Análisis de CO₂ integrado */}
              {isOptimized && option.co2Analysis && (
                <div className={`mt-3 p-2 rounded-lg ${option.co2Analysis.bgColor}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <TreePine className="h-3 w-3" />
                      <span className="text-xs font-medium">Impacto Ambiental</span>
                    </div>
                    <span className={`${option.co2Analysis.color} text-xs font-bold`}>{option.co2Analysis.impact}</span>
                  </div>
                  {option.co2Analysis.saved > 0 && (
                    <div className="text-xs text-green-600 dark:text-green-400 mt-1">
                      Ahorras {option.co2Analysis.saved.toFixed(1)} kg CO₂ vs auto privado
                    </div>
                  )}
                </div>
              )}
              {selectedOption === option.id && (
                <>
                  <Separator className="my-3" />
                  <div className="space-y-3">
                    {option.id === "publico" && (
                      <div className="space-y-2">
                        <p className="text-sm font-medium">Selecciona el medio:</p>
                        <div className="grid grid-cols-2 gap-2">
                          {option.subOptions?.map((subOption) => (
                            <Button
                              key={subOption}
                              variant={selectedSubOption === subOption ? "default" : "outline"}
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation()
                                setSelectedSubOption(subOption)
                              }}
                            >
                              {subOption}
                            </Button>
                          ))}
                        </div>

                        {selectedSubOption && (
                          <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                            <p className="text-sm font-medium mb-2">Ruta - {selectedSubOption}</p>
                            {isOptimized && option.details && (
                              <div className="space-y-2 text-sm text-muted-foreground">
                                <p>
                                  <strong>Línea:</strong> {option.details.line}
                                </p>
                                <p>
                                  <strong>Sube en:</strong> {option.details.originStation}
                                </p>
                                <p>
                                  <strong>Baja en:</strong> {option.details.destStation}
                                </p>
                                {option.details.transfers > 0 && (
                                  <p>
                                    <strong>Transbordos:</strong> {option.details.transfers}
                                  </p>
                                )}
                                {option.details.co2Saved && (
                                  <div className="p-2 bg-green-100 dark:bg-green-900 rounded text-green-700 dark:text-green-300">
                                    <p className="font-medium">{option.details.co2Saved}</p>
                                    <p className="text-xs">{option.details.percentageSaved}</p>
                                  </div>
                                )}
                                <div className="flex flex-wrap gap-1 mt-2">
                                  {option.details.stations.map((station: string, idx: number) => (
                                    <Badge key={idx} variant="outline" className="text-xs">
                                      {station}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}
                            <Button
                              size="sm"
                              className="w-full mt-3"
                              onClick={() => {
                                const cost = selectedSubOption === "Metro" ? "$0.45" : "$0.35"
                                alert(
                                  `¡Viaje iniciado en ${selectedSubOption}! Código QR: QM${Date.now().toString().slice(-6)}\nCosto: ${cost}`,
                                )
                              }}
                            >
                              Pagar con QR ({selectedSubOption === "Metro" ? "$0.45" : "$0.35"})
                            </Button>
                          </div>
                        )}
                      </div>
                    )}

                    {option.id === "bicicleta" && (
                      <div className="p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                        <p className="text-sm font-medium mb-2">BiciQ - Sistema Municipal</p>
                        {isOptimized && option.details && (
                          <div className="text-sm text-muted-foreground space-y-1 mb-3">
                            <p>
                              <strong>Distancia:</strong> {option.details.distance}
                            </p>
                            <p>
                              <strong>Calorías:</strong> {option.details.calories}
                            </p>
                            <p>
                              <strong>Red:</strong> {option.details.stations}
                            </p>
                            {option.details.co2Saved && (
                              <div className="p-2 bg-green-100 dark:bg-green-900 rounded text-green-700 dark:text-green-300">
                                <p className="font-medium">{option.details.co2Saved}</p>
                                <p className="text-xs">{option.details.percentageSaved}</p>
                              </div>
                            )}
                          </div>
                        )}
                        <p className="text-sm text-muted-foreground mb-3">
                          Estación más cercana: Plaza Foch (2 min caminando)
                        </p>
                        <Button
                          size="sm"
                          className="w-full"
                          onClick={() => {
                            const code = "BQ" + Date.now().toString().slice(-4)
                            setBikeUnlockCode(code)
                            setShowBikeModal(true)
                          }}
                        >
                          Desbloquear Bicicleta
                        </Button>
                      </div>
                    )}

                    {option.id === "auto" && (
                      <div className="p-3 bg-red-50 dark:bg-red-950 rounded-lg">
                        <p className="text-sm font-medium mb-2">Costos estimados</p>
                        {isOptimized && option.details ? (
                          <div className="text-sm text-muted-foreground space-y-1">
                            <p>Distancia: {option.details.distance}</p>
                            <p>Combustible: {option.details.fuel}</p>
                            <p>Parqueadero: {option.details.parking}</p>
                            <div className="p-2 bg-red-100 dark:bg-red-900 rounded text-red-700 dark:text-red-300 mt-2">
                              <p className="font-medium text-xs">{option.details.co2Impact}</p>
                            </div>
                          </div>
                        ) : (
                          <div className="text-sm text-muted-foreground space-y-1">
                            <p>Combustible: $2.50</p>
                            <p>Parqueadero: $1.00</p>
                          </div>
                        )}
                        <Button
                          size="sm"
                          className="w-full mt-2"
                          onClick={() => alert("Navegación iniciada. ¡Buen viaje!")}
                        >
                          Iniciar Navegación
                        </Button>
                      </div>
                    )}

                    {option.id === "caminata" && (
                      <div className="p-3 bg-purple-50 dark:bg-purple-950 rounded-lg">
                        <p className="text-sm font-medium mb-2">Beneficios de salud</p>
                        {isOptimized && option.details ? (
                          <div className="text-sm text-muted-foreground space-y-1">
                            <p>Distancia: {option.details.distance}</p>
                            <p>Calorías: {option.details.calories}</p>
                            <p>Pasos: {option.details.steps}</p>
                            {option.details.co2Saved && (
                              <div className="p-2 bg-green-100 dark:bg-green-900 rounded text-green-700 dark:text-green-300">
                                <p className="font-medium">{option.details.co2Saved}</p>
                                <p className="text-xs">{option.details.percentageSaved}</p>
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="text-sm text-muted-foreground space-y-1">
                            <p>Distancia: 4.2 km</p>
                            <p>Calorías: ~320 cal</p>
                          </div>
                        )}
                        <Button
                          size="sm"
                          className="w-full mt-2"
                          onClick={() => alert(`¡Ruta de caminata iniciada! +${option.points} puntos al completar`)}
                        >
                          Iniciar Caminata
                        </Button>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
      {showBikeModal && (
        <BikeUnlockModal open={showBikeModal} onOpenChange={setShowBikeModal} unlockCode={bikeUnlockCode} />
      )}
    </div>
  )
}

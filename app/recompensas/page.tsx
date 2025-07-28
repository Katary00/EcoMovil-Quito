"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Gift, Coffee, ShoppingBag, Car, Utensils, Book, Coins, Star, MapPin, Calendar } from "lucide-react"

const userPoints = 1247

const rewards = [
  {
    id: 1,
    title: "Café Gratis",
    description: "Café americano en Juan Valdez",
    points: 150,
    category: "food",
    icon: Coffee,
    location: "Múltiples ubicaciones",
    expires: "30 días",
    available: true,
  },
  {
    id: 2,
    title: "Descuento 20% en Libros",
    description: "En Librería Española",
    points: 300,
    category: "shopping",
    icon: Book,
    location: "Centro Comercial El Jardín",
    expires: "15 días",
    available: true,
  },
  {
    id: 3,
    title: "Parqueadero Gratis 2h",
    description: "En parqueaderos municipales",
    points: 200,
    category: "transport",
    icon: Car,
    location: "Centro Histórico",
    expires: "7 días",
    available: true,
  },
  {
    id: 4,
    title: "Almuerzo Ejecutivo",
    description: "En restaurantes aliados",
    points: 500,
    category: "food",
    icon: Utensils,
    location: "La Mariscal",
    expires: "45 días",
    available: true,
  },
  {
    id: 5,
    title: "Descuento 15% Ropa",
    description: "En tiendas Marathon Sports",
    points: 800,
    category: "shopping",
    icon: ShoppingBag,
    location: "Centros Comerciales",
    expires: "60 días",
    available: false,
  },
]

const categoryIcons = {
  food: Utensils,
  shopping: ShoppingBag,
  transport: Car,
  entertainment: Star,
}

const categoryColors = {
  food: "text-orange-600 bg-orange-50 dark:bg-orange-950",
  shopping: "text-purple-600 bg-purple-50 dark:bg-purple-950",
  transport: "text-blue-600 bg-blue-50 dark:bg-blue-950",
  entertainment: "text-pink-600 bg-pink-50 dark:bg-pink-950",
}

export default function RecompensasPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")

  const filteredRewards =
    selectedCategory === "all" ? rewards : rewards.filter((reward) => reward.category === selectedCategory)

  const nextLevelPoints = 1500
  const progressPercentage = (userPoints / nextLevelPoints) * 100

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Recompensas</h1>
        <p className="text-muted-foreground">Canjea tus puntos por descuentos y beneficios exclusivos</p>
      </div>

      {/* Estado de puntos del usuario */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Coins className="h-6 w-6 text-yellow-600" />
                {userPoints.toLocaleString()} puntos
              </h2>
              <p className="text-muted-foreground">Disponibles para canjear</p>
            </div>
            <Badge variant="secondary" className="text-lg px-4 py-2">
              Nivel Plata
            </Badge>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progreso al siguiente nivel</span>
              <span>{nextLevelPoints - userPoints} puntos restantes</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
            <p className="text-xs text-muted-foreground">
              Alcanza {nextLevelPoints.toLocaleString()} puntos para nivel Oro y desbloquea recompensas premium
            </p>
          </div>
        </CardContent>
      </Card>

      <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">Todas</TabsTrigger>
          <TabsTrigger value="food">Comida</TabsTrigger>
          <TabsTrigger value="shopping">Compras</TabsTrigger>
          <TabsTrigger value="transport">Transporte</TabsTrigger>
          <TabsTrigger value="entertainment">Entretenimiento</TabsTrigger>
        </TabsList>

        <TabsContent value={selectedCategory} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredRewards.map((reward) => {
              const IconComponent = reward.icon
              const canAfford = userPoints >= reward.points

              return (
                <Card
                  key={reward.id}
                  className={`transition-all hover:shadow-lg ${!canAfford ? "opacity-60" : "hover:scale-105"}`}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div
                        className={`p-2 rounded-lg ${categoryColors[reward.category as keyof typeof categoryColors]}`}
                      >
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <Badge variant={canAfford ? "default" : "secondary"}>{reward.points} pts</Badge>
                    </div>
                    <CardTitle className="text-lg">{reward.title}</CardTitle>
                    <CardDescription>{reward.description}</CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-3">
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{reward.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>Válido por {reward.expires}</span>
                      </div>
                    </div>

                    <Button
                      className="w-full"
                      disabled={!canAfford}
                      variant={canAfford ? "default" : "secondary"}
                      onClick={() => {
                        if (canAfford) {
                          alert(
                            `¡Recompensa canjeada! Has obtenido: ${reward.title}\n\nCódigo: QM${reward.id}${Date.now().toString().slice(-4)}\n\nPresentar en: ${reward.location}`,
                          )
                        }
                      }}
                    >
                      {canAfford ? (
                        <>
                          <Gift className="mr-2 h-4 w-4" />
                          Canjear
                        </>
                      ) : (
                        `Necesitas ${reward.points - userPoints} puntos más`
                      )}
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>
      </Tabs>

      {/* Cómo ganar más puntos */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5 text-yellow-600" />
            ¿Cómo ganar más puntos?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="text-center p-4 rounded-lg bg-green-50 dark:bg-green-950">
              <div className="text-2xl font-bold text-green-600 mb-1">+50</div>
              <div className="text-sm">Usar transporte público</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-blue-50 dark:bg-blue-950">
              <div className="text-2xl font-bold text-blue-600 mb-1">+100</div>
              <div className="text-sm">Usar BiciQ</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-purple-50 dark:bg-purple-950">
              <div className="text-2xl font-bold text-purple-600 mb-1">+25</div>
              <div className="text-sm">Compartir viaje</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-orange-50 dark:bg-orange-950">
              <div className="text-2xl font-bold text-orange-600 mb-1">+150</div>
              <div className="text-sm">Caminar al destino</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Car,
  Bus,
  TreePine,
  Clock,
  Users,
  TrendingUp,
  Award,
  MapPin,
  Calendar,
  Zap,
  Target,
  BarChart3,
  HelpCircle,
} from "lucide-react"
import { useRouter } from "next/navigation"

export default function DashboardPage() {
  const currentHour = new Date().getHours()
  const greeting = currentHour < 12 ? "Buenos días" : currentHour < 18 ? "Buenas tardes" : "Buenas noches"
  const router = useRouter()

  const handleQuickAction = (action: string) => {
    switch (action) {
      case "planificar":
        router.push("/planificar")
        break
      case "carpooling":
        router.push("/carpooling")
        break
      case "recompensas":
        router.push("/recompensas")
        break
      case "estadisticas":
        router.push("/estadisticas")
        break
      case "ayuda":
        router.push("/ayuda")
        break
      default:
        break
    }
  }

  const handleTransportAction = (transport: string) => {
    switch (transport) {
      case "metro":
        alert("Redirigiendo a la app oficial del Metro de Quito...")
        break
      case "trole":
        alert("Información del Trolebús:\n• Horario: 5:00 AM - 11:00 PM\n• Frecuencia: 3-5 minutos\n• Tarifa: $0.35")
        break
      case "buses":
        alert(
          "Red de buses municipales:\n• Más de 100 rutas disponibles\n• Tarifa: $0.35\n• Pago con tarjeta o efectivo",
        )
        break
      default:
        break
    }
  }

  const handleRecentActivity = (activity: string) => {
    switch (activity) {
      case "metro":
        alert(
          "Detalles del viaje:\n• Fecha: Hoy 8:30 AM\n• Ruta: La Carolina → Centro Histórico\n• Duración: 25 minutos\n• Puntos ganados: +50",
        )
        break
      case "carpooling":
        alert(
          "Detalles del viaje compartido:\n• Fecha: Ayer 6:15 PM\n• Ruta: Cumbayá → La Mariscal\n• Conductor: María G.\n• Puntos ganados: +25",
        )
        break
      default:
        break
    }
  }

  return (
    <div className="space-y-8">
      {/* Saludo personalizado - Colores simplificados */}
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-primary">{greeting}, Juan! 👋</h1>
        <p className="text-muted-foreground">
          Aquí tienes un resumen de tu actividad en QuitoMove y sugerencias para hoy
        </p>
      </div>

      {/* Métricas principales - Paleta simplificada */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card
          className="border-l-4 border-l-primary hover:shadow-lg transition-shadow cursor-pointer"
          onClick={() => handleQuickAction("recompensas")}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Puntos Acumulados</CardTitle>
            <div className="p-2 bg-primary/10 rounded-full">
              <Award className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">1,247</div>
            <div className="flex items-center text-xs text-muted-foreground mt-1">
              <TrendingUp className="h-3 w-3 text-primary mr-1" />
              <span>+180 esta semana</span>
            </div>
          </CardContent>
        </Card>

        <Card
          className="border-l-4 border-l-green-600 hover:shadow-lg transition-shadow cursor-pointer"
          onClick={() => handleQuickAction("estadisticas")}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">CO₂ Evitado</CardTitle>
            <div className="p-2 bg-green-100 dark:bg-green-900 rounded-full">
              <TreePine className="h-4 w-4 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">24.5 kg</div>
            <p className="text-xs text-muted-foreground">Este mes</p>
          </CardContent>
        </Card>

        <Card
          className="border-l-4 border-l-muted-foreground hover:shadow-lg transition-shadow cursor-pointer"
          onClick={() => handleQuickAction("estadisticas")}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tiempo Ahorrado</CardTitle>
            <div className="p-2 bg-muted rounded-full">
              <Clock className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8.2 hrs</div>
            <p className="text-xs text-muted-foreground">Esta semana</p>
          </CardContent>
        </Card>

        <Card
          className="border-l-4 border-l-orange-600 hover:shadow-lg transition-shadow cursor-pointer"
          onClick={() => handleQuickAction("estadisticas")}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Viajes Sostenibles</CardTitle>
            <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-full">
              <Bus className="h-4 w-4 text-orange-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">23</div>
            <p className="text-xs text-muted-foreground">Este mes</p>
          </CardContent>
        </Card>
      </div>

      {/* Progreso hacia el siguiente nivel - Simplificado */}
      <Card
        className="bg-primary/5 border-primary/20 cursor-pointer hover:shadow-lg transition-shadow"
        onClick={() => handleQuickAction("recompensas")}
      >
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            Progreso al Nivel Oro
          </CardTitle>
          <CardDescription>Te faltan 253 puntos para desbloquear recompensas premium</CardDescription>
        </CardHeader>
        <CardContent>
          <Progress value={83} className="h-3 mb-2" />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>1,247 puntos</span>
            <span>1,500 puntos</span>
          </div>
        </CardContent>
      </Card>

      {/* Acciones rápidas - Paleta consistente */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card
          className="group hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
          onClick={() => handleQuickAction("planificar")}
        >
          <CardHeader className="pb-3">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-primary/10 rounded-full group-hover:bg-primary/20 transition-colors">
                <Car className="h-6 w-6 text-primary" />
              </div>
              <div>
                <CardTitle className="text-primary">Planificar Viaje</CardTitle>
                <CardDescription>Encuentra la mejor ruta</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Button
              className="w-full"
              onClick={(e) => {
                e.stopPropagation()
                handleQuickAction("planificar")
              }}
            >
              <MapPin className="mr-2 h-4 w-4" />
              Planificar Ahora
            </Button>
          </CardContent>
        </Card>

        <Card
          className="group hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
          onClick={() => handleQuickAction("carpooling")}
        >
          <CardHeader className="pb-3">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full group-hover:bg-green-200 dark:group-hover:bg-green-800 transition-colors">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <CardTitle className="text-green-600">Carpooling</CardTitle>
                <CardDescription>Comparte viajes</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Button
              variant="outline"
              className="w-full border-green-600 text-green-600 hover:bg-green-50 dark:hover:bg-green-950 bg-transparent"
              onClick={(e) => {
                e.stopPropagation()
                handleQuickAction("carpooling")
              }}
            >
              <Users className="mr-2 h-4 w-4" />
              Ver Viajes
            </Button>
          </CardContent>
        </Card>

        <Card
          className="group hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
          onClick={() => handleQuickAction("recompensas")}
        >
          <CardHeader className="pb-3">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-muted rounded-full group-hover:bg-muted/80 transition-colors">
                <Award className="h-6 w-6 text-muted-foreground" />
              </div>
              <div>
                <CardTitle>Recompensas</CardTitle>
                <CardDescription>Canjea tus puntos</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Button
              variant="outline"
              className="w-full bg-transparent"
              onClick={(e) => {
                e.stopPropagation()
                handleQuickAction("recompensas")
              }}
            >
              <Award className="mr-2 h-4 w-4" />
              Ver Recompensas
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Acciones adicionales */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card
          className="group hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
          onClick={() => handleQuickAction("estadisticas")}
        >
          <CardHeader className="pb-3">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full group-hover:bg-blue-200 dark:group-hover:bg-blue-800 transition-colors">
                <BarChart3 className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <CardTitle className="text-blue-600">Estadísticas</CardTitle>
                <CardDescription>Ve tu impacto ambiental</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Button
              variant="outline"
              className="w-full border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950 bg-transparent"
              onClick={(e) => {
                e.stopPropagation()
                handleQuickAction("estadisticas")
              }}
            >
              <BarChart3 className="mr-2 h-4 w-4" />
              Ver Estadísticas
            </Button>
          </CardContent>
        </Card>

        <Card
          className="group hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
          onClick={() => handleQuickAction("ayuda")}
        >
          <CardHeader className="pb-3">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-full group-hover:bg-purple-200 dark:group-hover:bg-purple-800 transition-colors">
                <HelpCircle className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <CardTitle className="text-purple-600">Centro de Ayuda</CardTitle>
                <CardDescription>Soporte y preguntas</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Button
              variant="outline"
              className="w-full border-purple-600 text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-950 bg-transparent"
              onClick={(e) => {
                e.stopPropagation()
                handleQuickAction("ayuda")
              }}
            >
              <HelpCircle className="mr-2 h-4 w-4" />
              Obtener Ayuda
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Información del transporte público - Simplificada */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-orange-600" />
            Información de Transporte Público
          </CardTitle>
          <CardDescription>Tarifas y horarios actualizados</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div
              className="p-4 bg-primary/5 rounded-lg border border-primary/20 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => handleTransportAction("metro")}
            >
              <div className="flex items-center space-x-3">
                <Bus className="h-8 w-8 text-primary" />
                <div>
                  <h3 className="font-semibold text-primary">Metro</h3>
                  <p className="text-2xl font-bold text-primary">$0.45</p>
                  <p className="text-xs text-muted-foreground">Línea 1 operativa</p>
                </div>
              </div>
            </div>

            <div
              className="p-4 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => handleTransportAction("trole")}
            >
              <div className="flex items-center space-x-3">
                <Bus className="h-8 w-8 text-green-600" />
                <div>
                  <h3 className="font-semibold text-green-600">Trole</h3>
                  <p className="text-2xl font-bold text-green-600">$0.35</p>
                  <p className="text-xs text-muted-foreground">Servicio completo</p>
                </div>
              </div>
            </div>

            <div
              className="p-4 bg-muted/50 rounded-lg border cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => handleTransportAction("buses")}
            >
              <div className="flex items-center space-x-3">
                <Bus className="h-8 w-8 text-muted-foreground" />
                <div>
                  <h3 className="font-semibold">Buses</h3>
                  <p className="text-2xl font-bold">$0.35</p>
                  <p className="text-xs text-muted-foreground">Red municipal</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actividad reciente - Simplificada */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            Actividad Reciente
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div
              className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-950 rounded-lg cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => handleRecentActivity("metro")}
            >
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 dark:bg-green-900 rounded-full">
                  <Bus className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="font-medium">Viaje en Metro</p>
                  <p className="text-sm text-muted-foreground">La Carolina → Centro Histórico</p>
                </div>
              </div>
              <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">+50 pts</Badge>
            </div>

            <div
              className="flex items-center justify-between p-3 bg-primary/5 rounded-lg cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => handleRecentActivity("carpooling")}
            >
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary/10 rounded-full">
                  <Users className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Carpooling</p>
                  <p className="text-sm text-muted-foreground">Cumbayá → La Mariscal</p>
                </div>
              </div>
              <Badge>+25 pts</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

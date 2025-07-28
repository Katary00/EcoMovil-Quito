"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { TreePine, Clock, DollarSign, Route, TrendingUp, Award, Users, Target } from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"

const monthlyData = [
  { month: "Ene", co2: 12, tiempo: 15, dinero: 45 },
  { month: "Feb", co2: 18, tiempo: 22, dinero: 67 },
  { month: "Mar", co2: 24, tiempo: 28, dinero: 89 },
  { month: "Abr", co2: 31, tiempo: 35, dinero: 112 },
  { month: "May", co2: 28, tiempo: 32, dinero: 98 },
  { month: "Jun", co2: 35, tiempo: 41, dinero: 125 },
]

const transportData = [
  { name: "Transporte Público", value: 45, color: "#3b82f6" },
  { name: "BiciQ", value: 30, color: "#10b981" },
  { name: "Caminata", value: 15, color: "#8b5cf6" },
  { name: "Carpooling", value: 10, color: "#f59e0b" },
]

const weeklyTrips = [
  { day: "Lun", trips: 4 },
  { day: "Mar", trips: 3 },
  { day: "Mié", trips: 5 },
  { day: "Jue", trips: 2 },
  { day: "Vie", trips: 4 },
  { day: "Sáb", trips: 1 },
  { day: "Dom", trips: 2 },
]

export default function EstadisticasPage() {
  const currentMonth = {
    co2Avoided: 24.5,
    timeSaved: 8.2,
    moneySaved: 89.5,
    sustainableTrips: 23,
  }

  const communityAverage = {
    co2Avoided: 18.3,
    timeSaved: 6.1,
    moneySaved: 67.2,
    sustainableTrips: 18,
  }

  const achievements = [
    { title: "Eco Warrior", description: "50 viajes sostenibles", completed: true },
    { title: "Ahorrador", description: "Ahorrar $100 en un mes", completed: false, progress: 89 },
    { title: "Ciclista Urbano", description: "20 viajes en BiciQ", completed: true },
    { title: "Carpooler", description: "10 viajes compartidos", completed: false, progress: 60 },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Estadísticas</h1>
        <p className="text-muted-foreground">Descubre el impacto positivo de tus decisiones de movilidad</p>
      </div>

      {/* Métricas principales del mes actual */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">CO₂ Evitado</CardTitle>
            <TreePine className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{currentMonth.co2Avoided} kg</div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground mt-1">
              <TrendingUp className="h-3 w-3 text-green-600" />
              <span>+34% vs promedio comunidad</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tiempo Ahorrado</CardTitle>
            <Clock className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{currentMonth.timeSaved} hrs</div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground mt-1">
              <TrendingUp className="h-3 w-3 text-blue-600" />
              <span>+34% vs promedio comunidad</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Dinero Ahorrado</CardTitle>
            <DollarSign className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">${currentMonth.moneySaved}</div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground mt-1">
              <TrendingUp className="h-3 w-3 text-purple-600" />
              <span>+33% vs promedio comunidad</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Viajes Sostenibles</CardTitle>
            <Route className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{currentMonth.sustainableTrips}</div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground mt-1">
              <TrendingUp className="h-3 w-3 text-orange-600" />
              <span>+28% vs promedio comunidad</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos de evolución */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Evolución Mensual</CardTitle>
            <CardDescription>Tu progreso en los últimos 6 meses</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Line type="monotone" dataKey="co2" stroke="#10b981" strokeWidth={2} name="CO₂ (kg)" />
                <Line type="monotone" dataKey="tiempo" stroke="#3b82f6" strokeWidth={2} name="Tiempo (hrs)" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Medios de Transporte</CardTitle>
            <CardDescription>Distribución de tus viajes este mes</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={transportData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {transportData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {transportData.map((item, index) => (
                <div key={index} className="flex items-center space-x-2 text-sm">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span>
                    {item.name}: {item.value}%
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Viajes semanales */}
      <Card>
        <CardHeader>
          <CardTitle>Viajes Esta Semana</CardTitle>
          <CardDescription>Número de viajes sostenibles por día</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={weeklyTrips}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Bar dataKey="trips" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Comparación con la comunidad */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Comparación con la Comunidad
          </CardTitle>
          <CardDescription>Cómo te comparas con el promedio de usuarios de QuitoMove</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>CO₂ Evitado (kg)</span>
                <span>
                  Tú: {currentMonth.co2Avoided} | Promedio: {communityAverage.co2Avoided}
                </span>
              </div>
              <Progress value={(currentMonth.co2Avoided / communityAverage.co2Avoided) * 100} className="h-2" />
            </div>

            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Tiempo Ahorrado (hrs)</span>
                <span>
                  Tú: {currentMonth.timeSaved} | Promedio: {communityAverage.timeSaved}
                </span>
              </div>
              <Progress value={(currentMonth.timeSaved / communityAverage.timeSaved) * 100} className="h-2" />
            </div>

            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Dinero Ahorrado ($)</span>
                <span>
                  Tú: {currentMonth.moneySaved} | Promedio: {communityAverage.moneySaved}
                </span>
              </div>
              <Progress value={(currentMonth.moneySaved / communityAverage.moneySaved) * 100} className="h-2" />
            </div>

            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Viajes Sostenibles</span>
                <span>
                  Tú: {currentMonth.sustainableTrips} | Promedio: {communityAverage.sustainableTrips}
                </span>
              </div>
              <Progress
                value={(currentMonth.sustainableTrips / communityAverage.sustainableTrips) * 100}
                className="h-2"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Logros y metas */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-yellow-600" />
            Logros y Metas
          </CardTitle>
          <CardDescription>Tu progreso hacia objetivos de movilidad sostenible</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {achievements.map((achievement, index) => (
              <div key={index} className="flex items-center space-x-4 p-4 rounded-lg border">
                <div
                  className={`p-2 rounded-full ${achievement.completed ? "bg-green-100 dark:bg-green-900" : "bg-gray-100 dark:bg-gray-800"}`}
                >
                  {achievement.completed ? (
                    <Award className="h-5 w-5 text-green-600" />
                  ) : (
                    <Target className="h-5 w-5 text-gray-600" />
                  )}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">{achievement.title}</h4>
                  <p className="text-sm text-muted-foreground">{achievement.description}</p>
                  {!achievement.completed && achievement.progress && (
                    <div className="mt-2">
                      <Progress value={achievement.progress} className="h-1" />
                      <p className="text-xs text-muted-foreground mt-1">{achievement.progress}% completado</p>
                    </div>
                  )}
                </div>
                {achievement.completed && (
                  <Badge
                    variant="secondary"
                    className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                  >
                    Completado
                  </Badge>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

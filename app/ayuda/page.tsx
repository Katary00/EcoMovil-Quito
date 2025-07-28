"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { HelpCircle, MessageCircle, Mail, Phone, Search, BookOpen, Users, Car, Gift } from "lucide-react"

const faqData = [
  {
    category: "general",
    question: "¿Cómo funciona QuitoMove?",
    answer:
      "QuitoMove es una aplicación que te ayuda a planificar viajes sostenibles en Quito. Puedes comparar diferentes medios de transporte, participar en carpooling, ganar puntos por viajes sostenibles y canjear recompensas.",
  },
  {
    category: "general",
    question: "¿Es gratis usar la aplicación?",
    answer: "Sí, QuitoMove es completamente gratuita. Puedes descargarla y usar todas sus funciones sin costo alguno.",
  },
  {
    category: "puntos",
    question: "¿Cómo gano puntos?",
    answer:
      "Ganas puntos usando medios de transporte sostenibles: 50 puntos por usar transporte público, 100 puntos por usar BiciQ, 150 puntos por caminar, y 25 puntos por compartir viajes en carpooling.",
  },
  {
    category: "puntos",
    question: "¿Los puntos expiran?",
    answer: "Los puntos no expiran, pero las recompensas sí tienen fecha de vencimiento una vez canjeadas.",
  },
  {
    category: "carpooling",
    question: "¿Es seguro el carpooling?",
    answer:
      "Sí, todos los usuarios pasan por un proceso de verificación. Además, contamos con un sistema de calificaciones y comentarios para mantener la seguridad de la comunidad.",
  },
  {
    category: "carpooling",
    question: "¿Cómo cancelo un viaje compartido?",
    answer:
      "Puedes cancelar un viaje hasta 2 horas antes del horario programado desde la sección 'Mis Viajes' en tu perfil.",
  },
  {
    category: "recompensas",
    question: "¿Cómo canjeo mis puntos?",
    answer:
      "Ve a la sección 'Recompensas', selecciona la recompensa que deseas y presiona 'Canjear'. Recibirás un código QR o cupón para usar en el establecimiento.",
  },
  {
    category: "recompensas",
    question: "¿Puedo devolver una recompensa canjeada?",
    answer:
      "Las recompensas canjeadas no se pueden devolver, pero si tienes problemas para usarla, contacta a nuestro soporte.",
  },
]

const categories = [
  { id: "general", name: "General", icon: HelpCircle },
  { id: "puntos", name: "Puntos", icon: Gift },
  { id: "carpooling", name: "Carpooling", icon: Car },
  { id: "recompensas", name: "Recompensas", icon: Gift },
]

export default function AyudaPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [chatMessage, setChatMessage] = useState("")

  const filteredFAQ = faqData.filter((item) => {
    const matchesSearch =
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Centro de Ayuda</h1>
        <p className="text-muted-foreground">Encuentra respuestas rápidas o contacta con nuestro equipo de soporte</p>
      </div>

      <Tabs defaultValue="faq" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="faq">Preguntas Frecuentes</TabsTrigger>
          <TabsTrigger value="chat">Chat de Ayuda</TabsTrigger>
          <TabsTrigger value="contacto">Contacto</TabsTrigger>
        </TabsList>

        <TabsContent value="faq" className="space-y-6">
          {/* Buscador */}
          <Card>
            <CardContent className="p-6">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar en preguntas frecuentes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>

          {/* Filtros por categoría */}
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedCategory === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory("all")}
            >
              Todas
            </Button>
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className="flex items-center gap-2"
              >
                <category.icon className="h-4 w-4" />
                {category.name}
              </Button>
            ))}
          </div>

          {/* FAQ Accordion */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Preguntas Frecuentes
              </CardTitle>
              <CardDescription>
                {filteredFAQ.length} pregunta{filteredFAQ.length !== 1 ? "s" : ""} encontrada
                {filteredFAQ.length !== 1 ? "s" : ""}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {filteredFAQ.map((item, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {categories.find((c) => c.id === item.category)?.name}
                        </Badge>
                        {item.question}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">{item.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>

              {filteredFAQ.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <HelpCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No se encontraron preguntas que coincidan con tu búsqueda.</p>
                  <p className="text-sm mt-2">Intenta con otros términos o contacta directamente con soporte.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="chat" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                Chat Automatizado
              </CardTitle>
              <CardDescription>Obtén respuestas inmediatas a tus preguntas más comunes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Simulación de chat */}
              <div className="border rounded-lg p-4 h-64 overflow-y-auto bg-muted/20">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                      <MessageCircle className="h-4 w-4 text-primary-foreground" />
                    </div>
                    <div className="bg-background rounded-lg p-3 max-w-xs">
                      <p className="text-sm">
                        ¡Hola! Soy el asistente virtual de QuitoMove. ¿En qué puedo ayudarte hoy?
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <div className="bg-primary text-primary-foreground rounded-lg p-3 max-w-xs">
                      <p className="text-sm">¿Cómo puedo ganar más puntos?</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                      <MessageCircle className="h-4 w-4 text-primary-foreground" />
                    </div>
                    <div className="bg-background rounded-lg p-3 max-w-xs">
                      <p className="text-sm">Puedes ganar puntos de estas formas:</p>
                      <ul className="text-sm mt-2 space-y-1">
                        <li>• 50 pts - Transporte público</li>
                        <li>• 100 pts - Usar BiciQ</li>
                        <li>• 150 pts - Caminar</li>
                        <li>• 25 pts - Carpooling</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Input
                  placeholder="Escribe tu pregunta..."
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                />
                <Button>Enviar</Button>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm">
                  ¿Cómo funciona el carpooling?
                </Button>
                <Button variant="outline" size="sm">
                  ¿Cómo canjeo recompensas?
                </Button>
                <Button variant="outline" size="sm">
                  ¿Es segura la app?
                </Button>
                <Button variant="outline" size="sm">
                  ¿Cómo actualizo mi perfil?
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contacto" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Información de contacto */}
            <Card>
              <CardHeader>
                <CardTitle>Información de Contacto</CardTitle>
                <CardDescription>Múltiples formas de comunicarte con nuestro equipo</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <Mail className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">soporte@quitomove.ec</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <Phone className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="font-medium">Teléfono</p>
                    <p className="text-sm text-muted-foreground">+593 2 123-4567</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <MessageCircle className="h-5 w-5 text-purple-600" />
                  <div>
                    <p className="font-medium">WhatsApp</p>
                    <p className="text-sm text-muted-foreground">+593 99 123-4567</p>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                  <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Horarios de Atención</h4>
                  <div className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                    <p>Lunes a Viernes: 8:00 AM - 6:00 PM</p>
                    <p>Sábados: 9:00 AM - 2:00 PM</p>
                    <p>Domingos: Cerrado</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Formulario de contacto */}
            <Card>
              <CardHeader>
                <CardTitle>Enviar Mensaje</CardTitle>
                <CardDescription>Describe tu problema y te responderemos pronto</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Nombre completo</label>
                  <Input placeholder="Tu nombre" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <Input type="email" placeholder="tu@email.com" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Categoría</label>
                  <select className="w-full p-2 border rounded-md">
                    <option>Problema técnico</option>
                    <option>Pregunta sobre puntos</option>
                    <option>Problema con carpooling</option>
                    <option>Problema con recompensas</option>
                    <option>Sugerencia</option>
                    <option>Otro</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Mensaje</label>
                  <Textarea placeholder="Describe tu problema o pregunta en detalle..." rows={4} />
                </div>

                <Button className="w-full">
                  <Mail className="mr-2 h-4 w-4" />
                  Enviar Mensaje
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Guía rápida para nuevos usuarios */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Guía Rápida para Nuevos Usuarios
              </CardTitle>
              <CardDescription>Pasos básicos para comenzar a usar QuitoMove</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="text-center p-4 rounded-lg border">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-blue-600 font-bold">1</span>
                  </div>
                  <h4 className="font-medium mb-2">Completa tu Perfil</h4>
                  <p className="text-sm text-muted-foreground">Agrega tu información básica y preferencias de viaje</p>
                </div>

                <div className="text-center p-4 rounded-lg border">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-green-600 font-bold">2</span>
                  </div>
                  <h4 className="font-medium mb-2">Planifica tu Primer Viaje</h4>
                  <p className="text-sm text-muted-foreground">
                    Usa la función "Planificar Viaje" para comparar opciones
                  </p>
                </div>

                <div className="text-center p-4 rounded-lg border">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-purple-600 font-bold">3</span>
                  </div>
                  <h4 className="font-medium mb-2">Gana Puntos</h4>
                  <p className="text-sm text-muted-foreground">Elige opciones sostenibles y acumula puntos</p>
                </div>

                <div className="text-center p-4 rounded-lg border">
                  <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-orange-600 font-bold">4</span>
                  </div>
                  <h4 className="font-medium mb-2">Canjea Recompensas</h4>
                  <p className="text-sm text-muted-foreground">Usa tus puntos para obtener descuentos y beneficios</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

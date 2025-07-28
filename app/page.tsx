"use client";

import type React from "react";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Car,
  Bus,
  TreePine,
  Clock,
  DollarSign,
  Users,
  CheckCircle,
  AlertTriangle,
  Mail,
  Phone,
  Loader2,
  User,
} from "lucide-react";
import { useAuth } from "@/components/auth-provider";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const { login, register, isAuthenticated } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    birthDate: "",
    emergencyContact: "",
    hasVehicle: false,
    vehicleData: {
      vehicleType: "",
      fuelType: "",
      fuelEfficiency: "",
      brand: "",
      model: "",
      year: "",
    },
  });

  // Si está autenticado, redirigir al dashboard
  if (isAuthenticated) {
    router.push("/dashboard");
    return null;
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login(loginData.email, loginData.password);
    } catch (error) {
      alert("Error al iniciar sesión");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await register(
        registerData.name,
        registerData.email,
        registerData.password
      );
    } catch (error) {
      alert("Error al registrarse");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-16">
          {/* Header con Login/Registro - Paleta simplificada */}
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-primary">
                EcoMovil Quito
              </h1>
              <p className="text-xl md:text-2xl text-foreground max-w-3xl mx-auto">
                La aplicación inteligente que revoluciona la movilidad en Quito
              </p>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Reduce el tráfico, ahorra dinero y cuida el medio ambiente con
                decisiones inteligentes de transporte
              </p>
            </div>

            {/* Formularios de Login/Registro - Simplificados */}
            <div className="max-w-lg mx-auto">
              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="login">Iniciar Sesión</TabsTrigger>
                  <TabsTrigger value="register">Registrarse</TabsTrigger>
                </TabsList>

                <TabsContent value="login">
                  <Card className="shadow-xl">
                    <CardHeader className="text-center pb-2">
                      <CardTitle>Iniciar Sesión</CardTitle>
                      <CardDescription>
                        Ingresa a tu cuenta de EcoMovil Quito
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleLogin} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="tu@email.com"
                            value={loginData.email}
                            onChange={(e) =>
                              setLoginData({
                                ...loginData,
                                email: e.target.value,
                              })
                            }
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="password">Contraseña</Label>
                          <Input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            value={loginData.password}
                            onChange={(e) =>
                              setLoginData({
                                ...loginData,
                                password: e.target.value,
                              })
                            }
                            required
                          />
                        </div>
                        <Button
                          type="submit"
                          className="w-full py-3"
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Iniciando sesión...
                            </>
                          ) : (
                            "Iniciar Sesión"
                          )}
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="register">
                  <Card className="shadow-xl">
                    <CardHeader className="text-center pb-2">
                      <CardTitle>Crear Cuenta</CardTitle>
                      <CardDescription>
                        Únete a la comunidad EcoMovil Quito
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleRegister} className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor="name">Nombre completo *</Label>
                            <Input
                              id="name"
                              placeholder="Juan Pérez"
                              value={registerData.name}
                              onChange={(e) =>
                                setRegisterData({
                                  ...registerData,
                                  name: e.target.value,
                                })
                              }
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="phone">Teléfono *</Label>
                            <Input
                              id="phone"
                              placeholder="+593 99 123-4567"
                              value={registerData.phone}
                              onChange={(e) =>
                                setRegisterData({
                                  ...registerData,
                                  phone: e.target.value,
                                })
                              }
                              required
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="register-email">Email *</Label>
                          <Input
                            id="register-email"
                            type="email"
                            placeholder="tu@email.com"
                            value={registerData.email}
                            onChange={(e) =>
                              setRegisterData({
                                ...registerData,
                                email: e.target.value,
                              })
                            }
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="address">Dirección</Label>
                          <Input
                            id="address"
                            placeholder="Av. Amazonas y Naciones Unidas"
                            value={registerData.address}
                            onChange={(e) =>
                              setRegisterData({
                                ...registerData,
                                address: e.target.value,
                              })
                            }
                          />
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor="birthDate">
                              Fecha de nacimiento
                            </Label>
                            <Input
                              id="birthDate"
                              type="date"
                              value={registerData.birthDate}
                              onChange={(e) =>
                                setRegisterData({
                                  ...registerData,
                                  birthDate: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="emergencyContact">
                              Contacto de emergencia
                            </Label>
                            <Input
                              id="emergencyContact"
                              placeholder="+593 99 987-6543"
                              value={registerData.emergencyContact}
                              onChange={(e) =>
                                setRegisterData({
                                  ...registerData,
                                  emergencyContact: e.target.value,
                                })
                              }
                            />
                          </div>
                        </div>

                        {/* Información del vehículo */}
                        <div className="space-y-4 p-4 bg-muted/50 rounded-lg">
                          <div className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id="hasVehicle"
                              checked={registerData.hasVehicle}
                              onChange={(e) =>
                                setRegisterData({
                                  ...registerData,
                                  hasVehicle: e.target.checked,
                                })
                              }
                              className="rounded"
                            />
                            <Label
                              htmlFor="hasVehicle"
                              className="text-sm font-medium"
                            >
                              Tengo vehículo privado
                            </Label>
                          </div>

                          {registerData.hasVehicle && (
                            <div className="space-y-4">
                              <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                  <Label htmlFor="vehicleType">
                                    Tipo de vehículo
                                  </Label>
                                  <Select
                                    value={registerData.vehicleData.vehicleType}
                                    onValueChange={(value) =>
                                      setRegisterData({
                                        ...registerData,
                                        vehicleData: {
                                          ...registerData.vehicleData,
                                          vehicleType: value,
                                        },
                                      })
                                    }
                                  >
                                    <SelectTrigger>
                                      <SelectValue placeholder="Selecciona tipo" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="sedan">
                                        Sedán
                                      </SelectItem>
                                      <SelectItem value="suv">SUV</SelectItem>
                                      <SelectItem value="hatchback">
                                        Hatchback
                                      </SelectItem>
                                      <SelectItem value="pickup">
                                        Pickup
                                      </SelectItem>
                                      <SelectItem value="moto">
                                        Motocicleta
                                      </SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>

                                <div className="space-y-2">
                                  <Label htmlFor="fuelType">
                                    Tipo de combustible
                                  </Label>
                                  <Select
                                    value={registerData.vehicleData.fuelType}
                                    onValueChange={(value) =>
                                      setRegisterData({
                                        ...registerData,
                                        vehicleData: {
                                          ...registerData.vehicleData,
                                          fuelType: value,
                                        },
                                      })
                                    }
                                  >
                                    <SelectTrigger>
                                      <SelectValue placeholder="Selecciona combustible" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="gasolina">
                                        Gasolina
                                      </SelectItem>
                                      <SelectItem value="diesel">
                                        Diésel
                                      </SelectItem>
                                      <SelectItem value="gasNatural">
                                        Gas Natural
                                      </SelectItem>
                                      <SelectItem value="hibrido">
                                        Híbrido
                                      </SelectItem>
                                      <SelectItem value="electrico">
                                        Eléctrico
                                      </SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>

                              <div className="grid gap-4 md:grid-cols-3">
                                <div className="space-y-2">
                                  <Label htmlFor="brand">Marca</Label>
                                  <Input
                                    id="brand"
                                    placeholder="Toyota"
                                    value={registerData.vehicleData.brand}
                                    onChange={(e) =>
                                      setRegisterData({
                                        ...registerData,
                                        vehicleData: {
                                          ...registerData.vehicleData,
                                          brand: e.target.value,
                                        },
                                      })
                                    }
                                  />
                                </div>

                                <div className="space-y-2">
                                  <Label htmlFor="model">Modelo</Label>
                                  <Input
                                    id="model"
                                    placeholder="Corolla"
                                    value={registerData.vehicleData.model}
                                    onChange={(e) =>
                                      setRegisterData({
                                        ...registerData,
                                        vehicleData: {
                                          ...registerData.vehicleData,
                                          model: e.target.value,
                                        },
                                      })
                                    }
                                  />
                                </div>

                                <div className="space-y-2">
                                  <Label htmlFor="year">Año</Label>
                                  <Input
                                    id="year"
                                    placeholder="2020"
                                    value={registerData.vehicleData.year}
                                    onChange={(e) =>
                                      setRegisterData({
                                        ...registerData,
                                        vehicleData: {
                                          ...registerData.vehicleData,
                                          year: e.target.value,
                                        },
                                      })
                                    }
                                  />
                                </div>
                              </div>

                              <div className="space-y-2">
                                <Label htmlFor="fuelEfficiency">
                                  Rendimiento (
                                  {registerData.vehicleData.fuelType ===
                                  "electrico"
                                    ? "km/kWh"
                                    : "km/l"}
                                  )
                                </Label>
                                <Input
                                  id="fuelEfficiency"
                                  placeholder={
                                    registerData.vehicleData.fuelType ===
                                    "electrico"
                                      ? "5"
                                      : "12"
                                  }
                                  value={
                                    registerData.vehicleData.fuelEfficiency
                                  }
                                  onChange={(e) =>
                                    setRegisterData({
                                      ...registerData,
                                      vehicleData: {
                                        ...registerData.vehicleData,
                                        fuelEfficiency: e.target.value,
                                      },
                                    })
                                  }
                                />
                                <p className="text-xs text-muted-foreground">
                                  {registerData.vehicleData.fuelType ===
                                  "electrico"
                                    ? "Kilómetros por kilovatio-hora"
                                    : "Kilómetros por litro de combustible"}
                                </p>
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="register-password">
                            Contraseña *
                          </Label>
                          <Input
                            id="register-password"
                            type="password"
                            placeholder="••••••••"
                            value={registerData.password}
                            onChange={(e) =>
                              setRegisterData({
                                ...registerData,
                                password: e.target.value,
                              })
                            }
                            required
                          />
                        </div>

                        <Button
                          type="submit"
                          className="w-full py-3"
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Creando cuenta...
                            </>
                          ) : (
                            <>
                              <User className="mr-2 h-4 w-4" />
                              Crear Cuenta
                            </>
                          )}
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Problema - Simplificado */}
          <Card className="bg-destructive/5 border-destructive/20 shadow-xl">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl flex items-center justify-center gap-3 text-destructive">
                <AlertTriangle className="h-8 w-8" />
                El Problema
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              <p className="text-center text-xl text-muted-foreground">
                Quito enfrenta una crisis de movilidad que afecta a todos los
                ciudadanos
              </p>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <div className="text-center p-6 bg-card rounded-xl shadow-lg">
                  <Clock className="h-12 w-12 text-destructive mx-auto mb-4" />
                  <div className="text-3xl font-bold text-destructive mb-2">
                    173 hrs
                  </div>
                  <div className="text-sm text-muted-foreground">
                    perdidas por persona al año
                  </div>
                </div>
                <div className="text-center p-6 bg-card rounded-xl shadow-lg">
                  <DollarSign className="h-12 w-12 text-destructive mx-auto mb-4" />
                  <div className="text-3xl font-bold text-destructive mb-2">
                    $550M
                  </div>
                  <div className="text-sm text-muted-foreground">
                    pérdidas económicas anuales
                  </div>
                </div>
                <div className="text-center p-6 bg-card rounded-xl shadow-lg">
                  <TreePine className="h-12 w-12 text-destructive mx-auto mb-4" />
                  <div className="text-3xl font-bold text-destructive mb-2">
                    Alto
                  </div>
                  <div className="text-sm text-muted-foreground">
                    nivel de contaminación
                  </div>
                </div>
                <div className="text-center p-6 bg-card rounded-xl shadow-lg">
                  <Users className="h-12 w-12 text-destructive mx-auto mb-4" />
                  <div className="text-3xl font-bold text-destructive mb-2">
                    2.8M
                  </div>
                  <div className="text-sm text-muted-foreground">
                    ciudadanos afectados
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Solución - Simplificada */}
          <Card className="bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800 shadow-xl">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl flex items-center justify-center gap-3 text-green-600">
                <CheckCircle className="h-8 w-8" />
                Nuestra Solución
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              <p className="text-center text-xl text-muted-foreground">
                Una plataforma inteligente que optimiza la movilidad urbana
                mediante tecnología y colaboración ciudadana
              </p>

              <div className="grid gap-8 md:grid-cols-2">
                <div className="space-y-6">
                  <div className="flex items-start gap-4 p-4 bg-card rounded-lg shadow-md">
                    <div className="p-3 bg-primary/10 rounded-full">
                      <Car className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary mb-2">
                        Planificación Inteligente
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Compara opciones de transporte en tiempo real con datos
                        de tráfico, costos y impacto ambiental
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-card rounded-lg shadow-md">
                    <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full">
                      <Users className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-green-600 mb-2">
                        Carpooling Seguro
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Conecta ciudadanos verificados para compartir viajes y
                        reducir vehículos en las calles
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="flex items-start gap-4 p-4 bg-card rounded-lg shadow-md">
                    <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full">
                      <TreePine className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-green-600 mb-2">
                        Incentivos Sostenibles
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Sistema de puntos que recompensa decisiones ecológicas
                        con beneficios reales
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-card rounded-lg shadow-md">
                    <div className="p-3 bg-muted rounded-full">
                      <Bus className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Integración Total</h3>
                      <p className="text-sm text-muted-foreground">
                        Conecta metro, trole, buses, BiciQ y caminata en una
                        sola plataforma
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contacto - Simplificado */}
          <Card className="shadow-xl">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">¿Tienes Preguntas?</CardTitle>
              <CardDescription>Estamos aquí para ayudarte</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2 max-w-md mx-auto">
                <div className="flex items-center gap-4 p-4 bg-primary/5 rounded-lg">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-primary">Email</p>
                    <p className="text-sm text-muted-foreground">
                      info@ecoMovilquito.ec
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                  <div className="p-2 bg-green-100 dark:bg-green-900 rounded-full">
                    <Phone className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-green-600">Teléfono</p>
                    <p className="text-sm text-muted-foreground">
                      +593 2 123-4567
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

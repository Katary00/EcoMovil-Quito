"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Bike, MapPin, Clock, QrCode, Copy, CheckCircle } from "lucide-react"
import { useState } from "react"

interface BikeUnlockModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  unlockCode: string
}

export function BikeUnlockModal({ open, onOpenChange, unlockCode }: BikeUnlockModalProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(unlockCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-green-700 dark:text-green-300">
            <Bike className="h-5 w-5" />
            ¡Bicicleta Desbloqueada!
          </DialogTitle>
          <DialogDescription>Tu BiciQ está lista para usar</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Código de desbloqueo */}
          <Card className="bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center mb-4">
                <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full">
                  <QrCode className="h-8 w-8 text-green-600" />
                </div>
              </div>
              <h3 className="font-semibold text-green-700 dark:text-green-300 mb-2">Código de Desbloqueo</h3>
              <div className="text-3xl font-mono font-bold text-green-600 mb-4 tracking-wider">{unlockCode}</div>
              <Button
                variant="outline"
                size="sm"
                onClick={copyToClipboard}
                className="border-green-600 text-green-600 hover:bg-green-50 dark:hover:bg-green-950 bg-transparent"
              >
                {copied ? (
                  <>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Copiado
                  </>
                ) : (
                  <>
                    <Copy className="mr-2 h-4 w-4" />
                    Copiar Código
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Información de la estación */}
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-medium text-blue-700 dark:text-blue-300">Estación</p>
                  <p className="text-sm text-muted-foreground">Plaza Foch</p>
                </div>
              </div>
              <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">2 min</Badge>
            </div>

            <div className="flex items-center justify-between p-3 bg-purple-50 dark:bg-purple-950 rounded-lg">
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-purple-600" />
                <div>
                  <p className="font-medium text-purple-700 dark:text-purple-300">Tiempo Límite</p>
                  <p className="text-sm text-muted-foreground">2 horas incluidas</p>
                </div>
              </div>
              <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100">$0.50</Badge>
            </div>
          </div>

          {/* Instrucciones */}
          <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
            <h4 className="font-medium mb-2">Instrucciones:</h4>
            <ol className="text-sm text-muted-foreground space-y-1">
              <li>1. Dirígete a la estación Plaza Foch</li>
              <li>2. Ingresa el código en el panel de la bicicleta</li>
              <li>3. Retira la bicicleta del soporte</li>
              <li>4. ¡Disfruta tu viaje sostenible!</li>
            </ol>
          </div>

          <div className="flex space-x-2">
            <Button variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
              Cerrar
            </Button>
            <Button className="flex-1 bg-green-600 hover:bg-green-700">
              <MapPin className="mr-2 h-4 w-4" />
              Ver Ruta a Estación
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

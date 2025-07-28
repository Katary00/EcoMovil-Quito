"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Check, ChevronsUpDown, MapPin, Map } from "lucide-react"
import { cn } from "@/lib/utils"

const quitoLocations = [
  { value: "la-carolina", label: "La Carolina", zone: "Norte" },
  { value: "centro-historico", label: "Centro Histórico", zone: "Centro" },
  { value: "la-mariscal", label: "La Mariscal", zone: "Norte" },
  { value: "cumbaya", label: "Cumbayá", zone: "Valle" },
  { value: "el-recreo", label: "El Recreo", zone: "Sur" },
  { value: "quitumbe", label: "Quitumbe", zone: "Sur" },
  { value: "la-y", label: "La Y", zone: "Norte" },
  { value: "el-labrador", label: "El Labrador", zone: "Norte" },
  { value: "plaza-foch", label: "Plaza Foch", zone: "Norte" },
  { value: "terminal-terrestre", label: "Terminal Terrestre", zone: "Sur" },
  { value: "aeropuerto", label: "Aeropuerto", zone: "Norte" },
  { value: "universidad-central", label: "Universidad Central", zone: "Centro" },
  { value: "parque-el-ejido", label: "Parque El Ejido", zone: "Centro" },
  { value: "plaza-grande", label: "Plaza Grande", zone: "Centro" },
  { value: "basilica", label: "Basílica del Voto Nacional", zone: "Centro" },
  { value: "tumbaco", label: "Tumbaco", zone: "Valle" },
  { value: "sangolqui", label: "Sangolquí", zone: "Valle" },
  { value: "calderon", label: "Calderón", zone: "Norte" },
]

interface LocationSelectorProps {
  placeholder: string
  value: string
  onChange: (value: string) => void
  className?: string
  onMapClick?: () => void
}

export function LocationSelector({ placeholder, value, onChange, className, onMapClick }: LocationSelectorProps) {
  const [open, setOpen] = useState(false)
  const [inputValue, setInputValue] = useState(value)

  const selectedLocation = quitoLocations.find((location) => location.value === value)

  const handleSelect = (selectedValue: string) => {
    const location = quitoLocations.find((loc) => loc.value === selectedValue)
    if (location) {
      onChange(location.label)
      setInputValue(location.label)
    }
    setOpen(false)
  }

  const handleInputChange = (newValue: string) => {
    setInputValue(newValue)
    onChange(newValue)
  }

  const handleMapClick = () => {
    if (onMapClick) {
      onMapClick()
      setOpen(false)
    }
  }

  return (
    <div className="relative">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn("w-full justify-between text-left font-normal", className)}
          >
            <div className="flex items-center">
              <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
              <span className={cn("truncate", !inputValue && "text-muted-foreground")}>
                {inputValue || placeholder}
              </span>
            </div>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[var(--radix-popper-anchor-width)] p-0" align="start">
          <Command>
            <CommandInput placeholder="Buscar ubicación..." value={inputValue} onValueChange={handleInputChange} />
            <CommandList>
              <CommandEmpty>No se encontraron ubicaciones.</CommandEmpty>

              {/* Opción para ver en mapa */}
              {onMapClick && (
                <CommandGroup heading="Opciones">
                  <CommandItem onSelect={handleMapClick} className="text-primary">
                    <Map className="mr-2 h-4 w-4" />
                    <span>Ver en mapa</span>
                  </CommandItem>
                </CommandGroup>
              )}

              <CommandGroup heading="Ubicaciones Populares">
                {quitoLocations
                  .filter((location) => location.label.toLowerCase().includes(inputValue.toLowerCase()))
                  .map((location) => (
                    <CommandItem
                      key={location.value}
                      value={location.value}
                      onSelect={handleSelect}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center">
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            selectedLocation?.value === location.value ? "opacity-100" : "opacity-0",
                          )}
                        />
                        <div>
                          <div className="font-medium">{location.label}</div>
                          <div className="text-sm text-muted-foreground">{location.zone}</div>
                        </div>
                      </div>
                    </CommandItem>
                  ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}

// Factores de emisión de CO₂ por litro de combustible
export const EMISSION_FACTORS = {
  gasolina: 2.31, // kg CO₂ por litro
  diesel: 2.68, // kg CO₂ por litro
  gasNatural: 2.75, // kg CO₂ por litro equivalente
  electrico: 0, // kg CO₂ directo (puede tener emisiones indirectas)
  hibrido: 1.5, // Factor promedio, se ajusta según rendimiento
}

// Factores de emisión indirecta para vehículos eléctricos (kg CO₂/kWh)
export const ELECTRIC_EMISSION_FACTOR = 0.3 // Promedio para Ecuador

// Rendimientos promedio por tipo de vehículo (km/l)
export const DEFAULT_FUEL_EFFICIENCY = {
  gasolina: 12, // km/l
  diesel: 15, // km/l
  gasNatural: 10, // km/l
  hibrido: 20, // km/l
  electrico: 5, // km/kWh (equivalente)
}

// Emisiones promedio del transporte público (kg CO₂ por km por pasajero)
export const PUBLIC_TRANSPORT_EMISSIONS = {
  metro: 0.05, // kg CO₂/km/pasajero
  trole: 0.08, // kg CO₂/km/pasajero
  ecovia: 0.08, // kg CO₂/km/pasajero
  bus: 0.12, // kg CO₂/km/pasajero
  bicicleta: 0, // kg CO₂/km
  caminata: 0, // kg CO₂/km
}

export interface VehicleData {
  fuelType: "gasolina" | "diesel" | "gasNatural" | "hibrido" | "electrico"
  fuelEfficiency: number // km/l o km/kWh para eléctricos
  vehicleType: string
}

export interface CO2CalculationResult {
  privateVehicle: {
    fuelConsumed: number
    co2Emissions: number
    cost: number
  }
  publicTransport: {
    co2Emissions: number
    co2Saved: number
    percentageSaved: number
  }
  bicycle: {
    co2Emissions: number
    co2Saved: number
    percentageSaved: number
  }
  walking: {
    co2Emissions: number
    co2Saved: number
    percentageSaved: number
  }
}

export function calculateCO2Emissions(
  distance: number, // km
  vehicleData: VehicleData,
  transportType = "metro",
  daysPerMonth = 22,
): CO2CalculationResult {
  // Cálculo para vehículo privado
  let fuelConsumed = 0
  let privateCO2 = 0
  let fuelCost = 0

  if (vehicleData.fuelType === "electrico") {
    // Para vehículos eléctricos, calcular kWh consumidos
    const kwhConsumed = distance / vehicleData.fuelEfficiency
    privateCO2 = kwhConsumed * ELECTRIC_EMISSION_FACTOR
    fuelConsumed = kwhConsumed
    fuelCost = kwhConsumed * 0.12 // Costo promedio kWh en Ecuador
  } else {
    // Para combustibles líquidos
    fuelConsumed = distance / vehicleData.fuelEfficiency
    const emissionFactor = EMISSION_FACTORS[vehicleData.fuelType]
    privateCO2 = fuelConsumed * emissionFactor

    // Costo del combustible (precios promedio Ecuador 2024)
    const fuelPrices = {
      gasolina: 2.55, // USD por galón
      diesel: 1.9,
      gasNatural: 0.68,
      hibrido: 2.55, // Usa gasolina
    }
    fuelCost = (fuelConsumed / 3.785) * fuelPrices[vehicleData.fuelType] // Convertir litros a galones
  }

  // Cálculo para transporte público
  const publicCO2 = distance * PUBLIC_TRANSPORT_EMISSIONS[transportType as keyof typeof PUBLIC_TRANSPORT_EMISSIONS]

  // Cálculo para bicicleta (0 emisiones)
  const bicycleCO2 = 0

  // Cálculo para caminata (0 emisiones)
  const walkingCO2 = 0

  // Calcular ahorros
  const publicCO2Saved = Math.max(0, privateCO2 - publicCO2)
  const bicycleCO2Saved = privateCO2
  const walkingCO2Saved = privateCO2

  // Calcular porcentajes de ahorro
  const publicPercentageSaved = privateCO2 > 0 ? (publicCO2Saved / privateCO2) * 100 : 0
  const bicyclePercentageSaved = 100 // Siempre 100% de ahorro
  const walkingPercentageSaved = 100 // Siempre 100% de ahorro

  return {
    privateVehicle: {
      fuelConsumed,
      co2Emissions: privateCO2,
      cost: fuelCost,
    },
    publicTransport: {
      co2Emissions: publicCO2,
      co2Saved: publicCO2Saved,
      percentageSaved: publicPercentageSaved,
    },
    bicycle: {
      co2Emissions: bicycleCO2,
      co2Saved: bicycleCO2Saved,
      percentageSaved: bicyclePercentageSaved,
    },
    walking: {
      co2Emissions: walkingCO2,
      co2Saved: walkingCO2Saved,
      percentageSaved: walkingPercentageSaved,
    },
  }
}

// Función para calcular tiempo de viaje basado en distancia y medio de transporte
export function calculateTravelTime(distance: number, transportType: string): number {
  // Velocidades promedio en Quito (km/h)
  const averageSpeeds = {
    auto: 25, // Considerando tráfico urbano
    metro: 35, // Velocidad comercial del metro
    trole: 18, // Velocidad promedio del trolebús
    ecovia: 20, // Velocidad promedio de la ecovía
    bus: 15, // Velocidad promedio buses municipales
    bicicleta: 15, // Velocidad promedio en bicicleta
    caminata: 5, // Velocidad promedio caminando
  }

  const speed = averageSpeeds[transportType as keyof typeof averageSpeeds] || 20
  return (distance / speed) * 60 // Convertir a minutos
}

// Función para formatear tiempo en formato legible
export function formatTravelTime(minutes: number): string {
  if (minutes < 60) {
    return `${Math.round(minutes)} min`
  } else {
    const hours = Math.floor(minutes / 60)
    const remainingMinutes = Math.round(minutes % 60)
    if (remainingMinutes === 0) {
      return `${hours}h`
    }
    return `${hours}h ${remainingMinutes}min`
  }
}

'use client'

import {
  getModelsForMakeIdYear,
  VehicleModel,
} from '@/app/api/vehicles/MakeIdYear/useGetModelsForMakeIdYear'
import { useState, useEffect } from 'react'

export const useGetModelsForMakeIdYear = (makeId: string, year: string) => {
  const [vehicleModels, setVehicleModels] = useState<VehicleModel[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchVehicleModels = async () => {
      try {
        const models = await getModelsForMakeIdYear(makeId, year)
        setVehicleModels(models)
        setIsLoading(false)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred')
        setIsLoading(false)
      }
    }

    fetchVehicleModels()
  }, [makeId, year])

  return {
    vehicleModels,
    isLoading,
    error,
  }
}

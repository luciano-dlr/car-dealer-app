import { getMakesForVehicleType } from '@/app/api/vehicles/VehicleType/useGetMakesForVehicleType'
import { useEffect, useState } from 'react'

export const useVehicleSelectorController = () => {
  const [vehicleMakes, setVehicleMakes] = useState<{ MakeId: string; MakeName: string }[]>([])
  const [selectedMake, setSelectedMake] = useState('')
  const [selectedYear, setSelectedYear] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchVehicleMakes = async () => {
      try {
        const makes = await getMakesForVehicleType()
        setVehicleMakes(makes)
        setIsLoading(false)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred')
        setIsLoading(false)
      }
    }
    fetchVehicleMakes()
  }, [])

  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: currentYear - 2015 + 1 }, (_, i) => 2015 + i)
  return {
    isLoading,
    error,
    selectedMake,
    setSelectedMake,
    vehicleMakes,
    selectedYear,
    years,
    setSelectedYear,
  }
}

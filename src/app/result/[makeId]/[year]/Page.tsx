import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { LoadingSpinner } from '@/app/components/loadingSpinner/LoadingSpinner'
import { VehicleModelsList } from '@/app/components/vehicleModelList/VehicleModelList'
import {
  getModelsForMakeIdYear,
  VehicleModel,
} from '@/app/api/vehicles/MakeIdYear/useGetModelsForMakeIdYear'

export default async function ResultPage({ params }: { params: { makeId: string; year: string } }) {
  const { makeId, year } = await params

  if (!makeId || !year) {
    notFound()
  }

  let vehicleModels: VehicleModel[] = []

  try {
    vehicleModels = await getModelsForMakeIdYear(makeId, year)
  } catch (error) {
    console.error('Error fetching vehicle models:', error)
    return (
      <div className="container mx-auto p-4">
        <Link href="/" className="text-blue-500 hover:underline mb-4 inline-block">
          ← Back to search
        </Link>
        <div className="bg-white shadow-md rounded-lg p-6">
          <p className="text-center text-red-500">
            Failed to load vehicle models. Please try again later.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4">
      <Link href="/" className="text-blue-500 hover:underline mb-4 inline-block">
        ← Back to search
      </Link>
      <div className="bg-white shadow-md rounded-lg">
        <div className="p-6 border-b">
          <h1 className="text-2xl font-bold">Vehicle Models for {year}</h1>
        </div>
        <div className="p-6">
          <Suspense fallback={<LoadingSpinner />}>
            {vehicleModels.length > 0 ? (
              <VehicleModelsList models={vehicleModels} />
            ) : (
              <p className="text-center text-gray-600">No models found for this make and year.</p>
            )}
          </Suspense>
        </div>
      </div>
    </div>
  )
}

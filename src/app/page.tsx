'use client'

import { Suspense } from 'react'
import { LoadingSpinner } from './components/loadingSpinner/LoadingSpinner'
import { VehicleSelector } from './pages/vehicleSelector/VehicleSelectorPage'

export default function Home() {
  return (
    <div className="container mx-auto p-4 min-h-screen flex items-center justify-center">
      <Suspense fallback={<LoadingSpinner />}>
        <VehicleSelector />
      </Suspense>
    </div>
  )
}

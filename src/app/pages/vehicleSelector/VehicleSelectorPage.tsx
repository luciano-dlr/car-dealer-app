'use client'

import { LoadingSpinner } from '@/app/components/loadingSpinner/LoadingSpinner'
import { useVehicleSelectorController } from '@/app/pages/vehicleSelector/useVehicleSelectorController'
import Link from 'next/link'

export const VehicleSelector = () => {
  const {
    isLoading,
    error,
    selectedMake,
    setSelectedMake,
    vehicleMakes,
    selectedYear,
    years,
    setSelectedYear,
  } = useVehicleSelectorController()

  if (isLoading) return <LoadingSpinner />

  if (error) {
    return (
      <div className="w-full max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
        <p className="text-center text-red-500 mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
        >
          Retry
        </button>
      </div>
    )
  }

  return (
    <div className="w-full max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6">Car Dealer App</h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="make" className="block text-sm font-medium text-gray-700 mb-1">
            Select Make:
          </label>
          <select
            id="make"
            value={selectedMake}
            onChange={(e) => setSelectedMake(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a make</option>
            {vehicleMakes.map((make) => (
              <option key={make.MakeId} value={make.MakeId}>
                {make.MakeName}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-1">
            Select Year:
          </label>
          <select
            id="year"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a year</option>
            {years.map((year) => (
              <option key={year} value={year.toString()}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <Link
          href={selectedMake && selectedYear ? `/result/${selectedMake}/${selectedYear}` : '#'}
          className={`block w-full text-center py-2 px-4 rounded ${
            selectedMake && selectedYear
              ? 'bg-blue-500 text-white hover:bg-blue-600'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          } transition duration-200`}
          onClick={(e) => {
            if (!selectedMake || !selectedYear) {
              e.preventDefault()
            }
          }}
        >
          Next
        </Link>
      </div>
    </div>
  )
}

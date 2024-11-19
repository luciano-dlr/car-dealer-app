export async function getMakesForVehicleType() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/vehicles/GetMakesForVehicleType/car?format=json`,
    {
      next: { revalidate: 3600 },
    }
  )

  if (!res.ok) {
    throw new Error('Failed to fetch vehicle makes')
  }

  const data = await res.json()
  return data.Results || []
}

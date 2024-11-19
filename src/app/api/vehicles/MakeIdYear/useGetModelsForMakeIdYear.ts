export interface VehicleModel {
  Model_ID: number
  Model_Name: string
  Make_ID: number
  Make_Name: string
}

export async function getModelsForMakeIdYear(
  makeId: string,
  year: string
): Promise<VehicleModel[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/vehicles/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`,
    { next: { revalidate: 3600 } }
  )

  if (!res.ok) {
    throw new Error('Failed to fetch vehicle models')
  }

  const data = await res.json()
  return data.Results || []
}

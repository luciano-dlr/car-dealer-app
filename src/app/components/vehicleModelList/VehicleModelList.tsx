import { VehicleModel } from "@/app/api/vehicles/MakeIdYear/useGetModelsForMakeIdYear"

export const VehicleModelsList = ({ models }: { models: VehicleModel[] }) => {
  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {models.map((model) => (
        <li key={model.Model_ID} className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-lg font-semibold">{model.Model_Name}</h2>
          <p className="text-gray-600">{model.Make_Name}</p>
        </li>
      ))}
    </ul>
  )
}

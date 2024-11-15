import { Suspense } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";

interface Params {
    params: {
        makeId: string;
        year: string;
    };
}

interface VehicleModel {
    Model_ID: number;
    Model_Name: string;
    Make_ID: number;
    Make_Name: string;
}

async function fetchVehicleModels(makeId: string, year: string): Promise<VehicleModel[]> {
    const res = await fetch(
        `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`,

        { next: { revalidate: 3600 } }
    );

    if (!res.ok) {
        throw new Error("Failed to fetch vehicle models");
    }

    const data = await res.json();
    return data.Results || [];
}

function LoadingSpinner() {
    return (
        <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
    );
}

function VehicleModelsList({ models }: { models: VehicleModel[] }) {
    return (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {models.map((model) => (
                <li key={model.Model_ID} className="bg-white shadow-md rounded-lg p-4">
                    <h2 className="text-lg font-semibold">{model.Model_Name}</h2>
                    <p className="text-gray-600">{model.Make_Name}</p>
                </li>
            ))}
        </ul>
    );
}

export default async function ResultPage({ params }: Params) {
    const { makeId, year } = params;

    if (!makeId || !year) {
        notFound();
    }

    let vehicleModels: VehicleModel[] = [];

    try {
        vehicleModels = await fetchVehicleModels(makeId, year);
    } catch (error) {
        console.error("Error fetching vehicle models:", error);
        return (
            <div className="container mx-auto p-4">
                <Link href="/" className="text-blue-500 hover:underline mb-4 inline-block">
                    ← Back to search
                </Link>
                <div className="bg-white shadow-md rounded-lg p-6">
                    <p className="text-center text-red-500">Failed to load vehicle models. Please try again later.</p>
                </div>
            </div>
        );
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
    );
}

export async function generateStaticParams() {
    const makes = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/vehicles/GetMakesForVehicleType/car?format=json`)
        .then(res => res.json())
        .then(data => data.Results || []);

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: currentYear - 2015 + 1 }, (_, i) => (2015 + i).toString());

    const paths = [];
    for (const make of makes.slice(0, 5)) {
        for (const year of years) {
            paths.push({ makeId: make.MakeId.toString(), year });
        }
    }

    return paths;
}
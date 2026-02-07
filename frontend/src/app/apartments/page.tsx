import {ApartmentsList} from "@/components/apartments/ApartmentsList";
import {useApartmentsApi} from "@/lib/api/useApartmentsApi";

export default async function ApartmentsPage() {
    const apartmentsApi = useApartmentsApi();
    let apartments;

    try {
        apartments = await apartmentsApi.getAll();
    } catch (error) {
        console.error("Failed to fetch apartments:", error);
        return (
            <div>
                <h2 className="text-2xl font-bold mb-2">Apartments</h2>
                <p className="text-red-500">Failed to load apartments. Please try again later.</p>
            </div>
        );
    }

    return (
        <div className="w-full">
            <ApartmentsList initialApartments={apartments}/>
        </div>
    );
}
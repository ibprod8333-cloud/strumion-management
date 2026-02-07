import {fetchFromApi} from "@/lib/api/fetchFromApi";
import {Apartment, CreateApartmentDto, UpdateApartmentDto} from "@/types/apartment";

const APARTMENTS_ENDPOINT = "apartments";

export function useApartmentsApi() {
    return {
        getAll: (): Promise<Apartment[]> =>
            fetchFromApi<Apartment[]>(APARTMENTS_ENDPOINT),

        getOne: (id: string): Promise<Apartment> =>
            fetchFromApi<Apartment>(`${APARTMENTS_ENDPOINT}/${id}`),

        create: (data: CreateApartmentDto): Promise<Apartment> =>
            fetchFromApi<Apartment>(APARTMENTS_ENDPOINT, {
                method: "POST",
                body: JSON.stringify(data),
            }),

        update: (id: string, data: UpdateApartmentDto): Promise<Apartment> =>
            fetchFromApi<Apartment>(`${APARTMENTS_ENDPOINT}/${id}`, {
                method: "PATCH",
                body: JSON.stringify(data),
            }),

        delete: (id: string): Promise<void> =>
            fetchFromApi<void>(`${APARTMENTS_ENDPOINT}/${id}`, {
                method: "DELETE",
            }),
    };
}
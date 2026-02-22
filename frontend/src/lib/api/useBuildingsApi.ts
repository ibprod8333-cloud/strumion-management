import {fetchFromApi} from "@/lib/api/fetchFromApi";
import {Building, CreateBuildingDto, UpdateBuildingDto} from "@/types/building";

const BUILDINGS_ENDPOINT = "buildings";

export function useBuildingsApi() {
    return {
        getAll: (): Promise<Building[]> =>
            fetchFromApi<Building[]>(BUILDINGS_ENDPOINT),

        getAllConstruction: (): Promise<Building[]> =>
            fetchFromApi(`${BUILDINGS_ENDPOINT}?construction=true`),

        getOne: (id: string): Promise<Building> =>
            fetchFromApi<Building>(`${BUILDINGS_ENDPOINT}/${id}`),

        create: (data: CreateBuildingDto): Promise<Building> =>
            fetchFromApi<Building>(BUILDINGS_ENDPOINT, {
                method: "POST",
                body: JSON.stringify(data),
            }),

        update: (id: string, data: UpdateBuildingDto): Promise<Building> =>
            fetchFromApi<Building>(`${BUILDINGS_ENDPOINT}/${id}`, {
                method: "PATCH",
                body: JSON.stringify(data),
            }),

        delete: (id: string): Promise<void> =>
            fetchFromApi<void>(`${BUILDINGS_ENDPOINT}/${id}`, {
                method: "DELETE",
            }),
    };
}
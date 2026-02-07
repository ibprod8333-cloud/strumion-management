import {BuildingsPageClient} from "@/components/buildings/BuildingsPageClient";
import {useBuildingsApi} from "@/lib/api/useBuildingsApi";

export default async function BuildingsPage() {
    const buildingsApi = useBuildingsApi();
    const buildings = await buildingsApi.getAll();

    return <BuildingsPageClient initialBuildings={buildings}/>;
}
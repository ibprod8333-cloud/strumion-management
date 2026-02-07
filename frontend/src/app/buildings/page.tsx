import {BuildingsPageClient} from "@/components/buildings/BuildingsPageClient";
import {useBuildingsApi} from "@/lib/api/useBuildingsApi";

export const dynamic = "force-dynamic";

export default async function BuildingsPage() {
    const buildingsApi = useBuildingsApi();
    const buildings = await buildingsApi.getAll();

    return <BuildingsPageClient initialBuildings={buildings}/>;
}
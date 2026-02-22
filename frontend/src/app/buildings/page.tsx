"use client";

import {useEffect, useState} from "react";
import {Building} from "@/types/building";
import {useBuildingsApi} from "@/lib/api/useBuildingsApi";
import {BuildingsPageClient} from "@/components/buildings/BuildingsPageClient";

export default function BuildingsPage() {
    const buildingsApi = useBuildingsApi();
    const [buildings, setBuildings] = useState<Building[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        loadBuildings();
    }, []);

    const loadBuildings = async () => {
        try {
            setLoading(true);
            const data = await buildingsApi.getAll();
            setBuildings(data);
        } catch (err: any) {
            console.error('Failed to load buildings:', err);
            setError(err.message || 'Failed to load buildings');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                    <div
                        className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-amber-500 border-t-transparent"></div>
                    <p className="mt-4 text-neutral-600 font-medium">Loading buildings...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                    <p className="text-red-600 font-medium">{error}</p>
                    <button
                        onClick={loadBuildings}
                        className="mt-4 px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return <BuildingsPageClient initialBuildings={buildings}/>;
}
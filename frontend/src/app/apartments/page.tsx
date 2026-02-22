"use client";

import {ApartmentsList} from "@/components/apartments/ApartmentsList";
import {useApartmentsApi} from "@/lib/api/useApartmentsApi";
import {useEffect, useState} from "react";
import {Apartment} from "@/types/apartment";

export const dynamic = "force-dynamic";

export default function ApartmentsPage() {
    const apartmentsApi = useApartmentsApi();
    const [apartments, setApartments] = useState<Apartment[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        loadApartments();
    }, []);

    const loadApartments = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await apartmentsApi.getAll();
            setApartments(data);
        } catch (err: any) {
            console.error('Failed to load apartments:', err);
            setError(err.message || 'Failed to load apartments. Please try again later.');
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                    <div
                        className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-amber-500 border-t-transparent"></div>
                    <p className="mt-4 text-neutral-600 font-medium">Loading apartments...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center max-w-md">
                    <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                        <h2 className="text-xl font-bold text-neutral-900 mb-2">Error Loading Apartments</h2>
                        <p className="text-red-600 mb-4">{error}</p>
                        <button
                            onClick={loadApartments}
                            className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
                        >
                            Try Again
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full">
            <ApartmentsList initialApartments={apartments}/>
        </div>
    );
}
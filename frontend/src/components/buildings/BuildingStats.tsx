"use client";

import {Building} from "@/types/building";
import {Building2, MapPin, Globe} from "lucide-react";

interface BuildingsStatsProps {
    buildings: Building[];
}

export function BuildingsStats({buildings}: BuildingsStatsProps) {
    const totalBuildings = buildings.length;
    const uniqueCities = new Set(buildings.map(b => b.city)).size;
    const uniqueCountries = new Set(buildings.map(b => b.country)).size;

    const stats = [
        {
            label: "Total Buildings",
            value: totalBuildings,
            icon: Building2,
            color: "bg-blue-100 text-blue-600",
        },
        {
            label: "Cities",
            value: uniqueCities,
            icon: MapPin,
            color: "bg-green-100 text-green-600",
        },
        {
            label: "Countries",
            value: uniqueCountries,
            icon: Globe,
            color: "bg-purple-100 text-purple-600",
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat) => (
                <div key={stat.label} className="bg-white rounded-lg border border-neutral-200 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-neutral-600 mb-1">{stat.label}</p>
                            <p className="text-3xl font-bold text-neutral-900">{stat.value}</p>
                        </div>
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.color}`}>
                            <stat.icon className="h-6 w-6"/>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
"use client";

import {useState} from "react";
import {Building} from "@/types/building";
import {Search, Building2} from "lucide-react";
import {BuildingCard} from "@/components/buildings/BuildingCard";

interface BuildingsListProps {
    buildings: Building[];
    onEdit: (building: Building) => void;
    onDelete: (id: string) => void;
}

export function BuildingsList({buildings, onEdit, onDelete}: BuildingsListProps) {
    const [searchQuery, setSearchQuery] = useState("");

    const filteredBuildings = buildings.filter(building => {
        const query = searchQuery.toLowerCase();
        return (
            building.name.toLowerCase().includes(query) ||
            building.address.toLowerCase().includes(query) ||
            building.city.toLowerCase().includes(query) ||
            building.country.toLowerCase().includes(query)
        );
    });

    return (
        <div className="space-y-4">
            {/* Search Bar */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400"/>
                <input
                    type="text"
                    placeholder="Search buildings by name, address, city, or country..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
                />
            </div>

            {/* Results Count */}
            <div className="flex items-center justify-between">
                <p className="text-sm text-neutral-600">
                    {filteredBuildings.length} {filteredBuildings.length === 1 ? 'building' : 'buildings'} found
                </p>
            </div>

            {/* Buildings Grid */}
            {filteredBuildings.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredBuildings.map((building) => (
                        <BuildingCard
                            key={building.id}
                            building={building}
                            onEdit={onEdit}
                            onDelete={onDelete}
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center py-12">
                    <Building2 className="h-12 w-12 text-neutral-300 mx-auto mb-4"/>
                    <h3 className="text-lg font-medium text-neutral-900 mb-2">No buildings found</h3>
                    <p className="text-neutral-500">
                        {searchQuery
                            ? "Try adjusting your search query"
                            : "Get started by adding your first building"}
                    </p>
                </div>
            )}
        </div>
    );
}
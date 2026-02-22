"use client";

import {Building} from "@/types/building";
import {Building2, MapPin} from "lucide-react";

interface BuildingSelectorProps {
    buildings: Building[];
    selectedBuilding: Building | null;
    onSelectBuilding: (building: Building) => void;
    isLoading?: boolean;
}

export function BuildingSelector({
                                     buildings,
                                     selectedBuilding,
                                     onSelectBuilding,
                                     isLoading = false,
                                 }: BuildingSelectorProps) {
    if (isLoading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                    <div
                        key={i}
                        className="h-32 bg-neutral-100 rounded-xl animate-pulse"
                    />
                ))}
            </div>
        );
    }

    if (buildings.length === 0) {
        return (
            <div className="text-center py-16">
                <Building2 className="h-16 w-16 text-neutral-300 mx-auto mb-4"/>
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                    No Construction Buildings Found
                </h3>
                <p className="text-neutral-600 max-w-md mx-auto">
                    There are currently no buildings marked as under construction.
                    Create a building and mark it as construction to start tracking expenses.
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {buildings.map((building) => {
                const isSelected = selectedBuilding?.id === building.id;

                return (
                    <button
                        key={building.id}
                        onClick={() => onSelectBuilding(building)}
                        className={`
                            group relative overflow-hidden rounded-xl border-2 transition-all duration-300
                            text-left p-6 hover:shadow-lg hover:-translate-y-1
                            ${isSelected
                            ? 'border-amber-500 bg-amber-50 shadow-md'
                            : 'border-neutral-200 bg-white hover:border-amber-300'
                        }
                        `}
                    >
                        {/* Accent Bar */}
                        <div className={`
                            absolute top-0 left-0 w-1.5 h-full transition-colors
                            ${isSelected ? 'bg-amber-500' : 'bg-neutral-300 group-hover:bg-amber-400'}
                        `}/>

                        {/* Building Icon */}
                        <div className={`
                            inline-flex items-center justify-center w-12 h-12 rounded-lg mb-4
                            transition-colors
                            ${isSelected
                            ? 'bg-amber-100 text-amber-600'
                            : 'bg-neutral-100 text-neutral-400 group-hover:bg-amber-50 group-hover:text-amber-500'
                        }
                        `}>
                            <Building2 className="h-6 w-6"/>
                        </div>

                        {/* Building Info */}
                        <h3 className="font-bold text-lg text-neutral-900 mb-2 line-clamp-1">
                            {building.name}
                        </h3>

                        <div className="flex items-start gap-2 text-sm text-neutral-600">
                            <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0"/>
                            <p className="line-clamp-2">
                                {building.address}, {building.city}, {building.country}
                            </p>
                        </div>

                        {/* Selected Badge */}
                        {isSelected && (
                            <div className="absolute top-4 right-4">
                                <div className="bg-amber-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                                    Selected
                                </div>
                            </div>
                        )}
                    </button>
                );
            })}
        </div>
    );
}
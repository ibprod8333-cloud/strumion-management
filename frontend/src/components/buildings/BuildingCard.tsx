"use client";

import {Building} from "@/types/building";
import {Building2, MapPin, Edit, Trash2} from "lucide-react";

interface BuildingCardProps {
    building: Building;
    onEdit: (building: Building) => void;
    onDelete: (id: string) => void;
}

export function BuildingCard({building, onEdit, onDelete}: BuildingCardProps) {

    return (
        <div className="bg-white rounded-lg border border-neutral-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-neutral-100 rounded-lg flex items-center justify-center">
                        <Building2 className="h-6 w-6 text-neutral-600"/>
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg text-neutral-900">{building.name}</h3>
                        <p className="text-sm text-neutral-500">
                            {building.city}, {building.country}
                        </p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => onEdit(building)}
                        className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
                        title="Edit building"
                    >
                        <Edit className="h-4 w-4 text-neutral-600"/>
                    </button>
                    <button
                        onClick={() => building.id && onDelete(building.id)}
                        className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete building"
                    >
                        <Trash2 className="h-4 w-4 text-red-600"/>
                    </button>
                </div>
            </div>

            <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-neutral-600">
                    <MapPin className="h-4 w-4"/>
                    <span>{building.address}</span>
                </div>
                {building.latitude && building.longitude && (
                    <div className="text-xs text-neutral-400">
                        Coordinates: {building.latitude.toFixed(6)}, {building.longitude.toFixed(6)}
                    </div>
                )}
            </div>


            {building.createdAt && (
                <div className="mt-4 pt-4 border-t border-neutral-100">
                    <p className="text-xs text-neutral-400">
                        Created on {new Date(building.createdAt).toLocaleDateString('en-US')}
                    </p>
                </div>
            )}

            {building.isConstruction && (
                <div className="mt-2">
                    <span className="px-2 py-1 text-xs bg-red-100 text-yellow-800 rounded-full">
                        Under Construction
                    </span>
                </div>
            )}
        </div>
    );
}
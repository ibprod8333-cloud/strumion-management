"use client";

import { useState } from "react";
import { Building, CreateBuildingDto, UpdateBuildingDto } from "@/types/building";
import { BuildingsList } from "@/components/buildings/BuildingsList";
import { BuildingFormModal } from "@/components/buildings/BuildingFormModal";
import { DeleteConfirmationModal } from "@/components/buildings/DeleteConfirmationModal";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import {useBuildingsApi} from "@/lib/api/useBuildingsApi";
import {BuildingsStats} from "@/components/buildings/BuildingStats";

interface BuildingsPageClientProps {
    initialBuildings: Building[];
}

export function BuildingsPageClient({ initialBuildings }: BuildingsPageClientProps) {
    const router = useRouter();
    const buildingsApi = useBuildingsApi();

    const [buildings, setBuildings] = useState<Building[]>(initialBuildings);
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedBuilding, setSelectedBuilding] = useState<Building | null>(null);
    const [formMode, setFormMode] = useState<"create" | "edit">("create");
    const [isDeleting, setIsDeleting] = useState(false);

    const handleCreate = () => {
        setFormMode("create");
        setSelectedBuilding(null);
        setIsFormModalOpen(true);
    };

    const handleEdit = (building: Building) => {
        setFormMode("edit");
        setSelectedBuilding(building);
        setIsFormModalOpen(true);
    };

    const handleDelete = (building: Building) => {
        setSelectedBuilding(building);
        setIsDeleteModalOpen(true);
    };

    const handleFormSubmit = async (data: CreateBuildingDto | UpdateBuildingDto) => {
        if (formMode === "create") {
            const newBuilding = await buildingsApi.create(data as CreateBuildingDto);
            setBuildings(prev => [...prev, newBuilding]);
        } else if (formMode === "edit" && selectedBuilding?.id) {
            const updatedBuilding = await buildingsApi.update(
                selectedBuilding.id,
                data as UpdateBuildingDto
            );
            setBuildings(prev =>
                prev.map(b => (b.id === updatedBuilding.id ? updatedBuilding : b))
            );
        }
        router.refresh();
    };

    const handleConfirmDelete = async () => {
        if (!selectedBuilding?.id) return;

        setIsDeleting(true);
        try {
            await buildingsApi.delete(selectedBuilding.id);
            setBuildings(prev => prev.filter(b => b.id !== selectedBuilding.id));
            router.refresh();
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold mb-2 ml-4">Buildings</h2>
                    <p className="text-neutral-500 ml-6">Manage your property buildings</p>
                </div>
                <button
                    onClick={handleCreate}
                    className="flex items-center gap-2 px-4 py-2 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 transition-colors"
                >
                    <Plus className="h-5 w-5" />
                    Add Building
                </button>
            </div>

            {/* Stats */}
            <BuildingsStats buildings={buildings} />

            {/* Buildings List */}
            <BuildingsList
                buildings={buildings}
                onEdit={handleEdit}
                onDelete={(id) => {
                    const building = buildings.find(b => b.id === id);
                    if (building) handleDelete(building);
                }}
            />

            {/* Modals */}
            <BuildingFormModal
                isOpen={isFormModalOpen}
                onClose={() => setIsFormModalOpen(false)}
                onSubmit={handleFormSubmit}
                building={selectedBuilding}
                mode={formMode}
            />

            <DeleteConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleConfirmDelete}
                buildingName={selectedBuilding?.name || ""}
                isDeleting={isDeleting}
            />
        </div>
    );
}
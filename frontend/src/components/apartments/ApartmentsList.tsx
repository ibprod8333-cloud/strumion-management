"use client";

import {useState} from "react";
import {Plus, Home} from "lucide-react";
import {Apartment, CreateApartmentDto, UpdateApartmentDto} from "@/types/apartment";
import {ApartmentCard} from "./ApartmentCard";
import {ApartmentModal} from "./ApartmentModal";
import {DeleteConfirmationDialog} from "../DeleteConfirmationDialog";
import {ApartmentDetailsDialog} from "./ApartmentDetailsDialog";
import {useRouter} from "next/navigation";
import {useApartmentsApi} from "@/lib/api/useApartmentsApi";

type Props = {
    initialApartments: Apartment[];
};

export function ApartmentsList({initialApartments}: Props) {
    const router = useRouter();
    const apartmentsApi = useApartmentsApi();

    const [apartments, setApartments] = useState<Apartment[]>(initialApartments);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const [editingApartment, setEditingApartment] = useState<Apartment | null>(null);
    const [deletingApartment, setDeletingApartment] = useState<Apartment | null>(null);
    const [selectedApartment, setSelectedApartment] = useState<Apartment | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleAdd = () => {
        setEditingApartment(null);
        setIsModalOpen(true);
    };

    const handleEdit = (apartment: Apartment) => {
        setEditingApartment(apartment);
        setIsModalOpen(true);
    };

    const handleDeleteClick = (apartment: Apartment) => {
        setDeletingApartment(apartment);
        setIsDeleteDialogOpen(true);
    };

    const handleDetailsClick = (apartment: Apartment) => {
        setSelectedApartment(apartment);
        setIsDetailsOpen(true);
    };


    const handleSave = async (data: CreateApartmentDto, apartmentId?: string) => {
        if (apartmentId) {
            // Update existing
            const updated = await apartmentsApi.update(apartmentId, data as UpdateApartmentDto);
            setApartments(apartments.map((a) => (a.id === apartmentId ? updated : a)));
        } else {
            // Create new
            const created = await apartmentsApi.create(data);
            setApartments([...apartments, created]);
        }
        router.refresh();
    };

    // const handleSave = (apartment: Apartment) => {
    //     if (editingApartment) {
    //         // Update existing
    //         setApartments(apartments.map((a) => (a.id === apartment.id ? apartment : a)));
    //     } else {
    //         // Add new
    //         setApartments([...apartments, {...apartment, id: `apt_${Date.now()}`}]);
    //     }
    //     setIsModalOpen(false);
    // };

    const handleDeleteConfirm = async () => {
        if (!deletingApartment?.id) return;

        setIsDeleting(true);
        try {
            await apartmentsApi.delete(deletingApartment.id);
            setApartments(apartments.filter((a) => a.id !== deletingApartment.id));
            setIsDeleteDialogOpen(false);
            setDeletingApartment(null);
            router.refresh();
        } catch (error) {
            console.error("Failed to delete apartment:", error);
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <>
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h2 className="text-2xl font-bold mb-1 ml-4">Apartments</h2>
                    <p className="text-neutral-500 ml-6">Manage your property apartments</p>
                </div>
                <button
                    onClick={handleAdd}
                    className="flex items-center gap-2 px-4 py-2 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 transition-colors"
                >
                    <Plus className="h-5 w-5"/>
                    Add Apartment
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {apartments.map((apartment) => (
                    <ApartmentCard
                        key={apartment.id}
                        apartment={apartment}
                        onEdit={handleEdit}
                        onDelete={handleDeleteClick}
                        onDetails={handleDetailsClick}
                    />
                ))}
            </div>

            {apartments.length === 0 && (
                <div className="text-center py-12 bg-white rounded-lg border border-neutral-200">
                    <Home className="h-12 w-12 text-neutral-400 mx-auto mb-4"/>
                    <h3 className="text-lg font-medium text-neutral-900 mb-2">No apartments yet</h3>
                    <p className="text-neutral-500 mb-4">Get started by adding your first apartment.</p>
                    <button
                        onClick={handleAdd}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 transition-colors"
                    >
                        <Plus className="h-5 w-5"/>
                        Add First Apartment
                    </button>
                </div>
            )}

            {/* Modals */}
            <ApartmentModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSave}
                apartment={editingApartment}
            />

            <DeleteConfirmationDialog
                isOpen={isDeleteDialogOpen}
                onClose={() => {
                    setIsDeleteDialogOpen(false);
                    setDeletingApartment(null);
                }}
                onConfirm={handleDeleteConfirm}
                apartment={deletingApartment}
                isDeleting={isDeleting}
            />

            <ApartmentDetailsDialog
                apartment={selectedApartment}
                open={isDetailsOpen}
                onOpenChange={(open) => {
                    setIsDetailsOpen(open);
                    if (!open) {
                        setSelectedApartment(null);
                    }
                }}
            />
        </>
    );
}
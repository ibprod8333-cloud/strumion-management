// components/ApartmentModal.tsx
"use client";

import {useState, useEffect} from "react";
import {X} from "lucide-react";
import {
    Apartment,
    CreateApartmentDto,
    ApartmentStatus,
    COMMON_AMENITIES,
    APARTMENT_STATUS_LABELS,
} from "@/types/apartment";
import {Building} from "@/types/building";
import {useBuildingsApi} from "@/lib/api/useBuildingsApi";

type Props = {
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: CreateApartmentDto, apartmentId?: string) => Promise<void>;
    apartment: Apartment | null;
};

export function ApartmentModal({isOpen, onClose, onSave, apartment}: Props) {
    const buildingsApi = useBuildingsApi();
    const [buildings, setBuildings] = useState<Building[]>([]);
    const [isLoadingBuildings, setIsLoadingBuildings] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState<CreateApartmentDto>({
        name: "",
        buildingId: "",
        floor: 1,
        number: "",
        maxGuests: 2,
        bedrooms: 1,
        bathrooms: 1,
        pricePerNight: 50,
        status: ApartmentStatus.AVAILABLE,
        amenities: [],
        description: "",
    });

    useEffect(() => {
        if (isOpen) {
            loadBuildings();
            if (apartment) {
                setFormData({
                    name: apartment.name,
                    buildingId: apartment.buildingId,
                    floor: apartment.floor,
                    number: apartment.number,
                    maxGuests: apartment.maxGuests,
                    bedrooms: apartment.bedrooms,
                    bathrooms: apartment.bathrooms,
                    pricePerNight: apartment.pricePerNight,
                    status: apartment.status,
                    amenities: apartment.amenities,
                    description: apartment.description || "",
                });
            } else {
                resetForm();
            }
            setError(null);
        }
    }, [apartment, isOpen]);

    const resetForm = () => {
        setFormData({
            name: "",
            buildingId: "",
            floor: 1,
            number: "",
            maxGuests: 2,
            bedrooms: 1,
            bathrooms: 1,
            pricePerNight: 50,
            status: ApartmentStatus.AVAILABLE,
            amenities: [],
            description: "",
        });
    };

    const loadBuildings = async () => {
        try {
            setIsLoadingBuildings(true);
            const data = await buildingsApi.getAll();
            setBuildings(data);
        } catch (error) {
            console.error("Failed to load buildings:", error);
            setError("Failed to load buildings");
        } finally {
            setIsLoadingBuildings(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsSaving(true);

        try {
            await onSave(formData, apartment?.id);
            onClose();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to save apartment");
        } finally {
            setIsSaving(false);
        }
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const {name, value, type} = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: type === "number" ? parseFloat(value) || 0 : value,
        }));
    };

    const toggleAmenity = (amenity: string) => {
        setFormData((prev) => ({
            ...prev,
            amenities: prev.amenities.includes(amenity)
                ? prev.amenities.filter((a) => a !== amenity)
                : [...prev.amenities, amenity],
        }));
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div
                    className="sticky top-0 bg-white border-b border-neutral-200 px-6 py-4 flex justify-between items-center">
                    <h2 className="text-xl font-bold">
                        {apartment ? "Edit Apartment" : "Add New Apartment"}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-neutral-400 hover:text-neutral-600 transition-colors"
                        disabled={isSaving}
                    >
                        <X className="h-6 w-6"/>
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                            {error}
                        </div>
                    )}

                    <div className="grid grid-cols-2 gap-4">
                        {/* Apartment Name */}
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-neutral-700 mb-2">
                                Apartment Name *
                            </label>
                            <input
                                type="text"
                                name="name"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
                                placeholder="e.g., Lakeview Apartment"
                            />
                        </div>

                        {/* Building Dropdown */}
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-neutral-700 mb-2">
                                Building *
                            </label>
                            {isLoadingBuildings ? (
                                <div
                                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg bg-neutral-50 text-neutral-500">
                                    Loading buildings...
                                </div>
                            ) : buildings.length === 0 ? (
                                <div
                                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg bg-yellow-50 text-yellow-800">
                                    No buildings available. Please create a building first.
                                </div>
                            ) : (
                                <select
                                    name="buildingId"
                                    value={formData.buildingId}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
                                >
                                    <option value="">Select a building</option>
                                    {buildings.map((building) => (
                                        <option key={building.id} value={building.id}>
                                            {building.name} - {building.city}
                                        </option>
                                    ))}
                                </select>
                            )}
                        </div>

                        {/* Apartment Number */}
                        <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-2">
                                Apartment Number *
                            </label>
                            <input
                                type="text"
                                name="number"
                                required
                                value={formData.number}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
                                placeholder="e.g., 101, A1"
                            />
                        </div>

                        {/* Floor */}
                        <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-2">
                                Floor *
                            </label>
                            <input
                                type="number"
                                name="floor"
                                required
                                min="0"
                                value={formData.floor}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
                            />
                        </div>

                        {/* Status */}
                        <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-2">
                                Status *
                            </label>
                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
                            >
                                {Object.values(ApartmentStatus).map((status) => (
                                    <option key={status} value={status}>
                                        {APARTMENT_STATUS_LABELS[status]}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Max Guests */}
                        <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-2">
                                Max Guests *
                            </label>
                            <input
                                type="number"
                                name="maxGuests"
                                required
                                min="1"
                                value={formData.maxGuests}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
                            />
                        </div>

                        {/* Bedrooms */}
                        <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-2">
                                Bedrooms *
                            </label>
                            <input
                                type="number"
                                name="bedrooms"
                                required
                                min="0"
                                value={formData.bedrooms}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
                            />
                        </div>

                        {/* Bathrooms */}
                        <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-2">
                                Bathrooms *
                            </label>
                            <input
                                type="number"
                                name="bathrooms"
                                required
                                min="1"
                                step="0.5"
                                value={formData.bathrooms}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
                            />
                        </div>

                        {/* Price Per Night */}
                        <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-2">
                                Price per Night (€) *
                            </label>
                            <input
                                type="number"
                                name="pricePerNight"
                                required
                                min="0"
                                step="0.01"
                                value={formData.pricePerNight}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
                            />
                        </div>

                        {/* Amenities */}
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-neutral-700 mb-2">
                                Amenities
                            </label>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                {COMMON_AMENITIES.map((amenity) => (
                                    <label key={amenity} className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={formData.amenities.includes(amenity)}
                                            onChange={() => toggleAmenity(amenity)}
                                            className="rounded border-neutral-300 text-neutral-900 focus:ring-neutral-900"
                                        />
                                        <span className="text-sm text-neutral-700">{amenity}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Description */}
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-neutral-700 mb-2">
                                Description
                            </label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows={4}
                                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
                                placeholder="Brief description of the apartment..."
                            />
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="flex gap-3 pt-4 border-t border-neutral-200">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={isSaving}
                            className="flex-1 px-4 py-2 text-neutral-700 bg-neutral-100 rounded-lg hover:bg-neutral-200 transition-colors disabled:opacity-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSaving || buildings.length === 0}
                            className="flex-1 px-4 py-2 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSaving ? "Saving..." : apartment ? "Update" : "Create"} Apartment
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
"use client";

import {useState, useEffect} from "react";
import {Building, CreateBuildingDto, UpdateBuildingDto} from "@/types/building";
import {X} from "lucide-react";

interface BuildingFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: CreateBuildingDto | UpdateBuildingDto) => Promise<void>;
    building?: Building | null;
    mode: "create" | "edit";
}

export function BuildingFormModal({
                                      isOpen,
                                      onClose,
                                      onSubmit,
                                      building,
                                      mode
                                  }: BuildingFormModalProps) {
    const [formData, setFormData] = useState<CreateBuildingDto>({
        name: "",
        address: "",
        city: "",
        country: "",
        latitude: undefined,
        longitude: undefined,
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (mode === "edit" && building) {
            setFormData({
                name: building.name,
                address: building.address,
                city: building.city,
                country: building.country,
                latitude: building.latitude,
                longitude: building.longitude,
            });
        } else {
            setFormData({
                name: "",
                address: "",
                city: "",
                country: "",
                latitude: undefined,
                longitude: undefined,
            });
        }
        setError(null);
    }, [mode, building, isOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsSubmitting(true);

        try {
            await onSubmit(formData);
            onClose();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to save building");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;

        if (name === "latitude" || name === "longitude") {
            setFormData(prev => ({
                ...prev,
                [name]: value ? parseFloat(value) : undefined,
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-neutral-200">
                    <h2 className="text-xl font-semibold text-neutral-900">
                        {mode === "create" ? "Add New Building" : "Edit Building"}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
                    >
                        <X className="h-5 w-5"/>
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                            {error}
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-neutral-700 mb-2">
                                Building Name *
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
                                placeholder="e.g., Central Plaza Building"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-neutral-700 mb-2">
                                Address *
                            </label>
                            <input
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
                                placeholder="e.g., 123 Main Street"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-2">
                                City *
                            </label>
                            <input
                                type="text"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
                                placeholder="e.g., Skopje"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-2">
                                Country *
                            </label>
                            <input
                                type="text"
                                name="country"
                                value={formData.country}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
                                placeholder="e.g., North Macedonia"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-2">
                                Latitude (Optional)
                            </label>
                            <input
                                type="number"
                                name="latitude"
                                value={formData.latitude ?? ""}
                                onChange={handleChange}
                                step="any"
                                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
                                placeholder="e.g., 41.9973"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-2">
                                Longitude (Optional)
                            </label>
                            <input
                                type="number"
                                name="longitude"
                                value={formData.longitude ?? ""}
                                onChange={handleChange}
                                step="any"
                                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
                                placeholder="e.g., 21.4280"
                            />
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="flex justify-end gap-3 pt-4 border-t border-neutral-200">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors"
                            disabled={isSubmitting}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Saving..." : mode === "create" ? "Create Building" : "Save Changes"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
"use client";

import {AlertTriangle, X} from "lucide-react";

interface DeleteConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => Promise<void>;
    buildingName: string;
    isDeleting: boolean;
}

export function DeleteConfirmationModal({
                                            isOpen,
                                            onClose,
                                            onConfirm,
                                            buildingName,
                                            isDeleting,
                                        }: DeleteConfirmationModalProps) {
    if (!isOpen) return null;

    const handleConfirm = async () => {
        await onConfirm();
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-md w-full">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-neutral-200">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                            <AlertTriangle className="h-5 w-5 text-red-600"/>
                        </div>
                        <h2 className="text-xl font-semibold text-neutral-900">Delete Building</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
                        disabled={isDeleting}
                    >
                        <X className="h-5 w-5"/>
                    </button>
                </div>

                {/* Content */}
                <div className="p-6">
                    <p className="text-neutral-600 mb-4">
                        Are you sure you want to delete <strong>{buildingName}</strong>?
                    </p>
                    <p className="text-sm text-neutral-500">
                        This action cannot be undone. All data associated with this building will be permanently
                        removed.
                    </p>
                </div>

                {/* Footer */}
                <div className="flex justify-end gap-3 p-6 border-t border-neutral-200">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors"
                        disabled={isDeleting}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleConfirm}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={isDeleting}
                    >
                        {isDeleting ? "Deleting..." : "Delete Building"}
                    </button>
                </div>
            </div>
        </div>
    );
}
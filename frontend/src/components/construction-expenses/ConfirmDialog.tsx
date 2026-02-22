"use client";

import {AlertTriangle} from "lucide-react";

interface ConfirmDialogProps {
    isOpen: boolean;
    title: string;
    message: string;
    confirmLabel?: string;
    cancelLabel?: string;
    onConfirm: () => void;
    onCancel: () => void;
    isDestructive?: boolean;
}

export function ConfirmDialog({
                                  isOpen,
                                  title,
                                  message,
                                  confirmLabel = "Confirm",
                                  cancelLabel = "Cancel",
                                  onConfirm,
                                  onCancel,
                                  isDestructive = false,
                              }: ConfirmDialogProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
                {/* Icon and Title */}
                <div className="p-6 pb-4">
                    <div className="flex items-start gap-4">
                        <div className={`
                            flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center
                            ${isDestructive ? 'bg-red-100' : 'bg-amber-100'}
                        `}>
                            <AlertTriangle className={`h-6 w-6 ${isDestructive ? 'text-red-600' : 'text-amber-600'}`}/>
                        </div>
                        <div className="flex-1">
                            <h3 className="text-xl font-bold text-neutral-900 mb-2">
                                {title}
                            </h3>
                            <p className="text-neutral-600 text-sm">
                                {message}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="px-6 pb-6 flex items-center gap-3">
                    <button
                        onClick={onCancel}
                        className="flex-1 bg-neutral-100 text-neutral-700 font-semibold py-3 px-6 rounded-lg hover:bg-neutral-200 transition-colors"
                    >
                        {cancelLabel}
                    </button>
                    <button
                        onClick={onConfirm}
                        className={`
                            flex-1 font-semibold py-3 px-6 rounded-lg transition-colors
                            ${isDestructive
                            ? 'bg-red-600 text-white hover:bg-red-700'
                            : 'bg-amber-500 text-white hover:bg-amber-600'
                        }
                        `}
                    >
                        {confirmLabel}
                    </button>
                </div>
            </div>
        </div>
    );
}
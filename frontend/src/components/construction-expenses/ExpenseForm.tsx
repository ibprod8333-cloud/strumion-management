"use client";

import {useState} from "react";
import {X} from "lucide-react";
import {
    ConstructionExpense,
    CreateConstructionExpenseDto,
    CURRENCIES, CURRENCY_SYMBOLS,
    EXPENSE_CATEGORIES, EXPENSE_CATEGORY_LABELS
} from "@/types/construction-expenses";

interface ExpenseFormProps {
    onSubmit: (data: CreateConstructionExpenseDto) => Promise<void>;
    onCancel: () => void;
    initialData?: ConstructionExpense | null;
    isSubmitting?: boolean;
}

export function ExpenseForm({
                                onSubmit,
                                onCancel,
                                initialData = null,
                                isSubmitting = false,
                            }: ExpenseFormProps) {
    const [formData, setFormData] = useState<CreateConstructionExpenseDto>({
        title: initialData?.title || "",
        description: initialData?.description || "",
        amount: initialData?.amount || 0,
        currency: initialData?.currency || CURRENCIES.EUR,
        category: initialData?.category || EXPENSE_CATEGORIES.MATERIALS,
        expenseDate: initialData?.expenseDate
            ? new Date(initialData.expenseDate).toISOString().split('T')[0]!
            : new Date().toISOString().split('T')[0]!,
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await onSubmit(formData);
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const {name, value} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'amount' ? parseFloat(value) || 0 : value,
        }));
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div
                    className="sticky top-0 bg-white border-b border-neutral-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
                    <h2 className="text-2xl font-bold text-neutral-900">
                        {initialData ? 'Edit Expense' : 'New Expense'}
                    </h2>
                    <button
                        onClick={onCancel}
                        className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
                        disabled={isSubmitting}
                    >
                        <X className="h-5 w-5 text-neutral-500"/>
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {/* Title */}
                    <div>
                        <label htmlFor="title" className="block text-sm font-semibold text-neutral-700 mb-2">
                            Title *
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            placeholder="e.g., Concrete delivery"
                            className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-shadow"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label htmlFor="description" className="block text-sm font-semibold text-neutral-700 mb-2">
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description || ""}
                            onChange={handleChange}
                            rows={3}
                            placeholder="Additional details about this expense..."
                            className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-shadow resize-none"
                        />
                    </div>

                    {/* Amount and Currency Row */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="amount" className="block text-sm font-semibold text-neutral-700 mb-2">
                                Amount *
                            </label>
                            <input
                                type="number"
                                id="amount"
                                name="amount"
                                value={formData.amount}
                                onChange={handleChange}
                                required
                                min="0"
                                step="0.01"
                                placeholder="0.00"
                                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-shadow"
                            />
                        </div>

                        <div>
                            <label htmlFor="currency" className="block text-sm font-semibold text-neutral-700 mb-2">
                                Currency *
                            </label>
                            <select
                                id="currency"
                                name="currency"
                                value={formData.currency}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-shadow bg-white"
                            >
                                {Object.values(CURRENCIES).map(curr => (
                                    <option key={curr} value={curr}>
                                        {CURRENCY_SYMBOLS[curr]} {curr}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Category and Date Row */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="category" className="block text-sm font-semibold text-neutral-700 mb-2">
                                Category *
                            </label>
                            <select
                                id="category"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-shadow bg-white"
                            >
                                {Object.values(EXPENSE_CATEGORIES).map(cat => (
                                    <option key={cat} value={cat}>
                                        {EXPENSE_CATEGORY_LABELS[cat]}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label htmlFor="expenseDate" className="block text-sm font-semibold text-neutral-700 mb-2">
                                Expense Date *
                            </label>
                            <input
                                type="date"
                                id="expenseDate"
                                name="expenseDate"
                                value={formData.expenseDate}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-shadow"
                            />
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3 pt-4">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex-1 bg-amber-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-amber-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            {isSubmitting ? 'Saving...' : initialData ? 'Update Expense' : 'Create Expense'}
                        </button>
                        <button
                            type="button"
                            onClick={onCancel}
                            disabled={isSubmitting}
                            className="flex-1 bg-neutral-100 text-neutral-700 font-semibold py-3 px-6 rounded-lg hover:bg-neutral-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
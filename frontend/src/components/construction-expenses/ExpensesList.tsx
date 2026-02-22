"use client";

import {useState} from "react";
import {Edit2, Trash2, Calendar, Tag, DollarSign} from "lucide-react";
import {ConstructionExpense, CURRENCY_SYMBOLS, EXPENSE_CATEGORY_LABELS} from "@/types/construction-expenses";
import {ConfirmDialog} from "@/components/construction-expenses/ConfirmDialog";

interface ExpensesListProps {
    expenses: ConstructionExpense[];
    onEdit: (expense: ConstructionExpense) => void;
    onDelete: (expenseId: string) => void;
    isLoading?: boolean;
}

export function ExpensesList({
                                 expenses,
                                 onEdit,
                                 onDelete,
                                 isLoading = false,
                             }: ExpensesListProps) {
    const [deletingExpense, setDeletingExpense] = useState<ConstructionExpense | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDeleteClick = (expense: ConstructionExpense) => {
        setDeletingExpense(expense);
    };

    const handleConfirmDelete = async () => {
        if (!deletingExpense) return;

        setIsDeleting(true);
        await onDelete(deletingExpense.id);
        setIsDeleting(false);
        setDeletingExpense(null);
    };

    const handleCancelDelete = () => {
        setDeletingExpense(null);
    };

    const formatDate = (date: Date | string) => {
        return new Date(date).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        });
    };

    const formatAmount = (amount: number, currency: string) => {
        return `${CURRENCY_SYMBOLS[currency] || currency} ${amount.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        })}`;
    };

    if (isLoading) {
        return (
            <div className="space-y-3">
                {[1, 2, 3, 4].map((i) => (
                    <div
                        key={i}
                        className="h-24 bg-neutral-100 rounded-xl animate-pulse"
                    />
                ))}
            </div>
        );
    }

    if (expenses.length === 0) {
        return (
            <div className="text-center py-16 bg-neutral-50 rounded-xl border-2 border-dashed border-neutral-300">
                <DollarSign className="h-16 w-16 text-neutral-300 mx-auto mb-4"/>
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                    No Expenses Yet
                </h3>
                <p className="text-neutral-600 max-w-md mx-auto">
                    Start tracking construction expenses by clicking the "Add Expense" button above.
                </p>
            </div>
        );
    }

    return (
        <>
            <div className="space-y-3">
                {expenses.map((expense) => {
                    const isBeingDeleted = deletingExpense?.id === expense.id && isDeleting;

                    return (
                        <div
                            key={expense.id}
                            className={`
                                bg-white border border-neutral-200 rounded-xl p-5 
                                transition-all duration-200 hover:shadow-md hover:border-neutral-300
                                ${isBeingDeleted ? 'opacity-50 pointer-events-none' : ''}
                            `}
                        >
                            <div className="flex items-start justify-between gap-4">
                                {/* Main Content */}
                                <div className="flex-1 min-w-0">
                                    {/* Title and Amount Row */}
                                    <div className="flex items-start justify-between gap-4 mb-3">
                                        <h3 className="text-lg font-bold text-neutral-900 line-clamp-1">
                                            {expense.title}
                                        </h3>
                                        <div className="text-right flex-shrink-0">
                                            <div className="text-2xl font-bold text-amber-600">
                                                {formatAmount(expense.amount, expense.currency)}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Description */}
                                    {expense.description && (
                                        <p className="text-neutral-600 text-sm mb-3 line-clamp-2">
                                            {expense.description}
                                        </p>
                                    )}

                                    {/* Meta Info */}
                                    <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-500">
                                        <div className="flex items-center gap-1.5">
                                            <Tag className="h-4 w-4"/>
                                            <span>{EXPENSE_CATEGORY_LABELS[expense.category] || expense.category}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <Calendar className="h-4 w-4"/>
                                            <span>{formatDate(expense.expenseDate)}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex items-center gap-2 flex-shrink-0">
                                    <button
                                        onClick={() => onEdit(expense)}
                                        disabled={isBeingDeleted}
                                        className="p-2 text-neutral-500 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors disabled:opacity-50"
                                        title="Edit expense"
                                    >
                                        <Edit2 className="h-5 w-5"/>
                                    </button>
                                    <button
                                        onClick={() => handleDeleteClick(expense)}
                                        disabled={isBeingDeleted}
                                        className="p-2 text-neutral-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                                        title="Delete expense"
                                    >
                                        <Trash2 className="h-5 w-5"/>
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Confirmation Dialog */}
            <ConfirmDialog
                isOpen={deletingExpense !== null}
                title="Delete Expense"
                message={`Are you sure you want to delete "${deletingExpense?.title}"? This action cannot be undone.`}
                confirmLabel="Delete"
                cancelLabel="Cancel"
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
                isDestructive={true}
            />
        </>
    );
}
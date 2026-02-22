"use client";

import {TrendingUp, DollarSign, Calendar, Tag} from "lucide-react";
import {ExpensesSummary as ExpensesSummaryType, EXPENSE_CATEGORY_LABELS} from "@/types/construction-expenses";

interface ExpensesSummaryProps {
    summary: ExpensesSummaryType | null;
    buildingName: string;
    isLoading?: boolean;
}

export function ExpensesSummary({summary, buildingName, isLoading = false}: ExpensesSummaryProps) {
    const formatAmount = (amount: number) => {
        return `€${amount.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        })}`;
    };

    // Get top category by count
    const getTopCategory = () => {
        if (!summary || Object.keys(summary.totalsByCategory).length === 0) {
            return null;
        }

        const entries = Object.entries(summary.totalsByCategory);

        if (entries.length === 0) {
            return null;
        }

        const topEntry =
            entries.sort((a, b) =>
                b[1].count - a[1].count)[0]; // [0] because it's sorted descending by count

        if (!topEntry) {
            return null;
        }

        return {
            category: EXPENSE_CATEGORY_LABELS[topEntry[0]] || topEntry[0],
            count: topEntry[1].count,
        };
    };

    const topCategory = getTopCategory();

    // Loading state
    if (isLoading) {
        return (
            <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl p-6 shadow-lg">
                <div className="animate-pulse">
                    <div className="h-8 bg-white/20 rounded w-48 mb-6"></div>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="bg-white/10 rounded-lg p-4">
                                <div className="h-4 bg-white/20 rounded w-20 mb-2"></div>
                                <div className="h-8 bg-white/20 rounded w-32"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    // Empty state
    if (!summary) {
        return (
            <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl p-6 text-white shadow-lg">
                <div className="flex items-start justify-between mb-6">
                    <div>
                        <h2 className="text-sm font-medium text-amber-100 mb-1">
                            Construction Expenses
                        </h2>
                        <h3 className="text-2xl font-bold">{buildingName}</h3>
                    </div>
                    <div className="bg-white/20 p-3 rounded-lg">
                        <DollarSign className="h-6 w-6"/>
                    </div>
                </div>
                <p className="text-amber-100">No expenses recorded yet</p>
            </div>
        );
    }

    return (
        <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl p-6 text-white shadow-lg">
            <div className="flex items-start justify-between mb-6">
                <div>
                    <h2 className="text-sm font-medium text-amber-100 mb-1">
                        Construction Expenses
                    </h2>
                    <h3 className="text-2xl font-bold">{buildingName}</h3>
                </div>
                <div className="bg-white/20 p-3 rounded-lg">
                    <DollarSign className="h-6 w-6"/>
                </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Total Amount (in EUR) */}
                <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                    <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="h-4 w-4 text-amber-100"/>
                        <span className="text-xs font-medium text-amber-100">Total Spent</span>
                    </div>
                    <div className="text-2xl font-bold">
                        {formatAmount(summary.totalAmountEur)}
                    </div>
                    <div className="text-xs text-amber-100 mt-1">
                        Base: {summary.baseCurrency}
                    </div>
                </div>

                {/* Expense Count */}
                <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                    <div className="flex items-center gap-2 mb-2">
                        <Calendar className="h-4 w-4 text-amber-100"/>
                        <span className="text-xs font-medium text-amber-100">Transactions</span>
                    </div>
                    <div className="text-2xl font-bold">{summary.expenseCount}</div>
                    <div className="text-xs text-amber-100 mt-1">
                        {summary.expenseCount === 1 ? 'expense' : 'expenses'}
                    </div>
                </div>

                {/* Average Expense (in EUR) */}
                <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                    <div className="flex items-center gap-2 mb-2">
                        <DollarSign className="h-4 w-4 text-amber-100"/>
                        <span className="text-xs font-medium text-amber-100">Average</span>
                    </div>
                    <div className="text-2xl font-bold">
                        {formatAmount(summary.averageExpenseEur)}
                    </div>
                    <div className="text-xs text-amber-100 mt-1">per transaction</div>
                </div>

                {/* Top Category */}
                <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                    <div className="flex items-center gap-2 mb-2">
                        <Tag className="h-4 w-4 text-amber-100"/>
                        <span className="text-xs font-medium text-amber-100">Top Category</span>
                    </div>
                    <div className="text-lg font-bold truncate">
                        {topCategory ? topCategory.category : 'N/A'}
                    </div>
                    <div className="text-xs text-amber-100 mt-1">
                        {topCategory ? `${topCategory.count} ${topCategory.count === 1 ? 'expense' : 'expenses'}` : ''}
                    </div>
                </div>
            </div>

            {/* Currency Breakdown (Optional - shows original currencies) */}
            {Object.keys(summary.totalsByCurrency).length > 1 && (
                <div className="mt-4 pt-4 border-t border-white/20">
                    <p className="text-xs text-amber-100 mb-2">Original Currencies:</p>
                    <div className="flex flex-wrap gap-2">
                        {Object.entries(summary.totalsByCurrency).map(([currency, amount]) => (
                            <span
                                key={currency}
                                className="bg-white/10 px-2 py-1 rounded text-xs font-medium"
                            >
                                {currency}: {amount.toLocaleString('en-US', {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                            })}
                            </span>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
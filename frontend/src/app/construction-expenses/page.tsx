"use client";

import {useEffect, useState} from "react";
import {Building} from "@/types/building";
import {useBuildingsApi} from "@/lib/api/useBuildingsApi";
import {useConstructionExpensesApi} from "@/lib/api/useConstructionExpensesApi";
import {Plus, ArrowLeft, RefreshCw} from "lucide-react";
import {
    ConstructionExpense,
    CreateConstructionExpenseDto,
    UpdateConstructionExpenseDto,
    ExpensesSummary as ExpensesSummaryType,
} from "@/types/construction-expenses";
import {ExpensesSummary} from "@/components/construction-expenses/ExpensesSummary";
import {ExpensesList} from "@/components/construction-expenses/ExpensesList";
import {BuildingSelector} from "@/components/buildings/BuildingSelector";
import {ExpenseForm} from "@/components/construction-expenses/ExpenseForm";

export default function ConstructionExpensesPage() {
    const buildingsApi = useBuildingsApi();

    // State
    const [buildings, setBuildings] = useState<Building[]>([]);
    const [selectedBuilding, setSelectedBuilding] = useState<Building | null>(null);
    const [expenses, setExpenses] = useState<ConstructionExpense[]>([]);
    const [summary, setSummary] = useState<ExpensesSummaryType | null>(null); // ✅ NEW
    const [isLoadingBuildings, setIsLoadingBuildings] = useState(true);
    const [isLoadingExpenses, setIsLoadingExpenses] = useState(false);
    const [isLoadingSummary, setIsLoadingSummary] = useState(false); // ✅ NEW
    const [showForm, setShowForm] = useState(false);
    const [editingExpense, setEditingExpense] = useState<ConstructionExpense | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Get expenses API for selected building
    const expensesApi = selectedBuilding
        ? useConstructionExpensesApi(selectedBuilding.id)
        : null;

    // Load construction buildings on mount
    useEffect(() => {
        loadBuildings();
    }, []);

    // Load expenses and summary when building is selected
    useEffect(() => {
        if (selectedBuilding) {
            loadExpenses();
            loadSummary(); // ✅ NEW
        } else {
            setExpenses([]);
            setSummary(null);
        }
    }, [selectedBuilding]);

    const loadBuildings = async () => {
        try {
            setIsLoadingBuildings(true);
            const data = await buildingsApi.getAllConstruction();
            setBuildings(data);
        } catch (error) {
            console.error('Failed to load construction buildings:', error);
        } finally {
            setIsLoadingBuildings(false);
        }
    };

    const loadExpenses = async () => {
        if (!expensesApi) return;

        try {
            setIsLoadingExpenses(true);
            const data = await expensesApi.getAll();
            // Sort by expense date (newest first)
            const sorted = data.sort((a, b) =>
                new Date(b.expenseDate).getTime() - new Date(a.expenseDate).getTime()
            );
            setExpenses(sorted);
        } catch (error) {
            console.error('Failed to load expenses:', error);
        } finally {
            setIsLoadingExpenses(false);
        }
    };

    // ✅ NEW: Load summary from backend
    const loadSummary = async () => {
        if (!expensesApi) return;

        try {
            setIsLoadingSummary(true);
            const data = await expensesApi.getSummary();
            setSummary(data);
        } catch (error) {
            console.error('Failed to load summary:', error);
            setSummary(null);
        } finally {
            setIsLoadingSummary(false);
        }
    };

    const handleSelectBuilding = (building: Building) => {
        setSelectedBuilding(building);
    };

    const handleBackToBuildings = () => {
        setSelectedBuilding(null);
        setExpenses([]);
        setSummary(null);
    };

    const handleCreateExpense = async (data: CreateConstructionExpenseDto) => {
        if (!expensesApi) return;

        try {
            setIsSubmitting(true);
            await expensesApi.create(data);
            // Reload both expenses and summary
            await Promise.all([loadExpenses(), loadSummary()]);
            setShowForm(false);
        } catch (error) {
            console.error('Failed to create expense:', error);
            alert('Failed to create expense. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleUpdateExpense = async (data: UpdateConstructionExpenseDto) => {
        if (!expensesApi || !editingExpense) return;

        try {
            setIsSubmitting(true);
            await expensesApi.update(editingExpense.id, data);

            // Reload both expenses and summary - paralleled
            // what about .allSettled instead of .all?
            await Promise.all([
                loadExpenses(),
                loadSummary()
            ]);

            setShowForm(false);
            setEditingExpense(null);
        } catch (error) {
            console.error('Failed to update expense:', error);
            alert('Failed to update expense. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDeleteExpense = async (expenseId: string) => {
        if (!expensesApi) return;

        try {
            await expensesApi.delete(expenseId);
            // Reload both expenses and summary
            await Promise.all([loadExpenses(), loadSummary()]);
        } catch (error) {
            console.error('Failed to delete expense:', error);
            alert('Failed to delete expense. Please try again.');
        }
    };

    const handleEdit = (expense: ConstructionExpense) => {
        setEditingExpense(expense);
        setShowForm(true);
    };

    const handleCancelForm = () => {
        setShowForm(false);
        setEditingExpense(null);
    };

    // ✅ NEW: Refresh both data and summary
    const handleRefresh = async () => {
        await Promise.all([loadExpenses(), loadSummary()]);
    };

    return (
        <div className="max-w-7xl mx-auto">
            {/* Page Header */}
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-neutral-900 mb-2">
                    Construction Expenses
                </h1>
                <p className="text-neutral-600 text-lg">
                    Track and manage expenses for buildings under construction
                </p>
            </div>

            {/* Building Selection View */}
            {!selectedBuilding && (
                <div>
                    <div className="mb-6 flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-neutral-900">
                            Select a Building
                        </h2>
                        <button
                            onClick={loadBuildings}
                            disabled={isLoadingBuildings}
                            className="flex items-center gap-2 px-4 py-2 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors disabled:opacity-50"
                        >
                            <RefreshCw className={`h-4 w-4 ${isLoadingBuildings ? 'animate-spin' : ''}`}/>
                            Refresh
                        </button>
                    </div>

                    <BuildingSelector
                        buildings={buildings}
                        selectedBuilding={selectedBuilding}
                        onSelectBuilding={handleSelectBuilding}
                        isLoading={isLoadingBuildings}
                    />
                </div>
            )}

            {/* Expenses View */}
            {selectedBuilding && (
                <div>
                    {/* Back Button */}
                    <button
                        onClick={handleBackToBuildings}
                        className="flex items-center gap-2 text-neutral-600 hover:text-neutral-900 mb-6 transition-colors group"
                    >
                        <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform"/>
                        <span className="font-medium">Back to Buildings</span>
                    </button>

                    {/* Summary - Now uses backend data */}
                    <div className="mb-6">
                        <ExpensesSummary
                            summary={summary}
                            buildingName={selectedBuilding.name}
                            isLoading={isLoadingSummary}
                        />
                    </div>

                    {/* Actions Bar */}
                    <div className="mb-6 flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-neutral-900">
                            Expenses ({expenses.length})
                        </h2>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={handleRefresh}
                                disabled={isLoadingExpenses || isLoadingSummary}
                                className="flex items-center gap-2 px-4 py-2 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors disabled:opacity-50"
                            >
                                <RefreshCw
                                    className={`h-4 w-4 ${isLoadingExpenses || isLoadingSummary ? 'animate-spin' : ''}`}
                                />
                                Refresh
                            </button>
                            <button
                                onClick={() => setShowForm(true)}
                                className="flex items-center gap-2 bg-amber-500 text-white px-5 py-2.5 rounded-lg hover:bg-amber-600 transition-colors font-semibold shadow-md hover:shadow-lg"
                            >
                                <Plus className="h-5 w-5"/>
                                Add Expense
                            </button>
                        </div>
                    </div>

                    {/* Expenses List */}
                    <ExpensesList
                        expenses={expenses}
                        onEdit={handleEdit}
                        onDelete={handleDeleteExpense}
                        isLoading={isLoadingExpenses}
                    />
                </div>
            )}

            {/* Form Modal */}
            {showForm && (
                <ExpenseForm
                    onSubmit={editingExpense ? handleUpdateExpense : handleCreateExpense}
                    onCancel={handleCancelForm}
                    initialData={editingExpense}
                    isSubmitting={isSubmitting}
                />
            )}
        </div>
    );
}
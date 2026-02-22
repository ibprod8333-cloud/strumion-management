import {fetchFromApi} from "@/lib/api/fetchFromApi";
import {
    ConstructionExpense,
    CreateConstructionExpenseDto, ExpensesSummary,
    UpdateConstructionExpenseDto
} from "@/types/construction-expenses";

export function useConstructionExpensesApi(buildingId: string | undefined) {
    const baseEndpoint = `buildings/${buildingId}/construction-expenses`;

    return {
        getAll: (): Promise<ConstructionExpense[]> =>
            fetchFromApi(baseEndpoint),

        getSummary: (): Promise<ExpensesSummary> =>
            fetchFromApi(`${baseEndpoint}/summary`),

        getOne: (expenseId: string): Promise<ConstructionExpense> =>
            fetchFromApi(`${baseEndpoint}/${expenseId}`),

        create: (data: CreateConstructionExpenseDto): Promise<ConstructionExpense> =>
            fetchFromApi(baseEndpoint, {
                method: "POST",
                body: JSON.stringify(data),
            }),

        update: (expenseId: string, data: UpdateConstructionExpenseDto): Promise<ConstructionExpense> =>
            fetchFromApi(`${baseEndpoint}/${expenseId}`, {
                method: "PATCH",
                body: JSON.stringify(data),
            }),

        delete: (expenseId: string): Promise<void> =>
            fetchFromApi(`${baseEndpoint}/${expenseId}`, {
                method: "DELETE",
            }),
    };
}
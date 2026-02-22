import {Currency} from "../../common/currency/currency.enum";

export class ExpensesSummaryDto {
    baseCurrency: Currency.EUR;
    totalAmountEur: number;
    expenseCount: number;
    averageExpenseEur: number;
    totalsByCategory: Record<string, { totalEur: number; count: number }>;
    totalsByCurrency: Record<string, number>;
}
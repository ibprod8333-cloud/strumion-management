export interface ConstructionExpense {
    id: string;
    buildingId: string;
    title: string;
    description?: string;
    amount: number;
    currency: string;
    category: string;
    expenseDate: Date | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
}

export interface CreateConstructionExpenseDto {
    title: string;
    description?: string;
    amount: number;
    currency: string;
    category: string;
    expenseDate: string;
}

export interface UpdateConstructionExpenseDto {
    title?: string;
    description?: string;
    amount?: number;
    currency?: string;
    category?: string;
    expenseDate?: string;
}

export const EXPENSE_CATEGORIES = {
    MATERIALS: 'materials',
    LABOR: 'labor',
    PERMITS: 'permits',
    EQUIPMENT: 'equipment',
    UTILITIES: 'utilities',
    PROFESSIONAL_SERVICES: 'professional_services',
    INSURANCE: 'insurance',
    OTHER: 'other',
} as const;

export const EXPENSE_CATEGORY_LABELS: Record<string, string> = {
    materials: 'Materials',
    labor: 'Labor',
    permits: 'Permits & Licenses',
    equipment: 'Equipment',
    utilities: 'Utilities',
    professional_services: 'Professional Services',
    insurance: 'Insurance',
    other: 'Other',
};

export const CURRENCIES = {
    EUR: 'EUR',
    USD: 'USD',
    GBP: 'GBP',
    MKD: 'MKD',
} as const;

export const CURRENCY_SYMBOLS: Record<string, string> = {
    EUR: '€',
    USD: '$',
    GBP: '£',
    MKD: 'ден',
};

export interface ExpensesSummary {
    baseCurrency: string;
    totalAmountEur: number;
    expenseCount: number;
    averageExpenseEur: number;
    totalsByCategory: Record<string, CategoryTotal>;
    totalsByCurrency: Record<string, number>;
}

export interface CategoryTotal {
    totalEur: number;
    count: number;
}
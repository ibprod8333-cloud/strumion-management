// entity = domain model = interface
export interface ConstructionExpense {
    id: string;
    buildingId: string;
    title: string;
    description: string;
    amount: number;
    currency: string; // todo: it should be enum
    category: string; // todo: it should be enum (materials - different type, labor, permits, etc.)
    expenseDate: Date;

    createdAt?: Date;
    updatedAt?: Date;
}
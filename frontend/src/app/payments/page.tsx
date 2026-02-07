import {getPayments, getExpenses, getPaymentStats} from "@/services/dashboard/payments";
import {PaymentStats} from "@/app/payments/components/PaymentStats";
import {IncomeSection} from "@/app/payments/components/IncomeSection";
import {ExpensesSection} from "@/app/payments/components/ExpensesSection";


export default async function PaymentsPage() {
    const payments = await getPayments();
    const expenses = await getExpenses();
    const stats = await getPaymentStats();

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold mb-2">Payments & Finances</h2>
                <p className="text-neutral-500">Manage income and track all business expenses</p>
            </div>

            {/* Stats Overview */}
            <PaymentStats stats={stats}/>

            {/* Income Section */}
            <IncomeSection payments={payments}/>

            {/* Expenses Section */}
            <ExpensesSection expenses={expenses}/>
        </div>
    );
}
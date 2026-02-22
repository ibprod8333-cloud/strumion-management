import {BadRequestException, Injectable, NotFoundException} from "@nestjs/common";
import * as admin from 'firebase-admin';
import {CreateConstructionExpenseDto} from "./dto/create-construction-expense.dto";
import {UpdateConstructionExpenseDto} from "./dto/update-construction-expense.dto";
import {FirebaseAdminService} from "../firebase-admin/firebase-admin.service";
import {ConstructionExpense} from "./entities/construction-expense.entity";
import {snapshot} from "node:test";
import {ExchangeRateService} from "../common/currency/exchange-rate.service";
import {Currency, parseCurrency} from "../common/currency/currency.enum";
import {ExpensesSummaryDto} from "./dto/expenses-summary.dto";

@Injectable()
export class ConstructionExpensesService {

    constructor(
        private readonly firebaseAdmin: FirebaseAdminService,
        private readonly exchangeRateService: ExchangeRateService
    ) {
    }

    private get firestore() {
        return this.firebaseAdmin.firestore;
    }

    // this creates a subcollection, not a subdocument
    private getExpensesCollection(buildingId: string) {
        return this.firestore
            .collection('buildings')
            .doc(buildingId)
            .collection('constructionExpenses');
    }

    private docToExpense(
        doc: admin.firestore.DocumentSnapshot,
        buildingId: string
    ): ConstructionExpense | null {
        const data = doc.data();
        if (!data) return null;

        return {
            id: doc.id,
            buildingId,
            title: data.title,
            amount: data.amount,
            expenseDate: data.expenseDate?.toDate?.() || data.expenseDate,
            createdAt: data.createdAt?.toDate?.() || data.createdAt,
            updatedAt: data.updatedAt?.toDate?.() || data.updatedAt,
            currency: data.currency,
            description: data.description,
            category: data.category,
        };
    }

    async getAll(buildingId: string) {
        const snapshot = await this.getExpensesCollection(buildingId).get();

        return snapshot.docs
            .map(doc => this.docToExpense(doc, buildingId))
            .filter((e): e is ConstructionExpense => e !== null);
    }

    async getOne(buildingId: string, expenseId: string) {
        const doc = await this.getExpensesCollection(buildingId)
            .doc(expenseId)
            .get();

        if (!doc.exists) {
            throw new NotFoundException('Expense not found');
        }

        return {
            id: doc.id,
            buildingId,
            ...doc.data(),
        };
    }

    async create(buildingId: string, dto: CreateConstructionExpenseDto) {
        const buildingDoc = await this.firestore
            .collection('buildings')
            .doc(buildingId)
            .get();

        if (!buildingDoc.exists) {
            throw new NotFoundException('Building not found');
        }

        if (!buildingDoc.data()?.isConstruction) {
            throw new BadRequestException(
                'Cannot add expenses to non-construction building',
            );
        }

        const now = admin.firestore.FieldValue.serverTimestamp();

        const docRef = await this.getExpensesCollection(buildingId).add({
            ...dto,
            expenseDate: new Date(dto.expenseDate),
            createdAt: now,
            updatedAt: now,
        });

        const created = await docRef.get();

        return {
            id: created.id,
            buildingId,
            ...created.data(),
        };
    }

    async update(
        buildingId: string,
        expenseId: string,
        dto: UpdateConstructionExpenseDto,
    ) {
        const docRef = this.getExpensesCollection(buildingId).doc(expenseId);

        const doc = await docRef.get();
        if (!doc.exists) {
            throw new NotFoundException('Expense not found');
        }

        await docRef.update({
            ...dto,
            ...(dto.expenseDate && {expenseDate: new Date(dto.expenseDate)}),
            updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        });

        const updated = await docRef.get();

        return {
            id: updated.id,
            buildingId,
            ...updated.data(),
        };
    }

    async delete(buildingId: string, expenseId: string) {
        const docRef = this.getExpensesCollection(buildingId).doc(expenseId);

        const doc = await docRef.get();
        if (!doc.exists) {
            throw new NotFoundException('Expense not found');
        }

        await docRef.delete();
    }

    // - - - BETTER STRUCTURE - - -
    // TODO: DB → domain model
    // domain model → summary result (domain object)
    // summary result → DTO

    // TODO: IMPORTANT -> DOMAIN MODEL

    // TODO: If you want next, we can:
    // 	•	Refactor this into a real domain service layer
    // 	•	Add proper Swagger decorators
    // 	•	Or redesign your module structure to be production-grade

    // TODO: HOW TO CREATE DOMAIN MODEL ABOUT THIS?
    // Your repository layer should return: ConstructionExpense (domain model)
    // That is strongly typed domain object
    // Instead of converting inside the loop, convert when mapping from DB → domain.
    async getSummary(buildingId: string): Promise<ExpensesSummaryDto> {
        const expenses = await this.getAll(buildingId);
        console.log(expenses);
        if (expenses.length === 0) {
            return {
                baseCurrency: Currency.EUR,
                totalAmountEur: 0,
                expenseCount: 0,
                averageExpenseEur: 0,
                totalsByCategory: {},
                totalsByCurrency: {},
            };
        }

        let totalEur = 0;
        const totalsByCategory: Record<string, { totalEur: number, count: number }> = {};
        const totalsByCurrency: Record<string, number> = {};

        for (const expense of expenses) {

            const currencyEnum = parseCurrency(expense.currency);

            const amountEur = this.exchangeRateService.convertToEUR(
                expense.amount,
                currencyEnum,
            );

            totalEur += amountEur;

            // Category aggregation
            if (!totalsByCategory[expense.category]) {
                totalsByCategory[expense.category] = {totalEur: 0, count: 0};
            }

            totalsByCategory[expense.category].totalEur += amountEur;
            totalsByCategory[expense.category].count += 1;

            // Currency aggregation
            if (!totalsByCurrency[expense.currency]) {
                totalsByCurrency[expense.currency] = 0;
            }

            totalsByCurrency[expense.currency] += expense.amount;
        }

        return {
            baseCurrency: Currency.EUR,
            totalAmountEur: totalEur,
            expenseCount: expenses.length,
            averageExpenseEur: totalEur / expenses.length,
            totalsByCategory,
            totalsByCurrency,
        };
    }
}
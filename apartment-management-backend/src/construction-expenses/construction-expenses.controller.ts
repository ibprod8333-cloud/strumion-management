import {Body, Controller, Delete, Get, Param, Patch, Post} from "@nestjs/common";
import {ConstructionExpensesService} from "./construction-expenses.service";
import {CreateConstructionExpenseDto} from "./dto/create-construction-expense.dto";
import {UpdateConstructionExpenseDto} from "./dto/update-construction-expense.dto";
import {ExpensesSummaryDto} from "./dto/expenses-summary.dto";


@Controller('buildings/:buildingId/construction-expenses')
export class ConstructionExpensesController {


    constructor(
        private readonly service: ConstructionExpensesService
    ) {
    }

    @Get()
    getAll(@Param('buildingId') buildingId: string) {
        return this.service.getAll(buildingId);
    }

    @Get('summary')
    getSummary(@Param('buildingId') buildingId: string): Promise<ExpensesSummaryDto> {
        console.log(buildingId);
        return this.service.getSummary(buildingId);
    }

    @Get(':expenseId')
    getOne(
        @Param('buildingId') buildingId: string,
        @Param('expenseId') expenseId: string,
    ) {
        return this.service.getOne(buildingId, expenseId);
    }

    @Post()
    create(
        @Param('buildingId') buildingId: string,
        @Body() dto: CreateConstructionExpenseDto,
    ) {
        return this.service.create(buildingId, dto);
    }

    @Patch(':expenseId')
    update(
        @Param('buildingId') buildingId: string,
        @Param('expenseId') expenseId: string,
        @Body() dto: UpdateConstructionExpenseDto,
    ) {
        return this.service.update(buildingId, expenseId, dto);
    }

    @Delete(':expenseId')
    delete(
        @Param('buildingId') buildingId: string,
        @Param('expenseId') expenseId: string,
    ) {
        return this.service.delete(buildingId, expenseId);
    }

    // todo: TOTAL SUM ENDPOINT (/total)
    // todo: AGREGATED REPORT ENDPOINT
    // todo: soft deletes
    // todo: excel export
    // todo: logs

}
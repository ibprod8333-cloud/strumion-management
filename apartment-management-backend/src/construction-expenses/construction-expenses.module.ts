import {Module} from '@nestjs/common';
import {ConstructionExpensesController} from './construction-expenses.controller';
import {ConstructionExpensesService} from './construction-expenses.service';
import {ExchangeRateService} from "../common/currency/exchange-rate.service";
import {ExchangeRateModule} from "../common/currency/exchange-rate.module";

@Module({
    imports: [ExchangeRateModule],
    controllers: [ConstructionExpensesController],
    providers: [ConstructionExpensesService],
})
export class ConstructionExpensesModule {
}
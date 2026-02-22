import {Injectable} from "@nestjs/common";
import {Currency} from "./currency.enum";

@Injectable()
export class ExchangeRateService {

    private readonly ratesToEUR: Record<Currency, number> = {
        [Currency.EUR]: 1,
        [Currency.USD]: 0.92,
        [Currency.GBP]: 1.17,
        [Currency.MKD]: 0.0162601,
    };

    convertToEUR(amount: number, currency: Currency): number {

        const rate = this.ratesToEUR[currency];

        if (!rate) {
            throw new Error(`Unsupported currency: ${currency}`);
        }

        return amount * rate;
    }
}
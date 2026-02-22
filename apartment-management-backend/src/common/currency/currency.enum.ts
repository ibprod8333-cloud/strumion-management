export enum Currency {
    EUR = 'EUR',
    USD = 'USD',
    GBP = 'GBP',
    MKD = 'MKD',
}

export function parseCurrency(currency: string): Currency {
    if (Object.values(Currency).includes(currency as Currency)) {
        return currency as Currency;
    }

    throw new Error(`Invalid currency: ${currency}`);
}
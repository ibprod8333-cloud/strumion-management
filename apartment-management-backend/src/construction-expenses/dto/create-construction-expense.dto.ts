import {IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString, Min} from "class-validator";

export class CreateConstructionExpenseDto {

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsNumber()
    @Min(0)
    amount: number;

    @IsString()
    currency: string;

    @IsString()
    category: string;

    @IsDateString()
    expenseDate: string;

}

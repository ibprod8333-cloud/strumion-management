import {PartialType} from "@nestjs/mapped-types";
import {CreateConstructionExpenseDto} from "./create-construction-expense.dto";


export class UpdateConstructionExpenseDto extends PartialType(CreateConstructionExpenseDto) {
}
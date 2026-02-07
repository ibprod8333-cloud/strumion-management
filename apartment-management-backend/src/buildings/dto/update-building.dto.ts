import {PartialType} from '@nestjs/mapped-types';
import {CreateBuildingDto} from './create-building.dto';

// PartialType automatically makes all fields optional for updates.
export class UpdateBuildingDto extends PartialType(CreateBuildingDto) {
}
import {Body, Controller, Delete, Get, Param, Patch, Post} from '@nestjs/common';
import {BuildingsService} from "./buildings.service";
import {CreateBuildingDto} from "./dto/create-building.dto";
import {Building} from "./interfaces/building.interface";
import {UpdateBuildingDto} from "./dto/update-building.dto";

@Controller('buildings')
export class BuildingsController {

    constructor(private readonly buildingsService: BuildingsService) {
    }

    @Post()
    create(@Body() createBuildingDto: CreateBuildingDto): Promise<Building> {
        return this.buildingsService.create(createBuildingDto);
    }

    @Get()
    findAll(): Promise<Building[]> {
        return this.buildingsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<Building> {
        return this.buildingsService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateBuildingDto: UpdateBuildingDto): Promise<Building> {
        return this.buildingsService.update(id, updateBuildingDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
        return this.buildingsService.remove(id);
    }

}

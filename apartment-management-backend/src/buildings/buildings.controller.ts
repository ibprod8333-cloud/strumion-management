import {Body, Controller, Delete, Get, Param, Patch, Post, Query} from '@nestjs/common';
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
        console.log(createBuildingDto);
        return this.buildingsService.create(createBuildingDto);
    }

    // @Get()
    // findAll(): Promise<Building[]> {
    //     return this.buildingsService.findAll();
    // }

    @Get()
    findAll(@Query('construction') construction?: string): Promise<Building[]> {
        // If construction query param is 'true', filter only construction buildings
        if (construction === 'true') {
            return this.buildingsService.findAllConstruction();
        }
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

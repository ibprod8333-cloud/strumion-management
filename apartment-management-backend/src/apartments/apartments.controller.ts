// src/apartments/apartments.controller.ts
import { Controller, Post, Get, Param, Patch, Delete, Body } from "@nestjs/common";
import { ApartmentsService } from "./apartments.service";
import { CreateApartmentDto } from "./dto/create-apartment.dto";
import { UpdateApartmentDto } from "./dto/update-apartment.dto";
import { Apartment } from "./interfaces/apartment.interface";

@Controller("apartments")
export class ApartmentsController {
    constructor(private readonly apartmentsService: ApartmentsService) {}

    @Post()
    create(@Body() dto: CreateApartmentDto): Promise<Apartment> {
        return this.apartmentsService.create(dto);
    }

    @Get()
    findAll(): Promise<Apartment[]> {
        return this.apartmentsService.findAll();
    }

    @Get(":id")
    findOne(@Param("id") id: string): Promise<Apartment> {
        return this.apartmentsService.findOne(id);
    }

    @Patch(":id")
    update(@Param("id") id: string, @Body() dto: UpdateApartmentDto): Promise<Apartment> {
        return this.apartmentsService.update(id, dto);
    }

    @Delete(":id")
    remove(@Param("id") id: string): Promise<void> {
        return this.apartmentsService.remove(id);
    }
}
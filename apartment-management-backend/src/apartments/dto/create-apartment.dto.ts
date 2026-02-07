// src/apartments/dto/create-apartment.dto.ts
import {IsString, IsNumber, IsArray, IsOptional, IsEnum, Min} from "class-validator";
import {ApartmentStatus} from "../enums/apartment-status.enum";
import {Type} from "class-transformer";
import {ApartmentAmenity} from "../enums/apartment-amenity.enum";


export class CreateApartmentDto {
    @IsString()
    name: string;

    @IsString()
    buildingId: string;

    @Type(() => Number)
    @IsNumber()
    floor: number;

    @IsString()
    number: string;

    @Type(() => Number)
    @IsNumber()
    @Min(1)
    maxGuests: number;

    @Type(() => Number)
    @IsNumber()
    bedrooms: number;

    @Type(() => Number)
    @IsNumber()
    bathrooms: number;

    @Type(() => Number)
    @IsNumber()
    pricePerNight: number;

    @IsEnum(ApartmentStatus)
    status: ApartmentStatus;

    @IsArray()
    @IsEnum(ApartmentAmenity, {each: true})
    amenities: ApartmentAmenity[];

    @IsOptional()
    @IsString()
    description?: string;
}
// src/apartments/interfaces/apartment.interface.ts
import {ApartmentStatus} from "../enums/apartment-status.enum";
import * as admin from "firebase-admin";
import {ApartmentAmenity} from "../enums/apartment-amenity.enum";
import {Timestamp} from "firebase-admin/firestore"

export interface Apartment {
    id: string;
    name: string;
    buildingId: string;
    buildingName: string;
    floor: number;
    number: string;
    maxGuests: number;
    bedrooms: number;
    bathrooms: number;
    pricePerNight: number;
    status: ApartmentStatus;
    amenities: ApartmentAmenity[];
    description?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface ApartmentFirestore {
    name: string;
    buildingId: string;
    buildingName: string;
    floor: number;
    number: string;
    maxGuests: number;
    bedrooms: number;
    bathrooms: number;
    pricePerNight: number;
    status: ApartmentStatus;
    amenities: ApartmentAmenity[];
    description?: string;
    createdAt: admin.firestore.FieldValue;
    updatedAt: admin.firestore.FieldValue;
}
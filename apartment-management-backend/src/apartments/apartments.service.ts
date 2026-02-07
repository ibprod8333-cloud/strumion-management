// src/apartments/apartments.service.ts
import { Injectable, NotFoundException, BadRequestException } from "@nestjs/common";
import * as admin from "firebase-admin";
import { FirebaseAdminService } from "../firebase-admin/firebase-admin.service";
import {Apartment, ApartmentFirestore} from "./interfaces/apartment.interface";
import { CreateApartmentDto } from "./dto/create-apartment.dto";
import { UpdateApartmentDto } from "./dto/update-apartment.dto";
import { BuildingsService } from "../buildings/buildings.service";

@Injectable()
export class ApartmentsService {
    private readonly collectionName = "apartments";

    constructor(
        private readonly firebaseAdmin: FirebaseAdminService,
        private readonly buildingsService: BuildingsService
    ) {}

    /* -------------------- MAPPER -------------------- */

    private docToApartment(doc: admin.firestore.DocumentSnapshot): Apartment {
        const data = doc.data();
        if (!data) {
            throw new NotFoundException("Apartment data missing");
        }

        return {
            id: doc.id,
            ...(data as Omit<Apartment, "id">),
            createdAt: data.createdAt?.toDate?.() ?? null,
            updatedAt: data.updatedAt?.toDate?.() ?? null,
        };
    }

    /* -------------------- CREATE -------------------- */

    async create(dto: CreateApartmentDto): Promise<Apartment> {
        const building = await this.buildingsService.findOne(dto.buildingId);
        if (!building) {
            throw new BadRequestException(`Building with ID ${dto.buildingId} not found`);
        }

        const docRef = this.firebaseAdmin.firestore
            .collection(this.collectionName)
            .doc();

        const apartmentData: ApartmentFirestore = {
            ...dto,
            buildingName: building.name,
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
            updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        };

        await docRef.set(apartmentData);

        const doc = await docRef.get();
        return this.docToApartment(doc);
    }

    /* -------------------- READ -------------------- */

    async findAll(): Promise<Apartment[]> {
        const snapshot = await this.firebaseAdmin.firestore
            .collection(this.collectionName)
            .get();

        return snapshot.docs.map(doc => this.docToApartment(doc));
    }

    async findOne(id: string): Promise<Apartment> {
        const doc = await this.firebaseAdmin.firestore
            .collection(this.collectionName)
            .doc(id)
            .get();

        if (!doc.exists) {
            throw new NotFoundException(`Apartment with ID ${id} not found`);
        }

        return this.docToApartment(doc);
    }

    /* -------------------- UPDATE -------------------- */

    async update(id: string, dto: UpdateApartmentDto): Promise<Apartment> {
        const docRef = this.firebaseAdmin.firestore
            .collection(this.collectionName)
            .doc(id);

        const doc = await docRef.get();
        if (!doc.exists) {
            throw new NotFoundException(`Apartment with ID ${id} not found`);
        }

        const updateData: Partial<ApartmentFirestore> = {
            ...dto,
            updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        };

        if (dto.buildingId) {
            const building = await this.buildingsService.findOne(dto.buildingId);
            if (!building) {
                throw new BadRequestException(`Building with ID ${dto.buildingId} not found`);
            }
            updateData.buildingName = building.name;
        }

        await docRef.update(updateData);

        const updatedDoc = await docRef.get();
        return this.docToApartment(updatedDoc);
    }

    /* -------------------- DELETE -------------------- */

    async remove(id: string): Promise<void> {
        const docRef = this.firebaseAdmin.firestore
            .collection(this.collectionName)
            .doc(id);

        const doc = await docRef.get();
        if (!doc.exists) {
            throw new NotFoundException(`Apartment with ID ${id} not found`);
        }

        await docRef.delete();
    }
}
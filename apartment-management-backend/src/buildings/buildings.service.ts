import {Injectable, NotFoundException} from '@nestjs/common';
import {Building} from "./interfaces/building.interface";
import * as admin from 'firebase-admin';
import {FirebaseAdminService} from "../firebase-admin/firebase-admin.service";


@Injectable()
export class BuildingsService {
    private collectionName = 'buildings';

    constructor(private readonly firebaseAdmin: FirebaseAdminService) {
    }


    private docToBuilding(doc: admin.firestore.DocumentSnapshot): Building | null {
        const data = doc.data();
        if (!data) return null;

        return {
            id: doc.id,
            ...data,
            createdAt: data.createdAt?.toDate?.() || data.createdAt,
            updatedAt: data.updatedAt?.toDate?.() || data.updatedAt,
        } as Building;
    }

    async create(building: Omit<Building, 'id' | 'createdAt' | 'updatedAt'>): Promise<Building> {
        const docRef = this.firebaseAdmin.firestore.collection(this.collectionName).doc();
        const now = admin.firestore.FieldValue.serverTimestamp();

        const cleanedBuilding = Object.entries(building).reduce((acc, [key, value]) => {
            if (value !== undefined) {
                acc[key] = value;
            }
            return acc;
        }, {} as any);

        await docRef.set({
            ...cleanedBuilding,
            createdAt: now,
            updatedAt: now,
        });

        const doc = await docRef.get();
        return {id: docRef.id, ...(doc.data() as Building)};
    }

    async findAll(): Promise<Building[]> {
        const snapshot = await this.firebaseAdmin.firestore.collection(this.collectionName).get();
        return snapshot.docs
            .map(doc => this.docToBuilding(doc))
            .filter((building): building is Building => building !== null); // Filter out nulls
    }

    async findOne(id: string): Promise<Building> {
        const doc = await this.firebaseAdmin.firestore.collection(this.collectionName).doc(id).get();
        if (!doc.exists) {
            throw new NotFoundException(`Building with ID ${id} not found`);
        }
        return {id: doc.id, ...(doc.data() as Building)};
    }

    async update(id: string, update: Partial<Building>): Promise<Building> {
        const docRef = this.firebaseAdmin.firestore.collection(this.collectionName).doc(id);
        await docRef.update({
            ...update,
            updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        });
        const updatedDoc = await docRef.get();
        return {id: docRef.id, ...(updatedDoc.data() as Building)};
    }

    async remove(id: string): Promise<void> {
        await this.firebaseAdmin.firestore.collection(this.collectionName).doc(id).delete();
    }

}

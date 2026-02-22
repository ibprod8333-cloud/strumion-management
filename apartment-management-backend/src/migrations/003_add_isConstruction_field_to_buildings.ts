import {Migration} from './migration.interface';
import * as admin from 'firebase-admin';

export const addIsConstructionToBuildings: Migration = {
    version: 3,
    name: 'Add isConstruction field to buildings',

    async up(firestore) {
        const snapshot = await firestore.collection('buildings').get();

        const batch = firestore.batch();
        let counter = 0;

        for (const doc of snapshot.docs) {
            const data = doc.data();

            // Only update if field does NOT exist
            if (data.isConstruction === undefined) {
                batch.update(doc.ref, {
                    isConstruction: false, // default value
                    _schemaVersion: 3, // optional but recommended
                    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
                });
                counter++;
            }
        }

        if (counter > 0) {
            await batch.commit();
        }

        console.log(`Updated ${counter} building documents`);
    },
};
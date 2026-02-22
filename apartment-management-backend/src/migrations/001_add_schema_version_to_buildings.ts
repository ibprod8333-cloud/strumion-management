import {Migration} from './migration.interface';

export const addSchemaVersionToBuildings: Migration = {
    version: 1,
    name: 'Add _schemaVersion to buildings documents',

    async up(firestore) {
        const snapshot = await firestore.collection('buildings').get();

        for (const doc of snapshot.docs) {
            const data = doc.data();

            if (!data._schemaVersion) {
                await doc.ref.update({
                    _schemaVersion: 1,
                });
            }
        }
    },
};
import {Migration} from './migration.interface';
import * as admin from 'firebase-admin';

export const createSchemaMetadata: Migration = {
    version: 2,
    name: 'Create schema metadata document',

    async up(firestore) {
        await firestore.collection('_schema').doc('metadata').set({
            currentVersion: 2,
            updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        }, {merge: true});
    },
};
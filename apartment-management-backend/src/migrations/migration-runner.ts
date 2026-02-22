// migrations/migration-runner.ts
import {Firestore} from 'firebase-admin/firestore';
import * as admin from 'firebase-admin';
import {Migration} from './migration.interface';

export async function runMigrations(
    firestore: Firestore,
    migrations: Migration[],
    logger: (msg: string) => void = console.log
) {
    const schemaDoc = firestore.collection('_schema').doc('metadata');

    const snap = await schemaDoc.get();
    const currentVersion = snap.exists ? snap.data()?.currentVersion ?? 0 : 0;

    logger(`📦 Current schema version: ${currentVersion}`);

    const pending = migrations
        .filter(m => m.version > currentVersion)
        .sort((a, b) => a.version - b.version);

    if (!pending.length) {
        logger('✅ No pending migrations');
        return;
    }

    for (const migration of pending) {
        logger(`➡️ Running migration v${migration.version}: ${migration.name}`);
        await migration.up(firestore);

        await schemaDoc.set(
            {
                currentVersion: migration.version,
                updatedAt: admin.firestore.FieldValue.serverTimestamp(),
            },
            {merge: true}
        );

        logger(`✅ Migration v${migration.version} complete`);
    }
}
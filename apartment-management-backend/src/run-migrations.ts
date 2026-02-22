import * as admin from 'firebase-admin';
import 'dotenv/config';
import {runMigrations} from "./migrations/migration-runner";
import {migrations} from "./migrations";

admin.initializeApp({
    credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
});

runMigrations(admin.firestore(), migrations)
    .then(() => {
        console.log('✅ Migrations completed');
        process.exit(0);
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
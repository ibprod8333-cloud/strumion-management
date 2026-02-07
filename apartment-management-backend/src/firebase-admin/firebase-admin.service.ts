import {Injectable} from '@nestjs/common';
import * as admin from 'firebase-admin';
import {join} from 'path';

@Injectable()
export class FirebaseAdminService {
    public firestore: admin.firestore.Firestore;

    constructor() {
        if (!admin.apps.length) {
            admin.initializeApp({
                credential: admin.credential.cert({
                    projectId: process.env.FIREBASE_PROJECT_ID,
                    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
                }),
            });
        }
        this.firestore = admin.firestore();

        this.firestore.settings({
            preferRest: true
        });
    }
}
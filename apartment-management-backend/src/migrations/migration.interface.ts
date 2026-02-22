import {Firestore} from 'firebase-admin/firestore';

export interface Migration {
    version: number;        // 1, 2, 3 ...
    name: string;           // human-readable
    up(firestore: Firestore): Promise<void>;
}
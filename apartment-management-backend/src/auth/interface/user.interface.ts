export interface User {
    uid: string;
    email: string;
    name: string;
    role: 'admin' | 'user';
    emailVerified?: boolean;
    createdAt?: Date | any;
    updatedAt?: Date | any;
    createdBy?: string;
}
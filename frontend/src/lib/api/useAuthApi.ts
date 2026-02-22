import {fetchFromApi} from "@/lib/api/fetchFromApi";

export interface CreateUserDto {
    email: string;
    password: string;
    name: string;
    role?: 'admin' | 'user';
}

export interface User {
    uid: string;
    email: string;
    name: string;
    role: 'admin' | 'user';
    emailVerified?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    createdBy?: string;
}

const AUTH_ENDPOINT = "auth";

export function useAuthApi() {
    return {
        verifyToken: (firebaseToken: string): Promise<any> =>
            fetchFromApi(`${AUTH_ENDPOINT}/verify`, {
                method: "POST",
                body: JSON.stringify({token: firebaseToken}),
            }),

        getCurrentUser: (): Promise<User> =>
            fetchFromApi(`${AUTH_ENDPOINT}/me`),

        getAllUsers: (): Promise<{ users: User[]; count: number }> =>
            fetchFromApi(`${AUTH_ENDPOINT}/users`),

        createUser: (data: CreateUserDto): Promise<User> =>
            fetchFromApi(`${AUTH_ENDPOINT}/create-user`, {
                method: "POST",
                body: JSON.stringify(data),
            }),

        deleteUser: (uid: string): Promise<void> =>
            fetchFromApi(`${AUTH_ENDPOINT}/delete-user/${uid}`, {
                method: "POST",
            }),
    };
}
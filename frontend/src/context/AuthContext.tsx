"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import {
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    User as FirebaseUser,
} from 'firebase/auth';
import { auth } from '@/lib/firebase/config';

interface User {
    uid: string;
    email: string | null;
    displayName: string | null;
    role?: string;
}

interface AuthContextType {
    user: User | null;
    firebaseUser: FirebaseUser | null;
    loading: boolean;
    isAdmin: boolean; // ← NEW: Easy admin check
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    getIdToken: () => Promise<string | null>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                // Get the ID token to extract custom claims
                const tokenResult = await firebaseUser.getIdTokenResult();

                setUser({
                    uid: firebaseUser.uid,
                    email: firebaseUser.email,
                    displayName: firebaseUser.displayName,
                    role: tokenResult.claims.role as string || 'user',
                });
                setFirebaseUser(firebaseUser);
            } else {
                setUser(null);
                setFirebaseUser(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const login = async (email: string, password: string) => {
        await signInWithEmailAndPassword(auth, email, password);
    };

    const logout = async () => {
        await signOut(auth);
    };

    const getIdToken = async (): Promise<string | null> => {
        if (firebaseUser) {
            return await firebaseUser.getIdToken();
        }
        return null;
    };

    // ✅ Easy admin check
    const isAdmin = user?.role === 'admin';

    return (
        <AuthContext.Provider value={{
            user,
            firebaseUser,
            loading,
            isAdmin, // ← NEW
            login,
            logout,
            getIdToken
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
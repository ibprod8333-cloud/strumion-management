"use client";

import {useEffect} from 'react';
import {useAuth} from '@/context/AuthContext';
import {useRouter, usePathname} from 'next/navigation';

export function AuthGuard({children}: { children: React.ReactNode }) {
    const {user, loading} = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        // Don't redirect if we're already on the login page or still loading
        if (loading) return;

        // If not authenticated and not on login page, redirect to login
        if (!user && pathname !== '/login') {
            router.push('/login');
        }
    }, [user, loading, router, pathname]);

    // Show loading spinner while checking auth
    if (loading) {
        return (
            <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
                <div className="text-center">
                    <div
                        className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-amber-500 border-t-transparent"></div>
                    <p className="mt-4 text-neutral-600 font-medium">Loading...</p>
                </div>
            </div>
        );
    }

    // If not authenticated and not on login page, show nothing (will redirect)
    if (!user && pathname !== '/login') {
        return null;
    }

    // User is authenticated or on login page, show the page
    return <>{children}</>;
}
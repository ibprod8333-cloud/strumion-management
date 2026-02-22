"use client";

import {useAuth} from '@/context/AuthContext';
import {ReactNode} from 'react';

interface RoleGuardProps {
    children: ReactNode;
    requiredRole?: 'admin' | 'user';
    fallback?: ReactNode;
}

/**
 * Component that conditionally renders children based on user role
 *
 * @example
 * <RoleGuard requiredRole="admin">
 *   <AdminOnlyComponent />
 * </RoleGuard>
 */
export function RoleGuard({children, requiredRole = 'admin', fallback = null}: RoleGuardProps) {
    const {user, loading} = useAuth();

    // Don't render anything while loading
    if (loading) {
        return null;
    }

    // Check if user has required role
    const hasRequiredRole = requiredRole === 'user'
        ? user !== null // Any authenticated user
        : user?.role === requiredRole; // Specific role

    if (!hasRequiredRole) {
        return <>{fallback}</>;
    }

    return <>{children}</>;
}
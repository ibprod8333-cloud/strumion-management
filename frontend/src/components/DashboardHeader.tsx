"use client";

import {LogOut} from "lucide-react";
import {useAuth} from "@/context/AuthContext";
import {useRouter} from "next/navigation";

export default function DashboardHeader() {
    const {user, logout} = useAuth();
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await logout();
            router.push('/login');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    return (
        <header className="h-16 bg-white shadow-sm flex items-center justify-between px-6 border-b border-neutral-200">
            <h1 className="text-lg font-semibold text-neutral-700">Admin Panel</h1>

            <div className="flex items-center gap-4">
                {/* User Info */}
                {user && (
                    <div className="flex items-center gap-3 px-4 py-2 bg-neutral-50 rounded-lg">
                        <div
                            className="flex items-center justify-center w-8 h-8 bg-amber-100 text-amber-700 rounded-full font-semibold text-sm">
                            {user.displayName?.charAt(0)?.toUpperCase() || user.email?.charAt(0)?.toUpperCase() || 'U'}
                        </div>
                        <div className="text-left">
                            <p className="text-sm font-semibold text-neutral-900">
                                {user.displayName || user.email}
                            </p>
                            <p className="text-xs text-neutral-500 capitalize">
                                {user.role || 'user'}
                            </p>
                        </div>
                    </div>
                )}

                {/* Logout Button */}
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-neutral-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                    <LogOut className="h-4 w-4"/>
                    Logout
                </button>
            </div>
        </header>
    );
}
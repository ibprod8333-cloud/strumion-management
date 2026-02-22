"use client";

import {useEffect, useState} from "react";
import {Plus, Trash2, Shield, User as UserIcon, AlertCircle, Lock} from "lucide-react";
import {useAuth} from "@/context/AuthContext";
import {useAuthApi, User, CreateUserDto} from "@/lib/api/useAuthApi";
import {ConfirmDialog} from "@/components/construction-expenses/ConfirmDialog";

export function UserManagement() {
    const {isAdmin} = useAuth(); // ← Check if user is admin
    const authApi = useAuthApi();
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [deletingUser, setDeletingUser] = useState<User | null>(null);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        // Only load users if user is admin
        if (isAdmin) {
            loadUsers();
        } else {
            setLoading(false);
        }
    }, [isAdmin]);

    const loadUsers = async () => {
        try {
            setLoading(true);
            setError('');
            const response = await authApi.getAllUsers();
            setUsers(response.users);
        } catch (err: any) {
            console.error('Failed to load users:', err);
            // Don't show error if it's a permission issue
            if (err.status === 403) {
                setError('');
            } else {
                setError('Failed to load users');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteUser = async () => {
        if (!deletingUser) return;

        try {
            await authApi.deleteUser(deletingUser.uid);
            await loadUsers();
            setDeletingUser(null);
        } catch (err: any) {
            console.error('Failed to delete user:', err);
            alert('Failed to delete user. Please try again.');
        }
    };

    const getRoleBadgeColor = (role: string) => {
        return role === 'admin'
            ? 'bg-amber-100 text-amber-800'
            : 'bg-neutral-100 text-neutral-800';
    };

    const getRoleIcon = (role: string) => {
        return role === 'admin' ? (
            <Shield className="h-3.5 w-3.5"/>
        ) : (
            <UserIcon className="h-3.5 w-3.5"/>
        );
    };

    // ✅ Show access denied message for non-admins
    if (!isAdmin) {
        return (
            <div id="users" className="bg-neutral-50 border-2 border-dashed border-neutral-300 rounded-lg p-12">
                <div className="text-center max-w-md mx-auto">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-neutral-200 rounded-full mb-4">
                        <Lock className="h-8 w-8 text-neutral-400"/>
                    </div>
                    <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                        Admin Access Required
                    </h3>
                    <p className="text-neutral-600">
                        You don't have permission to view user management.
                        Contact your administrator if you need access.
                    </p>
                </div>
            </div>
        );
    }

    if (loading) {
        return (
            <div id="users" className="bg-white rounded-lg border border-neutral-200 p-6">
                <div className="flex items-center justify-center py-12">
                    <div
                        className="animate-spin rounded-full h-8 w-8 border-4 border-amber-500 border-t-transparent"></div>
                </div>
            </div>
        );
    }

    return (
        <>
            <div id="users" className="bg-white rounded-lg border border-neutral-200 p-6">
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-semibold mb-1">User Management</h3>
                        <p className="text-sm text-neutral-500">
                            Manage team members and their access levels ({users.length} users)
                        </p>
                    </div>
                    <button
                        onClick={() => setShowCreateForm(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
                    >
                        <Plus className="h-4 w-4"/>
                        Add User
                    </button>
                </div>

                {error && (
                    <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                        <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5"/>
                        <p className="text-sm text-red-700">{error}</p>
                    </div>
                )}

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                        <tr className="border-b border-neutral-200">
                            <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-700">
                                Name
                            </th>
                            <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-700">
                                Email
                            </th>
                            <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-700">
                                Role
                            </th>
                            <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-700">
                                Created
                            </th>
                            <th className="text-right py-3 px-4 text-sm font-semibold text-neutral-700">
                                Actions
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {users.map((user) => (
                            <tr key={user.uid} className="border-b border-neutral-100 hover:bg-neutral-50">
                                <td className="py-3 px-4 text-sm font-medium text-neutral-900">
                                    {user.name}
                                </td>
                                <td className="py-3 px-4 text-sm text-neutral-600">{user.email}</td>
                                <td className="py-3 px-4">
                                        <span
                                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${getRoleBadgeColor(
                                                user.role
                                            )}`}
                                        >
                                            {getRoleIcon(user.role)}
                                            {user.role}
                                        </span>
                                </td>
                                <td className="py-3 px-4 text-sm text-neutral-500">
                                    {user.createdAt
                                        ? new Date(user.createdAt).toLocaleDateString('en-GB', {
                                            day: '2-digit',
                                            month: 'short',
                                            year: 'numeric',
                                        })
                                        : 'N/A'}
                                </td>
                                <td className="py-3 px-4 text-right">
                                    <button
                                        onClick={() => setDeletingUser(user)}
                                        className="p-2 hover:bg-red-50 rounded-lg transition-colors group"
                                    >
                                        <Trash2 className="h-4 w-4 text-neutral-400 group-hover:text-red-600"/>
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>

                    {users.length === 0 && !loading && (
                        <div className="text-center py-12">
                            <UserIcon className="h-12 w-12 text-neutral-300 mx-auto mb-3"/>
                            <p className="text-neutral-600 font-medium">No users yet</p>
                            <p className="text-sm text-neutral-500 mt-1">
                                Create your first user to get started
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Create User Form Modal */}
            {showCreateForm && (
                <CreateUserForm
                    onClose={() => setShowCreateForm(false)}
                    onSuccess={() => {
                        setShowCreateForm(false);
                        loadUsers();
                    }}
                />
            )}

            {/* Delete Confirmation Dialog */}
            <ConfirmDialog
                isOpen={deletingUser !== null}
                title="Delete User"
                message={`Are you sure you want to delete "${deletingUser?.name}"? This action cannot be undone and will revoke all their access.`}
                confirmLabel="Delete User"
                cancelLabel="Cancel"
                onConfirm={handleDeleteUser}
                onCancel={() => setDeletingUser(null)}
                isDestructive={true}
            />
        </>
    );
}

// Create User Form Component
function CreateUserForm({
                            onClose,
                            onSuccess,
                        }: {
    onClose: () => void;
    onSuccess: () => void;
}) {
    const authApi = useAuthApi();
    const [formData, setFormData] = useState<CreateUserDto>({
        email: '',
        password: '',
        name: '',
        role: 'user',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await authApi.createUser(formData);
            onSuccess();
        } catch (err: any) {
            console.error('Failed to create user:', err);
            setError(err.message || 'Failed to create user. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
                <div className="p-6 border-b border-neutral-200">
                    <h2 className="text-2xl font-bold text-neutral-900">Create New User</h2>
                    <p className="text-sm text-neutral-600 mt-1">
                        Add a new team member to the system
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    {error && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start gap-2">
                            <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5"/>
                            <p className="text-sm text-red-700">{error}</p>
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-semibold text-neutral-700 mb-2">
                            Full Name *
                        </label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            required
                            className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                            placeholder="John Doe"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-neutral-700 mb-2">
                            Email Address *
                        </label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            required
                            className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                            placeholder="john@example.com"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-neutral-700 mb-2">
                            Password *
                        </label>
                        <input
                            type="password"
                            value={formData.password}
                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                            required
                            minLength={6}
                            className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                            placeholder="Minimum 6 characters"
                        />
                        <p className="text-xs text-neutral-500 mt-1">
                            User should change this after first login
                        </p>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-neutral-700 mb-2">Role *</label>
                        <select
                            value={formData.role}
                            onChange={(e) =>
                                setFormData({...formData, role: e.target.value as 'admin' | 'user'})
                            }
                            className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white"
                        >
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>

                    <div className="flex items-center gap-3 pt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 bg-amber-500 text-white font-semibold py-2.5 rounded-lg hover:bg-amber-600 disabled:opacity-50 transition-colors"
                        >
                            {loading ? 'Creating...' : 'Create User'}
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={loading}
                            className="flex-1 bg-neutral-100 text-neutral-700 font-semibold py-2.5 rounded-lg hover:bg-neutral-200 disabled:opacity-50 transition-colors"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
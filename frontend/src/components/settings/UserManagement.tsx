// app/settings/components/UserManagement.tsx
"use client";

import { Plus, Trash2, Edit } from "lucide-react";

const mockUsers = [
    { id: "1", name: "Admin User", email: "admin@example.com", role: "admin", status: "active" },
    { id: "2", name: "Manager", email: "manager@example.com", role: "manager", status: "active" },
    { id: "3", name: "Staff Member", email: "staff@example.com", role: "staff", status: "active" },
];

export function UserManagement() {
    return (
        <div id="users" className="bg-white rounded-lg border border-neutral-200 p-6">
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-semibold mb-1">User Management</h3>
                    <p className="text-sm text-neutral-500">Manage team members and their access levels</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 transition-colors">
                    <Plus className="h-4 w-4" />
                    Add User
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                    <tr className="border-b border-neutral-200">
                        <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-700">Name</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-700">Email</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-700">Role</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-700">Status</th>
                        <th className="text-right py-3 px-4 text-sm font-semibold text-neutral-700">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {mockUsers.map((user) => (
                        <tr key={user.id} className="border-b border-neutral-100">
                            <td className="py-3 px-4 text-sm text-neutral-700">{user.name}</td>
                            <td className="py-3 px-4 text-sm text-neutral-500">{user.email}</td>
                            <td className="py-3 px-4">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-neutral-100 text-neutral-800 capitalize">
                                        {user.role}
                                    </span>
                            </td>
                            <td className="py-3 px-4">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 capitalize">
                                        {user.status}
                                    </span>
                            </td>
                            <td className="py-3 px-4 text-right">
                                <div className="flex items-center justify-end gap-2">
                                    <button className="p-1 hover:bg-neutral-100 rounded">
                                        <Edit className="h-4 w-4 text-neutral-600" />
                                    </button>
                                    <button className="p-1 hover:bg-red-50 rounded">
                                        <Trash2 className="h-4 w-4 text-red-600" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
// app/settings/components/SettingsNav.tsx
"use client";

import {Building2, CreditCard, Bell, Users, Settings, Calendar, Plug} from "lucide-react";
import {useState} from "react";

const sections = [
    {id: "general", label: "General", icon: Settings},
    {id: "property", label: "Property Info", icon: Building2},
    {id: "booking", label: "Booking Rules", icon: Calendar},
    {id: "payment", label: "Payments", icon: CreditCard},
    {id: "notifications", label: "Notifications", icon: Bell},
    {id: "users", label: "Users & Roles", icon: Users},
    {id: "integrations", label: "Integrations", icon: Plug},
];

export function SettingsNav() {
    const [activeSection, setActiveSection] = useState("general");

    const scrollToSection = (id: string) => {
        setActiveSection(id);
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({behavior: "smooth", block: "start"});
        }
    };

    return (
        <nav className="bg-white rounded-lg border border-neutral-200 p-4 sticky top-6">
            <div className="space-y-1">
                {sections.map(({id, label, icon: Icon}) => (
                    <button
                        key={id}
                        onClick={() => scrollToSection(id)}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                            activeSection === id
                                ? "bg-neutral-900 text-white"
                                : "text-neutral-700 hover:bg-neutral-100"
                        }`}
                    >
                        <Icon className="h-4 w-4"/>
                        <span>{label}</span>
                    </button>
                ))}
            </div>
        </nav>
    );
}
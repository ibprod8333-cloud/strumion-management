// app/settings/components/GeneralSettings.tsx
"use client";

import { useState } from "react";
import { Save } from "lucide-react";

export function GeneralSettings() {
    const [businessName, setBusinessName] = useState("Фортуна ЕЛ-М-Т");
    const [timezone, setTimezone] = useState("Europe/Skopje");
    const [language, setLanguage] = useState("mk");
    const [currency, setCurrency] = useState("EUR");

    const handleSave = () => {
        // TODO: Implement save logic
        console.log("Saving general settings...");
    };

    return (
        <div id="general" className="bg-white rounded-lg border border-neutral-200 p-6">
            <div className="mb-6">
                <h3 className="text-lg font-semibold mb-1">General Settings</h3>
                <p className="text-sm text-neutral-500">Basic configuration for your property management system</p>
            </div>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Business Name
                    </label>
                    <input
                        type="text"
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                        className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                            Timezone
                        </label>
                        <select
                            value={timezone}
                            onChange={(e) => setTimezone(e.target.value)}
                            className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900"
                        >
                            <option value="Europe/Skopje">Europe/Skopje (UTC+1/+2)</option>
                            <option value="Europe/Athens">Europe/Athens (UTC+2/+3)</option>
                            <option value="Europe/Belgrade">Europe/Belgrade (UTC+1/+2)</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                            Language
                        </label>
                        <select
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                            className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900"
                        >
                            <option value="mk">Macedonian</option>
                            <option value="en">English</option>
                            <option value="de">German</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Currency
                    </label>
                    <select
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value)}
                        className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900"
                    >
                        <option value="EUR">EUR (€)</option>
                        <option value="MKD">MKD (ден)</option>
                        <option value="USD">USD ($)</option>
                    </select>
                </div>

                <div className="pt-4">
                    <button
                        onClick={handleSave}
                        className="flex items-center gap-2 px-4 py-2 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 transition-colors"
                    >
                        <Save className="h-4 w-4" />
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
}
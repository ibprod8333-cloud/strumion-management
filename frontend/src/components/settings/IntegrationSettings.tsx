// app/settings/components/IntegrationSettings.tsx
"use client";

import { ExternalLink, Check, X } from "lucide-react";

const integrations = [
    {
        id: "booking-com",
        name: "Booking.com",
        description: "Sync reservations and availability",
        logo: "🏨",
        connected: true,
    },
    {
        id: "airbnb",
        name: "Airbnb",
        description: "Manage Airbnb listings",
        logo: "🏠",
        connected: false,
    },
    {
        id: "stripe",
        name: "Stripe",
        description: "Process online payments",
        logo: "💳",
        connected: true,
    },
    {
        id: "google-calendar",
        name: "Google Calendar",
        description: "Sync booking calendar",
        logo: "📅",
        connected: false,
    },
];

export function IntegrationSettings() {
    return (
        <div id="integrations" className="bg-white rounded-lg border border-neutral-200 p-6">
            <div className="mb-6">
                <h3 className="text-lg font-semibold mb-1">Integrations</h3>
                <p className="text-sm text-neutral-500">Connect third-party services to streamline your workflow</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {integrations.map((integration) => (
                    <div
                        key={integration.id}
                        className="border border-neutral-200 rounded-lg p-4 hover:border-neutral-300 transition-colors"
                    >
                        <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-3">
                                <span className="text-3xl">{integration.logo}</span>
                                <div>
                                    <h4 className="font-semibold text-neutral-900">{integration.name}</h4>
                                    <p className="text-xs text-neutral-500">{integration.description}</p>
                                </div>
                            </div>
                            {integration.connected ? (
                                <div className="flex items-center gap-1 text-green-600">
                                    <Check className="h-4 w-4" />
                                    <span className="text-xs font-medium">Connected</span>
                                </div>
                            ) : (
                                <div className="flex items-center gap-1 text-neutral-400">
                                    <X className="h-4 w-4" />
                                    <span className="text-xs font-medium">Not connected</span>
                                </div>
                            )}
                        </div>
                        <button
                            className={`w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                                integration.connected
                                    ? "bg-red-50 text-red-600 hover:bg-red-100"
                                    : "bg-neutral-900 text-white hover:bg-neutral-800"
                            }`}
                        >
                            {integration.connected ? "Disconnect" : "Connect"}
                            <ExternalLink className="h-3.5 w-3.5" />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
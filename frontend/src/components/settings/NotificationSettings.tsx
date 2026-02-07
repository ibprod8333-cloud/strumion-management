// app/settings/components/NotificationSettings.tsx
"use client";

import { useState } from "react";
import { Save } from "lucide-react";

export function NotificationSettings() {
    const [emailBooking, setEmailBooking] = useState(true);
    const [emailPayment, setEmailPayment] = useState(true);
    const [emailCancellation, setEmailCancellation] = useState(true);
    const [emailMaintenance, setEmailMaintenance] = useState(false);
    const [smsReminders, setSmsReminders] = useState(true);

    return (
        <div id="notifications" className="bg-white rounded-lg border border-neutral-200 p-6">
            <div className="mb-6">
                <h3 className="text-lg font-semibold mb-1">Notification Settings</h3>
                <p className="text-sm text-neutral-500">Choose how you want to be notified</p>
            </div>

            <div className="space-y-6">
                <div>
                    <h4 className="text-sm font-semibold text-neutral-700 mb-3">Email Notifications</h4>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-neutral-700">New Bookings</p>
                                <p className="text-xs text-neutral-500">Get notified when a new reservation is made</p>
                            </div>
                            <input
                                type="checkbox"
                                checked={emailBooking}
                                onChange={(e) => setEmailBooking(e.target.checked)}
                                className="h-4 w-4 rounded border-neutral-300 text-neutral-900 focus:ring-neutral-900"
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-neutral-700">Payment Received</p>
                                <p className="text-xs text-neutral-500">Get notified when payments are confirmed</p>
                            </div>
                            <input
                                type="checkbox"
                                checked={emailPayment}
                                onChange={(e) => setEmailPayment(e.target.checked)}
                                className="h-4 w-4 rounded border-neutral-300 text-neutral-900 focus:ring-neutral-900"
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-neutral-700">Cancellations</p>
                                <p className="text-xs text-neutral-500">Get notified when bookings are cancelled</p>
                            </div>
                            <input
                                type="checkbox"
                                checked={emailCancellation}
                                onChange={(e) => setEmailCancellation(e.target.checked)}
                                className="h-4 w-4 rounded border-neutral-300 text-neutral-900 focus:ring-neutral-900"
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-neutral-700">Maintenance Alerts</p>
                                <p className="text-xs text-neutral-500">Get notified about maintenance issues</p>
                            </div>
                            <input
                                type="checkbox"
                                checked={emailMaintenance}
                                onChange={(e) => setEmailMaintenance(e.target.checked)}
                                className="h-4 w-4 rounded border-neutral-300 text-neutral-900 focus:ring-neutral-900"
                            />
                        </div>
                    </div>
                </div>

                <div>
                    <h4 className="text-sm font-semibold text-neutral-700 mb-3">SMS Notifications</h4>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-neutral-700">Guest Reminders</p>
                            <p className="text-xs text-neutral-500">Send SMS reminders to guests before check-in</p>
                        </div>
                        <input
                            type="checkbox"
                            checked={smsReminders}
                            onChange={(e) => setSmsReminders(e.target.checked)}
                            className="h-4 w-4 rounded border-neutral-300 text-neutral-900 focus:ring-neutral-900"
                        />
                    </div>
                </div>

                <div className="pt-4">
                    <button className="flex items-center gap-2 px-4 py-2 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 transition-colors">
                        <Save className="h-4 w-4" />
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
}
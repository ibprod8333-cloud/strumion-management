// app/settings/components/BookingSettings.tsx
"use client";

import { useState } from "react";
import { Save } from "lucide-react";

export function BookingSettings() {
    const [checkInTime, setCheckInTime] = useState("14:00");
    const [checkOutTime, setCheckOutTime] = useState("10:00");
    const [minStayNights, setMinStayNights] = useState(1);
    const [maxStayNights, setMaxStayNights] = useState(30);
    const [advanceBookingDays, setAdvanceBookingDays] = useState(365);
    const [instantBooking, setInstantBooking] = useState(true);

    return (
        <div id="booking" className="bg-white rounded-lg border border-neutral-200 p-6">
            <div className="mb-6">
                <h3 className="text-lg font-semibold mb-1">Booking Rules</h3>
                <p className="text-sm text-neutral-500">Configure check-in/out times and booking policies</p>
            </div>

            <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                            Default Check-in Time
                        </label>
                        <input
                            type="time"
                            value={checkInTime}
                            onChange={(e) => setCheckInTime(e.target.value)}
                            className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                            Default Check-out Time
                        </label>
                        <input
                            type="time"
                            value={checkOutTime}
                            onChange={(e) => setCheckOutTime(e.target.value)}
                            className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                            Minimum Stay (nights)
                        </label>
                        <input
                            type="number"
                            min="1"
                            value={minStayNights}
                            onChange={(e) => setMinStayNights(Number(e.target.value))}
                            className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                            Maximum Stay (nights)
                        </label>
                        <input
                            type="number"
                            min="1"
                            value={maxStayNights}
                            onChange={(e) => setMaxStayNights(Number(e.target.value))}
                            className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Advance Booking Window (days)
                    </label>
                    <input
                        type="number"
                        min="1"
                        value={advanceBookingDays}
                        onChange={(e) => setAdvanceBookingDays(Number(e.target.value))}
                        className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900"
                    />
                    <p className="text-xs text-neutral-500 mt-1">How far in advance guests can book</p>
                </div>

                <div className="flex items-center gap-3">
                    <input
                        type="checkbox"
                        id="instant-booking"
                        checked={instantBooking}
                        onChange={(e) => setInstantBooking(e.target.checked)}
                        className="h-4 w-4 rounded border-neutral-300 text-neutral-900 focus:ring-neutral-900"
                    />
                    <label htmlFor="instant-booking" className="text-sm font-medium text-neutral-700">
                        Enable Instant Booking
                    </label>
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
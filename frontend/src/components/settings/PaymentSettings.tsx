// app/settings/components/PaymentSettings.tsx
"use client";

import { useState } from "react";
import { Save } from "lucide-react";

export function PaymentSettings() {
    const [depositPercentage, setDepositPercentage] = useState(30);
    const [acceptCash, setAcceptCash] = useState(true);
    const [acceptCard, setAcceptCard] = useState(true);
    const [acceptBankTransfer, setAcceptBankTransfer] = useState(true);
    const [cancellationPolicy, setCancellationPolicy] = useState("moderate");

    return (
        <div id="payment" className="bg-white rounded-lg border border-neutral-200 p-6">
            <div className="mb-6">
                <h3 className="text-lg font-semibold mb-1">Payment Settings</h3>
                <p className="text-sm text-neutral-500">Configure payment methods and policies</p>
            </div>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Deposit Percentage
                    </label>
                    <div className="flex items-center gap-3">
                        <input
                            type="range"
                            min="0"
                            max="100"
                            step="5"
                            value={depositPercentage}
                            onChange={(e) => setDepositPercentage(Number(e.target.value))}
                            className="flex-1"
                        />
                        <span className="text-sm font-medium text-neutral-700 w-12">{depositPercentage}%</span>
                    </div>
                    <p className="text-xs text-neutral-500 mt-1">Required deposit at booking time</p>
                </div>

                <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-3">
                        Accepted Payment Methods
                    </label>
                    <div className="space-y-2">
                        <div className="flex items-center gap-3">
                            <input
                                type="checkbox"
                                id="accept-cash"
                                checked={acceptCash}
                                onChange={(e) => setAcceptCash(e.target.checked)}
                                className="h-4 w-4 rounded border-neutral-300 text-neutral-900 focus:ring-neutral-900"
                            />
                            <label htmlFor="accept-cash" className="text-sm text-neutral-700">Cash</label>
                        </div>
                        <div className="flex items-center gap-3">
                            <input
                                type="checkbox"
                                id="accept-card"
                                checked={acceptCard}
                                onChange={(e) => setAcceptCard(e.target.checked)}
                                className="h-4 w-4 rounded border-neutral-300 text-neutral-900 focus:ring-neutral-900"
                            />
                            <label htmlFor="accept-card" className="text-sm text-neutral-700">Credit/Debit Card</label>
                        </div>
                        <div className="flex items-center gap-3">
                            <input
                                type="checkbox"
                                id="accept-transfer"
                                checked={acceptBankTransfer}
                                onChange={(e) => setAcceptBankTransfer(e.target.checked)}
                                className="h-4 w-4 rounded border-neutral-300 text-neutral-900 focus:ring-neutral-900"
                            />
                            <label htmlFor="accept-transfer" className="text-sm text-neutral-700">Bank Transfer</label>
                        </div>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Cancellation Policy
                    </label>
                    <select
                        value={cancellationPolicy}
                        onChange={(e) => setCancellationPolicy(e.target.value)}
                        className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900"
                    >
                        <option value="flexible">Flexible (Full refund 24h before)</option>
                        <option value="moderate">Moderate (Full refund 5 days before)</option>
                        <option value="strict">Strict (50% refund 7 days before)</option>
                        <option value="no-refund">No Refund</option>
                    </select>
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
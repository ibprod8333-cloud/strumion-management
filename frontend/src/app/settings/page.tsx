import {SettingsNav} from "@/components/settings/SettingsNav";
import {GeneralSettings} from "@/components/settings/GeneralSettings";
import {PropertySettings} from "@/components/settings/PropertySettings";
import {BookingSettings} from "@/components/settings/BookingSettings";
import {PaymentSettings} from "@/components/settings/PaymentSettings";
import {UserManagement} from "@/components/settings/UserManagement";
import {IntegrationSettings} from "@/components/settings/IntegrationSettings";
import {NotificationSettings} from "@/components/settings/NotificationSettings";

export default async function SettingsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold mb-2">Settings</h2>
                <p className="text-neutral-500">Manage your property and system preferences</p>
            </div>

            <div className="grid grid-cols-4 gap-6">
                {/* Sidebar Navigation */}
                <div className="col-span-1">
                    <SettingsNav />
                </div>

                {/* Main Settings Content */}
                <div className="col-span-3 space-y-6">
                    <GeneralSettings />
                    <PropertySettings />
                    <BookingSettings />
                    <PaymentSettings />
                    <NotificationSettings />
                    <UserManagement />
                    <IntegrationSettings />
                </div>
            </div>
        </div>
    );
}
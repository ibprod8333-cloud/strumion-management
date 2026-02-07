import {getGuests, getGuestStats} from "@/services/dashboard/guests";
import {GuestStats} from "@/app/guests/components/GuestStats";
import {NationalityChart} from "@/app/guests/components/NationalityChart";
import {ChannelDistribution} from "@/app/guests/components/ChannelDistribution";
import {GuestsTable} from "@/app/guests/components/GuestsTable";


export default async function GuestsPage() {
    const guests = await getGuests();
    const stats = await getGuestStats(guests);

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold mb-2">Guest Management</h2>
                <p className="text-neutral-500">
                    Track guest information, behavior, and analytics
                </p>
            </div>

            {/* Stats Overview */}
            <GuestStats stats={stats}/>

            {/* Analytics Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <NationalityChart nationalities={stats.topNationalities}/>
                <ChannelDistribution channels={stats.guestsByChannel}/>
            </div>

            {/* Guests Table */}
            <GuestsTable guests={guests}/>
        </div>
    );
}
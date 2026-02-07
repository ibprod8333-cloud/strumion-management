/*

        ! ! !   EXAMPLE     ! ! !

 */


// export async function analyzeUrl(trimmedUrl: string): Promise<AnalyzedCcpaPrivacyResponse> {
//     return await fetchFromApi<AnalyzedCcpaPrivacyResponse>('/api/analyze/url/ccpa-compliance', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({url: trimmedUrl}),
//     });
// }


// import {fetchFromApi} from "@/lib/api/fetchFromApi";
// import {Reservation} from "@/types/reservation";

// export async function getApartments(): Promise<Apartment[]> {
import {Apartment} from "@/types/apartment";
// import {fetchFromApi} from "@/lib/api/fetchFromApi";

// export async function getApartments(): Promise<Apartment[]> {
//     // return await fetchFromApi("apartments", {
//     //     method: "GET"
//     // });
//
// }

export async function createApartment(apartment: Omit<Apartment, "id">): Promise<Apartment> {
    // TODO: Uncomment when backend is ready
    // return await fetchFromApi("/apartments", {
    //   method: "POST",
    //   body: JSON.stringify(apartment),
    // });

    return { ...apartment, id: `apt_${Date.now()}` };
}

export async function updateApartment(id: string, apartment: Partial<Apartment>): Promise<Apartment> {
    // TODO: Uncomment when backend is ready
    // return await fetchFromApi(`/apartments/${id}`, {
    //   method: "PUT",
    //   body: JSON.stringify(apartment),
    // });

    return { ...apartment, id } as Apartment;
}

export async function deleteApartment(id: string): Promise<void> {
    // TODO: Uncomment when backend is ready
    // await fetchFromApi(`/apartments/${id}`, {
    //   method: "DELETE",
    // });
}